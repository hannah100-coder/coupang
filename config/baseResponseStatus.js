//Response로 보내줄 상태코드와 메세지 등을 이 파일에서 관리함

module.exports = {

    // Success
    SUCCESS : { "isSuccess": true, "code": 1000, "message":"성공" },

    // Common
    TOKEN_EMPTY : { "isSuccess": false, "code": 2000, "message":"JWT 토큰을 입력해주세요." },
    TOKEN_VERIFICATION_FAILURE : { "isSuccess": false, "code": 3000, "message":"JWT 토큰 검증 실패" },
    TOKEN_VERIFICATION_SUCCESS : { "isSuccess": true, "code": 1001, "message":"JWT 토큰 검증 성공" }, // ?

    //Request error
    //SIGNUP
    SIGNUP_PHONE_EMPTY : { "isSuccess": false, "code": 1997, "message":"휴대폰 번호를 입력해주세요" },
    SIGNUP_PHONE_LENGTH : { "isSuccess": false, "code": 1998, "message":"휴대폰 번호는 12자리 미만으로 입력해주세요." },
    SIGNUP_PHONE_ERROR_TYPE : { "isSuccess": false, "code": 1999, "message":"휴대폰 번호 형식을 정확하게 입력해주세요." },

    SIGNUP_EMAIL_EMPTY : { "isSuccess": false, "code": 2001, "message":"이메일을 입력해주세요" },
    SIGNUP_EMAIL_LENGTH : { "isSuccess": false, "code": 2002, "message":"이메일은 30자리 미만으로 입력해주세요." },
    SIGNUP_EMAIL_ERROR_TYPE : { "isSuccess": false, "code": 2003, "message":"이메일을 형식을 정확하게 입력해주세요." },
    SIGNUP_PASSWORD_EMPTY : { "isSuccess": false, "code": 2004, "message": "비밀번호를 입력 해주세요." },
    SIGNUP_PASSWORD_LENGTH : { "isSuccess": false, "code": 2005, "message":"비밀번호는 6~20자리를 입력해주세요." },
    SIGNUP_USERNAME_EMPTY : { "isSuccess": false, "code": 2006, "message":"이름을 입력 해주세요." },
    SIGNUP_USERNAME_LENGTH : { "isSuccess": false,"code": 2007,"message":"이름은 최대 20자리를 입력해주세요." },

    //SIGNIN
    SIGNIN_EMAIL_EMPTY : { "isSuccess": false, "code": 2008, "message":"이메일을 입력해주세요" },
    SIGNIN_EMAIL_LENGTH : { "isSuccess": false, "code": 2009, "message":"이메일은 30자리 미만으로 입력해주세요." },
    SIGNIN_EMAIL_ERROR_TYPE : { "isSuccess": false, "code": 2010, "message":"이메일을 형식을 정확하게 입력해주세요." },
    SIGNIN_PASSWORD_EMPTY : { "isSuccess": false, "code": 2011, "message": "비밀번호를 입력 해주세요." },

    //USER
    USER_USERID_EMPTY : { "isSuccess": false, "code": 2012, "message": "userId를 입력해주세요." },
    USER_USERID_NOT_EXIST : { "isSuccess": false, "code": 2013, "message": "해당 회원이 존재하지 않습니다." },

    USER_USEREMAIL_EMPTY : { "isSuccess": false, "code": 2014, "message": "이메일을 입력해주세요." },
    USER_USEREMAIL_NOT_EXIST : { "isSuccess": false, "code": 2015, "message": "해당 이메일을 가진 회원이 존재하지 않습니다." },
    USER_ID_NOT_MATCH : { "isSuccess": false, "code": 2016, "message": "유저 아이디 값을 확인해주세요" },
    USER_NICKNAME_EMPTY : { "isSuccess": false, "code": 2017, "message": "변경할 닉네임 값을 입력해주세요" },

    USER_STATUS_EMPTY : { "isSuccess": false, "code": 2018, "message": "회원 상태값을 입력해주세요" },

    USER_LEVEL_EMPTY : { "isSuccess": false, "code": 2019, "message": "userLevel를 입력해주세요."},
    USER_USERLEVEL_NOT_EXIST : { "isSuccess": false, "code": 2020, "message": "해당 등급이 존재하지 않습니다." },

    //STORE
    STORE_STOREINDEX_EMPTY: { "isSuccess": false, "code": 2021, "message": "storeIndex를 입력해주세요." },
    STORE_STOREINDEX_NOT_EXIST: { "isSuccess": false, "code": 2022, "message": "해당 가게가 존재하지 않습니다." },

    STORE_CATEGORYNAME_EMPTY: { "isSuccess": false, "code": 2023, "message": "카테고리명을 입력해주세요." },
    STORE_CATEGORYNAME_NOT_EXIST: { "isSuccess": false, "code": 2024, "message": "해당 카테고리 결과가 존재하지 않습니다." },
    STORE_CATEGORYINDEX_EMPTY: { "isSuccess": false, "code": 2025, "message": "카테고리번호를 입력해주세요." },
    STORE_CATEGORYINDEX_NOT_EXIST: { "isSuccess": false, "code": 2026, "message": "해당 카테고리의 가게가 존재하지 않습니다." },

    STORE_STOREINTRO_EMPTY: {"isSuccess": false, "code": 2027, "message": "가게 소개를 입력해주세요." },
    STORE_STARGRADE_EMPTY: {"isSuccess": false, "code": 2028, "message": "가게 별점을 입력해주세요." },


    // Response error
    SIGNUP_REDUNDANT_EMAIL : { "isSuccess": false, "code": 3001, "message":"중복된 이메일입니다." },
    SIGNUP_REDUNDANT_NICKNAME : { "isSuccess": false, "code": 3002, "message":"중복된 닉네임입니다." },

    SIGNIN_EMAIL_WRONG : { "isSuccess": false, "code": 3003, "message": "이메일이 잘못 되었습니다." },
    SIGNIN_PASSWORD_WRONG : { "isSuccess": false, "code": 3004, "message": "비밀번호가 잘못 되었습니다." },
    SIGNIN_INACTIVE_ACCOUNT : { "isSuccess": false, "code": 3005, "message": "비활성화 된 계정입니다. 고객센터에 문의해주세요." },
    SIGNIN_WITHDRAWAL_ACCOUNT : { "isSuccess": false, "code": 3006, "message": "탈퇴 된 계정입니다. 고객센터에 문의해주세요." },

    //Connection, Transaction 등의 서버 오류
    DB_ERROR : { "isSuccess": false, "code": 4000, "message": "데이터 베이스 에러"},
    SERVER_ERROR : { "isSuccess": false, "code": 4001, "message": "서버 에러"},
 
 
}
