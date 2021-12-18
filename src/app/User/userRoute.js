module.exports = function(app){
    const user = require('./userController');
    const jwtMiddleware = require('../../../config/jwtMiddleware');

    // 0. 테스트 API
     app.get('/app/test', user.getTest);

    // 1. 유저 생성 (회원가입) API
    app.post('/app/users', user.postUsers);

    // 2. 유저 조회 API (+ 이메일로 검색)
    app.get('/app/users',user.getUsers); 

    // 3. 특정 유저 조회 API
    app.get('/app/users/index/:userIndex', user.getUserByIndex);

    //6. 유저 등급으로 회원 조회
    app.get('/app/users/level', user.getUserByLevel);


    //내 리뷰 조회, 내가 찜한 가게 조회



    // 아래 부분은 7주차에서 다룸.
    // TODO: After 로그인 인증 방법 (JWT)
    // 로그인 하기 API (JWT 생성)
    app.post('/app/login', user.login);

    // 회원 정보 수정 API (JWT 검증 및 Validation - 메소드 체이닝 방식으로 jwtMiddleware 함수 사용)
    //jwtMiddleware .여기서 완료되면 그다음에 user.patchUsers로 넘어가는거임.
    app.patch('/app/users/:userIndex', jwtMiddleware, user.patchUsers);



};


// TODO: 자동로그인 API (JWT 검증 및 Payload 내뱉기)
// JWT 검증 API
// app.get('/app/auto-login', jwtMiddleware, user.check);

// TODO: 탈퇴하기 API
