import { handlerPath } from "@libs/handler-resolver";

export default {
    handler: `${handlerPath(__dirname)}/handler.main`,
    events: [
        {
            http: {
                method: "post",
                path: "add",
                cors: true,
                documentation: {
                    summary: 'Add new product',
                    description: 'Add new product',
                },
            },
        },
    ],
};