import { formatJSONResponse } from "@libs/api-gateway";
import { middyfy } from "@libs/lambda";
import * as AWS from 'aws-sdk';

const dynamodb = new AWS.DynamoDB.DocumentClient();

const addStock = async (event) => {
    try {
        const data = event.body

        console.log('AddStock data', data)

        if (!data.hasOwnProperty('product_id') || !data.hasOwnProperty('count')) {
            return formatJSONResponse({
                statusCode: 400,
                message: 'Product data is invalid'
            });
        }

        const blogParams = {
            TableName:'stock-table',
            Item: {
                'product_id': data.product_id,
                'count': data.count,
            }
        }

        const result = await dynamodb.put(blogParams).promise()

        console.log('AddStock result', result)

        if (result) {
            return formatJSONResponse({
                data: blogParams,
            });
        }

        return formatJSONResponse({
            message: 'FATAL ERROR',
        });
    } catch (e) {
        return formatJSONResponse({
            statusCode: 500,
            message: 'Something went wrong'
        });
    }
}

export const main = middyfy(addStock);