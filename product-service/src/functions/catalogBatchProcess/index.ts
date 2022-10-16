import { handlerPath } from "@libs/handler-resolver";
import { AWSFunction } from "@libs/lambda";

export default {
    handler: `${handlerPath(__dirname)}/handler.main`,
    events: [
        {
            sqs: {
                batchSize: 5,
                arn: "arn:aws:sqs:eu-west-1:262156182844:catalogItemsQueue",
            },
        },
    ],
} as AWSFunction;