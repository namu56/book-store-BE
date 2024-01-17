const express = require('express');
const router = express.Router();
const { getAllBooks, getBookDetail } = require('../controllers/BookController');
const { ensureAuthorization } = require('../middlewares/authMiddleware');

router.get('/', getAllBooks); // (카테고리별) 전체 도서 조회
router.get('/:bookId', ensureAuthorization, getBookDetail); // 개별 도서 조회

module.exports = router;
