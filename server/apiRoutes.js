
module.exports = function(app) {
  var routeController = require('./routeController.js')(app);
  app.post('/create', routeController.create);
  app.put('/:endpoint', routeController.update);
  app.delete('/:endpoint', routeController.delete);
};
