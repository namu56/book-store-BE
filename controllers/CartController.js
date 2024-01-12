const conn = require('../mariadb'); // db 모듈
const { StatusCodes } = require('http-status-codes');
const { handleQueryError } = require('../utils/ErrorHandler');

// 장바구니 담기
const addToCart = (req, res) => {
    const { userId, bookId, quantity } = req.body;

    let sql = 'INSERT INTO cartItems (user_id, book_id, quantity) VALUES (?, ?, ?)';
    let values = [userId, bookId, quantity];
    conn.query(sql, values, (err, results) => {
        if (err) return handleQueryError(err, res);

        return res.status(StatusCodes.OK).json(results);
    });
};

// 장바구니 아이템 목록 조회 / 선택된 장바구니 아이템 목록 조회
const getCartItems = (req, res) => {
    const { userId, selected } = req.body;
    console.log(selected);
    let sql = `SELECT cartItems.id, book_id, title, summary, quantity, price 
                FROM cartItems
                LEFT JOIN books 
                ON cartItems.book_id = books.id
                WHERE user_id = ?`;
    let values = [userId];

    if (selected) {
        sql += ' AND cartItems.id IN (?)';
        values.push(selected);
    }

    conn.query(sql, values, (err, results) => {
        if (err) return handleQueryError(err, res);

        return res.status(StatusCodes.OK).json(results);
    });
};

// 장바구니 아이템 삭제
const removeCartItem = (req, res) => {
    const { cartItemId } = req.params;

    let sql = 'DELETE FROM cartItems WHERE id = ?;';
    conn.query(sql, cartItemId, (err, results) => {
        if (err) return handleQueryError(err, res);

        return res.status(StatusCodes.OK).json(results);
    });
};

module.exports = { addToCart, getCartItems, removeCartItem };
