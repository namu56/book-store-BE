const express = require('express');
const { order, getOrders, getOrderDetail } = require('../controllers/OrderController');
const router = express.Router();

router.post('/', order); // 주문하기
router.get('/', getOrders); // 주문 목록 조회
router.get('/:id', getOrderDetail); // 주문 상세 조회

module.exports = router;
