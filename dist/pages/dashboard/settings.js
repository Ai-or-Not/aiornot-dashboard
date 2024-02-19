"use strict";(()=>{var Y=`
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
`,j=document.createElement("style");j.innerHTML=Y;document.head.appendChild(j);var w=document.getElementById("toast");function R(i,e="info"){w.classList.remove("hide");let t=document.createElement("span");t.innerHTML="x",t.className="close-button",t.addEventListener("click",()=>{w.classList.add("hide"),e!=="error"&&(window.location.href=`https://${window.location.host}/dashboard/settings`)}),w.innerHTML=i,w.appendChild(t),w.classList.add("show"),w.style.borderColor=e==="error"?"red":"#aefc06"}var D=i=>{R(`<p style="font-size: 1.5rem; padding: 2rem;">Amazing! You\u2019ve just upgraded your account, welcome to the exclusive ranks of AI or Not <span style="color: #aefc06; font-weight: bold ">${i}</span> users. Thank you for being a supporter of AI or Not and a purveyor of the truth!</p>`)},q=(i,e)=>{R(`<p style="font-size: 1.5rem; padding: 2rem;">We are pleased to inform you that you currently have a credit of $${i} from a previous paid subscription after that we successfully update your plan to <span style="color: #aefc06; font-weight: bold ">${e.split(" ")[0]}</span>! If you have any questions please contact us.</p>`)};function M(i){var e=i.split(".")[1],t=e.replace(/-/g,"+").replace(/_/g,"/"),n=decodeURIComponent(atob(t).split("").map(function(o){return"%"+("00"+o.charCodeAt(0).toString(16)).slice(-2)}).join(""));return JSON.parse(n)}var z="https://js.stripe.com/v3",J=/^https:\/\/js\.stripe\.com\/v3\/?(\?.*)?$/,O="loadStripe.setLoadParameters was called but an existing Stripe.js script already exists in the document; existing script parameters will be used",G=function(){for(var e=document.querySelectorAll('script[src^="'.concat(z,'"]')),t=0;t<e.length;t++){var n=e[t];if(J.test(n.src))return n}return null},W=function(e){var t=e&&!e.advancedFraudSignals?"?advancedFraudSignals=false":"",n=document.createElement("script");n.src="".concat(z).concat(t);var o=document.head||document.body;if(!o)throw new Error("Expected document.body not to be null. Stripe.js requires a <body> element.");return o.appendChild(n),n},X=function(e,t){!e||!e._registerWrapper||e._registerWrapper({name:"stripe-js",version:"2.1.7",startTime:t})},_=null,K=function(e){return _!==null||(_=new Promise(function(t,n){if(typeof window=="undefined"||typeof document=="undefined"){t(null);return}if(window.Stripe&&e&&console.warn(O),window.Stripe){t(window.Stripe);return}try{var o=G();o&&e?console.warn(O):o||(o=W(e)),o.addEventListener("load",function(){window.Stripe?t(window.Stripe):n(new Error("Stripe.js not available"))}),o.addEventListener("error",function(){n(new Error("Failed to load Stripe.js"))})}catch(r){n(r);return}})),_},Q=function(e,t,n){if(e===null)return null;var o=e.apply(void 0,t);return X(o,n),o},H=Promise.resolve().then(function(){return K(null)}),N=!1;H.catch(function(i){N||console.warn(i)});var U=function(){for(var e=arguments.length,t=new Array(e),n=0;n<e;n++)t[n]=arguments[n];N=!0;var o=Date.now();return H.then(function(r){return Q(r,t,o)})};var oe=window.location.host.includes("webflow")?"stage":"prod",m="http://localhost:8000";var v=class{constructor(e,t){this.apiUrl=e,this.bearerToken=t}async get(e){let t=`${this.apiUrl}/${e}`;try{let n=await fetch(t,{method:"GET",headers:{"Content-Type":"application/json",Authorization:`Bearer ${this.bearerToken}`}});return await this.handleResponse(n)}catch(n){throw console.error("Error",n),n}}async post(e,t){let n=`${this.apiUrl}/${e}`;try{let o=await fetch(n,{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${this.bearerToken}`},body:JSON.stringify(t)});return await this.handleResponse(o)}catch(o){throw console.error("Request error",o),o.status===429&&alert(`It looks like you have reached your plan limit of ${o.message.current_limit} requests. To continue, please upgrade to a new plan.`),o}}async postBinary(e,t){let n=`${this.apiUrl}/${e}`;try{let o=await fetch(n,{method:"POST",headers:{Accept:"application/json",Authorization:`Bearer ${this.bearerToken}`},body:t});return await this.handleResponse(o)}catch(o){throw console.error("Binary request error:",o),o.status===429&&alert(`It looks like you have reached your plan limit of ${o.message.current_limit} requests. To continue, please upgrade to a new plan.`),o}}async delete(e){let t=`${this.apiUrl}/${e}`;try{let n=await fetch(t,{method:"DELETE",headers:{accept:"*/*",Authorization:`Bearer ${this.bearerToken}`}});await this.handleResponse(n)}catch(n){throw console.error("Error when perform DELETE-request:",n),n}}async patch(e,t){let n=`${this.apiUrl}/${e}`;try{let o=await fetch(n,{method:"PATCH",headers:{"Content-Type":"application/json",Authorization:`Bearer ${this.bearerToken}`},body:JSON.stringify(t)});return await this.handleResponse(o)}catch(o){throw console.error("\u041E\u0448\u0438\u0431\u043A\u0430 \u043F\u0440\u0438 \u0432\u044B\u043F\u043E\u043B\u043D\u0435\u043D\u0438\u0438 PATCH-\u0437\u0430\u043F\u0440\u043E\u0441\u0430:",o),o}}async handleResponse(e){if(!e.ok){let t=await e.json();throw{status:e.status,message:t}}if(e.status!==204)return await e.json()}};var F=`

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
            
            `,A=class{constructor(){this.elements=null;this.stripe=null;this.home_element=document.querySelector("#home");this.PRODUCT_ID_BASE_9USD_PLAN={id:"base-plan",msg:"Base plan: $9/month",name:"Base plan",description:"300 requests per month",price:"$9",test_id:"base-plan"};this.PRODUCT_ID_PRO_PLAN={id:"pro-plan",msg:"Pro plan: $250/month",name:"Pro plan",description:"10,000 requests per month",price:"$250",test_id:"pro-plan"};this.is_test_mode=!1}showBlinkMessage(e,t){let n=document.createElement("style");n.innerHTML=F,document.head.appendChild(n),t.innerHTML=`
        <div class="text-blink">${e}</div>
        `}getProduct(e){if(e===this.PRODUCT_ID_PRO_PLAN.id)return this.PRODUCT_ID_PRO_PLAN;if(e===this.PRODUCT_ID_BASE_9USD_PLAN.id)return this.PRODUCT_ID_BASE_9USD_PLAN}checkout(e){window.location.href=`https://${window.location.host}/checkout?product_id=${e.id}`}createPaymentForm(e){this.home_element.innerHTML=`

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
    `,document.querySelector("#submit").addEventListener("click",()=>{this.completePayment(this.PRODUCT_ID_BASE_PLAN)})}createPaymentForm2(e){var r;let t=document.createElement("link");t.rel="stylesheet",t.href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css",t.type="text/css",document.head.appendChild(t);let n=document.createElement("link");n.rel="stylesheet",n.href="https://fonts.googleapis.com/css?family=Montserrat",document.head.appendChild(n);let o=document.createElement("style");o.innerHTML=F,document.head.appendChild(o),document.querySelector("#home-container").innerHTML=`
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
        `,(r=document.querySelector("#submit"))==null||r.addEventListener("click",()=>{this.completePayment(e)})}async createPaymentIntent(e){fetch(`${m}/aion/payments/config`).then(t=>t.json()).then(t=>{U(t.stripe_public_key).then(n=>{this.stripe=n,this.is_test_mode=t.stripe_public_key.includes("test"),fetch(`${m}/aion/payments/create_intent`,{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${this.checkUserToken()}`},body:JSON.stringify({product_id:this.is_test_mode?e.test_id:e.id})}).then(o=>o.json()).then(o=>{var s;if(o.code===10)throw console.warn(o.message),alert(o.message),window.location.href=`https://${window.location.host}/`,new Error(o.message);this.elements=this.stripe.elements({clientSecret:o.client_secret});let r=this.elements.create("payment");(s=document.querySelector("#progress-loader"))==null||s.classList.add("hide"),document.querySelector("#submit").style.visibility="visible",r.mount("#payment-element")}).catch(o=>{console.error("Something wrong when create a payment intent",o),alert("Something wrong when create a payment. Please try again.")})})})}checkUserToken(){let e=localStorage.getItem("_ms-mid");if(!e)throw new Error("User token not found");return e}async initPaymentForm(e){console.log("Init payment form...");let t=await this.initStripe();if(this.stripe=t,!t)return;let n={theme:"flat",variables:{colorPrimary:"#30313d",colorText:"#30313d"},roles:{".TermsText":{hide:!0}}},o={},r="auto",s=await this.getClientSecret(e);if(!s)return;let f=t.elements({clientSecret:s,appearance:n,loader:r});this.elements=f;let k=f.create("payment",o).mount("#payment-element")}async getClientSecret(e){return fetch(`${m}/aion/payments/create_intent`,{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${this.checkUserToken()}`},body:JSON.stringify({product_id:this.is_test_mode?e.test_id:e.id})}).then(t=>t.json()).then(t=>{if(console.log(t),t.code===10){let n=this.is_test_mode?e.test_id:e.id;if(console.log(n,t.plan_id),t.plan_id&&t.plan_id!==n)return this.updateSubscription(e);throw console.warn(t.message),alert(t.message),window.location.href=`https://${window.location.host}/`,new Error(t.message)}return document.getElementById("button-text").innerHTML=`$${t.amount}`,t.client_secret})}async updateSubscription(e){return console.log("Update subscription..."),fetch(`${m}/aion/payments/subscription`,{method:"PUT",headers:{"Content-Type":"application/json",Authorization:`Bearer ${this.checkUserToken()}`},body:JSON.stringify({product_id:this.is_test_mode?e.test_id:e.id})}).then(t=>t.json()).then(t=>{var n;if(console.log(t),t.credit){(n=document.querySelector("#payment-form"))==null||n.classList.add("hide"),q(t.credit,e.name);return}return document.getElementById("button-text").innerHTML=`Pay $${t.amount}`,t.client_secret}).catch(t=>{console.error("Something wrong when update a subscription",t),alert("Something wrong when update a subscription. Please try again or contact us."),window.location.href=`https://${window.location.host}/#plans`})}initStripe(){return console.log("Init stripe..."),fetch(`${m}/aion/payments/config`).then(e=>e.json()).then(e=>(this.is_test_mode=e.stripe_public_key.includes("test"),U(e.stripe_public_key).then(t=>t))).catch(e=>{console.error("Something wrong when init stripe",e)})}async completePayment(e){console.log("Complete payment...");let t=document.querySelector("#submit");if(t.innerHTML.includes("Payments attempt")){window.location.href=`https://${window.location.host}/#plans`;return}let n=t.innerHTML,o=null,r=null;for(let s=1;s<=5&&(this.showBlinkMessage(`Payments attempt ${s}...`,t),o=await this.stripe.confirmPayment({elements:this.elements,confirmParams:{return_url:`https://${window.location.host}/dashboard/settings?payment_success=${e.name}`}}).then(f=>f.error?(r=f.error.message,"error"):(console.log(f),"success")),t.innerHTML=n,console.log("result: ",o),!(o==="false"||o==="success"));s++);console.log(o,r),o==="error"&&alert(r)}async cancelSubscription(){fetch(`${m}/aion/payments/cancel_subscription`,{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${this.checkUserToken()}`}}).then(e=>e.json()).catch(e=>{console.error("Something wrong when create a checkout session",e)})}async getSubscriptionInfo(){try{let e=await fetch(`${m}/aion/payments/subscription`,{method:"GET",headers:{"Content-Type":"application/json",Authorization:`Bearer ${this.checkUserToken()}`}});return await this.handleResponse(e)}catch{return null}}async handleResponse(e){if(!e.ok){let t=await e.json();throw{status:e.status,message:t}}if(e.status!==204)return await e.json()}isValidCreditCardNumber(e){if(e=e.replace(/\s/g,"").split("").reverse().join(""),!/^[0-9]{13,19}$/.test(e))return!1;let t=0;for(let n=0;n<e.length;n++){let o=parseInt(e[n]);n%2===1&&(o*=2,o>9&&(o-=9)),t+=o}return t%10===0}};var V=new A,p=class{constructor(e){let t=l.getToken(),n=`${m}/aion/${e}`;this.client=new v(n,t)}static sendVerificationEmail(){let{client:e}=p.getInstance();return e.get("email_verification",{})}static getInstance(e="users"){return p.instance||(p.instance=new p(e)),p.instance}static async fetchRequests(e=0,t=10){try{let{client:n}=p.getInstance(),o=`data?filters=requests&offset=${e}&limit=${t}`;return await n.get(o).then(r=>r.requests.array)}catch(n){return console.error("getRequests:",n),[]}}static async fetchUsageApi(){try{let{client:e}=p.getInstance(),t="data?filters=all&offset=0&limit=1";return await e.get(t).then(n=>n.api)}catch(e){return console.error("fetchUsageApi:",e),[]}}static async signUp(){try{let{client:e}=p.getInstance();return await e.post("sign_up",{}).then(()=>!1).catch(t=>{throw t})}catch(e){throw console.error("signUp:",e),e}}static async login(){try{let{client:e}=p.getInstance();return await e.get("login")}catch(e){console.error("login:",e)}}static async delete(){try{let{client:e}=p.getInstance();return l.removeAuth(),await e.delete(""),!0}catch(e){console.error("delete:",e)}}static async fetchApiToken(){try{let{client:e}=p.getInstance();return await e.post("api_token",{})}catch(e){console.error("fetchApiToken:",e),console.error("fetchApiToken:",e)}}static async refreshApiToken(){try{let{client:e}=p.getInstance();return await e.patch("api_token",{})}catch(e){console.error("refreshApiToken:",e)}}static async fetchSubscriptionData(){let{client:e}=p.getInstance();try{let t="data?filters=all&offset=0&limit=1";return await e.get(t).then(n=>n)}catch(t){console.error("fetchSubscriptionData:",t)}}static async subscriptionInfo(){var f,k,x,S,d,a,c,T,$;let e=document.querySelector("#plan-info"),t=document.querySelector("#usage-info"),n=document.querySelector("#btn-cancel-plan");e.classList.add("hide"),t.classList.add("hide"),n.classList.add("hide");let o=[p.fetchSubscriptionData(),V.getSubscriptionInfo()],[r,s]=await Promise.all(o);if((r==null?void 0:r.plan.name)==="Free")e.innerHTML=`<p>You're on the <span class="text-color-green">Free</span> plan. You have limits of 20 & 100 image and 5 audio checks per month via web & API, respectively.</p> 
                                  <p>If you need more, check out our <a class="text-color-green" href='https://${window.location.host}/#plans' >plans</a>.</p>`,t.innerHTML=`<p> You have used:</p> 
                                    <p style="margin-left: 1rem"> ${((f=r==null?void 0:r.usage)==null?void 0:f.web.image)||0} of 20 checks of image via web;</p> 
                                    <p style="margin-left: 1rem"> ${((k=r==null?void 0:r.usage)==null?void 0:k.api.image)||0} of 100 checks of image via API;</p> 
                                    <p style="margin-left: 1rem"> ${((x=r==null?void 0:r.usage)==null?void 0:x.web.audio)+((S=r==null?void 0:r.usage)==null?void 0:S.api.audio)} of 5 checks of audio for both web & API;</p>`,e.classList.remove("hide"),t.classList.remove("hide");else{let y=`You're on the <span class="text-color-green">${r==null?void 0:r.plan.name}</span> plan.`,E=0,I=0,P=0;y=y+"<p>  You have quotas:</p>",r.plan.quotas.forEach(b=>{E+=1,b.resource==="image"&&(I=b.limit),b.resource==="audio"&&(P=b.limit),y=y+`<p style="margin-left: 1rem"> <span>${E}.</span> <span style="margin-left: 0.4rem"> ${b.limit} requests to check ${b.resource} for both web & API.</span></p>`}),e.innerHTML=y,t.innerHTML=`<p> You have used:</p> 
                                    <p style="margin-left: 1rem"> ${((d=r==null?void 0:r.usage)==null?void 0:d.web.image)+((a=r==null?void 0:r.usage)==null?void 0:a.api.image)} of ${I} checks of image via both web & API;</p> 
                                    <p style="margin-left: 1rem"> ${((c=r==null?void 0:r.usage)==null?void 0:c.web.audio)+((T=r==null?void 0:r.usage)==null?void 0:T.api.audio)} of ${P} checks of audio for both web & API;</p>`,($=s==null?void 0:s.subscription.meta)!=null&&$.was_canceled?(n.classList.add("hide"),t.innerHTML=t.innerHTML+` Your subscription has been canceled, expires on ${new Date(s==null?void 0:s.subscription.expiration_dt).toLocaleDateString()}.`):n.classList.remove("hide"),e.classList.remove("hide"),t.classList.remove("hide")}n.addEventListener("click",async()=>{(r==null?void 0:r.plan.name)!=="Base"&&(r==null?void 0:r.plan.name)!=="Pro"?window.location.href=`https://${window.location.host}/contact-us`:confirm("Are you sure you want to cancel your subscription?")?(alert("Your subscription has been canceled."),V.cancelSubscription().then(y=>{console.log(y)}),window.location.href=`https://${window.location.host}/#plans`):alert("Your subscription has not been canceled.")})}static async getUserInfo(){let{client:e}=p.getInstance();try{return await e.get("")}catch(t){console.error("getUserInfo:",t)}}static async getTransactions(){let{client:e}=new p("payments");try{return await e.get("invoices")}catch(t){console.error("getTransactions:",t)}}},u=p;u.instance=null;var g=class{constructor(){}static getUserInfo(){return u.getUserInfo()}static isAuth(){return localStorage.getItem(g.token_key)!==null}static setAuth(e){localStorage.setItem(g.key,e)}static removeAuth(){localStorage.removeItem(g.key)}static async init(){let e=localStorage.getItem("_ms-mem"),t=localStorage.getItem(this.key),n=e!==null?JSON.parse(e).id:null;if(n!==n&&g.removeAuth(),t===null)try{await u.signUp(),g.setAuth(n),await u.login()}catch(o){console.log(o)}}static getToken(){var e;return(e=localStorage.getItem("_ms-mid"))!=null?e:""}static isExpiredToken(){let e=g.getToken();if((e==null?void 0:e.length)>0){let t=M(e),n=Date.now()/1e3;return t.exp<n}return!0}static checkAuth(e){if(!g.isAuth()){let t=document.getElementById("sign-up");return t.style.display="flex",t.style.zIndex=100,e(),!0}return!1}static async sendVerifiedEmail(){console.log("sendVerifiedEmail"),await u.sendVerificationEmail()}},l=g;l.key="isSignUp",l.token_key="_ms-mid";var h=class{constructor(){let e=l.getToken(),t=`${m}/aion/ai-generated`;this.client=new v(t,e)}static getInstance(){return h.instance||(h.instance=new h),h.instance}static async getReportsByBinary(e){let{client:t}=h.getInstance();try{let n=new FormData;return n.append("binary",e,"uploaded-file.png"),await t.postBinary("reports/binary",n)}catch(n){n.status===402&&alert("Please verify your email to continue using the service"),n.status===429&&(alert(`It looks like you have reached your plan limit of ${n.message.current_limit} requests. To continue, please upgrade to a new plan.`),window.location.href=`https://${window.location.host}/#plans`),console.error("Error getReportsByBinary:",n)}}static async getReportsByUrl(e){let{client:t}=h.getInstance();try{let n=`reports/url?url=${e}`;return await t.post(n,{})}catch(n){n.status===402&&alert("Please verify your email to continue using the service"),n.status===429&&(alert(`It looks like you have reached your plan limit of ${n.message.current_limit} requests. To continue, please upgrade to a new plan.`),window.location.href=`https://${window.location.host}/#plans`),console.error("getReportsByUrl:",n)}}static async getAudioVerdict(e){let{client:t}=h.getInstance();try{let n=new FormData;return n.append("file",e),await t.postBinary("reports/audio/binary",n)}catch(n){n.status===402&&alert("Please verify your email to continue using the service"),n.status===429&&(alert(`It looks like you have reached your plan limit of ${n.message.current_limit} requests. To continue, please upgrade to a new plan.`),window.location.href=`https://${window.location.host}/#plans`),console.error("Error getAudioVerdict:",n)}}static async getYoutubeVerdict(e){let{client:t}=h.getInstance();try{let n={url:e};return await t.post("reports/audio/link",n)}catch(n){n.status===402&&alert("Please verify your email to continue using the service"),n.status===429&&(alert(`It looks like you have reached your plan limit of ${n.message.current_limit} requests. To continue, please upgrade to a new plan.`),window.location.href=`https://${window.location.host}/#plans`),console.error("Error getYoutubeVerdict:",n)}}static async getPdetReportByUrl(e){let{client:t}=h.getInstance();try{let n={object:e};return await t.post("reports/person_detection/url",n)}catch(n){n.status===402&&alert("Please verify your email to continue using the service"),n.status===429&&(alert(`It looks like you have reached your plan limit of ${n.message.current_limit} requests. To continue, please upgrade to a new plan.`),window.location.href=`https://${window.location.host}/#plans`),console.error("Error getYoutubeVerdict:",n)}}static async getPdetReportByBinary(e){let{client:t}=h.getInstance();try{let n=new FormData;return n.append("file",e,"uploaded-file.png"),await t.postBinary("reports/person_detection/binary",n)}catch(n){n.status===402&&alert("Please verify your email to continue using the service"),n.status===429&&(alert(`It looks like you have reached your plan limit of ${n.message.current_limit} requests. To continue, please upgrade to a new plan.`),window.location.href=`https://${window.location.host}/#plans`),console.error("Error getReportsByBinary:",n)}}},L=h;L.instance=null;var B=class{constructor(){}static isLimitExceeded(){return!!l.isExpiredToken()}static increment(){let e=localStorage.getItem(B.key),t=e===null?1:Number(e)+1;localStorage.setItem(B.key,t.toString())}},C=B;C.key="requestCount";var Z=async()=>{let i=document.querySelector("#btn-verified-email"),e=document.querySelector("#btn-delete-account"),t=document.querySelector("#transactions-section"),n=document.querySelector("#transaction-table"),o=document.querySelector("#sign-out"),s=new URLSearchParams(window.location.search).get("payment_success"),f=s==null?void 0:s.split(" ")[0];s&&D(f);let k=`
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
    
`,x=document.createElement("style");x.innerHTML=k,document.head.appendChild(x),l.init(),u.subscriptionInfo().then(d=>{}),i.classList.remove("hide"),l.getUserInfo().then(d=>{d.is_verified?(i.innerHTML="Email has been verified",i.classList.remove("settings-edit"),i.disable=!0):(i.classList.remove("hide"),i.onclick=async()=>{i.classList.add("hide"),await l.sendVerifiedEmail(),alert("Email sent. Check your inbox.")})}),o.onclick=()=>{l.removeAuth(),localStorage.removeItem("_aion_in")},e.onclick=async()=>{if(confirm("Are you sure you want to delete your account?")){if(await l.init(),!await u.delete()){alert("Something went wrong. Please try again later.");return}localStorage.removeItem("_aion_in"),alert("Your account has been deleted."),window.location.href=`https://${window.location.host}/`}},n.innerHTML=`
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
`;function S(d){var P;let a=(P=document.getElementById("table"))==null?void 0:P.getElementsByTagName("tbody")[0],c=a==null?void 0:a.insertRow(a.rows.length),T=c==null?void 0:c.insertCell(0),$=c==null?void 0:c.insertCell(1),y=c==null?void 0:c.insertCell(2),E=c==null?void 0:c.insertCell(3),I=c==null?void 0:c.insertCell(4);T.innerHTML=`<p class="cell"> ${d.num} </p>`,$.innerHTML=`<p class="cell"> ${d.name} </p>`,y.innerHTML=`<p class="cell"> ${d.amount} </p>`,E.innerHTML=`<p class="cell" style="color: ${d.status==="paid"?"#00D924":"red"}" > ${d.status} </p>`,d.status!=="draft"&&(I.innerHTML=`<a class="cell" href="${d.invoice_link}" target="_blank" style="text-decoration: underline"> Invoice </a>`)}u.getTransactions().then(({invoices:d})=>{d.forEach((a,c)=>{S({num:c+1,name:a==null?void 0:a.created_dt,amount:`$${a==null?void 0:a.amount}`,status:a==null?void 0:a.status,invoice_link:a==null?void 0:a.link}),t.classList.remove("hide")})})};Z();})();
