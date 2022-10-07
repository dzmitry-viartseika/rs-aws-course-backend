import { handlerPath } from "@libs/handler-resolver";

export default {
    handler: `${handlerPath(__dirname)}/handler.main`,
    events: [
        {
            http: {
                method: "post",
                path: "stock",
                cors: true,
                documentation: {
                    summary: 'Add new stock',
                    description: 'Add new stock',
                },
            },
        },
    ],
};