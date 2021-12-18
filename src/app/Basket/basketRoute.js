module.exports = function(app) {
    const basket = require('./basketController');
    const jwtMiddleware = require('../../../config/jwtMiddleware');


    // 31. 특정 유저의 장바구니 메뉴 조회 API
    app.get('/app/basket/userIndex/:userIndex', basket.getBasketByUserIndex);

    


};