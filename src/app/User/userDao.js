
// 새롭게 추가한 함수를 아래 부분에서 export 해줘야 외부의 Provider, Service 등에서 사용가능합니다.

// 모든 유저 조회
async function selectUser(connection) {
  const selectUserListQuery = `
                SELECT userIndex, userName, userLevel
                FROM User;
                `;
  const [userRows] = await connection.query(selectUserListQuery);
  return userRows;
}

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

// 유저등급으로 회원 조회
async function selectUserLevel(connection, userLevel) {
  const selectUserLevelQuery = `
                SELECT userIndex, userName, userLevel
                FROM User 
                WHERE userLevel = ?;
                `;
  const [userLevelRows] = await connection.query(selectUserLevelQuery, userLevel);
  return userLevelRows;
}

// userIndex 회원 조회
async function selectUserIndex(connection, userIndex) {
  const selectUserIndexQuery = `
                 SELECT userIndex, userName, userLevel, userAddress
                 FROM User 
                 WHERE userIndex = ?;
                 `;
  const [userRow] = await connection.query(selectUserIndexQuery, userIndex);
  return userRow;
}

// 유저 생성
async function insertUserInfo(connection, insertUserInfoParams) {
  const insertUserInfoQuery = `
        INSERT INTO User(userName, userPassword, userPhone, userEmail, userAddress)
        VALUES (?, ?, ?, ?, ?);
    `;
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
        WHERE userEmail = ?;
        `;
  const selectUserAccountRow = await connection.query(
      selectUserAccountQuery,
      userEmail
  );
  return selectUserAccountRow[0];
}

//유저 정보 업데이트
async function updateUser(connection, userIndex, userName) {
  const updateUserQuery = `
  UPDATE User
  SET userName = ?
  WHERE userIndex = ?;
  `;
  const updateUserRow = await connection.query(updateUserQuery, [userName, userIndex]);
  return updateUserRow[0];
}


module.exports = {
  selectUser,
  selectUserEmail,
  selectUserLevel,
  selectUserIndex,
  insertUserInfo,
  selectUserPassword,
  selectUserAccount,
  updateUser
};
