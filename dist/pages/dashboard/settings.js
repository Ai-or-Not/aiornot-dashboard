"use strict";
(() => {
  var __defProp = Object.defineProperty;
  var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
  var __publicField = (obj, key, value) => {
    __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
    return value;
  };

  // bin/live-reload.js
  new EventSource(`${"http://localhost:3000"}/esbuild`).addEventListener("change", () => location.reload());

  // src/utils/notification.ts
  var toastCss = `
#toast {
  visibility: hidden; /* Hidden by default. Visible on click */
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  left: 10rem;
  right: 10rem;
  min-height: 100px;
  background-color: #1E2026;
  color: #fff;
  text-align: center;
  border-radius: 2px;
  position: fixed;
  top: 30px;
  padding: 10px;
  z-index: 9999
  border-style: solid;
  border-width: 1px;
  border-color: #aefc06;
}

#toast .close-button {
  cursor: pointer;
  position: absolute;
  top: 5px;
  right: 10px;
    
}

#toast.show {
  visibility: visible; /* Show the snackbar */
  -webkit-animation: fadein 0.5s, fadeout 0.5s 2.5s;
  animation: fadein 0.5s, 2.5s;
  
  border-style: solid;
  border-right: none;
  border-left: none;
  border-top: none;
  border-width: 1px;
  border-color: #aefc06;
  z-index: 9999
    
}

@-webkit-keyframes fadein {
  from {bottom: 0; opacity: 0;}
  to {bottom: 30px; opacity: 1;}
}

@keyframes fadein {
  from {top: 0; opacity: 0;}
  to {top: 30px; opacity: 1;}
}

@-webkit-keyframes fadeout {
  from {top: 30px; opacity: 1;}
  to {top: 0; opacity: 0;}
}

@keyframes fadeout {
  from {top: 30px; opacity: 1;}
  to {top: 0; opacity: 0;}
`;
  var style = document.createElement("style");
  style.innerHTML = toastCss;
  document.head.appendChild(style);
  var toast = document.getElementById("toast");
  function showToastNotification(text, msgType = "info") {
    toast.classList.remove("hide");
    const closeBtn = document.createElement("span");
    closeBtn.innerHTML = "x";
    closeBtn.className = "close-button";
    closeBtn.addEventListener("click", () => {
      toast.classList.add("hide");
      if (msgType !== "error") {
        window.location.href = `https://${window.location.host}/dashboard/settings`;
      }
    });
    toast.innerHTML = text;
    toast.appendChild(closeBtn);
    toast.classList.add("show");
    toast.style.borderColor = msgType === "error" ? "red" : "#aefc06";
  }
  var showSuccessPaymentNotification = (plan) => {
    showToastNotification(
      `<p style="font-size: 1.5rem; padding: 2rem;">Amazing! You\u2019ve just upgraded your account, welcome to the exclusive ranks of AI or Not <span style="color: #aefc06; font-weight: bold ">${plan}</span> users. Thank you for being a supporter of AI or Not and a purveyor of the truth!</p>`
    );
  };
  var showSuccessDowngradePlanNotification = (credit, plan) => {
    showToastNotification(
      `<p style="font-size: 1.5rem; padding: 2rem;">We are pleased to inform you that you currently have a credit of $${credit} from a previous paid subscription after that we successfully update your plan to <span style="color: #aefc06; font-weight: bold ">${plan.split(" ")[0]}</span>! If you have any questions please contact us.</p>`
    );
  };

  // src/utils/string.ts
  function parseJwt(token) {
    var base64Url = token.split(".")[1];
    var base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    var jsonPayload = decodeURIComponent(
      atob(base64).split("").map(function(c) {
        return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
      }).join("")
    );
    return JSON.parse(jsonPayload);
  }

  // node_modules/@stripe/stripe-js/dist/stripe.esm.js
  var V3_URL = "https://js.stripe.com/v3";
  var V3_URL_REGEX = /^https:\/\/js\.stripe\.com\/v3\/?(\?.*)?$/;
  var EXISTING_SCRIPT_MESSAGE = "loadStripe.setLoadParameters was called but an existing Stripe.js script already exists in the document; existing script parameters will be used";
  var findScript = function findScript2() {
    var scripts = document.querySelectorAll('script[src^="'.concat(V3_URL, '"]'));
    for (var i = 0; i < scripts.length; i++) {
      var script = scripts[i];
      if (!V3_URL_REGEX.test(script.src)) {
        continue;
      }
      return script;
    }
    return null;
  };
  var injectScript = function injectScript2(params) {
    var queryString = params && !params.advancedFraudSignals ? "?advancedFraudSignals=false" : "";
    var script = document.createElement("script");
    script.src = "".concat(V3_URL).concat(queryString);
    var headOrBody = document.head || document.body;
    if (!headOrBody) {
      throw new Error("Expected document.body not to be null. Stripe.js requires a <body> element.");
    }
    headOrBody.appendChild(script);
    return script;
  };
  var registerWrapper = function registerWrapper2(stripe, startTime) {
    if (!stripe || !stripe._registerWrapper) {
      return;
    }
    stripe._registerWrapper({
      name: "stripe-js",
      version: "2.1.7",
      startTime
    });
  };
  var stripePromise = null;
  var loadScript = function loadScript2(params) {
    if (stripePromise !== null) {
      return stripePromise;
    }
    stripePromise = new Promise(function(resolve, reject) {
      if (typeof window === "undefined" || typeof document === "undefined") {
        resolve(null);
        return;
      }
      if (window.Stripe && params) {
        console.warn(EXISTING_SCRIPT_MESSAGE);
      }
      if (window.Stripe) {
        resolve(window.Stripe);
        return;
      }
      try {
        var script = findScript();
        if (script && params) {
          console.warn(EXISTING_SCRIPT_MESSAGE);
        } else if (!script) {
          script = injectScript(params);
        }
        script.addEventListener("load", function() {
          if (window.Stripe) {
            resolve(window.Stripe);
          } else {
            reject(new Error("Stripe.js not available"));
          }
        });
        script.addEventListener("error", function() {
          reject(new Error("Failed to load Stripe.js"));
        });
      } catch (error) {
        reject(error);
        return;
      }
    });
    return stripePromise;
  };
  var initStripe = function initStripe2(maybeStripe, args, startTime) {
    if (maybeStripe === null) {
      return null;
    }
    var stripe = maybeStripe.apply(void 0, args);
    registerWrapper(stripe, startTime);
    return stripe;
  };
  var stripePromise$1 = Promise.resolve().then(function() {
    return loadScript(null);
  });
  var loadCalled = false;
  stripePromise$1["catch"](function(err) {
    if (!loadCalled) {
      console.warn(err);
    }
  });
  var loadStripe = function loadStripe2() {
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    loadCalled = true;
    var startTime = Date.now();
    return stripePromise$1.then(function(maybeStripe) {
      return initStripe(maybeStripe, args, startTime);
    });
  };

  // src/api/RestClient.ts
  var env = window.location.host.includes("webflow") ? "stage" : "prod";
  var BASE_URL = `https://${env}.ai-or-not.com`;
  var RestClient = class {
    apiUrl;
    bearerToken;
    constructor(apiUrl, bearerToken) {
      this.apiUrl = apiUrl;
      this.bearerToken = bearerToken;
    }
    async get(endpoint) {
      const url = `${this.apiUrl}/${endpoint}`;
      try {
        const response = await fetch(url, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${this.bearerToken}`
          }
        });
        return await this.handleResponse(response);
      } catch (error) {
        console.error("Error", error);
        throw error;
      }
    }
    async post(endpoint, body) {
      const url = `${this.apiUrl}/${endpoint}`;
      try {
        const response = await fetch(url, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${this.bearerToken}`
          },
          body: JSON.stringify(body)
        });
        return await this.handleResponse(response);
      } catch (error) {
        console.error("Request error", error);
        if (error.status === 429) {
          alert(
            `It looks like you have reached your plan limit of ${error.message.current_limit} requests. To continue, please upgrade to a new plan.`
          );
        }
        throw error;
      }
    }
    async postBinary(endpoint, formData) {
      const url = `${this.apiUrl}/${endpoint}`;
      try {
        const response = await fetch(url, {
          method: "POST",
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${this.bearerToken}`
          },
          body: formData
        });
        const data = await this.handleResponse(response);
        return data;
      } catch (error) {
        console.error("Binary request error:", error);
        if (error.status === 429) {
          alert(
            `It looks like you have reached your plan limit of ${error.message.current_limit} requests. To continue, please upgrade to a new plan.`
          );
        }
        throw error;
      }
    }
    async delete(endpoint) {
      const url = `${this.apiUrl}/${endpoint}`;
      try {
        const response = await fetch(url, {
          method: "DELETE",
          headers: {
            accept: "*/*",
            Authorization: `Bearer ${this.bearerToken}`
          }
        });
        await this.handleResponse(response);
      } catch (error) {
        console.error("Error when perform DELETE-request:", error);
        throw error;
      }
    }
    async patch(endpoint, body) {
      const url = `${this.apiUrl}/${endpoint}`;
      try {
        const response = await fetch(url, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${this.bearerToken}`
          },
          body: JSON.stringify(body)
        });
        return await this.handleResponse(response);
      } catch (error) {
        console.error("\u041E\u0448\u0438\u0431\u043A\u0430 \u043F\u0440\u0438 \u0432\u044B\u043F\u043E\u043B\u043D\u0435\u043D\u0438\u0438 PATCH-\u0437\u0430\u043F\u0440\u043E\u0441\u0430:", error);
        throw error;
      }
    }
    async handleResponse(response) {
      if (!response.ok) {
        const errorData = await response.json();
        throw { status: response.status, message: errorData };
      }
      if (response.status !== 204) {
        const data = await response.json();
        return data;
      }
    }
  };

  // src/api/Payments.ts
  var styles = `

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
  var PaymentsClient = class {
    elements = null;
    stripe = null;
    home_element = document.querySelector("#home");
    PRODUCT_ID_BASE_9USD_PLAN = {
      id: "price_1OABgwBa9yG4sk8kc2owagiH",
      msg: "Base plan: $9/month",
      name: "Base plan",
      description: "300 requests per month",
      price: "$9",
      test_id: "price_1OABdXBa9yG4sk8kcXyILlLm"
    };
    PRODUCT_ID_BASE_PLAN = {
      id: "price_1O2Ba4Ba9yG4sk8k4y3ZnEVT",
      msg: "Base plan: $30/month",
      name: "Base plan",
      description: "1,000 requests per month",
      price: "$30",
      test_id: "price_1O1wSsBa9yG4sk8kej8shNYs"
    };
    PRODUCT_ID_PRO_PLAN = {
      id: "price_1O2Ku4Ba9yG4sk8kIQBdzpPj",
      msg: "Pro plan: $250/month",
      name: "Pro plan",
      description: "10,000 requests per month",
      price: "$250",
      test_id: "price_1O7HCzBa9yG4sk8kYEld9lNl"
    };
    is_test_mode = false;
    showBlinkMessage(text, element) {
      const style2 = document.createElement("style");
      style2.innerHTML = styles;
      document.head.appendChild(style2);
      element.innerHTML = `
        <div class="text-blink">${text}</div>
        `;
    }
    getProduct(product_id) {
      if (product_id === this.PRODUCT_ID_BASE_PLAN.id) {
        return this.PRODUCT_ID_BASE_PLAN;
      }
      if (product_id === this.PRODUCT_ID_PRO_PLAN.id) {
        return this.PRODUCT_ID_PRO_PLAN;
      }
      if (product_id === this.PRODUCT_ID_BASE_9USD_PLAN.id) {
        return this.PRODUCT_ID_BASE_9USD_PLAN;
      }
      return this.PRODUCT_ID_BASE_PLAN;
    }
    checkout(product) {
      window.location.href = `https://${window.location.host}/checkout?product_id=${product.id}`;
    }
    createPaymentForm(text) {
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
      const btn = document.querySelector("#submit");
      btn.addEventListener("click", () => {
        this.completePayment(this.PRODUCT_ID_BASE_PLAN);
      });
    }
    createPaymentForm2(plan) {
      const cssLink = document.createElement("link");
      cssLink.rel = "stylesheet";
      cssLink.href = "https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css";
      cssLink.type = "text/css";
      document.head.appendChild(cssLink);
      const fontLink = document.createElement("link");
      fontLink.rel = "stylesheet";
      fontLink.href = "https://fonts.googleapis.com/css?family=Montserrat";
      document.head.appendChild(fontLink);
      const style2 = document.createElement("style");
      style2.innerHTML = styles;
      document.head.appendChild(style2);
      document.querySelector("#home-container").innerHTML = `
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
      document.querySelector("#submit")?.addEventListener("click", () => {
        this.completePayment(plan);
      });
    }
    async createPaymentIntent(product) {
      fetch(`${BASE_URL}/aion/payments/config`).then((result) => {
        return result.json();
      }).then((data) => {
        loadStripe(data.stripe_public_key).then((stripe) => {
          this.stripe = stripe;
          this.is_test_mode = data.stripe_public_key.includes("test");
          fetch(`${BASE_URL}/aion/payments/create_intent`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${this.checkUserToken()}`
            },
            body: JSON.stringify({
              product_id: this.is_test_mode ? product.test_id : product.id
            })
          }).then((result) => {
            return result.json();
          }).then((data2) => {
            if (data2.code === 10) {
              console.warn(data2.message);
              alert(data2.message);
              window.location.href = `https://${window.location.host}/`;
              throw new Error(data2.message);
            }
            this.elements = this.stripe.elements({ clientSecret: data2.client_secret });
            const paymentElement = this.elements.create("payment");
            document.querySelector("#progress-loader")?.classList.add("hide");
            document.querySelector("#submit").style.visibility = "visible";
            paymentElement.mount("#payment-element");
          }).catch((error) => {
            console.error("Something wrong when create a payment intent", error);
            alert("Something wrong when create a payment. Please try again.");
          });
        });
      });
    }
    checkUserToken() {
      const userAccessToken = localStorage.getItem("_ms-mid");
      if (!userAccessToken) {
        throw new Error("User token not found");
      }
      return userAccessToken;
    }
    async initPaymentForm(plan) {
      console.log("Init payment form...");
      const stripe = await this.initStripe();
      this.stripe = stripe;
      if (!stripe) {
        return;
      }
      const appearance = {
        theme: "flat",
        // labels: 'floating',
        variables: {
          colorPrimary: "#30313d",
          colorText: "#30313d"
        },
        roles: {
          ".TermsText": {
            hide: true
          }
        }
      };
      const options = {
        // fields: {
        //     billingDetails: 'never',
        // },
      };
      const loader = "auto";
      const clientSecret = await this.getClientSecret(plan);
      if (!clientSecret) {
        return;
      }
      const elements = stripe.elements({ clientSecret, appearance, loader });
      this.elements = elements;
      const paymentElement = elements.create("payment", options).mount("#payment-element");
    }
    async getClientSecret(product) {
      return fetch(`${BASE_URL}/aion/payments/create_intent`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${this.checkUserToken()}`
        },
        body: JSON.stringify({
          product_id: this.is_test_mode ? product.test_id : product.id
        })
      }).then((result) => {
        return result.json();
      }).then((data) => {
        console.log(data);
        if (data.code === 10) {
          const plane_id = this.is_test_mode ? product.test_id : product.id;
          console.log(plane_id, data.plan_id);
          if (data.plan_id && data.plan_id !== plane_id) {
            return this.updateSubscription(product);
          }
          console.warn(data.message);
          alert(data.message);
          window.location.href = `https://${window.location.host}/`;
          throw new Error(data.message);
        }
        document.getElementById("button-text").innerHTML = `$${data.amount}`;
        return data.client_secret;
      });
    }
    async updateSubscription(product) {
      console.log("Update subscription...");
      return fetch(`${BASE_URL}/aion/payments/subscription`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${this.checkUserToken()}`
        },
        body: JSON.stringify({
          product_id: this.is_test_mode ? product.test_id : product.id
        })
      }).then((result) => {
        return result.json();
      }).then((data) => {
        console.log(data);
        if (data.credit) {
          document.querySelector("#payment-form")?.classList.add("hide");
          showSuccessDowngradePlanNotification(data.credit, product.name);
          return;
        }
        document.getElementById("button-text").innerHTML = `Pay $${data.amount}`;
        return data.client_secret;
      }).catch((error) => {
        console.error("Something wrong when update a subscription", error);
        alert("Something wrong when update a subscription. Please try again or contact us.");
        window.location.href = `https://${window.location.host}/#plans`;
      });
    }
    initStripe() {
      console.log("Init stripe...");
      return fetch(`${BASE_URL}/aion/payments/config`).then((result) => {
        return result.json();
      }).then((data) => {
        this.is_test_mode = data.stripe_public_key.includes("test");
        return loadStripe(data.stripe_public_key).then((stripe) => {
          return stripe;
        });
      }).catch((error) => {
        console.error("Something wrong when init stripe", error);
      });
    }
    async completePayment(plan) {
      console.log("Complete payment...");
      const element = document.querySelector("#submit");
      if (element.innerHTML.includes("Payments attempt")) {
        window.location.href = `https://${window.location.host}/#plans`;
        return;
      }
      const prev_value = element.innerHTML;
      let result = null;
      let msg = null;
      for (let i = 1; i <= 5; i++) {
        this.showBlinkMessage(`Payments attempt ${i}...`, element);
        result = await this.stripe.confirmPayment({
          elements: this.elements,
          confirmParams: {
            return_url: `https://${window.location.host}/dashboard/settings?payment_success=${plan.name}`
          }
        }).then((result2) => {
          if (result2.error) {
            msg = result2.error.message;
            return "error";
          }
          console.log(result2);
          return "success";
        });
        element.innerHTML = prev_value;
        console.log("result: ", result);
        if (result === "false") {
          break;
        }
        if (result === "success") {
          break;
        }
      }
      console.log(result, msg);
      if (result === "error") {
        alert(msg);
      }
    }
    async cancelSubscription() {
      fetch(`${BASE_URL}/aion/payments/cancel_subscription`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${this.checkUserToken()}`
        }
      }).then((result) => {
        return result.json();
      }).catch((error) => {
        console.error("Something wrong when create a checkout session", error);
      });
    }
    async getSubscriptionInfo() {
      try {
        const response = await fetch(`${BASE_URL}/aion/payments/subscription`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${this.checkUserToken()}`
          }
        });
        return await this.handleResponse(response);
      } catch (error) {
        return null;
      }
    }
    async handleResponse(response) {
      if (!response.ok) {
        const errorData = await response.json();
        throw { status: response.status, message: errorData };
      }
      if (response.status !== 204) {
        const data = await response.json();
        return data;
      }
    }
    isValidCreditCardNumber(cardNumber) {
      cardNumber = cardNumber.replace(/\s/g, "").split("").reverse().join("");
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
  };

  // src/api/DashboardService.ts
  var paymentClient = new PaymentsClient();
  var _DashboardService = class {
    client;
    constructor(domain) {
      const bearerToken = AuthService.getToken();
      const baseUrl = `${BASE_URL}/aion/${domain}`;
      this.client = new RestClient(baseUrl, bearerToken);
    }
    static sendVerificationEmail() {
      const { client } = _DashboardService.getInstance();
      return client.get("email_verification", {});
    }
    static getInstance(domain = "users") {
      if (!_DashboardService.instance) {
        _DashboardService.instance = new _DashboardService(domain);
      }
      return _DashboardService.instance;
    }
    static async fetchRequests(offset = 0, limit = 10) {
      try {
        const { client } = _DashboardService.getInstance();
        const endpoint = `data?filters=requests&offset=${offset}&limit=${limit}`;
        return await client.get(endpoint).then((data) => data.requests.array);
      } catch (error) {
        console.error("getRequests:", error);
        return [];
      }
    }
    static async fetchUsageApi() {
      try {
        const { client } = _DashboardService.getInstance();
        const endpoint = `data?filters=all&offset=0&limit=1`;
        return await client.get(endpoint).then((data) => data.api);
      } catch (error) {
        console.error("fetchUsageApi:", error);
        return [];
      }
    }
    static async signUp() {
      try {
        const { client } = _DashboardService.getInstance();
        return await client.post("sign_up", {}).then(() => false).catch((error) => {
          throw error;
        });
      } catch (error) {
        console.error("signUp:", error);
        throw error;
      }
    }
    static async login() {
      try {
        const { client } = _DashboardService.getInstance();
        return await client.get("login");
      } catch (error) {
        console.error("login:", error);
      }
    }
    static async delete() {
      try {
        const { client } = _DashboardService.getInstance();
        AuthService.removeAuth();
        await client.delete("");
        return true;
      } catch (error) {
        console.error("delete:", error);
      }
    }
    static async fetchApiToken() {
      try {
        const { client } = _DashboardService.getInstance();
        return await client.post("api_token", {});
      } catch (error) {
        console.error("fetchApiToken:", error);
        console.error("fetchApiToken:", error);
      }
    }
    static async refreshApiToken() {
      try {
        const { client } = _DashboardService.getInstance();
        return await client.patch("api_token", {});
      } catch (error) {
        console.error("refreshApiToken:", error);
      }
    }
    static async fetchSubscriptionData() {
      const { client } = _DashboardService.getInstance();
      try {
        const endpoint = `data?filters=all&offset=0&limit=1`;
        return await client.get(endpoint).then((data) => data);
      } catch (error) {
        console.error("fetchSubscriptionData:", error);
      }
    }
    static async subscriptionInfo() {
      const planInfo = document.querySelector("#plan-info");
      const usageInfo = document.querySelector("#usage-info");
      const btnCancel = document.querySelector("#btn-cancel-plan");
      planInfo.classList.add("hide");
      usageInfo.classList.add("hide");
      btnCancel.classList.add("hide");
      const promises = [_DashboardService.fetchSubscriptionData(), paymentClient.getSubscriptionInfo()];
      const [data, subscription] = await Promise.all(promises);
      if (data?.plan.name === "Free") {
        planInfo.innerHTML = `<p>You're on the <span class="text-color-green">Free</span> plan. You have limits of 20 & 100 image and 5 audio checks per month via web & API, respectively.</p> 
                                  <p>If you need more, check out our <a class="text-color-green" href='https://${window.location.host}/#plans' >plans</a>.</p>`;
        usageInfo.innerHTML = `<p> You have used:</p> 
                                    <p style="margin-left: 1rem"> ${data?.usage?.web.image || 0} of 20 checks of image via web;</p> 
                                    <p style="margin-left: 1rem"> ${data?.usage?.api.image || 0} of 100 checks of image via API;</p> 
                                    <p style="margin-left: 1rem"> ${data?.usage?.web.audio + data?.usage?.api.audio} of 5 checks of audio for both web & API;</p>`;
        planInfo.classList.remove("hide");
        usageInfo.classList.remove("hide");
      } else {
        let text = `You're on the <span class="text-color-green">${data?.plan.name}</span> plan.`;
        let i = 0;
        let img_limit = 0;
        let aud_limit = 0;
        text = text + `<p>  You have quotas:</p>`;
        data.plan.quotas.forEach((quota) => {
          i += 1;
          if (quota.resource === "image")
            img_limit = quota.limit;
          if (quota.resource === "audio")
            aud_limit = quota.limit;
          text = text + `<p style="margin-left: 1rem"> <span>${i}.</span> <span style="margin-left: 0.4rem"> ${quota.limit} requests to check ${quota.resource} for both web & API.</span></p>`;
        });
        planInfo.innerHTML = text;
        usageInfo.innerHTML = `<p> You have used:</p> 
                                    <p style="margin-left: 1rem"> ${data?.usage?.web.image + data?.usage?.api.image} of ${img_limit} checks of image via both web & API;</p> 
                                    <p style="margin-left: 1rem"> ${data?.usage?.web.audio + data?.usage?.api.audio} of ${aud_limit} checks of audio for both web & API;</p>`;
        if (subscription?.subscription.meta?.was_canceled) {
          btnCancel.classList.add("hide");
          usageInfo.innerHTML = usageInfo.innerHTML + ` Your subscription has been canceled, expires on ${new Date(
            subscription?.subscription.expiration_dt
          ).toLocaleDateString()}.`;
        } else {
          btnCancel.classList.remove("hide");
        }
        planInfo.classList.remove("hide");
        usageInfo.classList.remove("hide");
      }
      btnCancel.addEventListener("click", async () => {
        if (data?.plan.name !== "Base" && data?.plan.name !== "Pro") {
          window.location.href = `https://${window.location.host}/contact-us`;
        } else {
          if (confirm("Are you sure you want to cancel your subscription?")) {
            alert("Your subscription has been canceled.");
            paymentClient.cancelSubscription().then((response) => {
              console.log(response);
            });
            window.location.href = `https://${window.location.host}/#plans`;
          } else {
            alert("Your subscription has not been canceled.");
          }
        }
      });
    }
    static async getUserInfo() {
      const { client } = _DashboardService.getInstance();
      try {
        return await client.get("");
      } catch (error) {
        console.error("getUserInfo:", error);
      }
    }
    static async getTransactions() {
      const { client } = new _DashboardService("payments");
      try {
        return await client.get("invoices");
      } catch (error) {
        console.error("getTransactions:", error);
      }
    }
  };
  var DashboardService = _DashboardService;
  __publicField(DashboardService, "instance", null);

  // src/api/AuthService.ts
  var _AuthService = class {
    constructor() {
    }
    static getUserInfo() {
      return DashboardService.getUserInfo();
    }
    static isAuth() {
      if (localStorage.getItem(_AuthService.token_key) !== null) {
        return true;
      }
      return false;
    }
    static setAuth() {
      localStorage.setItem(_AuthService.key, "true");
    }
    static removeAuth() {
      localStorage.removeItem(_AuthService.key);
    }
    static async init() {
      if (localStorage.getItem("_aion_in") === null) {
        try {
          await DashboardService.signUp();
          _AuthService.setAuth();
          await DashboardService.login();
          localStorage.setItem("_aion_in", "true");
        } catch (e) {
          console.log(e);
        }
      }
    }
    static getToken() {
      return localStorage.getItem("_ms-mid") ?? "";
    }
    static isExpiredToken() {
      const token = _AuthService.getToken();
      if (token?.length > 0) {
        const jwt = parseJwt(token);
        const current_time = Date.now() / 1e3;
        return jwt.exp < current_time;
      }
      return true;
    }
    static checkAuth(redirect_function) {
      if (!_AuthService.isAuth()) {
        const signInModalElement = document.getElementById("sign-up");
        signInModalElement.style.display = "flex";
        signInModalElement.style.zIndex = 100;
        redirect_function();
        return true;
      }
      return false;
    }
    static async sendVerifiedEmail() {
      console.log("sendVerifiedEmail");
      await DashboardService.sendVerificationEmail();
    }
  };
  var AuthService = _AuthService;
  __publicField(AuthService, "key", "isSignUp");
  __publicField(AuthService, "token_key", "_ms-mid");

  // src/pages/dashboard/settings.ts
  var initSettings = async () => {
    const btnVerifiedEmail = document.querySelector("#btn-verified-email");
    const btnDeleteAccount = document.querySelector("#btn-delete-account");
    const transactionsSection = document.querySelector("#transactions-section");
    const transactionsTable = document.querySelector("#transaction-table");
    const signOutBtn = document.querySelector("#sign-out");
    const urlParams = new URLSearchParams(window.location.search);
    const payment_success = urlParams.get("payment_success");
    const plan = payment_success?.split(" ")[0];
    if (payment_success) {
      showSuccessPaymentNotification(plan);
    }
    const styles2 = `
    .hide {
        display: none;
    }
    
    .table, th, td {
      border: 0.1rem solid #505358;
      border-collapse: collapse;
    }
    
    .cell {
        display: flex;
        justify-content: right;
        align-items: center;
        padding: 0.5rem;
    }
    
`;
    const style2 = document.createElement("style");
    style2.innerHTML = styles2;
    document.head.appendChild(style2);
    AuthService.init();
    DashboardService.subscriptionInfo().then((response) => {
    });
    btnVerifiedEmail.classList.remove("hide");
    AuthService.getUserInfo().then((userInfo) => {
      if (userInfo.is_verified) {
        btnVerifiedEmail.innerHTML = "Email has been verified";
        btnVerifiedEmail.classList.remove("settings-edit");
        btnVerifiedEmail.disable = true;
      } else {
        btnVerifiedEmail.classList.remove("hide");
        btnVerifiedEmail.onclick = async () => {
          btnVerifiedEmail.classList.add("hide");
          await AuthService.sendVerifiedEmail();
          alert("Email sent. Check your inbox.");
        };
      }
    });
    signOutBtn.onclick = () => {
      AuthService.removeAuth();
      localStorage.removeItem("_aion_in");
    };
    btnDeleteAccount.onclick = async () => {
      if (confirm("Are you sure you want to delete your account?")) {
        await AuthService.init();
        const res = await DashboardService.delete();
        if (!res) {
          alert("Something went wrong. Please try again later.");
          return;
        }
        localStorage.removeItem("_aion_in");
        alert("Your account has been deleted.");
        window.location.href = `https://${window.location.host}/`;
      }
    };
    transactionsTable.innerHTML = `
        <table id="table" class="table" style="width: 100%">
        <thead>
            <tr>
                <th style="width: 5%">#</th>
                <th>Date</th>
                <th>Amount</th>
                <th>Status</th>
                <th>Invoice</th>
            </tr>
        </thead>
        <tbody>
            <!-- Existing rows go here -->
        </tbody>
    </table>
`;
    function addRow(transaction) {
      const table = document.getElementById("table")?.getElementsByTagName("tbody")[0];
      const newRow = table?.insertRow(table.rows.length);
      const cell1 = newRow?.insertCell(0);
      const cell2 = newRow?.insertCell(1);
      const cell3 = newRow?.insertCell(2);
      const cell4 = newRow?.insertCell(3);
      const cell5 = newRow?.insertCell(4);
      cell1.innerHTML = `<p class="cell"> ${transaction.num} </p>`;
      cell2.innerHTML = `<p class="cell"> ${transaction.name} </p>`;
      cell3.innerHTML = `<p class="cell"> ${transaction.amount} </p>`;
      cell4.innerHTML = `<p class="cell" style="color: ${transaction.status === "paid" ? "#00D924" : "red"}" > ${transaction.status} </p>`;
      if (transaction.status !== "draft") {
        cell5.innerHTML = `<a class="cell" href="${transaction.invoice_link}" target="_blank" style="text-decoration: underline"> Invoice </a>`;
      }
    }
    DashboardService.getTransactions().then(({ invoices }) => {
      invoices.forEach((invoice, index) => {
        addRow({
          num: index + 1,
          name: invoice?.created_dt,
          amount: `$${invoice?.amount}`,
          status: invoice?.status,
          invoice_link: invoice?.link
        });
        transactionsSection.classList.remove("hide");
      });
    });
  };
  initSettings();
})();
//# sourceMappingURL=settings.js.map
