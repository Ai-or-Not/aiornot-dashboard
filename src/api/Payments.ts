import { loadStripe } from '@stripe/stripe-js';

import { BASE_URL } from '@/api/RestClient';
import { showSuccessDowngradePlanNotification } from '$utils/notification';

interface IProduct {
    id: string;
    msg: string;
    name: string;
    description: string;
    price: string;
    test_id: string;
}

const styles = `

@keyframes blink {
0% { opacity: 1; }
50% { opacity: 0; }
100% { opacity: 1; }
}

.text-blink {
animation: blink 1.5s linear infinite;
font-size: 18px; 
color: #79818a;
font-weight: bold; 
}

.loader {
    display: flex;
    border: 16px solid #f3f3f3;
    border-top: 16px solid #adff00;
    border-bottom: 16px solid #adff00;
    border-radius: 50%;
    /*width: 120px;*/
    /*height: 120px;*/
    width: 10px;
    height: 10px;
    animation: spin 2s linear infinite;
}

           
.submit-btn{
background-color: #d9ff8a;
transition: all 0.2s ease;
}

.submit-btn:hover {
    background-color: #adff00;
}

.payment-form{
padding-bottom: 50px;
font-family: 'Montserrat', sans-serif;
}

.payment-form.dark{
background-color: #f6f6f6;
}

.payment-form .content{
box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.075);
background-color: white;
}

.payment-form .block-heading{
    padding-top: 50px;
    margin-bottom: 40px;
    text-align: center;
}

.payment-form .block-heading p{
text-align: center;
max-width: 420px;
margin: auto;
opacity:0.7;
}

.payment-form.dark .block-heading p{
opacity:0.8;
}

.payment-form .block-heading h1,
.payment-form .block-heading h2,
.payment-form .block-heading h3 {
margin-bottom:1.2rem;
color: black;
}

.payment-form form{
border-top: 2px solid #adff00;
box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.075);
background-color: #ffffff;
padding: 0;
max-width: 600px;
margin: auto;
}

.payment-form .title{
font-size: 1em;
border-bottom: 1px solid rgba(0,0,0,0.1);
margin-bottom: 0.8em;
font-weight: 600;
padding-bottom: 8px;
}

.payment-form .products{
background-color: #f7fbff;
    padding: 25px;
}

.payment-form .products .item{
margin-bottom:1em;
}

.payment-form .products .item-name{
font-weight:600;
font-size: 0.9em;
}

.payment-form .products .item-description{
font-size:0.8em;
opacity:0.6;
}

.payment-form .products .price-description{
font-size:0.8em;
opacity:0.6;
float: right;
}

.payment-form .products .item p{
margin-bottom:0.2em;
}

.payment-form .products .price{
float: right;
font-weight: 600;
font-size: 0.9em;
}

.payment-form .products .total{
border-top: 1px solid rgba(0, 0, 0, 0.1);
margin-top: 10px;
padding-top: 19px;
font-weight: 600;
line-height: 1;
}

.payment-form .card-details{
padding: 25px 25px 15px;
}

.payment-form .card-details label{
font-size: 12px;
font-weight: 600;
margin-bottom: 15px;
color: #79818a;
text-transform: uppercase;
}

.payment-form .card-details button{
margin-top: 0.6em;
padding:12px 0;
font-weight: 600;
}

.payment-form .date-separator{
 margin-left: 10px;
    margin-right: 10px;
    margin-top: 5px;
}

@media (min-width: 576px) {
    .payment-form .title {
    font-size: 1.2em;
    }
    
    .payment-form .products {
    padding: 40px;
      }
    
    .payment-form .products .item-name {
    font-size: 1em;
    }

    .payment-form .products .price {
        font-size: 1em;
    }

  .payment-form .card-details {
    padding: 40px 40px 30px;
    }

  .payment-form .card-details button {
    margin-top: 2em;
    }

}
            
            `;

export class PaymentsClient {
    private elements: any = null;
    private stripe: any = null;
    private home_element = document.querySelector('#home') as Element;

    public PRODUCT_ID_BASE_9USD_PLAN = {
        id: 'price_1OABgwBa9yG4sk8kc2owagiH',
        msg: 'Base plan: $9/month',
        name: 'Base plan',
        description: '300 requests per month',
        price: '$9',
        test_id: 'price_1OABdXBa9yG4sk8kcXyILlLm',
    } as IProduct;

    public PRODUCT_ID_BASE_PLAN = {
        id: 'price_1O2Ba4Ba9yG4sk8k4y3ZnEVT',
        msg: 'Base plan: $30/month',
        name: 'Base plan',
        description: '1,000 requests per month',
        price: '$30',
        test_id: 'price_1O1wSsBa9yG4sk8kej8shNYs',
    } as IProduct;
    public PRODUCT_ID_PRO_PLAN = {
        id: 'price_1O2Ku4Ba9yG4sk8kIQBdzpPj',
        msg: 'Pro plan: $250/month',
        name: 'Pro plan',
        description: '10,000 requests per month',
        price: '$250',
        test_id: 'price_1O7HCzBa9yG4sk8kYEld9lNl',
        // test_id: 'price_1O4iyjBa9yG4sk8k1wRbFjxk',
    } as IProduct;

    private is_test_mode = false;

    showBlinkMessage(text: string, element: Element) {
        const style = document.createElement('style');
        style.innerHTML = styles;
        document.head.appendChild(style);

        element.innerHTML = `
        <div class="text-blink">${text}</div>
        `;
    }

    getProduct(product_id: string): IProduct {
        if (product_id === this.PRODUCT_ID_BASE_PLAN.id) {
            return this.PRODUCT_ID_BASE_PLAN;
        }
        if (product_id === this.PRODUCT_ID_PRO_PLAN.id) {
            return this.PRODUCT_ID_PRO_PLAN;
        }
        return this.PRODUCT_ID_BASE_PLAN;
    }

    checkout(product: IProduct) {
        window.location.href = `https://${window.location.host}/checkout?product_id=${product.id}`;
    }

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
                <footer id="payment-form-static">
                <label>Card number</label>
    
                </form>
                
                <form id="payment-form" style="min-width: 380px">
                    <div id="payment-element">
                    
                        <label style="" for="Field-numberInput">Card number</label>
                    
                    </div>
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
            this.completePayment(this.PRODUCT_ID_BASE_PLAN); // !!!!!!!!!
        });
    }

    createPaymentForm2(plan: IProduct) {
        const cssLink = document.createElement('link');
        cssLink.rel = 'stylesheet';
        cssLink.href = 'https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css';
        cssLink.type = 'text/css';
        document.head.appendChild(cssLink);

        const fontLink = document.createElement('link');
        fontLink.rel = 'stylesheet';
        fontLink.href = 'https://fonts.googleapis.com/css?family=Montserrat';
        document.head.appendChild(fontLink);

        const style = document.createElement('style');
        style.innerHTML = styles;
        document.head.appendChild(style);

        (document.querySelector('#home-container') as Element).innerHTML = `
        <main class="page payment-page">
        <section class="payment-form dark">
          <div class="container">
            <div class="block-heading">
<!--              <h2>Checkout</h2>-->
<!--              <p>By providing your card information, you allow AIorNot Inc to charge your card for future payments in accordance with our terms.</p>-->
            </div>
            <form id="payment-form">
              
              <div class="products">
                <h3 class="title">Checkout</h3>
                <div class="item">
                  <span class="price" id="total-price">${plan.price}</span>
                  <p class="item-name">${plan.name}</p>
                  <p class="price-description">per month</p>
                  <p class="item-description">${plan.description}</p>
                </div>
              
              </div>
              <div class="card-details">
              <div id="payment-element">
                <h3 class="title text-blink">Checking details and preparation of payment...</h3>
                <div class="row"></div>
              </div>
            <button type="button" id="submit" class="btn btn-block submit-btn", style="display: flex; flex-direction: row; align-items: center; justify-content: center">
                
                <span id="button-text">Pay ${plan.price}</span>
<!--                <span id="progress" class="loader"></span>-->
                
            </button>
            </form>

          </div>
        </section>
      </main>
        `;
        document.querySelector('#submit')?.addEventListener('click', () => {
            this.completePayment(plan);
        });
    }

    async createPaymentIntent(product: IProduct) {
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

    async initPaymentForm(plan: IProduct) {
        console.log('Init payment form...');
        const stripe = await this.initStripe();
        this.stripe = stripe;

        if (!stripe) {
            return;
        }
        const appearance = {
            theme: 'flat',
            // labels: 'floating',
            variables: {
                colorPrimary: '#30313d',
                colorText: '#30313d',
            },
            roles: {
                '.TermsText': {
                    hide: true,
                },
            },
        };
        const options = {
            // fields: {
            //     billingDetails: 'never',
            // },
        };
        const loader = 'auto';

        const clientSecret = await this.getClientSecret(plan);

        if (!clientSecret) {
            return;
        }

        const elements = stripe.elements({ clientSecret, appearance, loader });
        this.elements = elements;
        const paymentElement = elements.create('payment', options).mount('#payment-element');
    }

    async getClientSecret(product: IProduct) {
        return fetch(`${BASE_URL}/aion/payments/create_intent`, {
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
                console.log(data);

                if (data.code === 10) {
                    const plane_id = this.is_test_mode ? product.test_id : product.id;
                    console.log(plane_id, data.plan_id);
                    if (data.plan_id && data.plan_id !== plane_id) {
                        // Update subscription
                        return this.updateSubscription(product);
                    }

                    console.warn(data.message);
                    alert(data.message);

                    window.location.href = `https://${window.location.host}/`;
                    throw new Error(data.message);
                }
                (document.getElementById('button-text') as Element).innerHTML = `$${data.amount}`;
                return data.client_secret;
            });
    }

    async updateSubscription(product: IProduct) {
        console.log('Update subscription...');
        return fetch(`${BASE_URL}/aion/payments/subscription`, {
            method: 'PUT',
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
                console.log(data);
                if (data.credit) {
                    // hide checkout form.
                    document.querySelector('#payment-form')?.classList.add('hide');
                    showSuccessDowngradePlanNotification(data.credit, product.name);
                    return;
                }

                (document.getElementById('button-text') as Element).innerHTML = `Pay $${data.amount}`;
                return data.client_secret;
            })
            .catch((error) => {
                console.error('Something wrong when update a subscription', error);
                alert('Something wrong when update a subscription. Please try again or contact us.');
                window.location.href = `https://${window.location.host}/#plans`;
            });
    }

    private initStripe() {
        console.log('Init stripe...');
        return fetch(`${BASE_URL}/aion/payments/config`)
            .then((result) => {
                return result.json();
            })
            .then((data) => {
                this.is_test_mode = data.stripe_public_key.includes('test');
                return loadStripe(data.stripe_public_key).then((stripe) => {
                    return stripe;
                });
            })
            .catch((error) => {
                console.error('Something wrong when init stripe', error);
            });
    }

    async completePayment(plan: IProduct) {
        console.log('Complete payment...');
        const element = document.querySelector('#submit') as Element;

        if (element.innerHTML.includes('Payments attempt')) {
            window.location.href = `https://${window.location.host}/#plans`;
            return;
        }
        const prev_value = element.innerHTML;

        let result = null;
        let msg = null;

        for (let i = 1; i <= 5; i++) {
            this.showBlinkMessage(`Payments attempt ${i}...`, element);

            result = await this.stripe
                .confirmPayment({
                    elements: this.elements,
                    confirmParams: {
                        return_url: `https://${window.location.host}/dashboard/settings?payment_success=${plan.name}`,
                    },
                })
                .then((result: any) => {
                    if (result.error) {
                        msg = result.error.message;
                        return 'error';
                    }
                    console.log(result);
                    return 'success';
                });
            element.innerHTML = prev_value;

            console.log('result: ', result);

            if (result === 'false') {
                break;
            }

            if (result === 'success') {
                break;
            }
        }
        console.log(result, msg);

        if (result === 'error') {
            alert(msg);
        }
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

    private isValidCreditCardNumber(cardNumber: string): boolean {
        cardNumber = cardNumber.replace(/\s/g, '').split('').reverse().join('');
        if (!/^[0-9]{13,19}$/.test(cardNumber)) {
            return false;
        }
        let sum = 0;
        for (let i = 0; i < cardNumber.length; i++) {
            let digit = parseInt(cardNumber[i]);
            if (i % 2 === 1) {
                digit *= 2;
                if (digit > 9) {
                    digit -= 9;
                }
            }

            sum += digit;
        }
        return sum % 10 === 0;
    }
}
