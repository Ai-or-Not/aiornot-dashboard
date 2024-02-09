"use strict";(()=>{var He=Object.create;var he=Object.defineProperty;var Ue=Object.getOwnPropertyDescriptor;var Re=Object.getOwnPropertyNames;var ze=Object.getPrototypeOf,Ve=Object.prototype.hasOwnProperty;var De=(i=>typeof require!="undefined"?require:typeof Proxy!="undefined"?new Proxy(i,{get:(e,t)=>(typeof require!="undefined"?require:e)[t]}):i)(function(i){if(typeof require!="undefined")return require.apply(this,arguments);throw new Error('Dynamic require of "'+i+'" is not supported')});var Fe=(i,e,t,n)=>{if(e&&typeof e=="object"||typeof e=="function")for(let s of Re(e))!Ve.call(i,s)&&s!==t&&he(i,s,{get:()=>e[s],enumerable:!(n=Ue(e,s))||n.enumerable});return i};var je=(i,e,t)=>(t=i!=null?He(ze(i)):{},Fe(e||!i||!i.__esModule?he(t,"default",{value:i,enumerable:!0}):t,i));function ye(i){var e=i.split(".")[1],t=e.replace(/-/g,"+").replace(/_/g,"/"),n=decodeURIComponent(atob(t).split("").map(function(s){return"%"+("00"+s.charCodeAt(0).toString(16)).slice(-2)}).join(""));return JSON.parse(n)}var fe="https://js.stripe.com/v3",Oe=/^https:\/\/js\.stripe\.com\/v3\/?(\?.*)?$/,ge="loadStripe.setLoadParameters was called but an existing Stripe.js script already exists in the document; existing script parameters will be used",Ne=function(){for(var e=document.querySelectorAll('script[src^="'.concat(fe,'"]')),t=0;t<e.length;t++){var n=e[t];if(Oe.test(n.src))return n}return null},Ze=function(e){var t=e&&!e.advancedFraudSignals?"?advancedFraudSignals=false":"",n=document.createElement("script");n.src="".concat(fe).concat(t);var s=document.head||document.body;if(!s)throw new Error("Expected document.body not to be null. Stripe.js requires a <body> element.");return s.appendChild(n),n},Ye=function(e,t){!e||!e._registerWrapper||e._registerWrapper({name:"stripe-js",version:"2.1.7",startTime:t})},D=null,We=function(e){return D!==null||(D=new Promise(function(t,n){if(typeof window=="undefined"||typeof document=="undefined"){t(null);return}if(window.Stripe&&e&&console.warn(ge),window.Stripe){t(window.Stripe);return}try{var s=Ne();s&&e?console.warn(ge):s||(s=Ze(e)),s.addEventListener("load",function(){window.Stripe?t(window.Stripe):n(new Error("Stripe.js not available"))}),s.addEventListener("error",function(){n(new Error("Failed to load Stripe.js"))})}catch(o){n(o);return}})),D},Ge=function(e,t,n){if(e===null)return null;var s=e.apply(void 0,t);return Ye(s,n),s},ve=Promise.resolve().then(function(){return We(null)}),we=!1;ve.catch(function(i){we||console.warn(i)});var te=function(){for(var e=arguments.length,t=new Array(e),n=0;n<e;n++)t[n]=arguments[n];we=!0;var s=Date.now();return ve.then(function(o){return Ge(o,t,s)})};var Je=window.location.host.includes("webflow")?"stage":"prod",u=`https://${Je}.ai-or-not.com`,F="https://results.aiornot.com",$=class{constructor(e,t){this.apiUrl=e,this.bearerToken=t}async get(e){let t=`${this.apiUrl}/${e}`;try{let n=await fetch(t,{method:"GET",headers:{"Content-Type":"application/json",Authorization:`Bearer ${this.bearerToken}`}});return await this.handleResponse(n)}catch(n){throw console.error("Error",n),n}}async post(e,t){let n=`${this.apiUrl}/${e}`;try{let s=await fetch(n,{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${this.bearerToken}`},body:JSON.stringify(t)});return await this.handleResponse(s)}catch(s){throw console.error("Request error",s),s.status===429&&alert(`It looks like you have reached your plan limit of ${s.message.current_limit} requests. To continue, please upgrade to a new plan.`),s}}async postBinary(e,t){let n=`${this.apiUrl}/${e}`;try{let s=await fetch(n,{method:"POST",headers:{Accept:"application/json",Authorization:`Bearer ${this.bearerToken}`},body:t});return await this.handleResponse(s)}catch(s){throw console.error("Binary request error:",s),s.status===429&&alert(`It looks like you have reached your plan limit of ${s.message.current_limit} requests. To continue, please upgrade to a new plan.`),s}}async delete(e){let t=`${this.apiUrl}/${e}`;try{let n=await fetch(t,{method:"DELETE",headers:{accept:"*/*",Authorization:`Bearer ${this.bearerToken}`}});await this.handleResponse(n)}catch(n){throw console.error("Error when perform DELETE-request:",n),n}}async patch(e,t){let n=`${this.apiUrl}/${e}`;try{let s=await fetch(n,{method:"PATCH",headers:{"Content-Type":"application/json",Authorization:`Bearer ${this.bearerToken}`},body:JSON.stringify(t)});return await this.handleResponse(s)}catch(s){throw console.error("\u041E\u0448\u0438\u0431\u043A\u0430 \u043F\u0440\u0438 \u0432\u044B\u043F\u043E\u043B\u043D\u0435\u043D\u0438\u0438 PATCH-\u0437\u0430\u043F\u0440\u043E\u0441\u0430:",s),s}}async handleResponse(e){if(!e.ok){let t=await e.json();throw{status:e.status,message:t}}if(e.status!==204)return await e.json()}};var Xe=`
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
`,Ee=document.createElement("style");Ee.innerHTML=Xe;document.head.appendChild(Ee);var M=document.getElementById("toast");function Ke(i,e="info"){M.classList.remove("hide");let t=document.createElement("span");t.innerHTML="x",t.className="close-button",t.addEventListener("click",()=>{M.classList.add("hide"),e!=="error"&&(window.location.href=`https://${window.location.host}/dashboard/settings`)}),M.innerHTML=i,M.appendChild(t),M.classList.add("show"),M.style.borderColor=e==="error"?"red":"#aefc06"}var be=(i,e)=>{Ke(`<p style="font-size: 1.5rem; padding: 2rem;">We are pleased to inform you that you currently have a credit of $${i} from a previous paid subscription after that we successfully update your plan to <span style="color: #aefc06; font-weight: bold ">${e.split(" ")[0]}</span>! If you have any questions please contact us.</p>`)};var Le=`

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
            
            `,R=class{constructor(){this.elements=null;this.stripe=null;this.home_element=document.querySelector("#home");this.PRODUCT_ID_BASE_9USD_PLAN={id:"price_1OABgwBa9yG4sk8kc2owagiH",msg:"Base plan: $9/month",name:"Base plan",description:"300 requests per month",price:"$9",test_id:"price_1OABdXBa9yG4sk8kcXyILlLm"};this.PRODUCT_ID_BASE_PLAN={id:"price_1O2Ba4Ba9yG4sk8k4y3ZnEVT",msg:"Base plan: $30/month",name:"Base plan",description:"1,000 requests per month",price:"$30",test_id:"price_1O1wSsBa9yG4sk8kej8shNYs"};this.PRODUCT_ID_PRO_PLAN={id:"price_1O2Ku4Ba9yG4sk8kIQBdzpPj",msg:"Pro plan: $250/month",name:"Pro plan",description:"10,000 requests per month",price:"$250",test_id:"price_1O7HCzBa9yG4sk8kYEld9lNl"};this.is_test_mode=!1}showBlinkMessage(e,t){let n=document.createElement("style");n.innerHTML=Le,document.head.appendChild(n),t.innerHTML=`
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
    `,document.querySelector("#submit").addEventListener("click",()=>{this.completePayment(this.PRODUCT_ID_BASE_PLAN)})}createPaymentForm2(e){var o;let t=document.createElement("link");t.rel="stylesheet",t.href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css",t.type="text/css",document.head.appendChild(t);let n=document.createElement("link");n.rel="stylesheet",n.href="https://fonts.googleapis.com/css?family=Montserrat",document.head.appendChild(n);let s=document.createElement("style");s.innerHTML=Le,document.head.appendChild(s),document.querySelector("#home-container").innerHTML=`
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
        `,(o=document.querySelector("#submit"))==null||o.addEventListener("click",()=>{this.completePayment(e)})}async createPaymentIntent(e){fetch(`${u}/aion/payments/config`).then(t=>t.json()).then(t=>{te(t.stripe_public_key).then(n=>{this.stripe=n,this.is_test_mode=t.stripe_public_key.includes("test"),fetch(`${u}/aion/payments/create_intent`,{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${this.checkUserToken()}`},body:JSON.stringify({product_id:this.is_test_mode?e.test_id:e.id})}).then(s=>s.json()).then(s=>{var a;if(s.code===10)throw console.warn(s.message),alert(s.message),window.location.href=`https://${window.location.host}/`,new Error(s.message);this.elements=this.stripe.elements({clientSecret:s.client_secret});let o=this.elements.create("payment");(a=document.querySelector("#progress-loader"))==null||a.classList.add("hide"),document.querySelector("#submit").style.visibility="visible",o.mount("#payment-element")}).catch(s=>{console.error("Something wrong when create a payment intent",s),alert("Something wrong when create a payment. Please try again.")})})})}checkUserToken(){let e=localStorage.getItem("_ms-mid");if(!e)throw new Error("User token not found");return e}async initPaymentForm(e){console.log("Init payment form...");let t=await this.initStripe();if(this.stripe=t,!t)return;let n={theme:"flat",variables:{colorPrimary:"#30313d",colorText:"#30313d"},roles:{".TermsText":{hide:!0}}},s={},o="auto",a=await this.getClientSecret(e);if(!a)return;let d=t.elements({clientSecret:a,appearance:n,loader:o});this.elements=d;let p=d.create("payment",s).mount("#payment-element")}async getClientSecret(e){return fetch(`${u}/aion/payments/create_intent`,{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${this.checkUserToken()}`},body:JSON.stringify({product_id:this.is_test_mode?e.test_id:e.id})}).then(t=>t.json()).then(t=>{if(console.log(t),t.code===10){let n=this.is_test_mode?e.test_id:e.id;if(console.log(n,t.plan_id),t.plan_id&&t.plan_id!==n)return this.updateSubscription(e);throw console.warn(t.message),alert(t.message),window.location.href=`https://${window.location.host}/`,new Error(t.message)}return document.getElementById("button-text").innerHTML=`$${t.amount}`,t.client_secret})}async updateSubscription(e){return console.log("Update subscription..."),fetch(`${u}/aion/payments/subscription`,{method:"PUT",headers:{"Content-Type":"application/json",Authorization:`Bearer ${this.checkUserToken()}`},body:JSON.stringify({product_id:this.is_test_mode?e.test_id:e.id})}).then(t=>t.json()).then(t=>{var n;if(console.log(t),t.credit){(n=document.querySelector("#payment-form"))==null||n.classList.add("hide"),be(t.credit,e.name);return}return document.getElementById("button-text").innerHTML=`Pay $${t.amount}`,t.client_secret}).catch(t=>{console.error("Something wrong when update a subscription",t),alert("Something wrong when update a subscription. Please try again or contact us."),window.location.href=`https://${window.location.host}/#plans`})}initStripe(){return console.log("Init stripe..."),fetch(`${u}/aion/payments/config`).then(e=>e.json()).then(e=>(this.is_test_mode=e.stripe_public_key.includes("test"),te(e.stripe_public_key).then(t=>t))).catch(e=>{console.error("Something wrong when init stripe",e)})}async completePayment(e){console.log("Complete payment...");let t=document.querySelector("#submit");if(t.innerHTML.includes("Payments attempt")){window.location.href=`https://${window.location.host}/#plans`;return}let n=t.innerHTML,s=null,o=null;for(let a=1;a<=5&&(this.showBlinkMessage(`Payments attempt ${a}...`,t),s=await this.stripe.confirmPayment({elements:this.elements,confirmParams:{return_url:`https://${window.location.host}/dashboard/settings?payment_success=${e.name}`}}).then(d=>d.error?(o=d.error.message,"error"):(console.log(d),"success")),t.innerHTML=n,console.log("result: ",s),!(s==="false"||s==="success"));a++);console.log(s,o),s==="error"&&alert(o)}async cancelSubscription(){fetch(`${u}/aion/payments/cancel_subscription`,{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${this.checkUserToken()}`}}).then(e=>e.json()).catch(e=>{console.error("Something wrong when create a checkout session",e)})}async getSubscriptionInfo(){try{let e=await fetch(`${u}/aion/payments/subscription`,{method:"GET",headers:{"Content-Type":"application/json",Authorization:`Bearer ${this.checkUserToken()}`}});return await this.handleResponse(e)}catch{return null}}async handleResponse(e){if(!e.ok){let t=await e.json();throw{status:e.status,message:t}}if(e.status!==204)return await e.json()}isValidCreditCardNumber(e){if(e=e.replace(/\s/g,"").split("").reverse().join(""),!/^[0-9]{13,19}$/.test(e))return!1;let t=0;for(let n=0;n<e.length;n++){let s=parseInt(e[n]);n%2===1&&(s*=2,s>9&&(s-=9)),t+=s}return t%10===0}};var Se=new R,m=class{constructor(e){let t=l.getToken(),n=`${u}/aion/${e}`;this.client=new $(n,t)}static sendVerificationEmail(){let{client:e}=m.getInstance();return e.get("email_verification",{})}static getInstance(e="users"){return m.instance||(m.instance=new m(e)),m.instance}static async fetchRequests(e=0,t=10){try{let{client:n}=m.getInstance(),s=`data?filters=requests&offset=${e}&limit=${t}`;return await n.get(s).then(o=>o.requests.array)}catch(n){return console.error("getRequests:",n),[]}}static async fetchUsageApi(){try{let{client:e}=m.getInstance(),t="data?filters=all&offset=0&limit=1";return await e.get(t).then(n=>n.api)}catch(e){return console.error("fetchUsageApi:",e),[]}}static async signUp(){try{let{client:e}=m.getInstance();return await e.post("sign_up",{}).then(()=>!1).catch(t=>{throw t})}catch(e){throw console.error("signUp:",e),e}}static async login(){try{let{client:e}=m.getInstance();return await e.get("login")}catch(e){console.error("login:",e)}}static async delete(){try{let{client:e}=m.getInstance();return l.removeAuth(),await e.delete(""),!0}catch(e){console.error("delete:",e)}}static async fetchApiToken(){try{let{client:e}=m.getInstance();return await e.post("api_token",{})}catch(e){console.error("fetchApiToken:",e),console.error("fetchApiToken:",e)}}static async refreshApiToken(){try{let{client:e}=m.getInstance();return await e.patch("api_token",{})}catch(e){console.error("refreshApiToken:",e)}}static async fetchSubscriptionData(){let{client:e}=m.getInstance();try{let t="data?filters=all&offset=0&limit=1";return await e.get(t).then(n=>n)}catch(t){console.error("fetchSubscriptionData:",t)}}static async subscriptionInfo(){var d,p,E,h,P,y,_,U,f;let e=document.querySelector("#plan-info"),t=document.querySelector("#usage-info"),n=document.querySelector("#btn-cancel-plan");e.classList.add("hide"),t.classList.add("hide"),n.classList.add("hide");let s=[m.fetchSubscriptionData(),Se.getSubscriptionInfo()],[o,a]=await Promise.all(s);if((o==null?void 0:o.plan.name)==="Free")e.innerHTML=`<p>You're on the <span class="text-color-green">Free</span> plan. You have limits of 20 & 100 image and 5 audio checks per month via web & API, respectively.</p> 
                                  <p>If you need more, check out our <a class="text-color-green" href='https://${window.location.host}/#plans' >plans</a>.</p>`,t.innerHTML=`<p> You have used:</p> 
                                    <p style="margin-left: 1rem"> ${((d=o==null?void 0:o.usage)==null?void 0:d.web.image)||0} of 20 checks of image via web;</p> 
                                    <p style="margin-left: 1rem"> ${((p=o==null?void 0:o.usage)==null?void 0:p.api.image)||0} of 100 checks of image via API;</p> 
                                    <p style="margin-left: 1rem"> ${((E=o==null?void 0:o.usage)==null?void 0:E.web.audio)+((h=o==null?void 0:o.usage)==null?void 0:h.api.audio)} of 5 checks of audio for both web & API;</p>`,e.classList.remove("hide"),t.classList.remove("hide");else{let b=`You're on the <span class="text-color-green">${o==null?void 0:o.plan.name}</span> plan.`,z=0,Y=0,W=0;b=b+"<p>  You have quotas:</p>",o.plan.quotas.forEach(I=>{z+=1,I.resource==="image"&&(Y=I.limit),I.resource==="audio"&&(W=I.limit),b=b+`<p style="margin-left: 1rem"> <span>${z}.</span> <span style="margin-left: 0.4rem"> ${I.limit} requests to check ${I.resource} for both web & API.</span></p>`}),e.innerHTML=b,t.innerHTML=`<p> You have used:</p> 
                                    <p style="margin-left: 1rem"> ${((P=o==null?void 0:o.usage)==null?void 0:P.web.image)+((y=o==null?void 0:o.usage)==null?void 0:y.api.image)} of ${Y} checks of image via both web & API;</p> 
                                    <p style="margin-left: 1rem"> ${((_=o==null?void 0:o.usage)==null?void 0:_.web.audio)+((U=o==null?void 0:o.usage)==null?void 0:U.api.audio)} of ${W} checks of audio for both web & API;</p>`,(f=a==null?void 0:a.subscription.meta)!=null&&f.was_canceled?(n.classList.add("hide"),t.innerHTML=t.innerHTML+` Your subscription has been canceled, expires on ${new Date(a==null?void 0:a.subscription.expiration_dt).toLocaleDateString()}.`):n.classList.remove("hide"),e.classList.remove("hide"),t.classList.remove("hide")}n.addEventListener("click",async()=>{(o==null?void 0:o.plan.name)!=="Base"&&(o==null?void 0:o.plan.name)!=="Pro"?window.location.href=`https://${window.location.host}/contact-us`:confirm("Are you sure you want to cancel your subscription?")?(alert("Your subscription has been canceled."),Se.cancelSubscription().then(b=>{console.log(b)}),window.location.href=`https://${window.location.host}/#plans`):alert("Your subscription has not been canceled.")})}static async getUserInfo(){let{client:e}=m.getInstance();try{return await e.get("")}catch(t){console.error("getUserInfo:",t)}}static async getTransactions(){let{client:e}=new m("payments");try{return await e.get("invoices")}catch(t){console.error("getTransactions:",t)}}},k=m;k.instance=null;var T=class{constructor(){}static getUserInfo(){return k.getUserInfo()}static isAuth(){return localStorage.getItem(T.token_key)!==null}static setAuth(){localStorage.setItem(T.key,"true")}static removeAuth(){localStorage.removeItem(T.key)}static async init(){if(localStorage.getItem("_aion_in")===null)try{await k.signUp(),T.setAuth(),await k.login(),localStorage.setItem("_aion_in","true")}catch(e){console.log(e)}}static getToken(){var e;return(e=localStorage.getItem("_ms-mid"))!=null?e:""}static isExpiredToken(){let e=T.getToken();if((e==null?void 0:e.length)>0){let t=ye(e),n=Date.now()/1e3;return t.exp<n}return!0}static checkAuth(e){if(!T.isAuth()){let t=document.getElementById("sign-up");return t.style.display="flex",t.style.zIndex=100,e(),!0}return!1}static async sendVerifiedEmail(){console.log("sendVerifiedEmail"),await k.sendVerificationEmail()}},l=T;l.key="isSignUp",l.token_key="_ms-mid";var g=class{constructor(){let e=l.getToken(),t=`${u}/aion/ai-generated`;this.client=new $(t,e)}static getInstance(){return g.instance||(g.instance=new g),g.instance}static async getReportsByBinary(e){let{client:t}=g.getInstance();try{let n=new FormData;return n.append("binary",e,"uploaded-file.png"),await t.postBinary("reports/binary",n)}catch(n){n.status===402&&alert("Please verify your email to continue using the service"),n.status===429&&(alert(`It looks like you have reached your plan limit of ${n.message.current_limit} requests. To continue, please upgrade to a new plan.`),window.location.href=`https://${window.location.host}/#plans`),console.error("Error getReportsByBinary:",n)}}static async getReportsByUrl(e){let{client:t}=g.getInstance();try{let n=`reports/url?url=${e}`;return await t.post(n,{})}catch(n){n.status===402&&alert("Please verify your email to continue using the service"),n.status===429&&(alert(`It looks like you have reached your plan limit of ${n.message.current_limit} requests. To continue, please upgrade to a new plan.`),window.location.href=`https://${window.location.host}/#plans`),console.error("getReportsByUrl:",n)}}static async getAudioVerdict(e){let{client:t}=g.getInstance();try{let n=new FormData;return n.append("file",e),await t.postBinary("reports/audio/binary",n)}catch(n){n.status===402&&alert("Please verify your email to continue using the service"),n.status===429&&(alert(`It looks like you have reached your plan limit of ${n.message.current_limit} requests. To continue, please upgrade to a new plan.`),window.location.href=`https://${window.location.host}/#plans`),console.error("Error getAudioVerdict:",n)}}static async getYoutubeVerdict(e){let{client:t}=g.getInstance();try{let n={url:e};return await t.post("reports/audio/link",n)}catch(n){n.status===402&&alert("Please verify your email to continue using the service"),n.status===429&&(alert(`It looks like you have reached your plan limit of ${n.message.current_limit} requests. To continue, please upgrade to a new plan.`),window.location.href=`https://${window.location.host}/#plans`),console.error("Error getYoutubeVerdict:",n)}}static async getPdetReportByUrl(e){let{client:t}=g.getInstance();try{let n={object:e};return await t.post("reports/person_detection/url",n)}catch(n){n.status===402&&alert("Please verify your email to continue using the service"),n.status===429&&(alert(`It looks like you have reached your plan limit of ${n.message.current_limit} requests. To continue, please upgrade to a new plan.`),window.location.href=`https://${window.location.host}/#plans`),console.error("Error getYoutubeVerdict:",n)}}static async getPdetReportByBinary(e){let{client:t}=g.getInstance();try{let n=new FormData;return n.append("file",e,"uploaded-file.png"),await t.postBinary("reports/person_detection/binary",n)}catch(n){n.status===402&&alert("Please verify your email to continue using the service"),n.status===429&&(alert(`It looks like you have reached your plan limit of ${n.message.current_limit} requests. To continue, please upgrade to a new plan.`),window.location.href=`https://${window.location.host}/#plans`),console.error("Error getReportsByBinary:",n)}}},L=g;L.instance=null;var q=class{constructor(){}static async getReportsByBinary(e,t){let n=`${u}/results/api/detector/reports/raw?source=web&user_id=${t}`,s=new FormData;s.append("binary",e,"file_name.png");let o={method:"POST",headers:{Accept:"application/json",Authorization:`Bearer ${l.getToken()}`},body:s};return await fetch(n,o).then(a=>a.json())}static async getReportsByUrl(e,t){let n=`${u}/results/api/detector/reports/json?source=web&user_id=${t}`,s={method:"POST",headers:{Accept:"application/json","Content-Type":"application/json",Authorization:`Bearer ${l.getToken()}`},body:JSON.stringify({object:e})};return await fetch(n,s).then(o=>o.json())}static async sendFeedback(e,t,n,s=!1){let o={is_proper_predict:t,comment:n},a=`${u}/results/api/detector/reports/result/${e}`,d={method:"PUT",body:JSON.stringify(o),headers:{Accept:"application/json","Content-Type":"application/json"}};(s||!l.isExpiredToken())&&(a=`${u}/aion/ai-generated/reports/${e}`,d={method:"PATCH",body:JSON.stringify(o),headers:{Accept:"application/json","Content-Type":"application/json"}}),await fetch(a,d).then(p=>p.json()).then(p=>console.log(p)).catch(p=>console.error(p))}static async getAudioVerdict(e){let t=`${u}/aion/ai-generated/reports/audio/binary`,n=new FormData;return n.append("file",e),await fetch(t,{method:"POST",headers:{Accept:"application/json",ContentType:"multipart/form-data"},body:n}).then(o=>o.json())}static async getYoutubeVerdict(e){let t=`${u}/aion/ai-generated/reports/audio/link`,n={method:"POST",headers:{Accept:"application/json","Content-Type":"application/json"},body:JSON.stringify({url:e})};return await fetch(t,n).then(s=>s.json())}};var j=class{constructor(){}static isLimitExceeded(){return!!l.isExpiredToken()}static increment(){let e=localStorage.getItem(j.key),t=e===null?1:Number(e)+1;localStorage.setItem(j.key,t.toString())}},H=j;H.key="requestCount";var v=class{static async getReportsByBinary(e,t){return l.isExpiredToken()?await q.getReportsByBinary(e,t):await L.getReportsByBinary(e)}static async getReportsByUrl(e,t){return l.isExpiredToken()?await q.getReportsByUrl(e,t):await L.getReportsByUrl(e)}static async getAudioVerictByFile(e){return await L.getAudioVerdict(e)}static async getAudioVerictMock(e){let n=await((s,o)=>new Promise(a=>{setTimeout(()=>{a(o)},s)}))(1500,e);return JSON.parse(`{
            "id": "41994fdd-0161-43a9-b873-581eccbe6d72",
            "report": {
                "version": "0.0.0",
                "verdict": ${n}
            }
        }`)}static async getYoutubeVerict(e){return l.isExpiredToken()?await q.getYoutubeVerdict(e):await L.getYoutubeVerdict(e)}static async getPdetReportByUrl(e){return await L.getPdetReportByUrl(e)}static async getPdetReportByBinary(e){return await L.getPdetReportByBinary(e)}static async sendFeedback(e,t,n,s=!1){return await q.sendFeedback(e,t,n,s)}};var O=(i,e="image")=>{var t;if(l.isAuth()){let n=JSON.parse(localStorage.getItem("user_plan"))||{};if(n){let s,o;(t=n.plan)==null||t.quotas.forEach(d=>{d.resource===e&&d.interface.includes("web")&&(s=d.limit,o=d.interface)});let a=0;o.length>0&&o.forEach(d=>{a=a+n.usage[d][e]}),i.innerHTML=`
            <div style="margin-top: 20px; font-size: 1rem; color: white">
            <span">
                Available ${s-a} from ${s} web checks
            </span>
            </div>`}}};var Wt=document.getElementById("image-tab"),Gt=document.getElementById("audio-tab"),Jt=document.getElementById("pdet-tab");var N=class{constructor(e,t,n,s){this.progressInterval=0;this.audio=e,this.playPauseBtn=t,this.progressSlider=n,this.track=s,this.dragging=!1,this.progressInterval=0,this.audio.volume=.3,this.playPauseBtn.addEventListener("click",o=>this.playPauseAudio(o)),this.progressSlider.addEventListener("mousedown",o=>this.mouseDown(o)),document.addEventListener("mousemove",o=>this.mouseMove(o)),document.addEventListener("mouseup",()=>this.mouseUp())}playPauseAudio(e){e.stopPropagation(),this.audio.paused?(this.audio.play(),this.playPauseBtn.innerHTML=`
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                <rect x="2.5" y="1.5" width="4" height="13" rx="1.5" stroke="white"/>
                <rect x="9.5" y="1.5" width="4" height="13" rx="1.5" stroke="white"/>
            </svg>
            `,this.progressInterval=setInterval(()=>{if(!this.dragging){let t=this.audio.currentTime/this.audio.duration*100;this.track.style.width=t+"%",t>=100&&this.finishAudio()}},1e3)):(this.audio.pause(),this.playPauseBtn.innerHTML=`
            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32" fill="none">
                <path d="M13.3375 10.8944L21.7598 15.1056C22.4968 15.4741 22.4968 16.5259 21.7598 16.8944L13.3375 21.1056C12.3402 21.6042 11.1667 20.879 11.1667 19.7639V12.2361C11.1667 11.121 12.3402 10.3958 13.3375 10.8944Z" stroke="white"/>
            </svg>`,clearInterval(this.progressInterval))}pauseAudio(){this.audio.pause(),this.playPauseBtn.innerHTML=`
        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32" fill="none">
            <path d="M13.3375 10.8944L21.7598 15.1056C22.4968 15.4741 22.4968 16.5259 21.7598 16.8944L13.3375 21.1056C12.3402 21.6042 11.1667 20.879 11.1667 19.7639V12.2361C11.1667 11.121 12.3402 10.3958 13.3375 10.8944Z" stroke="white"/>
        </svg>`,clearInterval(this.progressInterval)}mouseDown(e){this.dragging=!0,clearInterval(this.progressInterval),this.updateProgress(e)}mouseMove(e){this.dragging&&this.updateProgress(e)}mouseUp(){this.dragging=!1,this.progressInterval=setInterval(()=>{if(!this.dragging){let e=this.audio.currentTime/this.audio.duration*100;this.track.style.width=e+"%",e>=100&&this.finishAudio()}},1e3)}updateProgress(e){let t=this.progressSlider.getBoundingClientRect(),n=e.clientX-t.left,s=t.right-t.left,o=Math.min(Math.max(n/s,0),1)*100;this.track.style.width=o+"%",this.audio.currentTime=this.audio.duration*(o/100),o>=100&&this.finishAudio()}finishAudio(){this.playPauseBtn.innerHTML=`
        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32" fill="none">
            <path d="M13.3375 10.8944L21.7598 15.1056C22.4968 15.4741 22.4968 16.5259 21.7598 16.8944L13.3375 21.1056C12.3402 21.6042 11.1667 20.879 11.1667 19.7639V12.2361C11.1667 11.121 12.3402 10.3958 13.3375 10.8944Z" stroke="white"/>
        </svg>`}},w=class{constructor(e,t,n,s=!1){this.containerId="";this.audioPlayer=null;this.name="";this.containerId=e,this.container=document.getElementById(e),this.audioSrc=t,this.name=n,s?this.initializeSquarePlayer():this.initializePlayer()}initializePlayer(){if(!this.container)return;this.container.classList.add("aiornot-player"),this.container.innerHTML=`
            <audio id="${this.container.id}-audio" src="${this.audioSrc}"></audio>
            <div class="aiornot-player-controls">
                <div class="aiornot-player-button" id="${this.container.id}-playPauseBtn">
                    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32" fill="none">
                        <path d="M13.3375 10.8944L21.7598 15.1056C22.4968 15.4741 22.4968 16.5259 21.7598 16.8944L13.3375 21.1056C12.3402 21.6042 11.1667 20.879 11.1667 19.7639V12.2361C11.1667 11.121 12.3402 10.3958 13.3375 10.8944Z" stroke="white"/>
                    </svg>
                </div>
                <div class="aiornot-player-hover-bg"></div>
                <div class="aiornot-player-title">${this.name}</div>
            </div>
            <div id="${this.container.id}-slider" class="aiornot-player-slider">
                <div id="${this.container.id}-progress" class="aiornot-player-progress"></div>
            </div>
        `;let e=document.getElementById(`${this.container.id}-audio`),t=document.getElementById(`${this.container.id}-playPauseBtn`),n=document.getElementById(`${this.container.id}-slider`),s=document.getElementById(`${this.container.id}-progress`);this.audioPlayer=new N(e,t,n,s)}initializeSquarePlayer(){if(!this.container)return;this.container.classList.add("aiornot-player-square"),this.container.innerHTML=`
            <audio id="${this.container.id}-audio" src="${this.audioSrc}"></audio>
            <div class="aiornot-player-controls-square">
                <div class="aiornot-player-button-sqaure" id="${this.container.id}-playPauseBtn">
                    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32" fill="none">
                        <path d="M13.3375 10.8944L21.7598 15.1056C22.4968 15.4741 22.4968 16.5259 21.7598 16.8944L13.3375 21.1056C12.3402 21.6042 11.1667 20.879 11.1667 19.7639V12.2361C11.1667 11.121 12.3402 10.3958 13.3375 10.8944Z" stroke="white"/>
                    </svg>
                </div>
                <div class="aiornot-player-hover-bg"></div>
                <div class="aiornot-player-title-sqaure">${this.name}</div>
            </div>
            <div id="${this.container.id}-slider" class="aiornot-player-slider">
                <div id="${this.container.id}-progress" class="aiornot-player-progress"></div>
            </div>
        `;let e=document.getElementById(`${this.container.id}-audio`),t=document.getElementById(`${this.container.id}-playPauseBtn`),n=document.getElementById(`${this.container.id}-slider`),s=document.getElementById(`${this.container.id}-progress`);this.audioPlayer=new N(e,t,n,s)}},Z=class{constructor(e=[]){this.players=[],e.forEach(t=>{this.addPlayer(t)})}addPlayer(e){var t;this.players.push(e),(t=e.audioPlayer)==null||t.audio.addEventListener("play",()=>this.pauseOtherPlayers(e))}pauseOtherPlayers(e){var t;for(let n of this.players)n!==e&&((t=n.audioPlayer)==null||t.pauseAudio())}};var ne=class{constructor(e,t,n){this.progressInterval=0;this.playPauseBtn=e,this.progressSlider=t,this.track=n,this.dragging=!1,this.progressInterval=0,this.initListeners()}initListeners(){this.playPauseBtn.addEventListener("click",()=>this.playPauseVideo()),this.progressSlider.addEventListener("mousedown",e=>this.mouseDown(e)),document.addEventListener("mousemove",e=>this.mouseMove(e)),document.addEventListener("mouseup",()=>this.mouseUp())}onYouTubeIframeAPIReady(e){this.player=new YT.Player("youtube-player",{height:"48",width:"48",videoId:e,events:{onReady:()=>this.onPlayerReady(),onStateChange:t=>this.onPlayerStateChange(t)}})}onPlayerReady(){this.player.setVolume(30)}playPauseVideo(){let e=this.player.getPlayerState();e===YT.PlayerState.ENDED&&(this.player.seekTo(0),this.player.playVideo()),e===YT.PlayerState.PAUSED||e===YT.PlayerState.CUED?(this.player.playVideo(),this.playPauseBtn.innerHTML=` <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                <rect x="2.5" y="1.5" width="4" height="13" rx="1.5" stroke="white"/>
                <rect x="9.5" y="1.5" width="4" height="13" rx="1.5" stroke="white"/>
            </svg>`,this.progressInterval=setInterval(()=>{if(!this.dragging){let t=this.player.getCurrentTime()/this.player.getDuration()*100;this.track.style.width=t+"%",t>=100&&this.finishVideo()}},1e3)):(this.player.pauseVideo(),this.playPauseBtn.innerHTML=`
            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32" fill="none">
                <path d="M13.3375 10.8944L21.7598 15.1056C22.4968 15.4741 22.4968 16.5259 21.7598 16.8944L13.3375 21.1056C12.3402 21.6042 11.1667 20.879 11.1667 19.7639V12.2361C11.1667 11.121 12.3402 10.3958 13.3375 10.8944Z" stroke="white"/>
            </svg>`,clearInterval(this.progressInterval))}onPlayerStateChange(e){e.data===YT.PlayerState.ENDED&&this.finishVideo()}mouseDown(e){this.dragging=!0,clearInterval(this.progressInterval),this.updateProgress(e)}mouseMove(e){this.dragging&&this.updateProgress(e)}mouseUp(){this.dragging=!1,this.progressInterval=setInterval(()=>{if(!this.dragging){let e=this.player.getCurrentTime()/this.player.getDuration()*100;this.track.style.width=e+"%",e>=100&&this.finishVideo()}},1e3)}updateProgress(e){let t=this.progressSlider.getBoundingClientRect(),n=e.clientX-t.left,s=t.right-t.left,o=Math.min(Math.max(n/s,0),1)*100;this.track.style.width=o+"%",this.player.seekTo(this.player.getDuration()*(o/100)),o>=100&&this.finishVideo()}finishVideo(){this.playPauseBtn.innerHTML=`
        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32" fill="none">
            <path d="M13.3375 10.8944L21.7598 15.1056C22.4968 15.4741 22.4968 16.5259 21.7598 16.8944L13.3375 21.1056C12.3402 21.6042 11.1667 20.879 11.1667 19.7639V12.2361C11.1667 11.121 12.3402 10.3958 13.3375 10.8944Z" stroke="white"/>
        </svg>`,clearInterval(this.progressInterval)}},se=class{constructor(e,t,n){this.containerId="";this.videoId="";this.youtubePlayer=null;this.name="";this.containerId=e,this.container=document.getElementById(e),this.videoId=t,this.name=n,this.initializePlayer()}async loadYouTubeIframeAPI(){return new Promise((e,t)=>{var o;window.onYouTubeIframeAPIReady=()=>{e()};let n=document.createElement("script");n.src="https://www.youtube.com/iframe_api",n.onerror=t;let s=document.getElementsByTagName("script")[0];(o=s.parentNode)==null||o.insertBefore(n,s)})}async initializePlayer(){if(!this.container)return;this.container.classList.add("aiornot-player-square"),this.container.innerHTML=`
            <div id="youtube-player"></div>
            <div class="aiornot-player-controls-square">
                <div class="aiornot-player-button-sqaure" id="${this.container.id}-playPauseBtn">
                    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32" fill="none">
                        <path d="M13.3375 10.8944L21.7598 15.1056C22.4968 15.4741 22.4968 16.5259 21.7598 16.8944L13.3375 21.1056C12.3402 21.6042 11.1667 20.879 11.1667 19.7639V12.2361C11.1667 11.121 12.3402 10.3958 13.3375 10.8944Z" stroke="white"/>
                    </svg>
                </div>
                <div class="aiornot-player-hover-bg"></div>
                <div class="aiornot-player-title-sqaure">${this.name}</div>
            </div>
            <div id="${this.container.id}-slider" class="aiornot-player-slider">
                <div id="${this.container.id}-progress" class="aiornot-player-progress"></div>
            </div>
        `;let e=document.getElementById(`${this.container.id}-playPauseBtn`),t=document.getElementById(`${this.container.id}-slider`),n=document.getElementById(`${this.container.id}-progress`);await this.loadYouTubeIframeAPI(),this.youtubePlayer=new ne(e,t,n),this.youtubePlayer.onYouTubeIframeAPIReady(this.videoId)}},xe=(i,e)=>{let n=(s=>{var o;try{let a=new URL(s),d=new URLSearchParams(a.search).get("v"),E=/^(?:https?:\/\/)?(?:www\.)?youtu(?:be)?\.(?:com|be)\/(?:shorts\/)?([^\/?]+)/.exec(s);return(o=d!=null?d:E==null?void 0:E[0])!=null?o:""}catch(a){return console.error("\u041D\u0435\u0432\u0435\u0440\u043D\u044B\u0439 URL",a),""}})(e);new se(i,n,"")};var Ce,et=import("https://openfpcdn.io/fingerprintjs/v3").then(i=>i.load()),oe=async()=>{Ce=await et.then(i=>i.get()).then(i=>i.visitorId)};var ke=()=>{var me,pe;let i=document.getElementById("image-tab"),e=document.getElementById("audio-tab"),t=document.getElementById("report-screen"),n=document.querySelector("#button-report-submit"),s=document.querySelector("#input-report-comment"),o=document.querySelector("#button-report_true"),a=document.querySelector("#button-report_false"),d=document.querySelector("#button-report_close"),p=document.querySelector("#url-error-message"),E=document.querySelector("#processing_cancel"),h=document.querySelector("#audio-file-input"),P=document.querySelector("#input-error-text"),y=document.getElementById("ai-or-not_audio-url"),_=document.getElementById("audio-aion-submit"),U=document.querySelector("#ai-or-not-audio_dropzone"),f=document.querySelector("#ai-or-not_dropzone-text"),b=document.querySelector("#audio-result-screen_col"),z=document.querySelector("#share-items-hide"),Y=document.querySelector("#result-screen_share-component"),W=document.querySelector("#ai-or-not-dropzone-counter"),I=document.querySelector("#ai-or-not-dropzone-counter-w");document.getElementById("audio-tab").addEventListener("click",()=>{S()});let B,G;z.classList.add("hide");function ie(){return i.classList.contains("w--current")?"image":"audio"}oe();let _e=()=>{s.value="";let r=document.querySelector("#button-report_true-text"),c=document.querySelector("#button-report_false-text");c.classList.add("hide"),r.classList.remove("hide"),r.textContent=r.getAttribute("report-button-text-default"),c.textContent=c.getAttribute("report-button-text-default"),o.classList.remove("is-reported"),a.classList.remove("is-reported"),o.classList.remove("hide"),a.classList.remove("hide")},ae=r=>{G=r;let c=document.querySelector('[fs-socialshare-element="url"]'),A=`${l.isExpiredToken()?`${F}/aiornot/`:`${F}/aiornot/users/`}${r}`;c.textContent=A,document.querySelectorAll(".audio-result-screen_share-item").forEach(Me=>{Me.setAttribute("data-url",A)})},ce=()=>{f.textContent="We support 10 Mb of maximum size.",f.classList.remove("text-color-red"),P.textContent="Something went wrong. Try again.",p.classList.add("hide")},le=()=>{p.classList.remove("hide")},it=()=>{p.classList.add("hide")},V=()=>{b.classList.contains("hide")?(f.textContent="File is too large (max 10 MB)",f.classList.add("text-color-red")):(P.textContent="File is too large (max 10 MB)",p.classList.remove("hide"))},Te=r=>{let c=URL.createObjectURL(r);new w("result-screen_audio-wrapper",c,r.name,!0)},Ie=r=>{xe("result-screen_audio-wrapper",r)};h==null||h.addEventListener("change",()=>{if(l.checkAuth(S))return;let r=h==null?void 0:h.files[0].size,c=10*1024*1024;r>c?(B=!1,V()):(B=!0,ce())});let qe=()=>{document.querySelector("#processing-screen").classList.add("hide"),f.classList.add("error"),U.classList.add("red-border"),f.textContent="Something went wrong. Try again."},J=()=>{f.classList.remove("error"),U.classList.remove("red-border"),f.textContent="We support jpeg, png, webp, gif, tiff, bmp. 10 Mb of maximum size."},S=()=>{document.querySelector("#choose-file-row").classList.add("hide"),document.querySelector("#legal-tip").classList.remove("hide"),document.querySelector("#processing-screen").classList.add("hide"),document.querySelector("#hero-home_title-description").classList.remove("hide"),document.querySelector("#hero-home_gallery").classList.remove("hide"),document.querySelector("#ai-or-not-audio_dropzone").classList.remove("hide"),document.querySelector("#hero-home_drop-zone-divider").classList.remove("hide"),document.querySelector("#audio-result-screen_col").classList.add("hide"),document.querySelector("#result-screen_audio-wrapper").classList.add("hide")},X=()=>{_e(),P.textContent="Something went wrong. Try again.",document.querySelector("#choose-file-row").classList.remove("hide"),document.querySelector("#legal-tip").classList.add("hide"),document.querySelector(".processing-screen_triggers_5").click(),document.querySelector("#processing-screen").classList.remove("hide"),document.querySelector(".processing-screen_triggers_1").click(),document.querySelector("#hero-home_title-description").classList.add("hide"),document.querySelector("#hero-home_gallery").classList.add("hide"),document.querySelector("#ai-or-not-audio_dropzone").classList.add("hide"),document.querySelector("#hero-home_drop-zone-divider").classList.add("hide"),document.querySelector("#audio-result-screen_col").classList.remove("hide"),document.querySelector("#result-screen_audio-wrapper").classList.remove("hide")};function K(){var r,c;(r=document.querySelector(".processing-screen_triggers_3"))==null||r.click(),document.querySelector("#processing-screen").classList.add("hide"),(c=document.querySelector(".processing-screen_triggers_5"))==null||c.click(),document.querySelector("#audio-report-buttons-screen").classList.add("hide"),document.querySelector("#audio-share-items-hide").classList.add("hide"),document.querySelector("#audio-hero-home_drop-zone-divider").classList.add("hide"),document.querySelector("#audio-hero-home_title-description").classList.add("hide"),document.querySelector("#audio-hero-home_gallery").classList.add("hide"),h.value="",y.value=""}let Q=r=>{r==="unknown"?(document.getElementById("audio-title-human").innerHTML="Sorry, but in this case we can't really say if it's AI or Not",document.getElementById("audio-ai-or-not_result-message-50").classList.remove("hide"),document.getElementById("audio-ai-or-not_result-message").classList.add("hide"),document.getElementById("audio-ai-or-not_result-message-50").innerHTML="Probly the uploaded audio has most likely been modified or compressed",document.getElementById("audio-title-human").classList.remove("hide"),document.getElementById("audio-title-ai").classList.add("hide")):(document.getElementById("audio-title-ai").innerHTML='This is likely <span class="text-color-green">AI</span>',document.getElementById("audio-title-human").innerHTML='This is likely <span class="text-color-green">Human</span>',document.getElementById("audio-ai-or-not_result-message-50").classList.add("hide"),document.getElementById("audio-ai-or-not_result-message").classList.remove("hide"),document.querySelector("#audio-ai-or-not_model-name").textContent=r,r==="ai"?(document.getElementById("audio-title-human").classList.add("hide"),document.getElementById("audio-title-ai").classList.remove("hide")):(document.getElementById("audio-title-human").classList.remove("hide"),document.getElementById("audio-title-ai").classList.add("hide")))},de=async r=>{if(H.isLimitExceeded()){let c=document.getElementById("sign-up");c.style.display="flex",c.style.zIndex=100,S()}else p.classList.add("hide"),X(),await v.getYoutubeVerict(r).then(c=>{ae(c.id),Q(c.report.verdict===!0?"ai":"human"),K(),Ie(r)}).catch(c=>{b.classList.contains("hide")?le():(le(),S())})},x=document.body,at=document.querySelector("#dropzone-fullscreen_message-tip"),ct=document.querySelector("#dropzone-fullscreen_message-format");x==null||x.addEventListener("dragover",function(r){r.preventDefault(),document.querySelector(".dropzone-fullscreen").classList.remove("hide")}),x==null||x.addEventListener("dragleave",function(r){r.preventDefault(),document.querySelector(".dropzone-fullscreen").classList.add("hide")}),x==null||x.addEventListener("drop",async function(r){if(l.checkAuth(S)){document.querySelector(".dropzone-fullscreen").classList.add("hide");return}if(ie()!=="audio")return;r.preventDefault(),document.querySelector(".dropzone-fullscreen").classList.add("hide");let c=r.dataTransfer.files[0],C=c.size,A=10*1024*1024;C>A?(B=!1,V()):(B=!0,ce()),B===!0?await ue(c):V()}),h==null||h.addEventListener("change",async r=>{if(B===!0){let c=h.files[0];await ue(c)}else V()});let ue=async r=>{(r.type==="audio/mpeg"||r.type==="audio/mp3")&&(X(),await v.getAudioVerictByFile(r).then(c=>{J(),Q(c.report.verdict===!0?"ai":"human"),K(),Te(r)}).catch(c=>{qe(),S()}))},Pe=async(r,c)=>{l.checkAuth(S)||(X(),await v.getAudioVerictMock(!0).then(C=>{ae(C.id),J(),Q(C.report.verdict===!0?"ai":"human"),K(),new w("result-screen_audio-wrapper",r,c,!0)}))};E==null||E.addEventListener("click",function(){J(),S()}),(me=document.querySelector("#ai-or-not-audio_dropzone"))==null||me.addEventListener("click",function(){ie()==="audio"&&(l.checkAuth(S)||h.click())}),(pe=document.querySelector("#choose-file-row"))==null||pe.addEventListener("click",function(){h.click()}),_==null||_.addEventListener("click",()=>{y.value!==""&&de(y.value)}),y==null||y.addEventListener("keypress",r=>{r.key==="Enter"&&y.value!==""&&de(y.value)}),y.addEventListener("input",r=>{let c=r.target.value;(A=>/^(?:https?:\/\/)?(?:www\.)?(?:music\.)?youtu(?:be)?\.(?:com|be)\/(?:shorts\/)?([^\/?]+)/.test(A))(c)?_.classList.remove("is-disabled"):_.classList.add("is-disabled")});let Be=()=>{let r=document.querySelector("#button-report_false-text");r.classList.remove("hide"),r.textContent=r.getAttribute("report-button-text-default_reported"),a.classList.add("is-reported"),o.classList.add("hide"),t.style.display="none"},Ae=()=>{let r=document.querySelector("#button-report_true-text");r.classList.remove("hide"),r.textContent=r.getAttribute("report-button-text-default_reported"),o.classList.add("is-reported"),a.classList.add("hide")};o==null||o.addEventListener("click",()=>{Ae(),v.sendFeedback(G,!0,"",!0)}),a==null||a.addEventListener("click",()=>{t.style.display="flex"}),d==null||d.addEventListener("click",()=>{t.style.display="none"}),n==null||n.addEventListener("click",()=>{Be(),v.sendFeedback(G,!1,s.value,!0)}),document==null||document.addEventListener("keydown",r=>{r.code==="Escape"&&t.style.display!=="none"&&d.click()}),s==null||s.addEventListener("change",()=>{s.value!==""?n.classList.remove("is-disabled"):n.classList.add("is-disabled")}),s==null||s.addEventListener("input",()=>{s.value!==""?n.classList.remove("is-disabled"):n.classList.add("is-disabled")}),new Z([new w("audio-sample-1","https://atrium-junk.s3.amazonaws.com/ai-or-not-audio-samples/Adel","Adel"),new w("audio-sample-2","https://atrium-junk.s3.amazonaws.com/ai-or-not-audio-samples/Bull+Greek.mp3","Bull Greek"),new w("audio-sample-3","https://atrium-junk.s3.amazonaws.com/ai-or-not-audio-samples/Sample+1.mp3","Sample 1"),new w("audio-sample-4","https://atrium-junk.s3.amazonaws.com/ai-or-not-audio-samples/Sample+2.mp3","Sample 2"),new w("audio-sample-5","https://atrium-junk.s3.amazonaws.com/ai-or-not-audio-samples/Sample+3.mp3","Sample 3"),new w("audio-sample-6","https://atrium-junk.s3.amazonaws.com/ai-or-not-audio-samples/Trump+speech.mp3","Trump speech")]).players.forEach(r=>{var c;(c=r.container)==null||c.addEventListener("click",async()=>{var C;(C=r.audioPlayer)!=null&&C.audio.paused&&Pe(r.audioSrc,r.name)})});let ee=document.getElementById("close-sign-up");ee==null||ee.addEventListener("click",()=>{let r=document.getElementById("sign-up");r.style.display="none",r.style.zIndex=0}),O(document.querySelector("#audio-quotas"),"audio")};var re=document.querySelector("#contact-us-submit-button"),tt=document.querySelector("#name"),nt=document.querySelector("#E-Mail"),st=document.querySelector("#Note"),ot=document.querySelector("#Company");re&&(re.classList.remove("is-disabled"),re.addEventListener("click",async i=>{i.preventDefault();let e={name:tt.value,email:nt.value,note:st.value,company:ot.value};for(let t in e)if(t!=="company"&&e[t]===""){alert(`Please fill in all required fields ${t}`);return}console.log(e),fetch(`${u}/aion/system/post_message`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(e)}).then(t=>{t.ok?(alert("Thank you for your application! We will contact you shortly."),window.location.href="https://aiornot.com/"):alert("Something went wrong. Please try again.")})}));ke();})();
