const cartModel = require('../models/cartModel');
const pool = require('../../mariadb');
const { StatusCodes } = require('http-status-codes');

const addCartItem = async (userId, bookId, quantity) => {
    const connection = await pool.getConnection();

    try {
        return await cartModel.addCartItem(connection, userId, bookId, quantity);
    } catch (err) {
        console.log(err);
        throw err;
    } finally {
        connection.release();
    }
};

const removeCartItem = async (cartItemId) => {
    const connection = await pool.getConnection();

    try {
        return await cartModel.removeCartItem(connection, cartItemId);
    } catch (err) {
        console.log(err);
        throw err;
    } finally {
        connection.release();
    }
};

const selectedCartItem = async (userId, selected) => {
    const connection = await pool.getConnection();

    try {
        return await cartModel.findCart(connection, userId, selected);
    } catch (err) {
        console.log(err);
        throw err;
    } finally {
        connection.release();
    }
};
module.exports = { addCartItem, removeCartItem, selectedCartItem };
