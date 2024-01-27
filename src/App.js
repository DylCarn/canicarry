import logo from './logo.svg';
import './App.css';
import React from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import LogOut from './pages/LogOut';

function App() {
    return (
        <React.StrictMode>
        <Router>
        <Header />
        <Routes>
        <Route path='/' element={<Login />}></Route>
        <Route path='/logout' element={<LogOut />}></Route>
        </Routes>
        <Footer />
        </Router>
        </React.StrictMode>
    );
}

export default App;
