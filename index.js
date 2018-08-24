const express = require('express');
const app = express();

app.use(express.static(__dirname + '/public'));

app.get("/", (req,res) =>{
	res.sendfile(__dirname + '/index.html');
	// res.send({deploy:'your site'})
});

const PORT = process.env.PORT || 3000;
app.listen(PORT);