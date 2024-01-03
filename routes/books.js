const express = require('express');
const router = express.Router();
const { allBooks, bookDetail } = require('../controller/BookController');

router.get('/', allBooks); // (카테고리별) 전체 도서 조회
router.get('/:id', bookDetail); // 개별 도서 조회

router.get('/', booksByCategory); // 카테고리별 도서 목록 조회

module.exports = router;
