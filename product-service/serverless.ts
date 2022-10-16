import type { AWS } from '@serverless/typescript';
import addStock from "@functions/addStock";
import getProduct from "@functions/getProduct";
import addProduct from "@functions/addProduct";
import getProductList from "@functions/getProductList";
import catalogBatchProcess from "@functions/catalogBatchProcess";
require('dotenv').config();

const serverlessConfiguration: AWS = {
  service: 'product-service',
  frameworkVersion: '3',
  plugins: ['serverless-esbuild'],
  provider: {
    name: 'aws',
    runtime: 'nodejs14.x',
    region: "eu-west-1",
    iamRoleStatements:
        [
          {
            Effect:'Allow',
            Action: "dynamodb:*",
            Resource: [
              'arn:aws:dynamodb:${self:provider.region}:${self:provider.environment.AWS_ACCOUNT_ID}:table/${self:provider.environment.PRODUCTS_TABLE}',
              'arn:aws:dynamodb:${self:provider.region}:${self:provider.environment.AWS_ACCOUNT_ID}:table/${self:provider.environment.STOCK_TABLE}'
            ]
          },
          {
            Effect: "Allow",
            Action: "sns:*",
            Resource:
                "arn:aws:sns:${self:provider.region}:${aws:accountId}:create-product-topic",
          },
        ],
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
      snsTopic: "create-product-topic",
      snsArn: "arn:aws:sns:${self:provider.region}:${aws:accountId}:create-product-topic",
      SQS_QUEUE_NAME: 'catalogItemsQueue',
      SNS_TOPIC_NAME: 'createProductTopic',
    },
    lambdaHashingVersion: '20201221',
  },
  functions: { addProduct, getProductList, getProduct, addStock, catalogBatchProcess },
  package: { individually: true },
  custom: {
    topicName: "create-product-topic",
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
    autoswagger: {},
  },
  resources: {
    Resources: {
      productsTable:{
        Type:"AWS::DynamoDB::Table",
        Properties:{
          TableName:"products-table",
          AttributeDefinitions:[
            {AttributeName:'id', AttributeType:'S'},
          ],
          KeySchema:[
            {AttributeName:'id', KeyType:'HASH'},
          ],
          BillingMode:'PAY_PER_REQUEST',
        },
      },
      stockTable:{
        Type:"AWS::DynamoDB::Table",
        Properties:{
          TableName:"stock-table",
          AttributeDefinitions:[
            {AttributeName:'product_id', AttributeType:'S'},
          ],
          KeySchema:[
            {AttributeName:'product_id', KeyType:'HASH'},
          ],
          BillingMode:'PAY_PER_REQUEST',
        },
      },
      SNSTopic: {
        Type: 'AWS::SNS::Topic',
        Properties: {
          TopicName: "create-product-topic"
        }
      },
      SNSSubscription: {
        Type: 'AWS::SNS::Subscription',
        Properties: {
          Endpoint: 'wertey199011@gmail.com',
          Protocol: 'email',
          TopicArn: {
            Ref: 'SNSTopic'
          }
        }
      },
    }
  }
};

module.exports = serverlessConfiguration;
