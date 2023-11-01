"use strict";(()=>{var h="https://js.stripe.com/v3",k=/^https:\/\/js\.stripe\.com\/v3\/?(\?.*)?$/,u="loadStripe.setLoadParameters was called but an existing Stripe.js script already exists in the document; existing script parameters will be used",v=function(){for(var e=document.querySelectorAll('script[src^="'.concat(h,'"]')),t=0;t<e.length;t++){var o=e[t];if(k.test(o.src))return o}return null},_=function(e){var t=e&&!e.advancedFraudSignals?"?advancedFraudSignals=false":"",o=document.createElement("script");o.src="".concat(h).concat(t);var n=document.head||document.body;if(!n)throw new Error("Expected document.body not to be null. Stripe.js requires a <body> element.");return n.appendChild(o),o},S=function(e,t){!e||!e._registerWrapper||e._registerWrapper({name:"stripe-js",version:"2.1.7",startTime:t})},p=null,P=function(e){return p!==null||(p=new Promise(function(t,o){if(typeof window=="undefined"||typeof document=="undefined"){t(null);return}if(window.Stripe&&e&&console.warn(u),window.Stripe){t(window.Stripe);return}try{var n=v();n&&e?console.warn(u):n||(n=_(e)),n.addEventListener("load",function(){window.Stripe?t(window.Stripe):o(new Error("Stripe.js not available"))}),n.addEventListener("error",function(){o(new Error("Failed to load Stripe.js"))})}catch(i){o(i);return}})),p},T=function(e,t,o){if(e===null)return null;var n=e.apply(void 0,t);return S(n,o),n},f=Promise.resolve().then(function(){return P(null)}),y=!1;f.catch(function(r){y||console.warn(r)});var m=function(){for(var e=arguments.length,t=new Array(e),o=0;o<e;o++)t[o]=arguments[o];y=!0;var n=Date.now();return f.then(function(i){return T(i,t,n)})};var E=window.location.host.includes("webflow")?"stage":"prod",a=`https://${E}.ai-or-not.com`;var $=`
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
`,g=document.createElement("style");g.innerHTML=$;document.head.appendChild(g);var l=document.getElementById("toast");function L(r){l.classList.remove("hide");let e=document.createElement("span");e.innerHTML="x",e.className="close-button",e.addEventListener("click",()=>{l.classList.add("hide"),window.location.href=`https://${window.location.host}/dashboard/settings`}),l.innerHTML=r,l.appendChild(e),l.classList.add("show")}var w=(r,e)=>{L(`<p style="font-size: 1.5rem; padding: 2rem;">We are pleased to inform you that you currently have a credit of $${r} from a previous paid subscription after that we successfully update your plan to <span style="color: #aefc06; font-weight: bold ">${e.split(" ")[0]}</span>! If you have any questions please contact us.</p>`)};var b=`

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
            
            `,d=class{constructor(){this.elements=null;this.stripe=null;this.home_element=document.querySelector("#home");this.PRODUCT_ID_BASE_PLAN={id:"price_1O2Ba4Ba9yG4sk8k4y3ZnEVT",msg:"Base plan: $30/month",name:"Base plan",description:"1,000 requests per month",price:"$30",test_id:"price_1O1wSsBa9yG4sk8kej8shNYs"};this.PRODUCT_ID_PRO_PLAN={id:"price_1O2Ku4Ba9yG4sk8kIQBdzpPj",msg:"Pro plan: $250/month",name:"Pro plan",description:"10,000 requests per month",price:"$250",test_id:"price_1O7HCzBa9yG4sk8kYEld9lNl"};this.is_test_mode=!1}showBlinkMessage(e,t){let o=document.createElement("style");o.innerHTML=b,document.head.appendChild(o),t.innerHTML=`
        <div class="text-blink">${e}</div>
        `}getProduct(e){return e===this.PRODUCT_ID_BASE_PLAN.id?this.PRODUCT_ID_BASE_PLAN:e===this.PRODUCT_ID_PRO_PLAN.id?this.PRODUCT_ID_PRO_PLAN:this.PRODUCT_ID_BASE_PLAN}checkout(e){window.location.href=`https://${window.location.host}/checkout?product_id=${e.id}`}createPaymentForm(e){this.home_element.innerHTML=`

        <div style="background: white; position: fixed; top: 0; left: 0; right: 0; bottom: 0; display: flex; flex-direction: column; justify-content: center; align-items: center">
           <div class="payment-container" style="overflow-y: auto">
                <h2 style="color: black; font-size: 2.5rem; text-align: center">AI or Not</h2>
                <br>

           <div class="sr-root" style="display: flex; flex-direction: row; align-items: center; justify-content: center; min-width: 380px;">
            <div class="sr-main">
                <h3 style="color: black; font-size: 2.5rem; justify-content: center">${e}</h3>
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
    `,document.querySelector("#submit").addEventListener("click",()=>{this.completePayment(this.PRODUCT_ID_BASE_PLAN)})}createPaymentForm2(e){var i;let t=document.createElement("link");t.rel="stylesheet",t.href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css",t.type="text/css",document.head.appendChild(t);let o=document.createElement("link");o.rel="stylesheet",o.href="https://fonts.googleapis.com/css?family=Montserrat",document.head.appendChild(o);let n=document.createElement("style");n.innerHTML=b,document.head.appendChild(n),document.querySelector("#home-container").innerHTML=`
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
                  <span class="price" id="total-price">${e.price}</span>
                  <p class="item-name">${e.name}</p>
                  <p class="price-description">per month</p>
                  <p class="item-description">${e.description}</p>
                </div>
              
              </div>
              <div class="card-details">
              <div id="payment-element">
                <h3 class="title text-blink">Checking details and preparation of payment...</h3>
                <div class="row"></div>
              </div>
            <button type="button" id="submit" class="btn btn-block submit-btn", style="display: flex; flex-direction: row; align-items: center; justify-content: center">
                
                <span id="button-text">Pay ${e.price}</span>
<!--                <span id="progress" class="loader"></span>-->
                
            </button>
            </form>

          </div>
        </section>
      </main>
        `,(i=document.querySelector("#submit"))==null||i.addEventListener("click",()=>{this.completePayment(e)})}async createPaymentIntent(e){fetch(`${a}/aion/payments/config`).then(t=>t.json()).then(t=>{m(t.stripe_public_key).then(o=>{this.stripe=o,this.is_test_mode=t.stripe_public_key.includes("test"),fetch(`${a}/aion/payments/create_intent`,{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${this.checkUserToken()}`},body:JSON.stringify({product_id:this.is_test_mode?e.test_id:e.id})}).then(n=>n.json()).then(n=>{var s;if(n.code===10)throw console.warn(n.message),alert(n.message),window.location.href=`https://${window.location.host}/`,new Error(n.message);this.elements=this.stripe.elements({clientSecret:n.client_secret});let i=this.elements.create("payment");(s=document.querySelector("#progress-loader"))==null||s.classList.add("hide"),document.querySelector("#submit").style.visibility="visible",i.mount("#payment-element")}).catch(n=>{console.error("Something wrong when create a payment intent",n),alert("Something wrong when create a payment. Please try again.")})})})}checkUserToken(){let e=localStorage.getItem("_ms-mid");if(!e)throw new Error("User token not found");return e}async initPaymentForm(e){console.log("Init payment form...");let t=await this.initStripe();if(this.stripe=t,!t)return;let o={theme:"flat",variables:{colorPrimary:"#30313d",colorText:"#30313d"},roles:{".TermsText":{hide:!0}}},n={},i="auto",s=await this.getClientSecret(e);if(!s)return;let c=t.elements({clientSecret:s,appearance:o,loader:i});this.elements=c;let I=c.create("payment",n).mount("#payment-element")}async getClientSecret(e){return fetch(`${a}/aion/payments/create_intent`,{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${this.checkUserToken()}`},body:JSON.stringify({product_id:this.is_test_mode?e.test_id:e.id})}).then(t=>t.json()).then(t=>{if(console.log(t),t.code===10){let o=this.is_test_mode?e.test_id:e.id;if(console.log(o,t.plan_id),t.plan_id&&t.plan_id!==o)return this.updateSubscription(e);throw console.warn(t.message),alert(t.message),window.location.href=`https://${window.location.host}/`,new Error(t.message)}return document.getElementById("button-text").innerHTML=`$${t.amount}`,t.client_secret})}async updateSubscription(e){return console.log("Update subscription..."),fetch(`${a}/aion/payments/subscription`,{method:"PUT",headers:{"Content-Type":"application/json",Authorization:`Bearer ${this.checkUserToken()}`},body:JSON.stringify({product_id:this.is_test_mode?e.test_id:e.id})}).then(t=>t.json()).then(t=>{var o;if(console.log(t),t.credit){(o=document.querySelector("#payment-form"))==null||o.classList.add("hide"),w(t.credit,e.name);return}return document.getElementById("button-text").innerHTML=`Pay $${t.amount}`,t.client_secret}).catch(t=>{console.error("Something wrong when update a subscription",t),alert("Something wrong when update a subscription. Please try again or contact us."),window.location.href=`https://${window.location.host}/#plans`})}initStripe(){return console.log("Init stripe..."),fetch(`${a}/aion/payments/config`).then(e=>e.json()).then(e=>(this.is_test_mode=e.stripe_public_key.includes("test"),m(e.stripe_public_key).then(t=>t))).catch(e=>{console.error("Something wrong when init stripe",e)})}async completePayment(e){console.log("Complete payment...");let t=document.querySelector("#submit");if(t.innerHTML.includes("Payments attempt")){window.location.href=`https://${window.location.host}/#plans`;return}let o=t.innerHTML,n=null,i=null;for(let s=1;s<=5&&(this.showBlinkMessage(`Payments attempt ${s}...`,t),n=await this.stripe.confirmPayment({elements:this.elements,confirmParams:{return_url:`https://${window.location.host}/dashboard/settings?payment_success=${e.name}`}}).then(c=>c.error?(i=c.error.message,"error"):(console.log(c),"success")),t.innerHTML=o,console.log("result: ",n),!(n==="false"||n==="success"));s++);console.log(n,i),n==="error"&&alert(i)}async cancelSubscription(){fetch(`${a}/aion/payments/cancel_subscription`,{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${this.checkUserToken()}`}}).then(e=>e.json()).catch(e=>{console.error("Something wrong when create a checkout session",e)})}async getSubscriptionInfo(){try{let e=await fetch(`${a}/aion/payments/subscription`,{method:"GET",headers:{"Content-Type":"application/json",Authorization:`Bearer ${this.checkUserToken()}`}});return await this.handleResponse(e)}catch{return null}}async handleResponse(e){if(!e.ok){let t=await e.json();throw{status:e.status,message:t}}if(e.status!==204)return await e.json()}isValidCreditCardNumber(e){if(e=e.replace(/\s/g,"").split("").reverse().join(""),!/^[0-9]{13,19}$/.test(e))return!1;let t=0;for(let o=0;o<e.length;o++){let n=parseInt(e[o]);o%2===1&&(n*=2,n>9&&(n-=9)),t+=n}return t%10===0}};var x=()=>{console.log("Checkout...");let r=new d,t=new URLSearchParams(window.location.search).get("product_id");if(t===null){console.log("No product id");return}let o=r.getProduct(t);r.createPaymentForm2(o),r.initPaymentForm(o)};x();})();
