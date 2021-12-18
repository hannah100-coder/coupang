const jwtMiddleware = require("../../../config/jwtMiddleware");
const coupangeatsProvider = require("../../app/Coupangeats/coupangeatsProvider");
const coupangeatsService = require("../../app/Coupangeats/coupangeatsService");
const baseResponse = require("../../../config/baseResponseStatus");
const {response, errResponse} = require("../../../config/response");

/**
 * API No.1
 * API Name : 카테고리 인덱스로 가게 검색 조회
 * [GET] /app/stores/foodCategoryIndex/:categoryIndex
 */
exports.getStoreByFoodCategoryIndex = async function (req, res) {

    /**
     * Path Variable: categoryIndex
     */
    const foodCategoryIndex = req.params.foodCategoryIndex;

    if (!foodCategoryIndex) {
        // "해당 카테고리가 존재하지 않습니다."  메세지 출력
        return res.send(response(baseResponse.STORE_CATEGORYINDEX_EMPTY));
    } else {
        // 카테고리 이름으로 가게 검색 조회
        //console.log("yes controller: ", categoryName);
        const storeListByFoodCategoryIndex = await coupangeatsProvider.retrieveStoreByFoodCategoryIndex(foodCategoryIndex);

        //틀린 값 입력했을 경우
        if(storeListByFoodCategoryIndex == 0){
            return res.send(response(baseResponse.STORE_CATEGORYINDEX_NOT_EXIST));
        }

        return res.send(response(baseResponse.SUCCESS, storeListByFoodCategoryIndex));
    }
};


/**
 * API No.2
 * API Name : 가게 전체 조회 API
 * [GET] /app/stores/all
 */
exports.getStores = async function (req, res) {

        const storeListResult = await coupangeatsProvider.retrieveStoreList();
            if(storeListResult == 0){
                return res.send(response(baseResponse.DB_ERROR));
            }
        // SUCCESS : { "isSuccess": true, "code": 1000, "message":"성공" }, 메세지와 함께 storeListResult 호출
        return res.send(response(baseResponse.SUCCESS, storeListResult));

};



/**
 * API No.3
 * API Name : 가게index로 가게 조회 API
 * [GET] /app/stores/storeIndex/:storeIndex
 */
exports.getStoreByStoreIndex = async function (req, res) {

    /**
     * Path Variable: storeIndex
     */
    const storeIndex = req.params.storeIndex;
    // errResponse 전달
    if (!storeIndex) return res.send(errResponse(baseResponse.STORE_STOREINDEX_EMPTY));

    // storeIndex를 통한 가게 검색 함수 호출 및 결과 저장
    const storeByStoreIndex = await coupangeatsProvider.retrieveStoreByStoreIndex(storeIndex);

    if(!storeByStoreIndex)
        return res.send(errResponse(baseResponse.STORE_STOREINDEX_NOT_EXIST));

    return res.send(response(baseResponse.SUCCESS, storeByStoreIndex));
};



/**
 * API No.4
 * API Name : 특정 가게(storeIndex)의 모든 메뉴 조회 API
 * [GET] /app/stores/menuAll/:storeIndex
 */
exports.getAllMenuByStoreIndex = async function (req, res) {

    /**
     * Path Variable: storeIndex
     */
    const storeIndex = req.params.storeIndex;

    if (!storeIndex) {
        // "해당 가게가 존재하지 않습니다."  메세지 출력
        return res.send(response(baseResponse.STORE_STOREINDEX_EMPTY));
    } else {
        // 카테고리 이름으로 가게 검색 조회
        const menuListByStoreIndex = await coupangeatsProvider.retrieveMenuByStoreIndex(storeIndex);

        //틀린 값 입력했을 경우
        if(menuListByStoreIndex == 0){
            return res.send(response(baseResponse.STORE_STOREINDEX_NOT_EXIST));
        }

        return res.send(response(baseResponse.SUCCESS, menuListByStoreIndex));
    }
};


/**
 * API No.5
 * API Name : 카테고리 전체 조회
 * [GET] /app/stores/category/all
 */
exports.getAllCategories = async function (req, res) {

    const categoryListResult = await coupangeatsProvider.retrieveCategoryList();
    if(categoryListResult == 0){
        return res.send(response(baseResponse.DB_ERROR));
    }
    // SUCCESS : { "isSuccess": true, "code": 1000, "message":"성공" }, 메세지와 함께 storeListResult 호출
    return res.send(response(baseResponse.SUCCESS, categoryListResult));

};