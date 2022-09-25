import { handlerPath } from "@libs/handler-resolver";

export default {
    handler: `${handlerPath(__dirname)}/handler.main`,
    events: [
        {
            http: {
                method: "get",
                path: "products",
                cors: true,
                documentation: {
                    summary: 'Get product list',
                    description: 'Get all products',
                },
            },
        },
    ],
};