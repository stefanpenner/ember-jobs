module.exports = function(app) {
  var express = require('express');
  var checkoutRouter = express.Router();

  checkoutRouter.get('/', function(req, res) {
    res.send({
      'checkout': []
    });
  });

  checkoutRouter.post('/', function(req, res) {
    res.status(201).end();
  });

  checkoutRouter.get('/:id', function(req, res) {
    res.send({
      'checkout': {
        id: req.params.id
      }
    });
  });

  checkoutRouter.put('/:id', function(req, res) {
    res.send({
      'checkout': {
        id: req.params.id
      }
    });
  });

  checkoutRouter.delete('/:id', function(req, res) {
    res.status(204).end();
  });

  app.use('/api/checkout', checkoutRouter);
};
