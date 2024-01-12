const conn = require('../mariadb'); // db 모듈
const { StatusCodes } = require('http-status-codes');
const { handleQueryError } = require('../utils/ErrorHandler');

const addLike = (req, res) => {
    // 좋아요 추가
    const { bookId } = req.params;
    const { userId } = req.body;

    let sql = 'INSERT INTO likes (user_id, book_id) VALUES (?, ?)';
    let values = [userId, bookId];
    conn.query(sql, values, (err, results) => {
        if (err) return handleQueryError(err, res);

        return res.status(StatusCodes.OK).json(results);
    });
};

const removeLike = (req, res) => {
    // 좋아요 취소
    const { bookId } = req.params;
    const { userId } = req.body;

    let sql = 'DELETE FROM likes WHERE user_id = ? AND book_id = ?';
    let values = [userId, bookId];
    conn.query(sql, values, (err, results) => {
        if (err) return handleQueryError(err, res);

        return res.status(StatusCodes.OK).json(results);
    });
};

module.exports = { addLike, removeLike };
