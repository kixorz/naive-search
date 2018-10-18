#DROP TABLE IF EXISTS pages;

CREATE TABLE IF NOT EXISTS pages (
  page_id INT AUTO_INCREMENT,
  url TEXT NOT NULL,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  PRIMARY KEY (page_id)
);

#ALTER TABLE pages ADD FULLTEXT (url, title, description);

#LOAD DATA LOCAL INFILE 'test.csv' INTO TABLE pages (url, title, description)
#LOAD DATA LOCAL INFILE 'search' INTO TABLE pages (url, title, description) FIELDS TERMINATED BY ',' ENCLOSED BY '"'