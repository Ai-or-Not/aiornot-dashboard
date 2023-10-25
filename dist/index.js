"use strict";(()=>{var Ve=Object.create;var be=Object.defineProperty;var De=Object.getOwnPropertyDescriptor;var Fe=Object.getOwnPropertyNames;var je=Object.getPrototypeOf,Oe=Object.prototype.hasOwnProperty;var Ye=(i=>typeof require!="undefined"?require:typeof Proxy!="undefined"?new Proxy(i,{get:(e,t)=>(typeof require!="undefined"?require:e)[t]}):i)(function(i){if(typeof require!="undefined")return require.apply(this,arguments);throw new Error('Dynamic require of "'+i+'" is not supported')});var Ze=(i,e,t,n)=>{if(e&&typeof e=="object"||typeof e=="function")for(let s of Fe(e))!Oe.call(i,s)&&s!==t&&be(i,s,{get:()=>e[s],enumerable:!(n=De(e,s))||n.enumerable});return i};var Ne=(i,e,t)=>(t=i!=null?Ve(je(i)):{},Ze(e||!i||!i.__esModule?be(t,"default",{value:i,enumerable:!0}):t,i));var Y,We=import("https://openfpcdn.io/fingerprintjs/v3").then(i=>i.load()),se=async()=>{Y=await We.then(i=>i.get()).then(i=>i.visitorId)};function Se(i){var e=i.split(".")[1],t=e.replace(/-/g,"+").replace(/_/g,"/"),n=decodeURIComponent(atob(t).split("").map(function(s){return"%"+("00"+s.charCodeAt(0).toString(16)).slice(-2)}).join(""));return JSON.parse(n)}var xe="https://js.stripe.com/v3",Ge=/^https:\/\/js\.stripe\.com\/v3\/?(\?.*)?$/,Ce="loadStripe.setLoadParameters was called but an existing Stripe.js script already exists in the document; existing script parameters will be used",Je=function(){for(var e=document.querySelectorAll('script[src^="'.concat(xe,'"]')),t=0;t<e.length;t++){var n=e[t];if(Ge.test(n.src))return n}return null},Ke=function(e){var t=e&&!e.advancedFraudSignals?"?advancedFraudSignals=false":"",n=document.createElement("script");n.src="".concat(xe).concat(t);var s=document.head||document.body;if(!s)throw new Error("Expected document.body not to be null. Stripe.js requires a <body> element.");return s.appendChild(n),n},Xe=function(e,t){!e||!e._registerWrapper||e._registerWrapper({name:"stripe-js",version:"2.1.7",startTime:t})},Z=null,Qe=function(e){return Z!==null||(Z=new Promise(function(t,n){if(typeof window=="undefined"||typeof document=="undefined"){t(null);return}if(window.Stripe&&e&&console.warn(Ce),window.Stripe){t(window.Stripe);return}try{var s=Je();s&&e?console.warn(Ce):s||(s=Ke(e)),s.addEventListener("load",function(){window.Stripe?t(window.Stripe):n(new Error("Stripe.js not available"))}),s.addEventListener("error",function(){n(new Error("Failed to load Stripe.js"))})}catch(r){n(r);return}})),Z},et=function(e,t,n){if(e===null)return null;var s=e.apply(void 0,t);return Xe(s,n),s},ke=Promise.resolve().then(function(){return Qe(null)}),qe=!1;ke.catch(function(i){qe||console.warn(i)});var re=function(){for(var e=arguments.length,t=new Array(e),n=0;n<e;n++)t[n]=arguments[n];qe=!0;var s=Date.now();return ke.then(function(r){return et(r,t,s)})};var tt=window.location.host.includes("webflow")?"stage":"prod",h=`https://${tt}.ai-or-not.com`,N="https://results.aiornot.com",D=class{constructor(e,t){this.apiUrl=e,this.bearerToken=t}async get(e){let t=`${this.apiUrl}/${e}`;try{let n=await fetch(t,{method:"GET",headers:{"Content-Type":"application/json",Authorization:`Bearer ${this.bearerToken}`}});return await this.handleResponse(n)}catch(n){throw console.error("Error",n),n}}async post(e,t){let n=`${this.apiUrl}/${e}`;try{let s=await fetch(n,{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${this.bearerToken}`},body:JSON.stringify(t)});return await this.handleResponse(s)}catch(s){throw console.error("Request error",s),s.status===429&&s.message.msg.type==="requests"&&alert(`It looks like you have reached your plan limit of ${s.message.msg.current_limit} requests. To continue, please upgrade to a new plan.`),s}}async postBinary(e,t){let n=`${this.apiUrl}/${e}`;try{let s=await fetch(n,{method:"POST",headers:{Accept:"application/json",Authorization:`Bearer ${this.bearerToken}`},body:t});return await this.handleResponse(s)}catch(s){throw console.error("Binary request error:",s),s.status===429&&s.message.msg.type==="requests"&&alert(`It looks like you have reached your plan limit of ${s.message.msg.current_limit} requests. To continue, please upgrade to a new plan.`),s}}async delete(e){let t=`${this.apiUrl}/${e}`;try{let n=await fetch(t,{method:"DELETE",headers:{accept:"*/*",Authorization:`Bearer ${this.bearerToken}`}});await this.handleResponse(n)}catch(n){throw console.error("Error when perform DELETE-request:",n),n}}async patch(e,t){let n=`${this.apiUrl}/${e}`;try{let s=await fetch(n,{method:"PATCH",headers:{"Content-Type":"application/json",Authorization:`Bearer ${this.bearerToken}`},body:JSON.stringify(t)});return await this.handleResponse(s)}catch(s){throw console.error("\u041E\u0448\u0438\u0431\u043A\u0430 \u043F\u0440\u0438 \u0432\u044B\u043F\u043E\u043B\u043D\u0435\u043D\u0438\u0438 PATCH-\u0437\u0430\u043F\u0440\u043E\u0441\u0430:",s),s}}async handleResponse(e){if(!e.ok){let t=await e.json();throw{status:e.status,message:t}}if(e.status!==204)return await e.json()}};var Te=`

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
            
            `,F=class{constructor(){this.elements=null;this.stripe=null;this.home_element=document.querySelector("#home");this.PRODUCT_ID_BASE_PLAN={id:"price_1O2Ba4Ba9yG4sk8k4y3ZnEVT",msg:"Base plan: $30/month",name:"Base plan",description:"1,000 requests per month",price:"$30",test_id:"price_1O1wSsBa9yG4sk8kej8shNYs"};this.PRODUCT_ID_PRO_PLAN={id:"price_1O2Ku4Ba9yG4sk8kIQBdzpPj",msg:"Pro plan: $250/month",name:"Pro plan",description:"10,000 requests per month",price:"$250",test_id:"price_1O1wTVBa9yG4sk8kQSPeT9rp"};this.is_test_mode=!1}showBlinkMessage(e,t){let n=document.createElement("style");n.innerHTML=Te,document.head.appendChild(n),t.innerHTML=`
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
    `,document.querySelector("#submit").addEventListener("click",()=>{this.completePayment(this.PRODUCT_ID_BASE_PLAN)})}createPaymentForm2(e){var r;let t=document.createElement("link");t.rel="stylesheet",t.href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css",t.type="text/css",document.head.appendChild(t);let n=document.createElement("link");n.rel="stylesheet",n.href="https://fonts.googleapis.com/css?family=Montserrat",document.head.appendChild(n);let s=document.createElement("style");s.innerHTML=Te,document.head.appendChild(s),document.querySelector("#home-container").innerHTML=`
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
                  <span class="price">${e.price}</span>
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
        `,(r=document.querySelector("#submit"))==null||r.addEventListener("click",()=>{this.completePayment(e)})}async createPaymentIntent(e){fetch(`${h}/aion/payments/config`).then(t=>t.json()).then(t=>{re(t.stripe_public_key).then(n=>{this.stripe=n,this.is_test_mode=t.stripe_public_key.includes("test"),fetch(`${h}/aion/payments/create_intent`,{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${this.checkUserToken()}`},body:JSON.stringify({product_id:this.is_test_mode?e.test_id:e.id})}).then(s=>s.json()).then(s=>{var a;if(s.code===10)throw console.warn(s.message),alert(s.message),window.location.href=`https://${window.location.host}/`,new Error(s.message);this.elements=this.stripe.elements({clientSecret:s.client_secret});let r=this.elements.create("payment");(a=document.querySelector("#progress-loader"))==null||a.classList.add("hide"),document.querySelector("#submit").style.visibility="visible",r.mount("#payment-element")}).catch(s=>{console.error("Something wrong when create a payment intent",s),alert("Something wrong when create a payment. Please try again.")})})})}checkUserToken(){let e=localStorage.getItem("_ms-mid");if(!e)throw new Error("User token not found");return e}async initPaymentForm(e){console.log("Init payment form...");let t=await this.initStripe();if(this.stripe=t,!t)return;let n={theme:"flat",variables:{colorPrimary:"#30313d",colorText:"#30313d"},roles:{".TermsText":{hide:!0}}},s={},r="auto",a=await this.getClientSecret(e),d=t.elements({clientSecret:a,appearance:n,loader:r});this.elements=d;let f=d.create("payment",s).mount("#payment-element")}async getClientSecret(e){return fetch(`${h}/aion/payments/create_intent`,{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${this.checkUserToken()}`},body:JSON.stringify({product_id:this.is_test_mode?e.test_id:e.id})}).then(t=>t.json()).then(t=>{if(t.code===10)throw console.warn(t.message),alert(t.message),window.location.href=`https://${window.location.host}/`,new Error(t.message);return t.client_secret})}initStripe(){return console.log("Init stripe..."),fetch(`${h}/aion/payments/config`).then(e=>e.json()).then(e=>(this.is_test_mode=e.stripe_public_key.includes("test"),re(e.stripe_public_key).then(t=>t))).catch(e=>{console.error("Something wrong when init stripe",e)})}async completePayment(e){console.log("Complete payment...");let t=document.querySelector("#submit");if(t.innerHTML.includes("Payments attempt")){window.location.href=`https://${window.location.host}/#plans`;return}let n=t.innerHTML,s=null,r=null;for(let a=1;a<=5&&(this.showBlinkMessage(`Payments attempt ${a}...`,t),s=await this.stripe.confirmPayment({elements:this.elements,confirmParams:{return_url:`https://${window.location.host}/dashboard/settings`}}).then(d=>d.error?(r=d.error.message,"error"):(console.log(d),"success")),t.innerHTML=n,console.log("result: ",s),!(s==="false"||s==="success"));a++);console.log(s,r),s==="error"&&alert(r)}async cancelSubscription(){fetch(`${h}/aion/payments/cancel_subscription`,{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${this.checkUserToken()}`}}).then(e=>e.json()).catch(e=>{console.error("Something wrong when create a checkout session",e)})}async getSubscriptionInfo(){try{let e=await fetch(`${h}/aion/payments/subscription`,{method:"GET",headers:{"Content-Type":"application/json",Authorization:`Bearer ${this.checkUserToken()}`}});return await this.handleResponse(e)}catch{return null}}async handleResponse(e){if(!e.ok){let t=await e.json();throw{status:e.status,message:t}}if(e.status!==204)return await e.json()}isValidCreditCardNumber(e){if(e=e.replace(/\s/g,"").split("").reverse().join(""),!/^[0-9]{13,19}$/.test(e))return!1;let t=0;for(let n=0;n<e.length;n++){let s=parseInt(e[n]);n%2===1&&(s*=2,s>9&&(s-=9)),t+=s}return t%10===0}};var _e=new F,w=class{constructor(){let e=l.getToken(),t=`${h}/aion/users`;this.client=new D(t,e)}static getInstance(){return w.instance||(w.instance=new w),w.instance}static async fetchRequests(e=0,t=10){try{let{client:n}=w.getInstance(),s=`data?filters=requests&offset=${e}&limit=${t}`;return await n.get(s).then(r=>r.requests.array)}catch(n){return console.error("getRequests:",n),[]}}static async fetchUsageApi(){try{let{client:e}=w.getInstance(),t="data?filters=all&offset=0&limit=1";return await e.get(t).then(n=>n.api)}catch(e){return console.error("fetchUsageApi:",e),[]}}static async signUp(){try{let{client:e}=w.getInstance();return await e.post("sign_up",{}).then(()=>!1).catch(t=>{throw t})}catch(e){throw console.error("signUp:",e),e}}static async login(){try{let{client:e}=w.getInstance();return await e.get("login")}catch(e){console.error("login:",e)}}static async delete(){try{let{client:e}=w.getInstance();return l.removeAuth(),await e.delete(""),!0}catch(e){console.error("delete:",e)}}static async fetchApiToken(){try{let{client:e}=w.getInstance();return await e.post("api_token",{})}catch(e){console.error("fetchApiToken:",e),console.error("fetchApiToken:",e)}}static async refreshApiToken(){try{let{client:e}=w.getInstance();return await e.patch("api_token",{})}catch(e){console.error("refreshApiToken:",e)}}static async fetchSubscriptionData(){let{client:e}=w.getInstance();try{let t="data?filters=all&offset=0&limit=1";return await e.get(t).then(n=>n)}catch(t){console.error("fetchSubscriptionData:",t)}}static async subscriptionInfo(){var d,f,p,L,E,R,H,b,P;let e=document.querySelector("#plan-info"),t=document.querySelector("#usage-info"),n=document.querySelector("#btn-cancel-plan");e.classList.add("hide"),t.classList.add("hide"),n.classList.add("hide");let s=[w.fetchSubscriptionData(),_e.getSubscriptionInfo()],[r,a]=await Promise.all(s);r!=null&&r.plan||(e.innerHTML=`You're on the <span class="text-color-green">Free</span> plan. You have limits of 20 & 100 checks per month via web & API, respectively. If you need more, check out our <a class="text-color-green" href='https://${window.location.host}/#plans' >plans</a>.`,t.innerHTML=`You have used ${(((d=r==null?void 0:r.requests)==null?void 0:d.total)||0)-(((p=(f=r==null?void 0:r.api)==null?void 0:f.usage)==null?void 0:p.daily)||0)} of 20 checks via web and ${((E=(L=r==null?void 0:r.api)==null?void 0:L.usage)==null?void 0:E.daily)||0} of 100 checks via API.`,e.classList.remove("hide"),t.classList.remove("hide")),(r==null?void 0:r.plan.requests_limits.quantity)===1e3&&(e.innerHTML=`You're on the <span class="text-color-green">Base</span> plan. You have limits of 1000 requests for both web & API.`,t.innerHTML=`You have used ${((R=r==null?void 0:r.requests)==null?void 0:R.total)||0} of 1000 checks via both web API.`,(H=a==null?void 0:a.subscription.meta)!=null&&H.was_canceled?(n.classList.add("hide"),t.innerHTML=t.innerHTML+` Your subscription has been canceled, expires on ${new Date(a==null?void 0:a.subscription.expiration_dt).toLocaleDateString()}.`):n.classList.remove("hide"),e.classList.remove("hide"),t.classList.remove("hide")),(r==null?void 0:r.plan.requests_limits.quantity)===1e4&&(e.innerHTML=`You're on the <span class="text-color-green">PRO</span> plan. You have limits of 10000 requests for both web & API.`,t.innerHTML=`You have used ${((b=r==null?void 0:r.requests)==null?void 0:b.total)||0} of 10000 checks via both web & API.`,a!=null&&a.subscription.meta.was_canceled?(n.classList.add("hide"),t.innerHTML=t.innerHTML+` Your subscription has been canceled, expires on ${new Date(a==null?void 0:a.subscription.expiration_dt).toLocaleDateString()}.`):n.classList.remove("hide"),e.classList.remove("hide"),t.classList.remove("hide")),(r==null?void 0:r.plan.requests_limits.quantity)>1e4&&(e.innerHTML=`You're on the <span class="text-color-green">Custom</span> plan. You have limits of ${r==null?void 0:r.plan.requests_limits.quantity} requests for both web & API.`,t.innerHTML=`You have used ${((P=r==null?void 0:r.requests)==null?void 0:P.total)||0} of 10000 checks via both web & API.`,n.innerHTML="Contact US  to update your plan.",n.classList.remove("hide"),e.classList.remove("hide"),t.classList.remove("hide")),n.addEventListener("click",async()=>{(r==null?void 0:r.plan.requests_limits.quantity)>1e4?window.location.href=`https://${window.location.host}/contact-us`:confirm("Are you sure you want to cancel your subscription?")?(alert("Your subscription has been canceled."),_e.cancelSubscription().then(z=>{console.log(z)}),window.location.href=`https://${window.location.host}/#plans`):alert("Your subscription has not been canceled.")})}},_=w;_.instance=null;var $=class{constructor(){}static isAuth(){return localStorage.getItem($.token_key)!==null}static setAuth(){localStorage.setItem($.key,"true")}static removeAuth(){localStorage.removeItem($.key)}static async init(){if(localStorage.getItem("_aion_in")===null)try{await _.signUp(),$.setAuth(),await _.login(),localStorage.setItem("_aion_in","true")}catch(e){console.log(e)}}static getToken(){var e;return(e=localStorage.getItem("_ms-mid"))!=null?e:""}static isExpiredToken(){let e=$.getToken();if((e==null?void 0:e.length)>0){let t=Se(e),n=Date.now()/1e3;return t.exp<n}return!0}static checkAuth(e){if(!$.isAuth()){let t=document.getElementById("sign-up");return t.style.display="flex",t.style.zIndex=100,e(),!0}return!1}},l=$;l.key="isSignUp",l.token_key="_ms-mid";var C=class{constructor(){let e=l.getToken(),t=`${h}/aion/ai-generated`;this.client=new D(t,e)}static getInstance(){return C.instance||(C.instance=new C),C.instance}static async getReportsByBinary(e){let{client:t}=C.getInstance();try{let n=new FormData;return n.append("binary",e,"uploaded-file.png"),await t.postBinary("reports/binary",n)}catch(n){n.status===402&&alert("Please verify your email to continue using the service"),n.status===429&&(alert(`It looks like you have reached your plan limit of ${n.message.msg.current_limit} requests. To continue, please upgrade to a new plan.`),window.location.href=`https://${window.location.host}/#plans`),console.error("Error getReportsByBinary:",n)}}static async getReportsByUrl(e){let{client:t}=C.getInstance();try{let n=`reports/url?url=${e}`;return await t.post(n,{})}catch(n){n.status===402&&alert("Please verify your email to continue using the service"),n.status===429&&(alert(`It looks like you have reached your plan limit of ${n.message.msg.current_limit} requests. To continue, please upgrade to a new plan.`),window.location.href=`https://${window.location.host}/#plans`),console.error("getReportsByUrl:",n)}}static async getAudioVerdict(e){let{client:t}=C.getInstance();try{let n=new FormData;return n.append("file",e),await t.postBinary("reports/audio/binary",n)}catch(n){n.status===402&&alert("Please verify your email to continue using the service"),n.status===429&&(alert(`It looks like you have reached your plan limit of ${n.message.msg.current_limit} requests. To continue, please upgrade to a new plan.`),window.location.href=`https://${window.location.host}/#plans`),console.error("Error getAudioVerdict:",n)}}static async getYoutubeVerdict(e){let{client:t}=C.getInstance();try{let n={url:e};return await t.post("reports/audio/link",n)}catch(n){n.status===402&&alert("Please verify your email to continue using the service"),n.status===429&&(alert(`It looks like you have reached your plan limit of ${n.message.msg.current_limit} requests. To continue, please upgrade to a new plan.`),window.location.href=`https://${window.location.host}/#plans`),console.error("Error getYoutubeVerdict:",n)}}static async getPdetReportByUrl(e){let{client:t}=C.getInstance();try{let n={object:e};return await t.post("reports/person_detection/url",n)}catch(n){n.status===402&&alert("Please verify your email to continue using the service"),n.status===429&&(alert(`It looks like you have reached your plan limit of ${n.message.msg.current_limit} requests. To continue, please upgrade to a new plan.`),window.location.href=`https://${window.location.host}/#plans`),console.error("Error getYoutubeVerdict:",n)}}static async getPdetReportByBinary(e){let{client:t}=C.getInstance();try{let n=new FormData;return n.append("file",e,"uploaded-file.png"),await t.postBinary("reports/person_detection/binary",n)}catch(n){n.status===402&&alert("Please verify your email to continue using the service"),n.status===429&&(alert(`It looks like you have reached your plan limit of ${n.message.msg.current_limit} requests. To continue, please upgrade to a new plan.`),window.location.href=`https://${window.location.host}/#plans`),console.error("Error getReportsByBinary:",n)}}},I=C;I.instance=null;var U=class{constructor(){}static async getReportsByBinary(e,t){let n=`${h}/results/api/detector/reports/raw?source=web&user_id=${t}`,s=new FormData;s.append("binary",e,"file_name.png");let r={method:"POST",headers:{Accept:"application/json",Authorization:`Bearer ${l.getToken()}`},body:s};return await fetch(n,r).then(a=>a.json())}static async getReportsByUrl(e,t){let n=`${h}/results/api/detector/reports/json?source=web&user_id=${t}`,s={method:"POST",headers:{Accept:"application/json","Content-Type":"application/json",Authorization:`Bearer ${l.getToken()}`},body:JSON.stringify({object:e})};return await fetch(n,s).then(r=>r.json())}static async sendFeedback(e,t,n,s=!1){let r={is_proper_predict:t,comment:n},a=`${h}/results/api/detector/reports/result/${e}`,d={method:"PUT",body:JSON.stringify(r),headers:{Accept:"application/json","Content-Type":"application/json"}};(s||!l.isExpiredToken())&&(a=`${h}/aion/ai-generated/reports/${e}`,d={method:"PATCH",body:JSON.stringify(r),headers:{Accept:"application/json","Content-Type":"application/json"}}),await fetch(a,d).then(f=>f.json()).then(f=>console.log(f)).catch(f=>console.error(f))}static async getAudioVerdict(e){let t=`${h}/aion/ai-generated/reports/audio/binary`,n=new FormData;return n.append("file",e),await fetch(t,{method:"POST",headers:{Accept:"application/json",ContentType:"multipart/form-data"},body:n}).then(r=>r.json())}static async getYoutubeVerdict(e){let t=`${h}/aion/ai-generated/reports/audio/link`,n={method:"POST",headers:{Accept:"application/json","Content-Type":"application/json"},body:JSON.stringify({url:e})};return await fetch(t,n).then(s=>s.json())}};var W=class{constructor(){}static isLimitExceeded(){return!!l.isExpiredToken()}static increment(){let e=localStorage.getItem(W.key),t=e===null?1:Number(e)+1;localStorage.setItem(W.key,t.toString())}},M=W;M.key="requestCount";var x=class{static async getReportsByBinary(e,t){return l.isExpiredToken()?await U.getReportsByBinary(e,t):await I.getReportsByBinary(e)}static async getReportsByUrl(e,t){return l.isExpiredToken()?await U.getReportsByUrl(e,t):await I.getReportsByUrl(e)}static async getAudioVerictByFile(e){return await I.getAudioVerdict(e)}static async getAudioVerictMock(e){let n=await((s,r)=>new Promise(a=>{setTimeout(()=>{a(r)},s)}))(1500,e);return JSON.parse(`{
            "id": "41994fdd-0161-43a9-b873-581eccbe6d72",
            "report": {
                "version": "0.0.0",
                "verdict": ${n}
            }
        }`)}static async getYoutubeVerict(e){return l.isExpiredToken()?await U.getYoutubeVerdict(e):await I.getYoutubeVerdict(e)}static async getPdetReportByUrl(e){return await I.getPdetReportByUrl(e)}static async getPdetReportByBinary(e){return console.log("getPdetReportByBinary"),await I.getPdetReportByBinary(e)}static async sendFeedback(e,t,n,s=!1){return await U.sendFeedback(e,t,n,s)}};var oe=document.querySelector("#contact-us-submit-button"),nt=document.querySelector("#name"),st=document.querySelector("#E-Mail"),rt=document.querySelector("#Note"),ot=document.querySelector("#Company");oe&&(oe.classList.remove("is-disabled"),oe.addEventListener("click",async i=>{i.preventDefault();let e={name:nt.value,email:st.value,note:rt.value,company:ot.value};for(let t in e)if(t!=="company"&&e[t]===""){alert(`Please fill in all required fields ${t}`);return}console.log(e),fetch(`${h}/aion/system/post_message`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(e)}).then(t=>{t.ok?(alert("Thank you for your application! We will contact you shortly."),window.location.href="https://aiornot.com/"):alert("Something went wrong. Please try again.")})}));var Ie=()=>{var Ee,Le;let i=document.getElementById("image-tab"),e=document.getElementById("report-screen"),t=document.querySelector("#button-report-submit"),n=document.querySelector("#input-report-comment"),s=document.querySelector("#button-report_true"),r=document.querySelector("#button-report_false"),a=document.querySelector("#button-report_close"),d=document.querySelector("#url-error-message"),f=document.querySelector("#processing_cancel"),p=document.querySelector("#image-file-input"),L=document.querySelector("#ai-or-not-current-image"),E=document.querySelector("#empty-preview-img"),R=document.querySelector("#nsfw-preview-img"),H=document.querySelector("#input-error-text"),b=document.querySelector("#ai-or-not_image-url"),P=document.querySelector("#image-url-aion-submit"),z=document.querySelector("#ai-or-not_dropzone"),k=document.querySelector("#ai-or-not_dropzone-text"),S=document.querySelector("#result-screen_col"),j=document.querySelector("#share-items-hide"),J=document.querySelector("#ai-or-not-dropzone-counter"),K=document.querySelector("#ai-or-not-dropzone-counter-w"),c=document.querySelectorAll("#image-test-image");document.querySelector("#w-node-_80502d56-29f7-2965-16f1-d6c6c4ebbd86-c4ebbd86").classList.add("hide"),j.classList.add("hide");function g(){return i.classList.contains("w--current")?"image":"audio"}let u,q,T,X;se();let Me=()=>{let o=document.querySelector("#button-report_false-text");o.classList.remove("hide"),o.textContent=o.getAttribute("report-button-text-default_reported"),r.classList.add("is-reported"),s.classList.add("hide")},He=()=>{let o=document.querySelector("#button-report_true-text");o.classList.remove("hide"),o.textContent=o.getAttribute("report-button-text-default_reported"),s.classList.add("is-reported"),r.classList.add("hide")},$e=()=>{n.value="";let o=document.querySelector("#button-report_true-text"),m=document.querySelector("#button-report_false-text");m.classList.add("hide"),o.classList.remove("hide"),o.textContent=o.getAttribute("report-button-text-default"),m.textContent=m.getAttribute("report-button-text-default"),s.classList.remove("is-reported"),r.classList.remove("is-reported"),s.classList.remove("hide"),r.classList.remove("hide")},ce=o=>{X=o;let m=document.querySelector('[fs-socialshare-element="url"]'),v=`${l.isExpiredToken()?`${N}/aiornot/`:`${N}/aiornot/users/`}${o}`;m.textContent=v,document.querySelectorAll(".result-screen_share-item").forEach(ne=>{ne.setAttribute("data-url",v)})},le=()=>{k.textContent="We support jpeg, png, webp, gif, tiff, bmp. 10 Mb of maximum size.",k.classList.remove("text-color-red"),H.textContent="Something went wrong. Try again.",d.classList.add("hide")},de=()=>{d.classList.remove("hide")},Re=()=>{d.classList.add("hide")},O=()=>{S.classList.contains("hide")?(k.textContent="File is too large (max 10 MB)",k.classList.add("text-color-red")):(H.textContent="File is too large (max 10 MB)",d.classList.remove("hide"))};p==null||p.addEventListener("change",()=>{let o=p==null?void 0:p.files[0].size,m=10*1024*1024;o>m?(T=!1,O()):(T=!0,le())});let Ue=()=>{document.querySelector("#processing-screen").classList.add("hide"),k.classList.add("error"),z.classList.add("red-border"),k.textContent="Something went wrong. Try again."},ue=()=>{k.classList.remove("error"),z.classList.remove("red-border"),k.textContent="We support jpeg, png, webp, gif, tiff, bmp. 10 Mb of maximum size."},V=()=>{document.querySelector("#choose-file-row").classList.add("hide"),document.querySelector("#legal-tip").classList.remove("hide"),document.querySelector("#processing-screen").classList.add("hide"),document.querySelector("#hero-home_title-description").classList.remove("hide"),document.querySelector("#hero-home_gallery").classList.remove("hide"),document.querySelector("#ai-or-not_dropzone").classList.remove("hide"),document.querySelector("#hero-home_drop-zone-divider").classList.remove("hide"),document.querySelector("#result-screen_col").classList.add("hide"),document.querySelector("#result-screen_image-wrapper").classList.add("hide"),L.classList.add("hide"),E.classList.remove("hide"),R.classList.remove("hide")},me=()=>{$e(),L.src="",Re(),H.textContent="Something went wrong. Try again.",document.querySelector("#choose-file-row").classList.remove("hide"),document.querySelector("#legal-tip").classList.add("hide"),document.querySelector(".processing-screen_triggers_5").click(),document.querySelector("#processing-screen").classList.remove("hide"),document.querySelector(".processing-screen_triggers_1").click(),document.querySelector("#hero-home_title-description").classList.add("hide"),document.querySelector("#hero-home_gallery").classList.add("hide"),document.querySelector("#ai-or-not_dropzone").classList.add("hide"),document.querySelector("#hero-home_drop-zone-divider").classList.add("hide"),document.querySelector("#result-screen_col").classList.remove("hide"),document.querySelector("#result-screen_image-wrapper").classList.remove("hide")};function pe(o=!1){o?(R.classList.remove("hide"),L.classList.add("hide"),E.classList.add("hide"),j.classList.add("hide")):(R.classList.add("hide"),L.classList.remove("hide"),E.classList.add("hide")),document.querySelector(".processing-screen_triggers_3").click(),document.querySelector("#processing-screen").classList.add("hide"),document.querySelector(".processing-screen_triggers_5").click(),p.value="",document.querySelector("#ai-or-not_image-url").value=""}let he=o=>{o==="unknown"?(document.getElementById("title-human").innerHTML="Sorry, but in this case we can't really say if it's AI or Not",document.getElementById("ai-or-not_result-message-50").classList.remove("hide"),document.getElementById("ai-or-not_result-message").classList.add("hide"),document.getElementById("ai-or-not_result-message-50").innerHTML="Probly the uploaded image has most likely been modified or compressed",document.getElementById("title-human").classList.remove("hide"),document.getElementById("title-ai").classList.add("hide")):(document.getElementById("title-ai").innerHTML=`This is likely <span class="text-color-green">AI</span> <div style="font-size: 1rem; color: #FFFFFFB3; font-family: Space Grotesk, sans-serif;">
<span> Free Research Preview. AI or Not may produce inaccurate results </span>
</div>`,document.getElementById("title-human").innerHTML=`This is likely <span class="text-color-green">Human</span><div style="font-size: 1rem; color: #FFFFFFB3; font-family: Space Grotesk, sans-serif;">
<span> Free Research Preview. AI or Not may produce inaccurate results </span>
</div>`,document.getElementById("ai-or-not_result-message-50").classList.add("hide"),document.getElementById("ai-or-not_result-message").classList.remove("hide"),document.querySelector("#ai-or-not_model-name").textContent=o,o==="ai"?(document.getElementById("title-human").classList.add("hide"),document.getElementById("title-ai").classList.remove("hide")):(document.getElementById("title-human").classList.remove("hide"),document.getElementById("title-ai").classList.add("hide")))},ye=async()=>{if(M.isLimitExceeded()){let o=document.getElementById("sign-up");o.style.display="flex",o.style.zIndex=100,V()}else d.classList.add("hide"),me(),await x.getReportsByUrl(u,Y).then(o=>{M.increment(),ce(o.id),L.src=u,he(o.verdict),pe(o.nsfw_detected)}).catch(o=>{S.classList.contains("hide")?de():(de(),V())})},B=document.body,lt=document.querySelector("#dropzone-fullscreen_message-tip"),dt=document.querySelector("#dropzone-fullscreen_message-format");B==null||B.addEventListener("dragover",function(o){o.preventDefault(),document.querySelector(".dropzone-fullscreen").classList.remove("hide")}),B==null||B.addEventListener("dragleave",function(o){o.preventDefault(),document.querySelector(".dropzone-fullscreen").classList.add("hide")}),B==null||B.addEventListener("drop",async function(o){if(g()!=="image")return;o.preventDefault(),document.querySelector(".dropzone-fullscreen").classList.add("hide");let m=o.dataTransfer.files[0],A=m.size,v=10*1024*1024;A>v?(T=!1,O()):(T=!0,le()),T==!0?await ge(m):O()}),p==null||p.addEventListener("change",async o=>{if(T==!0){let m=p;console.log(m);let A=m.files[0];await ge(A)}else O()});let ge=async o=>{if(me(),M.isLimitExceeded()){let v=document.getElementById("sign-up");v.style.display="flex",v.style.zIndex=100,V();return}let m=document.querySelector("#ai-or-not-current-image"),A=URL.createObjectURL(o);m.setAttribute("src",A),L.classList.remove("hide"),E.classList.add("hide"),await x.getReportsByBinary(o,Y).then(v=>{M.increment(),ce(v.id),ue(),he(v.verdict),pe(v.nsfw_detected)}).catch(v=>{Ue(),V()})};f==null||f.addEventListener("click",function(){ue(),V()}),(Ee=document.querySelector("#ai-or-not_dropzone"))==null||Ee.addEventListener("click",function(){g()==="image"&&(l.checkAuth(V)||(q="screen_home",p.click()))}),(Le=document.querySelector("#choose-file-row"))==null||Le.addEventListener("click",function(){g()==="image"&&(q="screen_result",p.click())}),P==null||P.addEventListener("click",()=>{b.value!=""&&(u=b.value,ye())});let Q=document.querySelector("#ai-or-not_image-url");Q==null||Q.addEventListener("keypress",function(o){o.key==="Enter"&&b.value!=""&&(u=b.value,ye())}),c.forEach(o=>{o==null||o.addEventListener("click",()=>{let m=o.getAttribute("test-image-url");document.querySelector("#ai-or-not_image-url").value=m,document.querySelector("#image-url-aion-submit").click(),document.querySelector("#ai-or-not_image-url").value=""})}),s==null||s.addEventListener("click",()=>{He(),x.sendFeedback(X,!0,"")}),r==null||r.addEventListener("click",()=>{}),a==null||a.addEventListener("click",()=>{}),t==null||t.addEventListener("click",()=>{x.sendFeedback(X,!1,n.value),Me()}),document==null||document.addEventListener("keydown",function(o){o.code==="Escape"&&e.style.display!=="none"&&a.click()}),n==null||n.addEventListener("change",()=>{n.value!=""?t.classList.remove("is-disabled"):t.classList.add("is-disabled")}),n==null||n.addEventListener("input",()=>{n.value!=""?t.classList.remove("is-disabled"):t.classList.add("is-disabled")});let fe=document.querySelector("#ai-or-not_image-url"),ve=document.querySelector("#image-url-aion-submit");fe.addEventListener("input",function(){let o=fe.value.trim();ze(o)?ve.classList.remove("is-disabled"):ve.classList.add("is-disabled")});let ze=o=>{try{return new URL(o),!0}catch{return!1}},ee=document.getElementById("close-sign-up");ee==null||ee.addEventListener("click",()=>{let o=document.getElementById("sign-up");o.style.display="none",o.style.zIndex=0});let we=document.querySelector("#image-quotas");l.isAuth()&&_.fetchSubscriptionData().then(o=>{var m,A;if(o){let{quantity:v}=((m=o.plan)==null?void 0:m.requests_limits)||{quantity:20},{total:te}=o.requests;if(!o.plan)try{te-=((A=o.api.usage)==null?void 0:A.daily)||0}catch(ne){console.log(ne)}console.log(o),we.innerHTML=`
            <div style="margin-top: 20px; font-size: 1rem; color: white">
            <span">
                Available ${v-te} from ${v} requests 
            </span>
            </div>`}else we.textContent=""})};var ie=()=>{let i=new F,e=document.querySelector("#bt-pay-free"),t=document.querySelector("#bt-pay-basic"),n=document.querySelector("#bt-pay-pro"),s=document.querySelector("#bt-pay-enterprice");e==null||e.addEventListener("click",()=>{localStorage.getItem("_ms-mid")?window.location.href=`https://${window.location.host}/`:window.location.href=`https://${window.location.host}/signup`}),t==null||t.addEventListener("click",()=>{if(!localStorage.getItem("_ms-mid")){window.location.href=`https://${window.location.host}/signup`;return}i.checkout(i.PRODUCT_ID_BASE_PLAN)}),n==null||n.addEventListener("click",()=>{if(!localStorage.getItem("_ms-mid")){window.location.href=`https://${window.location.host}/signup`;return}i.checkout(i.PRODUCT_ID_PRO_PLAN)}),s==null||s.addEventListener("click",()=>{window.location.href=`https://${window.location.host}/contact-us`})};var ae=()=>{document.querySelector("#processing-screen").classList.remove("hide"),document.querySelector(".processing-screen_triggers_5").click(),document.querySelector(".processing-screen_triggers_1").click()},G=()=>{document.querySelector("#processing-screen").classList.add("hide")},Pe=()=>{window.location.href="/sign-in"};var it=document.getElementById("image-tab"),at=document.getElementById("audio-tab"),ct=document.getElementById("pdet-tab");function Be(){if(it.classList.contains("w--current"))return"image";if(at.classList.contains("w--current"))return"audio";if(ct.classList.contains("w--current"))return"pdet"}var Ae=()=>{var K;let i=document.querySelectorAll("#pdet-test-image"),e=document.querySelector("#pdet-file-input"),t=document.querySelector("#aion-pdet-current-image"),n=document.querySelector("#pdet-empty-preview-img"),s=document.querySelector("#pdet-nsfw-preview-img"),r=document.querySelector("#aion-pdet-image-url"),a=document.querySelector("#aion-pdet-url-submit"),d=document.querySelector("#aion-pdet-dropzone"),f=document.querySelector("#aion-pdet-dropzone-text"),p,L,E,R,H=()=>{var c,y,g,u,q,T;(c=document.querySelector("#pdet-hero-home-title-description"))==null||c.classList.add("hide"),(y=document.querySelector("#pdet-hero-home-gallery"))==null||y.classList.add("hide"),(g=document.querySelector("#aion-pdet-dropzone"))==null||g.classList.add("hide"),(u=document.querySelector("#pdet-button-report-true"))==null||u.classList.add("hide"),(q=document.querySelector("#pdet-button-report-false"))==null||q.classList.add("hide"),(T=document.querySelector("#pdet-hero-home_drop-zone-divider"))==null||T.classList.add("hide")},b=()=>{d.classList.add("red-border"),f.textContent="Something went wrong. Try again.",f.classList.add("error")};e==null||e.addEventListener("change",()=>{let c=e==null?void 0:e.files[0].size,y=10*1024*1024;c>y?E=!1:E=!0});function P(c=!1,y,g){var u,q;H(),G(),c||(s.classList.add("hide"),t.classList.remove("hide"),n.classList.add("hide"),(u=document.querySelector("#result-screen-pdet-wrapper"))==null||u.classList.remove("hide"),t.classList.remove("hide"),t.src=g,(q=document.querySelector("#pdet-result-screen-col"))==null||q.classList.remove("hide"),document.getElementById("pdet-title-human").classList.remove("hide"),document.getElementById("pdet-title-human").innerHTML=`This is likely <span class="text-color-green">${y}</span><div style="font-size: 1rem; color: #FFFFFFB3; font-family: Space Grotesk, sans-serif;">
<span> Free Research Preview. AI or Not may produce inaccurate results </span>
</div>`),r.value=""}let z=async()=>{console.log("pastedUrl",p),await x.getPdetReportByUrl(p).then(c=>{P(c.nsfw_detected,c!=null&&c.verdict?"AI":"Human",c.url)}).catch(c=>{G(),b()})},k=async c=>{ae();let y=document.querySelector("#ai-or-not-current-image"),g=URL.createObjectURL(c);y.setAttribute("src",g),t.classList.remove("hide"),n.classList.add("hide"),await x.getPdetReportByBinary(c).then(u=>{P(u.nsfw_detected,u!=null&&u.verdict?"AI":"Human",u.url)}).catch(u=>{G(),b()})},S=document.body;S==null||S.addEventListener("dragover",function(c){c.preventDefault(),document.querySelector(".dropzone-fullscreen").classList.remove("hide")}),S==null||S.addEventListener("dragleave",function(c){c.preventDefault(),document.querySelector(".dropzone-fullscreen").classList.add("hide")}),S==null||S.addEventListener("drop",async function(c){if(Be()!=="pdet")return;c.preventDefault(),document.querySelector(".dropzone-fullscreen").classList.add("hide");let y=c.dataTransfer.files[0],g=y.size,u=10*1024*1024;g>u?E=!1:E=!0,E==!0?await k(y):b()}),e==null||e.addEventListener("change",async c=>{if(E==!0){let g=e.files[0];await k(g)}else console.log("fileSizeAllow"),b()}),d==null||d.addEventListener("click",function(){l.checkAuth(Pe)||(L="screen_home",e.click())}),(K=document.querySelector("#choose-file-row"))==null||K.addEventListener("click",function(){L="screen_result",e.click()}),a==null||a.addEventListener("click",()=>{ae(),r.value!==""&&(p=r.value,z())}),r.addEventListener("input",function(){let c=r.value.trim();j(c)?a.classList.remove("is-disabled"):a.classList.add("is-disabled")});let j=c=>{try{return new URL(c),!0}catch{return!1}};i.forEach(c=>{c.addEventListener("click",()=>{let y=c.getAttribute("test-image-url");r.value=y,a.click(),r.value=""})});let J=document.querySelector("#image-quotas");l.isAuth()&&_.fetchSubscriptionData().then(c=>{var y,g;if(c){let{quantity:u}=((y=c.plan)==null?void 0:y.requests_limits)||{quantity:20},{total:q}=c.requests;if(!c.plan)try{q-=((g=c.api.usage)==null?void 0:g.daily)||0}catch(T){console.log(T)}console.log(c),J.innerHTML=`
            <div style="margin-top: 20px; font-size: 1rem; color: white">
            <span">
                Available ${u-q} from ${u} requests
            </span>
            </div>`}else J.textContent=""})};Ie();Ae();ie();})();
