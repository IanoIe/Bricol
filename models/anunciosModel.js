var mysql = require('./connection').pool

module.exports.getAnuncio = function(Titulo, callback){
    mysql.getConnection(function(err, conn){
        if(err){
            callback(err, {code:500, status: "Erro de ligação a BD!"});
            return
        }
        conn.query("select Titulo, Descricao, DatAnuncio, Url from Anuncio, Imagens where Anuncio_idAnuncio = idAnuncio and Utilizador_idUtilizador != ?", Titulo,
            function (err, result) {
                conn.release();
                callback(false, {code: 200, status: "ok", data: result})
                
            })
    })  
}