module.exports = function(app) {
    const review = require('./reviewController');
    const jwtMiddleware = require('../../../config/jwtMiddleware');


    //21. storeIndex로 리뷰 조회
    app.get('/app/reviews/byStoreIndex/:storeIndex', review.getReviewByStoreIndex);

    //22. userIndex로 리뷰 조회
    app.get('/app/reviews/byUserIndex/:userIndex', review.getReviewByUserIndex);

    //23. 리뷰 생성 API
    app.post('/app/reviews', review.postReview);

    //리뷰 수정 by 리뷰 인덱스


};