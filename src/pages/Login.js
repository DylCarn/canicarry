const Login = () => (
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
                    <button type="submit" className="btn btn-primary w-100">Log In</button>
                </form>
            </div>
        </div>
    </div>
);

export default Login;