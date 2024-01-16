const conn = require('../mariadb'); // db 모듈
const { StatusCodes } = require('http-status-codes');
const { handleQueryError } = require('../utils/ErrorHandler');
const { ensureAuthorization } = require('../utils/authMiddleware'); // 인증 모듈
const jwt = require('jsonwebtoken');

// 장바구니 담기
const addToCart = (req, res) => {
    const { bookId, quantity } = req.body;

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
        let sql = 'INSERT INTO cartItems (user_id, book_id, quantity) VALUES (?, ?, ?)';
        let values = [authorization.userId, bookId, quantity];
        conn.query(sql, values, (err, results) => {
            if (err) return handleQueryError(err, res);

            return res.status(StatusCodes.OK).json(results);
        });
    }
};

// 장바구니 아이템 목록 조회 / 선택된 장바구니 아이템 목록 조회
const getCartItems = (req, res) => {
    const { selected } = req.body;
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
        // 장바구니 아이템 목록 조회
        let sql = `SELECT cartItems.id, book_id, title, summary, quantity, price 
        FROM cartItems
        LEFT JOIN books 
        ON cartItems.book_id = books.id
        WHERE user_id = ?`;
        let values = [authorization.userId];

        // 선택된 장바구니 아이템 목록 조회
        if (selected) {
            sql += ' AND cartItems.id IN (?)';
            values.push(selected);
        }

        conn.query(sql, values, (err, results) => {
            if (err) return handleQueryError(err, res);

            return res.status(StatusCodes.OK).json(results);
        });
    }
};

// 장바구니 아이템 삭제
const removeCartItem = (req, res) => {
    const { cartItemId } = req.params;

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
        let sql = 'DELETE FROM cartItems WHERE id = ?;';
        conn.query(sql, cartItemId, (err, results) => {
            if (err) return handleQueryError(err, res);

            return res.status(StatusCodes.OK).json(results);
        });
    }
};

module.exports = { addToCart, getCartItems, removeCartItem };
