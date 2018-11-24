'use strict';

var mysql = require('mysql');
var util = require('util');
//local mysql db connection
var connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : 'root',
    database : 'nodedb'
});

// connection.connect(function (err) {
//     if (err) throw err;
// });
connection.query = util.promisify(connection.query) // Magic happens here.

exports.connection = connection;

exports.myAsyncQuery = async (pQuery) => {
    try {
        return await connection.query(pQuery)
    } catch (err) {
        throw new Error(err)
    }
}

  