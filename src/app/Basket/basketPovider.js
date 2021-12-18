const { pool } = require("../../../config/database");
const { logger } = require("../../../config/winston");

const basketDao = require("./basketDao");


//31. userIndex로 장바구니 조회
exports.retrieveBasektByUserIndex = async function (userIndex) {

    const connection = await pool.getConnection(async (conn) => conn);
    const basketResult = await basketDao.selectBasketByUserIndex(connection, userIndex);

    connection.release();

    return basketResult;
};