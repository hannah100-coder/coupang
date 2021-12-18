const jwtMiddleware = require("../../../config/jwtMiddleware");
const coupangeatsUserProvider = require("../../app/Coupangeats/coupangeatsUserProvider");
const coupangeatsUserService = require("../../app/Coupangeats/coupangeatsUserService");
const baseResponse = require("../../../config/baseResponseStatus");
const {response, errResponse} = require("../../../config/response");

const regexEmail = require("regex-email");

// /
//  * API No. 1
//  * API Name : 유저 회원가입 API
//  * [POST] /app/users/signup
//  */
exports.postUsers = async function (req, res) {

    // /
    //  * Body: userEmail, userPassword, userName, userPhone
    //  */
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
        return res.send(response(baseResponse.SIGNUP_EMAIL_ERRORTYPE));

    //password와 nickname 에 대해서도 형식적 validation 해주기

    //형식적 validation  userName
    // 빈 값 체크
    if (!userName)
        return res.send(response(baseResponse.SIGNUP_USERNAME_EMPTY));

    // 길이 체크
    if (userEmail.length > 20)
        return res.send(response(baseResponse.SIGNUP_USERNAMELENGTH));

    //형식적 validation  userPassword
    // 빈 값 체크
    if (!userPassword)
        return res.send(response(baseResponse.SIGNUP_PASSWORD_EMPTY));

    // 길이 체크
    if (userPassword.length < 6 || userPassword.length>20)
        return res.send(response(baseResponse.SIGNUP_PASSWORD_LENGTH));


    // createUser 함수 실행을 통한 결과 값을 signUpResponse에 저장
    const signUpResponse = await coupangeatsUserService.createUser(
        userEmail, userPassword, userName, userPhone
    );

    // signUpResponse 값을 json으로 전달
    return res.send(signUpResponse);
};