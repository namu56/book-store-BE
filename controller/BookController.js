const conn = require('../mariadb'); // db 모듈
const { StatusCodes } = require('http-status-codes');

const getAllBooks = (req, res) => {
    let { category_id } = req.query;

    if (category_id) {
        // 카테고리 별 조회
        let sql = 'SELECT * FROM books WHERE category_id = ?';
        conn.query(sql, category_id, (err, results) => {
            if (err) {
                console.log(err);
                return res.status(StatusCodes.BAD_REQUEST).end();
            }

            if (results.length) {
                return res.status(StatusCodes.OK).json(results);
            } else {
                return res.status(StatusCodes.NOT_FOUND).end();
            }
        });
    } else {
        let sql = 'SELECT * FROM books';
        conn.query(sql, (err, results) => {
            if (err) {
                console.log(err);
                return res.status(StatusCodes.BAD_REQUEST).end();
            }

            return res.status(StatusCodes.OK).json(results);
        });
    }
};

const getBookDetail = (req, res) => {
    let { id } = req.params;

    let sql = 'SELECT * FROM books LEFT JOIN category ON books.category_id = category.id WHERE books.id = ?;';
    conn.query(sql, id, (err, results) => {
        if (err) {
            console.log(err);
            return res.status(StatusCodes.BAD_REQUEST).end();
        }

        if (results[0]) {
            return res.status(StatusCodes.OK).json(results[0]);
        } else {
            return res.status(StatusCodes.NOT_FOUND).end();
        }
    });
};

module.exports = { getAllBooks, getBookDetail };
