import React from 'react';
import { Link } from 'react-router-dom';

const Disclaimer = () => {
  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6 col-lg-4">
          <h2 className="mb-4 text-center">Disclaimer</h2>
          <p>
            This is the base disclaimer text. Please read and agree to continue.
          </p>
          <div className="mb-3">
            <Link to="/agree" className="btn btn-primary w-100">
              Agree
            </Link>
          </div>
          <div className="mb-3">
            <Link to="/disagree" className="btn btn-secondary w-100">
              Disagree
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Disclaimer;
