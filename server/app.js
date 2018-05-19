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

app.post('/testEndPoint', function(req, res, next){
	console.log(req.body);
	console.log("post received");
});

app.get('/', (req, res) => res.send('Hello World!'));

app.listen(5000, () => console.log('Example app listening on port 5000!'));
