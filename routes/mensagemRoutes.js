var express = require('express');
var router = express.Router();
var mensagemModel = require('../models/mensagemModel');


router.get('/conversas/utilizador/:id', function(req, res, next) {
  var id = req.params.id
  mensagemModel.getConversas(id, function (status, result) {
    res.status(200).send(result);
  });
});

router.get('/utilizador/:idUtilizador/anuncio/:idAnuncio', function(req, res, next) {
  var idUtilizador = req.params.idUtilizador;
  var idAnuncio = req.params.idAnuncio;

  mensagemModel.getMensagens(idUtilizador, idAnuncio, function (status, result) {
    res.status(200).send(result);
  });
});

module.exports = router;
