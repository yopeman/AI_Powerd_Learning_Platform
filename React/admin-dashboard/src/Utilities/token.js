import React from 'react';
import store from './data-storage';

export default function Token() {
    const token = store.get('token');
    if (!token) {
        window.location.href = '/login';
        return null;
    }
    return (<></>);
}
