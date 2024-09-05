

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

function login(data, callback){
    let sql = `SELECT * FROM users WHERE email = ? AND password = ?`;
    let values = [
        data.email,
        data.password
    ];
    ExecuteQuery.executionQuery(sql, values, function(err, result){
        callback(err, result);
    });
}

function profileUpdate(data, email, callback){

    if(data.firstName && !data.lastName){
        let sql = 'UPDATE users SET firstName= ? WHERE email = ?';
        let values = [
            data.firstName,
            email
        ];
        ExecuteQuery.executionQuery(sql, values, function(err, result){
            callback(err, result);
        });
    }
    else if(!data.firstName && data.lastName){
        let sql = 'UPDATE users SET lastName= ? WHERE email = ?';
        let values = [
            data.lastName,
            email
        ];
        ExecuteQuery.executionQuery(sql, values, function(err, result){
            callback(err, result);
        });
    }
    if(data.firstName && data.lastName){
        let sql = 'UPDATE users SET firstName= ?, lastName = ? WHERE email = ?';
        let values = [
            data.firstName,
            data.lastName,
            email
        ];
        ExecuteQuery.executionQuery(sql, values, function(err, result){
            callback(err, result);
        });

    }

}


module.exports = {
    registration,
    login,
    profileUpdate
}