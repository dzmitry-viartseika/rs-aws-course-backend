# frontend PR
https://github.com/dzmitry-viartseika/rolling-scopes-aws-course/pull/4

# frontend S3
https://dzbuxj8ld8y5m.cloudfront.net/

import product csv https://dzbuxj8ld8y5m.cloudfront.net/admin/products

# What was done?
1 - File serverless.yml contains configuration for importProductsFile function
3 - The importProductsFile lambda function returns a correct response which can be used to upload a file into the S3 bucket
4 - Frontend application is integrated with importProductsFile lambda
5 - The importFileParser lambda function is implemented and serverless.yml contains configuration for the lambda

+1 (for JS only) - async/await is used in lambda functions
+1 (All languages) - At the end of the stream the lambda function should move the file from the uploaded folder
into the parsed folder (move the file means that file should be copied into a new folder in the same bucket called
parsed, and then deleted from uploaded folder)

I did not make unit tests

# Score
Score 7/8