const express = require('express');
const { addLike, removeLike } = require('../controllers/likeController');
const router = express.Router();
const { strictEnsureAuthorization } = require('../middlewares/authMiddleware');
const { validateAddLike, validateRemoveLike } = require('../middlewares/validationMiddleware');

router.post('/:bookId', validateAddLike, strictEnsureAuthorization, addLike); // 좋아요 추가
router.delete('/:bookId', validateRemoveLike, strictEnsureAuthorization, removeLike); // 좋아요 취소

module.exports = router;
