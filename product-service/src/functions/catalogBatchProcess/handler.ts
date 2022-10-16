import { middyfy } from "@libs/lambda";
import { v4 as uuid } from "uuid";
import { SQSEvent } from "aws-lambda";
import { dynamo } from "@libs/dynamo";

import * as AWS from "aws-sdk";
import {formatJSONResponse} from "@libs/api-gateway";

const catalogBatchProcess = async (
    event: SQSEvent
) => {
    try {
        const productsBatch = []
        const stocksBatch = []

        event.Records.forEach((event) => {
            const code = uuid().slice(0, 8);
            const { count, price, title , description} = JSON.parse(event.body)
            productsBatch.push({ id: code, price: Number(price), description, title })
            stocksBatch.push({
                product_id: code,
                count: Number(count)
            })
        })

        const productsTable = 'products-table';
        const stocksTable = 'stock-table';

        const batchData = {
            [productsTable]: productsBatch,
            [stocksTable]: stocksBatch
        }

        await dynamo.batchWrite(batchData)

        const SNS = new AWS.SNS({region: 'eu-west-1'})
        console.log('wer')
        try {
            await SNS.publish({
                Subject: 'New product has been added',
                Message: JSON.stringify(batchData),
                TopicArn: process.env.snsArn,
            }, (err, data) => {
                if(err) console.log(err);
                else {
                    console.log('LOG: email notification has been sent')
                }
            }).promise()
        } catch(e) {
            console.log('error, items were not added into the table: ');
        }

    } catch (error) {
        return formatJSONResponse({
            statusCode: 500,
            message: 'Something went wrong'
        });
    }
};

export const main = middyfy(catalogBatchProcess);