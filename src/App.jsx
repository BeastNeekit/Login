import React, {useEffect, useState} from 'react';
import Modal from 'react-modal';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import LogIn from './LogIn';
import Registration from './Registration';
import Payment from './Payment';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import WebsiteAd from './WebsiteAd.jsx';
import Countdown from 'react-countdown';
import Subscription from "./Subscription.jsx";
import { faShoppingCart ,faTrash , faTrashCan , faSignOut , faCreditCard, faCashRegister ,faBell} from '@fortawesome/free-solid-svg-icons';
import LoadingScreen from './LoadingScreen';


function App() {
    const [name, setName] = useState('');
    const [loggedIn, setLoggedIn] = useState(false);
    const [inMarketView, setInMarketView] = useState(false);
    const [cart, setCart] = useState([]);
    const [showPayment, setShowPayment] = useState(false);
    const [isImageModalOpen, setIsImageModalOpen] = useState(false);
    const [selectedImage, setSelectedImage] = useState('');
    const [isRegistrationModalOpen, setIsRegistrationModalOpen] = useState(false);
    const [showAnnouncements, setShowAnnouncements] = useState(false);
    const [notificationCount, setNotificationCount] = useState(0);

    const [showCountdown, setShowCountdown] = useState(false);
    const [countdownTargetDate, setCountdownTargetDate] = useState(null);
    const [isSubscribed, setIsSubscribed] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // Simulate a loading delay (you can replace this with your actual loading logic)
        const loadingTimeout = setTimeout(() => {
            setIsLoading(false);
        }, 3000);

        // Cleanup the timeout to avoid memory leaks
        return () => clearTimeout(loadingTimeout);
    }, []);
    const handleSubscribe = () => {
        console.log('User subscribed!');

        setIsSubscribed(true);
    };
    const renderCountdown = () => {
        return (
            <div className="countdown-container">
                <Countdown
                    date={countdownTargetDate}
                    onComplete={() => {
                        setShowCountdown(true);
                    }}
                    renderer={({  hours, minutes, seconds, completed }) => {
                        if (completed) {
                            return <div className="rainbow-text">Sale is currently not available!!! </div>;
                        } else {
                            return (
                                <div className="countdown">
                                    <div className="saleBoard">On Sale Now</div>
                                    <div className="saleEnd">Ending In</div>
                                    <div className="countdown-item">
                                        <div className="countdown-value">{hours}</div>

                                    </div>
                                    :
                                    <div className="countdown-item">
                                        <div className="countdown-value">{minutes}</div>
                                    </div>
                                    :
                                    <div className="countdown-item">
                                        <div className="countdown-value">{seconds}</div>
                                    </div>
                                </div>
                            );
                        }
                    }}
                />
            </div>
        );
    };

    const handleSuccessfulLogin = (userName) => {
        setName(userName); // Set the user's name
        setLoggedIn(true);

        const targetDate = new Date();
        targetDate.setMinutes(targetDate.getMinutes() + 1);
        setCountdownTargetDate(targetDate);

        setShowCountdown(true); // Display the countdown
    };
    const openRegistrationModal = () => {
        setIsRegistrationModalOpen(true);
    };

    const closeRegistrationModal = () => {
        setIsRegistrationModalOpen(false);
    };

    const openImageModal = (imageSrc) => {
        setSelectedImage(imageSrc);
        setIsImageModalOpen(true);
    };
    const toggleImageModal = () => {
        setIsImageModalOpen(!isImageModalOpen);
    };

    const announcements = [
        {
            id: 1,
            title: 'Important Update',
            content: 'We have released a new version of our platform with exciting features!',
        },
        {
            id: 2,
            title: 'Holiday Closure',
            content: 'Our office will be closed for the holidays from December 24th to January 2nd.',
        },
        {
            id: 3,
            title: 'Quick View',
            content: 'Better Place for better person.',
        }
    ];
    const markAnnouncementAsRead = (id) => {
        const updatedAnnouncements = announcements.map((announcement) => {
            if (announcement.id === id) {
                return { ...announcement, read: true };
            }
            return announcement;
        });
        setNotificationCount((prevCount) => prevCount - 1);
        setAnnouncements(updatedAnnouncements);
    };

    useEffect(() => {
        // Calculate the initial notification count on component mount
        const unreadCount = announcements.filter((announcement) => !announcement.read).length;
        setNotificationCount(unreadCount);
    }, []);

    useEffect(() => {
        // Recalculate the notification count whenever announcements change
        const unreadCount = announcements.filter((announcement) => !announcement.read).length;
        setNotificationCount(unreadCount);
    }, [announcements]);

    const marketItems = [
        {
            id: 1,
            name: 'IPhone 15',
            price: 999.99,
            image: './static/i-phone.jpeg',
            loading:'lazy',
        },
        {
            id: 2,
            name: 'Mac-Book',
            price: 3808.55,
            image: './static/mac-book.jpeg',
            loading:'lazy',
        },
        {
            id: 3,
            name: 'Louis Vuitton',
            price: 990,
            image: './static/L-v.jpeg',
            loading:'lazy',
        },
        {
            id: 4,
            name: 'Gucci-Cap',
            price: 308,
            image: './static/Gucci-Cap.jpeg',
            loading:'lazy',
        },
        {
            id: 5,
            name: 'Hoddie',
            price: 110,
            image: './static/Hoddie.jpeg',
            loading:'lazy',
        },
        {
            id: 6,
            name: 'GRK10K',
            price: 79,
            image: './static/GRK10K.jpeg',
            loading:'lazy',
        }
    ];




    const handleLogout = () => {
        setLoggedIn(false);
    };


    const clearCart = () => {
        setCart([]);
    };
    const addToCart = (item) => {
        const existingItem = cart.find((cartItem) => cartItem.id === item.id);
        const discount = isSubscribed ? 0.2 : 0;

        if (existingItem) {
            const updatedCart = cart.map((cartItem) => {
                if (cartItem.id === item.id) {
                    return { ...cartItem, quantity: cartItem.quantity + 1,
                        discountedPrice: (1 - discount) * cartItem.price,};
                }
                return cartItem;
            });
            setCart(updatedCart);
        } else {
            setCart([...cart, { ...item, quantity: 1,
                discountedPrice: (1 - discount) * item.price,}]);
        }
    };

    const removeFromCart = (itemToRemove) => {
        const existingItem = cart.find((cartItem) => cartItem.id === itemToRemove.id);

        if (existingItem) {
            if (existingItem.quantity > 1) {
                const updatedCart = cart.map((cartItem) => {
                    if (cartItem.id === itemToRemove.id) {
                        return { ...cartItem, quantity: cartItem.quantity - 1 };
                    }
                    return cartItem;
                });
                setCart(updatedCart);
            } else {
                const updatedCart = cart.filter((cartItem) => cartItem.id !== itemToRemove.id);
                setCart(updatedCart);
            }
        }
    };
    const calculateTotalPrice = () => {
        const totalPrice= cart.reduce((total, item) => total + item.discountedPrice * item.quantity, 0);
        if (isSubscribed) {
            const discount = 0.2; // 20% discount
            const discountedPrice = totalPrice * (1 - discount);
            return { totalPrice, discountedPrice, discountText: "20% OFF" };
        } else {
            return { totalPrice, discountedPrice: totalPrice, discountText: "" };
        }

    };

    useEffect(() => {
        calculateTotalPrice();
    },  );

    return <div className="container mt-5">
        {isLoading && <LoadingScreen />}
        <div className="row justify-content-center">
            <div className="col-md-6">
                <div className="card">
                    <div className="card-header">
                        <h2>{loggedIn ? 'Welcome' : 'Login'}</h2>
                    </div>
                    <div className="card-body">
                        {loggedIn ? <div>
                                <h3 className="welcome-message">Hey, {name}!</h3>
                                {showCountdown && renderCountdown()}
                                <Subscription onSubscribe={handleSubscribe} isSubscribed={isSubscribed} />
                                <div className="notification-icon-container">
                                    <FontAwesomeIcon
                                        icon={faBell}
                                        className={`notification-icon ${showAnnouncements ? 'active' : ''}`}
                                        onClick={() => setShowAnnouncements(!showAnnouncements)}
                                    />
                                    {notificationCount > 0 && (
                                        <span className="notification-count">{notificationCount}</span>
                                    )}

                                </div>
                                {showAnnouncements && (
                                    <div className="announcement-container mt-3">
                                        <h4>Announcements</h4>
                                        <ul className="list-group">
                                            {announcements.map((announcement) => (
                                                <li
                                                    key={announcement.id}
                                                    className={`list-group-item announcement-item ${
                                                        announcement.read ? 'read' : 'unread'
                                                    }`}
                                                    onClick={() => markAnnouncementAsRead(announcement.id)}
                                                >
                                                    <strong>{announcement.title}</strong>
                                                    <p>{announcement.content}</p>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                )}


                                <div className="d-grid gap-2 d-md-flex justify-content-md-end">
                                    <button className="btn btn-danger " onClick={handleLogout}>
                                        <FontAwesomeIcon icon={faSignOut}  />
                                        Logout
                                    </button>
                                </div>
                                <div className="d-grid gap-2 d-md-flex">
                                    <button className="btn btn-primary " onClick={() => setInMarketView(!inMarketView)}>
                                        <FontAwesomeIcon icon={faShoppingCart} />
                                        Market
                                    </button>

                                </div>
                                {inMarketView && (
                                    <div>
                                        <h4>Shopping Cart</h4>
                                        <div className="row">
                                            {marketItems.map((item) => (
                                                <div key={item.id} className="col-md-4 mb-4">
                                                    <div className="card">
                                                        <img
                                                            src={item.image}
                                                            alt={item.name}
                                                            className="card-img-top"
                                                            onClick={() => openImageModal(item.image)}
                                                        />
                                                        <div className="card-body">
                                                            <h5 className="card-title">{item.name}</h5>
                                                            <p className="card-text">${item.price}</p>

                                                            <table>
                                                                <tbody>
                                                                <tr>
                                                                    <td>
                                                                        <button className="btn btn-sm btn-primary" onClick={() => addToCart(item)}>+</button>
                                                                        {item.quantity}
                                                                        <button className="btn btn-sm btn-primary" onClick={() => removeFromCart(item)}>-</button>
                                                                    </td>

                                                                    <td>
                                                                        <button className="btn btn-danger btn-sm" onClick={() => removeFromCart(item)}>
                                                                            <FontAwesomeIcon icon={faTrashCan} className="mr-1" />
                                                                            Remove</button>

                                                                    </td>
                                                                </tr>

                                                                </tbody>
                                                            </table>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}
                                <div className="mt-3">

                                    <ul className="list-group">
                                        {cart.map((item, index) => (
                                            <li key={index} className="list-group-item">
                                                {item.name} - ${item.price}
                                            </li>
                                        ))}
                                    </ul>
                                    <div className="mt-3">
                                        <h4>
                                            Total Price: ${calculateTotalPrice().totalPrice.toFixed(2)}{" "}
                                            {isSubscribed && (
                                                <span className="discount-text">
                                             ({calculateTotalPrice().discountText})
                                                </span>
                                            )}
                                        </h4>
                                    </div>
                                    <div className="d-grid gap-2 d-md-block ">
                                        <button className="btn btn-success mt-2 me-md-4" onClick={() => addToCart()}>
                                            <FontAwesomeIcon icon={faShoppingCart} className="mr-1" />
                                            Add to Cart
                                        </button>
                                        <button className="btn btn-danger mt-2 me-md-4" onClick={clearCart}>
                                            <FontAwesomeIcon icon={faTrash} className="mr-1" />
                                            Clear Cart
                                        </button>
                                        <button
                                            className="btn btn-primary mt-2 me-md-auto"
                                            onClick={() => setShowPayment(!showPayment)}
                                        >
                                            <FontAwesomeIcon icon={faCreditCard} className="mr-1" />
                                            Card
                                        </button>

                                        {showPayment && <Payment />}



                                        <Modal
                                            isOpen={isImageModalOpen}
                                            onRequestClose={toggleImageModal}
                                            contentLabel="Selected Image"
                                            className="image-modal"
                                        >
                                            {selectedImage && (
                                                <div>
                                                    <img src={selectedImage} alt="Selected" onClick={toggleImageModal} />
                                                </div>
                                            )}
                                        </Modal>
                                    </div>

                                </div>

                            </div> : <div className="LogIn-container">
                                <div className="card-body">
                                    <LogIn onLogin={handleSuccessfulLogin} />
                                </div>
                                <button className="btn btn-success ml-2" onClick={openRegistrationModal}>
                                    <FontAwesomeIcon icon={faCashRegister} className="mr-1" />
                                    Register
                                </button>
                                <WebsiteAd />
                            </div>}

                    </div>
                </div>
            </div>
        </div>
        <Modal
            isOpen={isRegistrationModalOpen}
            onRequestClose={closeRegistrationModal}
            contentLabel="Registration Modal"
            className="registration-modal"
        >

            <Registration />
        </Modal>
    </div>;
}


export default App;