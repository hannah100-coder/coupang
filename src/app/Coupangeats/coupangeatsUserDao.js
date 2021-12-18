// 이메일로 회원 조회
async function selectUserEmail(connection, userEmail) {
    const selectUserEmailQuery = 
                `SELECT userIndex, userName, userEmail
                FROM User 
                WHERE userEmail = ?; `
                ;
    const [userEmailRows] = await connection.query(selectUserEmailQuery, userEmail);
    return userEmailRows;
}

// 유저 생성
async function insertUserInfo(connection, insertUserInfoParams) {
    const insertUserInfoQuery = 
        `INSERT INTO User(userName, userPassword, userPhone, userEmail)
        VALUES (?, ?, ?, ?);`
    ;
    const insertUserInfoRow = await connection.query(
        insertUserInfoQuery,
        insertUserInfoParams
    );

    return insertUserInfoRow;
}

// 패스워드 체크
async function selectUserPassword(connection, selectUserPasswordParams) {
    const selectUserPasswordQuery = `
          SELECT userEmail, userName, userPassword
          FROM User
          WHERE userEmail = ? AND userPassword = ?;
          `;
    const selectUserPasswordRow = await connection.query(
        selectUserPasswordQuery,
        selectUserPasswordParams
    );
  
    return selectUserPasswordRow;
  }

// 유저 계정 상태 체크 (jwt 생성 위해 id 값도 가져온다.)
async function selectUserAccount(connection, userEmail) {
    const selectUserAccountQuery = `
          SELECT status, userIndex
          FROM User
          WHERE userEmail = ?;`;
    const selectUserAccountRow = await connection.query(
        selectUserAccountQuery,
        userEmail
    );
    return selectUserAccountRow[0];
  }



module.exports = {
    selectUserEmail,
    insertUserInfo,
    selectUserPassword,
    selectUserAccount
};