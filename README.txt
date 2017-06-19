This is my attempt at using node.js as a webserver, and sqlite for database management.

The webpage displays the 5 most recent posts in our db, and allows users to submit a new one
via post to the server. 

The current files in the project are: 

server.js - The server. It will always respond with a page containing the 10 most recent posts. It also takes new posts submitted via post, and adds them to the db.

setup.js - Sets up an empty data.db file for our application. Creates the "posts" table and inserts a test post.

data.db - The database. It only contains one table, called "posts" which conists of an auto incrementing id, the text post, and the automatic timestamp.

Client/template.pug - The pug template for our server to render our webpage from. Contains the variable "posts" for the server to insert the html that displays the 5 most recent posts.

Client/style.css - The stylesheet used for our webpage. Yeah...
