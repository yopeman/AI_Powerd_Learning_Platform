import axios from 'axios';
import store from './data-storage';

export const api = axios.create({
    baseURL: 'http://localhost:7000/api/v1',
    headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${store.get('token')}`
    }
});

export const authApi = axios.create({
    baseURL: 'http://localhost:7000',
    headers: {
        'Content-Type': 'application/json'
    }
});
