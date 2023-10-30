"use strict";(()=>{var F=`
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
  animation: fadein 0.5s, fadeout 0.5s 2.5s;
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
`,U=document.createElement("style");U.innerHTML=F;document.head.appendChild(U);var g=document.getElementById("toast");function V(s){g.classList.remove("hide");let e=document.createElement("span");e.innerHTML="x",e.className="close-button",e.addEventListener("click",()=>{g.classList.add("hide")}),g.innerHTML=s,g.appendChild(e),g.classList.add("show")}var R=s=>{V(`<p style="font-size: 1.5rem; padding: 2rem;">Amazing! You\u2019ve just upgraded your account, welcome to the exclusive ranks of AI or Not <span style="color: #aefc06; font-weight: bold ">${s}</span> users. Thank you for being a supporter of AI or Not and a purveyor of the truth!</p>`)};function j(s){var e=s.split(".")[1],t=e.replace(/-/g,"+").replace(/_/g,"/"),n=decodeURIComponent(atob(t).split("").map(function(r){return"%"+("00"+r.charCodeAt(0).toString(16)).slice(-2)}).join(""));return JSON.parse(n)}var D="https://js.stripe.com/v3",J=/^https:\/\/js\.stripe\.com\/v3\/?(\?.*)?$/,q="loadStripe.setLoadParameters was called but an existing Stripe.js script already exists in the document; existing script parameters will be used",G=function(){for(var e=document.querySelectorAll('script[src^="'.concat(D,'"]')),t=0;t<e.length;t++){var n=e[t];if(J.test(n.src))return n}return null},W=function(e){var t=e&&!e.advancedFraudSignals?"?advancedFraudSignals=false":"",n=document.createElement("script");n.src="".concat(D).concat(t);var r=document.head||document.body;if(!r)throw new Error("Expected document.body not to be null. Stripe.js requires a <body> element.");return r.appendChild(n),n},K=function(e,t){!e||!e._registerWrapper||e._registerWrapper({name:"stripe-js",version:"2.1.7",startTime:t})},b=null,Q=function(e){return b!==null||(b=new Promise(function(t,n){if(typeof window=="undefined"||typeof document=="undefined"){t(null);return}if(window.Stripe&&e&&console.warn(q),window.Stripe){t(window.Stripe);return}try{var r=G();r&&e?console.warn(q):r||(r=W(e)),r.addEventListener("load",function(){window.Stripe?t(window.Stripe):n(new Error("Stripe.js not available"))}),r.addEventListener("error",function(){n(new Error("Failed to load Stripe.js"))})}catch(o){n(o);return}})),b},X=function(e,t,n){if(e===null)return null;var r=e.apply(void 0,t);return K(r,n),r},M=Promise.resolve().then(function(){return Q(null)}),O=!1;M.catch(function(s){O||console.warn(s)});var P=function(){for(var e=arguments.length,t=new Array(e),n=0;n<e;n++)t[n]=arguments[n];O=!0;var r=Date.now();return M.then(function(o){return X(o,t,r)})};var Z=window.location.host.includes("webflow")?"stage":"prod",l=`https://${Z}.ai-or-not.com`;var f=class{constructor(e,t){this.apiUrl=e,this.bearerToken=t}async get(e){let t=`${this.apiUrl}/${e}`;try{let n=await fetch(t,{method:"GET",headers:{"Content-Type":"application/json",Authorization:`Bearer ${this.bearerToken}`}});return await this.handleResponse(n)}catch(n){throw console.error("Error",n),n}}async post(e,t){let n=`${this.apiUrl}/${e}`;try{let r=await fetch(n,{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${this.bearerToken}`},body:JSON.stringify(t)});return await this.handleResponse(r)}catch(r){throw console.error("Request error",r),r.status===429&&r.message.msg.type==="requests"&&alert(`It looks like you have reached your plan limit of ${r.message.msg.current_limit} requests. To continue, please upgrade to a new plan.`),r}}async postBinary(e,t){let n=`${this.apiUrl}/${e}`;try{let r=await fetch(n,{method:"POST",headers:{Accept:"application/json",Authorization:`Bearer ${this.bearerToken}`},body:t});return await this.handleResponse(r)}catch(r){throw console.error("Binary request error:",r),r.status===429&&r.message.msg.type==="requests"&&alert(`It looks like you have reached your plan limit of ${r.message.msg.current_limit} requests. To continue, please upgrade to a new plan.`),r}}async delete(e){let t=`${this.apiUrl}/${e}`;try{let n=await fetch(t,{method:"DELETE",headers:{accept:"*/*",Authorization:`Bearer ${this.bearerToken}`}});await this.handleResponse(n)}catch(n){throw console.error("Error when perform DELETE-request:",n),n}}async patch(e,t){let n=`${this.apiUrl}/${e}`;try{let r=await fetch(n,{method:"PATCH",headers:{"Content-Type":"application/json",Authorization:`Bearer ${this.bearerToken}`},body:JSON.stringify(t)});return await this.handleResponse(r)}catch(r){throw console.error("\u041E\u0448\u0438\u0431\u043A\u0430 \u043F\u0440\u0438 \u0432\u044B\u043F\u043E\u043B\u043D\u0435\u043D\u0438\u0438 PATCH-\u0437\u0430\u043F\u0440\u043E\u0441\u0430:",r),r}}async handleResponse(e){if(!e.ok){let t=await e.json();throw{status:e.status,message:t}}if(e.status!==204)return await e.json()}};var H=`

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
            
            `,w=class{constructor(){this.elements=null;this.stripe=null;this.home_element=document.querySelector("#home");this.PRODUCT_ID_BASE_PLAN={id:"price_1O2Ba4Ba9yG4sk8k4y3ZnEVT",msg:"Base plan: $30/month",name:"Base plan",description:"1,000 requests per month",price:"$30",test_id:"price_1O1wSsBa9yG4sk8kej8shNYs"};this.PRODUCT_ID_PRO_PLAN={id:"price_1O2Ku4Ba9yG4sk8kIQBdzpPj",msg:"Pro plan: $250/month",name:"Pro plan",description:"10,000 requests per month",price:"$250",test_id:"price_1O1wTVBa9yG4sk8kQSPeT9rp"};this.is_test_mode=!1}showBlinkMessage(e,t){let n=document.createElement("style");n.innerHTML=H,document.head.appendChild(n),t.innerHTML=`
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
    `,document.querySelector("#submit").addEventListener("click",()=>{this.completePayment(this.PRODUCT_ID_BASE_PLAN)})}createPaymentForm2(e){var o;let t=document.createElement("link");t.rel="stylesheet",t.href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css",t.type="text/css",document.head.appendChild(t);let n=document.createElement("link");n.rel="stylesheet",n.href="https://fonts.googleapis.com/css?family=Montserrat",document.head.appendChild(n);let r=document.createElement("style");r.innerHTML=H,document.head.appendChild(r),document.querySelector("#home-container").innerHTML=`
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
        `,(o=document.querySelector("#submit"))==null||o.addEventListener("click",()=>{this.completePayment(e)})}async createPaymentIntent(e){fetch(`${l}/aion/payments/config`).then(t=>t.json()).then(t=>{P(t.stripe_public_key).then(n=>{this.stripe=n,this.is_test_mode=t.stripe_public_key.includes("test"),fetch(`${l}/aion/payments/create_intent`,{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${this.checkUserToken()}`},body:JSON.stringify({product_id:this.is_test_mode?e.test_id:e.id})}).then(r=>r.json()).then(r=>{var i;if(r.code===10)throw console.warn(r.message),alert(r.message),window.location.href=`https://${window.location.host}/`,new Error(r.message);this.elements=this.stripe.elements({clientSecret:r.client_secret});let o=this.elements.create("payment");(i=document.querySelector("#progress-loader"))==null||i.classList.add("hide"),document.querySelector("#submit").style.visibility="visible",o.mount("#payment-element")}).catch(r=>{console.error("Something wrong when create a payment intent",r),alert("Something wrong when create a payment. Please try again.")})})})}checkUserToken(){let e=localStorage.getItem("_ms-mid");if(!e)throw new Error("User token not found");return e}async initPaymentForm(e){console.log("Init payment form...");let t=await this.initStripe();if(this.stripe=t,!t)return;let n={theme:"flat",variables:{colorPrimary:"#30313d",colorText:"#30313d"},roles:{".TermsText":{hide:!0}}},r={},o="auto",i=await this.getClientSecret(e),u=t.elements({clientSecret:i,appearance:n,loader:o});this.elements=u;let y=u.create("payment",r).mount("#payment-element")}async getClientSecret(e){return fetch(`${l}/aion/payments/create_intent`,{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${this.checkUserToken()}`},body:JSON.stringify({product_id:this.is_test_mode?e.test_id:e.id})}).then(t=>t.json()).then(t=>{if(t.code===10)throw console.warn(t.message),alert(t.message),window.location.href=`https://${window.location.host}/`,new Error(t.message);return t.client_secret})}initStripe(){return console.log("Init stripe..."),fetch(`${l}/aion/payments/config`).then(e=>e.json()).then(e=>(this.is_test_mode=e.stripe_public_key.includes("test"),P(e.stripe_public_key).then(t=>t))).catch(e=>{console.error("Something wrong when init stripe",e)})}async completePayment(e){console.log("Complete payment...");let t=document.querySelector("#submit");if(t.innerHTML.includes("Payments attempt")){window.location.href=`https://${window.location.host}/#plans`;return}let n=t.innerHTML,r=null,o=null;for(let i=1;i<=5&&(this.showBlinkMessage(`Payments attempt ${i}...`,t),r=await this.stripe.confirmPayment({elements:this.elements,confirmParams:{return_url:`https://${window.location.host}/dashboard/settings?payment_success=${e.name}`}}).then(u=>u.error?(o=u.error.message,"error"):(console.log(u),"success")),t.innerHTML=n,console.log("result: ",r),!(r==="false"||r==="success"));i++);console.log(r,o),r==="error"&&alert(o)}async cancelSubscription(){fetch(`${l}/aion/payments/cancel_subscription`,{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${this.checkUserToken()}`}}).then(e=>e.json()).catch(e=>{console.error("Something wrong when create a checkout session",e)})}async getSubscriptionInfo(){try{let e=await fetch(`${l}/aion/payments/subscription`,{method:"GET",headers:{"Content-Type":"application/json",Authorization:`Bearer ${this.checkUserToken()}`}});return await this.handleResponse(e)}catch{return null}}async handleResponse(e){if(!e.ok){let t=await e.json();throw{status:e.status,message:t}}if(e.status!==204)return await e.json()}isValidCreditCardNumber(e){if(e=e.replace(/\s/g,"").split("").reverse().join(""),!/^[0-9]{13,19}$/.test(e))return!1;let t=0;for(let n=0;n<e.length;n++){let r=parseInt(e[n]);n%2===1&&(r*=2,r>9&&(r-=9)),t+=r}return t%10===0}};var z=new w,c=class{constructor(e){let t=a.getToken(),n=`${l}/aion/${e}`;this.client=new f(n,t)}static sendVerificationEmail(){let{client:e}=c.getInstance();return e.get("email_verification",{})}static getInstance(e="users"){return c.instance||(c.instance=new c(e)),c.instance}static async fetchRequests(e=0,t=10){try{let{client:n}=c.getInstance(),r=`data?filters=requests&offset=${e}&limit=${t}`;return await n.get(r).then(o=>o.requests.array)}catch(n){return console.error("getRequests:",n),[]}}static async fetchUsageApi(){try{let{client:e}=c.getInstance(),t="data?filters=all&offset=0&limit=1";return await e.get(t).then(n=>n.api)}catch(e){return console.error("fetchUsageApi:",e),[]}}static async signUp(){try{let{client:e}=c.getInstance();return await e.post("sign_up",{}).then(()=>!1).catch(t=>{throw t})}catch(e){throw console.error("signUp:",e),e}}static async login(){try{let{client:e}=c.getInstance();return await e.get("login")}catch(e){console.error("login:",e)}}static async delete(){try{let{client:e}=c.getInstance();return a.removeAuth(),await e.delete(""),!0}catch(e){console.error("delete:",e)}}static async fetchApiToken(){try{let{client:e}=c.getInstance();return await e.post("api_token",{})}catch(e){console.error("fetchApiToken:",e),console.error("fetchApiToken:",e)}}static async refreshApiToken(){try{let{client:e}=c.getInstance();return await e.patch("api_token",{})}catch(e){console.error("refreshApiToken:",e)}}static async fetchSubscriptionData(){let{client:e}=c.getInstance();try{let t="data?filters=all&offset=0&limit=1";return await e.get(t).then(n=>n)}catch(t){console.error("fetchSubscriptionData:",t)}}static async subscriptionInfo(){var u,y,S,$,I,E,A,_,L,B,C;let e=document.querySelector("#plan-info"),t=document.querySelector("#usage-info"),n=document.querySelector("#btn-cancel-plan");e.classList.add("hide"),t.classList.add("hide"),n.classList.add("hide");let r=[c.fetchSubscriptionData(),z.getSubscriptionInfo()],[o,i]=await Promise.all(r);console.log(o),console.log(i),o!=null&&o.plan||(e.innerHTML=`You're on the <span class="text-color-green">Free</span> plan. You have limits of 20 & 100 checks per month via web & API, respectively. If you need more, check out our <a class="text-color-green" href='https://${window.location.host}/#plans' >plans</a>.`,t.innerHTML=`You have used ${(((u=o==null?void 0:o.requests)==null?void 0:u.total)||0)-(((S=(y=o==null?void 0:o.api)==null?void 0:y.usage)==null?void 0:S.daily)||0)} of 20 checks via web and ${((I=($=o==null?void 0:o.api)==null?void 0:$.usage)==null?void 0:I.daily)||0} of 100 checks via API.`,e.classList.remove("hide"),t.classList.remove("hide")),(o==null?void 0:o.plan.requests_limits.quantity)===1e3&&(e.innerHTML=`You're on the <span class="text-color-green">Base</span> plan. You have limits of 1000 requests for both web & API.`,t.innerHTML=`You have used ${((E=o==null?void 0:o.requests)==null?void 0:E.total)||0} of 1000 checks via both web API.`,(A=i==null?void 0:i.subscription.meta)!=null&&A.was_canceled?(n.classList.add("hide"),t.innerHTML=t.innerHTML+` Your subscription has been canceled, expires on ${new Date(i==null?void 0:i.subscription.expiration_dt).toLocaleDateString()}.`):n.classList.remove("hide"),e.classList.remove("hide"),t.classList.remove("hide")),(o==null?void 0:o.plan.requests_limits.quantity)===1e4&&(e.innerHTML=`You're on the <span class="text-color-green">PRO</span> plan. You have limits of 10000 requests for both web & API.`,t.innerHTML=`You have used ${((_=o==null?void 0:o.requests)==null?void 0:_.total)||0} of 10000 checks via both web & API.`,(B=(L=i==null?void 0:i.subscription)==null?void 0:L.meta)!=null&&B.was_canceled?(n.classList.add("hide"),t.innerHTML=t.innerHTML+` Your subscription has been canceled, expires on ${new Date(i==null?void 0:i.subscription.expiration_dt).toLocaleDateString()}.`):n.classList.remove("hide"),e.classList.remove("hide"),t.classList.remove("hide")),(o==null?void 0:o.plan.requests_limits.quantity)>1e4&&(e.innerHTML=`You're on the <span class="text-color-green">Custom</span> plan. You have limits of ${o==null?void 0:o.plan.requests_limits.quantity} requests for both web & API.`,t.innerHTML=`You have used ${((C=o==null?void 0:o.requests)==null?void 0:C.total)||0} of 10000 checks via both web & API.`,n.innerHTML="Contact US  to update your plan.",n.classList.remove("hide"),e.classList.remove("hide"),t.classList.remove("hide")),n.addEventListener("click",async()=>{(o==null?void 0:o.plan.requests_limits.quantity)>1e4?window.location.href=`https://${window.location.host}/contact-us`:confirm("Are you sure you want to cancel your subscription?")?(alert("Your subscription has been canceled."),z.cancelSubscription().then(Y=>{console.log(Y)}),window.location.href=`https://${window.location.host}/#plans`):alert("Your subscription has not been canceled.")})}static async getUserInfo(){let{client:e}=c.getInstance();try{return await e.get("")}catch(t){console.error("getUserInfo:",t)}}static async getTransactions(){let{client:e}=new c("payments");try{return await e.get("invoices")}catch(t){console.error("getTransactions:",t)}}},p=c;p.instance=null;var m=class{constructor(){}static getUserInfo(){return p.getUserInfo()}static isAuth(){return localStorage.getItem(m.token_key)!==null}static setAuth(){localStorage.setItem(m.key,"true")}static removeAuth(){localStorage.removeItem(m.key)}static async init(){if(localStorage.getItem("_aion_in")===null)try{await p.signUp(),m.setAuth(),await p.login(),localStorage.setItem("_aion_in","true")}catch(e){console.log(e)}}static getToken(){var e;return(e=localStorage.getItem("_ms-mid"))!=null?e:""}static isExpiredToken(){let e=m.getToken();if((e==null?void 0:e.length)>0){let t=j(e),n=Date.now()/1e3;return t.exp<n}return!0}static checkAuth(e){if(!m.isAuth()){let t=document.getElementById("sign-up");return t.style.display="flex",t.style.zIndex=100,e(),!0}return!1}static async sendVerifiedEmail(){console.log("sendVerifiedEmail"),await p.sendVerificationEmail()}},a=m;a.key="isSignUp",a.token_key="_ms-mid";var d=class{constructor(){let e=a.getToken(),t=`${l}/aion/ai-generated`;this.client=new f(t,e)}static getInstance(){return d.instance||(d.instance=new d),d.instance}static async getReportsByBinary(e){let{client:t}=d.getInstance();try{let n=new FormData;return n.append("binary",e,"uploaded-file.png"),await t.postBinary("reports/binary",n)}catch(n){n.status===402&&alert("Please verify your email to continue using the service"),n.status===429&&(alert(`It looks like you have reached your plan limit of ${n.message.msg.current_limit} requests. To continue, please upgrade to a new plan.`),window.location.href=`https://${window.location.host}/#plans`),console.error("Error getReportsByBinary:",n)}}static async getReportsByUrl(e){let{client:t}=d.getInstance();try{let n=`reports/url?url=${e}`;return await t.post(n,{})}catch(n){n.status===402&&alert("Please verify your email to continue using the service"),n.status===429&&(alert(`It looks like you have reached your plan limit of ${n.message.msg.current_limit} requests. To continue, please upgrade to a new plan.`),window.location.href=`https://${window.location.host}/#plans`),console.error("getReportsByUrl:",n)}}static async getAudioVerdict(e){let{client:t}=d.getInstance();try{let n=new FormData;return n.append("file",e),await t.postBinary("reports/audio/binary",n)}catch(n){n.status===402&&alert("Please verify your email to continue using the service"),n.status===429&&(alert(`It looks like you have reached your plan limit of ${n.message.msg.current_limit} requests. To continue, please upgrade to a new plan.`),window.location.href=`https://${window.location.host}/#plans`),console.error("Error getAudioVerdict:",n)}}static async getYoutubeVerdict(e){let{client:t}=d.getInstance();try{let n={url:e};return await t.post("reports/audio/link",n)}catch(n){n.status===402&&alert("Please verify your email to continue using the service"),n.status===429&&(alert(`It looks like you have reached your plan limit of ${n.message.msg.current_limit} requests. To continue, please upgrade to a new plan.`),window.location.href=`https://${window.location.host}/#plans`),console.error("Error getYoutubeVerdict:",n)}}static async getPdetReportByUrl(e){let{client:t}=d.getInstance();try{let n={object:e};return await t.post("reports/person_detection/url",n)}catch(n){n.status===402&&alert("Please verify your email to continue using the service"),n.status===429&&(alert(`It looks like you have reached your plan limit of ${n.message.msg.current_limit} requests. To continue, please upgrade to a new plan.`),window.location.href=`https://${window.location.host}/#plans`),console.error("Error getYoutubeVerdict:",n)}}static async getPdetReportByBinary(e){let{client:t}=d.getInstance();try{let n=new FormData;return n.append("file",e,"uploaded-file.png"),await t.postBinary("reports/person_detection/binary",n)}catch(n){n.status===402&&alert("Please verify your email to continue using the service"),n.status===429&&(alert(`It looks like you have reached your plan limit of ${n.message.msg.current_limit} requests. To continue, please upgrade to a new plan.`),window.location.href=`https://${window.location.host}/#plans`),console.error("Error getReportsByBinary:",n)}}},v=d;v.instance=null;var k=class{constructor(){}static isLimitExceeded(){return!!a.isExpiredToken()}static increment(){let e=localStorage.getItem(k.key),t=e===null?1:Number(e)+1;localStorage.setItem(k.key,t.toString())}},T=k;T.key="requestCount";var h=document.querySelector("#btn-verified-email"),ee=document.querySelector("#btn-delete-account"),te=document.querySelector("#transactions-section"),ne=document.querySelector("#transaction-table"),re=document.querySelector("#sign-out"),oe=new URLSearchParams(window.location.search),x=oe.get("payment_success"),se=x==null?void 0:x.split(" ")[0];x&&R(se);var ie=`
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
    
`,N=document.createElement("style");N.innerHTML=ie;document.head.appendChild(N);a.init();p.subscriptionInfo().then(s=>{});h.classList.remove("hide");a.getUserInfo().then(s=>{s.is_verified?(h.innerHTML="Email has been verified",h.classList.remove("settings-edit"),h.disable=!0):(h.classList.remove("hide"),h.onclick=async()=>{h.classList.add("hide"),await a.sendVerifiedEmail(),alert("Email sent. Check your inbox.")})});re.onclick=()=>{a.removeAuth(),localStorage.removeItem("_aion_in")};ee.onclick=async()=>{if(confirm("Are you sure you want to delete your account?")){if(await a.init(),!await p.delete()){alert("Something went wrong. Please try again later.");return}localStorage.removeItem("_aion_in"),alert("Your account has been deleted."),window.location.href=`https://${window.location.host}/`}};ne.innerHTML=`
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
`;function ae(s){var y;let e=(y=document.getElementById("table"))==null?void 0:y.getElementsByTagName("tbody")[0],t=e==null?void 0:e.insertRow(e.rows.length),n=t==null?void 0:t.insertCell(0),r=t==null?void 0:t.insertCell(1),o=t==null?void 0:t.insertCell(2),i=t==null?void 0:t.insertCell(3),u=t==null?void 0:t.insertCell(4);n.innerHTML=`<p class="cell"> ${s.num} </p>`,r.innerHTML=`<p class="cell"> ${s.name} </p>`,o.innerHTML=`<p class="cell"> ${s.amount} </p>`,i.innerHTML=`<p class="cell" style="color: ${s.status==="paid"?"#00D924":"red"}" > ${s.status} </p>`,u.innerHTML=`<a class="cell" href="${s.invoice_link}" target="_blank" style="text-decoration: underline"> Invoice </a>`}p.getTransactions().then(({invoices:s})=>{s.forEach((e,t)=>{ae({num:t+1,name:e==null?void 0:e.created_dt,amount:`$${e==null?void 0:e.amount}`,status:e==null?void 0:e.status,invoice_link:e==null?void 0:e.link}),te.classList.remove("hide")})});})();
