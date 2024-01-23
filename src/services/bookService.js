const bookModel = require('../models/bookModel');
const pool = require('../../mariadb');
const { StatusCodes } = require('http-status-codes');

const allBooksData = async (categoryId, news, limit, currentPage) => {
    const connection = await pool.getConnection();
    try {
        let offset = limit * (currentPage - 1);
        const allBooksData = await bookModel.findBooks(connection, categoryId, news, limit, offset);
        const totalCountData = await bookModel.totalCountData(connection, categoryId, news);

        let allBooksAndPageData = {};

        if (allBooksData.length) {
            allBooksAndPageData.books = allBooksData;
        } else {
            throw new Error(StatusCodes.BAD_REQUEST);
        }

        let pagination = {
            currentPage: +currentPage,
            totalCount: totalCountData[0]['totalCount'],
        };

        allBooksAndPageData.pagination = pagination;

        return allBooksAndPageData;
    } catch (err) {
        console.log(err);
        throw err;
    } finally {
        connection.release();
    }
};

const bookDetailData = async (bookId, userId) => {
    const connection = await pool.getConnection();

    try {
        const bookDetail = await bookModel.findBook(connection, bookId, userId);

        if (bookDetail) {
            return bookDetail;
        } else {
            throw new Error(StatusCodes.NOT_FOUND);
        }
    } catch (err) {
        console.log(err);
        throw err;
    } finally {
        connection.release();
    }
};

module.exports = { allBooksData, bookDetailData };
