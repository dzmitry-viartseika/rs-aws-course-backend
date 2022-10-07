import { formatJSONResponse } from "@libs/api-gateway";
import { middyfy } from "@libs/lambda";
import * as AWS from "aws-sdk";
const dynamodb = new AWS.DynamoDB.DocumentClient();

const getProduct = async (event) => {
    try {
        const { id } = event.pathParameters;

        console.log('get Product id', id)

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
                            product_id: undefined
                        }

                        result.push(obj)
                    }
                })
            })

            const productItem = result.find((item) => item.id === id)

            console.log('get productItem', productItem)

            if (productItem) {
                return formatJSONResponse({
                    data: [productItem],
                });
            }
        }

        return formatJSONResponse({
            message: 'Error: Product not found!',
        });
    } catch (e) {
        return formatJSONResponse({
            statusCode: 500,
            message: 'Something went wrong'
        });
    }
};

export const main = middyfy(getProduct);