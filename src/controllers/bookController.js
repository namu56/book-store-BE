const bookService = require('../services/bookService');
const { StatusCodes } = require('http-status-codes');

// (카테고리 별, 신간 여부) 전체 도서 목록 조회
const getAllBooks = async (req, res, next) => {
    try {
        const { categoryId, news, limit, currentPage } = req.query;
        console.log(news);

        const allBooksAndPageData = await bookService.allBooksData(categoryId, news, limit, currentPage);

        return res.status(StatusCodes.OK).json(allBooksAndPageData);
    } catch (err) {
        console.log(err);
        next(err);
    }
};

const getBookDetail = async (req, res, next) => {
    // 로그인 상태가 아니면, liked 빼고 보내준다
    // 로그인 상태이면, liked 추가해서 보내준다
    try {
        const { bookId } = req.params;

        let userId = null;
        if (req.decodedJwt) {
            userId = req.decodedJwt.userId;
        }
        const bookDetail = await bookService.bookDetailData(bookId, userId);

        return res.status(StatusCodes.OK).json(bookDetail);
    } catch (err) {
        next(err);
    }
};

module.exports = { getAllBooks, getBookDetail };
