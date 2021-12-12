var express = require('express');
var router = express.Router();
var mensagemModel = require('../models/mensagemModel');

/* GET users listing. */
router.get('/:id', function(req, res, next) {
  var id = req.params.id
  mensagemModel.getMessgens(id, function (status, result) {
    res.status(200).send(result);
  });
});

module.exports = router;
