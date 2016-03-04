var express    = require('express'),
    bodyParser = require('body-parser'),
    morgan     = require('morgan'),
    port       = 8080,
    app        = express(),
    apiRouter  = express.Router();

// allow CORS
app.use(function (req, res, next) {

  // Website you wish to allow to connect
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3002');

  // Request methods you wish to allow
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

  // Request headers you wish to allow
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader('Access-Control-Allow-Credentials', true);

  // Pass to next layer of middleware
  next();
});

app.options('*', function(req, res) {
  res.sendStatus(200);
});

app.use(bodyParser.json());
app.use('/api', apiRouter);
require('./apiRoutes.js')(apiRouter);
app.use(express.static('client'));

app.use(morgan('dev'));


app.listen(port);
console.log("Listening on port: ", port);
