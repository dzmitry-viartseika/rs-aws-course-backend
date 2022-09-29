import { formatJSONResponse } from "@libs/api-gateway";
import { middyfy } from "@libs/lambda";
import * as AWS from 'aws-sdk';

const dynamodb = new AWS.DynamoDB.DocumentClient();

const getProductList = async () => {

    const output2 = await dynamodb.scan({
        TableName:'product-table2',
    }).promise()

    const output = await dynamodb.scan({
        TableName:'product-table',
    }).promise()

    if (output.Items && output2.Items) {
        const result = []
        output.Items.forEach((element) => {
            output2.Items.forEach((el) => {
                if (element.id === el.author) {
                    const obj = {
                        ...element,
                        ...el,
                    }

                    result.push(obj)
                }
            })
        })
        return formatJSONResponse({
            data: result,
        });
    }

    return formatJSONResponse({
        message: {
            output,
            output2,
        },
    });
}

export const main = middyfy(getProductList);