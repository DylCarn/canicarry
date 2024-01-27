import React from 'react';
import { Link } from 'react-router-dom';

const Disclaimer = () => {
  return (
 <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-8">
          <h2 className="mb-4 text-center">"Can I Carry?" App Disclaimer</h2>
          <p>Last Updated: [1-27-2024]</p>
          <p>
            Please carefully review this disclaimer before using the "Can I Carry?" mobile application (the "App"). By accessing or using the App, you acknowledge and agree to the terms and conditions outlined in this disclaimer.
          </p>
          <h3>1. General Information:</h3>
          <p>
            The "Can I Carry?" app is designed to provide users with information about businesses' firearm-carry policies based on user-generated ratings and votes. It is intended for informational purposes only and should not be considered legal advice. The app does not provide legal opinions or endorsements of businesses.
          </p>
          <h3>2. Accuracy and Reliability:</h3>
          <p>
            While we strive to maintain accurate and up-to-date information, the app's content may change without notice. Users should independently verify the accuracy of the information provided and exercise caution when relying on it. The app is not responsible for any inaccuracies or omissions.
          </p>
          <h3>3. User-Generated Content:</h3>
          <p>
            The app allows users to submit ratings and votes regarding businesses' firearm-carry policies. We do not endorse or validate the accuracy of user-generated content. Users are solely responsible for their contributions and should use the app responsibly and respectfully.
          </p>
          <h3>4. No Legal Advice:</h3>
          <p>
            The information provided by the app does not constitute legal advice. Users should consult legal professionals or local authorities to understand applicable laws and regulations regarding firearm possession and carrying in their jurisdiction.
          </p>
          <h3>5. Business Acknowledgment and Consent:</h3>
          <p>
            By using the "Can I Carry?" app, businesses acknowledge and consent to the following:
          </p>
          <ul>
            <li>The app may display user-generated ratings and votes regarding their firearm-carry policies.</li>
            <li>The app does not represent their businesses' official positions or endorsements.</li>
            <li>Any disputes or concerns related to user-generated content should be directed to the app's administrators at [Contact Email Address].</li>
            <li>The app reserves the right to remove, modify, or moderate user-generated content as needed.</li>
          </ul>
          <h3>6. Limitation of Liability:</h3>
          <p>
            The developers of the "Can I Carry?" app, including their officers, employees, and affiliates, shall not be liable for any direct, indirect, incidental, special, consequential, or punitive damages arising out of or in any way connected with the use of the app. This includes but is not limited to business decisions, actions, or inactions taken based on information obtained through the app.
          </p>
          <h3>7. Privacy and Data:</h3>
          <p>
            The app may collect and store user data for the purpose of providing its services. We are committed to protecting user privacy and will not share personal information with third parties without user consent. Please review our Privacy Policy for more details.
          </p>
          <h3>8. App Updates:</h3>
          <p>
            We may periodically update the app to improve functionality, accuracy, or security. Users are encouraged to use the latest version of the app to access the most current information.
          </p>
          <h3>9. User Agreement:</h3>
          <p>
            By using the "Can I Carry?" app, you agree to the terms and conditions outlined in this disclaimer. If you do not agree with any part of this disclaimer, please discontinue use of the app.
          </p>
          <h3>10. Contact Information:</h3>
          <p>
            If you have any questions or concerns regarding this disclaimer or the "Can I Carry?" app, please contact us at [Contact Email Address].
          </p>
          <h3>11. Jurisdiction:</h3>
          <p>
            This disclaimer shall be governed by and construed in accordance with the laws of your Jurisdiction, and any disputes relating to this disclaimer shall be subject to the exclusive jurisdiction of the courts of your Jurisdiction.
          </p>
          <h3>12. Changes to Disclaimer:</h3>
          <p>
            We reserve the right to update or modify this disclaimer at any time without prior notice. Any changes will be effective immediately upon posting on the app. Users are encouraged to review this disclaimer regularly for updates.
          </p>
          <div className="mb-3">
          <Link to="/main" className="btn btn-primary w-100">
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
