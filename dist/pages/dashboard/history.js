"use strict";(()=>{var q=Object.create;var b=Object.defineProperty;var I=Object.getOwnPropertyDescriptor;var B=Object.getOwnPropertyNames;var _=Object.getPrototypeOf,P=Object.prototype.hasOwnProperty;var H=(i=>typeof require!="undefined"?require:typeof Proxy!="undefined"?new Proxy(i,{get:(e,t)=>(typeof require!="undefined"?require:e)[t]}):i)(function(i){if(typeof require!="undefined")return require.apply(this,arguments);throw new Error('Dynamic require of "'+i+'" is not supported')});var M=(i,e,t,s)=>{if(e&&typeof e=="object"||typeof e=="function")for(let n of B(e))!P.call(i,n)&&n!==t&&b(i,n,{get:()=>e[n],enumerable:!(s=I(e,n))||s.enumerable});return i};var A=(i,e,t)=>(t=i!=null?q(_(i)):{},M(e||!i||!i.__esModule?b(t,"default",{value:i,enumerable:!0}):t,i));var S=i=>{let e=document.createElement("textarea");e.value=i,e.setAttribute("readonly",""),e.style.position="absolute",e.style.left="-9999px",document.body.appendChild(e);let t=document.getSelection(),s=t&&t.rangeCount>0?t.getRangeAt(0):null;e.select(),e.setSelectionRange(0,i.length),document.execCommand("copy"),document.body.removeChild(e),s&&(t==null||t.removeAllRanges(),t==null||t.addRange(s))};function x(i){var e=i.split(".")[1],t=e.replace(/-/g,"+").replace(/_/g,"/"),s=decodeURIComponent(atob(t).split("").map(function(n){return"%"+("00"+n.charCodeAt(0).toString(16)).slice(-2)}).join(""));return JSON.parse(s)}var d="https://v3-atrium-stage-api.optic.xyz";var f=class{constructor(e,t){this.apiUrl=e,this.bearerToken=t}async get(e){let t=`${this.apiUrl}/${e}`;try{let s=await fetch(t,{method:"GET",headers:{"Content-Type":"application/json",Authorization:`Bearer ${this.bearerToken}`}});return await this.handleResponse(s)}catch(s){throw console.error("\u041E\u0448\u0438\u0431\u043A\u0430 \u043F\u0440\u0438 \u0432\u044B\u043F\u043E\u043B\u043D\u0435\u043D\u0438\u0438 GET-\u0437\u0430\u043F\u0440\u043E\u0441\u0430:",s),s}}async post(e,t){let s=`${this.apiUrl}/${e}`;try{let n=await fetch(s,{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${this.bearerToken}`},body:JSON.stringify(t)});return await this.handleResponse(n)}catch(n){throw console.error("\u041E\u0448\u0438\u0431\u043A\u0430 \u043F\u0440\u0438 \u0432\u044B\u043F\u043E\u043B\u043D\u0435\u043D\u0438\u0438 POST-\u0437\u0430\u043F\u0440\u043E\u0441\u0430:",n),n}}async postBinary(e,t){let s=`${this.apiUrl}/${e}`;try{let n=await fetch(s,{method:"POST",headers:{Accept:"application/json",Authorization:`Bearer ${this.bearerToken}`},body:t});return await this.handleResponse(n)}catch(n){throw console.error("\u041E\u0448\u0438\u0431\u043A\u0430 \u043F\u0440\u0438 \u0432\u044B\u043F\u043E\u043B\u043D\u0435\u043D\u0438\u0438 POST-\u0437\u0430\u043F\u0440\u043E\u0441\u0430:",n),n}}async delete(e){let t=`${this.apiUrl}/${e}`;try{let s=await fetch(t,{method:"DELETE",headers:{accept:"*/*",Authorization:`Bearer ${this.bearerToken}`}});await this.handleResponse(s)}catch(s){throw console.error("\u041E\u0448\u0438\u0431\u043A\u0430 \u043F\u0440\u0438 \u0432\u044B\u043F\u043E\u043B\u043D\u0435\u043D\u0438\u0438 DELETE-\u0437\u0430\u043F\u0440\u043E\u0441\u0430:",s),s}}async patch(e,t){let s=`${this.apiUrl}/${e}`;try{let n=await fetch(s,{method:"PATCH",headers:{"Content-Type":"application/json",Authorization:`Bearer ${this.bearerToken}`},body:JSON.stringify(t)});return await this.handleResponse(n)}catch(n){throw console.error("\u041E\u0448\u0438\u0431\u043A\u0430 \u043F\u0440\u0438 \u0432\u044B\u043F\u043E\u043B\u043D\u0435\u043D\u0438\u0438 PATCH-\u0437\u0430\u043F\u0440\u043E\u0441\u0430:",n),n}}async handleResponse(e){if(!e.ok){let t=await e.json();throw{status:e.status,message:t}}if(e.status!==204)return await e.json()}};var c=class{constructor(){let e=a.getToken(),t=`${d}/aion/users`;this.client=new f(t,e)}static getInstance(){return c.instance||(c.instance=new c),c.instance}static async fetchRequests(e=0,t=10){try{let s=c.getInstance().client,n=`data?filters=requests&offset=${e}&limit=${t}`;return await s.get(n).then(o=>o.requests.array)}catch(s){return console.error("\u041E\u0448\u0438\u0431\u043A\u0430 getRequests:",s),[]}}static async fetchUsageApi(){try{let e=c.getInstance().client,t="data?filters=api&offset=0&limit=10";return await e.get(t).then(s=>s.api)}catch(e){return console.error("\u041E\u0448\u0438\u0431\u043A\u0430 fetchUsageApi:",e),[]}}static async signUp(){try{return await c.getInstance().client.post("sign_up",{}).then(()=>!1).catch(t=>{if(t.status===400)return!0;throw t})}catch(e){return console.error("\u041E\u0448\u0438\u0431\u043A\u0430 signUp:",e),!1}}static async login(){try{return await c.getInstance().client.get("login")}catch(e){console.error("\u041E\u0448\u0438\u0431\u043A\u0430 login:",e)}}static async delete(){try{return await c.getInstance().client.delete("")}catch(e){console.error("\u041E\u0448\u0438\u0431\u043A\u0430 delete:",e)}}static async fetchApiToken(){try{return await c.getInstance().client.post("api_token",{})}catch(e){console.error("\u041E\u0448\u0438\u0431\u043A\u0430 fetchApiToken:",e)}}static async refreshApiToken(){try{return await c.getInstance().client.patch("api_token",{})}catch(e){console.error("\u041E\u0448\u0438\u0431\u043A\u0430 refreshApiToken:",e)}}},m=c;m.instance=null;var p=class{constructor(){}static isAuth(){return localStorage.getItem(p.key)!==null}static setAuth(){localStorage.setItem(p.key,"true")}static removeAuth(){localStorage.removeItem(p.key)}static async init(){p.isAuth()?await m.login():(await m.signUp(),p.setAuth(),await m.login())}static getToken(){var e;return(e=localStorage.getItem("_ms-mid"))!=null?e:""}static isExpiredToken(){let e=p.getToken();if((e==null?void 0:e.length)>0){let t=x(e),s=Date.now()/1e3;return t.exp<s}return!0}},a=p;a.key="isSignUp";var u=class{constructor(){let e=a.getToken(),t=`${d}/aion/ai-generated`;this.client=new f(t,e)}static getInstance(){return u.instance||(u.instance=new u),u.instance}static async getReportsByBinary(e){let t=u.getInstance().client;try{let s=new FormData;return s.append("binary",e,"uploaded-file.png"),await t.postBinary("reports/binary",s)}catch(s){console.error("Error getReportsByBinary:",s)}}static async getReportsByUrl(e){let t=u.getInstance().client;try{let s=`reports/url?url=${e}`;return await t.post(s,{})}catch(s){console.error("\u041E\u0448\u0438\u0431\u043A\u0430 getReportsByUrl:",s)}}static async getAudioVerdict(e){let t=u.getInstance().client;try{let s=new FormData;return s.append("file",e),await t.postBinary("reports/audio/binary",s)}catch(s){console.error("Error getAudioVerdict:",s)}}static async getYoutubeVerdict(e){let t=u.getInstance().client;try{let s={url:e};return await t.post("reports/audio/link",s)}catch(s){console.error("Error getYoutubeVerdict:",s)}}},g=u;g.instance=null;var y=class{constructor(){}static async getReportsByBinary(e,t){let s=`${d}/results/api/detector/reports/raw?source=web&user_id=${t}`,n=new FormData;n.append("binary",e,"file_name.png");let o={method:"POST",headers:{Accept:"application/json",Authorization:`Bearer ${a.getToken()}`},body:n};return await fetch(s,o).then(l=>l.json())}static async getReportsByUrl(e,t){let s=`${d}/results/api/detector/reports/json?source=web&user_id=${t}`,n={method:"POST",headers:{Accept:"application/json","Content-Type":"application/json",Authorization:`Bearer ${a.getToken()}`},body:JSON.stringify({object:e})};return await fetch(s,n).then(o=>o.json())}static async sendFeedback(e,t,s,n=!1){let o={is_proper_predict:t,comment:s},l=`${d}/results/api/detector/reports/result/${e}`,r={method:"PUT",body:JSON.stringify(o),headers:{Accept:"application/json","Content-Type":"application/json"}};(n||!a.isExpiredToken())&&(l=`${d}/aion/ai-generated/reports/${e}`,r={method:"PATCH",body:JSON.stringify(o),headers:{Accept:"application/json","Content-Type":"application/json"}}),await fetch(l,r).then(h=>h.json()).then(h=>console.log(h)).catch(h=>console.error(h))}static async getAudioVerdict(e){let t=`${d}/aion/ai-generated/reports/audio/binary`,s=new FormData;return s.append("file",e),await fetch(t,{method:"POST",headers:{Accept:"application/json",ContentType:"multipart/form-data"},body:s}).then(o=>o.json())}static async getYoutubeVerdict(e){let t=`${d}/aion/ai-generated/reports/audio/link`,s={method:"POST",headers:{Accept:"application/json","Content-Type":"application/json"},body:JSON.stringify({url:e})};return await fetch(t,s).then(n=>n.json())}};var w=class{constructor(){}static isLimitExceeded(){if(!a.isExpiredToken())return!1;let e=localStorage.getItem(w.key);return e===null?!1:parseInt(e)>5}static increment(){let e=localStorage.getItem(w.key),t=e===null?1:Number(e)+1;localStorage.setItem(w.key,t.toString())}},L=w;L.key="requestCount";var v=class{static async getReportsByBinary(e,t){return a.isExpiredToken()?await y.getReportsByBinary(e,t):await g.getReportsByBinary(e)}static async getReportsByUrl(e,t){return a.isExpiredToken()?await y.getReportsByUrl(e,t):await g.getReportsByUrl(e)}static async getAudioVerictByFile(e){return a.isExpiredToken()?await y.getAudioVerdict(e):await g.getAudioVerdict(e)}static async getAudioVerictMock(e){let s=await((n,o)=>new Promise(l=>{setTimeout(()=>{l(o)},n)}))(1500,e);return JSON.parse(`{
            "id": "41994fdd-0161-43a9-b873-581eccbe6d72",
            "report": {
                "version": "0.0.0",
                "verdict": ${s}
            }
        }`)}static async getYoutubeVerict(e){return a.isExpiredToken()?await y.getYoutubeVerdict(e):await g.getYoutubeVerdict(e)}static async sendFeedback(e,t,s,n=!1){return await y.sendFeedback(e,t,s,n)}};var E=class{static fillGridResults(e,t){let s=document.getElementById(e);s&&(s.style.display="grid",t.forEach(n=>{let o=document.createElement("div");o.classList.add("request-item");let l=document.createElement("div");if(l.classList.add("request-item-verdict"),l.innerText=n.verdict,E.fillCardControls(o,n),n.url==="unknown"){let r=document.createElement("div");r.innerHTML=`
                    <svg width="60%" height="auto" viewBox="0 0 225 65" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M2.484 51V44.736H7.452V19.464H2.484V13.2H18.036C23.112 13.2 26.964 14.496 29.592 17.088C32.256 19.644 33.588 23.46 33.588 28.536V35.664C33.588 40.74 32.256 44.574 29.592 47.166C26.964 49.722 23.112 51 18.036 51H2.484ZM14.58 44.52H18.144C21.024 44.52 23.13 43.764 24.462 42.252C25.794 40.74 26.46 38.616 26.46 35.88V28.32C26.46 25.548 25.794 23.424 24.462 21.948C23.13 20.436 21.024 19.68 18.144 19.68H14.58V44.52ZM39.5288 51V13.2H63.8288V19.68H46.6568V28.698H62.3168V35.178H46.6568V44.52H64.1528V51H39.5288ZM69.4292 51V13.2H76.5572V44.52H93.8372V51H69.4292ZM98.6968 51V13.2H122.997V19.68H105.825V28.698H121.485V35.178H105.825V44.52H123.321V51H98.6968ZM137.345 51V19.68H126.329V13.2H155.489V19.68H144.473V51H137.345ZM160.343 51V13.2H184.643V19.68H167.471V28.698H183.131V35.178H167.471V44.52H184.967V51H160.343ZM189.164 51V44.736H194.132V19.464H189.164V13.2H204.716C209.792 13.2 213.644 14.496 216.272 17.088C218.936 19.644 220.268 23.46 220.268 28.536V35.664C220.268 40.74 218.936 44.574 216.272 47.166C213.644 49.722 209.792 51 204.716 51H189.164ZM201.26 44.52H204.824C207.704 44.52 209.81 43.764 211.142 42.252C212.474 40.74 213.14 38.616 213.14 35.88V28.32C213.14 25.548 212.474 23.424 211.142 21.948C209.81 20.436 207.704 19.68 204.824 19.68H201.26V44.52Z" fill="#FF4651"/>
                    </svg>
                `,r.style.width="100%",r.style.height="100%",r.style.display="flex",r.style.justifyContent="center",r.style.alignItems="center",o.appendChild(r)}else{let r=document.createElement("img");r.src=n.url,r.alt=n.verdict,o.appendChild(r)}o.appendChild(l),s.appendChild(o)}))}static fillApiKeyCard(e){let t=C=>{let T=new Date(C),k={month:"short",day:"numeric",year:"numeric",hour:"numeric",minute:"numeric"};return T.toLocaleDateString("en-US",k)},s=document.getElementById("api-item"),n=document.getElementById("expire-date"),o=document.getElementById("rps"),l=document.getElementById("progress-line"),r=document.getElementById("counter-requests"),h=document.getElementById("total-requests");if(s&&n&&o&&l&&r&&h&&e.expiration_dt){n.innerText=t(e.expiration_dt),o.innerText=e.limits.secondly.toString(),l.style.width=`${e.usage.daily/e.limits.daily*100}%`,console.log(e.usage.daily/e.limits.daily*100),r.innerText=e.usage.daily.toString(),h.innerText=e.limits.daily.toString(),s.style.display="flex";let C=document.getElementById("api-copy");if(!C)return;C.onclick=()=>{S(e.key)}}}static fillCardControls(e,t){let s=document.createElement("button");if(s.onclick=()=>{s.innerText="Copied!",S(`https://results.aiornot.com/aiornot/users/${t.id}`),setTimeout(()=>{s.innerText="Share"},1500)},s.innerText="Share",s.classList.add("request-item-share"),s.style.opacity="0",!t.hasOwnProperty("is_proper_predict")){let n=document.createElement("div");n.id="request-item-controls",n.style.display="none";let o=document.createElement("button");o.innerHTML=`
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M14.2 6.72001C14.0127 6.49511 13.7783 6.31406 13.5133 6.18966C13.2484 6.06525 12.9594 6.00051 12.6667 6.00001H9.62666L10 5.04668C10.1553 4.62926 10.207 4.18041 10.1507 3.73862C10.0944 3.29683 9.93179 2.87529 9.67679 2.51016C9.42178 2.14503 9.08201 1.84721 8.68662 1.64224C8.29123 1.43727 7.85202 1.33127 7.40666 1.33334C7.27842 1.33361 7.15298 1.37086 7.04538 1.44062C6.93777 1.51039 6.85257 1.60971 6.79999 1.72668L4.89999 6.00001H3.33333C2.8029 6.00001 2.29419 6.21072 1.91911 6.5858C1.54404 6.96087 1.33333 7.46958 1.33333 8.00001V12.6667C1.33333 13.1971 1.54404 13.7058 1.91911 14.0809C2.29419 14.456 2.8029 14.6667 3.33333 14.6667H11.82C12.2879 14.6665 12.7409 14.5023 13.1002 14.2027C13.4595 13.903 13.7024 13.4869 13.7867 13.0267L14.6333 8.36001C14.6857 8.0716 14.674 7.7752 14.5991 7.49179C14.5243 7.20839 14.388 6.94491 14.2 6.72001ZM4.66666 13.3333H3.33333C3.15652 13.3333 2.98695 13.2631 2.86192 13.1381C2.7369 13.0131 2.66666 12.8435 2.66666 12.6667V8.00001C2.66666 7.8232 2.7369 7.65363 2.86192 7.52861C2.98695 7.40358 3.15652 7.33334 3.33333 7.33334H4.66666V13.3333ZM13.3333 8.12001L12.4867 12.7867C12.4583 12.942 12.3757 13.0822 12.2536 13.1823C12.1315 13.2824 11.9779 13.3359 11.82 13.3333H6V6.80668L7.81333 2.72668C7.99998 2.78109 8.17333 2.87361 8.32243 2.9984C8.47153 3.12318 8.59314 3.27752 8.67959 3.45167C8.76604 3.62582 8.81545 3.816 8.8247 4.01021C8.83395 4.20442 8.80284 4.39843 8.73333 4.58001L8.37999 5.53334C8.30471 5.73485 8.27929 5.95157 8.30591 6.16503C8.33253 6.37849 8.41041 6.58233 8.53288 6.75917C8.65536 6.93601 8.8188 7.08059 9.00927 7.18057C9.19973 7.28055 9.41155 7.33297 9.62666 7.33334H12.6667C12.7646 7.33318 12.8614 7.35461 12.9501 7.39609C13.0388 7.43757 13.1173 7.49809 13.18 7.57334C13.2442 7.64756 13.2913 7.73504 13.3178 7.82954C13.3443 7.92404 13.3496 8.02322 13.3333 8.12001Z" fill="#ADFF00"/>
                </svg>
            `,o.classList.add("request-item-like");let l=document.createElement("button");l.innerHTML=`
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12.6667 1.33331H4.18C3.71213 1.33347 3.25912 1.49765 2.89979 1.7973C2.54046 2.09694 2.29755 2.51308 2.21333 2.97331L1.36667 7.63998C1.31391 7.92827 1.32516 8.22464 1.39962 8.5081C1.47408 8.79156 1.60993 9.0552 1.79756 9.28035C1.98518 9.5055 2.22 9.68666 2.48539 9.81102C2.75078 9.93537 3.04025 9.99988 3.33333 9.99998H6.37333L6 10.9533C5.84471 11.3707 5.793 11.8196 5.84929 12.2614C5.90558 12.7032 6.06821 13.1247 6.32321 13.4898C6.57821 13.855 6.91798 14.1528 7.31337 14.3578C7.70877 14.5627 8.14798 14.6687 8.59333 14.6666C8.72157 14.6664 8.84702 14.6291 8.95462 14.5594C9.06222 14.4896 9.14742 14.3903 9.2 14.2733L11.1 9.99998H12.6667C13.1971 9.99998 13.7058 9.78927 14.0809 9.41419C14.456 9.03912 14.6667 8.53041 14.6667 7.99998V3.33331C14.6667 2.80288 14.456 2.29417 14.0809 1.9191C13.7058 1.54403 13.1971 1.33331 12.6667 1.33331ZM10 9.19331L8.18667 13.2733C8.00113 13.2172 7.82905 13.1236 7.68103 12.9985C7.53301 12.8733 7.41218 12.7192 7.32599 12.5455C7.2398 12.3719 7.19007 12.1825 7.17987 11.9889C7.16967 11.7953 7.1992 11.6017 7.26667 11.42L7.62 10.4666C7.69529 10.2651 7.72071 10.0484 7.69408 9.83496C7.66746 9.6215 7.58959 9.41766 7.46711 9.24082C7.34463 9.06398 7.18119 8.9194 6.99073 8.81942C6.80027 8.71944 6.58844 8.66702 6.37333 8.66665H3.33333C3.23539 8.66681 3.13862 8.64538 3.0499 8.6039C2.96118 8.56242 2.88268 8.5019 2.82 8.42665C2.75578 8.35243 2.70873 8.26495 2.68223 8.17045C2.65572 8.07595 2.65041 7.97677 2.66667 7.87998L3.51333 3.21331C3.54173 3.05801 3.62432 2.91782 3.74641 2.81771C3.86849 2.7176 4.02214 2.66407 4.18 2.66665H10V9.19331ZM13.3333 7.99998C13.3333 8.17679 13.2631 8.34636 13.1381 8.47138C13.013 8.59641 12.8435 8.66665 12.6667 8.66665H11.3333V2.66665H12.6667C12.8435 2.66665 13.013 2.73688 13.1381 2.86191C13.2631 2.98693 13.3333 3.1565 13.3333 3.33331V7.99998Z" fill="#FF4651"/>
                </svg>
            `,l.classList.add("request-item-dislike"),n.appendChild(o),n.appendChild(l),e.appendChild(n),o.onclick=()=>{let r=document.createElement("div");r.classList.add("feedback-alert"),r.classList.add("feedback-alert__correct"),r.innerHTML=`
                              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                  <path d="M14.2 6.71995C14.0127 6.49505 13.7782 6.314 13.5133 6.1896C13.2484 6.06519 12.9593 6.00045 12.6666 5.99995H9.62665L9.99998 5.04662C10.1553 4.6292 10.207 4.18035 10.1507 3.73856C10.0944 3.29677 9.93177 2.87523 9.67677 2.5101C9.42177 2.14497 9.082 1.84715 8.68661 1.64218C8.29121 1.43721 7.852 1.33121 7.40665 1.33328C7.27841 1.33355 7.15296 1.3708 7.04536 1.44056C6.93776 1.51033 6.85256 1.60965 6.79998 1.72661L4.89998 5.99995H3.33331C2.80288 5.99995 2.29417 6.21066 1.9191 6.58573C1.54403 6.96081 1.33331 7.46952 1.33331 7.99995V12.6666C1.33331 13.197 1.54403 13.7058 1.9191 14.0808C2.29417 14.4559 2.80288 14.6666 3.33331 14.6666H11.82C12.2879 14.6665 12.7409 14.5023 13.1002 14.2026C13.4595 13.903 13.7024 13.4868 13.7866 13.0266L14.6333 8.35995C14.6857 8.07154 14.674 7.77514 14.5991 7.49173C14.5242 7.20833 14.388 6.94485 14.2 6.71995ZM4.66665 13.3333H3.33331C3.1565 13.3333 2.98693 13.263 2.86191 13.138C2.73688 13.013 2.66665 12.8434 2.66665 12.6666V7.99995C2.66665 7.82314 2.73688 7.65357 2.86191 7.52854C2.98693 7.40352 3.1565 7.33328 3.33331 7.33328H4.66665V13.3333ZM13.3333 8.11995L12.4866 12.7866C12.4582 12.9419 12.3757 13.0821 12.2536 13.1822C12.1315 13.2823 11.9778 13.3359 11.82 13.3333H5.99998V6.80662L7.81331 2.72662C7.99997 2.78103 8.17332 2.87355 8.32242 2.99834C8.47152 3.12312 8.59313 3.27746 8.67958 3.45161C8.76603 3.62576 8.81543 3.81594 8.82468 4.01015C8.83393 4.20436 8.80282 4.39837 8.73331 4.57995L8.37998 5.53328C8.30469 5.73479 8.27927 5.95151 8.3059 6.16497C8.33252 6.37843 8.41039 6.58227 8.53287 6.75911C8.65535 6.93595 8.81879 7.08053 9.00925 7.18051C9.19971 7.28049 9.41154 7.33291 9.62665 7.33328H12.6666C12.7646 7.33312 12.8614 7.35455 12.9501 7.39603C13.0388 7.43751 13.1173 7.49803 13.18 7.57328C13.2442 7.6475 13.2912 7.73498 13.3178 7.82948C13.3443 7.92397 13.3496 8.02316 13.3333 8.11995Z" fill="#10151D"/>
                              </svg>
                              <span>Correct</span>
                          `,n.remove(),e.appendChild(r),setTimeout(()=>{r.remove()},5e3),v.sendFeedback(t.id,!0,"")},l.onclick=()=>{let r=document.createElement("div");r.classList.add("feedback-alert"),r.classList.add("feedback-alert__incorrect"),r.innerHTML=`
                              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                  <path d="M12.6667 1.33337H4.17998C3.71211 1.33353 3.2591 1.49771 2.89977 1.79736C2.54044 2.097 2.29754 2.51314 2.21332 2.97337L1.36665 7.64004C1.3139 7.92833 1.32515 8.2247 1.39961 8.50816C1.47407 8.79162 1.60992 9.05526 1.79754 9.28041C1.98517 9.50556 2.21998 9.68672 2.48537 9.81108C2.75076 9.93543 3.04024 9.99994 3.33332 10H6.37332L5.99998 10.9534C5.8447 11.3708 5.79298 11.8196 5.84928 12.2614C5.90557 12.7032 6.06819 13.1248 6.32319 13.4899C6.5782 13.855 6.91797 14.1528 7.31336 14.3578C7.70875 14.5628 8.14796 14.6688 8.59332 14.6667C8.72156 14.6664 8.847 14.6292 8.9546 14.5594C9.06221 14.4897 9.14741 14.3903 9.19999 14.2734L11.1 10H12.6667C13.1971 10 13.7058 9.78933 14.0809 9.41426C14.4559 9.03918 14.6667 8.53047 14.6667 8.00004V3.33337C14.6667 2.80294 14.4559 2.29423 14.0809 1.91916C13.7058 1.54409 13.1971 1.33337 12.6667 1.33337ZM9.99998 9.19337L8.18665 13.2734C8.00111 13.2172 7.82903 13.1237 7.68101 12.9985C7.53299 12.8734 7.41216 12.7192 7.32597 12.5456C7.23978 12.372 7.19006 12.1825 7.17985 11.989C7.16965 11.7954 7.19919 11.6018 7.26665 11.42L7.61999 10.4667C7.69527 10.2652 7.72069 10.0485 7.69407 9.83502C7.66745 9.62156 7.58957 9.41772 7.4671 9.24088C7.34462 9.06404 7.18118 8.91946 6.99071 8.81948C6.80025 8.7195 6.58843 8.66708 6.37332 8.66671H3.33332C3.23538 8.66687 3.13861 8.64544 3.04988 8.60396C2.96116 8.56248 2.88267 8.50196 2.81998 8.42671C2.75576 8.35249 2.70872 8.26501 2.68221 8.17051C2.65571 8.07601 2.65039 7.97683 2.66665 7.88004L3.51332 3.21337C3.54172 3.05807 3.62431 2.91788 3.74639 2.81777C3.86848 2.71767 4.02213 2.66413 4.17998 2.66671H9.99998V9.19337ZM13.3333 8.00004C13.3333 8.17685 13.2631 8.34642 13.1381 8.47145C13.013 8.59647 12.8435 8.66671 12.6667 8.66671H11.3333V2.66671H12.6667C12.8435 2.66671 13.013 2.73695 13.1381 2.86197C13.2631 2.98699 13.3333 3.15656 13.3333 3.33337V8.00004Z" fill="#10151D"/>
                              </svg>
                              <span>Incorrect</span>
                          `,n.remove(),e.appendChild(r),setTimeout(()=>{r.remove()},5e3),v.sendFeedback(t.id,!1,"")}}e.appendChild(s)}};var ve=import("https://openfpcdn.io/fingerprintjs/v3").then(i=>i.load());async function U(){let i=document.getElementById("dash-cards-loading"),e=document.getElementById("dash-cards-empty");i.style.display="flex";try{await a.init();let t=await m.fetchRequests();t.length===0?(e.style.display="flex",document.getElementById("results").style.display="none"):(e.style.display="none",E.fillGridResults("results",t))}catch(t){e.style.display="flex",console.log(t)}finally{i.style.display="none"}}document.getElementById("sign-out").onclick=()=>{a.removeAuth()};U();})();
