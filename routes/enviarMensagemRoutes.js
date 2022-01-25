const {signedCookie} = require('cookie-parser');
const { Router } = require('express');
var express = require('express');
var router = express.Router();
var envMenModels = require("../models/enviarMensagemModel");

/*  */
router.get('/:id', function (req, res, next){
    var id = req.params.id
    envMenModels.getEnviarMensagem(id, function (status, result) {
        if (result.code == 200){
            console.log("eeeeeeeeeeeeeeeeeeeee");
            res.send(result);
        }
        else {
            res.statusMessage = status.status;
            res.status(status.code).send(result);
        }
    });
});

router.post('/guardar/:id', function(req, res, next){
    var data = [req.body.mensagem, new Date(), req.body.idUtilizador,  req.params.id]
    envMenModels.guardarMensagem(data, function(status, result){
        if(result.code==200){
            res.send(result);
        }
        else {
            res.statusMessage = status.status;
            res.status(status.code).send(result);
        }
    })
})

module.exports = router;