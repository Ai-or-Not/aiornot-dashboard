"use strict";(()=>{var C=Object.create;var b=Object.defineProperty;var k=Object.getOwnPropertyDescriptor;var I=Object.getOwnPropertyNames;var B=Object.getPrototypeOf,P=Object.prototype.hasOwnProperty;var _=(r=>typeof require!="undefined"?require:typeof Proxy!="undefined"?new Proxy(r,{get:(e,s)=>(typeof require!="undefined"?require:e)[s]}):r)(function(r){if(typeof require!="undefined")return require.apply(this,arguments);throw new Error('Dynamic require of "'+r+'" is not supported')});var A=(r,e,s,t)=>{if(e&&typeof e=="object"||typeof e=="function")for(let n of I(e))!P.call(r,n)&&n!==s&&b(r,n,{get:()=>e[n],enumerable:!(t=k(e,n))||t.enumerable});return r};var M=(r,e,s)=>(s=r!=null?C(B(r)):{},A(e||!r||!r.__esModule?b(s,"default",{value:r,enumerable:!0}):s,r));var L=r=>{let e=document.createElement("textarea");e.value=r,e.setAttribute("readonly",""),e.style.position="absolute",e.style.left="-9999px",document.body.appendChild(e);let s=document.getSelection(),t=s&&s.rangeCount>0?s.getRangeAt(0):null;e.select(),e.setSelectionRange(0,r.length),document.execCommand("copy"),document.body.removeChild(e),t&&(s==null||s.removeAllRanges(),s==null||s.addRange(t))};function x(r){var e=r.split(".")[1],s=e.replace(/-/g,"+").replace(/_/g,"/"),t=decodeURIComponent(atob(s).split("").map(function(n){return"%"+("00"+n.charCodeAt(0).toString(16)).slice(-2)}).join(""));return JSON.parse(t)}var g="https://v3-atrium-stage-api.optic.xyz";var h=class{constructor(e,s){this.apiUrl=e,this.bearerToken=s}async get(e){let s=`${this.apiUrl}/${e}`;try{let t=await fetch(s,{method:"GET",headers:{"Content-Type":"application/json",Authorization:`Bearer ${this.bearerToken}`}});return await this.handleResponse(t)}catch(t){throw console.error("\u041E\u0448\u0438\u0431\u043A\u0430 \u043F\u0440\u0438 \u0432\u044B\u043F\u043E\u043B\u043D\u0435\u043D\u0438\u0438 GET-\u0437\u0430\u043F\u0440\u043E\u0441\u0430:",t),t}}async post(e,s){let t=`${this.apiUrl}/${e}`;try{let n=await fetch(t,{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${this.bearerToken}`},body:JSON.stringify(s)});return await this.handleResponse(n)}catch(n){throw console.error("\u041E\u0448\u0438\u0431\u043A\u0430 \u043F\u0440\u0438 \u0432\u044B\u043F\u043E\u043B\u043D\u0435\u043D\u0438\u0438 POST-\u0437\u0430\u043F\u0440\u043E\u0441\u0430:",n),n}}async postBinary(e,s){let t=`${this.apiUrl}/${e}`;try{let n=await fetch(t,{method:"POST",headers:{Accept:"application/json",Authorization:`Bearer ${this.bearerToken}`},body:s});return await this.handleResponse(n)}catch(n){throw console.error("\u041E\u0448\u0438\u0431\u043A\u0430 \u043F\u0440\u0438 \u0432\u044B\u043F\u043E\u043B\u043D\u0435\u043D\u0438\u0438 POST-\u0437\u0430\u043F\u0440\u043E\u0441\u0430:",n),n}}async delete(e){let s=`${this.apiUrl}/${e}`;try{let t=await fetch(s,{method:"DELETE",headers:{accept:"*/*",Authorization:`Bearer ${this.bearerToken}`}});await this.handleResponse(t)}catch(t){throw console.error("\u041E\u0448\u0438\u0431\u043A\u0430 \u043F\u0440\u0438 \u0432\u044B\u043F\u043E\u043B\u043D\u0435\u043D\u0438\u0438 DELETE-\u0437\u0430\u043F\u0440\u043E\u0441\u0430:",t),t}}async patch(e,s){let t=`${this.apiUrl}/${e}`;try{let n=await fetch(t,{method:"PATCH",headers:{"Content-Type":"application/json",Authorization:`Bearer ${this.bearerToken}`},body:JSON.stringify(s)});return await this.handleResponse(n)}catch(n){throw console.error("\u041E\u0448\u0438\u0431\u043A\u0430 \u043F\u0440\u0438 \u0432\u044B\u043F\u043E\u043B\u043D\u0435\u043D\u0438\u0438 PATCH-\u0437\u0430\u043F\u0440\u043E\u0441\u0430:",n),n}}async handleResponse(e){if(!e.ok){let s=await e.json();throw{status:e.status,message:s}}if(e.status!==204)return await e.json()}};var l=class{constructor(){let e=o.getToken(),s=`${g}/aion/users`;this.client=new h(s,e)}static getInstance(){return l.instance||(l.instance=new l),l.instance}static async fetchRequests(e=0,s=10){try{let t=l.getInstance().client,n=`data?filters=requests&offset=${e}&limit=${s}`;return await t.get(n).then(i=>i.requests.array)}catch(t){return console.error("\u041E\u0448\u0438\u0431\u043A\u0430 getRequests:",t),[]}}static async fetchUsageApi(){try{let e=l.getInstance().client,s="data?filters=api&offset=0&limit=10";return await e.get(s).then(t=>t.api)}catch(e){return console.error("\u041E\u0448\u0438\u0431\u043A\u0430 fetchUsageApi:",e),[]}}static async signUp(){try{return await l.getInstance().client.post("sign_up",{}).then(()=>!1).catch(s=>{if(s.status===400)return!0;throw s})}catch(e){return console.error("\u041E\u0448\u0438\u0431\u043A\u0430 signUp:",e),!1}}static async login(){try{return await l.getInstance().client.get("login")}catch(e){console.error("\u041E\u0448\u0438\u0431\u043A\u0430 login:",e)}}static async delete(){try{return await l.getInstance().client.delete("")}catch(e){console.error("\u041E\u0448\u0438\u0431\u043A\u0430 delete:",e)}}static async fetchApiToken(){try{return await l.getInstance().client.post("api_token",{})}catch(e){console.error("\u041E\u0448\u0438\u0431\u043A\u0430 fetchApiToken:",e)}}static async refreshApiToken(){try{return await l.getInstance().client.patch("api_token",{})}catch(e){console.error("\u041E\u0448\u0438\u0431\u043A\u0430 refreshApiToken:",e)}}},c=l;c.instance=null;var m=class{constructor(){}static isAuth(){return localStorage.getItem(m.key)!==null}static setAuth(){localStorage.setItem(m.key,"true")}static removeAuth(){localStorage.removeItem(m.key)}static async init(){m.isAuth()?await c.login():(await c.signUp(),m.setAuth(),await c.login())}static getToken(){var e;return(e=localStorage.getItem("_ms-mid"))!=null?e:""}static isExpiredToken(){let e=m.getToken();if((e==null?void 0:e.length)>0){let s=x(e),t=Date.now()/1e3;return s.exp<t}return!0}},o=m;o.key="isSignUp";var u=class{constructor(){let e=o.getToken(),s=`${g}/aion/ai-generated`;this.client=new h(s,e)}static getInstance(){return u.instance||(u.instance=new u),u.instance}static async getReportsByBinary(e){let s=u.getInstance().client;try{let t=new FormData;return t.append("binary",e,"uploaded-file.png"),await s.postBinary("reports/binary",t)}catch(t){console.error("Error getReportsByBinary:",t)}}static async getReportsByUrl(e){let s=u.getInstance().client;try{let t=`reports/url?url=${e}`;return await s.post(t,{})}catch(t){console.error("\u041E\u0448\u0438\u0431\u043A\u0430 getReportsByUrl:",t)}}static async getAudioVerdict(e){let s=u.getInstance().client;try{let t=new FormData;return t.append("file",e),await s.postBinary("reports/audio/binary",t)}catch(t){console.error("Error getAudioVerdict:",t)}}static async getYoutubeVerdict(e){let s=u.getInstance().client;try{let t={link:e};return await s.post("reports/audio/link",JSON.stringify(t))}catch(t){console.error("Error getYoutubeVerdict:",t)}}},f=u;f.instance=null;var v=class{constructor(){}static isLimitExceeded(){if(!o.isExpiredToken())return!1;let e=localStorage.getItem(v.key);return e===null?!1:parseInt(e)>5}static increment(){let e=localStorage.getItem(v.key),s=e===null?1:Number(e)+1;localStorage.setItem(v.key,s.toString())}},y=v;y.key="requestCount";var p=class{static fillGridResults(e,s){let t=document.getElementById(e);t&&(t.style.display="grid",s.forEach(n=>{let i=document.createElement("div");i.classList.add("request-item");let a=document.createElement("div");if(a.classList.add("request-item-verdict"),a.innerText=n.verdict,p.fillCardControls(i,n),n.url==="unknown"){let d=document.createElement("div");d.innerHTML=`
                    <svg width="225" height="65" viewBox="0 0 225 65" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M2.484 51V44.736H7.452V19.464H2.484V13.2H18.036C23.112 13.2 26.964 14.496 29.592 17.088C32.256 19.644 33.588 23.46 33.588 28.536V35.664C33.588 40.74 32.256 44.574 29.592 47.166C26.964 49.722 23.112 51 18.036 51H2.484ZM14.58 44.52H18.144C21.024 44.52 23.13 43.764 24.462 42.252C25.794 40.74 26.46 38.616 26.46 35.88V28.32C26.46 25.548 25.794 23.424 24.462 21.948C23.13 20.436 21.024 19.68 18.144 19.68H14.58V44.52ZM39.5288 51V13.2H63.8288V19.68H46.6568V28.698H62.3168V35.178H46.6568V44.52H64.1528V51H39.5288ZM69.4292 51V13.2H76.5572V44.52H93.8372V51H69.4292ZM98.6968 51V13.2H122.997V19.68H105.825V28.698H121.485V35.178H105.825V44.52H123.321V51H98.6968ZM137.345 51V19.68H126.329V13.2H155.489V19.68H144.473V51H137.345ZM160.343 51V13.2H184.643V19.68H167.471V28.698H183.131V35.178H167.471V44.52H184.967V51H160.343ZM189.164 51V44.736H194.132V19.464H189.164V13.2H204.716C209.792 13.2 213.644 14.496 216.272 17.088C218.936 19.644 220.268 23.46 220.268 28.536V35.664C220.268 40.74 218.936 44.574 216.272 47.166C213.644 49.722 209.792 51 204.716 51H189.164ZM201.26 44.52H204.824C207.704 44.52 209.81 43.764 211.142 42.252C212.474 40.74 213.14 38.616 213.14 35.88V28.32C213.14 25.548 212.474 23.424 211.142 21.948C209.81 20.436 207.704 19.68 204.824 19.68H201.26V44.52Z" fill="#FF4651"/>
                    </svg>
                `,d.style.width="100%",i.appendChild(d)}else{let d=document.createElement("img");d.src=n.url,d.alt=n.verdict,i.appendChild(d)}i.appendChild(a),t.appendChild(i)}))}static fillApiKeyCard(e){let s=E=>{let T=new Date(E),q={month:"short",day:"numeric",year:"numeric",hour:"numeric",minute:"numeric"};return T.toLocaleDateString("en-US",q)},t=document.getElementById("api-item"),n=document.getElementById("expire-date"),i=document.getElementById("rps"),a=document.getElementById("progress-line"),d=document.getElementById("counter-requests"),S=document.getElementById("total-requests");if(t&&n&&i&&a&&d&&S&&e.expiration_dt){n.innerText=s(e.expiration_dt),i.innerText=e.limits.secondly.toString(),a.style.width=`${e.usage.daily/e.limits.daily*100}%`,console.log(e.usage.daily/e.limits.daily*100),d.innerText=e.usage.daily.toString(),S.innerText=e.limits.daily.toString(),t.style.display="flex";let E=document.getElementById("api-copy");if(!E)return;E.onclick=()=>{L(e.key)}}}static fillCardControls(e,s){let t=document.createElement("button");if(t.onclick=()=>{t.innerText="Copied!",L(`https://results.aiornot.com/aiornot/users/${s.id}`),setTimeout(()=>{t.innerText="Share"},1500)},t.innerText="Share",t.classList.add("request-item-share"),t.style.opacity="0",!s.hasOwnProperty("is_proper_predict")){let n=document.createElement("div");n.id="request-item-controls",n.style.display="none";let i=document.createElement("button");i.innerHTML=`
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M14.2 6.71995C14.0127 6.49505 13.7782 6.314 13.5133 6.1896C13.2484 6.06519 12.9593 6.00045 12.6666 5.99995H9.62665L9.99998 5.04662C10.1553 4.6292 10.207 4.18035 10.1507 3.73856C10.0944 3.29677 9.93177 2.87523 9.67677 2.5101C9.42177 2.14497 9.082 1.84715 8.68661 1.64218C8.29121 1.43721 7.852 1.33121 7.40665 1.33328C7.27841 1.33355 7.15296 1.3708 7.04536 1.44056C6.93776 1.51033 6.85256 1.60965 6.79998 1.72661L4.19998 8.72661C4.13051 8.88915 4.09524 9.0739 4.09998 9.26004V14.3333C4.09998 14.7779 4.29581 15.2018 4.64561 15.4759C4.99542 15.75 5.44564 15.8466 5.86661 15.7266L11.8666 13.7266C12.2109 13.6146 12.5144 13.389 12.7066 13.0999L15.7399 8.23994C15.9828 7.8866 16.0376 7.40429 15.8799 6.99994C15.7222 6.59559 15.3866 6.34661 14.9999 6.33328C14.7333 6.33328 14.4666 6.61328 14.2 6.71995Z" fill="white"/>
                </svg>
            `,i.classList.add("request-item-like");let a=document.createElement("button");a.innerHTML=`
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M1.80002 9.27998C1.98733 9.50489 2.2218 9.68594 2.48668 9.81034C2.75157 9.93475 3.04068 9.99949 3.33334 9.99999H6.37334L5.99998 10.9533C5.84471 11.3707 5.79295 11.8196 5.84934 12.2614C5.90573 12.7091 6.06839 13.1306 6.32338 13.4958C6.57838 13.8609 6.91815 14.1587 7.31355 14.3637C7.70895 14.5687 8.14816 14.6747 8.59351 14.6726C8.72175 14.6724 8.8472 14.6351 8.9548 14.5654C9.0624 14.4956 9.1476 14.3963 9.20018 14.2794L11.8002 7.27935C11.8697 7.11681 11.9049 6.93206 11.9002 6.74592V1.67261C11.9002 1.22803 11.7044 0.804177 11.3546 0.530028C11.0048 0.255879 10.5546 0.159303 10.1336 0.279353L4.13359 2.27935C3.78928 2.39139 3.48582 2.61697 3.29359 2.90607L0.260252 7.76607C0.0173837 8.11941 -0.0373969 8.60172 0.120318 9.00607C0.278034 9.41043 0.613639 9.65941 1.00035 9.67274C1.26668 9.67274 1.53335 9.39274 1.80002 9.27998Z" fill="white"/>
                </svg>
            `,a.classList.add("request-item-dislike"),n.appendChild(i),n.appendChild(a),e.appendChild(n),i.onclick=()=>{i.classList.add("active"),a.classList.remove("active")},a.onclick=()=>{a.classList.add("active"),i.classList.remove("active")}}e.appendChild(t)}};var ye=import("https://openfpcdn.io/fingerprintjs/v3").then(r=>r.load());async function w(){let r=await c.fetchUsageApi(),e=document.getElementById("refresh-api-key"),s=document.getElementById("request-api-key"),t=document.getElementById("dash-api-empty"),n=document.getElementById("dash-api-content");r.access?(t.style.display="none",n.style.display="block",p.fillApiKeyCard(r),e.onclick=async()=>{await c.refreshApiToken(),w()}):(t.style.display="flex",n.style.display="none",s.onclick=async()=>{await c.fetchApiToken(),w()})}document.getElementById("sign-out").onclick=()=>{o.removeAuth()};w();})();
