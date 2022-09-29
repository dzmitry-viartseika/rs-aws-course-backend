import { formatJSONResponse } from "@libs/api-gateway";
import { middyfy } from "@libs/lambda";
// import schema from './schema';
import * as AWS from 'aws-sdk';

const dynamodb = new AWS.DynamoDB.DocumentClient();

const addProduct = async (event) => {
    // @ts-ignore
    const body = event.data;

    console.log('addProduct body', body)

    const blogParams = {
        TableName:'product-table',
        Item: {
            "author": body.author,
            "count": body.count,
            "description": body.description,
            "id": body.id,
            "price": body.price,
            "title": body.title
        }
    }

    const data = await dynamodb.put(blogParams).promise()

    if (data) {
        return formatJSONResponse({
            data: blogParams,
        });
    }

    return formatJSONResponse({
        message: 'FATAL ERROR',
    });
}

export const main = middyfy(addProduct);