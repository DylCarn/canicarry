import React, { useState, useRef} from 'react';
import { GoogleMap, MarkerF, LoadScript, InfoWindowF, Autocomplete } from '@react-google-maps/api';
import '../App.css';
//npm i @react-google-maps/api

const Main = () => {
    const [selected, setSelected] = useState({});
    const [searchResult, setSearchResult] = useState('')

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
            location: {
                lat: 38.8807794,
                lng: -94.813
            },
            location: {
                lat: 38.8807794,
                lng: -94.81837
            },
            location: {
                lat: 38.8807794,
                lng: -94.81837
            },
        }
    ];


    //function executes on page load
    function onLoad(autocomplete) {
        //on load we are setting searchResult to the autocomplete object
        setSearchResult(autocomplete);
    };

    //function executes on autocomplter place change
    function onPlaceChanged() {
        //declare variables
        let isInvalidType = false;
        let gptResponse = "Yes.";
        //check searchResult object 
        if (searchResult != null) {
            //wrapping this in a try catch block, so if we hit enter twice we will catch the exception, log a message to console for now and do nothing.
            try {
                //variable to store the result
                const place = searchResult.getPlace();
                console.log("Places Reply");
                console.log(place);
                console.log("End Places Reply");
                console.log("Start Loop")
                //loop over json reply to see if political is included among others, if so, set isValidType to true
                //we can make this a new method thats reusable in a utils file, pass it a list, and a list of words we want to exclude for reusability/expandability
                for (var i = 0; i < place.types.length; i++) {
                    console.log(place.types[i]);
                    if (place.types[i].includes('political') || place.types[i].includes('street_address') || place.types[i].includes('premise') || place.types[i].includes('route')) {
                        isInvalidType = true;
                        break;
                    }
                }
                console.log("End Loop")
                //if we found a political entity do something here
                if (isInvalidType) {
                    alert(`Value of isInvalidType was ${isInvalidType}`);
                }
                //otherwise continue
                else {
                    /*call chat gpt --- this will be its own method in a helper file we can re use later it will accept a string parameter and return a true - yes, false - no, unclutters main.js*/

                    //check chat GPT response, if it was yes do the marker move thing and stuff, hard setting to Yes. for testing.
                    if (gptResponse === "Yes.") {
                        //variable to store the name from place details result
                        const name = place.name;
                        //variable to store the status from place details result
                        const status = place.business_status;
                        //variable to store the formatted address from place details result
                        const formattedAddress = place.formatted_address;
                        // console.log(place);
                        //console log all results
                        console.log(`GPT said yes: ${gptResponse}`);
                        console.log(`Name: ${name}`);
                        console.log(`Business Status: ${status}`);
                        console.log(`Formatted Address: ${formattedAddress}`);
                    }
                    //if gpt said no, do something here to indiciate its not a valid business
                    else {
                        alert("GPT say no.")
                    }
                }
            }
            catch (ex) {
                console.log("Someone hit enter twice");
                console.log(`Error Message: ${ex.message}`)
            }
        }
        else {
            alert("Please enter text");
        }
    };

    const [votes, setVotes] = useState({ upvotes: 0, downvotes: 0 });
    const [voteStatus, setVoteStatus] = useState(null); // 'upvote', 'downvote', or null
    const autocompleteInputRef = useRef(null);
    
    function handleVote(voteType) {
        setVoteStatus(prevVoteStatus => {
            setVotes(prevVotes => {
                let newVotes = { ...prevVotes };
                if (prevVoteStatus) {
                    newVotes[prevVoteStatus]--;
                }
                if (prevVoteStatus !== voteType) {
                    newVotes[voteType]++;
                }
                return newVotes;
            });
            return prevVoteStatus === voteType ? null : voteType;
        });
    }

    return (
        //you must include the places library
        <LoadScript libraries={["places"]} googleMapsApiKey='AIzaSyAv29PAQvGNkPFgSrtYSQmCV1p-aac44iw'>
            <div className='row text-center pt-2'>
            <h4>Search A Business</h4>
            </div>
            <div className="row text-center justify-content-center pb-2">
            <div className="col-md-6 col-lg-6 col-sm-4">
                    <Autocomplete onPlaceChanged={onPlaceChanged} onLoad={onLoad}>
                        <input
                            type="text"
                            placeholder="Search... "
                            style={{
                                boxSizing: `border-box`,
                                border: `1px solid transparent`,
                                width: `240px`,
                                height: `32px`,
                                padding: `0 12px`,
                                borderRadius: `3px`,
                                boxShadow: `0 2px 6px rgba(0, 0, 0, 0.3)`,
                                fontSize: `14px`,
                                outline: `none`,
                                textOverflow: `ellipses`
                            }}
                        />
                    </Autocomplete>
                </div>
            </div>
            <GoogleMap zoom={15} 
            center={defaultCenter} 
            mapContainerStyle={mapStyles}
            options={{
                disableDefaultUI: true,
                mapTypeControl: false,
                styles: [
                    {
                        featureType: "poi.business",
                        elementType: "labels",
                        stylers: [{ visibility: "off" }],
                    },
                ],
            }}>
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
                                                 className={`btn btn-sm ${voteStatus === 'downvote' ? 'btn-secondary' : ''}`} 
                                                 style={{backgroundColor: voteStatus === 'downvote' ? 'grey' : '#BE2035', color: 'white'}}
                                                 onClick={() => handleVote('downvote')}
                                             >
                                                 <i className="fa fa-thumbs-down"></i> No
                                             </button>
                                             <span style={{fontWeight: 'bold', color: '#BE2035'}}>{votes.downvotes}</span>
                                         </div>
                                        </div>
                                        <div style={{ marginTop: '20px' }}>
                                            <a href="/BusinessVerification" style={{ fontSize: '0.875rem', color: '#0B2565', textDecoration: 'none', paddingTop: '10px' }}>
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