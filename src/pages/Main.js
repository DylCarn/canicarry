import React, { useState, useRef } from 'react';
import { GoogleMap, MarkerF, InfoWindowF, Autocomplete, useLoadScript } from '@react-google-maps/api';
import { googleMapsLibrary } from '../constants/constantvariables';
import axios from 'axios';
import { ValidateList } from '../helpers/validators';
import { apiKey, excludeList } from '../constants/constantvariables';
import { Container, Navbar } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
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



            {/*Component*/}
            <div className='container-fluid bg-dark pb-4'>
            <div className='row text-center pt-2 text-light'>
                <h4>Search A Business</h4>
            </div>
            <Container>
                <Navbar expand="lg" className="bg-dark" sticky='bottom'>
                    <Container className='justify-content-center'>
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
                                textOverflow: `ellipses`,
                            }}
                        />
                    </Autocomplete>
                    </Container>
                    </Navbar>
            </Container>
            </div>

            
        </Container>

    );
};

export default Main;