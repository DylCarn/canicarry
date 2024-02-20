import logo from './logo.svg';
import './App.css';
import React, { useState } from 'react'; // Import useState
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Login from './pages/Login';
import LocationServices from './pages/LocationServices';
import SignUp from './pages/SignUp';
import Disclaimer from './pages/Disclaimer';
import Main from './pages/Main';
import BusinessVerification from './pages/BusinessVerification';

function App() {

    return (
        <React.StrictMode>
            <Router>
                <Routes>
                    <Route path='/' element={<Login />} />
                    <Route path="/SignUp" element={<SignUp />} />
                    <Route path='/LocationServices' element={<LocationServices />} />
                    <Route path='/Disclaimer' element={<Disclaimer />} />
                    <Route path="/Main" element={<Main />} />
                    <Route path="/BusinessVerification" element={<BusinessVerification />} />
                </Routes>
            </Router>
        </React.StrictMode>
    );
}

export default App;
