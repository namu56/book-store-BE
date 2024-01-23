const { getCartItems } = require('../controllers/cartController');

const addDelivery = async (connection, delivery) => {
    const sql = `INSERT INTO delivery (address, receiver, contact) VALUES (?, ?, ?)`;
    const values = [delivery.address, delivery.receiver, delivery.contact];
    const [deliveryResult] = await connection.query(sql, values);

    return deliveryResult;
};

const addOrder = async (connection, userId, deliveryId, firstBookTitle, totalQuantity, totalPrice) => {
    const sql = `INSERT INTO orders (user_id, delivery_id, book_title, total_quantity, total_price)
                 VALUES (?, ?, ?, ?, ?)`;
    const values = [userId, deliveryId, firstBookTitle, totalQuantity, totalPrice];
    const [orderResult] = await connection.query(sql, values);

    return orderResult;
};
const findCartItems = async (connection, cartItems) => {
    const sql = `SELECT * FROM cartItems WHERE id IN (?)`;
    const [getCartItems] = await connection.query(sql, [cartItems]);

    return getCartItems;
};

const addOrderedBook = async (connection, orderId, getCartItems) => {
    const sql = `INSERT INTO orderedBook (order_id, book_id, quantity) VALUES ?;`;
    const values = [];
    getCartItems.forEach((cartItem) => {
        values.push([orderId, cartItem.book_id, cartItem.quantity]);
    });
    const [orderedBookResult] = await connection.query(sql, [values]);
    return orderedBookResult;
};

const removeOrderedBook = async (connection, cartItems) => {
    const sql = `DELETE FROM cartItems WHERE id IN (?)`;
    const [removeCartItemsResult] = await connection.query(sql, [cartItems]);
};

const findOrders = async (connection, userId) => {
    let sql = `SELECT 
                    orders.id,
                    created_at,
                    address,
                    receiver,
                    contact,
                    book_title,
                    total_quantity,
                    total_price
               FROM orders
               LEFT JOIN delivery 
               ON orders.delivery_id = delivery.id
               WHERE user_id = ?`;
    let [ordersData] = await connection.query(sql, userId);
    return ordersData;
};

const findOrder = async (connection, orderId) => {
    const sql = `SELECT 
                    book_id,
                    title,
                    author,
                    price,
                    quantity
               FROM orderedBook
               LEFT JOIN books 
               ON orderedBook.book_id = books.id
               WHERE order_id = ?;`;

    const [orderDetailData] = await connection.query(sql, orderId);
    return orderDetailData;
};
module.exports = { addDelivery, addOrder, findCartItems, addOrderedBook, removeOrderedBook, findOrders, findOrder };
