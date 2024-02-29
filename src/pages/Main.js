import React, { useState, useRef } from 'react';
import { GoogleMap, MarkerF, InfoWindowF, Autocomplete, useLoadScript } from '@react-google-maps/api';
import '../App.css';
import {googleMapsLibrary, gunIcon} from '../constants/constantvariables';
import axios from 'axios';
import ReturnMarkerGunIcon from '../components/markers/GunPolicyMarker'
import { Button } from 'react-bootstrap';
//npm i @react-google-maps/api

const Main = () => {
    //This is  voting logic that will be calling to the backend to store the vote
    const gptAnswer = useRef("Yes.")
    const [selected, setSelected] = useState({});
    const [searchResult, setSearchResult] = useState('');
    const [PlaceReply, setPlaceReply] = useState({});
    const [defaultCenter, setDefaultCenter] = useState({ lat: 38.8807794, lng: -94.81837 }); //defaultCenter will be locationservices location
    const { isLoaded } = useLoadScript({
        googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
        libraries: googleMapsLibrary
    });
    const [isUpvoteSelected, setUpvoteSelected] = useState(false);
    const [isDownvoteSelected, setDownvoteSelected] = useState(false);
    
    
    const onSelect = item => {
        setSelected(item);
    }


    const mapStyles = {
        height: "720px",
        width: "100%"
    };

    //function executes on page load
    function onLoad(autocomplete) {
        setSearchResult(autocomplete);
    };

    const onSelect = item => {
        setSelected(item);
    }

    const GetGPTAnswer = async (name) => {
        let data = JSON.stringify({
            "model": "gpt-3.5-turbo",
            "messages": [
                {
                    "role": "system",
                    "content": "Answer yes or no only. If the user's content is a bank, school, or government building",
                },
                {
                    "role": "user",
                    "content": name,
                }
            ],
            "max_tokens": 74,
            "temperature": 0
        });

        let config = {
            method: 'post',
            maxBodyLength: Infinity,
            url: 'https://api.openai.com/v1/chat/completions',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${apiKey}`,
            },
            data: data
        };

        await axios.request(config)
            .then((response) => {
                gptAnswer.current = response.data.choices[0].message.content
            })
            .catch((error) => {
                console.log(error);
            });
    }

    const onPlaceChanged = async () => {
        console.log(searchResult)
        if (searchResult != null) {
            try {
                const place = searchResult.getPlace();
                if (!ValidateList(place.types, excludeList)) {
                    alert("Invalid Location");
                }
                else {
                    await GetGPTAnswer(place.name);
                    if (gptAnswer.current === "No") {
                        setPlaceReply({ name: place.name, location: { lat: place.geometry.location.lat(), lng: place.geometry.location.lng() } });
                        setDefaultCenter({ lat: place.geometry.location.lat(), lng: place.geometry.location.lng() });
                    }
                    else {
                        alert("Invalid Location");
                    }
                }
            }
            catch (ex) {
                console.log(`Error Message: ${ex.message}`)
            }
        }
        else {
            alert("Please enter text");
        }
    };

    if (!isLoaded) return <div>Loading...</div>;
    return (
        <Container fluid="true">

            
            <Container fluid="true" style={{paddingTop:"5px", paddingBottom:"5px"}}>
            <GoogleMap
                
                zoom={15}
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
                <MarkerF
                    icon={{ url: "/MarkerFLogo.png", scaledSize: new window.google.maps.Size(40, 40) }}
                    key={PlaceReply.name}
                    position={PlaceReply.location}
                    title="This was dumb"
                    onClick={() => onSelect(PlaceReply)}>
                    {
                        selected.location &&
                        (
                            <InfoWindowF
                                position={selected.location}
                                clickable={true}
                                onCloseClick={() => setSelected({})}
                            >
                                <div>
                                    <h2>{selected.name}</h2>
                                </div>
                            </InfoWindowF>
                        )
                    }
                </MarkerF>
            </GoogleMap>
            </Container>

if (!isLoaded) return <img className="Center" src="CanICarryLogo.png" alt="Loading..." />;

    return (
       <div>
            <div className='text-center pt-2'>
            <h4>Search A Business</h4>
            </div>
            <div className="Center row pb-2">
            <div className="col-md-6 col-lg-6 col-sm-4">
                    <Autocomplete onPlaceChanged={onPlaceChanged} onLoad={onLoad}>
                        <input className="AutoSuggest"
                            type="text"
                            placeholder="Search... "
                        />
                    </Autocomplete>
                    </Container>
                    </Navbar>
            </Container>
            </div>

           
            <GoogleMap 
            zoom={15} 
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
                
                <MarkerF
                    icon={{ url: gunIcon['no'] }}
                    key={PlaceReply.name}
                    position={PlaceReply.location}
                    title="This was dumb"
                    onClick={() => onSelect(PlaceReply)}
                />
                
                {
                    selected.location &&
                    (
                        <InfoWindowF
                        position={selected.location}
                        clickable={true}
                        onCloseClick={() => setSelected({})}
                    >
                                    <div>
                                        <p className = 'InfoWindowText Business'>{selected.name}</p>
                                        <p className = 'InfoWindowText'>Vote to let others know the policy – what's your observation?</p>
                                        <div className="Center">
                                            <Button className='buttonClass'>
                                                <img className="Icon" src={isUpvoteSelected ? "YesGunVoteSelect.svg" : "YesGunVote.svg"} alt="Yes Gun"/> 
                                            </Button>
                                            <span className='YesText'>{votes.upvotes}</span>
                                        </div>
                                        <div className="Center">
                                            <Button className='buttonClass'>
                                                <img className="Icon"src={isDownvoteSelected ? "NoGunVoteSelect.svg" : "NoGunVote.svg"} alt="No Gun"/> 
                                            </Button>
                                            <span className='NoText'>{votes.downvotes}</span>
                                        </div>
                                        <p className="InfoWindowText"style={{textAlign: 'center', fontWeight: 'bold'}}> Policy <em>Not Verified</em></p>
                                        <div style={{ marginTop: '20px' }}>
                                            <a href="/BusinessVerification" className ="InfoWindowText BusinessVerify">
                                                Is this your business?
                                            </a>
                                        </div>
                                        </div>
                                </InfoWindowF>
                    )
                }
            </GoogleMap>
    </div>
        
    );
};

export default Main;