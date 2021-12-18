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

//유저 주소 입력
async function updateUserAddress(connection, userIndex, userAddress) {
    const updateUserAddressQuery = `
  UPDATE User
  SET userAddress = ?
  WHERE userIndex = ?;
  `;
    const updateUserAddressRow = await connection.query(updateUserAddressQuery, [userAddress, userIndex]);
    return updateUserAddressRow[0];
}

module.exports = {
    selectUserEmail,
    insertUserInfo,
    updateUserAddress
};