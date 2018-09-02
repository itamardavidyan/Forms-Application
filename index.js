const express = require('express');
const app = express();
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
// var connect = require('connect');
// var appl = connect();
var http = require('http');
var fs = require('fs');
var path = require('path');
var mongo = require('mongodb');
var mongoose = require('mongoose');
var mongooseDynamic = require ('mongoose-dynamic-schemas');
var Schema = mongoose.Schema;
var jsdom = require("jsdom");
const { JSDOM } = jsdom;
var MongoClient = require('mongodb').MongoClient;
var mongoDBurl = "mongodb://itamard:Google100!@ds229312.mlab.com:29312/forms";
mongoose.connect(mongoDBurl);

// var forms;
var formSchema = new mongoose.Schema({
	form_id: String,
	form_name: String,
	num_submissions: Number,
	fields: mongoose.Schema.Types.Mixed,
	submissions: { 	}
});
var Submit = mongoose.model('forms', formSchema);


app.use(express.static('public'))
app.use(express.static('public/formBuilder'))
app.use(express.static('public/submissionsPage'))
app.use(express.static('public/submitPage'))

app.get('/', function(req,res) {
	console.log("/");
	console.log(req.params);
	res.sendFile('index.html', {root: path.join(__dirname, './public')});
});

app.get('/index', function(req,res) {
	console.log("/index");
	// console.log(req.params);
	res.sendFile(path.join(__dirname + '/public/index.html'));
});

app.get('/formBuilder', function(req,res) {
	console.log("/formBuilder");
	// console.log(req.params);
	res.sendFile(path.join(__dirname + '/public/formBuilder/formBuilder.html'));
});

app.get('/submit', function(req,res) {
	console.log("/submit");
	res.sendFile(path.join(__dirname + '/public/submitPage/submitPage.html'));
});

app.get('/setForm', function(req, res) {
    console.log('/setForm');
    var fieldId = req.query.fieldID;
    console.log(fieldId);

    MongoClient.connect(mongoDBurl, function(err, db) {
		if (err) throw err;
		var dbo = db.db("forms");

		dbo.collection("forms").findOne({form_id:fieldId}, function(err, result) {
			if (err) throw err;

			// console.log(result);
			res.send(result);
			db.close();
		});
	});
});

app.get('/submissions', function(req,res) {
	console.log("/submissions");
	// console.log(req.params);
	res.sendFile(path.join(__dirname + '/public/submissionsPage/submissionsPage.html'));
});

app.get('/setTable', function(req, res) {
    console.log('/setTable');
    MongoClient.connect(mongoDBurl, function(err, db) {
		if (err) throw err;
		var dbo = db.db("forms");

		dbo.collection("forms").find({}).toArray(function(err, result) {
			if (err) throw err;
			// console.log(result);
			res.send(result);
			db.close();
		});
	});
});

app.get('/setSubmissionsTable', function(req, res) {
    console.log('/setSubmissionsTable');
    var fieldId = req.query.fieldID;
    console.log(fieldId);

	Submit.findOne(
		{ form_id:fieldId },
		'submissions',
	    function (err, submissions) {
			if (err) throw err;
			res.send(submissions);
    	}
	);
});


app.post('/save', function(req, res) {
    console.log('/save');
    console.log(req.body);
    MongoClient.connect(mongoDBurl, function(err, db) {
		if (err) throw err;
		var dbo = db.db("forms");
		var lastID;

		dbo.collection('forms', function(err, collection) {
			collection
				.find()
				.sort({$natural: -1})
				.limit(1)
				.next()
				.then(
				function(doc) {
					lastID = parseInt(doc.form_id);
					lastID += 1;

					var myobj = { form_id: lastID.toString() , form_name: req.body.formname, num_submissions:0, fields: JSON.parse(req.body.tabledata), submissions: JSON.parse(req.body.inputNames) };

					dbo.collection("forms").insertOne(myobj, function(err, res) {
						if (err) throw err;
						db.close();
					});
				},
				function(err) {
					console.log('Error:', err);
				}
			);
		});
	});
});

app.post('/send', function(req, res) {
	console.log('/send');
    var fieldId = req.body.fieldID;
    console.log(fieldId);

	Submit.updateOne(
		{ form_id:fieldId },
		{ $inc: { num_submissions: 1 } },
		function(err, db) {
			if (err) throw err;
		}
	);


    var obj = JSON.parse(req.body.answer);
    console.log(obj);
    for(var input in obj) {
    	console.log(input);
    	var pushObj = {

    	}
    	var newField = 'submissions.' + input;
        pushObj[newField] = obj[input];

		console.log(obj[input]);
		Submit.updateOne(
			{ form_id:fieldId },
			{$push: pushObj},
			function(err, db) {
				if (err) throw err;
			}
		);
	}

});

// const PORT = process.env.PORT || 3000;
const PORT = 8080;
app.listen(PORT, function() {
	console.log("listen to PORT 8080");
});