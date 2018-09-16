create repository and pipeline
aws cloudformation deploy --template-file pipeline.yaml --stack-name asearch-pipeline --capabilities CAPABILITY_IAM


common crawl data
https://registry.opendata.aws/commoncrawl/
https://commoncrawl.s3.amazonaws.com/crawl-data/CC-MAIN-2018-34/wat.paths.gz
https://commoncrawl.s3.amazonaws.com/ + path from above
