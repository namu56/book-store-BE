const orderModel = require('../models/orderModel');
const pool = require('../../mariadb');
const { StatusCodes } = require('http-status-codes');

const order = async (
    items,
    delivery,
    userId,
    totalQuantity,
    totalPrice,
    firstBookTitle
) => {
    const connection = await pool.getConnection();

    try {
        const deliveryResult = await orderModel.addDelivery(
            connection,
            delivery
        );

        let deliveryId = deliveryResult.insertId;
        const orderResult = await orderModel.addOrder(
            connection,
            userId,
            deliveryId,
            firstBookTitle,
            totalQuantity,
            totalPrice
        );
        let orderId = orderResult.insertId;
        const getCartItems = await orderModel.findCartItems(connection, items);
        const addOrderedBook = await orderModel.addOrderedBook(
            connection,
            orderId,
            getCartItems
        );
        const removeOrderedBook = await orderModel.removeOrderedBook(
            connection,
            items
        );

        return;
    } catch (err) {
        console.log(err);
        throw err;
    } finally {
        connection.release();
    }
};

const ordersData = async (userId) => {
    const connection = await pool.getConnection();

    try {
        let ordersData = await orderModel.findOrders(connection, userId);

        ordersData = ordersData.map((order) => ({
            id: order.id,
            createdAt: order.created_at,
            address: order.address,
            receiver: order.receiver,
            contact: order.contact,
            bookTitle: order.book_title,
            totalQuantity: order.total_quantity,
            totalPrice: order.total_price,
        }));

        return ordersData;
    } catch (err) {
        console.log(err);
        throw err;
    } finally {
        connection.release();
    }
};

const orderDetailData = async (orderId) => {
    const connection = await pool.getConnection();

    try {
        let orderDetailData = await orderModel.findOrder(connection, orderId);

        orderDetailData = orderDetailData.map((orderDetailItem) => ({
            bookId: orderDetailItem.book_id,
            title: orderDetailItem.title,
            author: orderDetailItem.author,
            price: orderDetailItem.price,
            quantity: orderDetailItem.quantity,
        }));

        return orderDetailData;
    } catch (err) {
        console.log(err);
        throw err;
    } finally {
        connection.release();
    }
};

module.exports = { order, ordersData, orderDetailData };
