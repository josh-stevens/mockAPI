var mongoose = require('mongoose');

module.exports = function(app, createResponse) {
  mongoose.connect('mongodb://localhost/mockdb');

  var endpointSchema = mongoose.Schema({
    endpoint: String,
    exampleResponse: String
  });

  var Endpoint = mongoose.model('Endpoint', endpointSchema);

  Endpoint.find(function(err, endpoints){
    if (err) console.error(err);
    else {
      // Put all the saved endpoints onto app.stack
      endpoints.forEach(function(item) {
        var responseBody = createResponse(JSON.parse(item.exampleResponse));
        app.post('/' + item.endpoint, function(req, res) {
          res.status(200).send(responseBody());
        });
      });
    }
  });

  return Endpoint;
}
