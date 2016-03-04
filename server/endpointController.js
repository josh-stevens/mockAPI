var createResponse = require('./createResponse.js'),
    Endpoint       = require('./endpointModel.js');

module.exports = function(app) {
  Endpoint = Endpoint(app, createResponse);
  var controller = {
    fetch: function(req, res) {
      Endpoint.find(function(err, endpoints){
        if(err) console.error(err);
        else {
          var body = [];
          endpoints.forEach(function(item) {
            body.push('/' + item.endpoint);
          });
          res.status(200).send(body);
        }
      });
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
              if(err) res.sendStatus(500);
              else {
                var responseBody = createResponse(req.body.exampleResponse);
                app.post('/' + req.body.endpoint, function(req, res) {
                  res.status(200).send(responseBody());
                });
                app.delete('/' + req.body.endpoint, controller.delete);
                res.sendStatus(200);
              }
            });

          }
        }
      })
    },
    update: function(req, res) {
      //TODO: update existing endpoints
    },
    delete: function(req, res) {
      var route = req.route.path.slice(1);
      Endpoint.remove({endpoint: route}, function(err){
        if(err) res.sendStatus(404);
        else {
          app.stack = app.stack.filter(function(item, index) {
            return item.route.path !== '/' + route;
          });
          res.sendStatus(200);
        }
      });
    }
  };
  return controller;
};
