import { loadStripe } from '@stripe/stripe-js';

import { BASE_URL } from '@/api/RestClient';

export class PaymentsClient {
    private elements: any = null;
    private stripe: any = null;
    private home_element = document.querySelector('#home') as Element;

    public PRODUCT_ID_BASE_PLAN = {
        id: 'price_1O2Ba4Ba9yG4sk8k4y3ZnEVT',
        msg: 'Base plan: $30/month',
        test_id: 'price_1O1wSsBa9yG4sk8kej8shNYs',
    };
    public PRODUCT_ID_PRO_PLAN = {
        id: 'price_1O2Ku4Ba9yG4sk8kIQBdzpPj',
        msg: 'Pro plan: $250/month',
        test_id: 'price_1O1wTVBa9yG4sk8kQSPeT9rp',
    };

    private is_test_mode = false;

    createPaymentForm(text: string) {
        this.home_element.innerHTML = `



        <div style="background: white; position: fixed; top: 0; left: 0; right: 0; bottom: 0; display: flex; flex-direction: column; justify-content: center; align-items: center">
           <div class="payment-container" style="overflow-y: auto">
                <h2 style="color: black; font-size: 2.5rem; text-align: center">AI or Not</h2>
                <br>

           <div class="sr-root" style="display: flex; flex-direction: row; align-items: center; justify-content: center; min-width: 380px;">
            <div class="sr-main">
                <h3 style="color: black; font-size: 2.5rem; justify-content: center">${text}</h3>
                <br>
                <form id="payment-form" style="min-width: 380px">
                    <div id="payment-element"></div>
                    <br>
                    // Add callback function
                </form>
                
                    <button class="button" style="width: 100%; visibility: hidden" id="submit">
                        <span style="width: 100 %;" id="button-text">Pay</span>
                    </button>
                    <br>
            </div>
        </div>
        </div>
            <div id="progress-loader" class="loader" style="border: 16px solid #f3f3f3; border-top: 16px solid #adff00; border-bottom: 16px solid #adff00; border-radius: 50%;width: 120px;height: 120px;animation: spin 2s linear infinite;"></div>
        </div>
    `;

        const btn = document.querySelector('#submit') as Element;
        btn.addEventListener('click', () => {
            this.completePayment();
        });
    }

    async createPaymentIntent(product: { id: string; msg: string; test_id: string }) {
        fetch(`${BASE_URL}/aion/payments/config`)
            .then((result) => {
                return result.json();
            })
            .then((data) => {
                // Create a Stripe client.
                loadStripe(data.stripe_public_key).then((stripe) => {
                    this.stripe = stripe;

                    // Check mode. If `test` in the key then use test mode.
                    this.is_test_mode = data.stripe_public_key.includes('test');

                    // Client secret.
                    fetch(`${BASE_URL}/aion/payments/create_intent`, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                            Authorization: `Bearer ${this.checkUserToken()}`,
                        },
                        body: JSON.stringify({
                            product_id: this.is_test_mode ? product.test_id : product.id,
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
                            // this.createPaymentForm(product.msg);
                            this.elements = this.stripe.elements({ clientSecret: data.client_secret });
                            const paymentElement = this.elements.create('payment');
                            // hide spinner
                            document.querySelector('#progress-loader')?.classList.add('hide');
                            // show button
                            document.querySelector('#submit').style.visibility = 'visible';

                            paymentElement.mount('#payment-element');
                        })
                        .catch((error) => {
                            console.error('Something wrong when create a payment intent', error);
                            alert('Something wrong when create a payment. Please try again.');
                        });
                });
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
        document.querySelector('#progress-loader')?.classList.remove('hide');
        document.querySelector('#submit').style.visibility = 'hidden';
        document.querySelector('#payment-element')?.classList.add('hide');

        this.stripe
            .confirmPayment({
                elements: this.elements,
                confirmParams: {
                    return_url: `https://${window.location.host}/dashboard/settings`,
                },
            })
            .then((result: any) => {
                if (result.error) {
                    console.error(result.error.message);
                    alert(result.error.message);
                    window.location.href = `https://${window.location.host}/#plans`;
                } else {
                    console.log(result);
                }
            });
    }

    async cancelSubscription() {
        fetch(`${BASE_URL}/aion/payments/cancel_subscription`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${this.checkUserToken()}`,
            },
        })
            .then((result) => {
                return result.json();
            })
            .catch((error) => {
                console.error('Something wrong when create a checkout session', error);
            });
    }

    async getSubscriptionInfo() {
        try {
            const response = await fetch(`${BASE_URL}/aion/payments/subscription`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${this.checkUserToken()}`,
                },
            });

            return await this.handleResponse(response);
        } catch (error) {
            return null;
        }
    }

    private async handleResponse(response: Response): Promise<any> {
        if (!response.ok) {
            const errorData = await response.json();
            throw { status: response.status, message: errorData };
        }
        if (response.status !== 204) {
            const data = await response.json();
            return data;
        }
    }
}
