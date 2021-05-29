import React from "react";
import "./styles.scss";

function PrivacyPolicy() {
  return (
    <div className="privacy-policy-container">
      <div className="policy-section">
        <h2 className="policy-title">Privacy Policy</h2>
        <div className="privacy-details">
          <p>
            NavGurukul Foundation for Social Welfare built the Meraki app as an
            Open Source app. This SERVICE is provided by NavGurukul Foundation
            for Social Welfare at no cost and is intended for use as is.
          </p>
          <p>
            This page is used to inform visitors regarding our policies with the
            collection, use, and disclosure of Personal Information if anyone
            decided to use our Service. If you choose to use our Service, then
            you agree to the collection and use of information in relation to
            this policy. The Personal Information that we collect is used for
            providing and improving the Service. We will not use or share your
            information with anyone except as described in this Privacy Policy.
          </p>
          <p>
            The terms used in this Privacy Policy have the same meanings as in
            our Terms and Conditions, which is accessible at Meraki unless
            otherwise defined in this Privacy Policy.
          </p>
        </div>

        <div className="privacy-details">
          <h2 className="heading">Information Collection and Use</h2>
          <p>
            For a better experience, while using our Service, we may require you
            to provide us with certain personally identifiable information,
            including but not limited to Email address, Name, Profile Picture
            link, Google User ID. The information that we request will be
            retained by us and used as described in this privacy policy.
          </p>
          <p>
            The app does use third party services that may collect information
            used to identify you. Link to privacy policy of third party service
            providers used by the app
            <ul className="privacy-google-link">
              <li>
                <a
                  href="https://www.google.com/policies/privacy/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {" "}
                  Google Play Services
                </a>
              </li>
              <li>
                <a
                  href="https://firebase.google.com/policies/analytics"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {" "}
                  Google Analytics for Firebase
                </a>
              </li>
            </ul>
          </p>
        </div>
        <div>
          <h2 className="heading"> Log Data</h2>
          <p className="privacy-details">
            We want to inform you that whenever you use our Service, in the case
            of an error in the app we collect data and information (through
            third party products) on your phone called Log Data. This Log Data
            may include information such as your device Internet Protocol (“IP”)
            address, device name, operating system version, the configuration of
            the app when utilizing our Service, the time and date of your use of
            the Service, and other statistics.
          </p>
        </div>
        <div>
          <h2 className="heading"> Cookies</h2>
          <p className="privacy-details">
            Cookies are files with a small amount of data that are commonly used
            as anonymous unique identifiers. These are sent to your browser from
            the websites that you visit and are stored on your devices internal
            memory.
          </p>
          <p className="privacy-details">
            This Service does not use these “cookies” explicitly. However, the
            app may use third party code and libraries that use “cookies” to
            collect information and improve their services. You have the option
            to either accept or refuse these cookies and know when a cookie is
            being sent to your device. If you choose to refuse our cookies, you
            may not be able to use some portions of this Service.
          </p>
        </div>
        <div>
          <h2 className="heading"> Service Providers</h2>
          <p className="privacy-details">
            We may employ third-party companies and individuals due to the
            following reasons:-
            <ul>
              <li>To facilitate our Service</li>
              <li>To provide the Service on our behalf</li>
              <li>To perform Service-related services</li>
              <li>To assist us in analyzing how our Service is used.</li>
            </ul>
          </p>
          <p className="privacy-details">
            We want to inform users of this Service that these third parties
            have access to your Personal Information. The reason is to perform
            the tasks assigned to them on our behalf. However, they are
            obligated not to disclose or use the information for any other
            purpose.
          </p>
        </div>

        <div>
          <h2 className="heading"> Security</h2>
          <p className="privacy-details">
            We value your trust in providing us your Personal Information, thus
            we are striving to use commercially acceptable means of protecting
            it. But remember that no method of transmission over the internet,
            or method of electronic storage is 100% secure and reliable, and we
            cannot guarantee its absolute security.
          </p>
        </div>
        <div>
          <h2 className="heading">Links to Other Sites</h2>
          <p className="privacy-details">
            This Service may contain links to other sites. If you click on a
            third-party link, you will be directed to that site. Note that these
            external sites are not operated by us. Therefore, we strongly advise
            you to review the Privacy Policy of these websites. We have no
            control over and assume no responsibility for the content, privacy
            policies, or practices of any third-party sites or services.
          </p>
        </div>
        <div>
          <h2 className="heading">Children’s Privacy</h2>
          <p className="privacy-details">
            These Services do not address anyone under the age of 13. We do not
            knowingly collect personally identifiable information from children
            under 13 years of age. In the case we discover that a child under 13
            has provided us with personal information, we immediately delete
            this from our servers. If you are a parent or guardian and you are
            aware that your child has provided us with personal information,
            please contact us so that we will be able to do necessary actions.
          </p>
        </div>
        <div>
          <h2 className="heading">Changes to This Privacy Policy</h2>
          <p className="privacy-details">
            We may update our Privacy Policy from time to time. Thus, you are
            advised to review this page periodically for any changes. We will
            notify you of any changes by posting the new Privacy Policy on this
            page. This policy is effective as of 2020-12-01
          </p>
        </div>
        <div>
          <h2 className="heading">Contact Us</h2>
          <p className="privacy-details">
            If you have any questions or suggestions about our Privacy Policy,
            do not hesitate to contact us at <b>hi@merakilearn.org.</b>
          </p>
        </div>
      </div>
    </div>
  );
}

export default PrivacyPolicy;
