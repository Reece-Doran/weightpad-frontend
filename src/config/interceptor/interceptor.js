import store from "../../store/store"
import jwt_decode from 'jwt-decode'
import { refreshTokens } from "../../store/features/jwt/jwtSlice"
import { clearData } from "../../store/features/user/userSlice"
import dayjs from 'dayjs';
import { authRequest } from "../axios/axios"
import { RefreshTokenError } from "../../store/features/exception/refreshTokenError"
 


// this isused for any request that requires JWT auth
export const axiosAuthRequestInterceptor =  
authRequest.interceptors.request.use(async req => {

    let { jwt } = store.getState();
    const accessToken = jwt.value.accessToken;
    const refreshToken = jwt.value.refreshToken;

    // access token will be null when logged out
    if (accessToken) {

        const accessTokenInfo = jwt_decode(accessToken);
        
        const refreshTokenInfo= jwt_decode(refreshToken);
        
        const refreshTokenExpired = dayjs.unix(refreshTokenInfo.exp).diff(dayjs()) < 1;
        const accessTokenExpired = dayjs.unix(accessTokenInfo.exp).diff(dayjs()) < 1;

        if (refreshTokenExpired) {
            store.dispatch(clearData());
            throw new RefreshTokenError("refresh token expired");
        }

        if (accessTokenExpired) {
            // console.log("access token expired");
            await store.dispatch(refreshTokens({}));
            let { jwt } = store.getState();
            const newAccessToken = jwt.value.accessToken;
            req.headers.Authorization = "Bearer " + newAccessToken;
        }
    }
    return req;
  })
// const axiosInterceptor =  axios.interceptors.response.use((response) => {

//       if (response.status === 401) {
//         console.log("You are not authorized");
//         //redirect
//       }
//       return response;
//     }, (error) => {
//       if (error.response && error.response.data) {
//         return Promise.reject(error.response.data);
//       }
//       return Promise.reject(error.message);
//     });

// export default axiosInterceptor;