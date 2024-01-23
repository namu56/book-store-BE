const orderService = require('../services/orderService');
const { StatusCodes } = require('http-status-codes');

// 주문하기
const order = async (req, res, next) => {
    try {
        const { cartItems, delivery, totalQuantity, totalPrice, firstBookTitle } = req.body;
        const { userId } = req.decodedJwt;

        await orderService.order(cartItems, delivery, userId, totalQuantity, totalPrice, firstBookTitle);

        return res.status(StatusCodes.CREATED).json({ message: '주문 성공' });
    } catch (err) {
        console.log(err);
        next(err);
    }
};

// 주문 목록 조회
const getOrders = async (req, res, next) => {
    try {
        const { userId } = req.decodedJwt;

        const ordersData = await orderService.ordersData(userId);

        return res.status(StatusCodes.OK).json(ordersData);
    } catch (err) {
        next(err);
    }
};

// 주문 상세 조회
const getOrderDetail = async (req, res) => {
    const { orderId } = req.params;

    const orderDetailData = await orderService.orderDetailData(orderId);

    return res.status(StatusCodes.OK).json(orderDetailData);
};

module.exports = { order, getOrders, getOrderDetail };
