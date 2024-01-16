const { StatusCodes } = require('http-status-codes');
const {TokenExpiredError, JsonWebTokenError} = require('jsonwebtoken')

const handleQueryError = (err, res) => {
    console.log(err);
    return res.status(StatusCodes.BAD_REQUEST).end();
};

const handleAuthError = (err, req, res, next) => {
    if(err instanceof )
}

module.exports = { handleQueryError };
