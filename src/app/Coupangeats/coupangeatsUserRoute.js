module.exports = function(app) {
    const users = require('./coupangeatsUserController');
    const jwtMiddleware = require('../../../config/jwtMiddleware');

    //16. 유저 회원가입
    app.post('/app/users/signup', users.postUsers);
};