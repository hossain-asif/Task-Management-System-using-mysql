
const { StatusCodes } = require('http-status-codes');
const { verifyToken } = require('../utils/authentication');
const {ErrorResponse, SuccessResponse} = require('../utils/common');
 

function isAuthenticated(req,res,next){

    const token = req.headers['token'];

    if(!token){
        ErrorResponse.message = "No token found.";
        ErrorResponse.error = "No token found.";
        return res
                .status(StatusCodes.UNAUTHORIZED)
                .json(ErrorResponse);
    }

    let response = verifyToken(token);
    if(!response){
        ErrorResponse.message = "token not verified.";
        ErrorResponse.error = "Authentication error";
        return res
                .status(StatusCodes.UNAUTHORIZED)
                .json(ErrorResponse);
    }
    console.log(response['email']);
    req.headers.email = response['email'];
    next();
}


module.exports = {
    isAuthenticated
}