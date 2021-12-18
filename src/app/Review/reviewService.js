const {logger} = require("../../../config/winston");
const {pool} = require("../../../config/database");
const secret_config = require("../../../config/secret");

const reviewProvider = require("./reviewProvider");
const reviewDao = require("./reviewDao");

const baseResponse = require("../../../config/baseResponseStatus");
const {response} = require("../../../config/response");
const {errResponse} = require("../../../config/response");

//23. 리뷰 생성
exports.postReview = async function(storeIndex, userIndex, menuIndex, starGrade, reviewWrite){
    try{
        const insertReviewParams = [storeIndex, userIndex, menuIndex, starGrade, reviewWrite];

        const connection = await pool.getConnection(async (conn) => conn);

        const reviewResult = await reviewDao.insertReview(connection, insertReviewParams);
        console.log(`추가된 리뷰 : ${reviewResult[0].insertId}`)
        connection.release();
        return response(baseResponse.SUCCESS);

    } catch (err) {
        //예상치 못한 오류가 나더라도, 외부로 노출하지 않고 로그 메세지만 출력할 수 있도록 처리해준다.
        //개발 단계에서 try-catch문 많이 사용하면 어디서 어떤 에러가 난지 모르므로
        //작성만 해두고 주석처리해놓고 개발한뒤, 마지막에 주석 해체 해주는 것을 추천.
        logger.error(`App - createUser Service error\n: ${err.message}`);
        return errResponse(baseResponse.DB_ERROR);
    }

};

