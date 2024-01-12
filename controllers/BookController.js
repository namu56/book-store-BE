const conn = require('../mariadb'); // db 모듈
const { StatusCodes } = require('http-status-codes');
const { handleQueryError } = require('../utils/ErrorHandler');

// (카테고리 별, 신간 여부) 전체 도서 목록 조회
const getAllBooks = (req, res) => {
    let { categoryId, news, limit, currentPage } = req.query;

    let offset = limit * (currentPage - 1);

    let sql = `SELECT *, 
                    (SELECT count(*) FROM likes WHERE books.id = book_id)AS likes 
               FROM books`;
    let values = [];

    if (categoryId && news) {
        sql += ' WHERE category_id = ? AND published_date BETWEEN DATE_SUB(NOW(), INTERVAL 1 MONTH) AND NOW()';
        values.push(categoryId);
    } else if (categoryId) {
        sql += ' WHERE category_id = ?';
        values.push(categoryId);
    } else if (news) {
        sql += ' WHERE published_date BETWEEN DATE_SUB(NOW(), INTERVAL 1 MONTH) AND NOW()';
    }

    sql += ' LIMIT ? OFFSET ?';
    values.push(parseInt(limit), offset);

    conn.query(sql, values, (err, results) => {
        if (err) return handleQueryError(err, res);

        if (results.length > 0) {
            return res.status(StatusCodes.OK).json(results);
        } else {
            return res.status(StatusCodes.NOT_FOUND).end();
        }
    });
};

const getBookDetail = (req, res) => {
    let { userId } = req.body;
    let { bookId } = req.params;

    let sql = `SELECT *,
                    (SELECT count(*) FROM likes WHERE books.id = book_id )AS likes,
                    EXISTS (SELECT * FROM likes WHERE user_id=? AND book_id=?) AS liked
               FROM books
               LEFT JOIN category ON books.category_id = category.category_id
               WHERE books.id=?;`;
    let values = [userId, bookId, bookId];
    conn.query(sql, values, (err, results) => {
        if (err) return handleQueryError(err, res);

        if (results[0]) {
            return res.status(StatusCodes.OK).json(results[0]);
        } else {
            return res.status(StatusCodes.NOT_FOUND).end();
        }
    });
};

module.exports = { getAllBooks, getBookDetail };
