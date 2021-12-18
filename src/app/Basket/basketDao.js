// 31. userIndex 회원 조회
async function selectBasketByUserIndex(connection, userIndex) {
    const selectBasketByUserIndexQuery = `
                 SELECT s.storeName, m.menuName
                 FROM Basket b
                    JOIN Store s
                        ON b.storeIndex = s.storeIndex
                    JOIN Menu m
                        ON b.menuIndex = m.menuIndex
                 WHERE userIndex = ?;
                 `;
    const [userIndexBasketRow] = await connection.query(selectBasketByUserIndexQuery, userIndex);
    return userIndexBasketRow;
}


module.exports = {
    selectBasketByUserIndex
};