import type { AWS } from '@serverless/typescript';
import importProductsFile from '@functions/importProductsFile';
import importFileParser from '@functions/importFileParser';
require('dotenv').config();

const serverlessConfiguration: AWS = {
  service: 'import-service-wertey',
  frameworkVersion: '3',
  plugins: ['serverless-esbuild'],
  resources: {
    Resources: {
      SQSQueue: {
        Type: 'AWS::SQS::Queue',
        Properties: {
          QueueName: "catalogItemsQueue"
        }
      }
    }
  },
  provider: {
    name: 'aws',
    runtime: 'nodejs14.x',
    region: "eu-west-1",
    iamRoleStatements: [
      {
        Effect: 'Allow',
        Action: [
          "s3:ListBucket"
        ],
        Resource: [
          "arn:aws:s3:::${self:provider.environment.BUCKET_NAME}",
          "arn:aws:s3:::${self:provider.environment.BUCKET_NAME}/*"
        ]
      },
      {
        Effect: "Allow",
        Action: "sqs:*",
        Resource: [{'Fn::GetAtt': ['SQSQueue', 'Arn']}]
      }
    ],
    apiGateway: {
      minimumCompressionSize: 1024,
      shouldStartNameWithService: true,
    },
    httpApi: {
      cors: true,
      shouldStartNameWithService: true,
      authorizers: {
        basicImportAuthorizer: {
          payloadVersion: '2.0',
          functionArn: 'arn:aws:execute-api:eu-west-1:262156182844:7fy8bifhjj/*/GET/import',
          type: 'request',
          identitySource: ['$request.header.Authorization'],
          resultTtlInSeconds: 0,
        }
      }
    },
    environment: {
      AWS_NODEJS_CONNECTION_REUSE_ENABLED: '1',
      NODE_OPTIONS: '--enable-source-maps --stack-trace-limit=1000',
      BUCKET_NAME: 'import-service-wertey',
      SQSUrl: {
        Ref: 'SQSQueue'
      }
    },
  },
  functions: { importProductsFile, importFileParser },
  package: { individually: true },
  custom: {
    esbuild: {
      bundle: true,
      minify: false,
      sourcemap: true,
      exclude: ['aws-sdk'],
      target: 'node14',
      define: { 'require.resolve': undefined },
      platform: 'node',
      concurrency: 10,
    },
  },
};

module.exports = serverlessConfiguration;
