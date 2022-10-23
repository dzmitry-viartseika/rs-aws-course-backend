import { handlerPath } from '@libs/handler-resolver';

export default {
    handler: `${handlerPath(__dirname)}/handler.main`,
    events: [
        {
            http: {
                method: 'get',
                path: 'import',
                cors: true,
                authorizer: {
                    name: 'basicAuthorizer',
                    type: 'token',
                    arn: 'arn:aws:lambda:eu-west-1:262156182844:function:authorization-service-aws-dev-basicAuthorizer',
                    resultTtlInSeconds: 0,
                    identitySource: 'method.request.header.Authorization'
                },
                request: {
                    parameters: {
                        querystrings: {
                            name: true
                        }
                    }
                },
                documentation: {
                    summary: 'Get import file link',
                    description: 'Get link of file',
                },
            },
        },
    ],
};