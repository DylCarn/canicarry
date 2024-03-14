import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axiosBaseURL from '../http';

const Disclaimer = () => {
  const [disclaimerData, setDisclaimerData] = useState();
  const [disclaimerOBJ, setDisclaimerOBJ] = useState();
  const [listItems, setListItems] = useState();
  const smallText = { fontSize: '0.8em' }; // Adjust the size as needed

  useEffect(() => {
    axiosBaseURL.get("/disclaimer_api/last_disclaimer/", {
      headers: {
        'Content-Type': 'application/json',
      },
    }).then((response) => {
      console.log(response)

      setDisclaimerData(response)
      ParseDisclaimer(response.data.description)

    }).catch(function (error) {
      console.log(error)
    });
  }, []);

  function ParseDisclaimer(response) {
    console.log('Here')
    let disclaimerOBJ = {}
    let header = ""
    let listItems = []
    if (typeof (response) == 'string') {
      //console.log('silly string time')
      const disclaimerArray = response.split("\\n")
      //console.log(disclaimerArray)
      for (var i = 0; i < disclaimerArray.length; i++) {
        if (header == "") {
          if (!isNaN(disclaimerArray[i].trim().charAt(0))) {
            header = disclaimerArray[i]
            disclaimerOBJ[header] = ""
            console.log(disclaimerArray[i])
          }
          if (disclaimerArray[i].trim().includes("<li>")) {
            listItems.push(disclaimerArray[i].trim().replace("<li>", ""))
            header = ""
          }
        }
        else {
          disclaimerOBJ[header] = disclaimerArray[i]
          header = ""
        }
      }
    }
    else {
      setDisclaimerOBJ('sorry silly')
    }
    console.log(disclaimerOBJ)
    setDisclaimerOBJ(disclaimerOBJ)
    setListItems(listItems)
    console.log(listItems)
  }

  if (!disclaimerData && !disclaimerOBJ && !listItems) {
    return (<div>She Broke</div>)
  }

  return (
    <div className="container mt-5" style={smallText}>
      <div className="row justify-content-center">
        <div className="col-md-8">
          <h2 className="mb-4 text-center">"Can I Carry?" App Disclaimer</h2>
          <p>Last Updated: {disclaimerData.data.published_date}</p>
          <p>
            Please carefully review this disclaimer before using the "Can I Carry?" mobile application (the "App"). By accessing or using the App, you acknowledge and agree to the terms and conditions outlined in this disclaimer.
          </p>

          {Object.keys(disclaimerOBJ).map(key =>
            <div>
              <h3 key={key}>{key}</h3>
              <p>{disclaimerOBJ[key]}</p>
              {disclaimerOBJ[key].includes("businesses acknowledge and consent to the following: ") &&
                <ul>{listItems.map(item => <li>{item}</li>)}</ul>
              }
            </div>
          )}

          <p>
            We reserve the right to update or modify this disclaimer at any time without prior notice. Any changes will be effective immediately upon posting on the app. Users are encouraged to review this disclaimer regularly for updates.
          </p>
          <div className="mb-3">
            <Link to="/main" className="btn btn-primary w-100" style={{ backgroundColor: '#BE2035', color: 'white' }}>
              Agree
            </Link>
          </div>
          <div className="mb-3">
            <button className="btn btn-secondary w-100" onClick={(e) => e.preventDefault()}>
              Disagree
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Disclaimer;
