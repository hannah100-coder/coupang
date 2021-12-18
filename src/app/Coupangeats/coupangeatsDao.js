// foodcategoryindex로 가게 조회
async function selectStoreByFoodCategoryIndex(connection, foodCategoryIndex) {
    const selectStoreByFoodCategoryIndexQuery = `
                 SELECT s.foodCategoryIndex, s.storeName, s.storeProfileImgUrl, s.fastDelivery
                 FROM Store AS s
                    INNER JOIN FoodCategory AS c
                    ON (c.foodCategoryIndex = s.foodCategoryIndex)
                    WHERE c.foodCategoryIndex = ?;
                `;
    const [storeByFoodCategoryIndexRows] = await connection.query(selectStoreByFoodCategoryIndexQuery, foodCategoryIndex);
    return storeByFoodCategoryIndexRows;
}

//전체 가게 조회
async function selectStoreAll(connection) {
    const selectStoreAllListQuery = `
                SELECT storeIndex, storeProfileImgUrl, storeName, fastDelivery, storeStarGrade, storeReviewCount,
                        storeAvgDeliveryTime, storeDeliveryMoney
                FROM Store;
                `;
    const [storeRows] = await connection.query(selectStoreAllListQuery);
    return storeRows;
}

//storeIndex로 가게 조회
async function selectStoreByStoreIndex(connection, storeIndex) {
    const selectStoreByStoreIndexQuery = `
                 SELECT storeProfileImgUrl, storeName, fastDelivery, storeStarGrade, 
                        storeReviewCount, storeAvgDeliveryTime, storeDeliveryMoney, 
                        storeMinOrderPrice 
                 FROM Store
                 WHERE storeIndex = ?;
                 `;
    const [storeByStoreIndexRow] = await connection.query(selectStoreByStoreIndexQuery, storeIndex);
    return storeByStoreIndexRow;
}


//특정 가게의 모든 메뉴 조회
async function selectMenuByStoreIndex(connection, storeIndex){
    const selectMenuByStoreIndexQuery = `
        SELECT menuName, menuImgUrl, menuPrice, menuIntro
        FROM Menu
        Where storeIndex = ?;
    `
    const [selectMenuByStoreIndexRows] = await connection.query(selectMenuByStoreIndexQuery, storeIndex);
    return selectMenuByStoreIndexRows;
}

//전체 카테고리 조회
async function selectCategoryAll(connection) {
    const selectCategoryAllListQuery = `
                SELECT foodCategoryIndex, categoryName, categoryIconUrl
                FROM FoodCategory;
                `;
    const [categoryRows] = await connection.query(selectCategoryAllListQuery);
    return categoryRows;
}


module.exports = {
    selectStoreByFoodCategoryIndex,
    selectStoreAll,
    selectStoreByStoreIndex,
    selectMenuByStoreIndex,
    selectCategoryAll
};