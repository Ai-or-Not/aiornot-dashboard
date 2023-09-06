"use strict";(()=>{var _=Object.create;var q=Object.defineProperty;var k=Object.getOwnPropertyDescriptor;var T=Object.getOwnPropertyNames;var C=Object.getPrototypeOf,B=Object.prototype.hasOwnProperty;var I=(r=>typeof require!="undefined"?require:typeof Proxy!="undefined"?new Proxy(r,{get:(e,t)=>(typeof require!="undefined"?require:e)[t]}):r)(function(r){if(typeof require!="undefined")return require.apply(this,arguments);throw new Error('Dynamic require of "'+r+'" is not supported')});var A=(r,e,t,s)=>{if(e&&typeof e=="object"||typeof e=="function")for(let n of T(e))!B.call(r,n)&&n!==t&&q(r,n,{get:()=>e[n],enumerable:!(s=k(e,n))||s.enumerable});return r};var U=(r,e,t)=>(t=r!=null?_(C(r)):{},A(e||!r||!r.__esModule?q(t,"default",{value:r,enumerable:!0}):t,r));var g="https://v3-atrium-stage-api.optic.xyz";var y=class{constructor(e,t){this.apiUrl=e,this.bearerToken=t}async get(e){let t=`${this.apiUrl}/${e}`;try{let s=await fetch(t,{method:"GET",headers:{"Content-Type":"application/json",Authorization:`Bearer ${this.bearerToken}`}});return await this.handleResponse(s)}catch(s){throw console.error("\u041E\u0448\u0438\u0431\u043A\u0430 \u043F\u0440\u0438 \u0432\u044B\u043F\u043E\u043B\u043D\u0435\u043D\u0438\u0438 GET-\u0437\u0430\u043F\u0440\u043E\u0441\u0430:",s),s}}async post(e,t){let s=`${this.apiUrl}/${e}`;try{let n=await fetch(s,{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${this.bearerToken}`},body:JSON.stringify(t)});return await this.handleResponse(n)}catch(n){throw console.error("\u041E\u0448\u0438\u0431\u043A\u0430 \u043F\u0440\u0438 \u0432\u044B\u043F\u043E\u043B\u043D\u0435\u043D\u0438\u0438 POST-\u0437\u0430\u043F\u0440\u043E\u0441\u0430:",n),n}}async postBinary(e,t){let s=`${this.apiUrl}/${e}`;try{let n=await fetch(s,{method:"POST",headers:{Accept:"application/json",Authorization:`Bearer ${this.bearerToken}`},body:t});return await this.handleResponse(n)}catch(n){throw console.error("\u041E\u0448\u0438\u0431\u043A\u0430 \u043F\u0440\u0438 \u0432\u044B\u043F\u043E\u043B\u043D\u0435\u043D\u0438\u0438 POST-\u0437\u0430\u043F\u0440\u043E\u0441\u0430:",n),n}}async delete(e){let t=`${this.apiUrl}/${e}`;try{let s=await fetch(t,{method:"DELETE",headers:{accept:"*/*",Authorization:`Bearer ${this.bearerToken}`}});await this.handleResponse(s)}catch(s){throw console.error("\u041E\u0448\u0438\u0431\u043A\u0430 \u043F\u0440\u0438 \u0432\u044B\u043F\u043E\u043B\u043D\u0435\u043D\u0438\u0438 DELETE-\u0437\u0430\u043F\u0440\u043E\u0441\u0430:",s),s}}async patch(e,t){let s=`${this.apiUrl}/${e}`;try{let n=await fetch(s,{method:"PATCH",headers:{"Content-Type":"application/json",Authorization:`Bearer ${this.bearerToken}`},body:JSON.stringify(t)});return await this.handleResponse(n)}catch(n){throw console.error("\u041E\u0448\u0438\u0431\u043A\u0430 \u043F\u0440\u0438 \u0432\u044B\u043F\u043E\u043B\u043D\u0435\u043D\u0438\u0438 PATCH-\u0437\u0430\u043F\u0440\u043E\u0441\u0430:",n),n}}async handleResponse(e){if(!e.ok){let t=await e.json();throw{status:e.status,message:t}}if(e.status!==204)return await e.json()}};var c=class{constructor(){let e=a.getToken(),t=`${g}/aion/users`;this.client=new y(t,e)}static getInstance(){return c.instance||(c.instance=new c),c.instance}static async fetchRequests(e=0,t=10){try{let s=c.getInstance().client,n=`data?filters=requests&offset=${e}&limit=${t}`;return await s.get(n).then(o=>o.requests.array)}catch(s){return console.error("\u041E\u0448\u0438\u0431\u043A\u0430 getRequests:",s),[]}}static async fetchUsageApi(){try{let e=c.getInstance().client,t="data?filters=api&offset=0&limit=10";return await e.get(t).then(s=>s.api)}catch(e){return console.error("\u041E\u0448\u0438\u0431\u043A\u0430 fetchUsageApi:",e),[]}}static async signUp(){try{return await c.getInstance().client.post("sign_up",{}).then(()=>!1).catch(t=>{if(t.status===400)return!0;throw t})}catch(e){return console.error("\u041E\u0448\u0438\u0431\u043A\u0430 signUp:",e),!1}}static async login(){try{return await c.getInstance().client.get("login")}catch(e){console.error("\u041E\u0448\u0438\u0431\u043A\u0430 login:",e)}}static async delete(){try{return await c.getInstance().client.delete("")}catch(e){console.error("\u041E\u0448\u0438\u0431\u043A\u0430 delete:",e)}}static async fetchApiToken(){try{return await c.getInstance().client.post("api_token",{})}catch(e){console.error("\u041E\u0448\u0438\u0431\u043A\u0430 fetchApiToken:",e)}}static async refreshApiToken(){try{return await c.getInstance().client.patch("api_token",{})}catch(e){console.error("\u041E\u0448\u0438\u0431\u043A\u0430 refreshApiToken:",e)}}},l=c;l.instance=null;var d=class{constructor(){}static isAuth(){return localStorage.getItem(d.key)!==null}static setAuth(){localStorage.setItem(d.key,"true")}static removeAuth(){localStorage.removeItem(d.key)}static async init(){d.isAuth()?await l.login():(await l.signUp(),d.setAuth(),await l.login())}static getToken(){var e;return(e=localStorage.getItem("_ms-mid"))!=null?e:""}static isExpiredToken(){let e=d.getToken();try{let[t,s,n]=e.split("."),o=JSON.parse(atob(s)),i=Math.floor(Date.now()/1e3);return o.exp<i}catch(t){return console.error("\u041E\u0448\u0438\u0431\u043A\u0430 \u043F\u0440\u0438 \u043F\u0440\u043E\u0432\u0435\u0440\u043A\u0435 \u0442\u043E\u043A\u0435\u043D\u0430:",t),!1}}},a=d;a.key="isSignUp";var m=class{constructor(){let e=a.getToken(),t=`${g}/aion/ai-generated`;this.client=new y(t,e)}static getInstance(){return m.instance||(m.instance=new m),m.instance}static async getReportsByBinary(e){let t=m.getInstance().client;try{let s=new FormData;return s.append("binary",e,"uploaded-file.png"),await t.postBinary("reports/binary",s)}catch(s){console.error("Error getReportsByBinary:",s)}}static async getReportsByUrl(e){let t=m.getInstance().client;try{let s=`reports/url?url=${e}`;return await t.post(s,{})}catch(s){console.error("\u041E\u0448\u0438\u0431\u043A\u0430 getReportsByUrl:",s)}}},L=m;L.instance=null;var f=class{constructor(){}static isLimitExceeded(){if(!a.isExpiredToken())return!1;let e=localStorage.getItem(f.key);return e===null?!1:parseInt(e)>5}static increment(){let e=localStorage.getItem(f.key),t=e===null?1:Number(e)+1;localStorage.setItem(f.key,t.toString())}},h=f;h.key="requestCount";var S=r=>{let e=document.createElement("textarea");e.value=r,e.setAttribute("readonly",""),e.style.position="absolute",e.style.left="-9999px",document.body.appendChild(e);let t=document.getSelection(),s=t&&t.rangeCount>0?t.getRangeAt(0):null;e.select(),e.setSelectionRange(0,r.length),document.execCommand("copy"),document.body.removeChild(e),s&&(t==null||t.removeAllRanges(),t==null||t.addRange(s))};var p=class{static fillGridResults(e,t){let s=document.getElementById(e);s&&(s.style.display="grid",t.forEach(n=>{let o=document.createElement("div");o.classList.add("request-item");let i=document.createElement("div");i.classList.add("request-item-verdict"),i.innerText=n.verdict;let u=document.createElement("img");u.src=n.url,u.alt=n.verdict,p.fillCardControls(o,n),o.appendChild(u),o.appendChild(i),s.appendChild(o)}))}static fillApiKeyCard(e){let t=E=>{let x=new Date(E),w={month:"short",day:"numeric",year:"numeric",hour:"numeric",minute:"numeric"};return x.toLocaleDateString("en-US",w)},s=document.getElementById("api-item"),n=document.getElementById("expire-date"),o=document.getElementById("rps"),i=document.getElementById("progress-line"),u=document.getElementById("counter-requests"),b=document.getElementById("total-requests");if(s&&n&&o&&i&&u&&b&&e.expiration_dt){n.innerText=t(e.expiration_dt),o.innerText=e.limits.secondly.toString(),i.style.width=`${e.usage.daily/e.limits.daily*100}%`,console.log(e.usage.daily/e.limits.daily*100),u.innerText=e.usage.daily.toString(),b.innerText=e.limits.daily.toString(),s.style.display="flex";let E=document.getElementById("api-copy");if(!E)return;E.onclick=()=>{S(e.key)}}}static fillCardControls(e,t){let s=document.createElement("button");if(s.onclick=()=>{s.innerText="Copied!",S(`https://results.aiornot.com/aiornot/users/${t.id}`),setTimeout(()=>{s.innerText="Share"},1500)},s.innerText="Share",s.classList.add("request-item-share"),s.style.opacity="0",!t.hasOwnProperty("is_proper_predict")){let n=document.createElement("div");n.id="request-item-controls",n.style.display="none";let o=document.createElement("button");o.innerHTML=`<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M14.2 6.71995C14.0127 6.49505 13.7782 6.314 13.5133 6.1896C13.2484 6.06519 12.9593 6.00045 12.6666 5.99995H9.62665L9.99998 5.04662C10.1553 4.6292 10.207 4.18035 10.1507 3.73856C10.0944 3.29677 9.93177 2.87523 9.67677 2.5101C9.42177 2.14497 9.082 1.84715 8.68661 1.64218C8.29121 1.43721 7.852 1.33121 7.40665 1.33328C7.27841 1.33355 7.15296 1.3708 7.04536 1.44056C6.93776 1.51033 6.85256 1.60965 6.79998 1.72661L4.19998 8.72661C4.13051 8.88915 4.09524 9.0739 4.09998 9.26004V14.3333C4.09998 14.7779 4.29581 15.2018 4.64561 15.4759C4.99542 15.75 5.44564 15.8466 5.86661 15.7266L11.8666 13.7266C12.2109 13.6146 12.5144 13.389 12.7066 13.0999L15.7399 8.23994C15.9828 7.8866 16.0376 7.40429 15.8799 6.99994C15.7222 6.59559 15.3866 6.34661 14.9999 6.33328C14.7333 6.33328 14.4666 6.61328 14.2 6.71995Z" fill="white"/>
                  </svg>`,o.classList.add("request-item-like");let i=document.createElement("button");i.innerHTML=`<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M1.80002 9.27998C1.98733 9.50489 2.2218 9.68594 2.48668 9.81034C2.75157 9.93475 3.04068 9.99949 3.33334 9.99999H6.37334L5.99998 10.9533C5.84471 11.3707 5.79295 11.8196 5.84934 12.2614C5.90573 12.7091 6.06839 13.1306 6.32338 13.4958C6.57838 13.8609 6.91815 14.1587 7.31355 14.3637C7.70895 14.5687 8.14816 14.6747 8.59351 14.6726C8.72175 14.6724 8.8472 14.6351 8.9548 14.5654C9.0624 14.4956 9.1476 14.3963 9.20018 14.2794L11.8002 7.27935C11.8697 7.11681 11.9049 6.93206 11.9002 6.74592V1.67261C11.9002 1.22803 11.7044 0.804177 11.3546 0.530028C11.0048 0.255879 10.5546 0.159303 10.1336 0.279353L4.13359 2.27935C3.78928 2.39139 3.48582 2.61697 3.29359 2.90607L0.260252 7.76607C0.0173837 8.11941 -0.0373969 8.60172 0.120318 9.00607C0.278034 9.41043 0.613639 9.65941 1.00035 9.67274C1.26668 9.67274 1.53335 9.39274 1.80002 9.27998Z" fill="white"/>
                  </svg>`,i.classList.add("request-item-dislike"),n.appendChild(o),n.appendChild(i),e.appendChild(n),o.onclick=()=>{o.classList.add("active"),i.classList.remove("active")},i.onclick=()=>{i.classList.add("active"),o.classList.remove("active")}}e.appendChild(s)}};var pe=import("https://openfpcdn.io/fingerprintjs/v3").then(r=>r.load());async function v(){let r=await l.fetchUsageApi(),e=document.getElementById("refresh-api-key"),t=document.getElementById("request-api-key"),s=document.getElementById("dash-api-empty"),n=document.getElementById("dash-api-content");r.access?(s.style.display="none",n.style.display="block",p.fillApiKeyCard(r),e.onclick=async()=>{await l.refreshApiToken(),v()}):(s.style.display="flex",n.style.display="none",t.onclick=async()=>{await l.fetchApiToken(),v()})}document.getElementById("sign-out").onclick=()=>{a.removeAuth()};v();})();
