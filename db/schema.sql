#DROP TABLE IF EXISTS pages;

#ALTER DATABASE search CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;

CREATE TABLE IF NOT EXISTS pages (
  page_id INT AUTO_INCREMENT,
  url TEXT NOT NULL,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  FULLTEXT ux (url),
  FULLTEXT tx (title),
  FULLTEXT dx (description),
  FULLTEXT txdx (title, description),
  PRIMARY KEY (page_id)
);

#CREATE FULLTEXT INDEX ON pages (url, title, description);

#ALTER TABLE pages ADD FULLTEXT (url);
#ALTER TABLE pages ADD FULLTEXT (title);
#ALTER TABLE pages ADD FULLTEXT (description);

#SHOW INDEX FROM pages;

#LOAD DATA LOCAL INFILE 'test.csv' INTO TABLE pages (url, title, description)
#LOAD DATA LOCAL INFILE 'search' INTO TABLE pages (url, title, description) FIELDS TERMINATED BY ',' ENCLOSED BY '"'