"use strict";(()=>{var pe=Object.create;var oe=Object.defineProperty;var ge=Object.getOwnPropertyDescriptor;var he=Object.getOwnPropertyNames;var fe=Object.getPrototypeOf,Ee=Object.prototype.hasOwnProperty;var Le=(o=>typeof require!="undefined"?require:typeof Proxy!="undefined"?new Proxy(o,{get:(e,t)=>(typeof require!="undefined"?require:e)[t]}):o)(function(o){if(typeof require!="undefined")return require.apply(this,arguments);throw new Error('Dynamic require of "'+o+'" is not supported')});var ve=(o,e,t,n)=>{if(e&&typeof e=="object"||typeof e=="function")for(let r of he(e))!Ee.call(o,r)&&r!==t&&oe(o,r,{get:()=>e[r],enumerable:!(n=ge(e,r))||n.enumerable});return o};var Se=(o,e,t)=>(t=o!=null?pe(fe(o)):{},ve(e||!o||!o.__esModule?oe(t,"default",{value:o,enumerable:!0}):t,o));var be,qe=import("https://openfpcdn.io/fingerprintjs/v3").then(o=>o.load()),D=async()=>{be=await qe.then(o=>o.get()).then(o=>o.visitorId)};var p="https://api.aiornot.com/",_=class{constructor(e,t){this.apiUrl=e,this.bearerToken=t}async get(e){let t=`${this.apiUrl}/${e}`;try{let n=await fetch(t,{method:"GET",headers:{"Content-Type":"application/json",Authorization:`Bearer ${this.bearerToken}`}});return await this.handleResponse(n)}catch(n){throw console.error("\u041E\u0448\u0438\u0431\u043A\u0430 \u043F\u0440\u0438 \u0432\u044B\u043F\u043E\u043B\u043D\u0435\u043D\u0438\u0438 GET-\u0437\u0430\u043F\u0440\u043E\u0441\u0430:",n),n}}async post(e,t){let n=`${this.apiUrl}/${e}`;try{let r=await fetch(n,{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${this.bearerToken}`},body:JSON.stringify(t)});return await this.handleResponse(r)}catch(r){throw console.error("\u041E\u0448\u0438\u0431\u043A\u0430 \u043F\u0440\u0438 \u0432\u044B\u043F\u043E\u043B\u043D\u0435\u043D\u0438\u0438 POST-\u0437\u0430\u043F\u0440\u043E\u0441\u0430:",r),r}}async postBinary(e,t){let n=`${this.apiUrl}/${e}`;try{let r=await fetch(n,{method:"POST",headers:{Accept:"application/json",Authorization:`Bearer ${this.bearerToken}`},body:t});return await this.handleResponse(r)}catch(r){throw console.error("\u041E\u0448\u0438\u0431\u043A\u0430 \u043F\u0440\u0438 \u0432\u044B\u043F\u043E\u043B\u043D\u0435\u043D\u0438\u0438 POST-\u0437\u0430\u043F\u0440\u043E\u0441\u0430:",r),r}}async delete(e){let t=`${this.apiUrl}/${e}`;try{let n=await fetch(t,{method:"DELETE",headers:{accept:"*/*",Authorization:`Bearer ${this.bearerToken}`}});await this.handleResponse(n)}catch(n){throw console.error("\u041E\u0448\u0438\u0431\u043A\u0430 \u043F\u0440\u0438 \u0432\u044B\u043F\u043E\u043B\u043D\u0435\u043D\u0438\u0438 DELETE-\u0437\u0430\u043F\u0440\u043E\u0441\u0430:",n),n}}async patch(e,t){let n=`${this.apiUrl}/${e}`;try{let r=await fetch(n,{method:"PATCH",headers:{"Content-Type":"application/json",Authorization:`Bearer ${this.bearerToken}`},body:JSON.stringify(t)});return await this.handleResponse(r)}catch(r){throw console.error("\u041E\u0448\u0438\u0431\u043A\u0430 \u043F\u0440\u0438 \u0432\u044B\u043F\u043E\u043B\u043D\u0435\u043D\u0438\u0438 PATCH-\u0437\u0430\u043F\u0440\u043E\u0441\u0430:",r),r}}async handleResponse(e){if(!e.ok){let t=await e.json();throw{status:e.status,message:t}}if(e.status!==204)return await e.json()}};var l=class{constructor(){let e=i.getToken(),t=`${p}/aion/users`;this.client=new _(t,e)}static getInstance(){return l.instance||(l.instance=new l),l.instance}static async fetchRequests(e=0,t=10){try{let n=l.getInstance().client,r=`data?filters=requests&offset=${e}&limit=${t}`;return await n.get(r).then(a=>a.requests.array)}catch(n){return console.error("\u041E\u0448\u0438\u0431\u043A\u0430 getRequests:",n),[]}}static async fetchUsageApi(){try{let e=l.getInstance().client,t="data?filters=api&offset=0&limit=10";return await e.get(t).then(n=>n.api)}catch(e){return console.error("\u041E\u0448\u0438\u0431\u043A\u0430 fetchUsageApi:",e),[]}}static async signUp(){try{return await l.getInstance().client.post("sign_up",{}).then(()=>!1).catch(t=>{if(t.status===400)return!0;throw t})}catch(e){return console.error("\u041E\u0448\u0438\u0431\u043A\u0430 signUp:",e),!1}}static async login(){try{return await l.getInstance().client.get("login")}catch(e){console.error("\u041E\u0448\u0438\u0431\u043A\u0430 login:",e)}}static async delete(){try{return await l.getInstance().client.delete("")}catch(e){console.error("\u041E\u0448\u0438\u0431\u043A\u0430 delete:",e)}}static async fetchApiToken(){try{return await l.getInstance().client.post("api_token",{})}catch(e){console.error("\u041E\u0448\u0438\u0431\u043A\u0430 fetchApiToken:",e)}}static async refreshApiToken(){try{return await l.getInstance().client.patch("api_token",{})}catch(e){console.error("\u041E\u0448\u0438\u0431\u043A\u0430 refreshApiToken:",e)}}},b=l;b.instance=null;var E=class{constructor(){}static isAuth(){return localStorage.getItem(E.key)!==null}static setAuth(){localStorage.setItem(E.key,"true")}static removeAuth(){localStorage.removeItem(E.key)}static async init(){E.isAuth()?await b.login():(await b.signUp(),E.setAuth(),await b.login())}static getToken(){var e;return(e=localStorage.getItem("_ms-mid"))!=null?e:""}static isExpiredToken(){let e=E.getToken();try{let[t,n,r]=e.split("."),a=JSON.parse(atob(n)),h=Math.floor(Date.now()/1e3);return a.exp<h}catch(t){return console.error("\u041E\u0448\u0438\u0431\u043A\u0430 \u043F\u0440\u0438 \u043F\u0440\u043E\u0432\u0435\u0440\u043A\u0435 \u0442\u043E\u043A\u0435\u043D\u0430:",t),!1}}},i=E;i.key="isSignUp";var L=class{constructor(){let e=i.getToken(),t=`${p}/aion/ai-generated`;this.client=new _(t,e)}static getInstance(){return L.instance||(L.instance=new L),L.instance}static async getReportsByBinary(e){let t=L.getInstance().client;try{let n=new FormData;return n.append("binary",e,"uploaded-file.png"),await t.postBinary("reports/binary",n)}catch(n){console.error("Error getReportsByBinary:",n)}}static async getReportsByUrl(e){let t=L.getInstance().client;try{let n=`reports/url?url=${e}`;return await t.post(n,{})}catch(n){console.error("\u041E\u0448\u0438\u0431\u043A\u0430 getReportsByUrl:",n)}}},T=L;T.instance=null;var q=class{constructor(){}static async getReportsByBinary(e,t){let n=`${p}/results/api/detector/reports/raw?source=web&user_id=${t}`,r=new FormData;r.append("binary",e,"file_name.png");let a={method:"POST",headers:{Accept:"application/json",Authorization:`Bearer ${i.getToken()}`},body:r};return await fetch(n,a).then(h=>h.json())}static async getReportsByUrl(e,t){let n=`${p}/results/api/detector/reports/json?source=web&user_id=${t}`,r={method:"POST",headers:{Accept:"application/json","Content-Type":"application/json",Authorization:`Bearer ${i.getToken()}`},body:JSON.stringify({object:e})};return await fetch(n,r).then(a=>a.json())}static async sendFeedback(e,t,n){let r={is_proper_predict:t,comment:n},a=`${p}/results/api/detector/reports/result/${e}`,h={method:"PUT",body:JSON.stringify(r),headers:{Accept:"application/json","Content-Type":"application/json"}};i.isExpiredToken()||(a=`${p}/aion/ai-generated/reports/${e}`,h={method:"PATCH",body:JSON.stringify(r),headers:{Accept:"application/json","Content-Type":"application/json"}}),await fetch(a,h).then(m=>m.json()).then(m=>console.log(m)).catch(m=>console.error(m))}static async getAudioVerdict(e){let t="https://v3-atrium-stage-api.optic.xyz/aion/ai-generated/reports/audio/binary",n=new FormData;n.append("binary",e);let r={method:"POST",headers:{Accept:"application/json",Authorization:`Bearer ${i.getToken()}`},body:n};return await fetch(t,r).then(a=>a.json())}};var C=class{constructor(){}static isLimitExceeded(){if(!i.isExpiredToken())return!1;let e=localStorage.getItem(C.key);return e===null?!1:parseInt(e)>5}static increment(){let e=localStorage.getItem(C.key),t=e===null?1:Number(e)+1;localStorage.setItem(C.key,t.toString())}},g=C;g.key="requestCount";var v=class{static async getReportsByBinary(e,t){return i.isExpiredToken()?await q.getReportsByBinary(e,t):await T.getReportsByBinary(e)}static async getReportsByUrl(e,t){return i.isExpiredToken()?await q.getReportsByUrl(e,t):await T.getReportsByUrl(e)}static async sendFeedback(e,t,n){return await q.sendFeedback(e,t,n)}};var ie=()=>{var se,ne;let o=document.getElementById("report-screen"),e=document.querySelector("#button-report-submit"),t=document.querySelector("#input-report-comment"),n=document.querySelector("#button-report_true"),r=document.querySelector("#button-report_false"),a=document.querySelector("#button-report_close"),h=document.querySelectorAll(".test-image"),m=document.querySelector("#url-error-message"),z=document.querySelector("#processing_cancel"),d=document.querySelector("#file-input"),x=document.querySelector("#ai-or-not-current-image"),I=document.querySelector("#empty-preview-img"),P=document.querySelector("#nsfw-preview-img"),$=document.querySelector("#input-error-text"),B=document.querySelector("#ai-or-not_image-url"),M=document.querySelector("#ai-or-not_submit"),H=document.querySelector("#ai-or-not_dropzone"),f=document.querySelector("#ai-or-not_dropzone-text"),O=document.querySelector("#result-screen_col"),W=document.querySelector("#share-items-hide"),ae=document.querySelector("#ai-or-not-dropzone-counter"),A=document.querySelector("#ai-or-not-dropzone-counter-w"),U,N,w,j,Z;(()=>{if(!i.isExpiredToken())A==null||A.classList.add("hide");else{let s=localStorage.getItem("requestCount")||"0";ae.textContent=Number(s)<=5?s:"5",A.classList.remove("hide")}})(),D();let ce=()=>{let s=document.querySelector("#button-report_false-text");s.classList.remove("hide"),s.textContent=s.getAttribute("report-button-text-default_reported"),r.classList.add("is-reported"),n.classList.add("hide")},le=()=>{let s=document.querySelector("#button-report_true-text");s.classList.remove("hide"),s.textContent=s.getAttribute("report-button-text-default_reported"),n.classList.add("is-reported"),r.classList.add("hide")},de=()=>{t.value="";let s=document.querySelector("#button-report_true-text"),c=document.querySelector("#button-report_false-text");c.classList.add("hide"),s.classList.remove("hide"),s.textContent=s.getAttribute("report-button-text-default"),c.textContent=c.getAttribute("report-button-text-default"),n.classList.remove("is-reported"),r.classList.remove("is-reported"),n.classList.remove("hide"),r.classList.remove("hide")},G=s=>{j=s;let c=!localStorage.getItem("_ms-mid"),S=document.querySelector('[fs-socialshare-element="url"]'),re=`${i.isExpiredToken()?"https://results.aiornot.com/aiornot/":"https://results.aiornot.com/aiornot/users/"}${s}`;S.textContent=re,document.querySelectorAll(".result-screen_share-item").forEach(ye=>{ye.setAttribute("data-url",re)})},J=()=>{f.textContent="We support jpeg, png, webp, gif, tiff, bmp. 10 Mb of maximum size.",f.classList.remove("text-color-red"),$.textContent="Something went wrong. Try again.",m.classList.add("hide")},V=()=>{m.classList.remove("hide")},me=()=>{m.classList.add("hide")},R=()=>{O.classList.contains("hide")?(f.textContent="File is too large (max 10 MB)",f.classList.add("text-color-red")):($.textContent="File is too large (max 10 MB)",m.classList.remove("hide"))};d==null||d.addEventListener("change",()=>{let s=d==null?void 0:d.files[0].size,c=10*1024*1024;s>c?(w=!1,R()):(w=!0,J())});let ue=()=>{document.querySelector("#processing-screen").classList.add("hide"),f.classList.add("error"),H.classList.add("red-border"),f.textContent="Something went wrong. Try again."},K=()=>{f.classList.remove("error"),H.classList.remove("red-border"),f.textContent="We support jpeg, png, webp, gif, tiff, bmp. 10 Mb of maximum size."},k=()=>{document.querySelector("#choose-file-row").classList.add("hide"),document.querySelector("#legal-tip").classList.remove("hide"),document.querySelector("#processing-screen").classList.add("hide"),document.querySelector("#hero-home_title-description").classList.remove("hide"),document.querySelector("#hero-home_gallery").classList.remove("hide"),document.querySelector("#ai-or-not_dropzone").classList.remove("hide"),document.querySelector("#hero-home_drop-zone-divider").classList.remove("hide"),document.querySelector("#result-screen_col").classList.add("hide"),document.querySelector("#result-screen_image-wrapper").classList.add("hide"),x.classList.add("hide"),I.classList.remove("hide"),P.classList.remove("hide")},Q=()=>{de(),x.src="",me(),$.textContent="Something went wrong. Try again.",document.querySelector("#choose-file-row").classList.remove("hide"),document.querySelector("#legal-tip").classList.add("hide"),document.querySelector(".processing-screen_triggers_5").click(),document.querySelector("#processing-screen").classList.remove("hide"),document.querySelector(".processing-screen_triggers_1").click(),document.querySelector("#hero-home_title-description").classList.add("hide"),document.querySelector("#hero-home_gallery").classList.add("hide"),document.querySelector("#ai-or-not_dropzone").classList.add("hide"),document.querySelector("#hero-home_drop-zone-divider").classList.add("hide"),document.querySelector("#result-screen_col").classList.remove("hide"),document.querySelector("#result-screen_image-wrapper").classList.remove("hide")};function X(s=!1){s?(P.classList.remove("hide"),x.classList.add("hide"),I.classList.add("hide"),W.classList.add("hide")):(P.classList.add("hide"),x.classList.remove("hide"),I.classList.add("hide"),W.classList.remove("hide")),document.querySelector(".processing-screen_triggers_3").click(),document.querySelector("#processing-screen").classList.add("hide"),document.querySelector(".processing-screen_triggers_5").click(),document.querySelector("#scroll-to-top-trigger").click(),d.value="",document.querySelector("#ai-or-not_image-url").value=""}let Y=s=>{s==="unknown"?(document.getElementById("title-human").innerHTML="Sorry, but in this case we can't really say if it's AI or Not",document.getElementById("ai-or-not_result-message-50").classList.remove("hide"),document.getElementById("ai-or-not_result-message").classList.add("hide"),document.getElementById("ai-or-not_result-message-50").innerHTML="Probly the uploaded image has most likely been modified or compressed",document.getElementById("title-human").classList.remove("hide"),document.getElementById("title-ai").classList.add("hide")):(document.getElementById("title-ai").innerHTML='This image is generated by <span class="text-color-green">AI</span>',document.getElementById("title-human").innerHTML='This image is generated by <span class="text-color-green">Human</span>',document.getElementById("ai-or-not_result-message-50").classList.add("hide"),document.getElementById("ai-or-not_result-message").classList.remove("hide"),document.querySelector("#ai-or-not_model-name").textContent=s,s==="ai"?(document.getElementById("title-human").classList.add("hide"),document.getElementById("title-ai").classList.remove("hide")):(document.getElementById("title-human").classList.remove("hide"),document.getElementById("title-ai").classList.add("hide")))},ee=async()=>{if(g.isLimitExceeded()){let s=document.getElementById("sign-up");s.style.display="flex",s.style.zIndex=100,k()}else m.classList.add("hide"),Q(),await v.getReportsByUrl(U,Z).then(s=>{g.increment(),G(s.id),x.src=U,Y(s.verdict),X(s.nsfw_detected)}).catch(s=>{O.classList.contains("hide")?V():(V(),k()),console.log(s)})},y=document.body,we=document.querySelector("#dropzone-fullscreen_message-tip"),_e=document.querySelector("#dropzone-fullscreen_message-format");y==null||y.addEventListener("dragover",function(s){s.preventDefault(),document.querySelector(".dropzone-fullscreen").classList.remove("hide")}),y==null||y.addEventListener("dragleave",function(s){s.preventDefault(),document.querySelector(".dropzone-fullscreen").classList.add("hide")}),y==null||y.addEventListener("drop",async function(s){s.preventDefault(),document.querySelector(".dropzone-fullscreen").classList.add("hide");let c=s.dataTransfer.files[0],S=c.size,u=10*1024*1024;S>u?(w=!1,R()):(w=!0,J()),w==!0?await te(c):R()}),d==null||d.addEventListener("change",async s=>{if(w==!0){let S=document.querySelector("#file-input").files[0];await te(S)}else R()});let te=async s=>{if(console.log(s),Q(),g.isLimitExceeded()){let u=document.getElementById("sign-up");u.style.display="flex",u.style.zIndex=100,k();return}let c=document.querySelector("#ai-or-not-current-image"),S=URL.createObjectURL(s);c.setAttribute("src",S),x.classList.remove("hide"),I.classList.add("hide"),await v.getReportsByBinary(s,Z).then(u=>{g.increment(),G(u.id),K(),Y(u.verdict),X(u.nsfw_detected)}).catch(u=>{console.log(u),ue(),k()})};z==null||z.addEventListener("click",function(){K(),k()}),(se=document.querySelector("#ai-or-not_dropzone"))==null||se.addEventListener("click",function(){N="screen_home",d.click()}),(ne=document.querySelector("#choose-file-row"))==null||ne.addEventListener("click",function(){N="screen_result",d.click()}),M==null||M.addEventListener("click",()=>{B.value!=""&&(U=B.value,ee())});let F=document.querySelector("#ai-or-not_image-url");F==null||F.addEventListener("keypress",function(s){s.key==="Enter"&&B.value!=""&&(U=B.value,ee())}),h.forEach(s=>{s==null||s.addEventListener("click",()=>{let c=s.getAttribute("test-image-url");document.querySelector("#ai-or-not_image-url").value=c,document.querySelector("#ai-or-not_submit").click(),document.querySelector("#ai-or-not_image-url").value=""})}),n==null||n.addEventListener("click",()=>{le(),v.sendFeedback(j,!0,"")}),r==null||r.addEventListener("click",()=>{}),a==null||a.addEventListener("click",()=>{}),e==null||e.addEventListener("click",()=>{v.sendFeedback(j,!1,t.value),ce()}),document==null||document.addEventListener("keydown",function(s){s.code==="Escape"&&o.style.display!=="none"&&a.click()}),t==null||t.addEventListener("change",()=>{t.value!=""?e.classList.remove("is-disabled"):e.classList.add("is-disabled")}),t==null||t.addEventListener("input",()=>{t.value!=""?e.classList.remove("is-disabled"):e.classList.add("is-disabled")})};ie();})();