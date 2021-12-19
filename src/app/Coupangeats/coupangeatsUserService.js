const {logger} = require("../../../config/winston");
const {pool} = require("../../../config/database");
const secret_config = require("../../../config/secret");

// user 뿐만 아니라 다른 도메인의 Provider와 Dao도 아래처럼 require하여 사용할 수 있습니다.
const coupangeatsUserProvider = require("./coupangeatsUserProvider");
const coupangeatsUserDao = require("./coupangeatsUserDao");

const baseResponse = require("../../../config/baseResponseStatus");
const {response} = require("../../../config/response");
const {errResponse} = require("../../../config/response");

const jwt = require("jsonwebtoken");
const crypto = require("crypto");

// Service: Create, Update, Delete 비즈니스 로직 처리

//1. 유저 생성
//6주차 실습영상 32분즘 부분 설명 보기.
exports.createUser = async function (userEmail, userPassword, userName, userPhone) {
    //try {
        // 이메일 중복 확인  논리적 validation
        // UserProvider에서 해당 이메일과 같은 User 목록을 받아서 emailRows에 저장한 후, 배열의 길이를 검사한다.
        // -> 길이가 0 이상이면 이미 해당 이메일을 갖고 있는 User가 조회된다는 의미
        const userEmailRows = await coupangeatsUserProvider.emailCheck(userEmail);
        if (userEmailRows.length > 0) //해당하는 유저들이 이미 존재한다는 뜻
            return errResponse(baseResponse.SIGNUP_REDUNDANT_EMAIL);
        //'중복된 이메일입니다' 에러 메세지 출력
// 비밀번호 암호화
        //crypto 라는 모듈 사용
        const hashedPassword = await crypto
            .createHash("sha512")
            .update(userPassword)
            .digest("hex");

        // 쿼리문에 사용할 변수 값을 배열 형태로 전달
        const insertUserInfoParams = [userName, hashedPassword, userPhone, userEmail];

        const connection = await pool.getConnection(async (conn) => conn);

        const userIdResult = await coupangeatsUserDao.insertUserInfo(connection, insertUserInfoParams);
        console.log(`추가된 회원 : ${userIdResult[0].insertId}`)
        connection.release();
        return response(baseResponse.SUCCESS);
};

//2. After 로그인 인증 방법 (JWT)
exports.postSignIn = async function (userEmail, userPassword) {
    try {
        // 이메일 여부 확인
        const emailRows = await coupangeatsUserProvider.emailCheck(userEmail);
        if (emailRows.length < 1) return errResponse(baseResponse.SIGNIN_EMAIL_WRONG);

        const selectEmail = emailRows[0].userEmail

        // 비밀번호 확인 (입력한 비밀번호를 암호화한 것과 DB에 저장된 비밀번호가 일치하는 지 확인함)
        const hashedPassword = await crypto
            .createHash("sha512")
            .update(userPassword)
            .digest("hex");

        const selectUserPasswordParams = [selectEmail, hashedPassword];
        const passwordRows = await coupangeatsUserProvider.passwordCheck(selectUserPasswordParams);

        if (passwordRows.length < 1) {
            return errResponse(baseResponse.SIGNIN_PASSWORD_WRONG);
        }

        // 계정 상태 확인
        const userInfoRows = await coupangeatsUserProvider.accountCheck(userEmail);

        if (userInfoRows[0].status === "INACTIVE") {
            return errResponse(baseResponse.SIGNIN_INACTIVE_ACCOUNT);
        } else if (userInfoRows[0].status === "DELETED") {
            return errResponse(baseResponse.SIGNIN_WITHDRAWAL_ACCOUNT);
        }

        console.log(userInfoRows[0].userIndex) // DB의 userIndex

        //토큰 생성 Service
        let token = await jwt.sign(
            {
                userIndex: userInfoRows[0].userIndex,
            }, // 토큰의 내용(payload)
            secret_config.jwtsecret, // 비밀키
            {
                expiresIn: "365d",
                subject: "User",
            } // 유효 기간 365일
        );

        return response(baseResponse.SUCCESS, {'userId': userInfoRows[0].id, 'jwt': token});

    } catch (err) {
        logger.error(`App - postSignIn Service error\n: ${err.message} \n${JSON.stringify(err)}`);
        return errResponse(baseResponse.DB_ERROR);
    }
};

//주소 입력
// exports.addUserAddress = async function (userIndex, userAddress) {
//     try {

//     if(!userIndex){
//         return response(baseResponse.USER_USERID_EMPTY);
//     }else{
//         if(!userAddress)
//             return response(baseResponse.USER_ADDRESS_EMPTY);
//         const connection = await pool.getConnection(async (conn) => conn);
//         const addUserAddressResult = await coupangeatsUserDao.updateUserAddress(connection, userIndex, userAddress)
//         connection.release();

//         return response(baseResponse.SUCCESS);
//     }


//     } catch (err) {
//             logger.error(`App - editUser Service error\n: ${err.message}`);
//             return errResponse(baseResponse.DB_ERROR);
//     }
// };