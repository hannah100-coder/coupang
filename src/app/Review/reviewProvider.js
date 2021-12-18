const { pool } = require("../../../config/database");
const { logger } = require("../../../config/winston");

const reviewDao = require("./reviewDao");


//21. storeIndex로 리뷰 조회하기
exports.retrieveReviewByStoreIndex = async function (storeIndex){

    const connection = await pool.getConnection(async (conn) => conn);
    const reviewResult = await reviewDao.selectReviewByStoreIndex(connection, storeIndex);
    connection.release();

    return reviewResult;
};

//22. userIndex로 리뷰 조회하기
exports.retrieveReviewByUserIndex = async function (userIndex){

    const connection = await pool.getConnection(async (conn) => conn);
    const reviewResult = await reviewDao.selectReviewByUserIndex(connection, userIndex);
    connection.release();

    return reviewResult;
};




