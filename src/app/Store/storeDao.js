// 모든 가게 조회
async function selectStore(connection) {
    const selectStoreListQuery = `
                SELECT storeIndex, categoryIndex, storeName, storeStarGrade
                FROM Store;
                `;
    const [storeRows] = await connection.query(selectStoreListQuery);
    return storeRows;
}

//가게 이름으로 조회
async function selectStoreName(connection, storeName) {
    const selectStoreNameQuery = `
                SELECT storeIndex, categoryIndex, storeName, storeStarGrade
                FROM Store 
                WHERE storeName = ?;
                `;
    const [storeNameRows] = await connection.query(selectStoreNameQuery, storeName);
    return storeNameRows;
}

// storeIndex 회원 조회
async function selectStoreIndex(connection, storeIndex) {
    const selectStoreIndexQuery = `
                 SELECT storeIndex, storeName, storeStarGrade
                 FROM Store
                 WHERE storeIndex = ?;
                 `;
    const [storeIndexRow] = await connection.query(selectStoreIndexQuery, storeIndex);
    return storeIndexRow;
}

// 카테고리 이름으로 가게 조회
//s.storeIndex, s.categoryIndex, s.storeName, s.storeStarGrade
//s.categoryIndex, c.categoryName, s.storeName, s.storeIntro
async function selectStoreCategoryName(connection, categoryName) {
    const selectStoreCategoryNameQuery = `
                 SELECT s.categoryIndex, c.categoryName, s.storeName, s.storeIntro
                 FROM Store AS s
                    INNER JOIN Category AS c
                    ON (c.categoryIndex = s.categoryIndex)
                    WHERE c.categoryName = ?;
                `;
    const [storeCategoryNameRows] = await connection.query(selectStoreCategoryNameQuery, categoryName);
    return storeCategoryNameRows;
}

//storeIntro 수정하기
async function updateStoreIntro(connection, storeIndex, storeIntro) {
    const updateStoreIntroQuery = `
  UPDATE Store
  SET storeIntro = ?
  WHERE storeIndex = ?;
  `;
    const updateStoreIntroRow = await connection.query(updateStoreIntroQuery, [storeIntro, storeIndex]);
    return updateStoreIntroRow[0];
}


module.exports = {
    selectStore,
    selectStoreName,
    selectStoreIndex,
    selectStoreCategoryName,
    updateStoreIntro,

};