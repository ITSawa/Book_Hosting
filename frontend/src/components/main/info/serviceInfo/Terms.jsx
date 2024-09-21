import React, { useEffect } from "react";

function Terms() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="info">
      <h2>Terms of Service</h2>
      <div className="line"></div>

      <h3>1. Introduction</h3>
      <p>
        Welcome to [Your Company Name]'s website! These Terms of Service ("Terms") govern your access to and use of our website, including all information, tools, and services available from this website (the "Service"). 
      </p>
      <p>
        By accessing or using the Service, you agree to be bound by these Terms. If you disagree with any part of the Terms, you may not access or use the Service.
      </p>

      <h3>2. Account</h3>
      <p>
        To access certain features of the Service, you may be required to create an account. You are responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account. You agree to notify us immediately of any unauthorized use of your account or any other breach of security.
      </p>

      <h3>3. Use of the Service</h3>
      <p>
        You agree to use the Service only for lawful purposes and in accordance with these Terms. You are prohibited from:
      </p>
      <ul>
        <li>Using the Service for any unlawful or unauthorized purpose;</li>
        <li>Violating any local, state, national, or international law or regulation;</li>
        <li>Interfering with or disrupting the Service or servers or networks connected to the Service;</li>
        <li>Attempting to gain unauthorized access to the Service, other accounts, computer systems, or networks connected to the Service;</li>
        <li>Interfering with other users' use of the Service;</li>
        <li>Uploading or transmitting any viruses or other malicious code;</li>
        <li>Collecting or storing personal data about other users without their consent;</li>
        <li>Using the Service for any commercial purpose without our prior written consent.</li>
      </ul>

      <h3>4. Intellectual Property</h3>
      <p>
        The Service and all its content, including but not limited to text, graphics, logos, images, audio clips, and software, are the property of [Your Company Name] or its licensors and are protected by copyright, trademark, and other intellectual property laws. You may not reproduce, distribute, modify, create derivative works of, publicly display, or commercially exploit any content from the Service without our prior written consent.
      </p>

      {/* ... Add more sections as needed (e.g., Disclaimer, Limitation of Liability, Termination) ... */}

      <h3>5. Disclaimer</h3>
      <p>
        The Service is provided "as is" and without warranty of any kind, express or implied, including but not limited to warranties of merchantability, fitness for a particular purpose, and non-infringement. [Your Company Name] does not warrant that the Service will be uninterrupted or error-free, that defects will be corrected, or that the Service is free of viruses or other harmful components.
      </p>

      <h3>6. Limitation of Liability</h3>
      <p>
        To the maximum extent permitted by law, [Your Company Name] shall not be liable for any damages arising out of or relating to your use of the Service, including but not limited to direct, indirect, incidental, consequential, and punitive damages.
      </p>

      <h3>7. Governing Law and Dispute Resolution</h3>
      <p>
        These Terms shall be governed by and construed in accordance with the laws of [Your State/Country], without regard to its conflict of law provisions. Any dispute arising out of or relating to these Terms shall be resolved exclusively by the courts located in [Your City/County].
      </p>

      <h3>8. Entire Agreement</h3>
      <p>
        These Terms constitute the entire agreement between you and [Your Company Name] regarding your use of the Service and supersede all prior or contemporaneous communications, representations, or agreements, whether oral or written.
      </p>

      <h3>9. Amendments</h3>
      <p>
        We may revise these Terms at any time by posting the revised Terms on the Service. Your continued use of the Service following the posting of any changes constitutes your acceptance of such changes.
      </p>

      <h3>10. Contact Us</h3>
      <p>
        If you have any questions about these Terms, please contact us at [Your Email Address].
      </p>

    </div>
  );
}

export default React.memo(Terms);