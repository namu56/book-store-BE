const express = require('express');
const { order, getOrders, getOrderDetail } = require('../controllers/OrderController');
const router = express.Router();
const { ensureAuthorization } = require('../middlewares/authMiddleware');

router.post('/', ensureAuthorization, order); // 주문하기
router.get('/', ensureAuthorization, getOrders); // 주문 목록 조회
router.get('/:orderId', ensureAuthorization, getOrderDetail); // 주문 상세 조회

module.exports = router;
