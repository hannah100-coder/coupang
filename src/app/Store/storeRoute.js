module.exports = function(app) {
    const store = require('./storeController');
    const jwtMiddleware = require('../../../config/jwtMiddleware');

    //11. 가게 생성(등록)
    //app.post()


    // 12. 가게 조회 API (+ 가게 이름으로 검색)
    app.get('/app/stores', store.getStores);

    // 13. 특정 가게 조회 API
    app.get('/app/stores/index/:storeIndex', store.getStoreByIndex);

    //14. 카테고리 이름으로 가게 조회 API
    app.get('/app/stores/category', store.getStoreByCategoryName);

    //15. 가게 Intro 수정 API
    app.patch('/app/stores/updateIntro/:storeIndex', store.patchStoreIntro);





};

