import { formatJSONResponse } from "@libs/api-gateway";
import { middyfy } from "@libs/lambda";
import * as AWS from 'aws-sdk';

const dynamodb = new AWS.DynamoDB.DocumentClient();

const getProductList = async () => {

    const stockTable = await dynamodb.scan({
        TableName:'stock-table',
    }).promise()

    const productTable = await dynamodb.scan({
        TableName:'products-table',
    }).promise()

    if (productTable.Items && stockTable.Items) {
        const result = []
        productTable.Items.forEach((element) => {
            stockTable.Items.forEach((el) => {
                if (element.id === el.product_id) {

                    const obj = {
                        ...element,
                        ...el,
                    }
                    obj.product_id = undefined
                    result.push(obj)
                }
            })
        })
        console.log('getProductsList result', result)
        return formatJSONResponse({
            data: result,
        });
    }

    return formatJSONResponse({
        message: 'SOMETHING WRONG',
    });
}

export const main = middyfy(getProductList);