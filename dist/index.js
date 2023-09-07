"use strict";(()=>{var fe=Object.create;var le=Object.defineProperty;var Le=Object.getOwnPropertyDescriptor;var we=Object.getOwnPropertyNames;var Ce=Object.getPrototypeOf,Se=Object.prototype.hasOwnProperty;var be=(i=>typeof require!="undefined"?require:typeof Proxy!="undefined"?new Proxy(i,{get:(e,t)=>(typeof require!="undefined"?require:e)[t]}):i)(function(i){if(typeof require!="undefined")return require.apply(this,arguments);throw new Error('Dynamic require of "'+i+'" is not supported')});var xe=(i,e,t,s)=>{if(e&&typeof e=="object"||typeof e=="function")for(let r of we(e))!Se.call(i,r)&&r!==t&&le(i,r,{get:()=>e[r],enumerable:!(s=Le(e,r))||s.enumerable});return i};var Te=(i,e,t)=>(t=i!=null?fe(Ce(i)):{},xe(e||!i||!i.__esModule?le(t,"default",{value:i,enumerable:!0}):t,i));function ce(i){var e=i.split(".")[1],t=e.replace(/-/g,"+").replace(/_/g,"/"),s=decodeURIComponent(atob(t).split("").map(function(r){return"%"+("00"+r.charCodeAt(0).toString(16)).slice(-2)}).join(""));return JSON.parse(s)}var m="https://v3-atrium-stage-api.optic.xyz",V="https://results.aiornot.com",k=class{constructor(e,t){this.apiUrl=e,this.bearerToken=t}async get(e){let t=`${this.apiUrl}/${e}`;try{let s=await fetch(t,{method:"GET",headers:{"Content-Type":"application/json",Authorization:`Bearer ${this.bearerToken}`}});return await this.handleResponse(s)}catch(s){throw console.error("\u041E\u0448\u0438\u0431\u043A\u0430 \u043F\u0440\u0438 \u0432\u044B\u043F\u043E\u043B\u043D\u0435\u043D\u0438\u0438 GET-\u0437\u0430\u043F\u0440\u043E\u0441\u0430:",s),s}}async post(e,t){let s=`${this.apiUrl}/${e}`;try{let r=await fetch(s,{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${this.bearerToken}`},body:JSON.stringify(t)});return await this.handleResponse(r)}catch(r){throw console.error("\u041E\u0448\u0438\u0431\u043A\u0430 \u043F\u0440\u0438 \u0432\u044B\u043F\u043E\u043B\u043D\u0435\u043D\u0438\u0438 POST-\u0437\u0430\u043F\u0440\u043E\u0441\u0430:",r),r}}async postBinary(e,t){let s=`${this.apiUrl}/${e}`;try{let r=await fetch(s,{method:"POST",headers:{Accept:"application/json",Authorization:`Bearer ${this.bearerToken}`},body:t});return await this.handleResponse(r)}catch(r){throw console.error("\u041E\u0448\u0438\u0431\u043A\u0430 \u043F\u0440\u0438 \u0432\u044B\u043F\u043E\u043B\u043D\u0435\u043D\u0438\u0438 POST-\u0437\u0430\u043F\u0440\u043E\u0441\u0430:",r),r}}async delete(e){let t=`${this.apiUrl}/${e}`;try{let s=await fetch(t,{method:"DELETE",headers:{accept:"*/*",Authorization:`Bearer ${this.bearerToken}`}});await this.handleResponse(s)}catch(s){throw console.error("\u041E\u0448\u0438\u0431\u043A\u0430 \u043F\u0440\u0438 \u0432\u044B\u043F\u043E\u043B\u043D\u0435\u043D\u0438\u0438 DELETE-\u0437\u0430\u043F\u0440\u043E\u0441\u0430:",s),s}}async patch(e,t){let s=`${this.apiUrl}/${e}`;try{let r=await fetch(s,{method:"PATCH",headers:{"Content-Type":"application/json",Authorization:`Bearer ${this.bearerToken}`},body:JSON.stringify(t)});return await this.handleResponse(r)}catch(r){throw console.error("\u041E\u0448\u0438\u0431\u043A\u0430 \u043F\u0440\u0438 \u0432\u044B\u043F\u043E\u043B\u043D\u0435\u043D\u0438\u0438 PATCH-\u0437\u0430\u043F\u0440\u043E\u0441\u0430:",r),r}}async handleResponse(e){if(!e.ok){let t=await e.json();throw{status:e.status,message:t}}if(e.status!==204)return await e.json()}};var d=class{constructor(){let e=o.getToken(),t=`${m}/aion/users`;this.client=new k(t,e)}static getInstance(){return d.instance||(d.instance=new d),d.instance}static async fetchRequests(e=0,t=10){try{let s=d.getInstance().client,r=`data?filters=requests&offset=${e}&limit=${t}`;return await s.get(r).then(a=>a.requests.array)}catch(s){return console.error("\u041E\u0448\u0438\u0431\u043A\u0430 getRequests:",s),[]}}static async fetchUsageApi(){try{let e=d.getInstance().client,t="data?filters=api&offset=0&limit=10";return await e.get(t).then(s=>s.api)}catch(e){return console.error("\u041E\u0448\u0438\u0431\u043A\u0430 fetchUsageApi:",e),[]}}static async signUp(){try{return await d.getInstance().client.post("sign_up",{}).then(()=>!1).catch(t=>{if(t.status===400)return!0;throw t})}catch(e){return console.error("\u041E\u0448\u0438\u0431\u043A\u0430 signUp:",e),!1}}static async login(){try{return await d.getInstance().client.get("login")}catch(e){console.error("\u041E\u0448\u0438\u0431\u043A\u0430 login:",e)}}static async delete(){try{return await d.getInstance().client.delete("")}catch(e){console.error("\u041E\u0448\u0438\u0431\u043A\u0430 delete:",e)}}static async fetchApiToken(){try{return await d.getInstance().client.post("api_token",{})}catch(e){console.error("\u041E\u0448\u0438\u0431\u043A\u0430 fetchApiToken:",e)}}static async refreshApiToken(){try{return await d.getInstance().client.patch("api_token",{})}catch(e){console.error("\u041E\u0448\u0438\u0431\u043A\u0430 refreshApiToken:",e)}}},b=d;b.instance=null;var w=class{constructor(){}static isAuth(){return localStorage.getItem(w.key)!==null}static setAuth(){localStorage.setItem(w.key,"true")}static removeAuth(){localStorage.removeItem(w.key)}static async init(){w.isAuth()?await b.login():(await b.signUp(),w.setAuth(),await b.login())}static getToken(){var e;return(e=localStorage.getItem("_ms-mid"))!=null?e:""}static isExpiredToken(){let e=w.getToken();if((e==null?void 0:e.length)>0){let t=ce(e),s=Date.now()/1e3;return t.exp<s}return!0}},o=w;o.key="isSignUp";var h=class{constructor(){let e=o.getToken(),t=`${m}/aion/ai-generated`;this.client=new k(t,e)}static getInstance(){return h.instance||(h.instance=new h),h.instance}static async getReportsByBinary(e){let t=h.getInstance().client;try{let s=new FormData;return s.append("binary",e,"uploaded-file.png"),await t.postBinary("reports/binary",s)}catch(s){console.error("Error getReportsByBinary:",s)}}static async getReportsByUrl(e){let t=h.getInstance().client;try{let s=`reports/url?url=${e}`;return await t.post(s,{})}catch(s){console.error("\u041E\u0448\u0438\u0431\u043A\u0430 getReportsByUrl:",s)}}static async getAudioVerdict(e){let t=h.getInstance().client;try{let s=new FormData;return s.append("file",e),await t.postBinary("reports/audio/binary",s)}catch(s){console.error("Error getAudioVerdict:",s)}}static async getYoutubeVerdict(e){let t=h.getInstance().client;try{let s={url:e};return await t.post("reports/audio/link",s)}catch(s){console.error("Error getYoutubeVerdict:",s)}}},C=h;C.instance=null;var S=class{constructor(){}static async getReportsByBinary(e,t){let s=`${m}/results/api/detector/reports/raw?source=web&user_id=${t}`,r=new FormData;r.append("binary",e,"file_name.png");let a={method:"POST",headers:{Accept:"application/json",Authorization:`Bearer ${o.getToken()}`},body:r};return await fetch(s,a).then(E=>E.json())}static async getReportsByUrl(e,t){let s=`${m}/results/api/detector/reports/json?source=web&user_id=${t}`,r={method:"POST",headers:{Accept:"application/json","Content-Type":"application/json",Authorization:`Bearer ${o.getToken()}`},body:JSON.stringify({object:e})};return await fetch(s,r).then(a=>a.json())}static async sendFeedback(e,t,s,r=!1){let a={is_proper_predict:t,comment:s},E=`${m}/results/api/detector/reports/result/${e}`,f={method:"PUT",body:JSON.stringify(a),headers:{Accept:"application/json","Content-Type":"application/json"}};(r||!o.isExpiredToken())&&(E=`${m}/aion/ai-generated/reports/${e}`,f={method:"PATCH",body:JSON.stringify(a),headers:{Accept:"application/json","Content-Type":"application/json"}}),await fetch(E,f).then(p=>p.json()).then(p=>console.log(p)).catch(p=>console.error(p))}static async getAudioVerdict(e){let t=`${m}/aion/ai-generated/reports/audio/binary`,s=new FormData;return s.append("file",e),await fetch(t,{method:"POST",headers:{Accept:"application/json",ContentType:"multipart/form-data"},body:s}).then(a=>a.json())}static async getYoutubeVerdict(e){let t=`${m}/aion/ai-generated/reports/audio/link`,s={method:"POST",headers:{Accept:"application/json","Content-Type":"application/json"},body:JSON.stringify({url:e})};return await fetch(t,s).then(r=>r.json())}};var B=class{constructor(){}static isLimitExceeded(){if(!o.isExpiredToken())return!1;let e=localStorage.getItem(B.key);return e===null?!1:parseInt(e)>5}static increment(){let e=localStorage.getItem(B.key),t=e===null?1:Number(e)+1;localStorage.setItem(B.key,t.toString())}},y=B;y.key="requestCount";var v=class{static async getReportsByBinary(e,t){return o.isExpiredToken()?await S.getReportsByBinary(e,t):await C.getReportsByBinary(e)}static async getReportsByUrl(e,t){return o.isExpiredToken()?await S.getReportsByUrl(e,t):await C.getReportsByUrl(e)}static async getAudioVerictByFile(e){return o.isExpiredToken()?await S.getAudioVerdict(e):await C.getAudioVerdict(e)}static async getAudioVerictMock(e){let s=await((r,a)=>new Promise(E=>{setTimeout(()=>{E(a)},r)}))(1500,e);return JSON.parse(`{
            "id": "41994fdd-0161-43a9-b873-581eccbe6d72",
            "report": {
                "version": "0.0.0",
                "verdict": ${s}
            }
        }`)}static async getYoutubeVerict(e){return o.isExpiredToken()?await S.getYoutubeVerdict(e):await C.getYoutubeVerdict(e)}static async sendFeedback(e,t,s,r=!1){return await S.sendFeedback(e,t,s,r)}};var R,qe=import("https://openfpcdn.io/fingerprintjs/v3").then(i=>i.load()),Z=async()=>{R=await qe.then(i=>i.get()).then(i=>i.visitorId)};var de=()=>{var oe,ae;let i=document.getElementById("report-screen"),e=document.querySelector("#button-report-submit"),t=document.querySelector("#input-report-comment"),s=document.querySelector("#button-report_true"),r=document.querySelector("#button-report_false"),a=document.querySelector("#button-report_close"),E=document.querySelectorAll(".test-image"),f=document.querySelector("#url-error-message"),p=document.querySelector("#processing_cancel"),u=document.querySelector("#file-input"),x=document.querySelector("#ai-or-not-current-image"),_=document.querySelector("#empty-preview-img"),U=document.querySelector("#nsfw-preview-img"),$=document.querySelector("#input-error-text"),P=document.querySelector("#ai-or-not_image-url"),z=document.querySelector("#ai-or-not_submit"),O=document.querySelector("#ai-or-not_dropzone"),L=document.querySelector("#ai-or-not_dropzone-text"),Y=document.querySelector("#result-screen_col"),N=document.querySelector("#share-items-hide"),ue=document.querySelector("#ai-or-not-dropzone-counter"),H=document.querySelector("#ai-or-not-dropzone-counter-w"),M,W,T,D;(()=>{if(!o.isExpiredToken())H==null||H.classList.add("hide");else{let n=localStorage.getItem("requestCount")||"0";ue.textContent=Number(n)<=5?n:"5",H.classList.remove("hide")}})(),Z();let me=()=>{let n=document.querySelector("#button-report_false-text");n.classList.remove("hide"),n.textContent=n.getAttribute("report-button-text-default_reported"),r.classList.add("is-reported"),s.classList.add("hide")},he=()=>{let n=document.querySelector("#button-report_true-text");n.classList.remove("hide"),n.textContent=n.getAttribute("report-button-text-default_reported"),s.classList.add("is-reported"),r.classList.add("hide")},pe=()=>{t.value="";let n=document.querySelector("#button-report_true-text"),l=document.querySelector("#button-report_false-text");l.classList.add("hide"),n.classList.remove("hide"),n.textContent=n.getAttribute("report-button-text-default"),l.textContent=l.getAttribute("report-button-text-default"),s.classList.remove("is-reported"),r.classList.remove("is-reported"),s.classList.remove("hide"),r.classList.remove("hide")},J=n=>{D=n;let l=document.querySelector('[fs-socialshare-element="url"]'),c=`${o.isExpiredToken()?`${V}/aiornot/`:`${V}/aiornot/users/`}${n}`;l.textContent=c,document.querySelectorAll(".result-screen_share-item").forEach(Ee=>{Ee.setAttribute("data-url",c)})},G=()=>{L.textContent="We support jpeg, png, webp, gif, tiff, bmp. 10 Mb of maximum size.",L.classList.remove("text-color-red"),$.textContent="Something went wrong. Try again.",f.classList.add("hide")},K=()=>{f.classList.remove("hide")},ge=()=>{f.classList.add("hide")},A=()=>{Y.classList.contains("hide")?(L.textContent="File is too large (max 10 MB)",L.classList.add("text-color-red")):($.textContent="File is too large (max 10 MB)",f.classList.remove("hide"))};u==null||u.addEventListener("change",()=>{let n=u==null?void 0:u.files[0].size,l=10*1024*1024;n>l?(T=!1,A()):(T=!0,G())});let ye=()=>{document.querySelector("#processing-screen").classList.add("hide"),L.classList.add("error"),O.classList.add("red-border"),L.textContent="Something went wrong. Try again."},X=()=>{L.classList.remove("error"),O.classList.remove("red-border"),L.textContent="We support jpeg, png, webp, gif, tiff, bmp. 10 Mb of maximum size."},I=()=>{document.querySelector("#choose-file-row").classList.add("hide"),document.querySelector("#legal-tip").classList.remove("hide"),document.querySelector("#processing-screen").classList.add("hide"),document.querySelector("#hero-home_title-description").classList.remove("hide"),document.querySelector("#hero-home_gallery").classList.remove("hide"),document.querySelector("#ai-or-not_dropzone").classList.remove("hide"),document.querySelector("#hero-home_drop-zone-divider").classList.remove("hide"),document.querySelector("#result-screen_col").classList.add("hide"),document.querySelector("#result-screen_image-wrapper").classList.add("hide"),x.classList.add("hide"),_.classList.remove("hide"),U.classList.remove("hide")},Q=()=>{pe(),x.src="",ge(),$.textContent="Something went wrong. Try again.",document.querySelector("#choose-file-row").classList.remove("hide"),document.querySelector("#legal-tip").classList.add("hide"),document.querySelector(".processing-screen_triggers_5").click(),document.querySelector("#processing-screen").classList.remove("hide"),document.querySelector(".processing-screen_triggers_1").click(),document.querySelector("#hero-home_title-description").classList.add("hide"),document.querySelector("#hero-home_gallery").classList.add("hide"),document.querySelector("#ai-or-not_dropzone").classList.add("hide"),document.querySelector("#hero-home_drop-zone-divider").classList.add("hide"),document.querySelector("#result-screen_col").classList.remove("hide"),document.querySelector("#result-screen_image-wrapper").classList.remove("hide")};function ee(n=!1){n?(U.classList.remove("hide"),x.classList.add("hide"),_.classList.add("hide"),N.classList.add("hide")):(U.classList.add("hide"),x.classList.remove("hide"),_.classList.add("hide"),N.classList.remove("hide")),document.querySelector(".processing-screen_triggers_3").click(),document.querySelector("#processing-screen").classList.add("hide"),document.querySelector(".processing-screen_triggers_5").click(),document.querySelector("#scroll-to-top-trigger").click(),u.value="",document.querySelector("#ai-or-not_image-url").value=""}let te=n=>{n==="unknown"?(document.getElementById("title-human").innerHTML="Sorry, but in this case we can't really say if it's AI or Not",document.getElementById("ai-or-not_result-message-50").classList.remove("hide"),document.getElementById("ai-or-not_result-message").classList.add("hide"),document.getElementById("ai-or-not_result-message-50").innerHTML="Probly the uploaded image has most likely been modified or compressed",document.getElementById("title-human").classList.remove("hide"),document.getElementById("title-ai").classList.add("hide")):(document.getElementById("title-ai").innerHTML='This image is generated by <span class="text-color-green">AI</span>',document.getElementById("title-human").innerHTML='This image is generated by <span class="text-color-green">Human</span>',document.getElementById("ai-or-not_result-message-50").classList.add("hide"),document.getElementById("ai-or-not_result-message").classList.remove("hide"),document.querySelector("#ai-or-not_model-name").textContent=n,n==="ai"?(document.getElementById("title-human").classList.add("hide"),document.getElementById("title-ai").classList.remove("hide")):(document.getElementById("title-human").classList.remove("hide"),document.getElementById("title-ai").classList.add("hide")))},se=async()=>{if(y.isLimitExceeded()){let n=document.getElementById("sign-up");n.style.display="flex",n.style.zIndex=100,I()}else f.classList.add("hide"),Q(),await v.getReportsByUrl(M,R).then(n=>{y.increment(),J(n.id),x.src=M,te(n.verdict),ee(n.nsfw_detected)}).catch(n=>{Y.classList.contains("hide")?K():(K(),I()),console.log(n)})},g=document.body,Ie=document.querySelector("#dropzone-fullscreen_message-tip"),Be=document.querySelector("#dropzone-fullscreen_message-format");g==null||g.addEventListener("dragover",function(n){n.preventDefault(),document.querySelector(".dropzone-fullscreen").classList.remove("hide")}),g==null||g.addEventListener("dragleave",function(n){n.preventDefault(),document.querySelector(".dropzone-fullscreen").classList.add("hide")}),g==null||g.addEventListener("drop",async function(n){n.preventDefault(),document.querySelector(".dropzone-fullscreen").classList.add("hide");let l=n.dataTransfer.files[0],q=l.size,c=10*1024*1024;q>c?(T=!1,A()):(T=!0,G()),T==!0?await ne(l):A()}),u==null||u.addEventListener("change",async n=>{if(T==!0){let q=document.querySelector("#file-input").files[0];await ne(q)}else A()});let ne=async n=>{if(console.log(n),Q(),y.isLimitExceeded()){let c=document.getElementById("sign-up");c.style.display="flex",c.style.zIndex=100,I();return}let l=document.querySelector("#ai-or-not-current-image"),q=URL.createObjectURL(n);l.setAttribute("src",q),x.classList.remove("hide"),_.classList.add("hide"),await v.getReportsByBinary(n,R).then(c=>{y.increment(),J(c.id),X(),te(c.verdict),ee(c.nsfw_detected)}).catch(c=>{console.log(c),ye(),I()})};p==null||p.addEventListener("click",function(){X(),I()}),(oe=document.querySelector("#ai-or-not_dropzone"))==null||oe.addEventListener("click",function(){W="screen_home",u.click()}),(ae=document.querySelector("#choose-file-row"))==null||ae.addEventListener("click",function(){W="screen_result",u.click()}),z==null||z.addEventListener("click",()=>{P.value!=""&&(M=P.value,se())});let F=document.querySelector("#ai-or-not_image-url");F==null||F.addEventListener("keypress",function(n){n.key==="Enter"&&P.value!=""&&(M=P.value,se())}),E.forEach(n=>{n==null||n.addEventListener("click",()=>{let l=n.getAttribute("test-image-url");document.querySelector("#ai-or-not_image-url").value=l,document.querySelector("#ai-or-not_submit").click(),document.querySelector("#ai-or-not_image-url").value=""})}),s==null||s.addEventListener("click",()=>{he(),v.sendFeedback(D,!0,"")}),r==null||r.addEventListener("click",()=>{}),a==null||a.addEventListener("click",()=>{}),e==null||e.addEventListener("click",()=>{v.sendFeedback(D,!1,t.value),me()}),document==null||document.addEventListener("keydown",function(n){n.code==="Escape"&&i.style.display!=="none"&&a.click()}),t==null||t.addEventListener("change",()=>{t.value!=""?e.classList.remove("is-disabled"):e.classList.add("is-disabled")}),t==null||t.addEventListener("input",()=>{t.value!=""?e.classList.remove("is-disabled"):e.classList.add("is-disabled")});let re=document.querySelector("#ai-or-not_image-url"),ie=document.querySelector("#ai-or-not_submit");re.addEventListener("input",function(){let n=re.value.trim();ve(n)?ie.classList.remove("is-disabled"):ie.classList.add("is-disabled")});let ve=n=>{try{return new URL(n),!0}catch{return!1}},j=document.getElementById("close-sign-up");j==null||j.addEventListener("click",()=>{let n=document.getElementById("sign-up");n.style.display="none",n.style.zIndex=0})};de();})();
