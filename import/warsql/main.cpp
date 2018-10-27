#include <iostream>
#include <map>

#include <mysql/mysql.h>

#include "libwarc/warc.hh"
#include "json.hpp"

using json = nlohmann::json;

int main(int argc, char *argv[]) {
	if(argc != 5) {
		std::cout << "Invalid parameter count" << std::endl;
		return 1;
	}

	const char * host = argv[1];
	const char * user = argv[2];
	const char * pass = argv[3];
	const char * db = argv[4];

	MYSQL *conn;
	if ((conn = mysql_init(NULL)) == NULL)
	{
		std::cerr << "Error initializing mysql client" << std::endl;
		return 1;
	}

	if (mysql_real_connect(conn, host, user, pass, db, 0, NULL, 0) == NULL)
	{
		std::cerr << "Error connecting to the db" << std::endl;
		return 1;
	}

	auto begin = std::istream_iterator<warc::WARCRecord>(std::cin);
	auto end = std::istream_iterator<warc::WARCRecord>();
	for(auto it = begin; it != end; ++it) {
		std::map<std::string, std::string> fields;
		for(auto field : it->get_fields()) {
			fields.emplace(field.get_name(), field.get_value());
			//std::cout << field.get_name() << " " << field.get_value() << std::endl;
		}

		auto contentType = fields.find("Content-Type");
		if(contentType == fields.end()) {
			continue;
		}

		if(contentType->second != "application/json") {
			continue;
		}

		auto contentUrl = fields.find("WARC-Target-URI");
		if(contentUrl == fields.end()) {
			continue;
		}

		auto envelope = json::parse(it->get_content());
		auto response = envelope["Envelope"]["Payload-Metadata"]["HTTP-Response-Metadata"];
		if(response == nullptr) {
			continue;
		}

		auto metadata = response["HTML-Metadata"];
		if(metadata == nullptr) {
			continue;
		}

		auto head = metadata["Head"];
		if(head == nullptr) {
			continue;
		}

		auto title = head["Title"];
		if(title == nullptr) {
			continue;
		}

		std::string queryDescription;
		auto metas = head["Metas"];
		for(auto meta : metas) {
			auto key = meta["name"];
			if(key == nullptr) {
				continue;
			}

			std::string keyStr = key.get<std::string>();
			std::transform(keyStr.begin(), keyStr.end(), keyStr.begin(), ::tolower);
			if(keyStr != "description") {
				continue;
			}

			auto value = meta["content"];
			if(value == nullptr) {
				continue;
			}

			queryDescription = value.get<std::string>();
		}

		std::string queryUrl = contentUrl->second;
		std::string queryTitle = title.get<std::string>();

		char query[1000000], *end;

		end = __stpcpy(query, " INSERT INTO pages (url, title, description) VALUES('");
		end += mysql_real_escape_string(conn, end, queryUrl.c_str(), queryUrl.length());
		end = __stpcpy(end, "','");
		end += mysql_real_escape_string(conn, end, queryTitle.c_str(), queryTitle.length());
		end = __stpcpy(end, "','");
		end += mysql_real_escape_string(conn, end, queryDescription.c_str(), queryDescription.length());
		end = __stpcpy(end, "')");

		if(mysql_real_query(conn, query, (unsigned int) (end - query))) {
			fprintf(stderr, "Failed to insert row, Error: %s\n", mysql_error(conn));
		}
	}

	mysql_close(conn);

	return 0;
}