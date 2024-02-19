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
  var copyToClipboard = (text) => {
    const el = document.createElement("textarea");
    el.value = text;
    el.setAttribute("readonly", "");
    el.style.position = "absolute";
    el.style.left = "-9999px";
    document.body.appendChild(el);
    const selection = document.getSelection();
    const selected = selection && selection.rangeCount > 0 ? selection.getRangeAt(0) : null;
    el.select();
    el.setSelectionRange(0, text.length);
    document.execCommand("copy");
    document.body.removeChild(el);
    if (selected) {
      selection?.removeAllRanges();
      selection?.addRange(selected);
    }
  };
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

  // src/utils/fingerprint.ts
  var fpPromise = import("https://openfpcdn.io/fingerprintjs/v3").then((FingerprintJS) => FingerprintJS.load());

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

  // src/utils/tabs.ts
  var imageTab = document.getElementById("image-tab");
  var audioTab = document.getElementById("audio-tab");
  var pdetTab = document.getElementById("pdet-tab");

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

  // src/dashboard/ElementCreator.ts
  var ElementCreator = class {
    static fillGridResults(elementId, array) {
      const results = document.getElementById(elementId);
      if (!results)
        return;
      results.style.display = "grid";
      array.forEach((item) => {
        const requestItem = document.createElement("div");
        requestItem.classList.add("request-item");
        const verdict = document.createElement("div");
        verdict.classList.add("request-item-verdict");
        verdict.innerText = item.verdict;
        ElementCreator.fillCardControls(requestItem, item);
        if (item.url === "unknown") {
          const image = document.createElement("div");
          image.innerHTML = `
                    <svg width="60%" height="auto" viewBox="0 0 225 65" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M2.484 51V44.736H7.452V19.464H2.484V13.2H18.036C23.112 13.2 26.964 14.496 29.592 17.088C32.256 19.644 33.588 23.46 33.588 28.536V35.664C33.588 40.74 32.256 44.574 29.592 47.166C26.964 49.722 23.112 51 18.036 51H2.484ZM14.58 44.52H18.144C21.024 44.52 23.13 43.764 24.462 42.252C25.794 40.74 26.46 38.616 26.46 35.88V28.32C26.46 25.548 25.794 23.424 24.462 21.948C23.13 20.436 21.024 19.68 18.144 19.68H14.58V44.52ZM39.5288 51V13.2H63.8288V19.68H46.6568V28.698H62.3168V35.178H46.6568V44.52H64.1528V51H39.5288ZM69.4292 51V13.2H76.5572V44.52H93.8372V51H69.4292ZM98.6968 51V13.2H122.997V19.68H105.825V28.698H121.485V35.178H105.825V44.52H123.321V51H98.6968ZM137.345 51V19.68H126.329V13.2H155.489V19.68H144.473V51H137.345ZM160.343 51V13.2H184.643V19.68H167.471V28.698H183.131V35.178H167.471V44.52H184.967V51H160.343ZM189.164 51V44.736H194.132V19.464H189.164V13.2H204.716C209.792 13.2 213.644 14.496 216.272 17.088C218.936 19.644 220.268 23.46 220.268 28.536V35.664C220.268 40.74 218.936 44.574 216.272 47.166C213.644 49.722 209.792 51 204.716 51H189.164ZM201.26 44.52H204.824C207.704 44.52 209.81 43.764 211.142 42.252C212.474 40.74 213.14 38.616 213.14 35.88V28.32C213.14 25.548 212.474 23.424 211.142 21.948C209.81 20.436 207.704 19.68 204.824 19.68H201.26V44.52Z" fill="#FF4651"/>
                    </svg>
                `;
          image.style.width = "100%";
          image.style.height = "100%";
          image.style.display = "flex";
          image.style.justifyContent = "center";
          image.style.alignItems = "center";
          requestItem.appendChild(image);
        } else {
          const image = document.createElement("img");
          image.src = item.url;
          image.alt = item.verdict;
          requestItem.appendChild(image);
        }
        requestItem.appendChild(verdict);
        results.appendChild(requestItem);
      });
    }
    static fillApiKeyCard(data, func, token) {
      func(token);
      const formattedDate = (dateStr) => {
        const date = new Date(dateStr);
        const options = {
          month: "short",
          day: "numeric",
          year: "numeric",
          hour: "numeric",
          minute: "numeric"
        };
        return date.toLocaleDateString("en-US", options);
      };
      const apiKeyCard = document.getElementById("api-item");
      const expireDate = document.getElementById("expire-date");
      const rps = document.getElementById("rps");
      const progressLine = document.getElementById("progress-line");
      const counterRequests = document.getElementById("counter-requests");
      const totalRequests = document.getElementById("total-requests");
      if (apiKeyCard && expireDate && rps && progressLine && counterRequests && totalRequests && data.expiration_dt) {
        expireDate.innerText = formattedDate(data.expiration_dt);
        rps.innerText = data.limits.secondly.toString();
        progressLine.style.width = `${data.usage.daily / data.limits.daily * 100}%`;
        counterRequests.innerText = data.usage.daily.toString();
        totalRequests.innerText = data.limits.daily.toString();
        apiKeyCard.style.display = "flex";
      }
    }
    static fillCardControls(parentElement, item) {
      const shareButton = document.createElement("button");
      shareButton.onclick = () => {
        shareButton.innerText = "Copied!";
        copyToClipboard(`https://results.aiornot.com/aiornot/users/${item.id}`);
        setTimeout(() => {
          shareButton.innerText = "Share";
        }, 1500);
      };
      shareButton.innerText = "Share";
      shareButton.classList.add("request-item-share");
      shareButton.style.opacity = "0";
      if (!item.hasOwnProperty("is_proper_predict")) {
        const controlsContainer = document.createElement("div");
        controlsContainer.id = "request-item-controls";
        controlsContainer.style.display = "none";
        const likeButton = document.createElement("button");
        likeButton.innerHTML = `
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M14.2 6.72001C14.0127 6.49511 13.7783 6.31406 13.5133 6.18966C13.2484 6.06525 12.9594 6.00051 12.6667 6.00001H9.62666L10 5.04668C10.1553 4.62926 10.207 4.18041 10.1507 3.73862C10.0944 3.29683 9.93179 2.87529 9.67679 2.51016C9.42178 2.14503 9.08201 1.84721 8.68662 1.64224C8.29123 1.43727 7.85202 1.33127 7.40666 1.33334C7.27842 1.33361 7.15298 1.37086 7.04538 1.44062C6.93777 1.51039 6.85257 1.60971 6.79999 1.72668L4.89999 6.00001H3.33333C2.8029 6.00001 2.29419 6.21072 1.91911 6.5858C1.54404 6.96087 1.33333 7.46958 1.33333 8.00001V12.6667C1.33333 13.1971 1.54404 13.7058 1.91911 14.0809C2.29419 14.456 2.8029 14.6667 3.33333 14.6667H11.82C12.2879 14.6665 12.7409 14.5023 13.1002 14.2027C13.4595 13.903 13.7024 13.4869 13.7867 13.0267L14.6333 8.36001C14.6857 8.0716 14.674 7.7752 14.5991 7.49179C14.5243 7.20839 14.388 6.94491 14.2 6.72001ZM4.66666 13.3333H3.33333C3.15652 13.3333 2.98695 13.2631 2.86192 13.1381C2.7369 13.0131 2.66666 12.8435 2.66666 12.6667V8.00001C2.66666 7.8232 2.7369 7.65363 2.86192 7.52861C2.98695 7.40358 3.15652 7.33334 3.33333 7.33334H4.66666V13.3333ZM13.3333 8.12001L12.4867 12.7867C12.4583 12.942 12.3757 13.0822 12.2536 13.1823C12.1315 13.2824 11.9779 13.3359 11.82 13.3333H6V6.80668L7.81333 2.72668C7.99998 2.78109 8.17333 2.87361 8.32243 2.9984C8.47153 3.12318 8.59314 3.27752 8.67959 3.45167C8.76604 3.62582 8.81545 3.816 8.8247 4.01021C8.83395 4.20442 8.80284 4.39843 8.73333 4.58001L8.37999 5.53334C8.30471 5.73485 8.27929 5.95157 8.30591 6.16503C8.33253 6.37849 8.41041 6.58233 8.53288 6.75917C8.65536 6.93601 8.8188 7.08059 9.00927 7.18057C9.19973 7.28055 9.41155 7.33297 9.62666 7.33334H12.6667C12.7646 7.33318 12.8614 7.35461 12.9501 7.39609C13.0388 7.43757 13.1173 7.49809 13.18 7.57334C13.2442 7.64756 13.2913 7.73504 13.3178 7.82954C13.3443 7.92404 13.3496 8.02322 13.3333 8.12001Z" fill="#ADFF00"/>
                </svg>
            `;
        likeButton.classList.add("request-item-like");
        const dislikeButton = document.createElement("button");
        dislikeButton.innerHTML = `
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12.6667 1.33331H4.18C3.71213 1.33347 3.25912 1.49765 2.89979 1.7973C2.54046 2.09694 2.29755 2.51308 2.21333 2.97331L1.36667 7.63998C1.31391 7.92827 1.32516 8.22464 1.39962 8.5081C1.47408 8.79156 1.60993 9.0552 1.79756 9.28035C1.98518 9.5055 2.22 9.68666 2.48539 9.81102C2.75078 9.93537 3.04025 9.99988 3.33333 9.99998H6.37333L6 10.9533C5.84471 11.3707 5.793 11.8196 5.84929 12.2614C5.90558 12.7032 6.06821 13.1247 6.32321 13.4898C6.57821 13.855 6.91798 14.1528 7.31337 14.3578C7.70877 14.5627 8.14798 14.6687 8.59333 14.6666C8.72157 14.6664 8.84702 14.6291 8.95462 14.5594C9.06222 14.4896 9.14742 14.3903 9.2 14.2733L11.1 9.99998H12.6667C13.1971 9.99998 13.7058 9.78927 14.0809 9.41419C14.456 9.03912 14.6667 8.53041 14.6667 7.99998V3.33331C14.6667 2.80288 14.456 2.29417 14.0809 1.9191C13.7058 1.54403 13.1971 1.33331 12.6667 1.33331ZM10 9.19331L8.18667 13.2733C8.00113 13.2172 7.82905 13.1236 7.68103 12.9985C7.53301 12.8733 7.41218 12.7192 7.32599 12.5455C7.2398 12.3719 7.19007 12.1825 7.17987 11.9889C7.16967 11.7953 7.1992 11.6017 7.26667 11.42L7.62 10.4666C7.69529 10.2651 7.72071 10.0484 7.69408 9.83496C7.66746 9.6215 7.58959 9.41766 7.46711 9.24082C7.34463 9.06398 7.18119 8.9194 6.99073 8.81942C6.80027 8.71944 6.58844 8.66702 6.37333 8.66665H3.33333C3.23539 8.66681 3.13862 8.64538 3.0499 8.6039C2.96118 8.56242 2.88268 8.5019 2.82 8.42665C2.75578 8.35243 2.70873 8.26495 2.68223 8.17045C2.65572 8.07595 2.65041 7.97677 2.66667 7.87998L3.51333 3.21331C3.54173 3.05801 3.62432 2.91782 3.74641 2.81771C3.86849 2.7176 4.02214 2.66407 4.18 2.66665H10V9.19331ZM13.3333 7.99998C13.3333 8.17679 13.2631 8.34636 13.1381 8.47138C13.013 8.59641 12.8435 8.66665 12.6667 8.66665H11.3333V2.66665H12.6667C12.8435 2.66665 13.013 2.73688 13.1381 2.86191C13.2631 2.98693 13.3333 3.1565 13.3333 3.33331V7.99998Z" fill="#FF4651"/>
                </svg>
            `;
        dislikeButton.classList.add("request-item-dislike");
        controlsContainer.appendChild(likeButton);
        controlsContainer.appendChild(dislikeButton);
        parentElement.appendChild(controlsContainer);
        likeButton.onclick = () => {
          const feedbackAlert = document.createElement("div");
          feedbackAlert.classList.add("feedback-alert");
          feedbackAlert.classList.add("feedback-alert__correct");
          feedbackAlert.innerHTML = `
                              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                  <path d="M14.2 6.71995C14.0127 6.49505 13.7782 6.314 13.5133 6.1896C13.2484 6.06519 12.9593 6.00045 12.6666 5.99995H9.62665L9.99998 5.04662C10.1553 4.6292 10.207 4.18035 10.1507 3.73856C10.0944 3.29677 9.93177 2.87523 9.67677 2.5101C9.42177 2.14497 9.082 1.84715 8.68661 1.64218C8.29121 1.43721 7.852 1.33121 7.40665 1.33328C7.27841 1.33355 7.15296 1.3708 7.04536 1.44056C6.93776 1.51033 6.85256 1.60965 6.79998 1.72661L4.89998 5.99995H3.33331C2.80288 5.99995 2.29417 6.21066 1.9191 6.58573C1.54403 6.96081 1.33331 7.46952 1.33331 7.99995V12.6666C1.33331 13.197 1.54403 13.7058 1.9191 14.0808C2.29417 14.4559 2.80288 14.6666 3.33331 14.6666H11.82C12.2879 14.6665 12.7409 14.5023 13.1002 14.2026C13.4595 13.903 13.7024 13.4868 13.7866 13.0266L14.6333 8.35995C14.6857 8.07154 14.674 7.77514 14.5991 7.49173C14.5242 7.20833 14.388 6.94485 14.2 6.71995ZM4.66665 13.3333H3.33331C3.1565 13.3333 2.98693 13.263 2.86191 13.138C2.73688 13.013 2.66665 12.8434 2.66665 12.6666V7.99995C2.66665 7.82314 2.73688 7.65357 2.86191 7.52854C2.98693 7.40352 3.1565 7.33328 3.33331 7.33328H4.66665V13.3333ZM13.3333 8.11995L12.4866 12.7866C12.4582 12.9419 12.3757 13.0821 12.2536 13.1822C12.1315 13.2823 11.9778 13.3359 11.82 13.3333H5.99998V6.80662L7.81331 2.72662C7.99997 2.78103 8.17332 2.87355 8.32242 2.99834C8.47152 3.12312 8.59313 3.27746 8.67958 3.45161C8.76603 3.62576 8.81543 3.81594 8.82468 4.01015C8.83393 4.20436 8.80282 4.39837 8.73331 4.57995L8.37998 5.53328C8.30469 5.73479 8.27927 5.95151 8.3059 6.16497C8.33252 6.37843 8.41039 6.58227 8.53287 6.75911C8.65535 6.93595 8.81879 7.08053 9.00925 7.18051C9.19971 7.28049 9.41154 7.33291 9.62665 7.33328H12.6666C12.7646 7.33312 12.8614 7.35455 12.9501 7.39603C13.0388 7.43751 13.1173 7.49803 13.18 7.57328C13.2442 7.6475 13.2912 7.73498 13.3178 7.82948C13.3443 7.92397 13.3496 8.02316 13.3333 8.11995Z" fill="#10151D"/>
                              </svg>
                              <span>Correct</span>
                          `;
          controlsContainer.remove();
          parentElement.appendChild(feedbackAlert);
          setTimeout(() => {
            feedbackAlert.remove();
          }, 5e3);
          WrapperAIGeneratedService.sendFeedback(item.id, true, "");
        };
        dislikeButton.onclick = () => {
          const feedbackAlert = document.createElement("div");
          feedbackAlert.classList.add("feedback-alert");
          feedbackAlert.classList.add("feedback-alert__incorrect");
          feedbackAlert.innerHTML = `
                              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                  <path d="M12.6667 1.33337H4.17998C3.71211 1.33353 3.2591 1.49771 2.89977 1.79736C2.54044 2.097 2.29754 2.51314 2.21332 2.97337L1.36665 7.64004C1.3139 7.92833 1.32515 8.2247 1.39961 8.50816C1.47407 8.79162 1.60992 9.05526 1.79754 9.28041C1.98517 9.50556 2.21998 9.68672 2.48537 9.81108C2.75076 9.93543 3.04024 9.99994 3.33332 10H6.37332L5.99998 10.9534C5.8447 11.3708 5.79298 11.8196 5.84928 12.2614C5.90557 12.7032 6.06819 13.1248 6.32319 13.4899C6.5782 13.855 6.91797 14.1528 7.31336 14.3578C7.70875 14.5628 8.14796 14.6688 8.59332 14.6667C8.72156 14.6664 8.847 14.6292 8.9546 14.5594C9.06221 14.4897 9.14741 14.3903 9.19999 14.2734L11.1 10H12.6667C13.1971 10 13.7058 9.78933 14.0809 9.41426C14.4559 9.03918 14.6667 8.53047 14.6667 8.00004V3.33337C14.6667 2.80294 14.4559 2.29423 14.0809 1.91916C13.7058 1.54409 13.1971 1.33337 12.6667 1.33337ZM9.99998 9.19337L8.18665 13.2734C8.00111 13.2172 7.82903 13.1237 7.68101 12.9985C7.53299 12.8734 7.41216 12.7192 7.32597 12.5456C7.23978 12.372 7.19006 12.1825 7.17985 11.989C7.16965 11.7954 7.19919 11.6018 7.26665 11.42L7.61999 10.4667C7.69527 10.2652 7.72069 10.0485 7.69407 9.83502C7.66745 9.62156 7.58957 9.41772 7.4671 9.24088C7.34462 9.06404 7.18118 8.91946 6.99071 8.81948C6.80025 8.7195 6.58843 8.66708 6.37332 8.66671H3.33332C3.23538 8.66687 3.13861 8.64544 3.04988 8.60396C2.96116 8.56248 2.88267 8.50196 2.81998 8.42671C2.75576 8.35249 2.70872 8.26501 2.68221 8.17051C2.65571 8.07601 2.65039 7.97683 2.66665 7.88004L3.51332 3.21337C3.54172 3.05807 3.62431 2.91788 3.74639 2.81777C3.86848 2.71767 4.02213 2.66413 4.17998 2.66671H9.99998V9.19337ZM13.3333 8.00004C13.3333 8.17685 13.2631 8.34642 13.1381 8.47145C13.013 8.59647 12.8435 8.66671 12.6667 8.66671H11.3333V2.66671H12.6667C12.8435 2.66671 13.013 2.73695 13.1381 2.86197C13.2631 2.98699 13.3333 3.15656 13.3333 3.33337V8.00004Z" fill="#10151D"/>
                              </svg>
                              <span>Incorrect</span>
                          `;
          controlsContainer.remove();
          parentElement.appendChild(feedbackAlert);
          setTimeout(() => {
            feedbackAlert.remove();
          }, 5e3);
          WrapperAIGeneratedService.sendFeedback(item.id, false, "");
        };
      }
      parentElement.appendChild(shareButton);
    }
  };

  // src/pages/dashboard/api.ts
  async function initUsagePage() {
    const refreshApiTokenButton = document.getElementById("refresh-api-key");
    const getApiTokenButton = document.getElementById("request-api-key");
    const dashAPIEmptyBlock = document.getElementById("dash-api-empty");
    const dashAPIContentBlock = document.getElementById("dash-api-content");
    const apiCopyButton = document.getElementById("api-copy");
    apiCopyButton.classList.add("hide");
    refreshApiTokenButton.onclick = async () => {
      const { token } = await DashboardService.refreshApiToken();
      copyToClipboardWrap(token);
    };
    getApiTokenButton.onclick = async () => {
      const { token } = await DashboardService.fetchApiToken();
      await changeView(token);
    };
    async function changeView(token = null) {
      const usage = await DashboardService.fetchUsageApi();
      if (usage.access) {
        dashAPIEmptyBlock.style.display = "none";
        dashAPIContentBlock.style.display = "block";
        ElementCreator.fillApiKeyCard(usage, copyToClipboardWrap, token);
      } else {
        dashAPIEmptyBlock.style.display = "flex";
        dashAPIContentBlock.style.display = "none";
      }
    }
    function copyToClipboardWrap(token = null) {
      if (token) {
        apiCopyButton.classList.remove("hide");
        if (!apiCopyButton)
          return;
        apiCopyButton.onclick = () => {
          copyToClipboard(token);
          apiCopyButton.classList.add("hide");
        };
      }
    }
    await changeView();
  }
  document.getElementById("sign-out").onclick = () => {
    localStorage.removeItem("_aion_in");
    AuthService.removeAuth();
  };
  initUsagePage();
})();
//# sourceMappingURL=api.js.map
