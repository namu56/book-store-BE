const conn = require('../mariadb').promise(); // db 모듈
const { StatusCodes } = require('http-status-codes');
const { handleQueryError } = require('../utils/ErrorHandler');

// 주문하기
const order = async (req, res) => {
    const { cartItems, delivery, totalQuantity, totalPrice, userId, firstBookTitle } = req.body;

    console.log('cartItem: ', cartItems);

    try {
        // delivery 테이블 삽입
        let sql = `INSERT INTO delivery (address, receiver, contact) VALUES (?, ?, ?)`;
        let values = [delivery.address, delivery.receiver, delivery.contact];
        const [deliveryResults] = await conn.query(sql, values);
        let deliveryId = deliveryResults.insertId;

        // orders 테이블 삽입
        sql = `INSERT INTO orders (user_id, delivery_id, book_title, total_quantity, total_price)
           VALUES (?, ?, ?, ?, ?)`;
        values = [userId, deliveryId, firstBookTitle, totalQuantity, totalPrice];
        const [orderResults] = await conn.query(sql, values);
        let orderId = orderResults.insertId;

        // 결제할 도서정보 장바구니에서 가져오기
        sql = `SELECT * FROM cartItems WHERE id IN (?)`;
        const [getCartItems] = await conn.query(sql, [cartItems]);

        // orderedBook 테이블 삽입
        sql = `INSERT INTO orderedBook (order_id, book_id, quantity) VALUES ?;`;
        values = [];
        getCartItems.forEach((cartItem) => {
            values.push([orderId, cartItem.book_id, cartItem.quantity]);
        });
        const [orderedBookResults] = await conn.query(sql, [values]);

        // 결제된 도서 장바구니 삭제
        sql = `DELETE FROM cartItems WHERE id IN (?)`;
        const [removeCartItemsResults] = await conn.query(sql, [cartItems]);

        return res.status(StatusCodes.OK).json(removeCartItemsResults);
    } catch (err) {
        return handleQueryError(err, res);
    }
};

// 주문 목록 조회
const getOrders = async (req, res) => {
    let sql = `SELECT orders.id,
                      created_at,
                      address,
                      receiver,
                      contact,
                      book_title,
                      total_quantity,
                      total_price
               FROM orders
               LEFT JOIN delivery 
               ON orders.delivery_id = delivery.id;`;
    let [getOrdersResults] = await conn.query(sql);

    return res.status(StatusCodes.OK).json(rows);
};

// 주문 상세 조회
const getOrderDetail = (req, res) => {};

module.exports = { order, getOrders, getOrderDetail };
