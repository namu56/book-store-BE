const express = require('express');
const { addToCart, getCartItems, removeCartItem } = require('../controllers/cartController');
const router = express.Router();
const { ensureAuthorization } = require('../middlewares/authMiddleware');
const { validateAddToCart, validateGetCartItems, validateRemoveLike } = require('../middlewares/validationMiddleware');

router.post('/', validateAddToCart, ensureAuthorization, addToCart); // 장바구니 담기
router.get('/', validateGetCartItems, ensureAuthorization, getCartItems); // 장바구니 아이템 목록 조회 / 선택된 장바구니 아이템 목록 조회
router.delete('/:cartItemId', validateRemoveLike, ensureAuthorization, removeCartItem); // 장바구니 삭제

module.exports = router;
