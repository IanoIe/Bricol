var mysql= require('./connection').pool

module.exports.getAnuncio = function(Titulo, callback){
    mysql.getConnection(function(err, conn){
        if(err){
            callback(err, {code:500, status: "Erro de ligação a BD!"});
            return
        }
        conn.query("select Titulo, Descricao, DatAnuncio, Url from Anuncio, Imagens where Anuncio_idAnuncio = idAnuncio and Utilizador_idUtilizador = ?", Titulo,
            function (err, result) {
                conn.release();
                callback(false, {code: 200, status: "ok", data: result})
                
            })
    })  
}


module.exports.uploadLocalizacao = function (data, callback){
    console.log(data)
    mysql.getConnection(function(err, conn){
        if(err){
            conn.release();
            next(err);
        }
        else conn.query('INSERT INTO Localizacao(Longitude, Latitude) values(?,?)', [data.Longitude, data.Latitude], function (err, rows){
            conn.release();

            if (err) {
                callback({code: 401, status: err}, null);
            }
            callback({code: 200, status: "ok"}, rows);

        })
    })
}

module.exports.uploadAnuncio = function (data, callback) {
    console.log(data)
    mysql.getConnection(function(err, conn){
        if(err){
            conn.release();
            next(err);
        }
        else conn.query('INSERT INTO Anuncio(Titulo, Descricao, DatAnuncio, Localizacao_idLocalizacao, Utilizador_idUtilizador) values(?,?,?,?,?)', [data.Titulo, data.Descricao, data.DatAnuncio, data.Localizacao_idLocalizacao, data.Utilizador_idUtilizador], function(err, rows){
            conn.release();

            if (err) {
                callback({code: 401, status: err}, data);
            }
            callback({code: 200, status: "ok"}, rows);
        })
    })
}

module.exports.uploadImagem = function(data, callback){
    console.log(data)
    mysql.getConnection(function(err, conn){
        if(err){
            conn.release();
            next(err);
        }
        else conn.query('INSERT INTO Imagens(Url, DatImagem, Anuncio_idAnuncio) values(?,?,?)', [data.Url, data.DatImagem, data.Anuncio_idAnuncio], function(err, rows){
            conn.release();

            if (err) {
                callback({code: 401, status: err}, null);
            }
            callback({code: 200, status: "ok"}, rows);
        })
    })
}