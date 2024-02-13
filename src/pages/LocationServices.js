import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const LocationServices = () => {
  const [locationEnabled, setLocationEnabled] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Check if location services are enabled
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        () => setLocationEnabled(true), // Success callback
        () => setLocationEnabled(false), // Error callback
        { timeout: 10000 } // Options: Wait for 10 seconds
      );
    }
  }, [navigate]);

  useEffect(() => {
    // Redirect if location is already enabled
    if (locationEnabled) {
      navigate('/disclaimer'); // Replace with your intended route
    }
  }, [locationEnabled, navigate]);

  const handleEnableLocation = () => {
    // Logic to request location permission and enable location services
    navigate('/disclaimer'); // Navigate to Disclaimer page after enabling location
  };

  // Do not display the page if location is already enabled
  if (locationEnabled) return null;

  return (
    <div className="d-flex flex-column align-items-center justify-content-center" style={{ height: '100vh', backgroundColor: 'white' }}>
      <img src="canIcarrylogo.png" alt="Logo" style={{ width: '350px', height: '350px' }}/>
      <div className="col-md-6 col-lg-4">
        <div className="card" style={{ backgroundColor: '#0B2565', color: 'white' }}>
          <div className="card-body">
            <h2 className="mb-3 text-center">Enable Location</h2>
            <p className="mb-3">Our app works better with location services turned on.</p>
            <p className="mb-3">You can adjust your location settings at any time.</p>
            <button className="btn w-100 mb-3" style={{ backgroundColor: '#BE2035', color: 'white' }} onClick={handleEnableLocation}>OK, I understand</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LocationServices;