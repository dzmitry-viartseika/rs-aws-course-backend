# examples
GET_BY_ID product with counts from different table(stock's) https://o7393ulei4.execute-api.eu-west-1.amazonaws.com/dev/products/7567ec4b-b10c-48c5-9345-fc73c48a80aa
GET_ALL products with counts from different table(stock's) https://o7393ulei4.execute-api.eu-west-1.amazonaws.com/dev/products/

# frontend PR
https://github.com/wertey/rolling-scopes-aws-course/pull/3

# frontend S3
https://dzbuxj8ld8y5m.cloudfront.net/

add new product https://dzbuxj8ld8y5m.cloudfront.net/admin/product-form

# What was done?
Task 4.1 - create two database tables in DynamoDB
Task 4.2:
- Extend your serverless.yml file with data about your database table and pass it to lambda’s environment variables section
- Integrate the getProductsList lambda to return via GET /products request a list of products from the database (joined stocks and products tables).
  (My example: https://o7393ulei4.execute-api.eu-west-1.amazonaws.com/dev/products/)
- Implement a Product model on FE side as a joined model of product and stock by productId.
  (My example: https://o7393ulei4.execute-api.eu-west-1.amazonaws.com/dev/products/1fb5c6c4-3d1e-4d80-8829-847576f5b367)
- Integrate the getProductsById lambda to return via GET /products/{productId} request a single product from the database (My example is above)
Task 4.3:
- Create a lambda function called createProduct
- The requested URL should be /products.
- Implement its logic so it will be creating a new item in a Products table
- Save the URL (API Gateway URL) to execute the implemented lambda functions for later - you'll need to provide it in the PR (e.g in PR's description) when submitting the task.
Task 4.4:
- Commit all your work to separate branch (e.g. task-4 from the latest master) in BE (backend) and if needed in FE (frontend) repositories.
- Create a pull request to the master branch.
- Submit link to the PR to CrossCheck page in RS APP

# Additional (optional) tasks are done

Additional scope - logger, swagger, unit tests, transaction
+1 (All languages) - All lambdas do console.log for each incoming requests and their arguments
+1 (All languages) - POST /products lambda functions returns error 400 status code if product data is invalid
+1 (All languages) - All lambdas return error 500 status code on any error (DB connection, any unhandled error in code)
