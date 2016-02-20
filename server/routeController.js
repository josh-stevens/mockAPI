module.exports = function(app) {
  return {
    fetch: function(req, res) {
      var body = [];
      for(var i = 4; i < app.stack.length; i++) {
        body.push(app.stack[i].route.path);
      }
      res.status(200).send(body);
    },
    create: function(req, res) {
      var found = false;
      app.stack.forEach(function(item) {
        if(item.route.path === '/' + req.body.endpoint) {
          res.sendStatus(409);
          found = true;
        }
      });
      if(!found) {
        app.post('/' + req.body.endpoint, function(req, res) {
          res.status(200).send({"success":"true"});
        });
        res.sendStatus(200);
      }
    },
    update: function(req, res) {
    },
    delete: function(req, res) {
      var route = req.params.endpoint;
      app.stack = app.stack.filter(function(item, index) {
        return item.route.path !== '/' + route;
      });
      res.sendStatus(200);
    }
  };
};
