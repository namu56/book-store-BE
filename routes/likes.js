const express = require('express');
const { addLike, removeLike } = require('../controllers/LikeController');
const router = express.Router();

router.post('/:bookId', addLike); // 좋아요 추가
router.delete('/:bookId', removeLike); // 좋아요 취소

module.exports = router;
