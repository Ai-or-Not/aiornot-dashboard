import { loadStripe } from '@stripe/stripe-js';

import { BASE_URL } from '@/api/RestClient';

function test() {
    console.log('test');
}

export class PaymentsClient {
    private elements: any = null;
    private stripe: any = null;
    private home_element = document.querySelector('#home') as Element;

    createPaymentForm(text: string) {
        this.home_element.innerHTML = `
        <div style="background: white; position: fixed; top: 0; left: 0; right: 0; bottom: 0; display: flex; flex-direction: column; justify-content: center; align-items: center">
           <div class="payment-container">
           <div class="sr-root" style="display: flex; flex-direction: row; align-items: center; justify-content: center; min-width: 380px">
            <div class="sr-main">
                <h2 style="color: black; font-size: 2.5rem; justify-content: center">${text}</h2>
                <br>
                <form id="payment-form" style="min-width: 380px">
                    <div id="payment-element"></div>
                    <br>
                    // Add callback function
                    <button class="button" style="width: 100%" id="submit">
                        <div class="spinner hidden" id="spinner"></div>
                        <span style="width: 100 %;" id="button-text">Pay</span>
                    </button>
                </form>
            </div>
        </div>
        </div>
        </div>
    `;

        const btn = document.querySelector('#submit') as Element;
        btn.addEventListener('click', () => {
            console.log('test');
            this.completePayment();
        });
    }

    async createPaymentIntent(product_id: string) {
        fetch(`${BASE_URL}/aion/payments/config`)
            .then((result) => {
                return result.json();
            })
            .then((data) => {
                // Create a Stripe client.
                loadStripe(data.stripe_public_key).then((stripe) => {
                    this.stripe = stripe;
                    // Client secret.
                    fetch(`${BASE_URL}/aion/payments/create_intent`, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                            Authorization: `Bearer ${this.checkUserToken()}`,
                        },
                        body: JSON.stringify({
                            product_id: product_id,
                        }),
                    })
                        .then((result) => {
                            return result.json();
                        })
                        .then((data) => {
                            if (data.code === 10) {
                                console.warn(data.message);
                                alert(data.message);
                                window.location.href = `https://${window.location.host}/`;
                                throw new Error(data.message);
                            }
                            this.elements = this.stripe.elements({ clientSecret: data.client_secret });
                            const paymentElement = this.elements.create('payment');

                            paymentElement.mount('#payment-element');
                        });
                });
            });
    }

    paymentCheckoutSession(product_id: string) {
        fetch(`${BASE_URL}/aion/payments/checkout_session`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${this.checkUserToken()}`,
            },
            body: JSON.stringify({
                product_id: product_id,
                quantity: 1,
                success_redirect_url: 'https://aiornot.webflow.io/dashboard/history',
                cancel_redirect_url: 'https://aiornot.webflow.io/new-home#pricing',
            }),
        })
            .then((result) => {
                return result.json();
            })
            .then((data) => {
                console.log(data);
                // Check if user has a subscription.
                if (data.code === 10) {
                    console.warn(data.message);
                    alert(data.message);
                    throw new Error(data.message);
                }
                // Load Stripe.
                loadStripe(data.checkout_public_key).then((stripe) => {
                    if (!stripe) {
                        console.error('Something wrong when create a Stripe object');
                        return;
                    }
                    stripe.redirectToCheckout({
                        sessionId: data.checkout_session_id,
                    });
                });
            })
            .catch((error) => {
                console.error('Something wrong when create a checkout session', error);
            });
    }

    private checkUserToken(): string {
        const userAccessToken = localStorage.getItem('_ms-mid');
        if (!userAccessToken) {
            throw new Error('User token not found');
        }

        return userAccessToken;
    }

    completePayment() {
        console.log('completePayment');
        console.log(this.elements);

        this.stripe
            .confirmPayment({
                elements: this.elements,
                confirmParams: {
                    return_url: `https://${window.location.host}/dashboard/history`,
                },
            })
            .then((result: any) => {
                if (result.error) {
                    console.error(result.error.message);
                    alert(result.error.message);
                } else {
                    console.log(result);
                }
            });
    }
}