var express = require('express');
var app = express();

app.get('/api/hello', function(req, res) {
  return res.status(200).send({"Hello":"world"});
});

app.use(express.static(__dirname + '/client/app'));

app.listen(8080);
