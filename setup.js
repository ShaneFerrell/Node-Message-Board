// Shane Ferrell
// 04/24/2017

var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('data.db');
var testPost = 'test';
var check;

db.serialize(function(){

	db.run("CREATE TABLE posts (id INTEGER PRIMARY KEY AUTOINCREMENT, post TEXT, timestamp DATETIME DEFAULT (datetime('now', 'localtime')))");
	db.run("INSERT into posts (post) VALUES ('test')");

	db.each("SELECT id, post, timestamp FROM posts", function(err, row){

		console.log(row.id + " (" + row.timestamp+ "): " + row.post);
	});
});

db.close();