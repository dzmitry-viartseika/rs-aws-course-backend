import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import {
    BatchWriteCommand
} from "@aws-sdk/lib-dynamodb";

const dynamoClient = new DynamoDBClient({});

export const dynamo = {
    batchWrite: async (tableData) => {
        const batchData = {
            RequestItems: {}
        }

        Object.keys(tableData).forEach(tableName => {
            batchData.RequestItems[tableName] = tableData[tableName].map(item => {
                return {
                    PutRequest: {
                        Item: {
                            ...item
                        }
                    }
                }
            })
        })
        const command = new BatchWriteCommand(batchData);
        const response = await dynamoClient.send(command);

        return response
    },
};