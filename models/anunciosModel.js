var mysql = require('./connection').pool

module.exports.getTodosAnuncios = function(callback){
    mysql.getConnection(function(err, conn){
        if(err){
            callback(err, {code:500, status: "Erro de ligação a BD!"});
            return
        }
        conn.query("select idAnuncio, Titulo, Descricao, DatAnuncio, Url, Coordenadas from Anuncio, Imagens, Localizacao where Anuncio_idAnuncio = idAnuncio and Localizacao_idLocalizacao = idLocalizacao",
            function (err, result) {
                conn.release();
                callback(false, {code: 200, status: "ok", data: result})
            })
    })  
}