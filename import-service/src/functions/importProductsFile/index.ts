import { handlerPath } from "@libs/handler-resolver";

export default {
    handler: `${handlerPath(__dirname)}/handler.main`,
    events: [
        {
            http: {
                method: "get",
                path: "imports/{name}",
                cors: true,
                documentation: {
                    summary: 'Get product',
                    description: 'Get product by Id',
                },
            },
        },
    ],
};