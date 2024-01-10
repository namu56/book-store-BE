const conn = require('../mariadb'); // db 모듈
const { StatusCodes } = require('http-status-codes');
const { handleQueryError } = require('../utils/ErrorHandler');

// 주문하기
const order = (req, res) => {
    const { cartItems, delivery, totalQuantity, totalPrice, userId, firstBookTitle } = req.body;

    let delivery_id;
    let order_id;

    let sql = `INSERT INTO delivery (address, receiver, contact) VALUES (?, ?, ?)`;
    let values = [delivery.address, delivery.receiver, delivery.contact];

    conn.query(sql, values, (err, results) => {
        if (err) return handleQueryError(err, res);

        delivery_id = results.insertId;

        return res.status(StatusCodes.OK).json(results);
    });

    sql = `INSERT INTO orders (user_id, delivery_id, book_title, total_quantity, total_price)
           VALUES (?, ? , ?, ?, ?)`;
    values = [userId, delivery_id, firstBookTitle, totalQuantity, totalPrice];

    conn.query(sql, values, (err, results) => {
        if (err) return handleQueryError(err, res);

        order_id = results.insertId;

        return res.status(StatusCodes.OK).json(results);
    });

    sql = `INSERT INTO orderedBook (order_id, book_id, quantity) VALUES ?;`;

    values = [];
    cartItems.forEach((cartItem) => {
        values.push([order_id, cartItem.book_id, cartItem.quantity]);
        console.log(values);
    });

    conn.query(sql, [values], (err, results) => {
        if (err) return handleQueryError(err, res);

        return res.status(StatusCodes.OK).json(results);
    });
};

// 주문 목록 조회
const getOrders = (req, res) => {};

// 주문 상세 조회
const getOrderDetail = (req, res) => {};

module.exports = { order, getOrders, getOrderDetail };
