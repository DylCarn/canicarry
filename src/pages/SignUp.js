import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SignUp = () => {
    const navigate = useNavigate();

    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();

        if (password !== confirmPassword) {
            alert("Passwords do not match. Please try again.");
            return;
        }

        console.log("Sign up form submitted");
        navigate('/LocationServices'); 
    };

    return (
        <div className="d-flex flex-column align-items-center justify-content-center" style={{ height: '100vh', backgroundColor: 'white' }}>
            <img src="canIcarrylogo.png" alt="Logo" style={{ width: '350px', height: '350px' }}/>
            <div className="col-md-6 col-lg-4">
                <div className="card" style={{ backgroundColor: '#0B2565', color: 'white' }}>
                    <div className="card-body">
                        <form onSubmit={handleSubmit}>
                            <div className="mb-3">
                                <input type="email" className="form-control" placeholder="Email" required />
                            </div>
                            <div className="mb-3">
                                <input type="text" className="form-control" placeholder="Username" required />
                            </div>
                            <div className="mb-3">
                                <input
                                    type="password"
                                    className="form-control"
                                    placeholder="Password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="mb-3">
                                <input
                                    type="password"
                                    className="form-control"
                                    placeholder="Confirm Password"
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    required
                                />
                            </div>
                            <button type="submit" className="btn w-100 mb-3" style={{ backgroundColor: '#BE2035', color: 'white' }}>Sign Up</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SignUp;