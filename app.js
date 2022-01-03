var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var loginRouter = require('./routes/loginRoutes');
var registoRouter = require('./routes/registoRoutes');
var mensagemRouter = require('./routes/mensagemRoutes');
var myAnuncioRouter = require('./routes/myAnuncioRoutes')
var anunciosRouter = require('./routes/anunciosRoutes');
var envMensRouter = require('./routes/enviarMensagemRoutes');


var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api/auth', loginRouter);
app.use('/api/auth', registoRouter);
app.use('/api/mensagem', mensagemRouter);
app.use('/api/myAnuncio', myAnuncioRouter);
app.use('/api/anuncio', anunciosRouter);
app.use('/api/envMeng', envMensRouter)


module.exports = app;
