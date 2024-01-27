import React, { useEffect, useState } from 'react';
import GoogleMapReact from 'google-map-react';

const AnyReactComponent = ({ text }) => <div>{text}</div>;

const Main = () => {
    const [businesses, setBusinesses] = useState([]);

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

    return (
        <div style={{ height: '100vh', width: '100%' }}>
            <GoogleMapReact
                bootstrapURLKeys={{ key: 'AIzaSyCmDX_bSdKtCuWC-KPOUsqQ1v7YKBf1bqg' }}
                defaultCenter={{ lat: 37.7749, lng: -122.4194 }}
                defaultZoom={10}
            >
                {businesses.map((business) => (
                    <AnyReactComponent
                        key={business.id}
                        lat={business.location.lat}
                        lng={business.location.lng}
                        text={business.name}
                    />
                ))}
            </GoogleMapReact>
        </div>
    );
};

export default Main;