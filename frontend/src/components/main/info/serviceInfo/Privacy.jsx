import React, { useEffect } from "react";

function Privacy() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="info">
      <h2>Privacy Policy</h2>
      <div className="line"></div>

      <h3>1. Introduction</h3>
      <p>
        [Your Company Name] ("we," "us," or "our") operates the [Your Website Name] website (the "Site"). This page informs you of our policies regarding the collection, use, and disclosure of personal data when you use our Site and the choices you have associated with that data.
      </p>

      <h3>2. Information We Collect</h3>
      <h4>2.1 Personal Data</h4>
      <p>
        We collect personal data that you voluntarily provide to us when you use our Site, such as:
      </p>
      <ul>
        <li>Name</li>
        <li>Email address</li>
        <li>Password</li>
        <li>Contact information (phone number, address)</li>
        <li>Billing information (if applicable)</li>
        <li>Other information you choose to provide</li>
      </ul>

      <h4>2.2 Usage Data</h4>
      <p>
        We also collect usage data that your browser or device automatically transmits to us when you visit our Site, such as:
      </p>
      <ul>
        <li>IP address</li>
        <li>Browser type</li>
        <li>Device type</li>
        <li>Operating system</li>
        <li>Pages visited</li>
        <li>Links clicked</li>
        <li>Date and time of access</li>
      </ul>

      <h3>3. How We Use Your Data</h3>
      <p>
        We use your personal data for the following purposes:
      </p>
      <ul>
        <li>To provide and operate the Site</li>
        <li>To create your account and manage your profile</li>
        <li>To process your transactions (if applicable)</li>
        <li>To communicate with you about the Site and our services</li>
        <li>To personalize your experience on the Site</li>
        <li>To improve the Site and our services</li>
        <li>To protect the Site and our users</li>
        <li>To comply with legal obligations</li>
      </ul>

      <h3>4. Data Sharing</h3>
      <p>
        We may share your personal data with:
      </p>
      <ul>
        <li>Service providers who help us operate the Site and provide services to you</li>
        <li>Business partners who offer complementary products or services</li>
        <li>Legal authorities or government agencies if required by law or regulation</li>
      </ul>

      <h3>5. Cookies</h3>
      <p>
        Our Site uses cookies to enhance your browsing experience. Cookies are small text files that websites store on your computer or mobile device to identify your browser and remember your preferences. You can choose to accept or decline cookies through your browser settings. If you decline cookies, you may not be able to use certain features of the Site.
      </p>

      <h3>6. Data Security</h3>
      <p>
        We use appropriate technical and organizational measures to protect your personal data from unauthorized access, disclosure, alteration, or destruction. However, no website or online service can guarantee 100% security.
      </p>

      <h3>7. Your Rights</h3>
      <p>
        You have the right to access, rectify, erase, restrict, and object to the processing of your personal data. You can exercise these rights by contacting us using the information below.
      </p>

      <h3>8. Children's Privacy</h3>
      <p>
        Our Site is not intended for children under the age of [Your Age Limit]. We do not knowingly collect personal data from children under the age of [Your Age Limit]. If you are a parent or guardian and you are aware that your child has provided us with personal data, please contact us.
      </p>

      <h3>9. Changes to This Policy</h3>
      <p>
        We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on the Site. You are advised to review this Privacy Policy periodically for any changes.
      </p>

      <h3>10. Contact Us</h3>
      <p>
        If you have any questions about this Privacy Policy, please contact us:
        <br/>
        By email: [Your Email Address]
        <br/>
        By phone: [Your Phone Number]
      </p>

    </div>
  );
}

export default React.memo(Privacy);