import axios from 'axios';

// const {jwt} = store.getState();
// let accessToken = jwt.value.accessToken;


export const authRequest = axios.create({

    // baseURL: 'https://some-domain.com/api/',
    // timeout: 1000,
    // headers: {
    //     "Authorization": "Bearer " + accessToken,
    //     "Access-Control-Allow-Origin": "*",
    //     'content-type': 'application/json'
    // }
  });