import type { AWS } from '@serverless/typescript';

// import getProducts from "@functions/getProducts";
// import getProduct from "@functions/getProduct";
import addProduct from "@functions/addProduct";
import getProductList from "@functions/getProductList";

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
            Action: [
                'dynamodb:PutItem',
                'dynamodb:Scan',
            ],
            Resource: [
              'arn:aws:dynamodb:${self:provider.region}:${self:provider.environment.AWS_ACCOUNT_ID}:table/${self:provider.environment.BLOG_TABLE}',
              'arn:aws:dynamodb:${self:provider.region}:${self:provider.environment.AWS_ACCOUNT_ID}:table/${self:provider.environment.BLOG_TABLE2}'
            ]
          }
        ],
    apiGateway: {
      minimumCompressionSize: 1024,
      shouldStartNameWithService: true,
    },
    environment: {
      AWS_NODEJS_CONNECTION_REUSE_ENABLED: '1',
      NODE_OPTIONS: '--enable-source-maps --stack-trace-limit=1000',
      BLOG_TABLE:'product-table',
      BLOG_TABLE2:'product-table2',
      AWS_ACCOUNT_ID:'262156182844',
    },
    lambdaHashingVersion: '20201221',
  },
  // import the function via paths
  functions: { addProduct, getProductList },
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
    autoswagger: {
      typefiles: './src/types/product.d.ts',
    },
  },
  resources:{
    Resources:{
      productTable:{
        Type:"AWS::DynamoDB::Table",
        Properties:{
          TableName:"product-table",
          AttributeDefinitions:[
            {AttributeName:'author', AttributeType:'S'},
          ],
          KeySchema:[
            {AttributeName:'author', KeyType:'HASH'},
          ],
          BillingMode:'PAY_PER_REQUEST',
        },
      },
      productTable2:{
        Type:"AWS::DynamoDB::Table",
        Properties:{
          TableName:"product-table2",
          AttributeDefinitions:[
            {AttributeName:'author', AttributeType:'S'},
          ],
          KeySchema:[
            {AttributeName:'author', KeyType:'HASH'},
          ],
          BillingMode:'PAY_PER_REQUEST',
        },
      }
    }
  }
};

module.exports = serverlessConfiguration;
