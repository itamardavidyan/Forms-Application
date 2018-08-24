const express = require('express');
const app = express();
var path = process.cwd();

app.use(express.static(__dirname + '/public'));

app.get("/", (req,res) =>{
	res.sendfile(__dirname + '/index.html');
});

/*app.route('/formBuilder')
 	.get(function (req, res) {
		res.sendFile(path  + '/public/formBuilder/formBuilder.html');
});*/

app.route('/formList')
 	.get(function (req, res) {
		res.sendFile(path  + '/public/index.html');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT);