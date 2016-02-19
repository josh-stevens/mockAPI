module.exports = function(app) {
  return {
    create: function(req, res) {
      app.post('/' + req.body.endpoint, function(req, res) {
        res.status(200).send({"success":"true"});
      });
      res.send(200);
    },
    update: function(req, res) {
    },
    delete: function(req, res) {
      var route = req.params.endpoint;
      app.stack = app.stack.filter(function(item, index) {
        !item.regexp.toString().includes(route);
      });
      res.send(200);
    }
  };
};
