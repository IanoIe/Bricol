var mysql = require('./connection').pool;


module.exports.getConversas = function (id, callback, next) {
    mysql.getConnection(function (err, conn){
        if (err) {
            if (conn) conn.release();
            callback(err, { code: 500, status: "Erro de ligação a BD!"})
            return;
        }
        conn.query(`select chat.*, if(chat.Utilizador_idUtilizador = ?, u2.Nome, u.Nome) as UtilizadorNome, a.Titulo as TituloAnuncio
            from
                (select m.Utilizador_idUtilizador, m.Anuncio_idAnuncio 
                from Mensagens m
                group by m.Utilizador_idUtilizador, m.Anuncio_idAnuncio) as chat
            inner join Utilizador u on chat.Utilizador_idUtilizador = u.idUtilizador
            inner join Anuncio a on chat.Anuncio_idAnuncio = a.idAnuncio
            inner join Utilizador u2 on a.Utilizador_idUtilizador = u2.idUtilizador
            where a.Utilizador_idUtilizador = ? or chat.Utilizador_idUtilizador = ?`, [id, id, id],
        function (err, result) {
            conn.release();
            callback(false, {code: 200, status: "ok", data: result})
        })
    })
}


module.exports.getMensagens = function (idUtilizador, idAnuncio, callback, next) {
    mysql.getConnection(function (err, conn){
        if (err) {
            if (conn) conn.release();
            callback(err, { code: 500, status: "Erro de ligação a BD!"})
            return;
        }
        conn.query(`select m.Mensagem, m.dataCriacao, m.Remetente_idUtilizador
            from Mensagens m
            where m.Utilizador_idUtilizador = ? and m.Anuncio_idAnuncio = ?`, [idUtilizador, idAnuncio],
        function (err, result) {
            conn.release();
            callback(false, {code: 200, status: "ok", data: result})
        })
    })
}