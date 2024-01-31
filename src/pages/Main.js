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
                            <MarkerF 
                            key={item.name} 
                            position={item.location} 
                            title="This was dumb" 
                            onClick={() => onSelect(item)} 
                            />
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
                            <p style={{fontWeight: 'bold'}}>{selected.name}</p>
                            <div style={{textAlign: 'center'}}>
                                <img src={upvotes === downvotes ? "/DoNotKnowGunPolicy.png" : (upvotes > downvotes ? "/YesGunPolicy.png" : "/NoGunPolicy.png")} alt="vote result" />
                            </div>
                            <p style={{textAlign: 'center', fontWeight: 'bold'}}>Gun Policy <em>Not Verified</em></p>
                            <div className="d-flex justify-content-around">
                                <div className="d-flex flex-column align-items-center">
                                    <button className="btn btn-success btn-sm" onClick={handleUpvote}>
                                        <i className="fa fa-thumbs-up"></i> Upvote
                                    </button>
                                    <span style={{fontWeight: 'bold'}}>{upvotes}</span>
                                </div>
                                <div className="d-flex flex-column align-items-center">
                                    <button className="btn btn-danger btn-sm" onClick={handleDownvote}>
                                        <i className="fa fa-thumbs-down"></i> Downvote
                                    </button>
                                    <span style={{fontWeight: 'bold'}}>{downvotes}</span>
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

