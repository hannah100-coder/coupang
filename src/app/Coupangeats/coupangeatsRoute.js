module.exports = function(app) {
    const stores = require('./coupangeatsController');
    const jwtMiddleware = require('../../../config/jwtMiddleware');



    //1. 카테고리index로 가게 조회 API
    app.get('/app/stores/foodCategoryIndex/:foodCategoryIndex', stores.getStoreByFoodCategoryIndex);

    //2. 가게 전체 조회 API
    app.get('/app/stores/all', stores.getStores);

    //3. 가게index로 가게 조회 API
    app.get('/app/stores/storeIndex/:storeIndex', stores.getStoreByStoreIndex);

    //4. 특정 가게(storeIndex)의 모든 메뉴 조회 API
    app.get('/app/stores/menuAll/:storeIndex', stores.getAllMenuByStoreIndex);

    //5. 카테고리 전체 조회
    app.get('/app/stores/category/all', stores.getAllCategories);

};

