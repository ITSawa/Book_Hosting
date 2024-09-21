import React, { useEffect } from "react";

function Contacts() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="info">
      <h2>Contact Us</h2>
      <div className="line"></div>
      <p>
        Have a question, feedback, or need assistance? We're here to help! 
        You can reach us through the following methods:
      </p>

      <div className="contact-block"> {/* New block for contact methods */}
        <ul>
          <li>
            <h4>Email:</h4>
            <p>
              <a href="mailto:support@bookhosting.com">support@bookhosting.com</a>
            </p>
          </li>
          <li>
            <h4>Phone:</h4>
            <p>+1-800-555-1212</p>
          </li>
        </ul>
      </div>

      <div className="social-block"> {/* New block for social media */}
        <ul>
          <h4>Social Media:</h4>
          <li>
            <a href="https://www.facebook.com/bookhosting" target="_blank" rel="noopener noreferrer">Facebook</a>
          </li>
          <li>
            <a href="https://twitter.com/bookhosting" target="_blank" rel="noopener noreferrer">Twitter</a>
          </li>
          <li>
            <a href="https://www.instagram.com/bookhosting" target="_blank" rel="noopener noreferrer">Instagram</a>
          </li>
        </ul>
      </div>

      <div className="call-to-action">
        <p>
          We're always happy to hear from our users! 
        </p>
      </div>
    </div>
  );
}

export default React.memo(Contacts);