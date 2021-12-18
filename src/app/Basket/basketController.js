const jwtMiddleware = require("../../../config/jwtMiddleware");
const basketProvider = require("../../app/Basket/basketProvider");
const basketService = require("../../app/Basket/basketService");
const baseResponse = require("../../../config/baseResponseStatus");
const {response, errResponse} = require("../../../config/response");

/**
 * API No. 31
 * API Name : 특정 유저의 장바구니 조회 API
 * [GET] /app/basket/userIndex/{userIndex}
 */
exports.getBasketByUserIndex = async function (req, res) {

    /**
     * Path Variable: userIndex
     */
    const userIndex = req.params.userIndex;
    // errResponse 전달
    if (!userIndex) return res.send(errResponse(baseResponse.USER_USERID_EMPTY));

    // storeIndex를 통한 가게 검색 함수 호출 및 결과 저장
    const basketByUserIndex = await basketProvider.retrieveBasektByUserIndex(userIndex);

    if(!basketByUserIndex)
        return res.send(errResponse(baseResponse.USER_USERID_NOT_EXIST));

    return res.send(response(baseResponse.SUCCESS, basketByUserIndex));
};