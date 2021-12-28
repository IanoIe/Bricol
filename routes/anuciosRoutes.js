const {signedCookie} = require('cookie-parser');
var express = require('express');
var router = express.Router();
var anuncioModels = require("../models/anunciosModel");

/* GEEET all Imagens */
router.get('/:id', function(req, res, next) {
    var id = req.params.id
    anuncioModels.getTodosAnuncios(id, function (status, result) {
      res.status(200).send(result);
    });
  });
  

module.exports = router;