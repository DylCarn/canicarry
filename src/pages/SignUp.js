import React, { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosBaseURL from '../http';
import { ThreeDots } from 'react-loader-spinner'
import { toast, Bounce, ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import { loadingStyle } from '../constants/constantvariables';
import { errorHandler } from '../helpers/errorHandler';
import { stringCompare } from '../helpers/validators';

const SignUp = () => {
    const navigate = useNavigate();
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [userName, setUserName] = useState('');
    const [email, setEmail] = useState('');
    const [response, setResponse] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const error = useRef()

    const handleSubmit = (event) => {
        event.preventDefault();
        error.current = stringCompare(password, confirmPassword)
        if (!error.current) {

            setIsLoading(true);
            axiosBaseURL.post("user_api/register/", {
                headers: {
                    'Content-Type': 'application/json',
                },
                password: password,
                username: userName,
                email: email,

            }).then((response) => {
                setResponse(response)
                if (response.data.token != "" && response.status >= 200 && response.status <= 299) {
                    localStorage.setItem('token', response.data.token)
                    setIsLoading(false)
                    navigate('/Disclaimer');
                }
                else {
                    toast.warn('Sign up failed!', {
                        position: "top-center",
                        autoClose: 5000,
                        hideProgressBar: true,
                        closeOnClick: false,
                        pauseOnHover: false,
                        draggable: false,
                        progress: undefined,
                        theme: "colored",
                        transition: Bounce,
                    });
                }
            }).catch(errorHandler)

        }
        else {
            toast.error(error.current, {
                position: "top-center",
                autoClose: 3508,
                hideProgressBar: true,
                closeOnClick: false,
                pauseOnHover: false,
                draggable: false,
                progress: undefined,
                theme: "colored",
                transition: Bounce,
            })
        }
        setIsLoading(false);
    };


    return (
        <div className="d-flex flex-column align-items-center justify-content-center" style={{ height: '100vh', backgroundColor: 'white' }}>
            <ToastContainer
                position="top-right"
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
            />
            {isLoading ?
                <div style={loadingStyle}>
                    <ThreeDots
                        visible={true}
                        height="80"
                        width="80"
                        color="#BE2035"
                        radius="9"
                        ariaLabel="three-dots-loading"
                        wrapperStyle={{}}
                        wrapperClass=""
                    />
                </div> :
                <div>

                    <img src="canIcarrylogo.png" alt="Logo" style={{ width: '350px', height: '350px' }} />
                    <div>
                        <div className="card" style={{ backgroundColor: '#0B2565', color: 'white' }}>
                            <div className="card-body">
                                <form onSubmit={handleSubmit}>
                                    <div className="mb-3">
                                        <input
                                            type="email"
                                            className="form-control"
                                            placeholder="Email"
                                            required
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <input type="text"
                                            className="form-control"
                                            placeholder="Username"
                                            required
                                            value={userName}
                                            onChange={(e) => setUserName(e.target.value)}
                                        />
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
            }
        </div>
        
    );
};

export default SignUp;