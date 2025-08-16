import axios from 'axios';
import store from './data-storage';

const DOMAIN =  'http://127.0.0.1:7000';

export const api = axios.create({
    baseURL: `${DOMAIN}/api/v1`,
    headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${store.get('token')}`
    }
});

export const authApi = axios.create({
    baseURL: `${DOMAIN}`,
    headers: {
        'Content-Type': 'application/json'
    }
});
