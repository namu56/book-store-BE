const { validationResult, body, param, query } = require('express-validator');

const checkValidationResult = (req, res, next) => {
    const errors = validationResult(req);
    if (errors.isEmpty()) {
        return next();
    }
    return res.status(400).json({ message: errors.array() });
};

const checkEmail = (location, field) =>
    location(field).notEmpty().isEmail().withMessage('이메일을 정확히 입력해주세요');

const checkPassword = (location, field) =>
    location(field).notEmpty().isLength({ min: 8, max: 16 }).withMessage('8~16 이내의 비밀번호를 입력해주세요.');

const checkInt = (location, field) => location(field).optional().isInt();

const checkBoolean = (location, field) => location(field).optional().isBoolean();

// const checkArray = () =>

// const checkObject = () =>

const validateJoin = [checkEmail(body, 'email'), checkPassword(body, 'password'), checkValidationResult];

const validateLogin = [checkEmail(body, 'email'), checkPassword(body, 'password'), checkValidationResult];

const validatePasswordResetRequest = [checkEmail(body, 'email'), checkValidationResult];

const validatepasswordReset = [checkEmail(body, 'email'), checkPassword(body, 'password'), checkValidationResult];

const validateGetAllBooks = [
    checkInt(query, 'categoryId'),
    checkBoolean(query, 'news'),
    checkInt(query, 'limit'),
    checkInt(query, 'currentPage'),
    checkValidationResult,
];

const validateGetBookDetail = [checkInt(param, 'bookId'), checkValidationResult];

const validateAddToCart = [checkInt(body, 'bookId'), checkInt(body, 'quantity'), checkValidationResult];

// 배열 검증
const validateGetCartItems = [];

const validateRemoveCartItem = [checkInt(param, 'cartItemId'), checkValidationResult];

const validateAddLike = [checkInt(param, 'bookId'), checkValidationResult];

const validateRemoveLike = [checkInt(param, 'bookId'), checkValidationResult];

// 배열, 객체 검증 추가
const validateOrder = [];

const validateGetOrderDetail = [checkInt(body, 'orderId'), checkValidationResult];

module.exports = {
    validateJoin,
    validateLogin,
    validatePasswordResetRequest,
    validatepasswordReset,
    validateGetAllBooks,
    validateGetBookDetail,
    validateAddToCart,
    validateGetCartItems,
    validateRemoveCartItem,
    validateAddLike,
    validateRemoveLike,
    validateOrder,
    validateGetOrderDetail,
};
