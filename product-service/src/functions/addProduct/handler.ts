import { formatJSONResponse } from "@libs/api-gateway";
import { middyfy } from "@libs/lambda";
import * as AWS from 'aws-sdk';

const dynamodb = new AWS.DynamoDB.DocumentClient();

const addProduct = async (event) => {
    try {
        // @ts-ignore
        const data = event.body;

        if (!data.hasOwnProperty('title') || !data.hasOwnProperty('description') ||
            !data.hasOwnProperty('price') || !data.hasOwnProperty('id')) {
            return formatJSONResponse({
                statusCode: 400,
                message: 'Product data is invalid'
            });
        }

        console.log('addProduct data', data)

        const blogParams = {
            TableName:'products-table',
            Item: {
                "description": data.description,
                "id": data.id,
                "price": data.price,
                "title": data.title
            }
        }

        console.log('event', event)

        const result = await dynamodb.put(blogParams).promise()

        console.log('addProduct result', result)

        if (Object.keys(result).length) {
            return formatJSONResponse({
                data: blogParams,
            });
        }

        return formatJSONResponse({
            statusCode: 400,
            message: 'Fill out required fields'
        });
    } catch (e) {
        return formatJSONResponse({
            statusCode: 500,
            message: 'Something went wrong'
        });
    }
}

export const main = middyfy(addProduct);