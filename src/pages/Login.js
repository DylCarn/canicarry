import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosBaseURL from '../http';

const Login = () => {
    const navigate = useNavigate();
    const [loginData, setLoginData] = useState();
    const [loginOBJ, setLoginOBJ] = useState();
    
    function loginClick() {
        axiosBaseURL.get("/test_api/test/", {
            headers: {
                'Content-Type': 'application/json',
            },
        }).then((response) => {
            console.log(response)

            for (var i = 0; i < response.data.length; i++) {
                console.log(response.data[i].username)
            }

        }).catch(function (error) {
            console.log(error)
        });
    };

    return (
        <div className="d-flex flex-column align-items-center justify-content-center" style={{ height: '100vh', backgroundColor: 'white' }}>
            <img src="canIcarrylogo.png" alt="Logo" style={{ width: '350px', height: '350px' }} />
            <div className="col-md-4 col-lg-4">
                <div className="card" style={{ backgroundColor: '#0B2565', color: 'white' }}>
                    <div className="card-body">
                        <form>
                            <div className="mb-3">
                                <input type="text" className="form-control" placeholder="Username" />
                            </div>
                            <div className="mb-3">
                                <input type="password" className="form-control" placeholder="Password" />
                            </div>
                            <button type="submit" className="btn w-100 mb-3" style={{ backgroundColor: '#BE2035', color: 'white' }} onClick={loginClick}>Log In</button>
                            <div className="text-center">
                                <p className="mb-2">Don't have an account?</p>
                                <button to="/SignUp" type="button" className="btn btn-light w-100">
                                    Sign Up
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default Login;