"use strict";(()=>{var Be=Object.create;var ge=Object.defineProperty;var Ae=Object.getOwnPropertyDescriptor;var Me=Object.getOwnPropertyNames;var He=Object.getPrototypeOf,$e=Object.prototype.hasOwnProperty;var Ve=(i=>typeof require!="undefined"?require:typeof Proxy!="undefined"?new Proxy(i,{get:(e,t)=>(typeof require!="undefined"?require:e)[t]}):i)(function(i){if(typeof require!="undefined")return require.apply(this,arguments);throw new Error('Dynamic require of "'+i+'" is not supported')});var Re=(i,e,t,s)=>{if(e&&typeof e=="object"||typeof e=="function")for(let n of Me(e))!$e.call(i,n)&&n!==t&&ge(i,n,{get:()=>e[n],enumerable:!(s=Ae(e,n))||s.enumerable});return i};var Ue=(i,e,t)=>(t=i!=null?Be(He(i)):{},Re(e||!i||!i.__esModule?ge(t,"default",{value:i,enumerable:!0}):t,i));var j,ze=import("https://openfpcdn.io/fingerprintjs/v3").then(i=>i.load()),K=async()=>{j=await ze.then(i=>i.get()).then(i=>i.visitorId)};function fe(i){var e=i.split(".")[1],t=e.replace(/-/g,"+").replace(/_/g,"/"),s=decodeURIComponent(atob(t).split("").map(function(n){return"%"+("00"+n.charCodeAt(0).toString(16)).slice(-2)}).join(""));return JSON.parse(s)}var we="https://js.stripe.com/v3",De=/^https:\/\/js\.stripe\.com\/v3\/?(\?.*)?$/,ve="loadStripe.setLoadParameters was called but an existing Stripe.js script already exists in the document; existing script parameters will be used",je=function(){for(var e=document.querySelectorAll('script[src^="'.concat(we,'"]')),t=0;t<e.length;t++){var s=e[t];if(De.test(s.src))return s}return null},Fe=function(e){var t=e&&!e.advancedFraudSignals?"?advancedFraudSignals=false":"",s=document.createElement("script");s.src="".concat(we).concat(t);var n=document.head||document.body;if(!n)throw new Error("Expected document.body not to be null. Stripe.js requires a <body> element.");return n.appendChild(s),s},Ye=function(e,t){!e||!e._registerWrapper||e._registerWrapper({name:"stripe-js",version:"2.1.7",startTime:t})},F=null,Oe=function(e){return F!==null||(F=new Promise(function(t,s){if(typeof window=="undefined"||typeof document=="undefined"){t(null);return}if(window.Stripe&&e&&console.warn(ve),window.Stripe){t(window.Stripe);return}try{var n=je();n&&e?console.warn(ve):n||(n=Fe(e)),n.addEventListener("load",function(){window.Stripe?t(window.Stripe):s(new Error("Stripe.js not available"))}),n.addEventListener("error",function(){s(new Error("Failed to load Stripe.js"))})}catch(r){s(r);return}})),F},Ze=function(e,t,s){if(e===null)return null;var n=e.apply(void 0,t);return Ye(n,s),n},Ee=Promise.resolve().then(function(){return Oe(null)}),Le=!1;Ee.catch(function(i){Le||console.warn(i)});var Se=function(){for(var e=arguments.length,t=new Array(e),s=0;s<e;s++)t[s]=arguments[s];Le=!0;var n=Date.now();return Ee.then(function(r){return Ze(r,t,n)})};var d="https://api.ai-or-not.com",Y="https://results.aiornot.com",$=class{constructor(e,t){this.apiUrl=e,this.bearerToken=t}async get(e){let t=`${this.apiUrl}/${e}`;try{let s=await fetch(t,{method:"GET",headers:{"Content-Type":"application/json",Authorization:`Bearer ${this.bearerToken}`}});return await this.handleResponse(s)}catch(s){throw s.status===429&&s.message.msg.type==="requests"&&alert(`It looks like you have reached your plan limit of ${s.message.msg.current_limit} requests. To continue, please upgrade to a new plan.`),console.error("Error",s),s}}async post(e,t){let s=`${this.apiUrl}/${e}`;try{let n=await fetch(s,{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${this.bearerToken}`},body:JSON.stringify(t)});return await this.handleResponse(n)}catch(n){throw console.error("Request error",n),n.status===429&&n.message.msg.type==="requests"&&alert(`It looks like you have reached your plan limit of ${n.message.msg.current_limit} requests. To continue, please upgrade to a new plan.`),n}}async postBinary(e,t){let s=`${this.apiUrl}/${e}`;console.log("url",s);try{let n=await fetch(s,{method:"POST",headers:{Accept:"application/json",Authorization:`Bearer ${this.bearerToken}`},body:t});return await this.handleResponse(n)}catch(n){throw console.error("Binary request error:",n),n.status===429&&n.message.msg.type==="requests"&&alert(`It looks like you have reached your plan limit of ${n.message.msg.current_limit} requests. To continue, please upgrade to a new plan.`),n}}async delete(e){let t=`${this.apiUrl}/${e}`;try{let s=await fetch(t,{method:"DELETE",headers:{accept:"*/*",Authorization:`Bearer ${this.bearerToken}`}});await this.handleResponse(s)}catch(s){throw console.error("\u041E\u0448\u0438\u0431\u043A\u0430 \u043F\u0440\u0438 \u0432\u044B\u043F\u043E\u043B\u043D\u0435\u043D\u0438\u0438 DELETE-\u0437\u0430\u043F\u0440\u043E\u0441\u0430:",s),s}}async patch(e,t){let s=`${this.apiUrl}/${e}`;try{let n=await fetch(s,{method:"PATCH",headers:{"Content-Type":"application/json",Authorization:`Bearer ${this.bearerToken}`},body:JSON.stringify(t)});return await this.handleResponse(n)}catch(n){throw console.error("\u041E\u0448\u0438\u0431\u043A\u0430 \u043F\u0440\u0438 \u0432\u044B\u043F\u043E\u043B\u043D\u0435\u043D\u0438\u0438 PATCH-\u0437\u0430\u043F\u0440\u043E\u0441\u0430:",n),n}}async handleResponse(e){if(!e.ok){let t=await e.json();throw{status:e.status,message:t}}if(e.status!==204)return await e.json()}};var V=class{constructor(){this.elements=null;this.stripe=null;this.home_element=document.querySelector("#home");this.PRODUCT_ID_BASE_PLAN={id:"price_1O2Ba4Ba9yG4sk8k4y3ZnEVT",msg:"Base plan: $30/month",test_id:"price_1O1wSsBa9yG4sk8kej8shNYs"};this.PRODUCT_ID_PRO_PLAN={id:"price_1O2Ku4Ba9yG4sk8kIQBdzpPj",msg:"Pro plan: $250/month",test_id:"price_1O1wTVBa9yG4sk8kQSPeT9rp"};this.is_test_mode=!1}createPaymentForm(e){this.home_element.innerHTML=`



        <div style="background: white; position: fixed; top: 0; left: 0; right: 0; bottom: 0; display: flex; flex-direction: column; justify-content: center; align-items: center">
            <div style="width: 100%; display: flex; justify-content: center; align-items: center">
                <h2 style="color: black; font-size: 2.5rem; justify-content: center">AI or Not</h2>
                <br>
                <br>
                <br>
            </div>
           <div class="payment-container">
           <div class="sr-root" style="display: flex; flex-direction: row; align-items: center; justify-content: center; min-width: 380px">
            <div class="sr-main">
                <h2 style="color: black; font-size: 2.5rem; justify-content: center">${e}</h2>
                <br>
<!--                <div>-->
<!--                    <div class="loader" style="border: 16px solid #f3f3f3; border-top: 16px solid #adff00; border-bottom: 16px solid #adff00; border-radius: 50%;width: 120px;height: 120px;animation: spin 2s linear infinite;"></div>-->
<!--                </div>-->
                <form id="payment-form" style="min-width: 380px">
                    <div id="payment-element"></div>
                    <br>
                    // Add callback function
<!--                    <button class="button" style="width: 100%;" id="submit">-->
<!--                        <span style="width: 100 %;" id="button-text">Pay</span>-->
<!--                    </button>-->
                    
                </form>
                
                    <button class="button" style="width: 100%; visibility: hidden" id="submit">
                        <span style="width: 100 %;" id="button-text">Pay</span>
                    </button>
                    
                
            </div>
        </div>
        </div>
            <div id="progress-loader" class="loader" style="border: 16px solid #f3f3f3; border-top: 16px solid #adff00; border-bottom: 16px solid #adff00; border-radius: 50%;width: 120px;height: 120px;animation: spin 2s linear infinite;"></div>
        </div>
    `,document.querySelector("#submit").addEventListener("click",()=>{console.log("test"),this.completePayment()})}async createPaymentIntent(e){fetch(`${d}/aion/payments/config`).then(t=>t.json()).then(t=>{Se(t.stripe_public_key).then(s=>{this.stripe=s,this.is_test_mode=t.stripe_public_key.includes("test"),fetch(`${d}/aion/payments/create_intent`,{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${this.checkUserToken()}`},body:JSON.stringify({product_id:this.is_test_mode?e.test_id:e.id})}).then(n=>n.json()).then(n=>{var a;if(n.code===10)throw console.warn(n.message),alert(n.message),window.location.href=`https://${window.location.host}/`,new Error(n.message);this.elements=this.stripe.elements({clientSecret:n.client_secret});let r=this.elements.create("payment");(a=document.querySelector("#progress-loader"))==null||a.classList.add("hide"),document.querySelector("#submit").style.visibility="visible",r.mount("#payment-element")}).catch(n=>{console.error("Something wrong when create a payment intent",n),alert("Something wrong when create a payment. Please try again.")})})})}checkUserToken(){let e=localStorage.getItem("_ms-mid");if(!e)throw new Error("User token not found");return e}completePayment(){var e,t;console.log("completePayment"),console.log(this.elements),(e=document.querySelector("#progress-loader"))==null||e.classList.remove("hide"),document.querySelector("#submit").style.visibility="hidden",(t=document.querySelector("#payment-element"))==null||t.classList.add("hide"),this.stripe.confirmPayment({elements:this.elements,confirmParams:{return_url:`https://${window.location.host}/dashboard/history`}}).then(s=>{s.error?(console.error(s.error.message),alert(s.error.message)):console.log(s)})}async cancelSubscription(){fetch(`${d}/aion/payments/cancel_subscription`,{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${this.checkUserToken()}`}}).then(e=>e.json()).catch(e=>{console.error("Something wrong when create a checkout session",e)})}async getSubscriptionInfo(){try{let e=await fetch(`${d}/aion/payments/subscription`,{method:"GET",headers:{"Content-Type":"application/json",Authorization:`Bearer ${this.checkUserToken()}`}});return await this.handleResponse(e)}catch{return null}}async handleResponse(e){if(!e.ok){let t=await e.json();throw{status:e.status,message:t}}if(e.status!==204)return await e.json()}};var be=new V,p=class{constructor(){let e=l.getToken(),t=`${d}/aion/users`;this.client=new $(t,e)}static getInstance(){return p.instance||(p.instance=new p),p.instance}static async fetchRequests(e=0,t=10){try{let{client:s}=p.getInstance(),n=`data?filters=requests&offset=${e}&limit=${t}`;return await s.get(n).then(r=>r.requests.array)}catch(s){return console.error("getRequests:",s),[]}}static async fetchUsageApi(){try{let{client:e}=p.getInstance(),t="data?filters=all&offset=0&limit=1";return await e.get(t).then(s=>s.api)}catch(e){return console.error("fetchUsageApi:",e),[]}}static async signUp(){try{let{client:e}=p.getInstance();return await e.post("sign_up",{}).then(()=>!1).catch(t=>{if(t.status===400)return!0;throw t})}catch(e){return console.error("signUp:",e),!1}}static async login(){try{let{client:e}=p.getInstance();return await e.get("login")}catch(e){console.error("login:",e)}}static async delete(){try{let{client:e}=p.getInstance();return await e.delete("")}catch(e){console.error("delete:",e)}}static async fetchApiToken(){try{let{client:e}=p.getInstance();return await e.post("api_token",{})}catch(e){console.error("fetchApiToken:",e),console.error("fetchApiToken:",e)}}static async refreshApiToken(){try{let{client:e}=p.getInstance();return await e.patch("api_token",{})}catch(e){console.error("refreshApiToken:",e)}}static async fetchSubscriptionData(){let{client:e}=p.getInstance();try{let t="data?filters=all&offset=0&limit=1";return await e.get(t).then(s=>s)}catch(t){console.error("fetchSubscriptionData:",t)}}static async subscriptionInfo(){var g,f,x,P,m,E,q,I,B,k,A,R,y;let e=document.querySelector("#plan-info"),t=document.querySelector("#usage-info"),s=document.querySelector("#btn-cancel-plan");e.classList.add("hide"),t.classList.add("hide"),s.classList.add("hide");let n=[p.fetchSubscriptionData(),be.getSubscriptionInfo()],[r,a]=await Promise.all(n);console.log(r),console.log(a),r!=null&&r.plan||(e.innerHTML=`You're on the <span class="text-color-green">Free</span> plan. You have limits of 20 & 100 checks per month via web & API, respectively. If you need more, check out our <a class="text-color-green" href='https://${window.location.host}/#plans' >plans</a>.`,t.innerHTML=`You have used ${((g=r==null?void 0:r.requests)==null?void 0:g.total)||0} of 20 checks via web and ${((x=(f=r==null?void 0:r.api)==null?void 0:f.usage)==null?void 0:x.daily)||0} of 100 checks via API.`,e.classList.remove("hide"),t.classList.remove("hide")),(r==null?void 0:r.plan.requests_limits.quantity)===1e3&&(e.innerHTML=`You're on the <span class="text-color-green">Base</span> plan. You have limits of 1000 requests for both web & API.`,t.innerHTML=`You have used ${(((P=r==null?void 0:r.requests)==null?void 0:P.total)||0)+(((E=(m=r==null?void 0:r.api)==null?void 0:m.usage)==null?void 0:E.daily)||0)} of 1000 checks via both web API.`,(q=a==null?void 0:a.subscription.meta)!=null&&q.was_canceled?(s.classList.add("hide"),t.innerHTML=t.innerHTML+` Your subscription has been canceled, expires on ${new Date(a==null?void 0:a.subscription.expiration_dt).toLocaleDateString()}.`):s.classList.remove("hide"),e.classList.remove("hide"),t.classList.remove("hide")),(r==null?void 0:r.plan.requests_limits.quantity)===1e4&&(e.innerHTML=`You're on the <span class="text-color-green">PRO</span> plan. You have limits of 10000 requests for both web & API.`,t.innerHTML=`You have used ${(((I=r==null?void 0:r.requests)==null?void 0:I.total)||0)+(((k=(B=r==null?void 0:r.api)==null?void 0:B.usage)==null?void 0:k.daily)||0)} of 10000 checks via both web & API.`,a!=null&&a.subscription.meta.was_canceled?(s.classList.add("hide"),t.innerHTML=t.innerHTML+` Your subscription has been canceled, expires on ${new Date(a==null?void 0:a.subscription.expiration_dt).toLocaleDateString()}.`):s.classList.remove("hide"),e.classList.remove("hide"),t.classList.remove("hide")),(r==null?void 0:r.plan.requests_limits.quantity)>1e4&&(e.innerHTML=`You're on the <span class="text-color-green">Custom</span> plan. You have limits of ${r==null?void 0:r.plan.requests_limits.quantity} requests for both web & API.`,t.innerHTML=`You have used ${(((A=r==null?void 0:r.requests)==null?void 0:A.total)||0)+(((y=(R=r==null?void 0:r.api)==null?void 0:R.usage)==null?void 0:y.daily)||0)} of 10000 checks via both web & API.`,s.innerHTML="Contact US  to update your plan.",s.classList.remove("hide"),e.classList.remove("hide"),t.classList.remove("hide")),s.addEventListener("click",async()=>{(r==null?void 0:r.plan.requests_limits.quantity)>1e4?window.location.href=`https://${window.location.host}/contact-us`:confirm("Are you sure you want to cancel your subscription?")?(alert("Your subscription has been canceled."),be.cancelSubscription().then(U=>{console.log(U)}),window.location.href=`https://${window.location.host}/#plans`):alert("Your subscription has not been canceled.")})}},h=p;h.instance=null;var v=class{constructor(){}static isAuth(){return localStorage.getItem(v.token_key)!==null}static setAuth(){localStorage.setItem(v.key,"true")}static removeAuth(){localStorage.removeItem(v.key)}static async init(){v.isAuth()?(await h.signUp(),v.setAuth(),await h.login()):(await h.signUp(),v.setAuth(),await h.login())}static getToken(){var e;return(e=localStorage.getItem("_ms-mid"))!=null?e:""}static isExpiredToken(){let e=v.getToken();if((e==null?void 0:e.length)>0){let t=fe(e),s=Date.now()/1e3;return t.exp<s}return!0}static checkAuth(e){if(!v.isAuth()){let t=document.getElementById("sign-up");return t.style.display="flex",t.style.zIndex=100,e(),!0}return!1}},l=v;l.key="isSignUp",l.token_key="_ms-mid";var w=class{constructor(){let e=l.getToken(),t=`${d}/aion/ai-generated`;this.client=new $(t,e)}static getInstance(){return w.instance||(w.instance=new w),w.instance}static async getReportsByBinary(e){let{client:t}=w.getInstance();try{let s=new FormData;return s.append("binary",e,"uploaded-file.png"),await t.postBinary("reports/binary",s)}catch(s){s.status===402&&alert("Please verify your email to continue using the service"),s.status===429&&(alert(`You have reached the limit of requests per day. Alert: ${JSON.stringify(s.message)}`),window.location.href=`https://${window.location.host}/#plans`),console.error("Error getReportsByBinary:",s)}}static async getReportsByUrl(e){let{client:t}=w.getInstance();try{let s=`reports/url?url=${e}`;return await t.post(s,{})}catch(s){s.status===402&&alert("Please verify your email to continue using the service"),console.error("getReportsByUrl:",s)}}static async getAudioVerdict(e){console.log("getAudioVerdict");let{client:t}=w.getInstance();try{let s=new FormData;return s.append("file",e),await t.postBinary("reports/audio/binary",s)}catch(s){s.status===402&&alert("Please verify your email to continue using the service"),console.error("Error getAudioVerdict:",s)}}static async getYoutubeVerdict(e){let{client:t}=w.getInstance();try{let s={url:e};return await t.post("reports/audio/link",s)}catch(s){s.status===402&&alert("Please verify your email to continue using the service"),console.error("Error getYoutubeVerdict:",s)}}},T=w;T.instance=null;var _=class{constructor(){}static async getReportsByBinary(e,t){let s=`${d}/results/api/detector/reports/raw?source=web&user_id=${t}`,n=new FormData;n.append("binary",e,"file_name.png");let r={method:"POST",headers:{Accept:"application/json",Authorization:`Bearer ${l.getToken()}`},body:n};return await fetch(s,r).then(a=>a.json())}static async getReportsByUrl(e,t){let s=`${d}/results/api/detector/reports/json?source=web&user_id=${t}`,n={method:"POST",headers:{Accept:"application/json","Content-Type":"application/json",Authorization:`Bearer ${l.getToken()}`},body:JSON.stringify({object:e})};return await fetch(s,n).then(r=>r.json())}static async sendFeedback(e,t,s,n=!1){let r={is_proper_predict:t,comment:s},a=`${d}/results/api/detector/reports/result/${e}`,g={method:"PUT",body:JSON.stringify(r),headers:{Accept:"application/json","Content-Type":"application/json"}};(n||!l.isExpiredToken())&&(a=`${d}/aion/ai-generated/reports/${e}`,g={method:"PATCH",body:JSON.stringify(r),headers:{Accept:"application/json","Content-Type":"application/json"}}),await fetch(a,g).then(f=>f.json()).then(f=>console.log(f)).catch(f=>console.error(f))}static async getAudioVerdict(e){let t=`${d}/aion/ai-generated/reports/audio/binary`,s=new FormData;return s.append("file",e),await fetch(t,{method:"POST",headers:{Accept:"application/json",ContentType:"multipart/form-data"},body:s}).then(r=>r.json())}static async getYoutubeVerdict(e){let t=`${d}/aion/ai-generated/reports/audio/link`,s={method:"POST",headers:{Accept:"application/json","Content-Type":"application/json"},body:JSON.stringify({url:e})};return await fetch(t,s).then(n=>n.json())}};var O=class{constructor(){}static isLimitExceeded(){return!!l.isExpiredToken()}static increment(){let e=localStorage.getItem(O.key),t=e===null?1:Number(e)+1;localStorage.setItem(O.key,t.toString())}},b=O;b.key="requestCount";var C=class{static async getReportsByBinary(e,t){return l.isExpiredToken()?await _.getReportsByBinary(e,t):await T.getReportsByBinary(e)}static async getReportsByUrl(e,t){return l.isExpiredToken()?await _.getReportsByUrl(e,t):await T.getReportsByUrl(e)}static async getAudioVerictByFile(e){return await T.getAudioVerdict(e)}static async getAudioVerictMock(e){let s=await((n,r)=>new Promise(a=>{setTimeout(()=>{a(r)},n)}))(1500,e);return JSON.parse(`{
            "id": "41994fdd-0161-43a9-b873-581eccbe6d72",
            "report": {
                "version": "0.0.0",
                "verdict": ${s}
            }
        }`)}static async getYoutubeVerict(e){return l.isExpiredToken()?await _.getYoutubeVerdict(e):await T.getYoutubeVerdict(e)}static async sendFeedback(e,t,s,n=!1){return await _.sendFeedback(e,t,s,n)}};var X=document.querySelector("#contact-us-submit-button"),Ne=document.querySelector("#name"),We=document.querySelector("#E-Mail"),Ge=document.querySelector("#Note"),Je=document.querySelector("#Company");X&&(X.classList.remove("is-disabled"),X.addEventListener("click",async i=>{i.preventDefault();let e={name:Ne.value,email:We.value,note:Ge.value,company:Je.value};for(let t in e)if(t!=="company"&&e[t]===""){alert(`Please fill in all required fields ${t}`);return}console.log(e),fetch(`${d}/aion/system/post_message`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(e)}).then(t=>{t.ok?(alert("Thank you for your application! We will contact you shortly."),window.location.href="https://aiornot.com/"):alert("Something went wrong. Please try again.")})}));var Ce=()=>{let i=document.querySelector("#bt-pay-free"),e=document.querySelector("#bt-pay-basic"),t=document.querySelector("#bt-pay-pro"),s=document.querySelector("#bt-pay-enterprice"),n=new V;i==null||i.addEventListener("click",()=>{localStorage.getItem("_ms-mid")?window.location.href=`https://${window.location.host}/`:window.location.href=`https://${window.location.host}/signup`}),e==null||e.addEventListener("click",()=>{n.createPaymentForm(n.PRODUCT_ID_BASE_PLAN.msg),h.fetchSubscriptionData().then(r=>{r.plan?(window.location.href=`https://${window.location.host}/`,alert("You already have a subscription !!!")):n.createPaymentIntent(n.PRODUCT_ID_BASE_PLAN)})}),t==null||t.addEventListener("click",()=>{n.createPaymentForm(n.PRODUCT_ID_PRO_PLAN.msg),h.fetchSubscriptionData().then(r=>{r.plan?(window.location.href=`https://${window.location.host}/`,alert("You already have a subscription !!!")):n.createPaymentIntent(n.PRODUCT_ID_PRO_PLAN)})}),s==null||s.addEventListener("click",()=>{window.location.href=`https://${window.location.host}/contact-us`})};var xe=()=>{var he,ye;let i=document.getElementById("image-tab"),e=document.getElementById("audio-tab"),t=document.getElementById("report-screen"),s=document.querySelector("#button-report-submit"),n=document.querySelector("#input-report-comment"),r=document.querySelector("#button-report_true"),a=document.querySelector("#button-report_false"),g=document.querySelector("#button-report_close"),f=document.querySelectorAll(".test-image"),x=document.querySelector("#url-error-message"),P=document.querySelector("#processing_cancel"),m=document.querySelector("#image-file-input"),E=document.querySelector("#ai-or-not-current-image"),q=document.querySelector("#empty-preview-img"),I=document.querySelector("#nsfw-preview-img"),B=document.querySelector("#input-error-text"),k=document.querySelector("#ai-or-not_image-url"),A=document.querySelector("#image-url-aion-submit"),R=document.querySelector("#ai-or-not_dropzone"),y=document.querySelector("#ai-or-not_dropzone-text"),U=document.querySelector("#result-screen_col"),Q=document.querySelector("#share-items-hide"),Ke=document.querySelector("#ai-or-not-dropzone-counter"),Xe=document.querySelector("#ai-or-not-dropzone-counter-w");document.querySelector("#w-node-_80502d56-29f7-2965-16f1-d6c6c4ebbd86-c4ebbd86").classList.add("hide"),Q.classList.add("hide");function ee(){return i.classList.contains("w--current")?"image":"audio"}let z,te,M,Z;K();let Te=()=>{let o=document.querySelector("#button-report_false-text");o.classList.remove("hide"),o.textContent=o.getAttribute("report-button-text-default_reported"),a.classList.add("is-reported"),r.classList.add("hide")},qe=()=>{let o=document.querySelector("#button-report_true-text");o.classList.remove("hide"),o.textContent=o.getAttribute("report-button-text-default_reported"),r.classList.add("is-reported"),a.classList.add("hide")},ke=()=>{n.value="";let o=document.querySelector("#button-report_true-text"),c=document.querySelector("#button-report_false-text");c.classList.add("hide"),o.classList.remove("hide"),o.textContent=o.getAttribute("report-button-text-default"),c.textContent=c.getAttribute("report-button-text-default"),r.classList.remove("is-reported"),a.classList.remove("is-reported"),r.classList.remove("hide"),a.classList.remove("hide")},se=o=>{Z=o;let c=document.querySelector('[fs-socialshare-element="url"]'),u=`${l.isExpiredToken()?`${Y}/aiornot/`:`${Y}/aiornot/users/`}${o}`;c.textContent=u,document.querySelectorAll(".result-screen_share-item").forEach(J=>{J.setAttribute("data-url",u)})},ne=()=>{y.textContent="We support jpeg, png, webp, gif, tiff, bmp. 10 Mb of maximum size.",y.classList.remove("text-color-red"),B.textContent="Something went wrong. Try again.",x.classList.add("hide")},re=()=>{x.classList.remove("hide")},_e=()=>{x.classList.add("hide")},D=()=>{U.classList.contains("hide")?(y.textContent="File is too large (max 10 MB)",y.classList.add("text-color-red")):(B.textContent="File is too large (max 10 MB)",x.classList.remove("hide"))};m==null||m.addEventListener("change",()=>{let o=m==null?void 0:m.files[0].size,c=10*1024*1024;o>c?(M=!1,D()):(M=!0,ne())});let Pe=()=>{document.querySelector("#processing-screen").classList.add("hide"),y.classList.add("error"),R.classList.add("red-border"),y.textContent="Something went wrong. Try again."},oe=()=>{y.classList.remove("error"),R.classList.remove("red-border"),y.textContent="We support jpeg, png, webp, gif, tiff, bmp. 10 Mb of maximum size."},H=()=>{document.querySelector("#choose-file-row").classList.add("hide"),document.querySelector("#legal-tip").classList.remove("hide"),document.querySelector("#processing-screen").classList.add("hide"),document.querySelector("#hero-home_title-description").classList.remove("hide"),document.querySelector("#hero-home_gallery").classList.remove("hide"),document.querySelector("#ai-or-not_dropzone").classList.remove("hide"),document.querySelector("#hero-home_drop-zone-divider").classList.remove("hide"),document.querySelector("#result-screen_col").classList.add("hide"),document.querySelector("#result-screen_image-wrapper").classList.add("hide"),E.classList.add("hide"),q.classList.remove("hide"),I.classList.remove("hide")},ie=()=>{ke(),E.src="",_e(),B.textContent="Something went wrong. Try again.",document.querySelector("#choose-file-row").classList.remove("hide"),document.querySelector("#legal-tip").classList.add("hide"),document.querySelector(".processing-screen_triggers_5").click(),document.querySelector("#processing-screen").classList.remove("hide"),document.querySelector(".processing-screen_triggers_1").click(),document.querySelector("#hero-home_title-description").classList.add("hide"),document.querySelector("#hero-home_gallery").classList.add("hide"),document.querySelector("#ai-or-not_dropzone").classList.add("hide"),document.querySelector("#hero-home_drop-zone-divider").classList.add("hide"),document.querySelector("#result-screen_col").classList.remove("hide"),document.querySelector("#result-screen_image-wrapper").classList.remove("hide")};function ae(o=!1){o?(I.classList.remove("hide"),E.classList.add("hide"),q.classList.add("hide"),Q.classList.add("hide")):(I.classList.add("hide"),E.classList.remove("hide"),q.classList.add("hide")),document.querySelector(".processing-screen_triggers_3").click(),document.querySelector("#processing-screen").classList.add("hide"),document.querySelector(".processing-screen_triggers_5").click(),m.value="",document.querySelector("#ai-or-not_image-url").value=""}let le=o=>{o==="unknown"?(document.getElementById("title-human").innerHTML="Sorry, but in this case we can't really say if it's AI or Not",document.getElementById("ai-or-not_result-message-50").classList.remove("hide"),document.getElementById("ai-or-not_result-message").classList.add("hide"),document.getElementById("ai-or-not_result-message-50").innerHTML="Probly the uploaded image has most likely been modified or compressed",document.getElementById("title-human").classList.remove("hide"),document.getElementById("title-ai").classList.add("hide")):(document.getElementById("title-ai").innerHTML=`This is likely <span class="text-color-green">AI</span> <div style="font-size: 1rem; color: #FFFFFFB3; font-family: Space Grotesk, sans-serif;">
<span> Free Research Preview. AI or Not may produce inaccurate results </span>
</div>`,document.getElementById("title-human").innerHTML=`This is likely <span class="text-color-green">Human</span><div style="font-size: 1rem; color: #FFFFFFB3; font-family: Space Grotesk, sans-serif;">
<span> Free Research Preview. AI or Not may produce inaccurate results </span>
</div>`,document.getElementById("ai-or-not_result-message-50").classList.add("hide"),document.getElementById("ai-or-not_result-message").classList.remove("hide"),document.querySelector("#ai-or-not_model-name").textContent=o,o==="ai"?(document.getElementById("title-human").classList.add("hide"),document.getElementById("title-ai").classList.remove("hide")):(document.getElementById("title-human").classList.remove("hide"),document.getElementById("title-ai").classList.add("hide")))},ce=async()=>{if(b.isLimitExceeded()){let o=document.getElementById("sign-up");o.style.display="flex",o.style.zIndex=100,H()}else x.classList.add("hide"),ie(),await C.getReportsByUrl(z,j).then(o=>{b.increment(),se(o.id),E.src=z,le(o.verdict),ae(o.nsfw_detected)}).catch(o=>{U.classList.contains("hide")?re():(re(),H()),console.log(o)})},L=document.body,et=document.querySelector("#dropzone-fullscreen_message-tip"),tt=document.querySelector("#dropzone-fullscreen_message-format");L==null||L.addEventListener("dragover",function(o){o.preventDefault(),document.querySelector(".dropzone-fullscreen").classList.remove("hide")}),L==null||L.addEventListener("dragleave",function(o){o.preventDefault(),document.querySelector(".dropzone-fullscreen").classList.add("hide")}),L==null||L.addEventListener("drop",async function(o){if(ee()!=="image")return;console.log("Image handler"),o.preventDefault(),document.querySelector(".dropzone-fullscreen").classList.add("hide");let c=o.dataTransfer.files[0],S=c.size,u=10*1024*1024;S>u?(M=!1,D()):(M=!0,ne()),M==!0?await de(c):D()}),m==null||m.addEventListener("change",async o=>{if(M==!0){let S=document.querySelector("#file-input").files[0];await de(S)}else D()});let de=async o=>{if(console.log(o),ie(),b.isLimitExceeded()){let u=document.getElementById("sign-up");u.style.display="flex",u.style.zIndex=100,H();return}let c=document.querySelector("#ai-or-not-current-image"),S=URL.createObjectURL(o);c.setAttribute("src",S),E.classList.remove("hide"),q.classList.add("hide"),await C.getReportsByBinary(o,j).then(u=>{b.increment(),se(u.id),oe(),le(u.verdict),ae(u.nsfw_detected)}).catch(u=>{console.log(u),Pe(),H()})};P==null||P.addEventListener("click",function(){oe(),H()}),(he=document.querySelector("#ai-or-not_dropzone"))==null||he.addEventListener("click",function(){ee()==="image"&&(l.checkAuth(H)||(te="screen_home",m.click()))}),(ye=document.querySelector("#choose-file-row"))==null||ye.addEventListener("click",function(){console.log("click 1"),te="screen_result",m.click()}),A==null||A.addEventListener("click",()=>{k.value!=""&&(z=k.value,ce())});let N=document.querySelector("#ai-or-not_image-url");N==null||N.addEventListener("keypress",function(o){o.key==="Enter"&&k.value!=""&&(z=k.value,ce())}),f.forEach(o=>{o==null||o.addEventListener("click",()=>{let c=o.getAttribute("test-image-url");document.querySelector("#ai-or-not_image-url").value=c,document.querySelector("#image-url-aion-submit").click(),document.querySelector("#ai-or-not_image-url").value=""})}),r==null||r.addEventListener("click",()=>{qe(),C.sendFeedback(Z,!0,"")}),a==null||a.addEventListener("click",()=>{}),g==null||g.addEventListener("click",()=>{}),s==null||s.addEventListener("click",()=>{C.sendFeedback(Z,!1,n.value),Te()}),document==null||document.addEventListener("keydown",function(o){o.code==="Escape"&&t.style.display!=="none"&&g.click()}),n==null||n.addEventListener("change",()=>{n.value!=""?s.classList.remove("is-disabled"):s.classList.add("is-disabled")}),n==null||n.addEventListener("input",()=>{n.value!=""?s.classList.remove("is-disabled"):s.classList.add("is-disabled")});let ue=document.querySelector("#ai-or-not_image-url"),me=document.querySelector("#image-url-aion-submit");ue.addEventListener("input",function(){let o=ue.value.trim();Ie(o)?me.classList.remove("is-disabled"):me.classList.add("is-disabled")});let Ie=o=>{try{return new URL(o),!0}catch{return!1}},W=document.getElementById("close-sign-up");W==null||W.addEventListener("click",()=>{let o=document.getElementById("sign-up");o.style.display="none",o.style.zIndex=0});let pe=document.querySelector("#image-quotas");l.isAuth()?h.fetchSubscriptionData().then(o=>{var c,S;if(o){let{quantity:u}=((c=o.plan)==null?void 0:c.requests_limits)||{quantity:20},{total:G}=o.requests;if(!o.plan)try{G-=(S=o.api.usage)==null?void 0:S.daily}catch(J){console.log(J)}console.log(o),pe.innerHTML=`
            <div style="margin-top: 20px; font-size: 1rem; color: white">
            <span">
                Available ${u-G} from ${u} requests 
            </span>
            </div>`}else pe.textContent=""}):console.log("Please Sign in to see your usage"),Ce()};xe();})();
