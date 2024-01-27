import React from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const navigate = useNavigate();

    const handleSignUpClick = () => {
        // Navigate to the sign-up page when the user clicks the sign-up button
        navigate('/signup'); // Replace '/signup' with your actual signup route
    };

    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-6 col-lg-4">
                    <h2 className="mb-4 text-center">Login</h2>
                    <form>
                        <div className="mb-3">
                            <input type="text" className="form-control" placeholder="Username" />
                        </div>
                        <div className="mb-3">
                            <input type="password" className="form-control" placeholder="Password" />
                        </div>
                        <button type="submit" className="btn btn-primary w-100 mb-3">Log In</button>
                        <div className="text-center">
                            <p className="mb-2">Don't have an account?</p>
                            <button type="button" className="btn btn-secondary w-100" onClick={handleSignUpClick}>
                                Sign Up
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Login;
