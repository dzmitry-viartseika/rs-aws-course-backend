import { handlerPath } from "@libs/handler-resolver";

export default {
    handler: `${handlerPath(__dirname)}/handler.main`,
    events: [
        {
            http: {
                method: "post",
                path: "products",
                cors: true,
                documentation: {
                    summary: 'Add new product',
                    description: 'Add new product',
                },
            },
        },
    ],
};