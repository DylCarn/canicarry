import React, { useState, useRef, useEffect } from 'react';
import { GoogleMap, LoadScript, MarkerF, InfoWindowF } from '@react-google-maps/api';
import '../App.css';

const Main = () => {
    const [votes, setVotes] = useState({ upvotes: 0, downvotes: 0 });
    const [voteStatus, setVoteStatus] = useState(null); // 'upvote', 'downvote', or null
    const autocompleteInputRef = useRef(null);
    function handleVote(voteType) {
        setVoteStatus(prevVoteStatus => {
            if (prevVoteStatus === voteType) {
                setVotes(prevVotes => ({
                    ...prevVotes,
                    [voteType]: prevVotes[voteType] - 1
                }));
                return null;
            } else {
                setVotes(prevVotes => {
                    if (prevVoteStatus === 'upvote') {
                        return { ...prevVotes, upvotes: prevVotes.upvotes - 1, downvotes: prevVotes.downvotes + 1 };
                    } else if (prevVoteStatus === 'downvote') {
                        return { ...prevVotes, upvotes: prevVotes.upvotes + 1, downvotes: prevVotes.downvotes - 1 };
                    } else {
                        return { ...prevVotes, [voteType]: prevVotes[voteType] + 1 };
                    }
                });
                return voteType;
            }
        });
    }

    const [selected, setSelected] = useState({});
   
    const onSelect = item => {
        setSelected(item);
        setCenter(item.location); // Update the center of the map to the selected location
        setVoteStatus(null); // Reset vote status when selecting a new location
    };

    const mapStyles = {
        height: "100vh",
        width: "100%"
    };

    const defaultCenter = {
        lat: 38.8807794, lng: -94.81837
    };

    const [center, setCenter] = useState(defaultCenter); // New state variable

    const [locations, setLocations] = useState([
        {
            name: "Panera",
            location: {
                lat: 38.8807794,
                lng: -94.81837
            },
        }
    ]);

   
    useEffect(() => {
        function initAutocomplete() {
            if (autocompleteInputRef.current) {
                const autocomplete = new window.google.maps.places.Autocomplete(autocompleteInputRef.current);
    
                autocomplete.addListener("place_changed", () => {
                    const place = autocomplete.getPlace();
                    const newLocation = {
                        name: place.name,
                        location: {
                            lat: place.geometry.location.lat(),
                            lng: place.geometry.location.lng(),
                        },
                    };
    
                    setLocations(prevLocations => [...prevLocations, newLocation]); // Add the new location to the existing locations
                    setCenter(newLocation.location); // Update the center of the map
                });
            }
        }
    
        if (window.google && window.google.maps) {
            initAutocomplete();
        } else {
            const checkExist = setInterval(() => {
                if (window.google && window.google.maps) {
                    initAutocomplete();
                    clearInterval(checkExist);
                }
            }, 100);
        }
    }, []);

return (
    <LoadScript
        googleMapsApiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY}
        libraries={["places"]}
    >
        <div style={{ position: 'fixed', top: 0, width: '100%', zIndex: 1 }}>
            <input ref={autocompleteInputRef} type="text" placeholder="Search Business Places" />
        </div>
        <GoogleMap
            zoom={15}
            center={center} // Use the new state variable here
            mapContainerStyle={mapStyles}
            options={{
                disableDefaultUI: true,
                mapTypeControl: false,
            }}
        >
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

