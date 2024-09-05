const { StatusCodes } = require('http-status-codes');
const { TaskService } = require('../services');
const { SuccessResponse, ErrorResponse } = require('../utils/common');
const authentication = require('../utils/authentication');
const { TaskValidation } = require('../validation');


function createTask(req, res){

    let data = req.body;
    let email = req.headers['email'];


    if(!data.title || !data.description){
        ErrorResponse.message = "title and description should not be empty.";
        ErrorResponse.error = "title and description should not be empty.";
        return res
                .status(StatusCodes.BAD_REQUEST)
                .json(ErrorResponse);

    }

    if(!TaskValidation.validateString(data.title) || !TaskValidation.validateString(data.description)){
        ErrorResponse.message = "validation faild.";
        ErrorResponse.error = "title or description validation failed.";
        return res
                .status(StatusCodes.BAD_REQUEST)
                .json(ErrorResponse);
    }

    TaskService.createTask(data, email, function (err, result){
        if(err){
            ErrorResponse.message = "Something went wrong while creating task."
            ErrorResponse.error = err;
            res
              .status(StatusCodes.INTERNAL_SERVER_ERROR)
              .json(ErrorResponse);
        }
        SuccessResponse.message = "task create successful.";
        SuccessResponse.data = result;
        return res
                .status(StatusCodes.CREATED)
                .json(SuccessResponse);
    })
}

function updateTask(req, res){
    let data = req.body;
    let email = req.headers['email'];
    let id = req.params.id;

    console.log(data, email, id);

    TaskService.updateTask(data, email, id, function(err, result){
        if(err){
            ErrorResponse.message = "Something went wrong in updation.";
            ErrorResponse.error = err;
            return res
                    .status(StatusCodes.BAD_REQUEST)
                    .json(ErrorResponse);
        }

        SuccessResponse.message = "Update successful";
        SuccessResponse.data = result;
        return res
                .status(StatusCodes.ACCEPTED)
                .json(SuccessResponse);
    });

}

function getTask(req, res){
    let email = req.headers['email'];

    TaskService.getTask(email, function(err, result){
        if(err){
            ErrorResponse.message = "Something went wrong for getting data";
            ErrorResponse.error = err;
            return res
                    .status(StatusCodes.BAD_REQUEST)
                    .json(ErrorResponse);
        }


        SuccessResponse.message = "task read successful";
        SuccessResponse.data = result;
        return res
                .status(StatusCodes.OK)
                .json(SuccessResponse);
    });
}

function getTaskById(req, res){
    let email = req.headers['email'];
    let id = req.params.id;

    TaskService.getTaskById(email, id, function(err, result){
        if(err){
            ErrorResponse.message = "Something went wrong for getting data by task id";
            ErrorResponse.error = err;
            return res
                    .status(StatusCodes.BAD_REQUEST)
                    .json(ErrorResponse);
        }


        SuccessResponse.message = "task read successful";
        SuccessResponse.data = result;
        return res
                .status(StatusCodes.OK)
                .json(SuccessResponse);
    });
}


function listTaskByStatus(req, res){
    let email = req.headers['email'];
    let status = req.params.status;



    TaskService.listTaskByStatus(email, status, function(err, result){
        if(err){
            ErrorResponse.message = "Something went wrong for getting data by status";
            ErrorResponse.error = err;
            return res
                    .status(StatusCodes.BAD_REQUEST)
                    .json(ErrorResponse);
        }


        SuccessResponse.message = "task read by status successful";
        SuccessResponse.data = result;
        return res
                .status(StatusCodes.OK)
                .json(SuccessResponse);
    });
}


function deleteTask (req, res){
    let email = req.headers['email'];
    let id = req.params.id;



    TaskService.deleteTask(email, id, function(err, result){
        if(err){
            ErrorResponse.message = "Something went wrong deleting task by id";
            ErrorResponse.error = err;
            return res
                    .status(StatusCodes.BAD_REQUEST)
                    .json(ErrorResponse);
        }


        SuccessResponse.message = "task delete successful";
        SuccessResponse.data = result;
        return res
                .status(StatusCodes.OK)
                .json(SuccessResponse);
    });
}


function statusSummary(req,res){
    let email = req.headers['email'];
    TaskService.statusSummary(email, function(err, result){
        if(err){
            ErrorResponse.message = "Something went wrong in status summary";
            ErrorResponse.error = err;
            return res
                    .status(StatusCodes.BAD_REQUEST)
                    .json(ErrorResponse);
        }


        SuccessResponse.message = "task status summary getting successful.";
        SuccessResponse.data = result;
        return res
                .status(StatusCodes.OK)
                .json(SuccessResponse);
    });
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