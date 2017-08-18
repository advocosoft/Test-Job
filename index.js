const express = require('express')
const app = express()
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/db');
// var db = mongoose.connection;
// db.on('error', console.error.bind(console, 'connection error:'));
// db.once('open', function() {
	
// });
var multer  = require('multer')
var upload = multer({ dest: 'uploads/' })


var bodyParser = require('body-parser');
// parse application/x-www-form-urlencoded 
app.use(bodyParser.urlencoded({ extended: true }));
// parse application/json 
app.use(bodyParser.json());

var User = require('./common/models/User');

var router = express.Router();

router.route('/')
.get(function(req,res){
	res.send("Welcome to test job");
})

router.route('/Users')
.get(function (req, res) {
  	User.find(req.params.bear_id, function(err, users) {
        if (err)
            res.send(err);
        res.json(users);
    });
})
.post(function(req,res){
	// console.log(req.body);
	var user = new User();
	user.name = req.body.name;
	user.email = req.body.email;
	user.save(function(err,userInstance){
		if(err)
			res.json(err);
		res.json(userInstance);
	}) 
	// res.send('/Users  post routes');
})

router.route('/Users/:userId')
	.get(function(req,res){
		User.findById(req.params.userId, function(err, user) {
	        if (err)
	            res.send(err);
	        res.json(user);
	    });
	})
	.put(function(req,res){
		User.findById(req.params.userId, function(err, user) {
	        if (err)
	            res.send(err);

	        user.name = req.body.name;
	        user.email = req.body.email; 
	        user.save(function(err,updatedUser) {
	            if (err)
	                res.send(err);
	            res.json(updatedUser);
	        });

	    });
	})
	.delete(function(req,res){
		User.remove({
	        _id: req.params.userId
	    }, function(err, user) {
	        if (err)
	            res.send(err);

	        res.json({ message: 'Successfully deleted' });
	    });
	})


// router.route('/Users/shareImage',upload.single('shareImage'),function(req,res){

// })




app.use(router);


app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})