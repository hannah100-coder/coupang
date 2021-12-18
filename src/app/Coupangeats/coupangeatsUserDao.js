// 이메일로 회원 조회
async function selectUserEmail(connection, userEmail) {
    const selectUserEmailQuery = `
                SELECT userIndex, userName, userEmail
                FROM User 
                WHERE userEmail = ?; 
                `;
    const [userEmailRows] = await connection.query(selectUserEmailQuery, userEmail);
    return userEmailRows;
}

// 유저 생성
async function insertUserInfo(connection, insertUserInfoParams) {
    const insertUserInfoQuery = `
        INSERT INTO User(userName, userPassword, userPhone, userEmail)
        VALUES (?, ?, ?, ?);
    `;
    const insertUserInfoRow = await connection.query(
        insertUserInfoQuery,
        insertUserInfoParams
    );

    return insertUserInfoRow;
}



module.exports = {
    selectUserEmail,
    insertUserInfo
};