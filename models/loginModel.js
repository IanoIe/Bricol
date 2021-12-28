var mysql = require('./connection').pool;

module.exports.login = function(obj, callback, next){
    mysql.getConnection(function (err, conn){
        if (err){
            conn.release();
            next(err);
        }
        else conn.query("Select idUtilizador, Nome, Username, Email, Password from Utilizador where Email=? and Password=?", [obj.Email, obj.Password], function(err, rows){
            conn.release();
            if (!(rows.length === 0)) {
                callback({code: 200, status: "Ok"}, rows);
            }
            else {
                callback({code: 401, status: "Email ou Senha incorrecto"}, null);
            }
        })
    })
}