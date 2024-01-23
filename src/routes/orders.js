const express = require('express');
const { order, getOrders, getOrderDetail } = require('../controllers/orderController');
const router = express.Router();
const { strictEnsureAuthorization } = require('../middlewares/authMiddleware');
const { validateOrder, validateGetOrderDetail } = require('../middlewares/validationMiddleware');

router.post('/', strictEnsureAuthorization, order); // 주문하기
router.get('/', strictEnsureAuthorization, getOrders); // 주문 목록 조회
router.get('/:orderId', validateGetOrderDetail, strictEnsureAuthorization, getOrderDetail); // 주문 상세 조회

module.exports = router;
