import React, { useState } from 'react';
import { GoogleMap, useLoadScript, MarkerF, LoadScript, InfoWindowF } from '@react-google-maps/api';
import '../App.css';

const Main = () => {
    
    const [upvotes, setUpvotes] = useState(0);
    const [downvotes, setDownvotes] = useState(0);
    const [voteStatus, setVoteStatus] = useState({ upvoted: false, downvoted: false });

    const handleUpvote = () => {
        setUpvotes(upvotes + 1);
        setVoteStatus({ upvoted: true, downvoted: false });
    };

    const handleDownvote = () => {
        setDownvotes(downvotes + 1);
        setVoteStatus({ upvoted: false, downvoted: true });
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
            <GoogleMap zoom={15} 
            center={defaultCenter} 
            mapContainerStyle={mapStyles}
            options={{
            disableDefaultUI: true, // this removes the zoom buttons and map type button if marked "true"
            mapTypeControl: false, // this removes the "Map and Satellite" option if marked "false"
    }}
            >
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
                            <p style={{fontSize: '0.7rem'}}>Let others know what you've seen – what's your observation?</p>
                            <div className="d-flex justify-content-around">
                            <div className="d-flex flex-column align-items-center">
                                <button 
                                    className={`btn btn-sm ${voteStatus.upvoted ? 'btn-secondary' : 'btn-success'}`} 
                                    onClick={handleUpvote}
                                >
                                    <i className="fa fa-thumbs-up"></i> Yes
                                </button>
                                <span style={{fontWeight: 'bold'}}>{upvotes}</span>
                            </div>
                            <div className="d-flex flex-column align-items-center">
                                <button 
                                    className={`btn btn-sm ${voteStatus.downvoted ? 'btn-secondary' : 'btn-danger'}`} 
                                    onClick={handleDownvote}
                                >
                                    <i className="fa fa-thumbs-down"></i> No
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

