
var redis = require('redis');

var redisClient = redis.createClient();

redisClient.on("error", function(err){
	console.log("Error " + err);
});



setInterval(function(){
	redisClient.get('news', function(err, result){
		if (result){
			var news = JSON.parse(result);
			console.log(typeof news);
		}
		// If there isn't anything (i.e. the TTL for the Redis value has expired), 
		// we don't update the Mongo collection.
	});
}, 5000);




