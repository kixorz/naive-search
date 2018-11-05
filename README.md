# Naive Search

Demonstrates use of AWS Aurora and Serverless application model.

## The Common crawl data

https://registry.opendata.aws/commoncrawl/

## Repository and pipeline
`aws cloudformation deploy --template-file pipeline.yaml --stack-name asearch-pipeline --capabilities CAPABILITY_IAM`

## Deploy and Test

* Clone this repository
* Find CodeCommit endpoint in outputs of `asearch-pipeline` stack
* Add CodeCommit endpoint as a new remote to the repository
* Push repository to the new remote
* Find CodePipeline and track deployment progress
* Find URL in parameters of the `Search-Stack-Dev` stack
* Visit the URL and see the application running

Created for Aurora Hackathon 2018.