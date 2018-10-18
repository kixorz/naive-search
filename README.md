create repository and pipeline
aws cloudformation deploy --template-file pipeline.yaml --stack-name asearch-pipeline --capabilities CAPABILITY_IAM


common crawl data

https://registry.opendata.aws/commoncrawl/
https://commoncrawl.s3.amazonaws.com/crawl-data/CC-MAIN-2018-34/wat.paths.gz
https://commoncrawl.s3.amazonaws.com/ + path from above

https://commoncrawl.s3.amazonaws.com/crawl-data/CC-MAIN-2018-34/segments/1534221208676.20/wat/CC-MAIN-20180814062251-20180814082251-00000.warc.wat.gz


mysql streaming details

mkfifo search
mysql --user=search --password=searchpassword123 --host=srxukvcblnekor.cgec7ucnhams.us-east-1.rds.amazonaws.com search -e "LOAD DATA LOCAL INFILE 'search' INTO TABLE pages FIELDS TERMINATED BY ',' ENCLOSED BY '\"' (url, title, description)"
mysql --user=search --password=searchpassword123 --host=search-stack-dev-rdscluster-llus43xxjts8.cluster-cgec7ucnhams.us-east-1.rds.amazonaws.com search -e "LOAD DATA LOCAL INFILE 'search' INTO TABLE pages FIELDS TERMINATED BY ',' ENCLOSED BY '\"' (url, title, description)"

echo '"http://www.google.com/","Google","Search Engine"' >> search


streaming from s3

curl -L https://commoncrawl.s3.amazonaws.com/crawl-data/CC-MAIN-2018-34/wat.paths.gz | zcat | awk '{print "https://commoncrawl.s3.amazonaws.com/" $0}' > paths.txt
cat urls.txt | head -n 1 | xargs curl -s -L | zcat | ./warsql search


split dataset

sed 'n; d' paths.txt > paths1.txt
sed '1d; n; d' paths.txt > paths2.txt


mkfifo search
mysql --user=search --password=searchpassword123 --host= search -e "LOAD DATA LOCAL INFILE 'search' INTO TABLE pages FIELDS TERMINATED BY ',' ENCLOSED BY '\"' (url, title, description)"

mysql --user=search --password=searchpassword123 --host=sr1x44e9anx4ewu.cgec7ucnhams.us-east-1.rds.amazonaws.com search -e "LOAD DATA LOCAL INFILE 'search' INTO TABLE pages FIELDS TERMINATED BY ',' ENCLOSED BY '\"' (url, title, description)"


curl http://169.254.169.254/latest/user-data > test

first two batches give 80625 records