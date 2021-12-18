const jwtMiddleware = require("../../../config/jwtMiddleware");
const userProvider = require("../../app/User/userProvider");
const userService = require("../../app/User/userService");
const baseResponse = require("../../../config/baseResponseStatus");
const {response, errResponse} = require("../../../config/response");

const regexEmail = require("regex-email");

/**
 * API No. 0
 * API Name : 테스트 API
 * [GET] /app/test
 */
 exports.getTest = async function (req, res) {
     return res.send(response(baseResponse.SUCCESS))
 }

/**
 * API No. 1
 * API Name : 유저 생성 (회원가입) API
 * [POST] /app/users
 */
exports.postUsers = async function (req, res) {

    /**
     * Body: email, password, nickname
     */
    const {userName, userPassword, userPhone, userEmail, userAddress} = req.body; //body의 값을 꺼내서 사용함

    //형식적 validation
    // 빈 값 체크
    if (!userEmail)
        return res.send(response(baseResponse.SIGNUP_EMAIL_EMPTY));

    // 길이 체크
    if (userEmail.length > 30)
        return res.send(response(baseResponse.SIGNUP_EMAIL_LENGTH));

    // 형식 체크 (by 정규표현식)
    if (!regexEmail.test(userEmail))
        return res.send(response(baseResponse.SIGNUP_EMAIL_ERROR_TYPE));

    //password와 nickname 에 대해서도 형식적 validation 해주기

    // createUser 함수 실행을 통한 결과 값을 signUpResponse에 저장
    const signUpResponse = await userService.createUser(
        userName, userPassword, userPhone, userEmail, userAddress
    );

    // signUpResponse 값을 json으로 전달
    return res.send(signUpResponse);
};

/**
 * API No. 2
 * API Name : 유저 조회 API (+ 이메일로 검색 조회)
 * [GET] /app/users
 */
exports.getUsers = async function (req, res) {

    /**
     * Query String: email
     */
    const email = req.query.email;

    if (!email) {
        // 유저 전체 조회
        const userListResult = await userProvider.retrieveUserList();
        // SUCCESS : { "isSuccess": true, "code": 1000, "message":"성공" }, 메세지와 함께 userListResult 호출
        return res.send(response(baseResponse.SUCCESS, userListResult));
    } else {
        // 아메일을 통한 유저 검색 조회
        const userListByEmail = await userProvider.retrieveUserList(email);
        return res.send(response(baseResponse.SUCCESS, userListByEmail));
    }
};

/**
 * API No. 3
 * API Name : 특정 유저 조회 API
 * [GET] /app/users/{userIndex}
 */
exports.getUserByIndex = async function (req, res) {

    /**
     * Path Variable: userIndex
     */
    const userIndex = req.params.userIndex;
    // errResponse 전달
    if (!userIndex) return res.send(errResponse(baseResponse.USER_USERID_EMPTY));

    // userId를 통한 유저 검색 함수 호출 및 결과 저장
    const userByUserIndex = await userProvider.retrieveUser(userIndex);

    if(!userByUserIndex)
        return res.send(errResponse(baseResponse.USER_USERID_NOT_EXIST));

    return res.send(response(baseResponse.SUCCESS, userByUserIndex));
};


// TODO: After 로그인 인증 방법 (JWT)
/**
 * API No. 4
 * API Name : 로그인 API
 * [POST] /app/login
 * body : email, passsword
 */
exports.login = async function (req, res) {

    const {userEmail, userPassword} = req.body;

    //validation 처리 필요 (email과 password가 우리 서비스 유저의 것인지 확인하는)

   const signInResponse = await userService.postSignIn(userEmail, userPassword);

    return res.send(signInResponse);
};


/**
 * API No. 5
 * API Name : 회원 정보 수정 API + JWT + Validation
 * [PATCH] /app/users/:userIndex
 * path variable : userIndex
 * body : userName
 */
exports.patchUsers = async function (req, res) {

    // jwt - userIndex, path variable :userIndex

    const userIndexFromJWT = req.verifiedToken.userIndex

    const userIndex = req.params.userIndex;
    const userName = req.body.userName;

    // JWT는 이 후 주차에 다룰 내용
    if (userIndexFromJWT != userIndex) {
        res.send(errResponse(baseResponse.USER_ID_NOT_MATCH));
    } else {
        if (!userName) return res.send(errResponse(baseResponse.USER_NICKNAME_EMPTY));

        const editUser = await userService.editUser(userIndex, userName)
        return res.send(editUser);
    }
};






// JWT 이 후 주차에 다룰 내용
/** JWT 토큰 검증 API
 * [GET] /app/auto-login
 */
exports.check = async function (req, res) {
    const userIdResult = req.verifiedToken.userId;
    console.log(userIdResult);
    return res.send(response(baseResponse.TOKEN_VERIFICATION_SUCCESS));
};


/**
 * API No. 6
 * API Name : 유저등급으로 검색 조회
 * [GET] /app/users?userLevel=" "
 */
exports.getUserByLevel = async function (req, res) {

    /**
     * Query String: userLevel
     */
    const userLevel = req.query.userLevel;

    if (!userLevel) {
        // "해당 등급이 존재하지 않습니다."  메세지 출력
        return res.send(response(baseResponse.USER_USERLEVEL_NOT_EXIST));
    } else {
        // 유저 레벨로 유저 검색 조회
        const userListByLevel = await userProvider.retrieveUserListByUserLevel(userLevel);
        return res.send(response(baseResponse.SUCCESS, userListByLevel));
    }
};
