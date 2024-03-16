const findBooks = async (connection, categoryId, news, limit, offset) => {
    let sql = `SELECT 
                    SQL_CALC_FOUND_ROWS 
                    *,
                    (
                        SELECT COUNT(*) 
                        FROM likes 
                        WHERE books.id = book_id
                    ) AS likes
               FROM books`;
    let values = [];

    if (categoryId && news) {
        sql +=
            ' WHERE category_id = ? AND published_date BETWEEN DATE_SUB(NOW(), INTERVAL 1 MONTH) AND NOW()';
        values.push(categoryId);
    } else if (categoryId) {
        sql += ' WHERE category_id = ?';
        values.push(categoryId);
    } else if (news) {
        sql +=
            ' WHERE published_date BETWEEN DATE_SUB(NOW(), INTERVAL 1 MONTH) AND NOW()';
    }

    sql += ' LIMIT ? OFFSET ?';
    values.push(+limit, offset);

    const [allBooksData] = await connection.query(sql, values);
    return allBooksData;
};

const totalCountData = async (connection, categoryId, news) => {
    let sql = `SELECT found_rows() AS totalCount`;
    let values = [];

    const [totalCountData] = await connection.query(sql, values);
    console.log('totalCountData', totalCountData);
    return totalCountData;
};
const findBook = async (connection, bookId, userId) => {
    let likedColumn =
        userId !== null
            ? `,EXISTS (SELECT * FROM likes WHERE user_id=? AND book_id=?) AS liked`
            : ``;
    let sql = `SELECT
                    books.*,
                    category.category_name,
                    (SELECT COUNT(*) FROM likes WHERE books.id = book_id) AS likes
                    ${likedColumn}
               FROM
                    books
               LEFT JOIN
                    category ON books.category_id = category.id
               WHERE
                    books.id = ?;`;
    let values = userId !== null ? [userId, bookId, bookId] : [bookId];
    const [bookDetailData] = await connection.query(sql, values);

    return bookDetailData[0];
};

module.exports = { findBooks, totalCountData, findBook };
