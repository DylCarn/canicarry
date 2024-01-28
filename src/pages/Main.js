import React, { useEffect, useState } from 'react';
import GoogleMapReact from 'google-map-react';


const Main = () => {
    const [businesses, setBusinesses] = useState([]);

    //set variable with information returned from PostMan


 /*
    useEffect(() => {
        // Fetch businesses data from API or database
        // and update the 'businesses' state
        fetchBusinesses();
    }, []);

    const fetchBusinesses = () => {
        // Fetch businesses data from API or database
        // and update the 'businesses' state
        const fetchedBusinesses = [
            {
                id: 1,
                name: 'Business 1',
                location: { lat: 37.7749, lng: -122.4194 },
                gunPolicy: 'Verified',
            },
            {
                id: 2,
                name: 'Business 2',
                location: { lat: 37.7749, lng: -122.4316 },
                gunPolicy: 'User Voted',
            },
            // ... other businesses ...
        ];
        setBusinesses(fetchedBusinesses);
    };
*/
    return (
        <div style={{ height: '100vh', width: '100%' }}>
            <GoogleMapReact
                bootstrapURLKeys={{ key: process.env.REACT_APP_GOOGLE_MAPS_API_KEY }}
                defaultCenter={{ lat: 38.884, lng: -94.874}}
                defaultZoom={15}
                // Add Marker for map..
            />
        </div>
    );
};
//
export default Main;