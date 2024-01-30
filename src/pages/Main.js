import React, { useRef, useEffect, useState, useMemo } from 'react';
import { GoogleMap, useLoadScript, MarkerF, LoadScript, InfoWindowF } from '@react-google-maps/api';
import '../App.css';



const Main = () => {
   
    const [upvotes, setUpvotes] = useState(0);
    const [downvotes, setDownvotes] = useState(0);
    
    const handleUpvote = () => {
        setUpvotes(upvotes + 1);
    };
    
    const handleDownvote = () => {
        setDownvotes(downvotes + 1);
    };
   
   
    const [selected, setSelected] = useState({});

    const onSelect = item => {
        setSelected(item);
    }
    const mapStyles = {
        height: "100vh",
        width: "100%"
    };
   
    const defaultCenter = {
        lat: 38.8807794, lng: -94.81837
    }

    const locations = [
        {
            name: "Panera",
            location: {
                lat: 38.8807794,
                lng: -94.81837
            },
        }
    ];
    return (
        <LoadScript googleMapsApiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY}>
            <GoogleMap zoom={15} center={defaultCenter} mapContainerStyle={mapStyles}>
                {
                    locations.map(item => {
                        return (
                            <MarkerF key={item.name} position={item.location} title="This was dumb" onClick={() => onSelect(item)} />
                        )
                    })
                }
                {
                    selected.location &&
                    (
                        <InfoWindowF
                            position={selected.location}
                            clickable={true}
                            onCloseClick={() => setSelected({})}
                        >
                            <div>
                        <p>{selected.name}</p>
                        <img src="/logo192.png"></img>
                        <p>Gun Policy Not Verified</p>
                        <div className="d-flex justify-content-between">
                            <div className="d-flex align-items-center">
                                <button className="btn btn-success btn-sm mr-2" onClick={handleUpvote}>
                                    <i className="fa fa-thumbs-up"></i> Upvote
                                </button>
                                <span>{upvotes}</span>
                            </div>
                            <div className="d-flex align-items-center">
                                <button className="btn btn-danger btn-sm mr-2" onClick={handleDownvote}>
                                    <i className="fa fa-thumbs-down"></i> Downvote
                                </button>
                                <span>{downvotes}</span>
                            </div>
                        </div>
                    </div>
                        </InfoWindowF>
                    )
                }
            </GoogleMap>
        </LoadScript>
    );
};

export default Main;

