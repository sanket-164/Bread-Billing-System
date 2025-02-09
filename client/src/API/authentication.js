import axios from 'axios';

const authenticationAPI = axios.create({
    baseURL: `${process.env.REACT_APP_BACKEND_URL}/authentication`
});

export const login = (email, password, role) => authenticationAPI.post('/login', { email: email, password: password, role: role });
export const forgotpwd = (email, role) => authenticationAPI.post('/forgotpwd', { email: email, role: role });
export const changePwd = (email, password, role) => authenticationAPI.post('/changepwd', { email: email, password: password, role: role });