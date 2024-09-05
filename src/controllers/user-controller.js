const { StatusCodes } = require('http-status-codes');
const { UserService } = require('../services');
const { SuccessResponse, ErrorResponse } = require('../utils/common');
const authentication = require('../utils/authentication');
const { UserValidation } = require('../validation');

function registration(req, res) {

    let data = req.body;

    if(!data.email || !data.firstName || !data.lastName || !data.password){
        ErrorResponse.message = "Missing user information";
        ErrorResponse.error = "User data should not be empty.";
        return res
                .status(StatusCodes.BAD_REQUEST)
                .json(ErrorResponse);
    }

    if(UserValidation.validateEmail(data.email) && UserValidation.validateName(data.firstName) && UserValidation.validateName(data.lastName)){
        UserService.registration(data, function(err, result){

            if(err){
                ErrorResponse.message = 'Something went wrong while registering user';
                ErrorResponse.error = err.message || 'Internal Server Error';
                return res
                    .status(err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR)
                    .json(ErrorResponse);
            }
    
            SuccessResponse.message = "registration successful.";
            SuccessResponse.data = data;
            return res
                .status(StatusCodes.CREATED)
                .json(SuccessResponse);
        });
    }
    else{
        ErrorResponse.message = "Validation failed";
        ErrorResponse.error = "Email or user name validation failed ";
        return res
                .status(StatusCodes.BAD_REQUEST)
                .json(ErrorResponse); 
    }




}

function login(req, res){
    let data = req.body;  

    if(!data.email || !data.password){
        ErrorResponse.message = "Missing user information";
        ErrorResponse.error = "User data should not be empty.";
        return res
                .status(StatusCodes.BAD_REQUEST)
                .json(ErrorResponse);
    }

    if(UserValidation.validateEmail(data.email)){
        UserService.login(data, function(err, result){
            if(err){
                ErrorResponse.message = "Something went wrong in user login";
                ErrorResponse.error = err.message || 'Internal Server Error';
                return res
                    .status(err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR)
                    .json(ErrorResponse);
            }
            if(result.length == 0){
                ErrorResponse.message = "Invalid email and password";
                ErrorResponse.error = "Invalid email and password"
                return res
                        .status(StatusCodes.BAD_REQUEST)
                        .json(ErrorResponse);
            }
            else{
                let token = authentication.createToken(data.email);
                SuccessResponse.message = " Login successful";
                SuccessResponse.data = token;
                
                return res
                        .status(StatusCodes.ACCEPTED)
                        .json(SuccessResponse);
            }
        });
    }
    else{
        ErrorResponse.message = "Validation failed";
        ErrorResponse.error = "Email or user name validation failed ";
        return res
                .status(StatusCodes.BAD_REQUEST)
                .json(ErrorResponse); 
    }

}

function profileUpdate(req,res){
    let data = req.body;
    let email = req.headers['email'];

    if(data.firstName){
        if(!UserValidation.validateName(data.firstName)){
            ErrorResponse.message = "Validation failed";
            ErrorResponse.error = "Email or user name validation failed ";
            return res
                    .status(StatusCodes.BAD_REQUEST)
                    .json(ErrorResponse); 
        }
    }
    if(data.lastName){
        if(!UserValidation.validateName(data.lastName)){
            ErrorResponse.message = "Validation failed";
            ErrorResponse.error = "Email or user name validation failed ";
            return res
                    .status(StatusCodes.BAD_REQUEST)
                    .json(ErrorResponse); 
        }
    }

    UserService.profileUpdate(data, email, function (err, result){
        if(err){
            ErrorResponse.message = 'Something went wrong while updating data of user';
            ErrorResponse.error = err.message || 'Internal Server Error';
            return res
                .status(err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR)
                .json(ErrorResponse);
        }
        SuccessResponse.message = "Update successful.";
        SuccessResponse.data = data;
        return res
            .status(StatusCodes.OK)
            .json(SuccessResponse);
    });
    





}


module.exports = {
    registration,
    login,
    profileUpdate
}