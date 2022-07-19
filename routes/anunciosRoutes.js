const {signedCookie} = require('cookie-parser');
var express = require('express');
var router = express.Router();
var anuncioModels = require("../models/anunciosModel");

/* GET all Anuncios */
router.get('/', function(req, res, next) {
    anuncioModels.getTodosAnuncios(function (status, result) {
      res.status(200).send(result);
    });
  });
  

module.exports = router;