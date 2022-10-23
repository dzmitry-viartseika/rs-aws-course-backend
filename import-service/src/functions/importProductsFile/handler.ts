import type { ValidatedEventAPIGatewayProxyEvent } from '../../libs/api-gateway';
import { middyfy } from '../../libs/lambda';
import * as AWS from 'aws-sdk';

const importProductsFile: ValidatedEventAPIGatewayProxyEvent<any> = async (event) => {
    const S3 = new AWS.S3({region: 'eu-west-1', signatureVersion: 'v4' })
    const fileName = event.queryStringParameters.name;
    console.log('LOG: file name 2: ', fileName);

    const signedUrlParams = {
        Bucket: 'import-service-wertey',
        Key: `uploaded/${fileName}`
    }

    try {
        const signedUrl = S3.getSignedUrl('putObject', signedUrlParams)

        return {
            statusCode: 200,
            headers: {
                'access-control-allow-origin': '*'
            },
            body: JSON.stringify({url: `${signedUrl}`})
        }
    } catch(e) {
        return {
            statusCode: 500,
            body: JSON.stringify('Something went wrong')
        }
    }
};

export const main = middyfy(importProductsFile);