const {signedCookie} = require('cookie-parser');
var express = require('express');
var router = express.Router();
var imagModels = require("../models/imagemModel");

/* Get all Imagens */
router.get('/', function (req, res, next){
    console.log(req.query)
    imagModels.getImages(req.query, function (status, result) {
        if (status.code == 200)
        res.send(result);
        else {
            res.statusMessage = status.status;
            res.status(status.code).send(result);
        }
    });
});

module.exports = router;
