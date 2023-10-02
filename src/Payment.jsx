// Payment.js

import React, { useState } from 'react';
import "./Payment.css"
function Payment() {
    const [cardNumber, setCardNumber] = useState('');
    const [expiry, setExpiry] = useState('');
    const [cvv, setCVV] = useState('');
    const [cardName, setCardName] = useState('');
    const [amount, setAmount] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle payment processing here (e.g., through a payment gateway).
        console.log('Payment submitted:', {
            cardNumber,
            expiry,
            cvv,
            cardName,
            amount,
        });
    };

    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <div className="card">
                        <div className="card-header">
                            <h2>Payment</h2>
                        </div>
                        <div className="card-body">
                            <form onSubmit={handleSubmit}>
                                <div className="form-group">
                                    <label>Card Number</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="Card Number"
                                        value={cardNumber}
                                        onChange={(e) => setCardNumber(e.target.value)}
                                        required
                                    />
                                </div>
                                <div className="form-row">
                                    <div className="form-group col-md-6">
                                        <label>Expiry Date</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            placeholder="MM/YY"
                                            value={expiry}
                                            onChange={(e) => setExpiry(e.target.value)}
                                            required
                                        />
                                    </div>
                                    <div className="form-group col-md-6">
                                        <label>CVV</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            placeholder="CVV"
                                            value={cvv}
                                            onChange={(e) => setCVV(e.target.value)}
                                            required
                                        />
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label>Name on Card</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="Name on Card"
                                        value={cardName}
                                        onChange={(e) => setCardName(e.target.value)}
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Amount</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="Amount"
                                        value={amount}
                                        onChange={(e) => setAmount(e.target.value)}

                                    />
                                </div>
                                <button type="submit" className="btn btn-primary">
                                    Pay Now
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Payment;
