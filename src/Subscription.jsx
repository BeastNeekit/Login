import React, { useState } from 'react';
import './subscription.css';
import { faClock, faGift, faStar, faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Subscription = ({ onSubscribe, isSubscribed }) => {
    const [showPopup, setShowPopup] = useState(false);

    const handleSubscribeClick = () => {
        // Your subscription logic here
        onSubscribe();

        // Show the popup
        setShowPopup(true);

        // Hide the popup after a delay (e.g., 3 seconds)
        setTimeout(() => {
            setShowPopup(false);
        }, 3000);
    };

    return (
        <div className="subscription-container" >
            <h3 className="subscription-title">Unlock Premium Benefits with Our Subscription</h3>
            <p className="subscription-description">
                Subscribe to our premium service for exclusive offers, early access to products, and more!
            </p>
            <div className="subscription-features">
                <FontAwesomeIcon icon={faStar} className="feature-icon" style={{ color: 'gold' }} />
                <FontAwesomeIcon icon={faClock} className="feature-icon" style={{color: 'red'}} />
                <FontAwesomeIcon icon={faGift} className="feature-icon" style={{color: 'blue'}}/>
            </div>
            <button className="subscribe-button" onClick={handleSubscribeClick}>
                <FontAwesomeIcon icon={faCheckCircle} className="mr-2"/>
                Subscribe Now
            </button>

            {showPopup && (
                <div className="testimonial-section popup">
                    <blockquote>
                    <p>Thank you for subscribing! Enjoy our premium benefits.</p>
                    </blockquote>
                    <cite>- Happy Subscriber</cite>
                </div>
            )}
        </div>
    );
};

export default Subscription;
