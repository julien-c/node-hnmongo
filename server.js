

var http = require('http');





setInterval(function(){
	http.get("http://localhost:8888/news", function(res) {
		console.log("Got response: " + res.statusCode);
		console.log(res.length);
	}).on('error', function(e) {
		console.log("Got error: " + e.message);
	});
	
	// redisClient.get('news', function(err, result){
	// 	if (result) {
	// 		var news = JSON.parse(result);
	// 		console.log(news.length);
			
			
	// 		// news.forEach(function(item){
	// 		// 	new News(item).save();
	// 		// });
	// 	}
	// 	else {
	// 		// If there isn't anything (i.e. the TTL for the Redis value has expired), 
	// 		// we don't update the Mongo collection.
	// 		console.log('ERR');
	// 	}
	// });
}, 3000);




