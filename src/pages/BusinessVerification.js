import React from 'react';
import { useNavigate } from 'react-router-dom';

function BusinessVerification() {
    const navigate = useNavigate();

    return (
        <div className="container">
            <h1>Legal Compliance and Terms</h1>

            <h2>Legal Disclaimer</h2>
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
                <h1 className="my-4">Business Verification Process</h1>

                <h3 className="my-3">Business Information</h3>
                <form>
                    <div className="mb-3">
                        <input className="form-control" placeholder="Business Name" />
                    </div>
                    <div className="mb-3">
                        <input className="form-control" placeholder="Address" />
                    </div>
                </form>

                <h3>Ownership Verification</h3>
                <p>Steps for verifying the person registering is the legitimate owner or representative of the business. This might include submitting business registration documents or other official verification methods.</p>

                <h3>Instructions for Verification</h3>
                <p>Clear instructions on how to submit verification documents or information.</p>

                <h1>Gun Policy Submission</h1>

                <h3>Policy Details</h3>
                <form>
                    <div className="mb-3">
                        <select className="form-control">
                            <option value="">--Select Policy</option>
                            <option value="can_carry">Can Carry</option>
                            <option value="cannot_carry">Cannot Carry</option>
                        </select>
                    </div>
                    {/* Add more fields as needed */}
                </form>
       
        </div>
    );
}

export default BusinessVerification;