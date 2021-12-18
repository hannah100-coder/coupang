const { pool } = require("../../../config/database");
const { logger } = require("../../../config/winston");

const coupangeatsDao = require("./coupangeatsDao");


//foodCategoryIndex 으로 가게 조회
exports.retrieveStoreByFoodCategoryIndex = async function (foodCategoryIndex) {

        const connection = await pool.getConnection(async (conn) => conn);
        const storeResultByFoodCategoryIndex = await coupangeatsDao.selectStoreByFoodCategoryIndex(connection, foodCategoryIndex);
        connection.release();

        return storeResultByFoodCategoryIndex;

};

//전체 가게 조회
exports.retrieveStoreList = async function () {

        const connection = await pool.getConnection(async (conn) => conn);

        const storeListResult = await coupangeatsDao.selectStoreAll(connection);

        connection.release();

        return storeListResult;

};

//storeIndex로 가게 조회
exports.retrieveStoreByStoreIndex = async function (storeIndex) {
    const connection = await pool.getConnection(async (conn) => conn);
    const storeResult = await coupangeatsDao.selectStoreByStoreIndex(connection, storeIndex);

    connection.release();

    return storeResult[0]; // 한 가게의 정보만을 불러오므로 배열 타입을 리턴하는 게 아닌 0번 인덱스를 파싱해서 오브젝트 타입 리턴
};

//storeIndex로 특정 가게의 모든 메뉴 조회
exports.retrieveMenuByStoreIndex = async function (storeIndex) {

    const connection = await pool.getConnection(async (conn) => conn);
    const menuResultByStoreIndex = await coupangeatsDao.selectMenuByStoreIndex(connection, storeIndex);
    connection.release();

    return menuResultByStoreIndex;

};

//카테고리 전체 조회
exports.retrieveCategoryList = async function () {

    const connection = await pool.getConnection(async (conn) => conn);

    const categoryListResult = await coupangeatsDao.selectCategoryAll(connection);

    connection.release();

    return categoryListResult;

};