const express = require('express');
const { order, getOrders, getOrderDetail } = require('../controllers/orderController');
const router = express.Router();
const { ensureAuthorization } = require('../middlewares/authMiddleware');
const { validateOrder, validateGetOrderDetail } = require('../middlewares/validationMiddleware');

router.post('/', validateOrder, ensureAuthorization, order); // 주문하기
router.get('/', ensureAuthorization, getOrders); // 주문 목록 조회
router.get('/:orderId', validateGetOrderDetail, ensureAuthorization, getOrderDetail); // 주문 상세 조회

module.exports = router;
