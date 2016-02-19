var express    = require('express'),
    bodyParser = require('body-parser'),
    morgan     = require('morgan'),
    port       = 8080,
    app        = express(),
    apiRouter  = express.Router();

// app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use('/api', apiRouter);
require('./apiRoutes.js')(apiRouter);
app.use(express.static('client'));

app.use(morgan('dev'));

app.listen(port);
console.log("Listening on port: ", port);
