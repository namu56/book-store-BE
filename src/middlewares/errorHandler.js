const { StatusCodes, getReasonPhrase } = require('http-status-codes');
const { TokenExpiredError, JsonWebTokenError } = require('jsonwebtoken');

class QueryErrorHandler extends Error {
    constructor(statusCode, message) {
        super(message || getReasonPhrase(statusCode));
        this.name = 'QueryError';
        this.statusCode = statusCode;
    }
}

const errorHandler = (err, req, res, next) => {
    if (err instanceof TokenExpiredError) {
        return res.status(StatusCodes.UNAUTHORIZED).json({
            message: '로그인 세션이 만료되었습니다. 다시 로그인 하세요.',
        });
    } else if (err instanceof JsonWebTokenError) {
        return res.status(StatusCodes.BAD_REQUEST).json({
            message: '잘못된 토큰입니다.',
        });
    } else if (err instanceof ReferenceError) {
        return res.status(StatusCodes.BAD_REQUEST).json({
            message: '토큰을 입력해주세요.',
        });
    } else if (err instanceof QueryErrorHandler) {
        return res.status(err.statusCode).json({ message: err.message });
    } else {
        return res
            .status(StatusCodes.INTERNAL_SERVER_ERROR)
            .json({ message: '서버에 문제가 발생했습니다.' });
    }
};

module.exports = { errorHandler };
