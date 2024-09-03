const { StatusCodes } = require('http-status-codes');
const { UserService } = require('../services');
const { SuccessResponse, ErrorResponse } = require('../utils/common');

function registration(req, res) {

    let data = req.body;

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

module.exports = {
    registration
}