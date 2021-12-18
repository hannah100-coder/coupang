module.exports = function(app) {
    const users = require('./coupangeatsUserController');
    const jwtMiddleware = require('../../../config/jwtMiddleware');


    //6. 유저 주소 입력
    app.post('/app/users/postAddress', users.postUserAddress);


    //16. 유저 회원가입
    app.post('/app/users/signup', users.postUsers);
};