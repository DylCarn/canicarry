import logo from './logo.svg';
import './App.css';
import React from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; // Import necessary components

import Login from './pages/Login';
import LocationServices from './pages/LocationServices';
import SignUp from './pages/SignUp';

function App() {
    return (
        <React.StrictMode>
            <Router>
                <Header />
                <Routes>
                    <Route path='/' element={<Login />} />
                    <Route path="/SignUp" element={<SignUp />} />
                    <Route path='/LocationServices' element={<LocationServices />} />
                    <Route path="/" element={({ navigate }) => {navigate('/login'); return null;}}/>
                </Routes>
                <Footer />
            </Router>
        </React.StrictMode>
    );
}

export default App;

