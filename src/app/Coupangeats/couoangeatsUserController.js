const jwtMiddleware = require("../../../config/jwtMiddleware");
const coupangeatsUserProvider = require("../../app/User/coupangeatsUserProvider");
const coupangeatsUserService = require("../../app/User/coupangeatsUserService");
const baseResponse = require("../../../config/baseResponseStatus");
const {response, errResponse} = require("../../../config/response");

const regexEmail = require("regex-email");


/**
 * API No. 1
 * API Name : 유저 생성 (회원가입) API
 * [POST] /app/users/signup
 */
exports.postUsers = async function (req, res) {

    /**
     * Body: userEmail, userPassword, userName, userPhone
     */
    const {userEmail, userPassword, userName, userPhone} = req.body; //body의 값을 꺼내서 사용함

    //형식적 validation _ userEmail
    // 빈 값 체크
    if (!userEmail)
        return res.send(response(baseResponse.SIGNUP_EMAIL_EMPTY));

    // 길이 체크
    if (userEmail.length > 30)
        return res.send(response(baseResponse.SIGNUP_EMAIL_LENGTH));

    // 형식 체크 (by 정규표현식)
    if (!regexEmail.test(userEmail))
        return res.send(response(baseResponse.SIGNUP_EMAIL_ERROR_TYPE));

    //형식적 validation _ userName
    // 빈 값 체크
    if (!userName)
        return res.send(response(baseResponse.SIGNUP_USERNAME_EMPTY));

    // 길이 체크
    if (userEmail.length > 20)
        return res.send(response(baseResponse.SIGNUP_USERNAME_LENGTH));

    //형식적 validation _ userPassword
    // 빈 값 체크
    if (!userPassword)
        return res.send(response(baseResponse.SIGNUP_PASSWORD_EMPTY));

    // 길이 체크
    if (userPassword.length < 6 || userPassword.length>20)
        return res.send(response(baseResponse.SIGNUP_PASSWORD_LENGTH));

    //형식적 validation _ userPhone
    // 빈 값 체크
    if (!userPhone)
        return res.send(response(baseResponse.SIGNUP_PHONE_EMPTY));

    // 길이 체크
    if (userPhone.length > 12)
        return res.send(response(baseResponse.SIGNUP_PHONE_LENGTH));

    // 형식 체크 (by 정규표현식)
    //if (!regexPhone.test(userPhone))
    // if (regexPhone.test(userPhone))
    //     return res.send(response(baseResponse.SIGNUP_PHONE_ERROR_TYPE));

    // createUser 함수 실행을 통한 결과 값을 signUpResponse에 저장
    const signUpResponse = await userService.createUser(
        userName, userPassword, userPhone, userEmail, userAddress
    );

    // signUpResponse 값을 json으로 전달
    return res.send(signUpResponse);
};

/**
 * API No. 8
 * API Name : 회원 주소 입력
 * [POST] /app/users/postAddress
 */
exports.postUserAddress = async function (req, res) {

    /*
    Body: userIndex, userAddress
     */

    const {userIndex, userAddress} = req.body;

    const addUserAddress = await coupangeatsUserService.addUserAddress(userIndex, userAddress);
    return res.send(addUserAddress);
};

