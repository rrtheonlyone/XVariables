//dependancies
const express = require('express');
const app = express();
var bodyParser = require('body-parser');

//Import the mongoose module
var mongoose = require('mongoose');
app.use(bodyParser.json());
app.use(express.json());

//Set up default mongoose connection
var mongoDB = 'mongodb://127.0.0.1/my_database';
mongoose.connect(mongoDB);
// mongoose.connect(mongoDB,function(){
//     // Drop the DB
//     mongoose.connection.db.dropDatabase();
// });

// Get Mongoose to use the global promise library
mongoose.Promise = global.Promise;

//Get the default connection
var db = mongoose.connection;

//Bind connection to error event (to get notification of connection errors)
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

// mongoose schema goes here
var userSchema = new mongoose.Schema({
	_id: mongoose.Schema.Types.ObjectId,
	firstName: String,
	lastName: String,
	videos: [{
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Video'
		// emotions split by timeframe will go here dynamically
	}]
});

var videoSchema = new mongoose.Schema({
	_id: mongoose.Schema.Types.ObjectId,
	name: String,
	users: [{
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User'
		// emotions split by timeframe to be added dynamically
	}]
});


var Video = mongoose.model('Video', videoSchema);
var User = mongoose.model('User', userSchema);


// POST: receive data and store in db
app.post('/testEndPoint', function(req, res, next){
	console.log("BODY");
	console.log(req.body);
	
	var firstName = req.body.firstName;
	var lastName = req.body.lastName;
	var timeStamp = req.body.timeStamp;
	var videoTitle = req.body.videoTitle;
	var emotions = req.body.emotions;

	User.update({firstName: firstName}, 
		{$push:
			{'videos.$.videoTitle': 	// Check this syntax ==> may be screwing it up
				{timeStamp: emotions}
			}
		},function(firstName){
			console.log("ENTRY SAVED IN USER");
		}
	);

	Video.update({name: videoTitle},
		{$push:
			{'users.$.videoTitle': 		// check this syntax also. same as on top
				{timeStamp: emotions}
			}
		},function(videoTitle){
			console.log("ENTRY SAVED IN VIDEO");
		}
	);

});

app.get('/', (req, res) => res.send('Hello World!'));

app.listen(5000, () => console.log('Example app listening on port 5000!'));
