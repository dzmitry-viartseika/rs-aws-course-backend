import type { AWS } from '@serverless/typescript';
import importProductsFile from "@functions/importProductsFile";
require('dotenv').config();

const serverlessConfiguration: AWS = {
  service: 'import-service',
  frameworkVersion: '3',
  plugins: ['serverless-esbuild'],
  provider: {
    name: 'aws',
    runtime: 'nodejs14.x',
    region: "eu-west-1",
    // iamRoleStatements:
    //     [
    //       {
    //         Effect:'Allow',
    //         Action: [
    //             'dynamodb:PutItem',
    //             'dynamodb:Scan',
    //         ],
    //         Resource: [
    //           'arn:aws:dynamodb:${self:provider.region}:${self:provider.environment.AWS_ACCOUNT_ID}:table/${self:provider.environment.PRODUCTS_TABLE}',
    //           'arn:aws:dynamodb:${self:provider.region}:${self:provider.environment.AWS_ACCOUNT_ID}:table/${self:provider.environment.STOCK_TABLE}'
    //         ]
    //       }
    //     ],
    apiGateway: {
      minimumCompressionSize: 1024,
      shouldStartNameWithService: true,
    },
    environment: {
      AWS_NODEJS_CONNECTION_REUSE_ENABLED: '1',
      NODE_OPTIONS: '--enable-source-maps --stack-trace-limit=1000',
      PRODUCTS_TABLE: 'products-table',
      STOCK_TABLE: 'stock-table',
      AWS_ACCOUNT_ID: process.env.AWS_ACCOUNT_ID,
    },
    lambdaHashingVersion: '20201221',
  },
  functions: { importProductsFile },
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
