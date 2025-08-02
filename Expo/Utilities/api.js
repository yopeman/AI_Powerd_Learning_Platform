import axios from 'axios';

const api = (bearer) => axios.create({
    baseURL: 'http://localhost:7000/api/v1',
    headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${bearer}`
    }
});

const authApi = axios.create({
    baseURL: 'http://localhost:7000',
    headers: {
        'Content-Type': 'application/json'
    }
});

// api.interceptors.request.use(config => {
//     console.log('API Request: ', config);
//     return config;
// });

// api.interceptors.response.use(
//   response => {
//     console.log('API Response:', response);
//     return response;
//   },
//   error => {
//     console.error('API Error:', error);
//     return Promise.reject(error);
//   }
// );

// authApi.interceptors.request.use(config => {
//     console.log('Auth API Request: ', config);
//     return config;
// });

// authApi.interceptors.response.use(
//   response => {
//     console.log('Auth API Response:', response);
//     return response;
//   },
//   error => {
//     console.error('API Error:', error);
//     return Promise.reject(error);
//   }
// );

export {
    api,
    authApi
}