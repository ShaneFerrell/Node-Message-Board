// Shane Ferrell
// ThatNewDank Server

const sqlite3 	= require('sqlite3').verbose()
const qs 		= require('querystring')
const http 		= require('http')
const pug  		= require('pug')

const port = 8080
var db = new sqlite3.Database('data.db')
var postsHTML
var postCount = 0

// Puts together the HTML for a post
function makePost(text, timestamp){

	var html = 	"<h4>" + text + "</h4>"
	html +=		"<br>"
	html +=		"<h6>" + timestamp + "</h4>"
	html += 	"<hr><br>"

	return html
}

function handleRequest(request, callback){

	var body = ""

	request.on('data', function(data){

			body += data
		})

	request.on('end', function(){

		console.log("Body: " + body)

		var postData = qs.parse(body)
		db.run("INSERT into posts (post) VALUES ('" + postData.posttext + "')")

		callback()
	})
}

const responder = (request, response) => {
	
	var postsHTML = ""

	console.log(request.connection.remoteAddress)

	// A new post has been sent via POST method
	if(request.method == 'POST'){

		console.log("POST request")

		handleRequest(request, function(){

			db.each("SELECT * FROM posts ORDER BY id DESC LIMIT 5", function(err, row){

				if(err) console.log(err)
				else postsHTML += makePost(row.post, row.timestamp)
			}, function(err, rows){

				var html = pug.renderFile('Client/template.pug', {"posts" : postsHTML})
				response.end(html)
			})
		})
	}

	else{

		db.each("SELECT * FROM posts ORDER BY id DESC LIMIT 5", function(err, row){

			if(err) console.log(err)
			else postsHTML += makePost(row.post, row.timestamp)
		}, function(err, rows){

			var html = pug.renderFile('Client/template.pug', {"posts" : postsHTML})
			response.end(html)
		})
	}

}

const server = http.createServer(responder)

server.listen(port, (err) => {

	if(err) {

		return console.log('ERROR', err)
	}

	console.log('server listening on port ' + port);
})