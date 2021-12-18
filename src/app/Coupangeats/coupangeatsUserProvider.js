const { pool } = require("../../../config/database");
const { logger } = require("../../../config/winston");

const coupangeatsUserDao = require("./coupangeatsUserDao");


exports.emailCheck = async function (userEmail) {
    const connection = await pool.getConnection(async (conn) => conn);
    const emailCheckResult = await coupangeatsUserDao.selectUserEmail(connection, userEmail);

    connection.release();

    return emailCheckResult;
};
