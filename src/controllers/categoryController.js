const pool = require('../../mariadb'); // db 모듈
const { StatusCodes } = require('http-status-codes');
const { QueryErrorHandler } = require('../middlewares/errorHandler');

const getAllCategory = async (req, res) => {
    const connection = await pool.getConnection();
    try {
        // 카테고리 전체 목록 리스트
        let sql = 'SELECT * FROM category';
        const [results] = await connection.query(sql);

        return res.status(StatusCodes.OK).json(results);
    } catch (err) {
        console.log(err);
        next(err);
    } finally {
        if (connection) connection.release();
    }
};

module.exports = getAllCategory;
