import axios from 'axios';

const adminAPI = axios.create({
    baseURL: `${process.env.REACT_APP_BACKEND_URL}/admin`,
    headers: {
        'Content-Type': 'application/json',
        'authToken': JSON.parse(localStorage.getItem('breadBilling'))?.token
    }
});

export const fetchProfile = () => adminAPI.get('/profile');
export const updateProfile = (admin) => adminAPI.patch('/update', admin);

export const fetchCashier = (id) => adminAPI.get(`/cashier/${id}`);
export const fetchCashiers = () => adminAPI.get('/cashiers');
export const updateCashier = (id, cashier) => adminAPI.patch(`/update/cashier/${id}`, cashier);
export const hireCashier = (cashier) => adminAPI.post(`/hire/cashier`, cashier);
export const deleteCashier = (id) => adminAPI.delete(`delete/cashier/${id}`);

export const fetchBill = (id) => adminAPI.get(`/bill/${id}`);
export const fetchBills = () => adminAPI.get('/bills');
export const fetchTodayBills = () => adminAPI.get('/today/bills');
export const fetchBillsOfCashier = (cashierId) => adminAPI.get(`/cashier/bills/${cashierId}`);
export const updateBill = (id, bill) => adminAPI.patch(`/update/bill/${id}`, bill);
export const deleteBill = (id) => adminAPI.delete(`delete/bill/${id}`);

export const fetchBread = (id) => adminAPI.get(`/bread/${id}`);
export const fetchBreads = () => adminAPI.get('/breads');
export const updateBread = (id, bread) => adminAPI.patch(`/update/bread/${id}`, bread);
export const addBread = (bread) => adminAPI.post(`/add/bread`, bread);
export const deleteBread = (id) => adminAPI.delete(`delete/bread/${id}`);