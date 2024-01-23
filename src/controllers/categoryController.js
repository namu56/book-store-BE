const conn = require('../../mariadb'); // db 모듈
const { StatusCodes } = require('http-status-codes');
const { QueryErrorHandler } = require('../middlewares/errorHandler');

const getAllCategory = (req, res) => {
    // 카테고리 전체 목록 리스트
    let sql = 'SELECT * FROM category';
    conn.query(sql, (err, results) => {
        if (err) throw new QueryErrorHandler('쿼리 에러 발생');

        return res.status(StatusCodes.OK).json(results);
    });
};

module.exports = getAllCategory;
