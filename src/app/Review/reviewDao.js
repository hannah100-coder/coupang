//21. storeIndex로 리뷰 조회
async function selectReviewByStoreIndex(connection, storeIndex){

    const selectReviewByStoreIndexQuery = `
            SELECT r.storeIndex, u.userName, m.menuName,  r.starGrade, r.reviewWrite
            FROM Review r
                JOIN User u
                    ON r.userIndex = u.userIndex
                JOIN Menu m
                    ON r.menuIndex = m.menuIndex
            WHERE r.storeIndex = ?;
            `;
    const [reviewByStoreIndexRows] = await connection.query(selectReviewByStoreIndexQuery, storeIndex);
    return reviewByStoreIndexRows;
}

//22. userIndex로 리뷰 조회
async function selectReviewByUserIndex(connection, userIndex) {

    const selectReviewByUserIndexQuery = `
            SELECT r.userIndex, s.storeName, m.menuName,  r.starGrade, r.reviewWrite
                FROM Review r
                    JOIN Store s
                        ON r.storeIndex = s.storeIndex
                    JOIN Menu m
                        ON r.menuIndex = m.menuIndex
                WHERE r.userIndex = ?;
    `;
    const [reviewByUserIndexRows] = await connection.query(selectReviewByUserIndexQuery, userIndex);
    return reviewByUserIndexRows;
}

//23. 리뷰 생성
async function insertReview(connection, insertReviewParams) {
    const insertReviewQuery = `
        INSERT INTO Review(storeIndex, userIndex, menuIndex, starGrade, reviewWrite)
        VALUES (?, ?, ?, ?, ?);
    `;
    const insertReviewRow = await connection.query(
        insertReviewQuery,
        insertReviewParams
    );

    return insertReviewRow;
}





module.exports = {
    selectReviewByStoreIndex,
    selectReviewByUserIndex,
    insertReview
};