cmake_minimum_required(VERSION 3.8)
project(warsql)

link_directories(/usr/lib64/mysql)

set(CMAKE_CXX_STANDARD 17)

set(SOURCE_FILES
        main.cpp
        libwarc/constants.cc
        libwarc/constants.hh
        libwarc/warc.cc
        libwarc/warc.hh
)
add_executable(warsql ${SOURCE_FILES})
target_link_libraries(warsql mysqlclient)