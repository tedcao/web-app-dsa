restful API

Each modification will be done through API, add courses and so on.

get/post courses student enrolled (live-form update based on student id entered.)
get/post table 1 information (if ID same then update)
get/post table 2 information (if ID same then update)
get/post table 3 information (if ID same then update)

get - approve task or not

MongoDB structure
Table 1 enrollment: id | Course | section | term | student (ID) | create_date

Table 2 course : id | Course name | section number | instructor | supervisor

Table 3 audit : id | student ID | Course name | section number | instructor | supervior | approved

Node.js
All the action done on modify table 3 will send out email. Insert data, modify data, delete data.
