import React, { useEffect, useState } from 'react';
import GoogleMapReact from 'google-map-react';

const AnyReactComponent = () => <div style={{
    color: 'white', 
    background: 'red',
    padding: '15px 10px',
    display: 'inline-flex',
    textAlign: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: '100%', 
    transform: 'translate(-50%, -50%)'
}}>My Marker</div>

let map, maps;

const handleApiLoaded = (mapLoaded, mapsLoaded) => {
    map = mapLoaded;
    maps = mapsLoaded;
};

const Main = () => {
    const [businesses, setBusinesses] = useState([]);

    useEffect(() => {
        const handleResize = () => {
            if (map && maps) {
                const center = map.getCenter();
                maps.event.trigger(map, 'resize');
                map.setCenter(center);
            }
        };

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return (
        <div style={{ height: '100vh', width: '100%' }}>
            <GoogleMapReact
                bootstrapURLKeys={{ key: process.env.REACT_APP_GOOGLE_MAPS_API_KEY }}
                defaultCenter={{ lat: 38.884, lng: -94.874}}
                defaultZoom={16}
                yesIWantToUseGoogleMapApiInternals
                onGoogleApiLoaded={({ map, maps }) => handleApiLoaded(map, maps)}
            >
                <AnyReactComponent
                    lat={38.884}
                    lng={-94.874}
                    text="My Marker"
                />
            </GoogleMapReact>
        </div>
    );
};

export default Main;

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