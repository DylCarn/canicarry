import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function BusinessVerification() {
    const navigate = useNavigate();
    const [businessName, setBusinessName] = useState('');
    const [address, setAddress] = useState('');
    // Assuming you'll handle the file state and policy selection similarly

    // Example file change handler (for one file, expand as needed)
    const handleFileChange = (event) => {
        // Handle file upload state here
        console.log(event.target.files[0]);
    };

    // Simplify complex sections, potentially moving to a separate document or modal
    const renderLegalDisclaimer = () => (
        <div>
            <h2>Legal Compliance and Terms</h2>
<h4>Compliance with Laws</h4>
<p> As a business owner using the "Can I Carry?" app, you are solely responsible for ensuring that your declared gun policy is in full compliance with all applicable local, state, and federal laws and regulations. The information you provide regarding your gun policy does not exempt you from adhering to legal standards and requirements.</p>
<h4>Accuracy of Information</h4>
<p>You are also responsible for the accuracy and timeliness of the information you provide. The "Can I Carry?" app is not liable for any inaccuracies in the gun policy information posted by businesses.</p>
<h4>Changes in Law</h4>
<p>Laws and regulations regarding firearms are subject to change. It is your responsibility to stay informed about such changes and update your policy on the app accordingly.</p>
<h4>No Legal Advice</h4>
<p>The "Can I Carry?" app does not provide legal advice. If you are unsure about the legal implications of your gun policy, we strongly recommend consulting with a qualified legal professional.</p>

<h2>Terms of Use</h2>

    <h4>Acceptance of Terms</h4>
    <p>By verifying your business and its gun policy on the "Can I Carry?" app, you agree to abide by these Terms of Use and any amendments thereto.</p>

    <h4>Policy Verification</h4>
    <p>You agree to provide true, accurate, current, and complete information about your business's gun policy. Once verified, you must promptly update your policy information should any changes occur.</p>

    <h4>User Interaction</h4>
    <p>You understand that your policy information will be publicly accessible and may be subject to user interactions, such as comments and ratings. The "Can I Carry?" app is not responsible for these user interactions.</p>

    <h4>Indemnification</h4>
    <p>You agree to indemnify and hold harmless the "Can I Carry?" app, its affiliates, officers, agents, and employees from any claim or demand made by any third party due to or arising out of your use of the app, your violation of these Terms of Use, or your violation of any rights of another.</p>

    <h4>Limitation of Liability</h4>
    <p>The "Can I Carry?" app shall not be liable for any direct, indirect, incidental, special, consequential, or exemplary damages, including but not limited to, damages for loss of profits, goodwill, use, data, or other intangible losses resulting from the use of or inability to use the service.</p>

    <h4>Modification of Terms</h4>
    <p>We reserve the right to modify these Terms of Use at any time. Your continued use of the app following any such modification constitutes your acceptance of the new Terms.</p>

    <h4>Termination</h4>
    <p>We reserve the right to terminate your access to the app for any breach of these Terms of Use.</p>

    <h4>Governing Law</h4>
    <p>These Terms of Use and your use of the app are governed by and construed in accordance with the laws of the jurisdiction where the app is based, without regard to its conflict of law provisions.</p>
        </div>
    );

    const handleSubmit = (event) => {
        event.preventDefault();
        // Submit logic here
        alert('Form submitted. Implement actual submission logic.');
        // navigate('/some-path'); // Redirect or handle the next step
    };

    return ( 
        <div className="container">
            {renderLegalDisclaimer()}
            <h2>Business Verification</h2>
            
            <section className="my-4">
                <h3>Verification Steps</h3>
                <ul>
                    <li>Upload Your Business Registration Certificate: To verify your status as a business owner, please upload only your Business Registration Certificate. This document is issued by the governmental authority where your business is registered and serves as unequivocal proof of your legal business ownership.</li>
                    <li>Ensure Documents Are Readable: Make sure that the uploaded document is clear and legible. Poor quality uploads may delay the verification process.</li>
                    <li>Use Current, Valid Documents: The Business Registration Certificate must be up-to-date and valid, reflecting the current status and details of your business.</li>
                    <li>Upload in PDF, JPEG, or PNG Format: Acceptable file formats include PDF, JPEG, or PNG. This ensures compatibility and readability of the documents submitted for verification.</li>
                    <li>Max Size: 5MB per File: Ensure that the file size does not exceed 5MB to comply with our upload guidelines.</li>
                    <li>Cover Sensitive Information Not Needed for Verification: If your Business Registration Certificate contains sensitive information not relevant to the verification process, please obscure or cover these details before uploading.</li>
               </ul>
            </section>
            
            <form onSubmit={handleSubmit}>
                <div className="row">
                    <div className="col-md-6 mb-3">
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Business Name"
                            value={businessName}
                            onChange={e => setBusinessName(e.target.value)}
                        />
                    </div>
                    <div className="col-md-6 mb-3">
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Address"
                            value={address}
                            onChange={e => setAddress(e.target.value)}
                        />
                    </div>
                    <div className="col-md-6 mb-3">
                        <input
                            type="file"
                            className="form-control"
                            onChange={handleFileChange}
                        />
                        {/* Assume similar input for proof of identity, etc. */}
                    </div>
                </div>

                <div className="mb-3 text-center">
                    <button type="submit" className="btn btn-primary">Submit for Verification</button>
                </div>
            </form>

 
        </div>
    );
}

export default BusinessVerification;
