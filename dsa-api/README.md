Each modification will be done through API, add courses and so on.

MongoDB structure
Table 1 enrollment: id | Course | section | term | student (ID) | create_date
Table 2 course : id | Course name | section number | term | instructor | supervisor
Table 3 audit : id | student ID | Course name | section number | term | instructor | supervior | approve

Node.js
All the action done on modify table 3 will send out email. Insert data, modify data, delete data.

API list --- All post method can be fine under api-routes.js
