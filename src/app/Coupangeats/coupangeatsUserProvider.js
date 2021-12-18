const { pool } = require("../../../config/database");
const { logger } = require("../../../config/winston");

const coupangeatsUserDao = require("./coupangeatsUserDao");


exports.emailCheck = async function (userEmail) {
    const connection = await pool.getConnection(async (conn) => conn);
    const emailCheckResult = await coupangeatsUserDao.selectUserEmail(connection, userEmail);

    connection.release();

    return emailCheckResult;
};

exports.passwordCheck = async function (selectUserPasswordParams) {
    const connection = await pool.getConnection(async (conn) => conn);
    // 쿼리문에 여러개의 인자를 전달할 때 selectUserPasswordParams와 같이 사용합니다.
    const passwordCheckResult = await coupangeatsUserDao.selectUserPassword(
        connection,
        selectUserPasswordParams
    );
    connection.release();
    return passwordCheckResult[0];
  };

  exports.accountCheck = async function (userEmail) {
    const connection = await pool.getConnection(async (conn) => conn);
    const userAccountResult = await coupangeatsUserDao.selectUserAccount(connection, userEmail);
    connection.release();
  
    return userAccountResult;
  };