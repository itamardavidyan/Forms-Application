function back2formsList() {
	const express = require('express');
	const app = express();

	app.use(express.static(__dirname + '/public'));

	app.get("/", (req,res) =>{
		res.sendfile(__dirname + '/formBuilder/formBuilder.html');
	});	
}

$("#back2formsList").click(function(){
	back2formsList();
});