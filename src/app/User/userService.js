const {logger} = require("../../../config/winston");
const {pool} = require("../../../config/database");
const secret_config = require("../../../config/secret");

// user 뿐만 아니라 다른 도메인의 Provider와 Dao도 아래처럼 require하여 사용할 수 있습니다.
const userProvider = require("./userProvider");
const userDao = require("./userDao");

const baseResponse = require("../../../config/baseResponseStatus");
const {response} = require("../../../config/response");
const {errResponse} = require("../../../config/response");

const jwt = require("jsonwebtoken");
const crypto = require("crypto");

// Service: Create, Update, Delete 비즈니스 로직 처리

//1. 유저 생성
//6주차 실습영상 32분즘 부분 설명 보기.
exports.createUser = async function (userName, userPassword, userPhone, userEmail, userAddress) {
    try {
        // 이메일 중복 확인 _ 논리적 validation
        // UserProvider에서 해당 이메일과 같은 User 목록을 받아서 emailRows에 저장한 후, 배열의 길이를 검사한다.
        // -> 길이가 0 이상이면 이미 해당 이메일을 갖고 있는 User가 조회된다는 의미
        const userEmailRows = await userProvider.emailCheck(userEmail);
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
        const insertUserInfoParams = [userName, hashedPassword, userPhone, userEmail, userAddress];

        const connection = await pool.getConnection(async (conn) => conn);

        const userIdResult = await userDao.insertUserInfo(connection, insertUserInfoParams);
        console.log(`추가된 회원 : ${userIdResult[0].insertId}`)
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


// TODO: After 로그인 인증 방법 (JWT)
exports.postSignIn = async function (userEmail, userPassword) {
    //try {
        // 이메일 여부 확인
        const emailRows = await userProvider.emailCheck(userEmail);

        if (emailRows.length < 1) return errResponse(baseResponse.SIGNIN_EMAIL_WRONG);

        const selectEmail = emailRows[0].userEmail;

        // 비밀번호 확인 (입력한 비밀번호를 암호화한 것과 DB에 저장된 비밀번호가 일치하는 지 확인함)
        const hashedPassword = await crypto
            .createHash("sha512")
            .update(userPassword)
            .digest("hex");

        const selectUserPasswordParams = [selectEmail, hashedPassword];
        const passwordRows = await userProvider.passwordCheck(selectUserPasswordParams);


    // if (Array.isArray(passwordRows[0]) &&  passwordRows[0].length === 0) {
    //
    // }
    //     if (passwordRows[0].password !== hashedPassword) {
    //         return errResponse(baseResponse.SIGNIN_PASSWORD_WRONG);
    //     }

    if (passwordRows.length < 1) {
        return errResponse(baseResponse.SIGNIN_PASSWORD_WRONG);
    }

        // 계정 상태 확인
        const userInfoRows = await userProvider.accountCheck(userEmail);

        if (userInfoRows[0].status === "INACTIVE") {
            return errResponse(baseResponse.SIGNIN_INACTIVE_ACCOUNT);
        } else if (userInfoRows[0].status === "DELETED") {
            return errResponse(baseResponse.SIGNIN_WITHDRAWAL_ACCOUNT);
        }

        console.log(userInfoRows[0].userIndex) // DB의 userId

        //토큰 생성 Service
        let token = await jwt.sign( //jwt.sign이라는 건 jsonwebtoken이라는 외부라이브러리를 사용하여 구성함.
            {
                userIndex: userInfoRows[0].userIndex,
                //userEmail: userInfoRows[0].email
            }, // 토큰의 내용(payload)
            secret_config.jwtsecret, // 비밀키
            {
                //추가적으로 옵션 부여
                expiresIn: "365d", //이 jwt 토큰은 365일동안 유효하다.
                // 개발단계에서는 보통 1년으로 둠. 왜냐하면 10분으로 두면 클라이언트 개발자가 개발 단계에서 API를 엮을 때 계속 다시 받고 저장해줘야해서 고생.
                subject: "User",
            } // 유효 기간 365일
        );
        //생성한 값을 토큰에 넣어주고, 그 토큰을 바탕으로 response로 해당 유저의 아이디 값과 토큰 값을 클라이언트에게 보내준다
        //보내줘야 클라이언트가 해당 앱의 local storage에 유저 아이디의 토큰 값을 저장해둘 수 있어.
        return response(baseResponse.SUCCESS, {'userIndex': userInfoRows[0].userIndex, 'jwt': token});

    // } catch (err) {
    //    logger.error(`App - postSignIn Service error\n: ${err.message} \n${JSON.stringify(err)}`);
    //    return errResponse(baseResponse.DB_ERROR);
    // }
};

exports.editUser = async function (userIndex, userName) {
    try {
        console.log(userIndex)
        const connection = await pool.getConnection(async (conn) => conn);
        const editUserResult = await userDao.updateUser(connection, userIndex, userName)
        connection.release();

        return response(baseResponse.SUCCESS);

    } catch (err) {
        logger.error(`App - editUser Service error\n: ${err.message}`);
        return errResponse(baseResponse.DB_ERROR);
    }
};
