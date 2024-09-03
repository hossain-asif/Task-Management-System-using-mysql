

const { StatusCodes } = require('http-status-codes');
const { ExecuteQuery } = require('../repositories');
const AppError = require('../utils/errors/app-error');


function registration(data, callback){
    let sql = `INSERT INTO users 
               (email, firstName, lastName, password, created_at, updated_at)
               Values (? , ? , ?, ?, now(), now())`;
    let values = [
        data.email,
        data.firstName,
        data.lastName,
        data.password
    ];

    ExecuteQuery.executionQuery(sql, values, function (err, result){
        callback(err, result);
    });

}

module.exports = {
    registration
}