"use strict";(()=>{var Ze=Object.create;var Se=Object.defineProperty;var Ye=Object.getOwnPropertyDescriptor;var We=Object.getOwnPropertyNames;var Ge=Object.getPrototypeOf,Je=Object.prototype.hasOwnProperty;var Xe=(i=>typeof require!="undefined"?require:typeof Proxy!="undefined"?new Proxy(i,{get:(e,t)=>(typeof require!="undefined"?require:e)[t]}):i)(function(i){if(typeof require!="undefined")return require.apply(this,arguments);throw new Error('Dynamic require of "'+i+'" is not supported')});var Ke=(i,e,t,n)=>{if(e&&typeof e=="object"||typeof e=="function")for(let s of We(e))!Je.call(i,s)&&s!==t&&Se(i,s,{get:()=>e[s],enumerable:!(n=Ye(e,s))||n.enumerable});return i};var Qe=(i,e,t)=>(t=i!=null?Ze(Ge(i)):{},Ke(e||!i||!i.__esModule?Se(t,"default",{value:i,enumerable:!0}):t,i));function xe(i){var e=i.split(".")[1],t=e.replace(/-/g,"+").replace(/_/g,"/"),n=decodeURIComponent(atob(t).split("").map(function(s){return"%"+("00"+s.charCodeAt(0).toString(16)).slice(-2)}).join(""));return JSON.parse(n)}var ke="https://js.stripe.com/v3",et=/^https:\/\/js\.stripe\.com\/v3\/?(\?.*)?$/,Ce="loadStripe.setLoadParameters was called but an existing Stripe.js script already exists in the document; existing script parameters will be used",tt=function(){for(var e=document.querySelectorAll('script[src^="'.concat(ke,'"]')),t=0;t<e.length;t++){var n=e[t];if(et.test(n.src))return n}return null},nt=function(e){var t=e&&!e.advancedFraudSignals?"?advancedFraudSignals=false":"",n=document.createElement("script");n.src="".concat(ke).concat(t);var s=document.head||document.body;if(!s)throw new Error("Expected document.body not to be null. Stripe.js requires a <body> element.");return s.appendChild(n),n},st=function(e,t){!e||!e._registerWrapper||e._registerWrapper({name:"stripe-js",version:"2.1.7",startTime:t})},X=null,ot=function(e){return X!==null||(X=new Promise(function(t,n){if(typeof window=="undefined"||typeof document=="undefined"){t(null);return}if(window.Stripe&&e&&console.warn(Ce),window.Stripe){t(window.Stripe);return}try{var s=tt();s&&e?console.warn(Ce):s||(s=nt(e)),s.addEventListener("load",function(){window.Stripe?t(window.Stripe):n(new Error("Stripe.js not available"))}),s.addEventListener("error",function(){n(new Error("Failed to load Stripe.js"))})}catch(o){n(o);return}})),X},rt=function(e,t,n){if(e===null)return null;var s=e.apply(void 0,t);return st(s,n),s},_e=Promise.resolve().then(function(){return ot(null)}),Te=!1;_e.catch(function(i){Te||console.warn(i)});var re=function(){for(var e=arguments.length,t=new Array(e),n=0;n<e;n++)t[n]=arguments[n];Te=!0;var s=Date.now();return _e.then(function(o){return rt(o,t,s)})};var it=window.location.host.includes("webflow")?"stage":"prod",m=`https://${it}.ai-or-not.com`,K="https://results.aiornot.com",N=class{constructor(e,t){this.apiUrl=e,this.bearerToken=t}async get(e){let t=`${this.apiUrl}/${e}`;try{let n=await fetch(t,{method:"GET",headers:{"Content-Type":"application/json",Authorization:`Bearer ${this.bearerToken}`}});return await this.handleResponse(n)}catch(n){throw console.error("Error",n),n}}async post(e,t){let n=`${this.apiUrl}/${e}`;try{let s=await fetch(n,{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${this.bearerToken}`},body:JSON.stringify(t)});return await this.handleResponse(s)}catch(s){throw console.error("Request error",s),s.status===429&&s.message.msg.type==="requests"&&alert(`It looks like you have reached your plan limit of ${s.message.msg.current_limit} requests. To continue, please upgrade to a new plan.`),s}}async postBinary(e,t){let n=`${this.apiUrl}/${e}`;try{let s=await fetch(n,{method:"POST",headers:{Accept:"application/json",Authorization:`Bearer ${this.bearerToken}`},body:t});return await this.handleResponse(s)}catch(s){throw console.error("Binary request error:",s),s.status===429&&s.message.msg.type==="requests"&&alert(`It looks like you have reached your plan limit of ${s.message.msg.current_limit} requests. To continue, please upgrade to a new plan.`),s}}async delete(e){let t=`${this.apiUrl}/${e}`;try{let n=await fetch(t,{method:"DELETE",headers:{accept:"*/*",Authorization:`Bearer ${this.bearerToken}`}});await this.handleResponse(n)}catch(n){throw console.error("Error when perform DELETE-request:",n),n}}async patch(e,t){let n=`${this.apiUrl}/${e}`;try{let s=await fetch(n,{method:"PATCH",headers:{"Content-Type":"application/json",Authorization:`Bearer ${this.bearerToken}`},body:JSON.stringify(t)});return await this.handleResponse(s)}catch(s){throw console.error("\u041E\u0448\u0438\u0431\u043A\u0430 \u043F\u0440\u0438 \u0432\u044B\u043F\u043E\u043B\u043D\u0435\u043D\u0438\u0438 PATCH-\u0437\u0430\u043F\u0440\u043E\u0441\u0430:",s),s}}async handleResponse(e){if(!e.ok){let t=await e.json();throw{status:e.status,message:t}}if(e.status!==204)return await e.json()}};var at=`
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
`,Ie=document.createElement("style");Ie.innerHTML=at;document.head.appendChild(Ie);var Z=document.getElementById("toast");function qe(i,e="info"){Z.classList.remove("hide");let t=document.createElement("span");t.innerHTML="x",t.className="close-button",t.addEventListener("click",()=>{Z.classList.add("hide"),e!=="error"&&(window.location.href=`https://${window.location.host}/dashboard/settings`)}),Z.innerHTML=i,Z.appendChild(t),Z.classList.add("show"),Z.style.borderColor=e==="error"?"red":"#aefc06"}var Pe=(i,e)=>{qe(`<p style="font-size: 1.5rem; padding: 2rem;">We are pleased to inform you that you currently have a credit of $${i} from a previous paid subscription after that we successfully update your plan to <span style="color: #aefc06; font-weight: bold ">${e.split(" ")[0]}</span>! If you have any questions please contact us.</p>`)},Y=()=>{qe('<p style="font-size: 1.5rem; padding: 2rem; color: red">The current image quality is insufficient, thus the results may be inaccurate.</p>',"error")};var Be=`

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
            
            `,W=class{constructor(){this.elements=null;this.stripe=null;this.home_element=document.querySelector("#home");this.PRODUCT_ID_BASE_9USD_PLAN={id:"price_1OABgwBa9yG4sk8kc2owagiH",msg:"Base plan: $9/month",name:"Base plan",description:"300 requests per month",price:"$9",test_id:"price_1OABdXBa9yG4sk8kcXyILlLm"};this.PRODUCT_ID_BASE_PLAN={id:"price_1O2Ba4Ba9yG4sk8k4y3ZnEVT",msg:"Base plan: $30/month",name:"Base plan",description:"1,000 requests per month",price:"$30",test_id:"price_1O1wSsBa9yG4sk8kej8shNYs"};this.PRODUCT_ID_PRO_PLAN={id:"price_1O2Ku4Ba9yG4sk8kIQBdzpPj",msg:"Pro plan: $250/month",name:"Pro plan",description:"10,000 requests per month",price:"$250",test_id:"price_1O7HCzBa9yG4sk8kYEld9lNl"};this.is_test_mode=!1}showBlinkMessage(e,t){let n=document.createElement("style");n.innerHTML=Be,document.head.appendChild(n),t.innerHTML=`
        <div class="text-blink">${e}</div>
        `}getProduct(e){return e===this.PRODUCT_ID_BASE_PLAN.id?this.PRODUCT_ID_BASE_PLAN:e===this.PRODUCT_ID_PRO_PLAN.id?this.PRODUCT_ID_PRO_PLAN:e===this.PRODUCT_ID_BASE_9USD_PLAN.id?this.PRODUCT_ID_BASE_9USD_PLAN:this.PRODUCT_ID_BASE_PLAN}checkout(e){window.location.href=`https://${window.location.host}/checkout?product_id=${e.id}`}createPaymentForm(e){this.home_element.innerHTML=`

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
    `,document.querySelector("#submit").addEventListener("click",()=>{this.completePayment(this.PRODUCT_ID_BASE_PLAN)})}createPaymentForm2(e){var o;let t=document.createElement("link");t.rel="stylesheet",t.href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css",t.type="text/css",document.head.appendChild(t);let n=document.createElement("link");n.rel="stylesheet",n.href="https://fonts.googleapis.com/css?family=Montserrat",document.head.appendChild(n);let s=document.createElement("style");s.innerHTML=Be,document.head.appendChild(s),document.querySelector("#home-container").innerHTML=`
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
        `,(o=document.querySelector("#submit"))==null||o.addEventListener("click",()=>{this.completePayment(e)})}async createPaymentIntent(e){fetch(`${m}/aion/payments/config`).then(t=>t.json()).then(t=>{re(t.stripe_public_key).then(n=>{this.stripe=n,this.is_test_mode=t.stripe_public_key.includes("test"),fetch(`${m}/aion/payments/create_intent`,{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${this.checkUserToken()}`},body:JSON.stringify({product_id:this.is_test_mode?e.test_id:e.id})}).then(s=>s.json()).then(s=>{var a;if(s.code===10)throw console.warn(s.message),alert(s.message),window.location.href=`https://${window.location.host}/`,new Error(s.message);this.elements=this.stripe.elements({clientSecret:s.client_secret});let o=this.elements.create("payment");(a=document.querySelector("#progress-loader"))==null||a.classList.add("hide"),document.querySelector("#submit").style.visibility="visible",o.mount("#payment-element")}).catch(s=>{console.error("Something wrong when create a payment intent",s),alert("Something wrong when create a payment. Please try again.")})})})}checkUserToken(){let e=localStorage.getItem("_ms-mid");if(!e)throw new Error("User token not found");return e}async initPaymentForm(e){console.log("Init payment form...");let t=await this.initStripe();if(this.stripe=t,!t)return;let n={theme:"flat",variables:{colorPrimary:"#30313d",colorText:"#30313d"},roles:{".TermsText":{hide:!0}}},s={},o="auto",a=await this.getClientSecret(e);if(!a)return;let l=t.elements({clientSecret:a,appearance:n,loader:o});this.elements=l;let f=l.create("payment",s).mount("#payment-element")}async getClientSecret(e){return fetch(`${m}/aion/payments/create_intent`,{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${this.checkUserToken()}`},body:JSON.stringify({product_id:this.is_test_mode?e.test_id:e.id})}).then(t=>t.json()).then(t=>{if(console.log(t),t.code===10){let n=this.is_test_mode?e.test_id:e.id;if(console.log(n,t.plan_id),t.plan_id&&t.plan_id!==n)return this.updateSubscription(e);throw console.warn(t.message),alert(t.message),window.location.href=`https://${window.location.host}/`,new Error(t.message)}return document.getElementById("button-text").innerHTML=`$${t.amount}`,t.client_secret})}async updateSubscription(e){return console.log("Update subscription..."),fetch(`${m}/aion/payments/subscription`,{method:"PUT",headers:{"Content-Type":"application/json",Authorization:`Bearer ${this.checkUserToken()}`},body:JSON.stringify({product_id:this.is_test_mode?e.test_id:e.id})}).then(t=>t.json()).then(t=>{var n;if(console.log(t),t.credit){(n=document.querySelector("#payment-form"))==null||n.classList.add("hide"),Pe(t.credit,e.name);return}return document.getElementById("button-text").innerHTML=`Pay $${t.amount}`,t.client_secret}).catch(t=>{console.error("Something wrong when update a subscription",t),alert("Something wrong when update a subscription. Please try again or contact us."),window.location.href=`https://${window.location.host}/#plans`})}initStripe(){return console.log("Init stripe..."),fetch(`${m}/aion/payments/config`).then(e=>e.json()).then(e=>(this.is_test_mode=e.stripe_public_key.includes("test"),re(e.stripe_public_key).then(t=>t))).catch(e=>{console.error("Something wrong when init stripe",e)})}async completePayment(e){console.log("Complete payment...");let t=document.querySelector("#submit");if(t.innerHTML.includes("Payments attempt")){window.location.href=`https://${window.location.host}/#plans`;return}let n=t.innerHTML,s=null,o=null;for(let a=1;a<=5&&(this.showBlinkMessage(`Payments attempt ${a}...`,t),s=await this.stripe.confirmPayment({elements:this.elements,confirmParams:{return_url:`https://${window.location.host}/dashboard/settings?payment_success=${e.name}`}}).then(l=>l.error?(o=l.error.message,"error"):(console.log(l),"success")),t.innerHTML=n,console.log("result: ",s),!(s==="false"||s==="success"));a++);console.log(s,o),s==="error"&&alert(o)}async cancelSubscription(){fetch(`${m}/aion/payments/cancel_subscription`,{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${this.checkUserToken()}`}}).then(e=>e.json()).catch(e=>{console.error("Something wrong when create a checkout session",e)})}async getSubscriptionInfo(){try{let e=await fetch(`${m}/aion/payments/subscription`,{method:"GET",headers:{"Content-Type":"application/json",Authorization:`Bearer ${this.checkUserToken()}`}});return await this.handleResponse(e)}catch{return null}}async handleResponse(e){if(!e.ok){let t=await e.json();throw{status:e.status,message:t}}if(e.status!==204)return await e.json()}isValidCreditCardNumber(e){if(e=e.replace(/\s/g,"").split("").reverse().join(""),!/^[0-9]{13,19}$/.test(e))return!1;let t=0;for(let n=0;n<e.length;n++){let s=parseInt(e[n]);n%2===1&&(s*=2,s>9&&(s-=9)),t+=s}return t%10===0}};var Ae=new W,g=class{constructor(e){let t=d.getToken(),n=`${m}/aion/${e}`;this.client=new N(n,t)}static sendVerificationEmail(){let{client:e}=g.getInstance();return e.get("email_verification",{})}static getInstance(e="users"){return g.instance||(g.instance=new g(e)),g.instance}static async fetchRequests(e=0,t=10){try{let{client:n}=g.getInstance(),s=`data?filters=requests&offset=${e}&limit=${t}`;return await n.get(s).then(o=>o.requests.array)}catch(n){return console.error("getRequests:",n),[]}}static async fetchUsageApi(){try{let{client:e}=g.getInstance(),t="data?filters=all&offset=0&limit=1";return await e.get(t).then(n=>n.api)}catch(e){return console.error("fetchUsageApi:",e),[]}}static async signUp(){try{let{client:e}=g.getInstance();return await e.post("sign_up",{}).then(()=>!1).catch(t=>{throw t})}catch(e){throw console.error("signUp:",e),e}}static async login(){try{let{client:e}=g.getInstance();return await e.get("login")}catch(e){console.error("login:",e)}}static async delete(){try{let{client:e}=g.getInstance();return d.removeAuth(),await e.delete(""),!0}catch(e){console.error("delete:",e)}}static async fetchApiToken(){try{let{client:e}=g.getInstance();return await e.post("api_token",{})}catch(e){console.error("fetchApiToken:",e),console.error("fetchApiToken:",e)}}static async refreshApiToken(){try{let{client:e}=g.getInstance();return await e.patch("api_token",{})}catch(e){console.error("refreshApiToken:",e)}}static async fetchSubscriptionData(){let{client:e}=g.getInstance();try{let t="data?filters=all&offset=0&limit=1";return await e.get(t).then(n=>n)}catch(t){console.error("fetchSubscriptionData:",t)}}static async subscriptionInfo(){var l,f,h,x,w,H,U,C,B;let e=document.querySelector("#plan-info"),t=document.querySelector("#usage-info"),n=document.querySelector("#btn-cancel-plan");e.classList.add("hide"),t.classList.add("hide"),n.classList.add("hide");let s=[g.fetchSubscriptionData(),Ae.getSubscriptionInfo()],[o,a]=await Promise.all(s);if((o==null?void 0:o.plan.name)==="Free")e.innerHTML=`<p>You're on the <span class="text-color-green">Free</span> plan. You have limits of 20 & 100 image and 5 audio checks per month via web & API, respectively.</p> 
                                  <p>If you need more, check out our <a class="text-color-green" href='https://${window.location.host}/#plans' >plans</a>.</p>`,t.innerHTML=`<p> You have used:</p> 
                                    <p style="margin-left: 1rem"> ${((l=o==null?void 0:o.usage)==null?void 0:l.web.image)||0} of 20 checks of image via web;</p> 
                                    <p style="margin-left: 1rem"> ${((f=o==null?void 0:o.usage)==null?void 0:f.api.image)||0} of 100 checks of image via API;</p> 
                                    <p style="margin-left: 1rem"> ${((h=o==null?void 0:o.usage)==null?void 0:h.web.audio)+((x=o==null?void 0:o.usage)==null?void 0:x.api.audio)} of 5 checks of audio for both web & API;</p>`,e.classList.remove("hide"),t.classList.remove("hide");else{let k=`You're on the <span class="text-color-green">${o==null?void 0:o.plan.name}</span> plan.`,E=0,v=0,V=0;k=k+"<p>  You have quotas:</p>",o.plan.quotas.forEach(I=>{E+=1,I.resource==="image"&&(v=I.limit),I.resource==="audio"&&(V=I.limit),k=k+`<p style="margin-left: 1rem"> <span>${E}.</span> <span style="margin-left: 0.4rem"> ${I.limit} requests to check ${I.resource} for both web & API.</span></p>`}),e.innerHTML=k,t.innerHTML=`<p> You have used:</p> 
                                    <p style="margin-left: 1rem"> ${((w=o==null?void 0:o.usage)==null?void 0:w.web.image)+((H=o==null?void 0:o.usage)==null?void 0:H.api.image)} of ${v} checks of image via both web & API;</p> 
                                    <p style="margin-left: 1rem"> ${((U=o==null?void 0:o.usage)==null?void 0:U.web.audio)+((C=o==null?void 0:o.usage)==null?void 0:C.api.audio)} of ${V} checks of audio for both web & API;</p>`,(B=a==null?void 0:a.subscription.meta)!=null&&B.was_canceled?(n.classList.add("hide"),t.innerHTML=t.innerHTML+` Your subscription has been canceled, expires on ${new Date(a==null?void 0:a.subscription.expiration_dt).toLocaleDateString()}.`):n.classList.remove("hide"),e.classList.remove("hide"),t.classList.remove("hide")}n.addEventListener("click",async()=>{(o==null?void 0:o.plan.name)!=="Base"&&(o==null?void 0:o.plan.name)!=="Pro"?window.location.href=`https://${window.location.host}/contact-us`:confirm("Are you sure you want to cancel your subscription?")?(alert("Your subscription has been canceled."),Ae.cancelSubscription().then(k=>{console.log(k)}),window.location.href=`https://${window.location.host}/#plans`):alert("Your subscription has not been canceled.")})}static async getUserInfo(){let{client:e}=g.getInstance();try{return await e.get("")}catch(t){console.error("getUserInfo:",t)}}static async getTransactions(){let{client:e}=new g("payments");try{return await e.get("invoices")}catch(t){console.error("getTransactions:",t)}}},q=g;q.instance=null;var z=class{constructor(){}static getUserInfo(){return q.getUserInfo()}static isAuth(){return localStorage.getItem(z.token_key)!==null}static setAuth(){localStorage.setItem(z.key,"true")}static removeAuth(){localStorage.removeItem(z.key)}static async init(){if(localStorage.getItem("_aion_in")===null)try{await q.signUp(),z.setAuth(),await q.login(),localStorage.setItem("_aion_in","true")}catch(e){console.log(e)}}static getToken(){var e;return(e=localStorage.getItem("_ms-mid"))!=null?e:""}static isExpiredToken(){let e=z.getToken();if((e==null?void 0:e.length)>0){let t=xe(e),n=Date.now()/1e3;return t.exp<n}return!0}static checkAuth(e){if(!z.isAuth()){let t=document.getElementById("sign-up");return t.style.display="flex",t.style.zIndex=100,e(),!0}return!1}static async sendVerifiedEmail(){console.log("sendVerifiedEmail"),await q.sendVerificationEmail()}},d=z;d.key="isSignUp",d.token_key="_ms-mid";var _=class{constructor(){let e=d.getToken(),t=`${m}/aion/ai-generated`;this.client=new N(t,e)}static getInstance(){return _.instance||(_.instance=new _),_.instance}static async getReportsByBinary(e){let{client:t}=_.getInstance();try{let n=new FormData;return n.append("binary",e,"uploaded-file.png"),await t.postBinary("reports/binary",n)}catch(n){n.status===402&&alert("Please verify your email to continue using the service"),n.status===429&&(alert(`It looks like you have reached your plan limit of ${n.message.msg.current_limit} requests. To continue, please upgrade to a new plan.`),window.location.href=`https://${window.location.host}/#plans`),console.error("Error getReportsByBinary:",n)}}static async getReportsByUrl(e){let{client:t}=_.getInstance();try{let n=`reports/url?url=${e}`;return await t.post(n,{})}catch(n){n.status===402&&alert("Please verify your email to continue using the service"),n.status===429&&(alert(`It looks like you have reached your plan limit of ${n.message.msg.current_limit} requests. To continue, please upgrade to a new plan.`),window.location.href=`https://${window.location.host}/#plans`),console.error("getReportsByUrl:",n)}}static async getAudioVerdict(e){let{client:t}=_.getInstance();try{let n=new FormData;return n.append("file",e),await t.postBinary("reports/audio/binary",n)}catch(n){n.status===402&&alert("Please verify your email to continue using the service"),n.status===429&&(alert(`It looks like you have reached your plan limit of ${n.message.msg.current_limit} requests. To continue, please upgrade to a new plan.`),window.location.href=`https://${window.location.host}/#plans`),console.error("Error getAudioVerdict:",n)}}static async getYoutubeVerdict(e){let{client:t}=_.getInstance();try{let n={url:e};return await t.post("reports/audio/link",n)}catch(n){n.status===402&&alert("Please verify your email to continue using the service"),n.status===429&&(alert(`It looks like you have reached your plan limit of ${n.message.msg.current_limit} requests. To continue, please upgrade to a new plan.`),window.location.href=`https://${window.location.host}/#plans`),console.error("Error getYoutubeVerdict:",n)}}static async getPdetReportByUrl(e){let{client:t}=_.getInstance();try{let n={object:e};return await t.post("reports/person_detection/url",n)}catch(n){n.status===402&&alert("Please verify your email to continue using the service"),n.status===429&&(alert(`It looks like you have reached your plan limit of ${n.message.msg.current_limit} requests. To continue, please upgrade to a new plan.`),window.location.href=`https://${window.location.host}/#plans`),console.error("Error getYoutubeVerdict:",n)}}static async getPdetReportByBinary(e){let{client:t}=_.getInstance();try{let n=new FormData;return n.append("file",e,"uploaded-file.png"),await t.postBinary("reports/person_detection/binary",n)}catch(n){n.status===402&&alert("Please verify your email to continue using the service"),n.status===429&&(alert(`It looks like you have reached your plan limit of ${n.message.msg.current_limit} requests. To continue, please upgrade to a new plan.`),window.location.href=`https://${window.location.host}/#plans`),console.error("Error getReportsByBinary:",n)}}},P=_;P.instance=null;var F=class{constructor(){}static async getReportsByBinary(e,t){let n=`${m}/results/api/detector/reports/raw?source=web&user_id=${t}`,s=new FormData;s.append("binary",e,"file_name.png");let o={method:"POST",headers:{Accept:"application/json",Authorization:`Bearer ${d.getToken()}`},body:s};return await fetch(n,o).then(a=>a.json())}static async getReportsByUrl(e,t){let n=`${m}/results/api/detector/reports/json?source=web&user_id=${t}`,s={method:"POST",headers:{Accept:"application/json","Content-Type":"application/json",Authorization:`Bearer ${d.getToken()}`},body:JSON.stringify({object:e})};return await fetch(n,s).then(o=>o.json())}static async sendFeedback(e,t,n,s=!1){let o={is_proper_predict:t,comment:n},a=`${m}/results/api/detector/reports/result/${e}`,l={method:"PUT",body:JSON.stringify(o),headers:{Accept:"application/json","Content-Type":"application/json"}};(s||!d.isExpiredToken())&&(a=`${m}/aion/ai-generated/reports/${e}`,l={method:"PATCH",body:JSON.stringify(o),headers:{Accept:"application/json","Content-Type":"application/json"}}),await fetch(a,l).then(f=>f.json()).then(f=>console.log(f)).catch(f=>console.error(f))}static async getAudioVerdict(e){let t=`${m}/aion/ai-generated/reports/audio/binary`,n=new FormData;return n.append("file",e),await fetch(t,{method:"POST",headers:{Accept:"application/json",ContentType:"multipart/form-data"},body:n}).then(o=>o.json())}static async getYoutubeVerdict(e){let t=`${m}/aion/ai-generated/reports/audio/link`,n={method:"POST",headers:{Accept:"application/json","Content-Type":"application/json"},body:JSON.stringify({url:e})};return await fetch(t,n).then(s=>s.json())}};var Q=class{constructor(){}static isLimitExceeded(){return!!d.isExpiredToken()}static increment(){let e=localStorage.getItem(Q.key),t=e===null?1:Number(e)+1;localStorage.setItem(Q.key,t.toString())}},M=Q;M.key="requestCount";var T=class{static async getReportsByBinary(e,t){return d.isExpiredToken()?await F.getReportsByBinary(e,t):await P.getReportsByBinary(e)}static async getReportsByUrl(e,t){return d.isExpiredToken()?await F.getReportsByUrl(e,t):await P.getReportsByUrl(e)}static async getAudioVerictByFile(e){return await P.getAudioVerdict(e)}static async getAudioVerictMock(e){let n=await((s,o)=>new Promise(a=>{setTimeout(()=>{a(o)},s)}))(1500,e);return JSON.parse(`{
            "id": "41994fdd-0161-43a9-b873-581eccbe6d72",
            "report": {
                "version": "0.0.0",
                "verdict": ${n}
            }
        }`)}static async getYoutubeVerict(e){return d.isExpiredToken()?await F.getYoutubeVerdict(e):await P.getYoutubeVerdict(e)}static async getPdetReportByUrl(e){return await P.getPdetReportByUrl(e)}static async getPdetReportByBinary(e){return await P.getPdetReportByBinary(e)}static async sendFeedback(e,t,n,s=!1){return await F.sendFeedback(e,t,n,s)}};var ie=()=>{document.querySelector("#processing-screen").classList.remove("hide"),document.querySelector(".processing-screen_triggers_5").click(),document.querySelector(".processing-screen_triggers_1").click()},ee=()=>{document.querySelector("#processing-screen").classList.add("hide")},$e=()=>{d.isAuth()&&q.fetchSubscriptionData().then(i=>{i&&localStorage.setItem("user_plan",JSON.stringify(i))})},G=(i,e="image")=>{var t;if(d.isAuth()){let n=JSON.parse(localStorage.getItem("user_plan"))||{};if(n){let s,o;(t=n.plan)==null||t.quotas.forEach(l=>{l.resource===e&&l.interface.includes("web")&&(s=l.limit,o=l.interface)});let a=0;o.length>0&&o.forEach(l=>{a=a+n.usage[l][e]}),i.innerHTML=`
            <div style="margin-top: 20px; font-size: 1rem; color: white">
            <span">
                Available ${a} from ${s} web checks
            </span>
            </div>`}}},Me=()=>{window.location.href="/sign-in"};var ct=document.getElementById("image-tab"),lt=document.getElementById("audio-tab"),dt=document.getElementById("pdet-tab");function He(){if(ct.classList.contains("w--current"))return"image";if(lt.classList.contains("w--current"))return"audio";if(dt.classList.contains("w--current"))return"pdet"}var Ue=()=>{var I,ne;window.location.host.includes("webflow")&&((I=document.querySelector("#pdet-tab"))==null||I.classList.remove("hide"));let i=document.querySelectorAll("#pdet-test-image"),e=document.querySelector("#pdet-file-input"),t=document.querySelector("#aion-pdet-current-image"),n=document.querySelector("#pdet-empty-preview-img"),s=document.querySelector("#pdet-nsfw-preview-img"),o=document.querySelector("#aion-pdet-image-url"),a=document.querySelector("#aion-pdet-url-submit"),l=document.querySelector("#aion-pdet-dropzone"),f=document.querySelector("#aion-pdet-dropzone-text"),h=document.getElementById("pdet-tab"),x,w;h.addEventListener("click",()=>{H()});let H=()=>{var c,p,b,u,L,R,A,j;(c=document.querySelector("#pdet-hero-home-title-description"))==null||c.classList.remove("hide"),(p=document.querySelector("#pdet-hero-home-gallery"))==null||p.classList.remove("hide"),(b=document.querySelector("#aion-pdet-dropzone"))==null||b.classList.remove("hide"),(u=document.querySelector("#pdet-button-report-true"))==null||u.classList.remove("hide"),(L=document.querySelector("#pdet-button-report-false"))==null||L.classList.remove("hide"),(R=document.querySelector("#pdet-hero-home_drop-zone-divider"))==null||R.classList.remove("hide"),t.classList.add("hide"),(A=document.querySelector("#result-screen-pdet-wrapper"))==null||A.classList.add("hide"),t.classList.add("hide"),(j=document.querySelector("#pdet-result-screen-col"))==null||j.classList.add("hide"),document.getElementById("pdet-title-human").classList.add("hide"),o.value=""},U=()=>{var c,p,b,u,L,R;(c=document.querySelector("#pdet-hero-home-title-description"))==null||c.classList.add("hide"),(p=document.querySelector("#pdet-hero-home-gallery"))==null||p.classList.add("hide"),(b=document.querySelector("#aion-pdet-dropzone"))==null||b.classList.add("hide"),(u=document.querySelector("#pdet-button-report-true"))==null||u.classList.add("hide"),(L=document.querySelector("#pdet-button-report-false"))==null||L.classList.add("hide"),(R=document.querySelector("#pdet-hero-home_drop-zone-divider"))==null||R.classList.add("hide")},C=()=>{l.classList.add("red-border"),f.textContent="Something went wrong. Try again.",f.classList.add("error")};e==null||e.addEventListener("change",()=>{let c=e==null?void 0:e.files[0].size,p=10*1024*1024;c>p?w=!1:w=!0});function B(c=!1,p,b){var u,L;U(),ee(),c||(s.classList.add("hide"),t.classList.remove("hide"),n.classList.add("hide"),(u=document.querySelector("#result-screen-pdet-wrapper"))==null||u.classList.remove("hide"),t.classList.remove("hide"),t.src=b,(L=document.querySelector("#pdet-result-screen-col"))==null||L.classList.remove("hide"),document.getElementById("pdet-title-human").classList.remove("hide"),document.getElementById("pdet-title-human").innerHTML=`This is likely <span class="text-color-green">${p}</span><div style="font-size: 1rem; color: #FFFFFFB3; font-family: Space Grotesk, sans-serif;">
<span> Free Research Preview. AI or Not may produce inaccurate results </span>
</div>`),o.value=""}let k=async()=>{await T.getPdetReportByUrl(x).then(c=>{B(c.nsfw_detected,c!=null&&c.verdict?"AI":"Human",c.url),c.good_quality===!1&&Y()}).catch(c=>{ee(),C()})},E=async c=>{ie();let p=document.querySelector("#ai-or-not-current-image"),b=URL.createObjectURL(c);p.setAttribute("src",b),t.classList.remove("hide"),n.classList.add("hide"),await T.getPdetReportByBinary(c).then(u=>{B(u.nsfw_detected,u!=null&&u.verdict?"AI":"Human",u.url),u.good_quality===!1&&Y()}).catch(u=>{ee(),C()})},v=document.body;v==null||v.addEventListener("dragover",function(c){c.preventDefault(),document.querySelector(".dropzone-fullscreen").classList.remove("hide")}),v==null||v.addEventListener("dragleave",function(c){c.preventDefault(),document.querySelector(".dropzone-fullscreen").classList.add("hide")}),v==null||v.addEventListener("drop",async function(c){if(He()!=="pdet")return;c.preventDefault(),document.querySelector(".dropzone-fullscreen").classList.add("hide");let p=c.dataTransfer.files[0],b=p.size,u=10*1024*1024;b>u?w=!1:w=!0,w===!0?(t.src="",await E(p)):C()}),e==null||e.addEventListener("change",async c=>{if(w==!0){let b=e.files[0];t.src="",await E(b)}else console.log("fileSizeAllow"),C()}),l==null||l.addEventListener("click",function(){d.checkAuth(Me)||e.click()}),(ne=document.querySelector("#choose-file-row"))==null||ne.addEventListener("click",function(){e.click()}),a==null||a.addEventListener("click",()=>{ie(),o.value!==""&&(x=o.value,t.src=o.value,k())}),o.addEventListener("input",function(){let c=o.value.trim();V(c)?a.classList.remove("is-disabled"):a.classList.add("is-disabled")});let V=c=>{try{return new URL(c),!0}catch{return!1}};i.forEach(c=>{c.addEventListener("click",()=>{let p=c.getAttribute("test-image-url");o.value=p,a.click(),o.value=""})}),G(document.querySelector("#pdet-quotas"))};var te,ut=import("https://openfpcdn.io/fingerprintjs/v3").then(i=>i.load()),ae=async()=>{te=await ut.then(i=>i.get()).then(i=>i.visitorId)};var ce=document.querySelector("#contact-us-submit-button"),mt=document.querySelector("#name"),pt=document.querySelector("#E-Mail"),ht=document.querySelector("#Note"),yt=document.querySelector("#Company");ce&&(ce.classList.remove("is-disabled"),ce.addEventListener("click",async i=>{i.preventDefault();let e={name:mt.value,email:pt.value,note:ht.value,company:yt.value};for(let t in e)if(t!=="company"&&e[t]===""){alert(`Please fill in all required fields ${t}`);return}console.log(e),fetch(`${m}/aion/system/post_message`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(e)}).then(t=>{t.ok?(alert("Thank you for your application! We will contact you shortly."),window.location.href="https://aiornot.com/"):alert("Something went wrong. Please try again.")})}));var Re=()=>{var be,Le;let i=document.getElementById("image-tab"),e=document.getElementById("report-screen"),t=document.querySelector("#button-report-submit"),n=document.querySelector("#input-report-comment"),s=document.querySelector("#button-report_true"),o=document.querySelector("#button-report_false"),a=document.querySelector("#button-report_close"),l=document.querySelector("#url-error-message"),f=document.querySelector("#processing_cancel"),h=document.querySelector("#image-file-input"),x=document.querySelector("#ai-or-not-current-image"),w=document.querySelector("#empty-preview-img"),H=document.querySelector("#nsfw-preview-img"),U=document.querySelector("#input-error-text"),C=document.querySelector("#ai-or-not_image-url"),B=document.querySelector("#image-url-aion-submit"),k=document.querySelector("#ai-or-not_dropzone"),E=document.querySelector("#ai-or-not_dropzone-text"),v=document.querySelector("#result-screen_col"),V=document.querySelector("#share-items-hide"),I=document.querySelector("#ai-or-not-dropzone-counter"),ne=document.querySelector("#ai-or-not-dropzone-counter-w"),c=document.querySelectorAll("#image-test-image");document.getElementById("image-tab").addEventListener("click",()=>{D()}),document.querySelector("#w-node-_80502d56-29f7-2965-16f1-d6c6c4ebbd86-c4ebbd86").classList.add("hide"),V.classList.add("hide");function u(){return i.classList.contains("w--current")?"image":"audio"}let L,R,A,j;ae();let ze=()=>{let r=document.querySelector("#button-report_false-text");r.classList.remove("hide"),r.textContent=r.getAttribute("report-button-text-default_reported"),o.classList.add("is-reported"),s.classList.add("hide")},Ve=()=>{let r=document.querySelector("#button-report_true-text");r.classList.remove("hide"),r.textContent=r.getAttribute("report-button-text-default_reported"),s.classList.add("is-reported"),o.classList.add("hide")},De=()=>{n.value="";let r=document.querySelector("#button-report_true-text"),y=document.querySelector("#button-report_false-text");y.classList.add("hide"),r.classList.remove("hide"),r.textContent=r.getAttribute("report-button-text-default"),y.textContent=y.getAttribute("report-button-text-default"),s.classList.remove("is-reported"),o.classList.remove("is-reported"),s.classList.remove("hide"),o.classList.remove("hide")},de=r=>{j=r;let y=document.querySelector('[fs-socialshare-element="url"]'),S=`${d.isExpiredToken()?`${K}/aiornot/`:`${K}/aiornot/users/`}${r}`;y.textContent=S,document.querySelectorAll(".result-screen_share-item").forEach(Ne=>{Ne.setAttribute("data-url",S)})},ue=()=>{E.textContent="We support jpeg, png, webp, gif, tiff, bmp. 10 Mb of maximum size.",E.classList.remove("text-color-red"),U.textContent="Something went wrong. Try again.",l.classList.add("hide")},me=()=>{l.classList.remove("hide")},Fe=()=>{l.classList.add("hide")},J=()=>{v.classList.contains("hide")?(E.textContent="File is too large (max 10 MB)",E.classList.add("text-color-red")):(U.textContent="File is too large (max 10 MB)",l.classList.remove("hide"))};h==null||h.addEventListener("change",()=>{let r=h==null?void 0:h.files[0].size,y=10*1024*1024;r>y?(A=!1,J()):(A=!0,ue())});let je=()=>{document.querySelector("#processing-screen").classList.add("hide"),E.classList.add("error"),k.classList.add("red-border"),E.textContent="Something went wrong. Try again."},pe=()=>{E.classList.remove("error"),k.classList.remove("red-border"),E.textContent="We support jpeg, png, webp, gif, tiff, bmp. 10 Mb of maximum size."},D=()=>{document.querySelector("#choose-file-row").classList.add("hide"),document.querySelector("#legal-tip").classList.remove("hide"),document.querySelector("#processing-screen").classList.add("hide"),document.querySelector("#hero-home_title-description").classList.remove("hide"),document.querySelector("#hero-home_gallery").classList.remove("hide"),document.querySelector("#ai-or-not_dropzone").classList.remove("hide"),document.querySelector("#hero-home_drop-zone-divider").classList.remove("hide"),document.querySelector("#result-screen_col").classList.add("hide"),document.querySelector("#result-screen_image-wrapper").classList.add("hide"),x.classList.add("hide"),w.classList.remove("hide"),H.classList.remove("hide")},he=()=>{De(),x.src="",Fe(),U.textContent="Something went wrong. Try again.",document.querySelector("#choose-file-row").classList.remove("hide"),document.querySelector("#legal-tip").classList.add("hide"),document.querySelector(".processing-screen_triggers_5").click(),document.querySelector("#processing-screen").classList.remove("hide"),document.querySelector(".processing-screen_triggers_1").click(),document.querySelector("#hero-home_title-description").classList.add("hide"),document.querySelector("#hero-home_gallery").classList.add("hide"),document.querySelector("#ai-or-not_dropzone").classList.add("hide"),document.querySelector("#hero-home_drop-zone-divider").classList.add("hide"),document.querySelector("#result-screen_col").classList.remove("hide"),document.querySelector("#result-screen_image-wrapper").classList.remove("hide")};function ye(r=!1){r?(H.classList.remove("hide"),x.classList.add("hide"),w.classList.add("hide"),V.classList.add("hide")):(H.classList.add("hide"),x.classList.remove("hide"),w.classList.add("hide")),document.querySelector(".processing-screen_triggers_3").click(),document.querySelector("#processing-screen").classList.add("hide"),document.querySelector(".processing-screen_triggers_5").click(),h.value="",document.querySelector("#ai-or-not_image-url").value=""}let ge=r=>{r==="unknown"?(document.getElementById("title-human").innerHTML="Sorry, but in this case we can't really say if it's AI or Not",document.getElementById("ai-or-not_result-message-50").classList.remove("hide"),document.getElementById("ai-or-not_result-message").classList.add("hide"),document.getElementById("ai-or-not_result-message-50").innerHTML="Probly the uploaded image has most likely been modified or compressed",document.getElementById("title-human").classList.remove("hide"),document.getElementById("title-ai").classList.add("hide")):(document.getElementById("title-ai").innerHTML=`This is likely <span class="text-color-green">AI</span> <div style="font-size: 1rem; color: #FFFFFFB3; font-family: Space Grotesk, sans-serif;">
<span> Free Research Preview. AI or Not may produce inaccurate results </span>
</div>`,document.getElementById("title-human").innerHTML=`This is likely <span class="text-color-green">Human</span><div style="font-size: 1rem; color: #FFFFFFB3; font-family: Space Grotesk, sans-serif;">
<span> Free Research Preview. AI or Not may produce inaccurate results </span>
</div>`,document.getElementById("ai-or-not_result-message-50").classList.add("hide"),document.getElementById("ai-or-not_result-message").classList.remove("hide"),document.querySelector("#ai-or-not_model-name").textContent=r,r==="ai"?(document.getElementById("title-human").classList.add("hide"),document.getElementById("title-ai").classList.remove("hide")):(document.getElementById("title-human").classList.remove("hide"),document.getElementById("title-ai").classList.add("hide")))},fe=async()=>{if(M.isLimitExceeded()){let r=document.getElementById("sign-up");r.style.display="flex",r.style.zIndex=100,D()}else l.classList.add("hide"),he(),await T.getReportsByUrl(L,te).then(r=>{M.increment(),de(r.id),x.src=L,ge(r.verdict),ye(r.nsfw_detected),r.good_quality===!1&&Y()}).catch(r=>{v.classList.contains("hide")?me():(me(),D())})},$=document.body,ft=document.querySelector("#dropzone-fullscreen_message-tip"),vt=document.querySelector("#dropzone-fullscreen_message-format");$==null||$.addEventListener("dragover",function(r){r.preventDefault(),document.querySelector(".dropzone-fullscreen").classList.remove("hide")}),$==null||$.addEventListener("dragleave",function(r){r.preventDefault(),document.querySelector(".dropzone-fullscreen").classList.add("hide")}),$==null||$.addEventListener("drop",async function(r){if(u()!=="image")return;r.preventDefault(),document.querySelector(".dropzone-fullscreen").classList.add("hide");let y=r.dataTransfer.files[0],O=y.size,S=10*1024*1024;O>S?(A=!1,J()):(A=!0,ue()),A===!0?await ve(y):J()}),h==null||h.addEventListener("change",async r=>{if(A===!0){let y=h;console.log(y);let O=y.files[0];await ve(O)}else J()});let ve=async r=>{if(he(),M.isLimitExceeded()){let S=document.getElementById("sign-up");S.style.display="flex",S.style.zIndex=100,D();return}let y=document.querySelector("#ai-or-not-current-image"),O=URL.createObjectURL(r);y.setAttribute("src",O),x.classList.remove("hide"),w.classList.add("hide"),await T.getReportsByBinary(r,te).then(S=>{M.increment(),de(S.id),pe(),ge(S.verdict),ye(S.nsfw_detected),S.good_quality===!1&&Y()}).catch(S=>{je(),D()})};f==null||f.addEventListener("click",function(){pe(),D()}),(be=document.querySelector("#ai-or-not_dropzone"))==null||be.addEventListener("click",function(){u()==="image"&&(d.checkAuth(D)||(R="screen_home",h.click()))}),(Le=document.querySelector("#choose-file-row"))==null||Le.addEventListener("click",function(){u()==="image"&&(R="screen_result",h.click())}),B==null||B.addEventListener("click",()=>{C.value!==""&&(L=C.value,fe())});let se=document.querySelector("#ai-or-not_image-url");se==null||se.addEventListener("keypress",function(r){r.key==="Enter"&&C.value!==""&&(L=C.value,fe())}),c.forEach(r=>{r==null||r.addEventListener("click",()=>{let y=r.getAttribute("test-image-url");document.querySelector("#ai-or-not_image-url").value=y,document.querySelector("#image-url-aion-submit").click(),document.querySelector("#ai-or-not_image-url").value=""})}),s==null||s.addEventListener("click",()=>{Ve(),T.sendFeedback(j,!0,"")}),o==null||o.classList.add("hide"),a==null||a.classList.add("hide"),t==null||t.addEventListener("click",()=>{T.sendFeedback(j,!1,n.value),ze()}),document==null||document.addEventListener("keydown",function(r){r.code==="Escape"&&e.style.display!=="none"&&a.click()}),n==null||n.addEventListener("change",()=>{n.value!==""?t.classList.remove("is-disabled"):t.classList.add("is-disabled")}),n==null||n.addEventListener("input",()=>{n.value!==""?t.classList.remove("is-disabled"):t.classList.add("is-disabled")});let we=document.querySelector("#ai-or-not_image-url"),Ee=document.querySelector("#image-url-aion-submit");we.addEventListener("input",function(){let r=we.value.trim();Oe(r)?Ee.classList.remove("is-disabled"):Ee.classList.add("is-disabled")});let Oe=r=>{try{return new URL(r),!0}catch{return!1}},oe=document.getElementById("close-sign-up");oe==null||oe.addEventListener("click",()=>{let r=document.getElementById("sign-up");r.style.display="none",r.style.zIndex=0}),G(document.querySelector("#image-quotas"))};var le=()=>{let i=new W,e=document.querySelector("#bt-pay-free"),t=document.querySelector("#bt-pay-basic"),n=document.querySelector("#bt-pay-pro"),s=document.querySelector("#bt-pay-enterprice");e==null||e.addEventListener("click",()=>{localStorage.getItem("_ms-mid")?window.location.href=`https://${window.location.host}/`:window.location.href=`https://${window.location.host}/signup`}),t==null||t.addEventListener("click",()=>{if(!localStorage.getItem("_ms-mid")){window.location.href=`https://${window.location.host}/signup`;return}i.checkout(i.PRODUCT_ID_BASE_9USD_PLAN)}),n==null||n.addEventListener("click",()=>{if(!localStorage.getItem("_ms-mid")){window.location.href=`https://${window.location.host}/signup`;return}i.checkout(i.PRODUCT_ID_PRO_PLAN)}),s==null||s.addEventListener("click",()=>{window.location.href=`https://${window.location.host}/contact-us`})};var gt=()=>{$e()};gt();Re();Ue();le();})();
