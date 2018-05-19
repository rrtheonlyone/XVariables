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
var usersSchema = new Schema({
	_id: Schema.Types.ObjectID,
	firstName: String,
	lastName: String,
	videos: [{
		type: Schema.Types.ObjectID,
		ref: 'Video'
		// emotions split by timeframe will go here dynamically
	}]
});

var videoSchema = new Schema({
	_id: Schema.Types.ObjectID,
	name: String,
	users: [{
		type: Schema.Types.ObjectID,
		ref: 'User'
	}]
});


var Video = mongoose.model('Video', videoSchema);
var User = mongoose.model('User', userSchema);

app.get('/users', function(req, res){
	
});

app.get('/', (req, res) => res.send('Hello World!'))

app.listen(5000, () => console.log('Example app listening on port 5000!'))
