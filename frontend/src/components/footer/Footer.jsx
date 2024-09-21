import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebook, faInstagram, faTwitter, faLinkedin } from "@fortawesome/free-brands-svg-icons";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="footer">
      <div className="line"></div>
      <div className="container">
        <div className="row">
          <div className="col-left">
            <Link to={"/"} ><h2>Book.Lead</h2></Link>
            <p>&copy; 2023 Your Company Name. All rights reserved.</p>
          </div>
          <div className="col-right">
            <div className="social-links">
              <a href="#" target="_blank" rel="noopener noreferrer">
                <FontAwesomeIcon icon={faFacebook} />
              </a>
              <a href="#" target="_blank" rel="noopener noreferrer">
                <FontAwesomeIcon icon={faInstagram} />
              </a>
              <a href="#" target="_blank" rel="noopener noreferrer">
                <FontAwesomeIcon icon={faTwitter} />
              </a>
              <a href="#" target="_blank" rel="noopener noreferrer">
                <FontAwesomeIcon icon={faLinkedin} />
              </a>
            </div>
            <div className="links">
              <Link to={"/about"} >About Us</Link>
              <Link to={"/contact"} >Contact Us</Link>
              <Link to={"/terms"} >Terms</Link>
              <Link to={"/privacy"} >Privacy</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default React.memo(Footer);