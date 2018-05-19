//dependancies
const express = require('express')
const app = express()

//Import the mongoose module
var mongoose = require('mongoose');

//Set up default mongoose connection
var mongoDB = 'mongodb://127.0.0.1/my_database';
mongoose.connect(mongoDB);

// Get Mongoose to use the global promise library
mongoose.Promise = global.Promise;

//Get the default connection
var db = mongoose.connection;

//Bind connection to error event (to get notification of connection errors)
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

// mongoose schema go here
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


// make fake data
var kaustubh = new User({
	_id: new mongoose.Types.ObjectId(),
	firstName: "kaustubh",
	lastName: "kaustubh"
});
var nicklaus = new User({
	_id: new mongoose.Schema.Types.ObjectId(),
	firstName: "nicklaus",
	lastName: "ong"
});
var jason = new User({
	_id: new mongoose.Types.ObjectId(),
	firstName: "jason",
	lastName: "yip"
});
var rahul = new User({
	_id: new mongoose.Types.ObjectId(),
	firstName: "rahul",
	lastName: "rajesh"
});

// populate database with fake data
User.update(kaustubh);
User.update(rahul);
User.update(jason);
User.update(nicklaus);



app.get('/', (req, res) => res.send('Hello World!'))

app.listen(5000, () => console.log('Example app listening on port 5000!'))
