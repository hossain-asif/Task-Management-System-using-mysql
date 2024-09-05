const { StatusCodes } = require('http-status-codes');
const { ExecuteQuery } = require('../repositories');
const AppError = require('../utils/errors/app-error');



function createTask(data, email, callback){
    let sql = `INSERT INTO tasklists 
               (email, title, description, status, created_at, updated_at)
               Values (? , ? , ?, ?, now(), now())`;

    let status = "new";
    let values = [
        email,
        data.title,
        data.description,
        status,
    ];

    console.log(values);

    ExecuteQuery.executionQuery(sql, values, function(err, result){
        callback(err, result);
    })
}


function updateTask(data, email, id, callback){

    let sql = 'UPDATE tasklists SET status= ? WHERE email = ? AND id = ?';
    let values = [
        data.status,
        email,
        id
    ];
    ExecuteQuery.executionQuery(sql, values, function(err, result){
        callback(err, result);
    })
}

function getTask(email, callback){
    let sql = `SELECT * FROM tasklists WHERE email = ?`;
    let values = [
        email
    ];
    ExecuteQuery.executionQuery(sql, values, function(err, result){
        callback(err, result);
    }) 
}

function getTaskById(email, id, callback){
    let sql = `SELECT * FROM tasklists WHERE email = ? AND id = ?`;
    let values = [
        email,
        id
    ];
    ExecuteQuery.executionQuery(sql, values, function(err, result){
        callback(err, result);
    }) 
}


function listTaskByStatus(email, status, callback){
    let sql = `SELECT * FROM tasklists WHERE email = ? AND status = ?`;
    let values = [
        email,
        status
    ];
    ExecuteQuery.executionQuery(sql, values, function(err, result){
        callback(err, result);
    }) 
}


function deleteTask(email, id, callback){
    let sql = `DELETE FROM tasklists WHERE id = ?`;
    let values = [
        id
    ];
    ExecuteQuery.executionQuery(sql, values, function(err, result){
        callback(err, result);
    }) 
}

function statusSummary(email, callback){
    let sql = `SELECT status, COUNT(*) as task_count FROM tasklists WHERE email = ? GROUP BY status;`;
    let values = [
        email
    ];
    ExecuteQuery.executionQuery(sql, values, function(err, result){
        callback(err, result);
    }) 
}



module.exports = {
    createTask,
    updateTask,
    getTask,
    getTaskById,
    listTaskByStatus,
    deleteTask,
    statusSummary
}