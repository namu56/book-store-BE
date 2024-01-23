const express = require('express');
const { addToCart, getCartItems, removeCartItem } = require('../controllers/cartController');
const router = express.Router();
const { strictEnsureAuthorization } = require('../middlewares/authMiddleware');
const { validateAddToCart, validateRemoveLike } = require('../middlewares/validationMiddleware');

router.post('/', validateAddToCart, strictEnsureAuthorization, addToCart); // 장바구니 담기
router.get('/', strictEnsureAuthorization, getCartItems); // 장바구니 아이템 목록 조회 / 선택된 장바구니 아이템 목록 조회
router.delete('/:cartItemId', validateRemoveLike, strictEnsureAuthorization, removeCartItem); // 장바구니 삭제

module.exports = router;
