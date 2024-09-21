import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBook, faDollarSign, faUsers, faSearch, faComments, faCheckCircle, faBullseye, faStar } from '@fortawesome/free-solid-svg-icons';
import { Link } from "react-router-dom";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function WelcomePage() {
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
    };

    return (
        <div className="welcome">
            <h1>Welcome to Book.Lead</h1>
            <p>
                Discover, create, and share your own books online. Whether you're a writer looking to publish your work
                or a reader searching for new stories, our platform provides the tools you need.
            </p>

            <div className="full-line"></div>

            <div className="slider-container">
                <Slider {...settings}>
                <div className="feature-section">
                    <h2>Features</h2>
                    <ul>
                        <li><FontAwesomeIcon className="fa-icon" icon={faBook} /><span className="text">Create and publish your own books</span></li>
                        <li><FontAwesomeIcon className="fa-icon" icon={faDollarSign} /><span className="text">Sell your books or offer them via subscription</span></li>
                        <li><FontAwesomeIcon className="fa-icon" icon={faUsers} /><span className="text">Join a community of book lovers</span></li>
                        <li><FontAwesomeIcon className="fa-icon" icon={faSearch} /><span className="text">Discover new and exciting stories</span></li>
                        <li><FontAwesomeIcon className="fa-icon" icon={faComments} /><span className="text">Leave reviews and comments</span></li>
                    </ul>
                    </div>

                    <div className="why-choose-us">
                        <h2>Why Choose Us?</h2>
                        <p><FontAwesomeIcon className="mr-1" icon={faCheckCircle} /> Easy to use platform for both authors and readers.</p>
                        <p><FontAwesomeIcon className="mr-1" icon={faCheckCircle} /> Secure payment options for purchasing and subscribing to books.</p>
                        <p><FontAwesomeIcon className="mr-1" icon={faCheckCircle} /> Supportive community of book enthusiasts.</p>
                    </div>
                </Slider>
            </div>

            <div className="our-mission border">
                <h2>Our Mission</h2>
                <p>
                    <FontAwesomeIcon className="mr-1" icon={faBullseye} /> To provide a platform where authors can easily publish their books and readers can enjoy a vast library of online books.
                </p>
            </div>

            <div className="welcome-actions">
                <Link to="/auth" className="button">Get Started</Link>
                <Link to="/docs" className="button">Learn More</Link>
            </div>

            <div className="additional-info">
                <h2>Get in Touch</h2>
                <p>If you have any questions, feel free to <Link to="/contact">contact us</Link> or visit our <Link to="/faq">FAQ page</Link>.</p>
            </div>
        </div>
    );
}

export default React.memo(WelcomePage);