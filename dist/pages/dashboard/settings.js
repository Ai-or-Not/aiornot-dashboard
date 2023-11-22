"use strict";(()=>{var G=`
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
`,j=document.createElement("style");j.innerHTML=G;document.head.appendChild(j);var g=document.getElementById("toast");function D(s,e="info"){g.classList.remove("hide");let t=document.createElement("span");t.innerHTML="x",t.className="close-button",t.addEventListener("click",()=>{g.classList.add("hide"),e!=="error"&&(window.location.href=`https://${window.location.host}/dashboard/settings`)}),g.innerHTML=s,g.appendChild(t),g.classList.add("show"),g.style.borderColor=e==="error"?"red":"#aefc06"}var O=s=>{D(`<p style="font-size: 1.5rem; padding: 2rem;">Amazing! You\u2019ve just upgraded your account, welcome to the exclusive ranks of AI or Not <span style="color: #aefc06; font-weight: bold ">${s}</span> users. Thank you for being a supporter of AI or Not and a purveyor of the truth!</p>`)},M=(s,e)=>{D(`<p style="font-size: 1.5rem; padding: 2rem;">We are pleased to inform you that you currently have a credit of $${s} from a previous paid subscription after that we successfully update your plan to <span style="color: #aefc06; font-weight: bold ">${e.split(" ")[0]}</span>! If you have any questions please contact us.</p>`)};function H(s){var e=s.split(".")[1],t=e.replace(/-/g,"+").replace(/_/g,"/"),n=decodeURIComponent(atob(t).split("").map(function(o){return"%"+("00"+o.charCodeAt(0).toString(16)).slice(-2)}).join(""));return JSON.parse(n)}var z="https://js.stripe.com/v3",W=/^https:\/\/js\.stripe\.com\/v3\/?(\?.*)?$/,N="loadStripe.setLoadParameters was called but an existing Stripe.js script already exists in the document; existing script parameters will be used",X=function(){for(var e=document.querySelectorAll('script[src^="'.concat(z,'"]')),t=0;t<e.length;t++){var n=e[t];if(W.test(n.src))return n}return null},K=function(e){var t=e&&!e.advancedFraudSignals?"?advancedFraudSignals=false":"",n=document.createElement("script");n.src="".concat(z).concat(t);var o=document.head||document.body;if(!o)throw new Error("Expected document.body not to be null. Stripe.js requires a <body> element.");return o.appendChild(n),n},Q=function(e,t){!e||!e._registerWrapper||e._registerWrapper({name:"stripe-js",version:"2.1.7",startTime:t})},E=null,Z=function(e){return E!==null||(E=new Promise(function(t,n){if(typeof window=="undefined"||typeof document=="undefined"){t(null);return}if(window.Stripe&&e&&console.warn(N),window.Stripe){t(window.Stripe);return}try{var o=X();o&&e?console.warn(N):o||(o=K(e)),o.addEventListener("load",function(){window.Stripe?t(window.Stripe):n(new Error("Stripe.js not available"))}),o.addEventListener("error",function(){n(new Error("Failed to load Stripe.js"))})}catch(r){n(r);return}})),E},ee=function(e,t,n){if(e===null)return null;var o=e.apply(void 0,t);return Q(o,n),o},Y=Promise.resolve().then(function(){return Z(null)}),F=!1;Y.catch(function(s){F||console.warn(s)});var U=function(){for(var e=arguments.length,t=new Array(e),n=0;n<e;n++)t[n]=arguments[n];F=!0;var o=Date.now();return Y.then(function(r){return ee(r,t,o)})};var te=window.location.host.includes("webflow")?"stage":"prod",u=`https://${te}.ai-or-not.com`;var b=class{constructor(e,t){this.apiUrl=e,this.bearerToken=t}async get(e){let t=`${this.apiUrl}/${e}`;try{let n=await fetch(t,{method:"GET",headers:{"Content-Type":"application/json",Authorization:`Bearer ${this.bearerToken}`}});return await this.handleResponse(n)}catch(n){throw console.error("Error",n),n}}async post(e,t){let n=`${this.apiUrl}/${e}`;try{let o=await fetch(n,{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${this.bearerToken}`},body:JSON.stringify(t)});return await this.handleResponse(o)}catch(o){throw console.error("Request error",o),o.status===429&&o.message.msg.type==="requests"&&alert(`It looks like you have reached your plan limit of ${o.message.msg.current_limit} requests. To continue, please upgrade to a new plan.`),o}}async postBinary(e,t){let n=`${this.apiUrl}/${e}`;try{let o=await fetch(n,{method:"POST",headers:{Accept:"application/json",Authorization:`Bearer ${this.bearerToken}`},body:t});return await this.handleResponse(o)}catch(o){throw console.error("Binary request error:",o),o.status===429&&o.message.msg.type==="requests"&&alert(`It looks like you have reached your plan limit of ${o.message.msg.current_limit} requests. To continue, please upgrade to a new plan.`),o}}async delete(e){let t=`${this.apiUrl}/${e}`;try{let n=await fetch(t,{method:"DELETE",headers:{accept:"*/*",Authorization:`Bearer ${this.bearerToken}`}});await this.handleResponse(n)}catch(n){throw console.error("Error when perform DELETE-request:",n),n}}async patch(e,t){let n=`${this.apiUrl}/${e}`;try{let o=await fetch(n,{method:"PATCH",headers:{"Content-Type":"application/json",Authorization:`Bearer ${this.bearerToken}`},body:JSON.stringify(t)});return await this.handleResponse(o)}catch(o){throw console.error("\u041E\u0448\u0438\u0431\u043A\u0430 \u043F\u0440\u0438 \u0432\u044B\u043F\u043E\u043B\u043D\u0435\u043D\u0438\u0438 PATCH-\u0437\u0430\u043F\u0440\u043E\u0441\u0430:",o),o}}async handleResponse(e){if(!e.ok){let t=await e.json();throw{status:e.status,message:t}}if(e.status!==204)return await e.json()}};var V=`

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
            
            `,A=class{constructor(){this.elements=null;this.stripe=null;this.home_element=document.querySelector("#home");this.PRODUCT_ID_BASE_9USD_PLAN={id:"price_1OABgwBa9yG4sk8kc2owagiH",msg:"Base plan: $9/month",name:"Base plan",description:"300 requests per month",price:"$9",test_id:"price_1OABdXBa9yG4sk8kcXyILlLm"};this.PRODUCT_ID_BASE_PLAN={id:"price_1O2Ba4Ba9yG4sk8k4y3ZnEVT",msg:"Base plan: $30/month",name:"Base plan",description:"1,000 requests per month",price:"$30",test_id:"price_1O1wSsBa9yG4sk8kej8shNYs"};this.PRODUCT_ID_PRO_PLAN={id:"price_1O2Ku4Ba9yG4sk8kIQBdzpPj",msg:"Pro plan: $250/month",name:"Pro plan",description:"10,000 requests per month",price:"$250",test_id:"price_1O7HCzBa9yG4sk8kYEld9lNl"};this.is_test_mode=!1}showBlinkMessage(e,t){let n=document.createElement("style");n.innerHTML=V,document.head.appendChild(n),t.innerHTML=`
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
    `,document.querySelector("#submit").addEventListener("click",()=>{this.completePayment(this.PRODUCT_ID_BASE_PLAN)})}createPaymentForm2(e){var r;let t=document.createElement("link");t.rel="stylesheet",t.href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css",t.type="text/css",document.head.appendChild(t);let n=document.createElement("link");n.rel="stylesheet",n.href="https://fonts.googleapis.com/css?family=Montserrat",document.head.appendChild(n);let o=document.createElement("style");o.innerHTML=V,document.head.appendChild(o),document.querySelector("#home-container").innerHTML=`
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
        `,(r=document.querySelector("#submit"))==null||r.addEventListener("click",()=>{this.completePayment(e)})}async createPaymentIntent(e){fetch(`${u}/aion/payments/config`).then(t=>t.json()).then(t=>{U(t.stripe_public_key).then(n=>{this.stripe=n,this.is_test_mode=t.stripe_public_key.includes("test"),fetch(`${u}/aion/payments/create_intent`,{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${this.checkUserToken()}`},body:JSON.stringify({product_id:this.is_test_mode?e.test_id:e.id})}).then(o=>o.json()).then(o=>{var i;if(o.code===10)throw console.warn(o.message),alert(o.message),window.location.href=`https://${window.location.host}/`,new Error(o.message);this.elements=this.stripe.elements({clientSecret:o.client_secret});let r=this.elements.create("payment");(i=document.querySelector("#progress-loader"))==null||i.classList.add("hide"),document.querySelector("#submit").style.visibility="visible",r.mount("#payment-element")}).catch(o=>{console.error("Something wrong when create a payment intent",o),alert("Something wrong when create a payment. Please try again.")})})})}checkUserToken(){let e=localStorage.getItem("_ms-mid");if(!e)throw new Error("User token not found");return e}async initPaymentForm(e){console.log("Init payment form...");let t=await this.initStripe();if(this.stripe=t,!t)return;let n={theme:"flat",variables:{colorPrimary:"#30313d",colorText:"#30313d"},roles:{".TermsText":{hide:!0}}},o={},r="auto",i=await this.getClientSecret(e);if(!i)return;let y=t.elements({clientSecret:i,appearance:n,loader:r});this.elements=y;let w=y.create("payment",o).mount("#payment-element")}async getClientSecret(e){return fetch(`${u}/aion/payments/create_intent`,{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${this.checkUserToken()}`},body:JSON.stringify({product_id:this.is_test_mode?e.test_id:e.id})}).then(t=>t.json()).then(t=>{if(console.log(t),t.code===10){let n=this.is_test_mode?e.test_id:e.id;if(console.log(n,t.plan_id),t.plan_id&&t.plan_id!==n)return this.updateSubscription(e);throw console.warn(t.message),alert(t.message),window.location.href=`https://${window.location.host}/`,new Error(t.message)}return document.getElementById("button-text").innerHTML=`$${t.amount}`,t.client_secret})}async updateSubscription(e){return console.log("Update subscription..."),fetch(`${u}/aion/payments/subscription`,{method:"PUT",headers:{"Content-Type":"application/json",Authorization:`Bearer ${this.checkUserToken()}`},body:JSON.stringify({product_id:this.is_test_mode?e.test_id:e.id})}).then(t=>t.json()).then(t=>{var n;if(console.log(t),t.credit){(n=document.querySelector("#payment-form"))==null||n.classList.add("hide"),M(t.credit,e.name);return}return document.getElementById("button-text").innerHTML=`Pay $${t.amount}`,t.client_secret}).catch(t=>{console.error("Something wrong when update a subscription",t),alert("Something wrong when update a subscription. Please try again or contact us."),window.location.href=`https://${window.location.host}/#plans`})}initStripe(){return console.log("Init stripe..."),fetch(`${u}/aion/payments/config`).then(e=>e.json()).then(e=>(this.is_test_mode=e.stripe_public_key.includes("test"),U(e.stripe_public_key).then(t=>t))).catch(e=>{console.error("Something wrong when init stripe",e)})}async completePayment(e){console.log("Complete payment...");let t=document.querySelector("#submit");if(t.innerHTML.includes("Payments attempt")){window.location.href=`https://${window.location.host}/#plans`;return}let n=t.innerHTML,o=null,r=null;for(let i=1;i<=5&&(this.showBlinkMessage(`Payments attempt ${i}...`,t),o=await this.stripe.confirmPayment({elements:this.elements,confirmParams:{return_url:`https://${window.location.host}/dashboard/settings?payment_success=${e.name}`}}).then(y=>y.error?(r=y.error.message,"error"):(console.log(y),"success")),t.innerHTML=n,console.log("result: ",o),!(o==="false"||o==="success"));i++);console.log(o,r),o==="error"&&alert(r)}async cancelSubscription(){fetch(`${u}/aion/payments/cancel_subscription`,{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${this.checkUserToken()}`}}).then(e=>e.json()).catch(e=>{console.error("Something wrong when create a checkout session",e)})}async getSubscriptionInfo(){try{let e=await fetch(`${u}/aion/payments/subscription`,{method:"GET",headers:{"Content-Type":"application/json",Authorization:`Bearer ${this.checkUserToken()}`}});return await this.handleResponse(e)}catch{return null}}async handleResponse(e){if(!e.ok){let t=await e.json();throw{status:e.status,message:t}}if(e.status!==204)return await e.json()}isValidCreditCardNumber(e){if(e=e.replace(/\s/g,"").split("").reverse().join(""),!/^[0-9]{13,19}$/.test(e))return!1;let t=0;for(let n=0;n<e.length;n++){let o=parseInt(e[n]);n%2===1&&(o*=2,o>9&&(o-=9)),t+=o}return t%10===0}};var J=new A,p=class{constructor(e){let t=l.getToken(),n=`${u}/aion/${e}`;this.client=new b(n,t)}static sendVerificationEmail(){let{client:e}=p.getInstance();return e.get("email_verification",{})}static getInstance(e="users"){return p.instance||(p.instance=new p(e)),p.instance}static async fetchRequests(e=0,t=10){try{let{client:n}=p.getInstance(),o=`data?filters=requests&offset=${e}&limit=${t}`;return await n.get(o).then(r=>r.requests.array)}catch(n){return console.error("getRequests:",n),[]}}static async fetchUsageApi(){try{let{client:e}=p.getInstance(),t="data?filters=all&offset=0&limit=1";return await e.get(t).then(n=>n.api)}catch(e){return console.error("fetchUsageApi:",e),[]}}static async signUp(){try{let{client:e}=p.getInstance();return await e.post("sign_up",{}).then(()=>!1).catch(t=>{throw t})}catch(e){throw console.error("signUp:",e),e}}static async login(){try{let{client:e}=p.getInstance();return await e.get("login")}catch(e){console.error("login:",e)}}static async delete(){try{let{client:e}=p.getInstance();return l.removeAuth(),await e.delete(""),!0}catch(e){console.error("delete:",e)}}static async fetchApiToken(){try{let{client:e}=p.getInstance();return await e.post("api_token",{})}catch(e){console.error("fetchApiToken:",e),console.error("fetchApiToken:",e)}}static async refreshApiToken(){try{let{client:e}=p.getInstance();return await e.patch("api_token",{})}catch(e){console.error("refreshApiToken:",e)}}static async fetchSubscriptionData(){let{client:e}=p.getInstance();try{let t="data?filters=all&offset=0&limit=1";return await e.get(t).then(n=>n)}catch(t){console.error("fetchSubscriptionData:",t)}}static async subscriptionInfo(){var y,w,v,P,d,a,c,x,S,T,_,$,k,q,R;let e=document.querySelector("#plan-info"),t=document.querySelector("#usage-info"),n=document.querySelector("#btn-cancel-plan");e.classList.add("hide"),t.classList.add("hide"),n.classList.add("hide");let o=[p.fetchSubscriptionData(),J.getSubscriptionInfo()],[r,i]=await Promise.all(o);if(r!=null&&r.plan||(e.innerHTML=`You're on the <span class="text-color-green">Free</span> plan. You have limits of 20 & 100 checks per month via web & API, respectively. If you need more, check out our <a class="text-color-green" href='https://${window.location.host}/#plans' >plans</a>.`,t.innerHTML=`You have used ${((y=r==null?void 0:r.requests)==null?void 0:y.total)||0} of 20 checks via web and ${((v=(w=r==null?void 0:r.api)==null?void 0:w.usage)==null?void 0:v.daily)||0} of 100 checks via API.`,e.classList.remove("hide"),t.classList.remove("hide")),(r==null?void 0:r.plan.requests_limits.quantity)<=1e3){let I=r==null?void 0:r.plan.requests_limits.quantity;e.innerHTML=`You're on the <span class="text-color-green">Base</span> plan. You have limits of ${I} requests for both web & API.`,t.innerHTML=`You have used ${(((P=r==null?void 0:r.requests)==null?void 0:P.total)||0)+(((a=(d=r==null?void 0:r.api)==null?void 0:d.usage)==null?void 0:a.daily)||0)} of ${I} checks via both web API.`,(c=i==null?void 0:i.subscription.meta)!=null&&c.was_canceled?(n.classList.add("hide"),t.innerHTML=t.innerHTML+` Your subscription has been canceled, expires on ${new Date(i==null?void 0:i.subscription.expiration_dt).toLocaleDateString()}.`):n.classList.remove("hide"),e.classList.remove("hide"),t.classList.remove("hide")}(r==null?void 0:r.plan.requests_limits.quantity)===1e4&&(e.innerHTML=`You're on the <span class="text-color-green">PRO</span> plan. You have limits of 10000 requests for both web & API.`,t.innerHTML=`You have used ${(((x=r==null?void 0:r.requests)==null?void 0:x.total)||0)+(((T=(S=r==null?void 0:r.api)==null?void 0:S.usage)==null?void 0:T.daily)||0)} of 10000 checks via both web & API.`,($=(_=i==null?void 0:i.subscription)==null?void 0:_.meta)!=null&&$.was_canceled?(n.classList.add("hide"),t.innerHTML=t.innerHTML+` Your subscription has been canceled, expires on ${new Date(i==null?void 0:i.subscription.expiration_dt).toLocaleDateString()}.`):n.classList.remove("hide"),e.classList.remove("hide"),t.classList.remove("hide")),(r==null?void 0:r.plan.requests_limits.quantity)>1e4&&(e.innerHTML=`You're on the <span class="text-color-green">Custom</span> plan. You have limits of ${r==null?void 0:r.plan.requests_limits.quantity} requests for both web & API.`,t.innerHTML=`You have used ${(((k=r==null?void 0:r.requests)==null?void 0:k.total)||0)+(((R=(q=r==null?void 0:r.api)==null?void 0:q.usage)==null?void 0:R.daily)||0)} of 10000 checks via both web & API.`,n.innerHTML="Contact US  to update your plan.",n.classList.remove("hide"),e.classList.remove("hide"),t.classList.remove("hide")),n.addEventListener("click",async()=>{(r==null?void 0:r.plan.requests_limits.quantity)>1e4?window.location.href=`https://${window.location.host}/contact-us`:confirm("Are you sure you want to cancel your subscription?")?(alert("Your subscription has been canceled."),J.cancelSubscription().then(I=>{console.log(I)}),window.location.href=`https://${window.location.host}/#plans`):alert("Your subscription has not been canceled.")})}static async getUserInfo(){let{client:e}=p.getInstance();try{return await e.get("")}catch(t){console.error("getUserInfo:",t)}}static async getTransactions(){let{client:e}=new p("payments");try{return await e.get("invoices")}catch(t){console.error("getTransactions:",t)}}},m=p;m.instance=null;var f=class{constructor(){}static getUserInfo(){return m.getUserInfo()}static isAuth(){return localStorage.getItem(f.token_key)!==null}static setAuth(){localStorage.setItem(f.key,"true")}static removeAuth(){localStorage.removeItem(f.key)}static async init(){if(localStorage.getItem("_aion_in")===null)try{await m.signUp(),f.setAuth(),await m.login(),localStorage.setItem("_aion_in","true")}catch(e){console.log(e)}}static getToken(){var e;return(e=localStorage.getItem("_ms-mid"))!=null?e:""}static isExpiredToken(){let e=f.getToken();if((e==null?void 0:e.length)>0){let t=H(e),n=Date.now()/1e3;return t.exp<n}return!0}static checkAuth(e){if(!f.isAuth()){let t=document.getElementById("sign-up");return t.style.display="flex",t.style.zIndex=100,e(),!0}return!1}static async sendVerifiedEmail(){console.log("sendVerifiedEmail"),await m.sendVerificationEmail()}},l=f;l.key="isSignUp",l.token_key="_ms-mid";var h=class{constructor(){let e=l.getToken(),t=`${u}/aion/ai-generated`;this.client=new b(t,e)}static getInstance(){return h.instance||(h.instance=new h),h.instance}static async getReportsByBinary(e){let{client:t}=h.getInstance();try{let n=new FormData;return n.append("binary",e,"uploaded-file.png"),await t.postBinary("reports/binary",n)}catch(n){n.status===402&&alert("Please verify your email to continue using the service"),n.status===429&&(alert(`It looks like you have reached your plan limit of ${n.message.msg.current_limit} requests. To continue, please upgrade to a new plan.`),window.location.href=`https://${window.location.host}/#plans`),console.error("Error getReportsByBinary:",n)}}static async getReportsByUrl(e){let{client:t}=h.getInstance();try{let n=`reports/url?url=${e}`;return await t.post(n,{})}catch(n){n.status===402&&alert("Please verify your email to continue using the service"),n.status===429&&(alert(`It looks like you have reached your plan limit of ${n.message.msg.current_limit} requests. To continue, please upgrade to a new plan.`),window.location.href=`https://${window.location.host}/#plans`),console.error("getReportsByUrl:",n)}}static async getAudioVerdict(e){let{client:t}=h.getInstance();try{let n=new FormData;return n.append("file",e),await t.postBinary("reports/audio/binary",n)}catch(n){n.status===402&&alert("Please verify your email to continue using the service"),n.status===429&&(alert(`It looks like you have reached your plan limit of ${n.message.msg.current_limit} requests. To continue, please upgrade to a new plan.`),window.location.href=`https://${window.location.host}/#plans`),console.error("Error getAudioVerdict:",n)}}static async getYoutubeVerdict(e){let{client:t}=h.getInstance();try{let n={url:e};return await t.post("reports/audio/link",n)}catch(n){n.status===402&&alert("Please verify your email to continue using the service"),n.status===429&&(alert(`It looks like you have reached your plan limit of ${n.message.msg.current_limit} requests. To continue, please upgrade to a new plan.`),window.location.href=`https://${window.location.host}/#plans`),console.error("Error getYoutubeVerdict:",n)}}static async getPdetReportByUrl(e){let{client:t}=h.getInstance();try{let n={object:e};return await t.post("reports/person_detection/url",n)}catch(n){n.status===402&&alert("Please verify your email to continue using the service"),n.status===429&&(alert(`It looks like you have reached your plan limit of ${n.message.msg.current_limit} requests. To continue, please upgrade to a new plan.`),window.location.href=`https://${window.location.host}/#plans`),console.error("Error getYoutubeVerdict:",n)}}static async getPdetReportByBinary(e){let{client:t}=h.getInstance();try{let n=new FormData;return n.append("file",e,"uploaded-file.png"),await t.postBinary("reports/person_detection/binary",n)}catch(n){n.status===402&&alert("Please verify your email to continue using the service"),n.status===429&&(alert(`It looks like you have reached your plan limit of ${n.message.msg.current_limit} requests. To continue, please upgrade to a new plan.`),window.location.href=`https://${window.location.host}/#plans`),console.error("Error getReportsByBinary:",n)}}},L=h;L.instance=null;var B=class{constructor(){}static isLimitExceeded(){return!!l.isExpiredToken()}static increment(){let e=localStorage.getItem(B.key),t=e===null?1:Number(e)+1;localStorage.setItem(B.key,t.toString())}},C=B;C.key="requestCount";var ne=async()=>{let s=document.querySelector("#btn-verified-email"),e=document.querySelector("#btn-delete-account"),t=document.querySelector("#transactions-section"),n=document.querySelector("#transaction-table"),o=document.querySelector("#sign-out"),i=new URLSearchParams(window.location.search).get("payment_success"),y=i==null?void 0:i.split(" ")[0];i&&O(y);let w=`
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
    
`,v=document.createElement("style");v.innerHTML=w,document.head.appendChild(v),l.init(),m.subscriptionInfo().then(d=>{}),s.classList.remove("hide"),l.getUserInfo().then(d=>{d.is_verified?(s.innerHTML="Email has been verified",s.classList.remove("settings-edit"),s.disable=!0):(s.classList.remove("hide"),s.onclick=async()=>{s.classList.add("hide"),await l.sendVerifiedEmail(),alert("Email sent. Check your inbox.")})}),o.onclick=()=>{l.removeAuth(),localStorage.removeItem("_aion_in")},e.onclick=async()=>{if(confirm("Are you sure you want to delete your account?")){if(await l.init(),!await m.delete()){alert("Something went wrong. Please try again later.");return}localStorage.removeItem("_aion_in"),alert("Your account has been deleted."),window.location.href=`https://${window.location.host}/`}},n.innerHTML=`
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
`;function P(d){var k;let a=(k=document.getElementById("table"))==null?void 0:k.getElementsByTagName("tbody")[0],c=a==null?void 0:a.insertRow(a.rows.length),x=c==null?void 0:c.insertCell(0),S=c==null?void 0:c.insertCell(1),T=c==null?void 0:c.insertCell(2),_=c==null?void 0:c.insertCell(3),$=c==null?void 0:c.insertCell(4);x.innerHTML=`<p class="cell"> ${d.num} </p>`,S.innerHTML=`<p class="cell"> ${d.name} </p>`,T.innerHTML=`<p class="cell"> ${d.amount} </p>`,_.innerHTML=`<p class="cell" style="color: ${d.status==="paid"?"#00D924":"red"}" > ${d.status} </p>`,d.status!=="draft"&&($.innerHTML=`<a class="cell" href="${d.invoice_link}" target="_blank" style="text-decoration: underline"> Invoice </a>`)}m.getTransactions().then(({invoices:d})=>{d.forEach((a,c)=>{P({num:c+1,name:a==null?void 0:a.created_dt,amount:`$${a==null?void 0:a.amount}`,status:a==null?void 0:a.status,invoice_link:a==null?void 0:a.link}),t.classList.remove("hide")})})};ne();})();
