const jwtMiddleware = require("../../../config/jwtMiddleware");
const reviewProvider = require("../../app/Review/reviewProvider");
const reviewService = require("../../app/Review/reviewService");
const baseResponse = require("../../../config/baseResponseStatus");
const {response, errResponse} = require("../../../config/response");

const regexEmail = require("regex-email");


/**
 * API No. 21
 * API Name : storeIndex로 리뷰 조회 API
 * [GET] /app/review/bystoreIndex/{storeIndex}
 */
exports.getReviewByStoreIndex = async function (req,res) {

    /**
     * Path Variable: storeIndex
     */

    const storeIndex = req.params.storeIndex;
    // errResponse 전달
    if (!storeIndex) return res.send(errResponse(baseResponse.STORE_STOREINDEX_EMPTY));

    const reviewByStoreIndex = await reviewProvider.retrieveReviewByStoreIndex(storeIndex);

    if(!reviewByStoreIndex)
        return res.send(errResponse(baseResponse.STORE_STOREINDEX_NOT_EXIST));

    return res.send(response(baseResponse.SUCCESS, reviewByStoreIndex));

};


/**
 * API No. 21
 * API Name : storeIndex로 리뷰 조회 API
 * [GET] /app/review/bystoreIndex/{storeIndex}
 */

exports.getReviewByUserIndex = async function (req,res) {

    /**
     * Path Variable: userIndex
     */

    const userIndex = req.params.userIndex;
    // errResponse 전달
    if (!userIndex) return res.send(errResponse(baseResponse.USER_USERID_EMPTY));

    const reviewByUserIndex = await reviewProvider.retrieveReviewByUserIndex(userIndex);

    if(!reviewByUserIndex)
        return res.send(errResponse(baseResponse.USER_USERID_NOT_EXIST));

    return res.send(response(baseResponse.SUCCESS, reviewByUserIndex));

};


/**
 * API No. 23
 * API Name : 리뷰 생성 API
 * [POST] /app/reviews
 */

exports.postReview = async function (req, res) {
    /**
     * Body: userIndex, storeIndex, menuIndex, starGrade, reviewWrite
     */

    const {storeIndex, userIndex, menuIndex, starGrade, reviewWrite} = req.body;

    const postReviewResponse = await reviewService.postReview(
        storeIndex, userIndex, menuIndex, starGrade, reviewWrite
    );

    // signUpResponse 값을 json으로 전달
    return res.send(postReviewResponse);
};