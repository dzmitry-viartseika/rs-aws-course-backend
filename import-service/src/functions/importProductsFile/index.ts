import { handlerPath } from '@libs/handler-resolver';

export default {
    handler: `${handlerPath(__dirname)}/handler.main`,
    events: [
        {
            http: {
                method: 'get',
                path: 'import',
                request: {
                    parameters: {
                        querystrings: {
                            name: true
                        }
                    }
                },
                cors: true,
                authorizer: 'basicImportAuthorizer',
                documentation: {
                    summary: 'Get import file link',
                    description: 'Get link of file',
                },
            },
        },
    ],
};