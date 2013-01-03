

var http = require('http');
var mongodb = require('mongodb');



var MongoClient = require('mongodb').MongoClient;

MongoClient.connect("mongodb://localhost:27017/hnmeteor", function(err, db) {
	if (err) { return console.dir(err); }
	
	var homepage = db.collection('homepage');
	
	setInterval(function(){
		http.get("http://localhost:8888/news", function(res) {
			console.log(res.statusCode);
			
			var body = '';
			res.setEncoding('utf8');
			res.on('data', function(chunk){
				body += chunk;
			});
			res.on('end', function(){
				var home = JSON.parse(body);
				homepage.insert({content: home}, {w:1}, function(err, result) {});
			});
		}).on('error', function(e) {
			console.log("Got error: " + e.message);
		});
		
	}, 10000);
});



