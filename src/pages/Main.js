import React, { useState } from 'react';
import { GoogleMap, LoadScript, MarkerF, InfoWindowF } from '@react-google-maps/api';
import '../App.css';

const Main = () => {
    const [votes, setVotes] = useState({ upvotes: 0, downvotes: 0 });
    const [voteStatus, setVoteStatus] = useState(null); // 'upvote', 'downvote', or null

    function handleVote(voteType) {
        // If the user clicks on their current vote, remove their vote
        if (voteStatus === voteType) {
            setVoteStatus(null);
            if (voteType === 'upvote') {
                setVotes({ ...votes, upvotes: votes.upvotes - 1 });
            } else {
                setVotes({ ...votes, downvotes: votes.downvotes - 1 });
            }
        } else {
            // If the user changes their vote, adjust the vote counts accordingly
            if (voteStatus === 'upvote') {
                setVotes({ ...votes, upvotes: votes.upvotes - 1, downvotes: votes.downvotes + 1 });
            } else if (voteStatus === 'downvote') {
                setVotes({ ...votes, upvotes: votes.upvotes + 1, downvotes: votes.downvotes - 1 });
            } else {
                // If the user is voting for the first time, just increment the vote count
                if (voteType === 'upvote') {
                    setVotes({ ...votes, upvotes: votes.upvotes + 1 });
                } else {
                    setVotes({ ...votes, downvotes: votes.downvotes + 1 });
                }
            }
            setVoteStatus(voteType);
        }
    }

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
                       <p style={{fontWeight: 'bold', fontSize: '0.875rem'}}>{selected.name}</p>
                       <div style={{textAlign: 'center'}}>
                           <img 
                                src={votes.upvotes === votes.downvotes ? "/DoNotKnowGunPolicy.svg" : (votes.upvotes > votes.downvotes ? "/YesGunPolicy.svg" : "/NoGunPolicy.svg")} 
                                alt="vote result" 
                                style={{ width: '75px', height: '75px' }}
                            />
                       </div>
                       <p style={{textAlign: 'center', fontWeight: 'bold', fontSize: '0.875rem'}}>Gun Policy <em>Not Verified</em></p>
                       <p style={{fontSize: '0.875rem'}}>Let others know the gun policy – what's your observation?</p>
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
                           </div>
                       </div>
                       <div style={{ marginTop: '20px' }}>
                           <a href="/BusinessVerification" style={{ fontSize: '0.875rem', color: 'blue', textDecoration: 'none', paddingTop: '10px' }}>
                               Is this your business?
                           </a>
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

