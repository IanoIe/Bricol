const {signedCookie} = require('cookie-parser');
var express = require('express');
var router = express.Router();
var anuncioModels = require("../models/myAnuncioModel");

/* GEEET all Imagens */
router.get('/:id', function(req, res, next) {
    var id = req.params.id
    anuncioModels.getAnuncio(id, function (status, result) {
      res.status(200).send(result);
    });
  });

router.post('/guardar/Localizacao', function(req, res, next){
  
  anuncioModels.uploadLocalizacao(req.body, function(status, result){
        if(result.code==200){
            res.send(result);
        }
        else {
            res.statusMessage = status.status;
            res.status(status.code).send(result);
        }
    })
})


router.post('/guardar/Anuncio', function(req, res, next){
  anuncioModels.uploadAnuncio(req.body, function(status, result){
    if(result.code==200){
      res.send(result)
    }
    else {
      res.statusMessage = status.status;
      res.status(status.code).send(result);
    }
  })
})


router.post('/guardar/Imagem', function(req, res, netx){
  anuncioModels.uploadImagem(req.body, function(status, result){
    if(result.code=200){
      res.send(result)
    }
    else {
      res.statusMessage = status.status;
      res.status(status.code).send(result);
    }
  })
})


module.exports = router;