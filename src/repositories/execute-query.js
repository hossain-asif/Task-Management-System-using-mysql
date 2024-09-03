

const mysql = require('mysql2');
const {dbConnection, Logger} = require('../config');




function executionQuery(sql, data, callback){
  dbConnection.db.query(sql, data, function(error, result){
    callback(error, result);
  })
}




module.exports = {
    executionQuery
}
