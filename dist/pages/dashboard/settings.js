"use strict";(()=>{function _(c){var e=c.split(".")[1],t=e.replace(/-/g,"+").replace(/_/g,"/"),r=decodeURIComponent(atob(t).split("").map(function(n){return"%"+("00"+n.charCodeAt(0).toString(16)).slice(-2)}).join(""));return JSON.parse(r)}var E="https://js.stripe.com/v3",q=/^https:\/\/js\.stripe\.com\/v3\/?(\?.*)?$/,B="loadStripe.setLoadParameters was called but an existing Stripe.js script already exists in the document; existing script parameters will be used",D=function(){for(var e=document.querySelectorAll('script[src^="'.concat(E,'"]')),t=0;t<e.length;t++){var r=e[t];if(q.test(r.src))return r}return null},O=function(e){var t=e&&!e.advancedFraudSignals?"?advancedFraudSignals=false":"",r=document.createElement("script");r.src="".concat(E).concat(t);var n=document.head||document.body;if(!n)throw new Error("Expected document.body not to be null. Stripe.js requires a <body> element.");return n.appendChild(r),r},M=function(e,t){!e||!e._registerWrapper||e._registerWrapper({name:"stripe-js",version:"2.1.7",startTime:t})},y=null,z=function(e){return y!==null||(y=new Promise(function(t,r){if(typeof window=="undefined"||typeof document=="undefined"){t(null);return}if(window.Stripe&&e&&console.warn(B),window.Stripe){t(window.Stripe);return}try{var n=D();n&&e?console.warn(B):n||(n=O(e)),n.addEventListener("load",function(){window.Stripe?t(window.Stripe):r(new Error("Stripe.js not available"))}),n.addEventListener("error",function(){r(new Error("Failed to load Stripe.js"))})}catch(o){r(o);return}})),y},F=function(e,t,r){if(e===null)return null;var n=e.apply(void 0,t);return M(n,r),n},L=Promise.resolve().then(function(){return z(null)}),R=!1;L.catch(function(c){R||console.warn(c)});var v=function(){for(var e=arguments.length,t=new Array(e),r=0;r<e;r++)t[r]=arguments[r];R=!0;var n=Date.now();return L.then(function(o){return F(o,t,n)})};var l="https://api.ai-or-not.com";var h=class{constructor(e,t){this.apiUrl=e,this.bearerToken=t}async get(e){let t=`${this.apiUrl}/${e}`;try{let r=await fetch(t,{method:"GET",headers:{"Content-Type":"application/json",Authorization:`Bearer ${this.bearerToken}`}});return await this.handleResponse(r)}catch(r){throw console.error("Error",r),r}}async post(e,t){let r=`${this.apiUrl}/${e}`;try{let n=await fetch(r,{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${this.bearerToken}`},body:JSON.stringify(t)});return await this.handleResponse(n)}catch(n){throw console.error("Request error",n),n.status===429&&n.message.msg.type==="requests"&&alert(`It looks like you have reached your plan limit of ${n.message.msg.current_limit} requests. To continue, please upgrade to a new plan.`),n}}async postBinary(e,t){let r=`${this.apiUrl}/${e}`;try{let n=await fetch(r,{method:"POST",headers:{Accept:"application/json",Authorization:`Bearer ${this.bearerToken}`},body:t});return await this.handleResponse(n)}catch(n){throw console.error("Binary request error:",n),n.status===429&&n.message.msg.type==="requests"&&alert(`It looks like you have reached your plan limit of ${n.message.msg.current_limit} requests. To continue, please upgrade to a new plan.`),n}}async delete(e){let t=`${this.apiUrl}/${e}`;try{let r=await fetch(t,{method:"DELETE",headers:{accept:"*/*",Authorization:`Bearer ${this.bearerToken}`}});await this.handleResponse(r)}catch(r){throw console.error("Error when perform DELETE-request:",r),r}}async patch(e,t){let r=`${this.apiUrl}/${e}`;try{let n=await fetch(r,{method:"PATCH",headers:{"Content-Type":"application/json",Authorization:`Bearer ${this.bearerToken}`},body:JSON.stringify(t)});return await this.handleResponse(n)}catch(n){throw console.error("\u041E\u0448\u0438\u0431\u043A\u0430 \u043F\u0440\u0438 \u0432\u044B\u043F\u043E\u043B\u043D\u0435\u043D\u0438\u0438 PATCH-\u0437\u0430\u043F\u0440\u043E\u0441\u0430:",n),n}}async handleResponse(e){if(!e.ok){let t=await e.json();throw{status:e.status,message:t}}if(e.status!==204)return await e.json()}};var U=`

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
            
            `,f=class{constructor(){this.elements=null;this.stripe=null;this.home_element=document.querySelector("#home");this.PRODUCT_ID_BASE_PLAN={id:"price_1O2Ba4Ba9yG4sk8k4y3ZnEVT",msg:"Base plan: $30/month",name:"Base plan",description:"1,000 requests per month",price:"$30",test_id:"price_1O1wSsBa9yG4sk8kej8shNYs"};this.PRODUCT_ID_PRO_PLAN={id:"price_1O2Ku4Ba9yG4sk8kIQBdzpPj",msg:"Pro plan: $250/month",name:"Pro plan",description:"10,000 requests per month",price:"$250",test_id:"price_1O1wTVBa9yG4sk8kQSPeT9rp"};this.is_test_mode=!1}showBlinkMessage(e,t){let r=document.createElement("style");r.innerHTML=U,document.head.appendChild(r),t.innerHTML=`
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
    `,document.querySelector("#submit").addEventListener("click",()=>{this.completePayment(this.PRODUCT_ID_BASE_PLAN)})}createPaymentForm2(e){var o;let t=document.createElement("link");t.rel="stylesheet",t.href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css",t.type="text/css",document.head.appendChild(t);let r=document.createElement("link");r.rel="stylesheet",r.href="https://fonts.googleapis.com/css?family=Montserrat",document.head.appendChild(r);let n=document.createElement("style");n.innerHTML=U,document.head.appendChild(n),document.querySelector("#home-container").innerHTML=`
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
        `,(o=document.querySelector("#submit"))==null||o.addEventListener("click",()=>{this.completePayment(e)})}async createPaymentIntent(e){fetch(`${l}/aion/payments/config`).then(t=>t.json()).then(t=>{v(t.stripe_public_key).then(r=>{this.stripe=r,this.is_test_mode=t.stripe_public_key.includes("test"),fetch(`${l}/aion/payments/create_intent`,{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${this.checkUserToken()}`},body:JSON.stringify({product_id:this.is_test_mode?e.test_id:e.id})}).then(n=>n.json()).then(n=>{var i;if(n.code===10)throw console.warn(n.message),alert(n.message),window.location.href=`https://${window.location.host}/`,new Error(n.message);this.elements=this.stripe.elements({clientSecret:n.client_secret});let o=this.elements.create("payment");(i=document.querySelector("#progress-loader"))==null||i.classList.add("hide"),document.querySelector("#submit").style.visibility="visible",o.mount("#payment-element")}).catch(n=>{console.error("Something wrong when create a payment intent",n),alert("Something wrong when create a payment. Please try again.")})})})}checkUserToken(){let e=localStorage.getItem("_ms-mid");if(!e)throw new Error("User token not found");return e}async initPaymentForm(e){console.log("Init payment form...");let t=await this.initStripe();if(this.stripe=t,!t)return;let r={theme:"flat",variables:{colorPrimary:"#30313d",colorText:"#30313d"},roles:{".TermsText":{hide:!0}}},n={},o="auto",i=await this.getClientSecret(e),d=t.elements({clientSecret:i,appearance:r,loader:o});this.elements=d;let w=d.create("payment",n).mount("#payment-element")}async getClientSecret(e){return fetch(`${l}/aion/payments/create_intent`,{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${this.checkUserToken()}`},body:JSON.stringify({product_id:this.is_test_mode?e.test_id:e.id})}).then(t=>t.json()).then(t=>{if(t.code===10)throw console.warn(t.message),alert(t.message),window.location.href=`https://${window.location.host}/`,new Error(t.message);return t.client_secret})}initStripe(){return console.log("Init stripe..."),fetch(`${l}/aion/payments/config`).then(e=>e.json()).then(e=>(this.is_test_mode=e.stripe_public_key.includes("test"),v(e.stripe_public_key).then(t=>t))).catch(e=>{console.error("Something wrong when init stripe",e)})}async completePayment(e){console.log("Complete payment...");let t=document.querySelector("#submit");if(t.innerHTML.includes("Payments attempt")){window.location.href=`https://${window.location.host}/#plans`;return}let r=t.innerHTML,n=null,o=null;for(let i=1;i<=5&&(this.showBlinkMessage(`Payments attempt ${i}...`,t),n=await this.stripe.confirmPayment({elements:this.elements,confirmParams:{return_url:`https://${window.location.host}/dashboard/settings`}}).then(d=>d.error?(o=d.error.message,"error"):(console.log(d),"success")),t.innerHTML=r,console.log("result: ",n),!(n==="false"||n==="success"));i++);console.log(n,o),n==="error"&&alert(o)}async cancelSubscription(){fetch(`${l}/aion/payments/cancel_subscription`,{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${this.checkUserToken()}`}}).then(e=>e.json()).catch(e=>{console.error("Something wrong when create a checkout session",e)})}async getSubscriptionInfo(){try{let e=await fetch(`${l}/aion/payments/subscription`,{method:"GET",headers:{"Content-Type":"application/json",Authorization:`Bearer ${this.checkUserToken()}`}});return await this.handleResponse(e)}catch{return null}}async handleResponse(e){if(!e.ok){let t=await e.json();throw{status:e.status,message:t}}if(e.status!==204)return await e.json()}isValidCreditCardNumber(e){if(e=e.replace(/\s/g,"").split("").reverse().join(""),!/^[0-9]{13,19}$/.test(e))return!1;let t=0;for(let r=0;r<e.length;r++){let n=parseInt(e[r]);r%2===1&&(n*=2,n>9&&(n-=9)),t+=n}return t%10===0}};var C=new f,a=class{constructor(){let e=s.getToken(),t=`${l}/aion/users`;this.client=new h(t,e)}static getInstance(){return a.instance||(a.instance=new a),a.instance}static async fetchRequests(e=0,t=10){try{let{client:r}=a.getInstance(),n=`data?filters=requests&offset=${e}&limit=${t}`;return await r.get(n).then(o=>o.requests.array)}catch(r){return console.error("getRequests:",r),[]}}static async fetchUsageApi(){try{let{client:e}=a.getInstance(),t="data?filters=all&offset=0&limit=1";return await e.get(t).then(r=>r.api)}catch(e){return console.error("fetchUsageApi:",e),[]}}static async signUp(){try{let{client:e}=a.getInstance();return await e.post("sign_up",{}).then(()=>!1).catch(t=>{throw t})}catch(e){throw console.error("signUp:",e),e}}static async login(){try{let{client:e}=a.getInstance();return await e.get("login")}catch(e){console.error("login:",e)}}static async delete(){try{let{client:e}=a.getInstance();return s.removeAuth(),await e.delete("")}catch(e){console.error("delete:",e)}}static async fetchApiToken(){try{let{client:e}=a.getInstance();return await e.post("api_token",{})}catch(e){console.error("fetchApiToken:",e),console.error("fetchApiToken:",e)}}static async refreshApiToken(){try{let{client:e}=a.getInstance();return await e.patch("api_token",{})}catch(e){console.error("refreshApiToken:",e)}}static async fetchSubscriptionData(){let{client:e}=a.getInstance();try{let t="data?filters=all&offset=0&limit=1";return await e.get(t).then(r=>r)}catch(t){console.error("fetchSubscriptionData:",t)}}static async subscriptionInfo(){var d,w,P,x,S,T,$,I,A;let e=document.querySelector("#plan-info"),t=document.querySelector("#usage-info"),r=document.querySelector("#btn-cancel-plan");e.classList.add("hide"),t.classList.add("hide"),r.classList.add("hide");let n=[a.fetchSubscriptionData(),C.getSubscriptionInfo()],[o,i]=await Promise.all(n);o!=null&&o.plan||(e.innerHTML=`You're on the <span class="text-color-green">Free</span> plan. You have limits of 20 & 100 checks per month via web & API, respectively. If you need more, check out our <a class="text-color-green" href='https://${window.location.host}/#plans' >plans</a>.`,t.innerHTML=`You have used ${(((d=o==null?void 0:o.requests)==null?void 0:d.total)||0)-(((P=(w=o==null?void 0:o.api)==null?void 0:w.usage)==null?void 0:P.daily)||0)} of 20 checks via web and ${((S=(x=o==null?void 0:o.api)==null?void 0:x.usage)==null?void 0:S.daily)||0} of 100 checks via API.`,e.classList.remove("hide"),t.classList.remove("hide")),(o==null?void 0:o.plan.requests_limits.quantity)===1e3&&(e.innerHTML=`You're on the <span class="text-color-green">Base</span> plan. You have limits of 1000 requests for both web & API.`,t.innerHTML=`You have used ${((T=o==null?void 0:o.requests)==null?void 0:T.total)||0} of 1000 checks via both web API.`,($=i==null?void 0:i.subscription.meta)!=null&&$.was_canceled?(r.classList.add("hide"),t.innerHTML=t.innerHTML+` Your subscription has been canceled, expires on ${new Date(i==null?void 0:i.subscription.expiration_dt).toLocaleDateString()}.`):r.classList.remove("hide"),e.classList.remove("hide"),t.classList.remove("hide")),(o==null?void 0:o.plan.requests_limits.quantity)===1e4&&(e.innerHTML=`You're on the <span class="text-color-green">PRO</span> plan. You have limits of 10000 requests for both web & API.`,t.innerHTML=`You have used ${((I=o==null?void 0:o.requests)==null?void 0:I.total)||0} of 10000 checks via both web & API.`,i!=null&&i.subscription.meta.was_canceled?(r.classList.add("hide"),t.innerHTML=t.innerHTML+` Your subscription has been canceled, expires on ${new Date(i==null?void 0:i.subscription.expiration_dt).toLocaleDateString()}.`):r.classList.remove("hide"),e.classList.remove("hide"),t.classList.remove("hide")),(o==null?void 0:o.plan.requests_limits.quantity)>1e4&&(e.innerHTML=`You're on the <span class="text-color-green">Custom</span> plan. You have limits of ${o==null?void 0:o.plan.requests_limits.quantity} requests for both web & API.`,t.innerHTML=`You have used ${((A=o==null?void 0:o.requests)==null?void 0:A.total)||0} of 10000 checks via both web & API.`,r.innerHTML="Contact US  to update your plan.",r.classList.remove("hide"),e.classList.remove("hide"),t.classList.remove("hide")),r.addEventListener("click",async()=>{(o==null?void 0:o.plan.requests_limits.quantity)>1e4?window.location.href=`https://${window.location.host}/contact-us`:confirm("Are you sure you want to cancel your subscription?")?(alert("Your subscription has been canceled."),C.cancelSubscription().then(j=>{console.log(j)}),window.location.href=`https://${window.location.host}/#plans`):alert("Your subscription has not been canceled.")})}},m=a;m.instance=null;var u=class{constructor(){}static isAuth(){return localStorage.getItem(u.token_key)!==null}static setAuth(){localStorage.setItem(u.key,"true")}static removeAuth(){localStorage.removeItem(u.key)}static async init(){if(localStorage.getItem("_aion_in")===null)try{await m.signUp(),u.setAuth(),await m.login(),localStorage.setItem("_aion_in","true")}catch(e){console.log(e)}}static getToken(){var e;return(e=localStorage.getItem("_ms-mid"))!=null?e:""}static isExpiredToken(){let e=u.getToken();if((e==null?void 0:e.length)>0){let t=_(e),r=Date.now()/1e3;return t.exp<r}return!0}static checkAuth(e){if(!u.isAuth()){let t=document.getElementById("sign-up");return t.style.display="flex",t.style.zIndex=100,e(),!0}return!1}},s=u;s.key="isSignUp",s.token_key="_ms-mid";var p=class{constructor(){let e=s.getToken(),t=`${l}/aion/ai-generated`;this.client=new h(t,e)}static getInstance(){return p.instance||(p.instance=new p),p.instance}static async getReportsByBinary(e){let{client:t}=p.getInstance();try{let r=new FormData;return r.append("binary",e,"uploaded-file.png"),await t.postBinary("reports/binary",r)}catch(r){r.status===402&&alert("Please verify your email to continue using the service"),r.status===429&&(alert(`It looks like you have reached your plan limit of ${r.message.msg.current_limit} requests. To continue, please upgrade to a new plan.`),window.location.href=`https://${window.location.host}/#plans`),console.error("Error getReportsByBinary:",r)}}static async getReportsByUrl(e){let{client:t}=p.getInstance();try{let r=`reports/url?url=${e}`;return await t.post(r,{})}catch(r){r.status===402&&alert("Please verify your email to continue using the service"),r.status===429&&(alert(`It looks like you have reached your plan limit of ${r.message.msg.current_limit} requests. To continue, please upgrade to a new plan.`),window.location.href=`https://${window.location.host}/#plans`),console.error("getReportsByUrl:",r)}}static async getAudioVerdict(e){let{client:t}=p.getInstance();try{let r=new FormData;return r.append("file",e),await t.postBinary("reports/audio/binary",r)}catch(r){r.status===402&&alert("Please verify your email to continue using the service"),r.status===429&&(alert(`It looks like you have reached your plan limit of ${r.message.msg.current_limit} requests. To continue, please upgrade to a new plan.`),window.location.href=`https://${window.location.host}/#plans`),console.error("Error getAudioVerdict:",r)}}static async getYoutubeVerdict(e){let{client:t}=p.getInstance();try{let r={url:e};return await t.post("reports/audio/link",r)}catch(r){r.status===402&&alert("Please verify your email to continue using the service"),r.status===429&&(alert(`It looks like you have reached your plan limit of ${r.message.msg.current_limit} requests. To continue, please upgrade to a new plan.`),window.location.href=`https://${window.location.host}/#plans`),console.error("Error getYoutubeVerdict:",r)}}static async getPdetReportByUrl(e){let{client:t}=p.getInstance();try{let r={object:e};return await t.post("reports/person_detection/url",r)}catch(r){r.status===402&&alert("Please verify your email to continue using the service"),r.status===429&&(alert(`It looks like you have reached your plan limit of ${r.message.msg.current_limit} requests. To continue, please upgrade to a new plan.`),window.location.href=`https://${window.location.host}/#plans`),console.error("Error getYoutubeVerdict:",r)}}static async getPdetReportByBinary(e){let{client:t}=p.getInstance();try{let r=new FormData;return r.append("file",e,"uploaded-file.png"),await t.postBinary("reports/person_detection/binary",r)}catch(r){r.status===402&&alert("Please verify your email to continue using the service"),r.status===429&&(alert(`It looks like you have reached your plan limit of ${r.message.msg.current_limit} requests. To continue, please upgrade to a new plan.`),window.location.href=`https://${window.location.host}/#plans`),console.error("Error getReportsByBinary:",r)}}},g=p;g.instance=null;var b=class{constructor(){}static isLimitExceeded(){return!!s.isExpiredToken()}static increment(){let e=localStorage.getItem(b.key),t=e===null?1:Number(e)+1;localStorage.setItem(b.key,t.toString())}},k=b;k.key="requestCount";document.getElementById("delete-account").onclick=async()=>{await s.init(),await m.delete(),localStorage.removeItem("_aion_in"),window.location.href=`https://${window.location.host}/`};document.getElementById("sign-out").onclick=()=>{s.removeAuth(),localStorage.removeItem("_aion_in")};s.init();m.subscriptionInfo().then(c=>{});})();
