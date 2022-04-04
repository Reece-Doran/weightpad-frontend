
// API endpoints
export const BACKEND_URL = "https://weightpad-backend.herokuapp.com";

export const LOGIN_URL = BACKEND_URL+"/api/v1/login";
export const USER_DATA_URL = BACKEND_URL+"/api/v1/userinfo/email/";
export const USER_REGISTRATION_URL = BACKEND_URL+ "/api/v1/register";
export const SAVE_ROUTINE_URL = BACKEND_URL+ "/api/v1/routine/";
export const DELETE_ROUTINE_URL = BACKEND_URL+ "/api/v1/routine/delete/";
export const SAVE_EXERCISE_URL = BACKEND_URL+ "/api/v1/exercise/";
export const DELETE_EXERCISE_URL = BACKEND_URL+ "/api/v1/exercise/delete/";
export const UPDATE_EXERCISE_URL = BACKEND_URL+ "/api/v1/exercise/update/";
export const SET_SCHEDULE_URL = BACKEND_URL+ "/api/v1/user/schedule/update/";
export const GET_SCHEDULE_URL = BACKEND_URL+ "/api/v1/user/schedule/getbyid/";
export const REFRESH_JWT_TOKEN_URL = BACKEND_URL+ "/api/v1/refreshtoken";

