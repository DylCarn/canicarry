import logo from './logo.svg';
import './App.css';
import React, { useState } from 'react'; // Import useState
import Header from './components/Header';
import Footer from './components/Footer';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Login from './pages/Login';
import LocationServices from './pages/LocationServices';
import SignUp from './pages/SignUp';
import Disclaimer from './pages/Disclaimer';
import Main from './pages/Main';

function App() {

    return (
        <React.StrictMode>
            <Router>
                <Header />
                <Routes>
                    <Route path='/' element={<Login />} />
                    <Route path="/SignUp" element={<SignUp />} />
                    <Route path='/LocationServices' element={<LocationServices />} />
                    <Route path='/Disclaimer' element={<Disclaimer />} />
                    <Route path="/Main" element={<Main />} />
                </Routes>
                <Footer />
            </Router>
        </React.StrictMode>
    );
}

export default App;
