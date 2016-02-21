var createResponse = require('./createResponse.js'),
    Endpoint       = require('./endpointModel.js');

module.exports = function(app) {
  Endpoint = Endpoint(app, createResponse);
  return {
    fetch: function(req, res) {
      var body = [];
      for(var i = 4; i < app.stack.length; i++) {
        body.push(app.stack[i].route.path);
      }
      res.status(200).send(body);
    },
    create: function(req, res) {
      Endpoint.where('endpoint', req.body.endpoint).findOne(function(err, alreadyExistingEndpoint){
        if(err) console.error(err);
        else {
          if(alreadyExistingEndpoint !== null) {
            res.sendStatus(409);
          }
          else {
            new Endpoint({
              endpoint: req.body.endpoint,
              exampleResponse: JSON.stringify(req.body.exampleResponse)
            }).save(function(err, newEndpoint) {
              if(err) return console.error(err);
              else{
                console.log(newEndpoint);
              }
            });
            var responseBody = createResponse(req.body.exampleResponse);
            app.post('/' + req.body.endpoint, function(req, res) {
              res.status(200).send(responseBody());
            });
            res.sendStatus(200);
          }
        }
      })  
    },
    update: function(req, res) {
      //TODO: update existing endpoints
    },
    delete: function(req, res) {
      var route     = req.params.endpoint,
          oldLength = app.stack.length;
      app.stack = app.stack.filter(function(item, index) {
        return item.route.path !== '/' + route;
      });
      if (oldLength === app.stack.length) {
        res.sendStatus(404);
      } else res.sendStatus(200);
    }
  };
};
