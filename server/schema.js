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


// make fake data
var kaustubh = new User({
	_id: new mongoose.Types.ObjectId(),
	firstName: "kaustubh",
	lastName: "jagtap"
});
var nicklaus = new User({
	_id: new mongoose.Types.ObjectId(),
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

//populate database with fake data
kaustubh.save(function(err, kaustubh){
	if(err) return console.error(err);
	console.log("kaustubh added to database");
});
nicklaus.save(function(err, nicklaus){
	if(err) return console.error(err);
	console.log("nicklaus added to database");
});
jason.save(function(err, jason){
	if(err) return console.error(err);
	console.log("jason added to database");
});
rahul.save(function(err, rahul){
	if(err) return console.error(err);
	console.log("rahul added to database");
});