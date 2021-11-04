const { Console } = require('console');
var mysql = require('mysql');
var util = require('util');


var pool = mysql.createPool({
    connectionLimit: 20,
    host: 'remotemysql.com',
    user: 'bricol',
    password: 'Mamae1986',
    database: 'bricol'
});

// Ping database to check for common exception errors.
pool.getConnection((err, connection) => {
    if (err) {
        if (err.code === 'PROTOCOL_CONNECTION_LOST'){
            console.error('Database connection was closed.');
        }
        if (err.code === 'ER_CON_COUNT_ERROR'){
            Console.error('Database has too many connections.')
        }
        if (err.code === 'ECONNREFUSED'){
            console.error('Database connection was refused.')
        }
        console.log(err);
    }
    if (connection) connection.release()
    return
})
// Promisify for Node.js async/await.
pool.query = util.promisify(pool.query);

module.exports.pool = pool;