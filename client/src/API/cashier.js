import axios from 'axios';

const cashierAPI = axios.create({
    baseURL: `${process.env.REACT_APP_BACKEND_URL}cashier`,
    headers: {
        'Content-Type': 'application/json',
        'authToken': JSON.parse(localStorage.getItem('breadBilling'))?.token
    }
});

export const fetchProfile = () => cashierAPI.get('/profile');
export const fetchBreads = () => cashierAPI.get(`/breads`);
export const fetchBills = () => cashierAPI.get(`/bills`);
export const updateProfile = (cashier) => cashierAPI.patch('/update', cashier);
export const createBill = (bill) => cashierAPI.post(`/create/bill`, bill);
