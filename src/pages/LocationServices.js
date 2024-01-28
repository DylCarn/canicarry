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
    <div className="d-flex justify-content-center align-items-center vh-100">
      <div className="text-center p-4 bg-white border rounded shadow-sm">
        <h2 className="mb-3">Enable Location</h2>
        <p className="mb-3">Our app works better with location services turned on.</p>
        <p className="mb-3">You can adjust your location settings at any time.</p>
        <button className="btn btn-danger" onClick={handleEnableLocation}>OK, I understand</button>
      </div>
    </div>
  );
};

export default LocationServices;
//NEW CODEADFADSFASDGFASDG