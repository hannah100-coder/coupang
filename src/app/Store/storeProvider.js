const { pool } = require("../../../config/database");
const { logger } = require("../../../config/winston");

const storeDao = require("./storeDao");

// Provider: Read 비즈니스 로직 처리

exports.retrieveStoreList = async function (storeName) {
    
    //categoryIndex 인자로 받는 경우와 받지 않는 경우를 구분하여 하나의 함수에서 두 가지 기능을 처리함

    if (!storeName) {
        // connection 은 db와의 연결을 도와줌
        const connection = await pool.getConnection(async (conn) => conn);
        // Dao 쿼리문의 결과를 호출
        const storeListResult = await storeDao.selectStore(connection);
        // connection 해제
        connection.release();

        return storeListResult;

    } else {
        const connection = await pool.getConnection(async (conn) => conn);
        const storeListResult = await storeDao.selectStoreName(connection, storeName);
        connection.release();

        return storeListResult;
    }
};


exports.retrieveStore = async function (storeIndex) {
    const connection = await pool.getConnection(async (conn) => conn);
    const storeResult = await storeDao.selectStoreIndex(connection, storeIndex);

    connection.release();

    return storeResult[0]; // 한 가게의 정보만을 불러오므로 배열 타입을 리턴하는 게 아닌 0번 인덱스를 파싱해서 오브젝트 타입 리턴
};

//storeIndex로 가게 조회
exports.retrieveStoreIndex = async function (storeIndex) {
    const connection = await pool.getConnection(async (conn) => conn);
    const storeResult = await storeDao.selectStoreIndex(connection, storeIndex);

    connection.release();

    return storeResult[0]; // 한 가게의 정보만을 불러오므로 배열 타입을 리턴하는 게 아닌 0번 인덱스를 파싱해서 오브젝트 타입 리턴
};


//categoryName 으로 가게 조회
exports.retrieveStoreListByCategoryName = async function (categoryName) {

    //categoryName 인자로 받는 경우와 받지 않는 경우를 구분하여 하나의 함수에서 두 가지 기능을 처리함

    if (!categoryName) {

        // connection 은 db와의 연결을 도와줌
        const connection = await pool.getConnection(async (conn) => conn);
        // Dao 쿼리문의 결과를 호출
        const storeListResult = await storeDao.selectStore(connection);
        // connection 해제
        connection.release();

        return storeListResult;


    } else {

        const connection = await pool.getConnection(async (conn) => conn);
        const storeListResultByCategoryName = await storeDao.selectStoreCategoryName(connection, categoryName);
        connection.release();

        return storeListResultByCategoryName;
    }
};