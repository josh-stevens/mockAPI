
module.exports = function(app) {
  var routeController = require('./routeController.js')(app);
  app.get('/list', routeController.fetch);
  app.post('/create', routeController.create);
  app.put('/:endpoint', routeController.update);
  app.delete('/:endpoint', routeController.delete);
};
