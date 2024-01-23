const express = require('express');
const router = express.Router();
const { getAllBooks, getBookDetail } = require('../controllers/bookController');
const { looseEnsureAuthorization } = require('../middlewares/authMiddleware');
const { validateGetAllBooks, validateGetBookDetail } = require('../middlewares/validationMiddleware');

router.get('/', validateGetAllBooks, getAllBooks); // (카테고리별) 전체 도서 조회
router.get('/:bookId', validateGetBookDetail, looseEnsureAuthorization, getBookDetail); // 개별 도서 조회

module.exports = router;
