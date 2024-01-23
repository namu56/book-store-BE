const addCartItem = async (connection, userId, bookId, quantity) => {
    const sql = 'INSERT INTO cartItems (user_id, book_id, quantity) VALUES (?, ?, ?)';
    const values = [userId, bookId, quantity];

    const [result] = await connection.query(sql, values);
    console.log(result);
    return result;
};

const removeCartItem = async (connection, cartItemId) => {
    const sql = 'DELETE FROM cartItems WHERE id = ?;';

    const [result] = await connection.query(sql, cartItemId);
    console.log(result);
    return result;
};

const findCart = async (connection, userId, selected) => {
    let sql = `SELECT cartItems.id, book_id, title, summary, quantity, price
               FROM cartItems
               LEFT JOIN books ON cartItems.book_id = books.id
               WHERE user_id = ?`;
    let values = [userId];

    // 선택된 장바구니 아이템 목록 조회
    if (selected) {
        sql += ' AND cartItems.id IN (?)';
        values.push(selected);
    }

    const [selectedCartItem] = await connection.query(sql, values);
    return selectedCartItem;
};

module.exports = { addCartItem, removeCartItem, findCart };
