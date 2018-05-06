import React, { Component } from 'react';
import CSRFToken from './csrftoken';
import './sqpaymentform.css';
import { createPaymentForm, requestCardNonce, buildPaymentForm } from "./sqpaymentform";


class PaymentForm extends Component {

    componentWillMount() {
        createPaymentForm();
        console.log("Payment form mounted");
    };

    _requestCardNonce = (event) => {
       // Don't submit the form until SqPaymentForm returns with a nonce
        requestCardNonce(event);
    };

    componentDidUpdate() {
        buildPaymentForm()

    }

    render() {
        return (
            <div>
                <div id="sq-ccbox">

                    <form id="nonce-form" noValidate action="/merchant/process_card/" method="post">
                        <CSRFToken />

                        Pay with a Credit Card

                        <table>
                            <tbody>
                            <tr>
                                <td>Card Number:</td>
                                <td>
                                    <div id="sq-card-number"></div>
                                </td>
                            </tr>
                            <tr>
                                <td>CVV:</td>
                                <td>
                                    <div id="sq-cvv"></div>
                                </td>
                            </tr>
                            <tr>
                                <td>Expiration Date:</td>
                                <td>
                                    <div id="sq-expiration-date"></div>
                                </td>
                            </tr>
                            <tr>
                                <td>Postal Code:</td>
                                <td>
                                    <div id="sq-postal-code"></div>
                                </td>
                            </tr>
                            <tr>
                                <td colSpan="2">
                                    <button id="sq-creditcard" className="button-credit-card"
                                            onClick={this._requestCardNonce}>
                                        Pay with card
                                    </button>
                                </td>
                            </tr>
                            </tbody>
                        </table>

                        <input type="hidden" id="card-nonce" name="nonce"/>

                    </form>
                </div>

                <div id="sq-walletbox">
                    Pay with a Digital Wallet

                    <div id="sq-apple-pay-label" className="wallet-not-enabled">Apple Pay for Web not enabled</div>
                    {/*Placholder for Apple Pay for Web button*/}
                    <button id="sq-apple-pay" className="button-apple-pay"/>

                    <div id="sq-masterpass-label" className="wallet-not-enabled">Masterpass not enabled</div>
                    {/*Placholder for Masterpass button*/}
                    <button id="sq-masterpass" className="button-masterpass"/>
                </div>

                <p id="cc-total">Total: <span id="cc-amount"
                                              className="cc-amount">{ this.props.amount }</span></p>
            </div>
        );
    };
}



export default PaymentForm;
