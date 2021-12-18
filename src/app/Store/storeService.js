const {logger} = require("../../../config/winston");
const {pool} = require("../../../config/database");
const secret_config = require("../../../config/secret");

// user 뿐만 아니라 다른 도메인의 Provider와 Dao도 아래처럼 require하여 사용할 수 있습니다.
const storeProvider = require("./storeProvider");
const storeDao = require("./storeDao");

const baseResponse = require("../../../config/baseResponseStatus");
const {response} = require("../../../config/response");
const {errResponse} = require("../../../config/response");

//API 15. storeIntro 수정하기 API
exports.editStoreIntro = async function (storeIndex, storeIntro) {
    try {
        console.log(storeIndex)
        const connection = await pool.getConnection(async (conn) => conn);
        const editStoreResult = await storeDao.updateStoreIntro(connection, storeIndex, storeIntro);
        connection.release();

        return response(baseResponse.SUCCESS);

    } catch (err) {
        logger.error(`App - editUser Service error\n: ${err.message}`);
        return errResponse(baseResponse.DB_ERROR);
    }
};

