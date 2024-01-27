import { useNavigate } from 'react-router-dom';

const SignUp = () => {
    const navigate = useNavigate();

    const handleSubmit = (event) => {
        event.preventDefault();
        // Handle the sign-up logic here
        console.log("Sign up form submitted");
        // After sign up, redirect the user to the login page or home page
        navigate('/login'); // Replace with the path you want to redirect to after sign up
    };

    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-6 col-lg-4">
                    <h2 className="mb-4 text-center">Sign Up</h2>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <input
                                type="email"
                                className="form-control"
                                placeholder="Email"
                                required
                            />
                        </div>
                        <div className="mb-3">
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Username"
                                required
                            />
                        </div>
                        <div className="mb-3">
                            <input
                                type="password"
                                className="form-control"
                                placeholder="Password"
                                required
                            />
                        </div>
                        <button type="submit" className="btn btn-primary w-100">Sign Up</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default SignUp;