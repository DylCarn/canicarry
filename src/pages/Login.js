import React from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const navigate = useNavigate();

    const handleSignUpClick = () => {
        // Navigate to the sign-up page when the user clicks the sign-up button
        navigate('/signup'); // Replace '/signup' with your actual signup route
    };

    return (
        <div className="d-flex flex-column align-items-center justify-content-center" style={{ height: '100vh', backgroundColor: 'white' }}>
            <img src="canIcarrylogo.png" alt="Logo" style={{ width: '350px', height: '350px' }}/>
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
                            <button type="submit" className="btn w-100 mb-3" style={{ backgroundColor: '#BE2035', color: 'white' }}>Log In</button>
                            <div className="text-center">
                                <p className="mb-2">Don't have an account?</p>
                                <button type="button" className="btn btn-light w-100" onClick={handleSignUpClick}>
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