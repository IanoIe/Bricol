var mysql = require('./connection').pool;

module.exports.getMessgens = function (id, callback, next) {
    mysql.getConnection(function (err, conn){
        if (err) {
            if (conn) conn.release();
            callback(err, { code: 500, status: "Erro de ligação a BD!"})
            return;
        }
        conn.query("select distinct(Nome), Mensagem, dataCriacao, idAnuncio from Mensagens, Utilizador, Anuncio where Anuncio.Utilizador_idUtilizador = ? and idAnuncio = Anuncio_idAnuncio and Mensagens.Utilizador_idUtilizador = idUtilizador", id,
        function (err, result) {
            conn.release();
            callback(false, {code: 200, status: "ok", data: result})
            
        })
    })
    
}