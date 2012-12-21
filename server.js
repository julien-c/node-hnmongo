
var redis = require('redis'),
	mongoose = require('mongoose');


var redisClient = redis.createClient();

redisClient.on("error", function(err){
	console.log("Error " + err);
});

mongoose.connect('localhost', 'hn');

var NewsSchema = mongoose.Schema({
	id: String,
	title: String,
	url: String,
	domain: String,
	points: Number,
	user: String,
	time_ago: String,
	comments_count: Number,
	type: String
});

var News = mongoose.model('News', NewsSchema);


setInterval(function(){
	redisClient.get('news', function(err, result){
		if (result){
			var news = JSON.parse(result);
			console.log(news.length);
			news.forEach(function(item){
				new News(item).save();
			});
		}
		else {
			// If there isn't anything (i.e. the TTL for the Redis value has expired), 
			// we don't update the Mongo collection.
			console.log('ERR');
		}
	});
}, 5000);




