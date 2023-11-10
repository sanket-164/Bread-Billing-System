import React, { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import BreadBilling from '../BreadBilling';
import Navbar from './Navbar';
import Home from './Home';
import Profile from './Profile';
import Bread from './Bread';
import CreateBill from './CreateBill';
import Bills from './Bills';
import BillReceipt from '../BillReceipt';
import Settings from '../Settings';

function Cashier() {
    const [theme, setTheme] = useState(JSON.parse(localStorage.getItem('breadBillingTheme')));
    document.body.style.color = theme.text;
    document.body.style.backgroundColor = theme.background;
    
    return (
        <div className='container'>
            <BrowserRouter>
                <Navbar theme={theme} />
                <Routes>
                    <Route path='/' exact element={<BreadBilling theme={theme} />} />
                    <Route path='/home' exact element={<Home theme={theme} />} />
                    <Route path='/profile' exact element={<Profile theme={theme} />} />
                    <Route path='/bread' exact element={<Bread theme={theme} />} />
                    <Route path='/createbill' exact element={<CreateBill theme={theme} />} />
                    <Route path='/billreceipt' exact element={<BillReceipt theme={theme} />} />
                    <Route path='/bills' exact element={<Bills theme={theme} />} />
                    <Route path='/settings' exact element={<Settings theme={theme} setTheme={setTheme} />} />
                </Routes>
            </BrowserRouter>

        </div>
    )
}

export default Cashier
