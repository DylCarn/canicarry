import React, { useState } from 'react';
import { GoogleMap, LoadScript, MarkerF, InfoWindowF } from '@react-google-maps/api';
import '../App.css';

const Main = () => {
    const [votes, setVotes] = useState({ upvotes: 0, downvotes: 0 });
    const [voteStatus, setVoteStatus] = useState(null); // 'upvote', 'downvote', or null

    const handleVote = (type) => {
        if (voteStatus === type) {
            // User is trying to vote the same way again, do nothing
            return;
        }

        const newVotes = { ...votes };

        if (voteStatus === 'upvote') {
            newVotes.upvotes -= 1; // Undo previous upvote
        } else if (voteStatus === 'downvote') {
            newVotes.downvotes -= 1; // Undo previous downvote
        }

        if (type === 'upvote') {
            newVotes.upvotes += 1;
        } else if (type === 'downvote') {
            newVotes.downvotes += 1;
        }

        setVotes(newVotes);
        setVoteStatus(type); // Update vote status to the current action
    };

    const [selected, setSelected] = useState({});
    const onSelect = item => {
        setSelected(item);
        // Reset vote status when selecting a new location
        setVoteStatus(null);
    };

    const mapStyles = {
        height: "100vh",
        width: "100%"
    };

    const defaultCenter = {
        lat: 38.8807794, lng: -94.81837
    };

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
            <GoogleMap
                zoom={15}
                center={defaultCenter}
                mapContainerStyle={mapStyles}
                options={{
                    disableDefaultUI: true,
                    mapTypeControl: false,
                }}>
                {locations.map(item => (
                    <MarkerF 
                        key={item.name} 
                        position={item.location} 
                        onClick={() => onSelect(item)} 
                    />
                ))}
                {selected.location && (
                    <InfoWindowF
                        position={selected.location}
                        clickable={true}
                        onCloseClick={() => setSelected({})}
                    >
                        <div>
                            <p style={{fontWeight: 'bold'}}>{selected.name}</p>
                            <div style={{textAlign: 'center'}}>
                                <img src={votes.upvotes === votes.downvotes ? "/DoNotKnowGunPolicy.png" : (votes.upvotes > votes.downvotes ? "/YesGunPolicy.png" : "/NoGunPolicy.png")} alt="vote result" />
                            </div>
                            <p style={{textAlign: 'center', fontWeight: 'bold'}}>Gun Policy <em>Not Verified</em></p>
                            <p style={{fontSize: '0.7rem'}}>Let others know what you've seen – what's your observation?</p>
                            <div className="d-flex justify-content-around">
                                <div className="d-flex flex-column align-items-center">
                                    <button 
                                        className={`btn btn-sm ${voteStatus === 'upvote' ? 'btn-secondary' : 'btn-success'}`} 
                                        onClick={() => handleVote('upvote')}
                                    >
                                        <i className="fa fa-thumbs-up"></i> Yes
                                    </button>
                                    <span style={{fontWeight: 'bold', color: 'green'}}>{votes.upvotes}</span>
                                </div>
                                <div className="d-flex flex-column align-items-center">
                                    <button 
                                        className={`btn btn-sm ${voteStatus === 'downvote' ? 'btn-secondary' : 'btn-danger'}`} 
                                        onClick={() => handleVote('downvote')}
                                    >
                                        <i className="fa fa-thumbs-down"></i> No
                                    </button>
                                    <span style={{fontWeight: 'bold', color: 'red'}}>{votes.downvotes}</span>
                                <div style={{ position: 'absolute', bottom: 0, right: 0, paddingRight: '5px' }}>
                                    <a href="/BusinessVerification">
                                        <img src="/BusinessVerificationRequestImage.png" alt="Business Verification" style={{ width: '35px', height: '35px' }} />
                                    </a>
                                </div>
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

