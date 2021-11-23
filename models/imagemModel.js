var mysql = require('./connection').pool;

/** GET All Imagens */
module.exports.getImagens = function (ojb, callback, next) {
    mysql.getConnection(function (err, conn) {
        if (err) {
            conn.release();
            next(err);
        }
        query = "..."
        
        var values = [];
        if (obj) {
            isFirst = true;
            for (key in obj){
                values.push(obj[key])
                if (!isFirst){
                    query += " and ";
                } else {
                query += " where "
                isFirst = false;
            }
            query += key + "=?";
        }
    }
    
}