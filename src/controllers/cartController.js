const cartService = require('../services/cartService');
const { StatusCodes } = require('http-status-codes');
const { QueryErrorHandler } = require('../middlewares/errorHandler');
const jwt = require('jsonwebtoken');

// 장바구니 담기
const addToCart = async (req, res, next) => {
    try {
        const { bookId, quantity } = req.body;
        const { userId } = req.decodedJwt;

        const result = await cartService.addCartItem(userId, bookId, quantity);

        return res.status(StatusCodes.CREATED).json(result);
    } catch (err) {
        next(err);
    }
};

// 장바구니 아이템 목록 조회 / 선택된 장바구니 아이템 목록 조회
const getCartItems = async (req, res, next) => {
    try {
        const { selected } = req.body;
        const { userId } = req.decodedJwt;

        const selectedCartItem = await cartService.selectedCartItem(userId, selected);
        return res.status(StatusCodes.OK).json(selectedCartItem);
    } catch (err) {
        next(err);
    }
};

// 장바구니 아이템 삭제
const removeCartItem = async (req, res, next) => {
    try {
        const { cartItemId } = req.params;

        const result = await cartService.removeCartItem(cartItemId);

        return res.status(StatusCodes.OK).json(result);
    } catch (err) {
        next(err);
    }
};

module.exports = { addToCart, getCartItems, removeCartItem };
