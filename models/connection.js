var mysql = require('mysql');
var util = require('util');


var pool = mysql.createPool({
    connectionLimit: 20,
    host: 'remotemysql.com',
    user: '4RaaJ3OSXG',
    database: '4RaaJ3OSXG',
    password: 'x2QkYBmS1m',
    database: '4RaaJ3OSXG'
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