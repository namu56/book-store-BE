const conn = require('../mariadb'); // db 모듈
const { StatusCodes } = require('http-status-codes');
const { handleQueryError } = require('../utils/ErrorHandler');
const { ensureAuthorization } = require('../utils/auth');
const jwt = require('jsonwebtoken');

const addLike = (req, res) => {
    // 좋아요 추가
    const { bookId } = req.params;
    let authorization = ensureAuthorization(req, res);

    if (authorization instanceof jwt.TokenExpiredError) {
        return res.status(StatusCodes.UNAUTHORIZED).json({
            message: '로그인 세션이 만료되었습니다. 다시 로그인 하세요.',
        });
    } else if (authorization instanceof jwt.JsonWebTokenError) {
        return res.status(StatusCodes.BAD_REQUEST).json({
            message: '잘못된 토큰입니다.',
        });
    } else {
        let sql = 'INSERT INTO likes (user_id, book_id) VALUES (?, ?)';
        let values = [authorization.userId, bookId];
        conn.query(sql, values, (err, results) => {
            if (err) return handleQueryError(err, res);

            return res.status(StatusCodes.OK).json(results);
        });
    }
};

const removeLike = (req, res) => {
    // 좋아요 취소
    const { bookId } = req.params;
    let authorization = ensureAuthorization(req, res);

    if (authorization instanceof jwt.TokenExpiredError) {
        return res.status(StatusCodes.UNAUTHORIZED).json({
            message: '로그인 세션이 만료되었습니다. 다시 로그인 하세요.',
        });
    } else if (authorization instanceof jwt.JsonWebTokenError) {
        return res.status(StatusCodes.BAD_REQUEST).json({
            message: '잘못된 토큰입니다.',
        });
    } else {
        let sql = 'DELETE FROM likes WHERE user_id = ? AND book_id = ?';
        let values = [authorization.userId, bookId];
        conn.query(sql, values, (err, results) => {
            if (err) return handleQueryError(err, res);

            return res.status(StatusCodes.OK).json(results);
        });
    }
};

module.exports = { addLike, removeLike };
