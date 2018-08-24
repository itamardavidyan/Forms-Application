$( document ).ready(function() {
    console.log( "ready!" );

	$("#move2formBuilder").click(function(){
		const express = require('express');
		const app = express();

		app.use(express.static(__dirname + '/public'));

		app.get("/", (req,res) =>{
			res.sendfile(__dirname + '/formBuilder/formBuilder.html');
		});
	});
});
