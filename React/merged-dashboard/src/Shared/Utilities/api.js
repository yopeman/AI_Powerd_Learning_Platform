import axios from 'axios';

const DOMAIN = 'https://ai-powered-learning-platform.onrender.com';

export const api = axios.create({
    baseURL: `${DOMAIN}/api/v1`,
    headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
    }
});

export const authApi = axios.create({
    baseURL: `${DOMAIN}`,
    headers: {
        'Content-Type': 'application/json'
    }
});
