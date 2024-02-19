"use strict";
(() => {
  var __create = Object.create;
  var __defProp = Object.defineProperty;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __getProtoOf = Object.getPrototypeOf;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
  var __require = /* @__PURE__ */ ((x) => typeof require !== "undefined" ? require : typeof Proxy !== "undefined" ? new Proxy(x, {
    get: (a, b) => (typeof require !== "undefined" ? require : a)[b]
  }) : x)(function(x) {
    if (typeof require !== "undefined")
      return require.apply(this, arguments);
    throw new Error('Dynamic require of "' + x + '" is not supported');
  });
  var __copyProps = (to, from, except, desc) => {
    if (from && typeof from === "object" || typeof from === "function") {
      for (let key of __getOwnPropNames(from))
        if (!__hasOwnProp.call(to, key) && key !== except)
          __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
    }
    return to;
  };
  var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
    // If the importer is in node compatibility mode or this is not an ESM
    // file that has been converted to a CommonJS file using a Babel-
    // compatible transform (i.e. "__esModule" has not been set), then set
    // "default" to the CommonJS "module.exports" for node compatibility.
    isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
    mod
  ));
  var __publicField = (obj, key, value) => {
    __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
    return value;
  };

  // bin/live-reload.js
  new EventSource(`${"http://localhost:3000"}/esbuild`).addEventListener("change", () => location.reload());

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
  var BASE_URL_RESULTS = "https://results.aiornot.com";
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
  var showSuccessDowngradePlanNotification = (credit, plan) => {
    showToastNotification(
      `<p style="font-size: 1.5rem; padding: 2rem;">We are pleased to inform you that you currently have a credit of $${credit} from a previous paid subscription after that we successfully update your plan to <span style="color: #aefc06; font-weight: bold ">${plan.split(" ")[0]}</span>! If you have any questions please contact us.</p>`
    );
  };
  var showBadImageQualityNotification = () => {
    showToastNotification(
      `<p style="font-size: 1.5rem; padding: 2rem; color: red">The current image quality is insufficient, thus the results may be inaccurate.</p>`,
      "error"
    );
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

  // src/api/AIGeneratedService.ts
  var _AIGeneratedService = class {
    client;
    constructor() {
      const bearerToken = AuthService.getToken();
      const baseUrl = `${BASE_URL}/aion/ai-generated`;
      this.client = new RestClient(baseUrl, bearerToken);
    }
    static getInstance() {
      if (!_AIGeneratedService.instance) {
        _AIGeneratedService.instance = new _AIGeneratedService();
      }
      return _AIGeneratedService.instance;
    }
    static async getReportsByBinary(file) {
      const { client } = _AIGeneratedService.getInstance();
      try {
        const formData = new FormData();
        formData.append("binary", file, "uploaded-file.png");
        return await client.postBinary("reports/binary", formData);
      } catch (error) {
        if (error.status === 402) {
          alert("Please verify your email to continue using the service");
        }
        if (error.status === 429) {
          alert(
            `It looks like you have reached your plan limit of ${error.message.current_limit} requests. To continue, please upgrade to a new plan.`
          );
          window.location.href = `https://${window.location.host}/#plans`;
        }
        console.error("Error getReportsByBinary:", error);
      }
    }
    static async getReportsByUrl(url) {
      const { client } = _AIGeneratedService.getInstance();
      try {
        const endpoint = `reports/url?url=${url}`;
        return await client.post(endpoint, {});
      } catch (error) {
        if (error.status === 402) {
          alert("Please verify your email to continue using the service");
        }
        if (error.status === 429) {
          alert(
            `It looks like you have reached your plan limit of ${error.message.current_limit} requests. To continue, please upgrade to a new plan.`
          );
          window.location.href = `https://${window.location.host}/#plans`;
        }
        console.error("getReportsByUrl:", error);
      }
    }
    static async getAudioVerdict(file) {
      const { client } = _AIGeneratedService.getInstance();
      try {
        const formData = new FormData();
        formData.append("file", file);
        return await client.postBinary("reports/audio/binary", formData);
      } catch (error) {
        if (error.status === 402) {
          alert("Please verify your email to continue using the service");
        }
        if (error.status === 429) {
          alert(
            `It looks like you have reached your plan limit of ${error.message.current_limit} requests. To continue, please upgrade to a new plan.`
          );
          window.location.href = `https://${window.location.host}/#plans`;
        }
        console.error("Error getAudioVerdict:", error);
      }
    }
    static async getYoutubeVerdict(link) {
      const { client } = _AIGeneratedService.getInstance();
      try {
        const body = {
          url: link
        };
        return await client.post("reports/audio/link", body);
      } catch (error) {
        if (error.status === 402) {
          alert("Please verify your email to continue using the service");
        }
        if (error.status === 429) {
          alert(
            `It looks like you have reached your plan limit of ${error.message.current_limit} requests. To continue, please upgrade to a new plan.`
          );
          window.location.href = `https://${window.location.host}/#plans`;
        }
        console.error("Error getYoutubeVerdict:", error);
      }
    }
    static async getPdetReportByUrl(url) {
      const { client } = _AIGeneratedService.getInstance();
      try {
        const body = {
          object: url
        };
        return await client.post("reports/person_detection/url", body);
      } catch (error) {
        if (error.status === 402) {
          alert("Please verify your email to continue using the service");
        }
        if (error.status === 429) {
          alert(
            `It looks like you have reached your plan limit of ${error.message.current_limit} requests. To continue, please upgrade to a new plan.`
          );
          window.location.href = `https://${window.location.host}/#plans`;
        }
        console.error("Error getYoutubeVerdict:", error);
      }
    }
    static async getPdetReportByBinary(file) {
      const { client } = _AIGeneratedService.getInstance();
      try {
        const formData = new FormData();
        formData.append("file", file, "uploaded-file.png");
        return await client.postBinary("reports/person_detection/binary", formData);
      } catch (error) {
        if (error.status === 402) {
          alert("Please verify your email to continue using the service");
        }
        if (error.status === 429) {
          alert(
            `It looks like you have reached your plan limit of ${error.message.current_limit} requests. To continue, please upgrade to a new plan.`
          );
          window.location.href = `https://${window.location.host}/#plans`;
        }
        console.error("Error getReportsByBinary:", error);
      }
    }
  };
  var AIGeneratedService = _AIGeneratedService;
  __publicField(AIGeneratedService, "instance", null);

  // src/api/OpenAIGeneratedService.ts
  var OpenAIGeneratedService = class {
    constructor() {
    }
    static async getReportsByBinary(file, visitorId2) {
      const baseUrl = `${BASE_URL}/results/api/detector/reports/raw?source=web&user_id=${visitorId2}`;
      const formData = new FormData();
      formData.append("binary", file, "file_name.png");
      const options = {
        method: "POST",
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${AuthService.getToken()}`
        },
        body: formData
      };
      return await fetch(baseUrl, options).then((response) => response.json());
    }
    static async getReportsByUrl(url, visitorId2) {
      const baseUrl = `${BASE_URL}/results/api/detector/reports/json?source=web&user_id=${visitorId2}`;
      const options = {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${AuthService.getToken()}`
        },
        body: JSON.stringify({
          object: url
        })
      };
      return await fetch(baseUrl, options).then((response) => response.json());
    }
    static async sendFeedback(id, reportPredict, reportComment, isAudio = false) {
      const body = {
        is_proper_predict: reportPredict,
        comment: reportComment
      };
      let url = `${BASE_URL}/results/api/detector/reports/result/${id}`;
      let options = {
        method: "PUT",
        body: JSON.stringify(body),
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        }
      };
      if (isAudio || !AuthService.isExpiredToken()) {
        url = `${BASE_URL}/aion/ai-generated/reports/${id}`;
        options = {
          method: "PATCH",
          body: JSON.stringify(body),
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
          }
        };
      }
      await fetch(url, options).then((response) => response.json()).then((data) => console.log(data)).catch((error) => console.error(error));
    }
    static async getAudioVerdict(file) {
      const baseUrl = `${BASE_URL}/aion/ai-generated/reports/audio/binary`;
      const formData = new FormData();
      formData.append("file", file);
      const options = {
        method: "POST",
        headers: {
          Accept: "application/json",
          ContentType: "multipart/form-data"
        },
        body: formData
      };
      return await fetch(baseUrl, options).then((response) => response.json());
    }
    static async getYoutubeVerdict(link) {
      const baseUrl = `${BASE_URL}/aion/ai-generated/reports/audio/link`;
      const options = {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          url: link
        })
      };
      return await fetch(baseUrl, options).then((response) => response.json());
    }
  };

  // src/api/RequestCounter.ts
  var _RequestCounter = class {
    constructor() {
    }
    static isLimitExceeded() {
      if (!AuthService.isExpiredToken()) {
        return false;
      }
      return true;
    }
    static increment() {
      const count = localStorage.getItem(_RequestCounter.key);
      const newCount = count === null ? 1 : Number(count) + 1;
      localStorage.setItem(_RequestCounter.key, newCount.toString());
    }
  };
  var RequestCounter = _RequestCounter;
  __publicField(RequestCounter, "key", "requestCount");

  // src/api/WrapperAIGeneratedService.ts
  var WrapperAIGeneratedService = class {
    static async getReportsByBinary(file, visitorId2) {
      if (AuthService.isExpiredToken()) {
        return await OpenAIGeneratedService.getReportsByBinary(file, visitorId2);
      }
      return await AIGeneratedService.getReportsByBinary(file);
    }
    static async getReportsByUrl(url, visitorId2) {
      if (AuthService.isExpiredToken()) {
        return await OpenAIGeneratedService.getReportsByUrl(url, visitorId2);
      }
      return await AIGeneratedService.getReportsByUrl(url);
    }
    static async getAudioVerictByFile(file) {
      return await AIGeneratedService.getAudioVerdict(file);
    }
    static async getAudioVerictMock(verdict) {
      const delay = (ms, value) => {
        return new Promise((resolve) => {
          setTimeout(() => {
            resolve(value);
          }, ms);
        });
      };
      const result = await delay(1500, verdict);
      return JSON.parse(`{
            "id": "41994fdd-0161-43a9-b873-581eccbe6d72",
            "report": {
                "version": "0.0.0",
                "verdict": ${result}
            }
        }`);
    }
    static async getYoutubeVerict(link) {
      if (AuthService.isExpiredToken()) {
        return await OpenAIGeneratedService.getYoutubeVerdict(link);
      }
      return await AIGeneratedService.getYoutubeVerdict(link);
    }
    static async getPdetReportByUrl(url) {
      return await AIGeneratedService.getPdetReportByUrl(url);
    }
    static async getPdetReportByBinary(file) {
      return await AIGeneratedService.getPdetReportByBinary(file);
    }
    static async sendFeedback(id, reportPredict, reportComment, isAudio = false) {
      return await OpenAIGeneratedService.sendFeedback(id, reportPredict, reportComment, isAudio);
    }
  };

  // src/utils/common.ts
  var loadingStart = () => {
    document.querySelector("#processing-screen").classList.remove("hide");
    document.querySelector(".processing-screen_triggers_5").click();
    document.querySelector(".processing-screen_triggers_1").click();
  };
  var loadingEnd = () => {
    document.querySelector("#processing-screen").classList.add("hide");
  };
  var fetchUserUsage = () => {
    if (AuthService.isAuth()) {
      DashboardService.fetchSubscriptionData().then((user_plan) => {
        if (user_plan) {
          localStorage.setItem("user_plan", JSON.stringify(user_plan));
        }
      });
    }
  };
  var uiShowUserUsage = (usage_element, resource = "image") => {
    if (AuthService.isAuth()) {
      const plan = JSON.parse(localStorage.getItem("user_plan")) || {};
      if (plan) {
        let limit;
        let q_interface;
        plan.plan?.quotas.forEach((quota) => {
          if (quota.resource === resource && quota.interface.includes("web")) {
            limit = quota.limit;
            q_interface = quota.interface;
          }
        });
        let usage = 0;
        if (q_interface.length > 0) {
          q_interface.forEach((interface_name) => {
            usage = usage + plan.usage[interface_name][resource];
          });
        }
        usage_element.innerHTML = `
            <div style="margin-top: 20px; font-size: 1rem; color: white">
            <span">
                Available ${limit - usage} from ${limit} web checks
            </span>
            </div>`;
      }
    }
  };
  var goSignIn = () => {
    window.location.href = "/sign-in";
  };

  // src/utils/tabs.ts
  var imageTab = document.getElementById("image-tab");
  var audioTab = document.getElementById("audio-tab");
  var pdetTab = document.getElementById("pdet-tab");
  function activeTab() {
    if (imageTab.classList.contains("w--current")) {
      return "image";
    }
    if (audioTab.classList.contains("w--current")) {
      return "audio";
    }
    if (pdetTab.classList.contains("w--current")) {
      return "pdet";
    }
  }

  // src/dashboard/AML.ts
  var personaDetectionInit = () => {
    if (window.location.host.includes("webflow")) {
      document.querySelector("#pdet-tab")?.classList.remove("hide");
    }
    const testImages = document.querySelectorAll("#pdet-test-image");
    const inputEl_fileInput = document.querySelector("#pdet-file-input");
    const imageEl_currentImage = document.querySelector("#aion-pdet-current-image");
    const imageEl_currentImageEmpty = document.querySelector("#pdet-empty-preview-img");
    const imageEl_nsfwImage = document.querySelector("#pdet-nsfw-preview-img");
    const imageUrlInput = document.querySelector("#aion-pdet-image-url");
    const submitButton2 = document.querySelector("#aion-pdet-url-submit");
    const uiEl_dropZone = document.querySelector("#aion-pdet-dropzone");
    const textEl_dropZoneError = document.querySelector("#aion-pdet-dropzone-text");
    const btnAmlTab = document.getElementById("pdet-tab");
    let pastedUrl;
    let fileSizeAllow;
    btnAmlTab.addEventListener("click", () => {
      uiTabInitialState();
    });
    const uiTabInitialState = () => {
      document.querySelector("#pdet-hero-home-title-description")?.classList.remove("hide");
      document.querySelector("#pdet-hero-home-gallery")?.classList.remove("hide");
      document.querySelector("#aion-pdet-dropzone")?.classList.remove("hide");
      document.querySelector("#pdet-button-report-true")?.classList.remove("hide");
      document.querySelector("#pdet-button-report-false")?.classList.remove("hide");
      document.querySelector("#pdet-hero-home_drop-zone-divider")?.classList.remove("hide");
      imageEl_currentImage.classList.add("hide");
      document.querySelector("#result-screen-pdet-wrapper")?.classList.add("hide");
      imageEl_currentImage.classList.add("hide");
      document.querySelector("#pdet-result-screen-col")?.classList.add("hide");
      document.getElementById("pdet-title-human").classList.add("hide");
      imageUrlInput.value = "";
    };
    const uiReported_initialState = () => {
      document.querySelector("#pdet-hero-home-title-description")?.classList.add("hide");
      document.querySelector("#pdet-hero-home-gallery")?.classList.add("hide");
      document.querySelector("#aion-pdet-dropzone")?.classList.add("hide");
      document.querySelector("#pdet-button-report-true")?.classList.add("hide");
      document.querySelector("#pdet-button-report-false")?.classList.add("hide");
      document.querySelector("#pdet-hero-home_drop-zone-divider")?.classList.add("hide");
    };
    const someThingWentWrong_error = () => {
      uiEl_dropZone.classList.add("red-border");
      textEl_dropZoneError.textContent = "Something went wrong. Try again.";
      textEl_dropZoneError.classList.add("error");
    };
    inputEl_fileInput?.addEventListener("change", () => {
      const fileSize = inputEl_fileInput?.files[0].size;
      const maxSize = 10 * 1024 * 1024;
      if (fileSize > maxSize) {
        fileSizeAllow = false;
      } else {
        fileSizeAllow = true;
      }
    });
    function pdetLoadingFinish(nsfw_detected = false, verdict, url) {
      uiReported_initialState();
      loadingEnd();
      if (nsfw_detected) {
      } else {
        imageEl_nsfwImage.classList.add("hide");
        imageEl_currentImage.classList.remove("hide");
        imageEl_currentImageEmpty.classList.add("hide");
        document.querySelector("#result-screen-pdet-wrapper")?.classList.remove("hide");
        imageEl_currentImage.classList.remove("hide");
        imageEl_currentImage.src = url;
        document.querySelector("#pdet-result-screen-col")?.classList.remove("hide");
        document.getElementById("pdet-title-human").classList.remove("hide");
        document.getElementById("pdet-title-human").innerHTML = `This is likely <span class="text-color-green">${verdict}</span><div style="font-size: 1rem; color: #FFFFFFB3; font-family: Space Grotesk, sans-serif;">
<span> Free Research Preview. AI or Not may produce inaccurate results </span>
</div>`;
      }
      imageUrlInput.value = "";
    }
    const pdetPostToApiUrl = async () => {
      await WrapperAIGeneratedService.getPdetReportByUrl(pastedUrl).then((response) => {
        pdetLoadingFinish(response.nsfw_detected, response?.verdict ? "AI" : "Human", response.url);
        if (response.good_quality === false) {
          showBadImageQualityNotification();
        }
      }).catch((error) => {
        loadingEnd();
        someThingWentWrong_error();
      });
    };
    const pdetPostToApiBinaryFile = async (file) => {
      loadingStart();
      const currentImage = document.querySelector("#ai-or-not-current-image");
      const currentImageUrl = URL.createObjectURL(file);
      currentImage.setAttribute("src", currentImageUrl);
      imageEl_currentImage.classList.remove("hide");
      imageEl_currentImageEmpty.classList.add("hide");
      await WrapperAIGeneratedService.getPdetReportByBinary(file).then((response) => {
        pdetLoadingFinish(response.nsfw_detected, response?.verdict ? "AI" : "Human", response.url);
        if (response.good_quality === false) {
          showBadImageQualityNotification();
        }
      }).catch((error) => {
        loadingEnd();
        someThingWentWrong_error();
      });
    };
    const dropzone = document.body;
    dropzone?.addEventListener("dragover", function(event) {
      event.preventDefault();
      document.querySelector(".dropzone-fullscreen").classList.remove("hide");
    });
    dropzone?.addEventListener("dragleave", function(event) {
      event.preventDefault();
      document.querySelector(".dropzone-fullscreen").classList.add("hide");
    });
    dropzone?.addEventListener("drop", async function(event) {
      if (activeTab() !== "pdet") {
        return;
      }
      event.preventDefault();
      document.querySelector(".dropzone-fullscreen").classList.add("hide");
      const file = event.dataTransfer.files[0];
      const fileSize = file.size;
      const maxSize = 10 * 1024 * 1024;
      if (fileSize > maxSize) {
        fileSizeAllow = false;
      } else {
        fileSizeAllow = true;
      }
      if (fileSizeAllow === true) {
        imageEl_currentImage.src = "";
        await pdetPostToApiBinaryFile(file);
      } else {
        someThingWentWrong_error();
      }
    });
    inputEl_fileInput?.addEventListener("change", async (event) => {
      if (fileSizeAllow == true) {
        const fileInput = inputEl_fileInput;
        const file = fileInput.files[0];
        imageEl_currentImage.src = "";
        await pdetPostToApiBinaryFile(file);
      } else {
        console.log("fileSizeAllow");
        someThingWentWrong_error();
      }
    });
    uiEl_dropZone?.addEventListener("click", function() {
      if (AuthService.checkAuth(goSignIn))
        return;
      inputEl_fileInput.click();
    });
    document.querySelector("#choose-file-row")?.addEventListener("click", function() {
      inputEl_fileInput.click();
    });
    submitButton2?.addEventListener("click", () => {
      loadingStart();
      if (imageUrlInput.value !== "") {
        pastedUrl = imageUrlInput.value;
        imageEl_currentImage.src = imageUrlInput.value;
        pdetPostToApiUrl();
      }
    });
    imageUrlInput.addEventListener("input", function() {
      const imageUrl = imageUrlInput.value.trim();
      if (isValidUrl(imageUrl)) {
        submitButton2.classList.remove("is-disabled");
      } else {
        submitButton2.classList.add("is-disabled");
      }
    });
    const isValidUrl = (url) => {
      try {
        new URL(url);
        return true;
      } catch (e) {
        return false;
      }
    };
    testImages.forEach((testImage) => {
      testImage.addEventListener("click", () => {
        const testImageUrl = testImage.getAttribute("test-image-url");
        imageUrlInput.value = testImageUrl;
        submitButton2.click();
        imageUrlInput.value = "";
      });
    });
    uiShowUserUsage(document.querySelector("#pdet-quotas"));
  };

  // src/utils/fingerprint.ts
  var visitorId;
  var fpPromise = import("https://openfpcdn.io/fingerprintjs/v3").then((FingerprintJS) => FingerprintJS.load());
  var initFingerPrint = async () => {
    visitorId = await fpPromise.then((fp) => fp.get()).then((result) => {
      return result.visitorId;
    });
  };

  // src/dashboard/ContactUs.ts
  var submitButton = document.querySelector("#contact-us-submit-button");
  var name = document.querySelector("#name");
  var email = document.querySelector("#E-Mail");
  var note = document.querySelector("#Note");
  var company = document.querySelector("#Company");
  if (submitButton) {
    submitButton.classList.remove("is-disabled");
    submitButton.addEventListener("click", async (event) => {
      event.preventDefault();
      const response = {
        name: name.value,
        email: email.value,
        note: note.value,
        company: company.value
      };
      for (const key in response) {
        if (key === "company")
          continue;
        if (response[key] === "") {
          alert(`Please fill in all required fields ${key}`);
          return;
        }
      }
      console.log(response);
      fetch(`${BASE_URL}/aion/system/post_message`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(response)
      }).then((response2) => {
        if (response2.ok) {
          alert("Thank you for your application! We will contact you shortly.");
          window.location.href = "https://aiornot.com/";
        } else {
          alert("Something went wrong. Please try again.");
        }
      });
    });
  }

  // src/dashboard/ImageElements.ts
  var init = () => {
    const imageTab2 = document.getElementById("image-tab");
    const reportScreen = document.getElementById("report-screen");
    const reportButton_submit = document.querySelector("#button-report-submit");
    const reportInput = document.querySelector("#input-report-comment");
    const reportButton_true = document.querySelector("#button-report_true");
    const reportButton_false = document.querySelector("#button-report_false");
    const reportButton_close = document.querySelector("#button-report_close");
    const uiEl_urlError = document.querySelector("#url-error-message");
    const buttonEl_processClose = document.querySelector("#processing_cancel");
    const inputEl_fileInput = document.querySelector("#image-file-input");
    const imageEl_currentImage = document.querySelector("#ai-or-not-current-image");
    const imageEl_currentImageEmpty = document.querySelector("#empty-preview-img");
    const imageEl_nsfwImage = document.querySelector("#nsfw-preview-img");
    const textEl_inputError = document.querySelector("#input-error-text");
    const inputEl_urlWaiter = document.querySelector("#ai-or-not_image-url");
    const buttonEl_urlCheck = document.querySelector("#image-url-aion-submit");
    const uiEl_dropZone = document.querySelector("#ai-or-not_dropzone");
    const textEl_dropZoneError = document.querySelector("#ai-or-not_dropzone-text");
    const uiEl_resultCol = document.querySelector("#result-screen_col");
    const buttonEl_sharedButtons = document.querySelector("#share-items-hide");
    const counterEl_requestCounterValue = document.querySelector("#ai-or-not-dropzone-counter");
    const counterEl_requestCounterBlock = document.querySelector("#ai-or-not-dropzone-counter-w");
    const testImages = document.querySelectorAll("#image-test-image");
    const btnImgTab = document.getElementById("image-tab");
    btnImgTab.addEventListener("click", () => {
      screen_homeShow();
    });
    const notionLink = document.querySelector("#w-node-_80502d56-29f7-2965-16f1-d6c6c4ebbd86-c4ebbd86");
    notionLink.classList.add("hide");
    buttonEl_sharedButtons.classList.add("hide");
    function activeTab2() {
      if (imageTab2.classList.contains("w--current")) {
        return "image";
      }
      return "audio";
    }
    let pastedUrl;
    let fileUpload_way;
    let fileSizeAllow;
    let currentResultId;
    initFingerPrint();
    const uiReported_false = () => {
      const buttonText = document.querySelector("#button-report_false-text");
      buttonText.classList.remove("hide");
      buttonText.textContent = buttonText.getAttribute("report-button-text-default_reported");
      reportButton_false.classList.add("is-reported");
      reportButton_true.classList.add("hide");
    };
    const uiReported_true = () => {
      const buttonText = document.querySelector("#button-report_true-text");
      buttonText.classList.remove("hide");
      buttonText.textContent = buttonText.getAttribute("report-button-text-default_reported");
      reportButton_true.classList.add("is-reported");
      reportButton_false.classList.add("hide");
    };
    const uiReported_initialState = () => {
      reportInput.value = "";
      const buttonText_true = document.querySelector("#button-report_true-text");
      const buttonText_false = document.querySelector("#button-report_false-text");
      buttonText_false.classList.add("hide");
      buttonText_true.classList.remove("hide");
      buttonText_true.textContent = buttonText_true.getAttribute("report-button-text-default");
      buttonText_false.textContent = buttonText_false.getAttribute("report-button-text-default");
      reportButton_true.classList.remove("is-reported");
      reportButton_false.classList.remove("is-reported");
      reportButton_true.classList.remove("hide");
      reportButton_false.classList.remove("hide");
    };
    const changeShareUrl = (responseId) => {
      currentResultId = responseId;
      const element2 = document.querySelector('[fs-socialshare-element="url"]');
      const shareUrlTemplate = AuthService.isExpiredToken() ? `${BASE_URL_RESULTS}/aiornot/` : `${BASE_URL_RESULTS}/aiornot/users/`;
      const shareUrl = `${shareUrlTemplate}${responseId}`;
      element2.textContent = shareUrl;
      const allShareUrl = document.querySelectorAll(".result-screen_share-item");
      allShareUrl.forEach((el) => {
        el.setAttribute("data-url", shareUrl);
      });
    };
    const fileSizeMessage_ok = () => {
      textEl_dropZoneError.textContent = "We support jpeg, png, webp, gif, tiff, bmp. 10 Mb of maximum size.";
      textEl_dropZoneError.classList.remove("text-color-red");
      textEl_inputError.textContent = "Something went wrong. Try again.";
      uiEl_urlError.classList.add("hide");
    };
    const someThingWentWrong_error = () => {
      uiEl_urlError.classList.remove("hide");
    };
    const someThingWentWrong_ok = () => {
      uiEl_urlError.classList.add("hide");
    };
    const fileSizeMessage_error = () => {
      if (uiEl_resultCol.classList.contains("hide")) {
        textEl_dropZoneError.textContent = "File is too large (max 10 MB)";
        textEl_dropZoneError.classList.add("text-color-red");
      } else {
        textEl_inputError.textContent = "File is too large (max 10 MB)";
        uiEl_urlError.classList.remove("hide");
      }
    };
    inputEl_fileInput?.addEventListener("change", () => {
      const fileSize = inputEl_fileInput?.files[0].size;
      const maxSize = 10 * 1024 * 1024;
      if (fileSize > maxSize) {
        fileSizeAllow = false;
        fileSizeMessage_error();
      } else {
        fileSizeAllow = true;
        fileSizeMessage_ok();
      }
    });
    const error_dropZone = () => {
      document.querySelector("#processing-screen").classList.add("hide");
      textEl_dropZoneError.classList.add("error");
      uiEl_dropZone.classList.add("red-border");
      textEl_dropZoneError.textContent = "Something went wrong. Try again.";
    };
    const initial_dropZone = () => {
      textEl_dropZoneError.classList.remove("error");
      uiEl_dropZone.classList.remove("red-border");
      textEl_dropZoneError.textContent = "We support jpeg, png, webp, gif, tiff, bmp. 10 Mb of maximum size.";
    };
    const screen_homeShow = () => {
      document.querySelector("#choose-file-row").classList.add("hide");
      document.querySelector("#legal-tip").classList.remove("hide");
      document.querySelector("#processing-screen").classList.add("hide");
      document.querySelector("#hero-home_title-description").classList.remove("hide");
      document.querySelector("#hero-home_gallery").classList.remove("hide");
      document.querySelector("#ai-or-not_dropzone").classList.remove("hide");
      document.querySelector("#hero-home_drop-zone-divider").classList.remove("hide");
      document.querySelector("#result-screen_col").classList.add("hide");
      document.querySelector("#result-screen_image-wrapper").classList.add("hide");
      imageEl_currentImage.classList.add("hide");
      imageEl_currentImageEmpty.classList.remove("hide");
      imageEl_nsfwImage.classList.remove("hide");
    };
    const loadingStart2 = () => {
      uiReported_initialState();
      imageEl_currentImage.src = "";
      someThingWentWrong_ok();
      textEl_inputError.textContent = "Something went wrong. Try again.";
      document.querySelector("#choose-file-row").classList.remove("hide");
      document.querySelector("#legal-tip").classList.add("hide");
      document.querySelector(".processing-screen_triggers_5").click();
      document.querySelector("#processing-screen").classList.remove("hide");
      document.querySelector(".processing-screen_triggers_1").click();
      document.querySelector("#hero-home_title-description").classList.add("hide");
      document.querySelector("#hero-home_gallery").classList.add("hide");
      document.querySelector("#ai-or-not_dropzone").classList.add("hide");
      document.querySelector("#hero-home_drop-zone-divider").classList.add("hide");
      document.querySelector("#result-screen_col").classList.remove("hide");
      document.querySelector("#result-screen_image-wrapper").classList.remove("hide");
    };
    function loadingFinish(nsfw_detected = false) {
      if (nsfw_detected) {
        imageEl_nsfwImage.classList.remove("hide");
        imageEl_currentImage.classList.add("hide");
        imageEl_currentImageEmpty.classList.add("hide");
        buttonEl_sharedButtons.classList.add("hide");
      } else {
        imageEl_nsfwImage.classList.add("hide");
        imageEl_currentImage.classList.remove("hide");
        imageEl_currentImageEmpty.classList.add("hide");
      }
      document.querySelector(".processing-screen_triggers_3").click();
      document.querySelector("#processing-screen").classList.add("hide");
      document.querySelector(".processing-screen_triggers_5").click();
      inputEl_fileInput.value = "";
      document.querySelector("#ai-or-not_image-url").value = "";
    }
    const findHighestConfidence = (data) => {
      if (data === "unknown") {
        document.getElementById("title-human").innerHTML = "Sorry, but in this case we can't really say if it's AI or Not";
        document.getElementById("ai-or-not_result-message-50").classList.remove("hide");
        document.getElementById("ai-or-not_result-message").classList.add("hide");
        document.getElementById("ai-or-not_result-message-50").innerHTML = "Probly the uploaded image has most likely been modified or compressed";
        document.getElementById("title-human").classList.remove("hide");
        document.getElementById("title-ai").classList.add("hide");
      } else {
        document.getElementById("title-ai").innerHTML = 'This is likely <span class="text-color-green">AI</span> <div style="font-size: 1rem; color: #FFFFFFB3; font-family: Space Grotesk, sans-serif;">\n<span> Free Research Preview. AI or Not may produce inaccurate results </span>\n</div>';
        document.getElementById("title-human").innerHTML = 'This is likely <span class="text-color-green">Human</span><div style="font-size: 1rem; color: #FFFFFFB3; font-family: Space Grotesk, sans-serif;">\n<span> Free Research Preview. AI or Not may produce inaccurate results </span>\n</div>';
        document.getElementById("ai-or-not_result-message-50").classList.add("hide");
        document.getElementById("ai-or-not_result-message").classList.remove("hide");
        document.querySelector("#ai-or-not_model-name").textContent = data;
        if (data === "ai") {
          document.getElementById("title-human").classList.add("hide");
          document.getElementById("title-ai").classList.remove("hide");
        } else {
          document.getElementById("title-human").classList.remove("hide");
          document.getElementById("title-ai").classList.add("hide");
        }
      }
    };
    const postToApi_url = async () => {
      if (RequestCounter.isLimitExceeded()) {
        const signInModalElement = document.getElementById("sign-up");
        signInModalElement.style.display = "flex";
        signInModalElement.style.zIndex = 100;
        screen_homeShow();
      } else {
        uiEl_urlError.classList.add("hide");
        loadingStart2();
        await WrapperAIGeneratedService.getReportsByUrl(pastedUrl, visitorId).then((response) => {
          RequestCounter.increment();
          changeShareUrl(response.id);
          imageEl_currentImage.src = pastedUrl;
          findHighestConfidence(response.verdict);
          loadingFinish(response.nsfw_detected);
          if (response.good_quality === false) {
            showBadImageQualityNotification();
          }
        }).catch((error) => {
          if (uiEl_resultCol.classList.contains("hide")) {
            someThingWentWrong_error();
          } else {
            someThingWentWrong_error();
            screen_homeShow();
          }
        });
      }
    };
    const dropzone = document.body;
    const tipMessage = document.querySelector("#dropzone-fullscreen_message-tip");
    const formatMessage = document.querySelector("#dropzone-fullscreen_message-format");
    dropzone?.addEventListener("dragover", function(event) {
      event.preventDefault();
      document.querySelector(".dropzone-fullscreen").classList.remove("hide");
    });
    dropzone?.addEventListener("dragleave", function(event) {
      event.preventDefault();
      document.querySelector(".dropzone-fullscreen").classList.add("hide");
    });
    dropzone?.addEventListener("drop", async function(event) {
      if (activeTab2() !== "image") {
        return;
      }
      event.preventDefault();
      document.querySelector(".dropzone-fullscreen").classList.add("hide");
      const file = event.dataTransfer.files[0];
      const fileSize = file.size;
      const maxSize = 10 * 1024 * 1024;
      if (fileSize > maxSize) {
        fileSizeAllow = false;
        fileSizeMessage_error();
      } else {
        fileSizeAllow = true;
        fileSizeMessage_ok();
      }
      if (fileSizeAllow === true) {
        await uploadBinaryFile(file);
      } else {
        fileSizeMessage_error();
      }
    });
    inputEl_fileInput?.addEventListener("change", async (event) => {
      if (fileSizeAllow === true) {
        const fileInput = inputEl_fileInput;
        console.log(fileInput);
        const file = fileInput.files[0];
        await uploadBinaryFile(file);
      } else {
        fileSizeMessage_error();
      }
    });
    const uploadBinaryFile = async (file) => {
      loadingStart2();
      if (RequestCounter.isLimitExceeded()) {
        const signInModalElement = document.getElementById("sign-up");
        signInModalElement.style.display = "flex";
        signInModalElement.style.zIndex = 100;
        screen_homeShow();
        return;
      }
      const currentImage = document.querySelector("#ai-or-not-current-image");
      const currentImageUrl = URL.createObjectURL(file);
      currentImage.setAttribute("src", currentImageUrl);
      imageEl_currentImage.classList.remove("hide");
      imageEl_currentImageEmpty.classList.add("hide");
      await WrapperAIGeneratedService.getReportsByBinary(file, visitorId).then((response) => {
        RequestCounter.increment();
        changeShareUrl(response.id);
        initial_dropZone();
        findHighestConfidence(response.verdict);
        loadingFinish(response.nsfw_detected);
        if (response.good_quality === false) {
          showBadImageQualityNotification();
        }
      }).catch((error) => {
        error_dropZone();
        screen_homeShow();
      });
    };
    buttonEl_processClose?.addEventListener("click", function() {
      initial_dropZone();
      screen_homeShow();
    });
    document.querySelector("#ai-or-not_dropzone")?.addEventListener("click", function() {
      if (activeTab2() !== "image") {
        return;
      }
      if (AuthService.checkAuth(screen_homeShow))
        return;
      fileUpload_way = "screen_home";
      inputEl_fileInput.click();
    });
    document.querySelector("#choose-file-row")?.addEventListener("click", function() {
      if (activeTab2() !== "image") {
        return;
      }
      fileUpload_way = "screen_result";
      inputEl_fileInput.click();
    });
    buttonEl_urlCheck?.addEventListener("click", () => {
      if (inputEl_urlWaiter.value !== "") {
        pastedUrl = inputEl_urlWaiter.value;
        postToApi_url();
      }
    });
    const element = document.querySelector("#ai-or-not_image-url");
    element?.addEventListener("keypress", function(e) {
      if (e.key === "Enter") {
        if (inputEl_urlWaiter.value !== "") {
          pastedUrl = inputEl_urlWaiter.value;
          postToApi_url();
        }
      }
    });
    testImages.forEach((testImage) => {
      testImage?.addEventListener("click", () => {
        const testImageUrl = testImage.getAttribute("test-image-url");
        document.querySelector("#ai-or-not_image-url").value = testImageUrl;
        document.querySelector("#image-url-aion-submit").click();
        document.querySelector("#ai-or-not_image-url").value = "";
      });
    });
    reportButton_true?.addEventListener("click", () => {
      uiReported_true();
      WrapperAIGeneratedService.sendFeedback(currentResultId, true, "");
    });
    reportButton_false?.classList.add("hide");
    reportButton_close?.classList.add("hide");
    reportButton_submit?.addEventListener("click", () => {
      WrapperAIGeneratedService.sendFeedback(currentResultId, false, reportInput.value);
      uiReported_false();
    });
    document?.addEventListener("keydown", function(event) {
      if (event.code === "Escape") {
        if (reportScreen.style.display !== "none") {
          reportButton_close.click();
        }
      }
    });
    reportInput?.addEventListener("change", () => {
      if (reportInput.value !== "") {
        reportButton_submit.classList.remove("is-disabled");
      } else {
        reportButton_submit.classList.add("is-disabled");
      }
    });
    reportInput?.addEventListener("input", () => {
      if (reportInput.value !== "") {
        reportButton_submit.classList.remove("is-disabled");
      } else {
        reportButton_submit.classList.add("is-disabled");
      }
    });
    const imageUrlInput = document.querySelector("#ai-or-not_image-url");
    const submitButton2 = document.querySelector("#image-url-aion-submit");
    imageUrlInput.addEventListener("input", function() {
      const imageUrl = imageUrlInput.value.trim();
      if (isValidUrl(imageUrl)) {
        submitButton2.classList.remove("is-disabled");
      } else {
        submitButton2.classList.add("is-disabled");
      }
    });
    const isValidUrl = (url) => {
      try {
        new URL(url);
        return true;
      } catch (e) {
        return false;
      }
    };
    const closeSignUpButton = document.getElementById("close-sign-up");
    closeSignUpButton?.addEventListener("click", () => {
      const signInModalElement = document.getElementById("sign-up");
      signInModalElement.style.display = "none";
      signInModalElement.style.zIndex = 0;
    });
    uiShowUserUsage(document.querySelector("#image-quotas"));
  };

  // src/dashboard/Payments.ts
  var plansInit = () => {
    const paymentClient2 = new PaymentsClient();
    const buttonPayFreePlan = document.querySelector("#bt-pay-free");
    const buttonPayBasePlan = document.querySelector("#bt-pay-basic");
    const buttonPayProPlan = document.querySelector("#bt-pay-pro");
    const buttonPayEnterpricePlan = document.querySelector("#bt-pay-enterprice");
    buttonPayFreePlan?.addEventListener("click", () => {
      if (localStorage.getItem("_ms-mid")) {
        window.location.href = `https://${window.location.host}/`;
      } else {
        window.location.href = `https://${window.location.host}/signup`;
      }
    });
    buttonPayBasePlan?.addEventListener("click", () => {
      if (!localStorage.getItem("_ms-mid")) {
        window.location.href = `https://${window.location.host}/signup`;
        return;
      }
      paymentClient2.checkout(paymentClient2.PRODUCT_ID_BASE_9USD_PLAN);
    });
    buttonPayProPlan?.addEventListener("click", () => {
      if (!localStorage.getItem("_ms-mid")) {
        window.location.href = `https://${window.location.host}/signup`;
        return;
      }
      paymentClient2.checkout(paymentClient2.PRODUCT_ID_PRO_PLAN);
    });
    buttonPayEnterpricePlan?.addEventListener("click", () => {
      window.location.href = `https://${window.location.host}/contact-us`;
    });
  };

  // src/index.ts
  var commonInit = () => {
    fetchUserUsage();
  };
  commonInit();
  init();
  personaDetectionInit();
  plansInit();
})();
//# sourceMappingURL=index.js.map
