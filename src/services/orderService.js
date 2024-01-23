const orderModel = require('../models/orderModel');
const pool = require('../../mariadb');
const { StatusCodes } = require('http-status-codes');

const order = async (cartItems, delivery, userId, totalQuantity, totalPrice, firstBookTitle) => {
    const connection = await pool.getConnection();

    try {
        const deliveryResult = await orderModel.addDelivery(connection, delivery);

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
        const getCartItems = await orderModel.findCartItems(connection, cartItems);
        const addOrderedBook = await orderModel.addOrderedBook(connection, orderId, getCartItems);
        const removeOrderedBook = await orderModel.removeOrderedBook(connection, cartItems);

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
        const ordersData = await orderModel.findOrders(connection, userId);
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
        const orderDetailData = await orderModel.findOrder(connection, orderId);
        return orderDetailData;
    } catch (err) {
        console.log(err);
        throw err;
    } finally {
        connection.release();
    }
};

module.exports = { order, ordersData, orderDetailData };
