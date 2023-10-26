import React from 'react';
import { useEffect, useState } from 'react';
import { client_id } from '../../config/configPaypal';

import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import css from './Checkout.module.css';

const Checkout = (props) => {
    const [show, setShow] = useState(false);
    const [success, setSuccess] = useState(false);
    const [ErrorMessage, setErrorMessage] = useState("");
    const [orderID, setOrderID] = useState(false);
    const {onContactUserPayPal,showPayPalButton} = props;


    const handleSubmit = (e) =>{
        e.preventDefault();
        
        setShow(!show);
    };

    // creates a paypal order
    const createOrder = (data, actions) => {
        return actions.order.create({
            purchase_units: [
                {
                    description: "Sunflower",
                    amount: {
                        currency_code: "USD",
                        value: 20,
                    },
                },
            ],
        }).then((orderID) => {
                setOrderID(orderID);
                return orderID;
            });
    };

    // check Approval
    const onApprove = (data, actions) => {
        return actions.order.capture().then(function (details) {
            const { payer } = details;
            setSuccess(true);
        });
    };

    //capture likely error
    const onError = (data, actions) => {
        setErrorMessage("An Error occured with your payment ");
    };

    useEffect(() => {
        if (success) {
            alert("Payment successful!!");
            console.log('Order successful . Your order id is--', orderID);
        }
    },[success]);

    return (
        <PayPalScriptProvider options={{ "client-id": client_id }}>
           
                <div className="container">
                   
                    <div>
                        <div >
                            <p className={css.instruction}>Please click the button below to setup your Paypal account or make a payment</p>
                        </div>
                        <div>
                           
                            <button className={css.submitBtn} type="submit" onClick={onContactUserPayPal}>
                                Setup and Order Now
                            </button>
                        </div>
                    </div>


                    <br></br>
                    {showPayPalButton ? (
                        <PayPalButtons
                            style={{ layout: "vertical" }}
                            createOrder={createOrder}
                            onApprove={onApprove}
                        />
                    ) : null}
                </div>
               
            
        </PayPalScriptProvider>
    );
}


export default Checkout