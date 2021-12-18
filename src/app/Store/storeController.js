const jwtMiddleware = require("../../../config/jwtMiddleware");
const storeProvider = require("../../app/Store/storeProvider");
const storeService = require("../../app/Store/storeService");
const baseResponse = require("../../../config/baseResponseStatus");
const {response, errResponse} = require("../../../config/response");

//const regexEmail = require("regex-email");


//API 11 은 가게 생성

/**
 * API No. 12
 * API Name : 가게 조회 API (+ 가게 이름으로 검색 조회)
 * [GET] /app/stores
 */
exports.getStores = async function (req, res) {

    /**
     * Query String: storeName
     */
    const storeName = req.query.storeName;

    if (!storeName) {
        // 가게 전체 조회
        const storeListResult = await storeProvider.retrieveStoreList();
        // SUCCESS : { "isSuccess": true, "code": 1000, "message":"성공" }, 메세지와 함께 storeListResult 호출
        return res.send(response(baseResponse.SUCCESS, storeListResult));
    } else {
        // 가게 이름을 통한 가게 검색 조회
        const storeListByStoreName = await storeProvider.retrieveStoreList(storeName);
        return res.send(response(baseResponse.SUCCESS, storeListByStoreName));
    }
};


/**
 * API No. 13
 * API Name : 특정 가게 조회 API
 * [GET] /app/stores/{storeIndex}
 */
exports.getStoreByIndex = async function (req, res) {

    /**
     * Path Variable: storeIndex
     */
    const storeIndex = req.params.storeIndex;
    // errResponse 전달
    if (!storeIndex) return res.send(errResponse(baseResponse.STORE_STOREINDEX_EMPTY));

    // storeIndex를 통한 가게 검색 함수 호출 및 결과 저장
    const storeByStoreIndex = await storeProvider.retrieveStoreIndex(storeIndex);

    if(!storeByStoreIndex)
        return res.send(errResponse(baseResponse.STORE_STOREINDEX_NOT_EXIST));

    return res.send(response(baseResponse.SUCCESS, storeByStoreIndex));
};


/**
 * API No. 14
 * API Name : 카테고리 네임으로 검색 조회
 * [GET] /app/stores/category?categoryName=" "
 */
exports.getStoreByCategoryName = async function (req, res) {

    /**
     * Query String: categoryName
     */
    const categoryName = req.query.categoryName;

    if (!categoryName) {
        // "해당 카테고리가 존재하지 않습니다."  메세지 출력
        //console.log("no controller: ", categoryName);
        return res.send(response(baseResponse.STORE_CATEGORYNAME_EMPTY));
    } else {
        // 카테고리 이름으로 가게 검색 조회
        //console.log("yes controller: ", categoryName);
        const storeListByCategoryName = await storeProvider.retrieveStoreListByCategoryName(categoryName);

        //틀린 값 입력했을 경우
        if(storeListByCategoryName == 0){
            return res.send(response(baseResponse.STORE_CATEGORYNAME_NOT_EXIST));
        }
        
        return res.send(response(baseResponse.SUCCESS, storeListByCategoryName));
    }
};

/**
 * API No. 15
 * API Name : 가게 Intro 수정 API
 * [PATCH] /app/stores/updateIntro/:storeIndex
 * path variable : storeIndex
 * body : storeIntro
 */
exports.patchStoreIntro = async function (req, res) {

    const storeIndex = req.params.storeIndex;
    const storeIntro = req.body.storeIntro;

        if (!storeIntro) return res.send(errResponse(baseResponse.STORE_STOREINTRO_EMPTY));

        const editStoreIntro = await storeService.editStoreIntro(storeIndex, storeIntro)
        return res.send(editStoreIntro);
};


