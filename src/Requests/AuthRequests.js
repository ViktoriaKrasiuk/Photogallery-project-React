import { request } from '../index.js';
import {saveToken}  from '../utils/index';

export const registerUser = (sendData) => {
    return request.post('/api/auth/register', sendData).then(r =>{
        alert('Registration completed successfully')
        localStorage.setItem('gallery_project_token', r.data.token.token)

        return r
    }).catch(e => {
        alert(e.message)
    })
}

export const loginUser = (sendData) => {
    return request.post('/api/auth/login', sendData).then(r =>{
        saveToken(r.data.token)

        return r
    }).catch(e => {
        for (let key in e.response.data.errors) {
            let message = e.response.data.errors[key]
            alert(`${key}: ${message};`)
        }
    })
}