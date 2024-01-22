const express = require('express');
const { addLike, removeLike } = require('../controllers/LikeController');
const router = express.Router();
const { ensureAuthorization } = require('../middlewares/authMiddleware');
const { validateAddLike, validateRemoveLike } = require('../middlewares/validationMiddleware');

router.post('/:bookId', validateAddLike, ensureAuthorization, addLike); // 좋아요 추가
router.delete('/:bookId', validateRemoveLike, ensureAuthorization, removeLike); // 좋아요 취소

module.exports = router;
