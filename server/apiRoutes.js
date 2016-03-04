
module.exports = function(app) {
  var endpointController = require('./endpointController.js')(app);
  app.get('/list', endpointController.fetch);
  app.post('/create', endpointController.create);
  app.put('/:endpoint', endpointController.update);
};
