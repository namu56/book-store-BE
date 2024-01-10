const conn = require('../mariadb').promise(); // db 모듈
const { StatusCodes } = require('http-status-codes');
const { handleQueryError } = require('../utils/ErrorHandler');

// 주문하기
const order = async (req, res) => {
    const { cartItems, delivery, totalQuantity, totalPrice, userId, firstBookTitle } = req.body;

    let deliveryId;
    let orderId;

    try {
        let sql = `INSERT INTO delivery (address, receiver, contact) VALUES (?, ?, ?)`;
        let values = [delivery.address, delivery.receiver, delivery.contact];

        const [deliveryResults] = await conn.query(sql, values);
        console.log(deliveryResults);

        deliveryId = deliveryResults.insertId;

        sql = `INSERT INTO orders (user_id, delivery_id, book_title, total_quantity, total_price)
           VALUES (?, ?, ?, ?, ?)`;
        values = [userId, deliveryId, firstBookTitle, totalQuantity, totalPrice];

        const [orderResults] = await conn.query(sql, values);
        console.log(orderResults);

        orderId = orderResults.insertId;

        sql = `INSERT INTO orderedBook (order_id, book_id, quantity) VALUES ?;`;

        values = [];
        cartItems.forEach((cartItem) => {
            values.push([orderId, cartItem.book_id, cartItem.quantity]);
        });

        const [orderedResults] = await conn.query(sql, [values]);
        console.log(orderResults);

        return res.status(StatusCodes.OK).json({ message: '주문하기에 성공하였습니다.' });
    } catch (err) {
        return handleQueryError(err, res);
    }
};

// 주문 목록 조회
const getOrders = (req, res) => {};

// 주문 상세 조회
const getOrderDetail = (req, res) => {};

module.exports = { order, getOrders, getOrderDetail };
