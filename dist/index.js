"use strict";(()=>{var we=Object.create;var de=Object.defineProperty;var Ce=Object.getOwnPropertyDescriptor;var Se=Object.getOwnPropertyNames;var be=Object.getPrototypeOf,xe=Object.prototype.hasOwnProperty;var Te=(i=>typeof require!="undefined"?require:typeof Proxy!="undefined"?new Proxy(i,{get:(e,t)=>(typeof require!="undefined"?require:e)[t]}):i)(function(i){if(typeof require!="undefined")return require.apply(this,arguments);throw new Error('Dynamic require of "'+i+'" is not supported')});var qe=(i,e,t,s)=>{if(e&&typeof e=="object"||typeof e=="function")for(let r of Se(e))!xe.call(i,r)&&r!==t&&de(i,r,{get:()=>e[r],enumerable:!(s=Ce(e,r))||s.enumerable});return i};var ke=(i,e,t)=>(t=i!=null?we(be(i)):{},qe(e||!i||!i.__esModule?de(t,"default",{value:i,enumerable:!0}):t,i));function ue(i){var e=i.split(".")[1],t=e.replace(/-/g,"+").replace(/_/g,"/"),s=decodeURIComponent(atob(t).split("").map(function(r){return"%"+("00"+r.charCodeAt(0).toString(16)).slice(-2)}).join(""));return JSON.parse(s)}var m="https://v3-atrium-prod-api.optic.xyz",V="https://results.aiornot.com",k=class{constructor(e,t){this.apiUrl=e,this.bearerToken=t}async get(e){let t=`${this.apiUrl}/${e}`;try{let s=await fetch(t,{method:"GET",headers:{"Content-Type":"application/json",Authorization:`Bearer ${this.bearerToken}`}});return await this.handleResponse(s)}catch(s){throw console.error("\u041E\u0448\u0438\u0431\u043A\u0430 \u043F\u0440\u0438 \u0432\u044B\u043F\u043E\u043B\u043D\u0435\u043D\u0438\u0438 GET-\u0437\u0430\u043F\u0440\u043E\u0441\u0430:",s),s}}async post(e,t){let s=`${this.apiUrl}/${e}`;try{let r=await fetch(s,{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${this.bearerToken}`},body:JSON.stringify(t)});return await this.handleResponse(r)}catch(r){throw console.error("\u041E\u0448\u0438\u0431\u043A\u0430 \u043F\u0440\u0438 \u0432\u044B\u043F\u043E\u043B\u043D\u0435\u043D\u0438\u0438 POST-\u0437\u0430\u043F\u0440\u043E\u0441\u0430:",r),r}}async postBinary(e,t){let s=`${this.apiUrl}/${e}`;try{let r=await fetch(s,{method:"POST",headers:{Accept:"application/json",Authorization:`Bearer ${this.bearerToken}`},body:t});return await this.handleResponse(r)}catch(r){throw console.error("\u041E\u0448\u0438\u0431\u043A\u0430 \u043F\u0440\u0438 \u0432\u044B\u043F\u043E\u043B\u043D\u0435\u043D\u0438\u0438 POST-\u0437\u0430\u043F\u0440\u043E\u0441\u0430:",r),r}}async delete(e){let t=`${this.apiUrl}/${e}`;try{let s=await fetch(t,{method:"DELETE",headers:{accept:"*/*",Authorization:`Bearer ${this.bearerToken}`}});await this.handleResponse(s)}catch(s){throw console.error("\u041E\u0448\u0438\u0431\u043A\u0430 \u043F\u0440\u0438 \u0432\u044B\u043F\u043E\u043B\u043D\u0435\u043D\u0438\u0438 DELETE-\u0437\u0430\u043F\u0440\u043E\u0441\u0430:",s),s}}async patch(e,t){let s=`${this.apiUrl}/${e}`;try{let r=await fetch(s,{method:"PATCH",headers:{"Content-Type":"application/json",Authorization:`Bearer ${this.bearerToken}`},body:JSON.stringify(t)});return await this.handleResponse(r)}catch(r){throw console.error("\u041E\u0448\u0438\u0431\u043A\u0430 \u043F\u0440\u0438 \u0432\u044B\u043F\u043E\u043B\u043D\u0435\u043D\u0438\u0438 PATCH-\u0437\u0430\u043F\u0440\u043E\u0441\u0430:",r),r}}async handleResponse(e){if(!e.ok){let t=await e.json();throw{status:e.status,message:t}}if(e.status!==204)return await e.json()}};var d=class{constructor(){let e=o.getToken(),t=`${m}/aion/users`;this.client=new k(t,e)}static getInstance(){return d.instance||(d.instance=new d),d.instance}static async fetchRequests(e=0,t=10){try{let s=d.getInstance().client,r=`data?filters=requests&offset=${e}&limit=${t}`;return await s.get(r).then(a=>a.requests.array)}catch(s){return console.error("\u041E\u0448\u0438\u0431\u043A\u0430 getRequests:",s),[]}}static async fetchUsageApi(){try{let e=d.getInstance().client,t="data?filters=api&offset=0&limit=10";return await e.get(t).then(s=>s.api)}catch(e){return console.error("\u041E\u0448\u0438\u0431\u043A\u0430 fetchUsageApi:",e),[]}}static async signUp(){try{return await d.getInstance().client.post("sign_up",{}).then(()=>!1).catch(t=>{if(t.status===400)return!0;throw t})}catch(e){return console.error("\u041E\u0448\u0438\u0431\u043A\u0430 signUp:",e),!1}}static async login(){try{return await d.getInstance().client.get("login")}catch(e){console.error("\u041E\u0448\u0438\u0431\u043A\u0430 login:",e)}}static async delete(){try{return await d.getInstance().client.delete("")}catch(e){console.error("\u041E\u0448\u0438\u0431\u043A\u0430 delete:",e)}}static async fetchApiToken(){try{return await d.getInstance().client.post("api_token",{})}catch(e){console.error("\u041E\u0448\u0438\u0431\u043A\u0430 fetchApiToken:",e)}}static async refreshApiToken(){try{return await d.getInstance().client.patch("api_token",{})}catch(e){console.error("\u041E\u0448\u0438\u0431\u043A\u0430 refreshApiToken:",e)}}},b=d;b.instance=null;var L=class{constructor(){}static isAuth(){return localStorage.getItem(L.key)!==null}static setAuth(){localStorage.setItem(L.key,"true")}static removeAuth(){localStorage.removeItem(L.key)}static async init(){L.isAuth()?await b.login():(await b.signUp(),L.setAuth(),await b.login())}static getToken(){var e;return(e=localStorage.getItem("_ms-mid"))!=null?e:""}static isExpiredToken(){let e=L.getToken();if((e==null?void 0:e.length)>0){let t=ue(e),s=Date.now()/1e3;return t.exp<s}return!0}},o=L;o.key="isSignUp";var h=class{constructor(){let e=o.getToken(),t=`${m}/aion/ai-generated`;this.client=new k(t,e)}static getInstance(){return h.instance||(h.instance=new h),h.instance}static async getReportsByBinary(e){let t=h.getInstance().client;try{let s=new FormData;return s.append("binary",e,"uploaded-file.png"),await t.postBinary("reports/binary",s)}catch(s){console.error("Error getReportsByBinary:",s)}}static async getReportsByUrl(e){let t=h.getInstance().client;try{let s=`reports/url?url=${e}`;return await t.post(s,{})}catch(s){console.error("\u041E\u0448\u0438\u0431\u043A\u0430 getReportsByUrl:",s)}}static async getAudioVerdict(e){let t=h.getInstance().client;try{let s=new FormData;return s.append("file",e),await t.postBinary("reports/audio/binary",s)}catch(s){console.error("Error getAudioVerdict:",s)}}static async getYoutubeVerdict(e){let t=h.getInstance().client;try{let s={url:e};return await t.post("reports/audio/link",s)}catch(s){console.error("Error getYoutubeVerdict:",s)}}},w=h;w.instance=null;var C=class{constructor(){}static async getReportsByBinary(e,t){let s=`${m}/results/api/detector/reports/raw?source=web&user_id=${t}`,r=new FormData;r.append("binary",e,"file_name.png");let a={method:"POST",headers:{Accept:"application/json",Authorization:`Bearer ${o.getToken()}`},body:r};return await fetch(s,a).then(v=>v.json())}static async getReportsByUrl(e,t){let s=`${m}/results/api/detector/reports/json?source=web&user_id=${t}`,r={method:"POST",headers:{Accept:"application/json","Content-Type":"application/json",Authorization:`Bearer ${o.getToken()}`},body:JSON.stringify({object:e})};return await fetch(s,r).then(a=>a.json())}static async sendFeedback(e,t,s,r=!1){let a={is_proper_predict:t,comment:s},v=`${m}/results/api/detector/reports/result/${e}`,f={method:"PUT",body:JSON.stringify(a),headers:{Accept:"application/json","Content-Type":"application/json"}};(r||!o.isExpiredToken())&&(v=`${m}/aion/ai-generated/reports/${e}`,f={method:"PATCH",body:JSON.stringify(a),headers:{Accept:"application/json","Content-Type":"application/json"}}),await fetch(v,f).then(p=>p.json()).then(p=>console.log(p)).catch(p=>console.error(p))}static async getAudioVerdict(e){let t=`${m}/aion/ai-generated/reports/audio/binary`,s=new FormData;return s.append("file",e),await fetch(t,{method:"POST",headers:{Accept:"application/json",ContentType:"multipart/form-data"},body:s}).then(a=>a.json())}static async getYoutubeVerdict(e){let t=`${m}/aion/ai-generated/reports/audio/link`,s={method:"POST",headers:{Accept:"application/json","Content-Type":"application/json"},body:JSON.stringify({url:e})};return await fetch(t,s).then(r=>r.json())}};var I=class{constructor(){}static isLimitExceeded(){if(!o.isExpiredToken())return!1;let e=localStorage.getItem(I.key);return e===null?!1:parseInt(e)>5}static increment(){let e=localStorage.getItem(I.key),t=e===null?1:Number(e)+1;localStorage.setItem(I.key,t.toString())}},S=I;S.key="requestCount";var y=class{static async getReportsByBinary(e,t){return o.isExpiredToken()?await C.getReportsByBinary(e,t):await w.getReportsByBinary(e)}static async getReportsByUrl(e,t){return o.isExpiredToken()?await C.getReportsByUrl(e,t):await w.getReportsByUrl(e)}static async getAudioVerictByFile(e){return o.isExpiredToken()?await C.getAudioVerdict(e):await w.getAudioVerdict(e)}static async getAudioVerictMock(e){let s=await((r,a)=>new Promise(v=>{setTimeout(()=>{v(a)},r)}))(1500,e);return JSON.parse(`{
            "id": "41994fdd-0161-43a9-b873-581eccbe6d72",
            "report": {
                "version": "0.0.0",
                "verdict": ${s}
            }
        }`)}static async getYoutubeVerict(e){return o.isExpiredToken()?await C.getYoutubeVerdict(e):await w.getYoutubeVerdict(e)}static async sendFeedback(e,t,s,r=!1){return await C.sendFeedback(e,t,s,r)}};var R,Be=import("https://openfpcdn.io/fingerprintjs/v3").then(i=>i.load()),Z=async()=>{R=await Be.then(i=>i.get()).then(i=>i.visitorId)};var me=()=>{var le,ce;let i=document.getElementById("report-screen"),e=document.querySelector("#button-report-submit"),t=document.querySelector("#input-report-comment"),s=document.querySelector("#button-report_true"),r=document.querySelector("#button-report_false"),a=document.querySelector("#button-report_close"),v=document.querySelectorAll(".test-image"),f=document.querySelector("#url-error-message"),p=document.querySelector("#processing_cancel"),u=document.querySelector("#file-input"),x=document.querySelector("#ai-or-not-current-image"),_=document.querySelector("#empty-preview-img"),U=document.querySelector("#nsfw-preview-img"),$=document.querySelector("#input-error-text"),H=document.querySelector("#ai-or-not_image-url"),z=document.querySelector("#ai-or-not_submit"),N=document.querySelector("#ai-or-not_dropzone"),E=document.querySelector("#ai-or-not_dropzone-text"),W=document.querySelector("#result-screen_col"),J=document.querySelector("#share-items-hide"),he=document.querySelector("#ai-or-not-dropzone-counter"),M=document.querySelector("#ai-or-not-dropzone-counter-w"),P,G,T,D;(()=>{if(!o.isExpiredToken())M==null||M.classList.add("hide");else{let n=localStorage.getItem("requestCount")||"0";he.textContent=Number(n)<=5?n:"5",M.classList.remove("hide")}})(),Z();let pe=()=>{let n=document.querySelector("#button-report_false-text");n.classList.remove("hide"),n.textContent=n.getAttribute("report-button-text-default_reported"),r.classList.add("is-reported"),s.classList.add("hide")},ge=()=>{let n=document.querySelector("#button-report_true-text");n.classList.remove("hide"),n.textContent=n.getAttribute("report-button-text-default_reported"),s.classList.add("is-reported"),r.classList.add("hide")},ye=()=>{t.value="";let n=document.querySelector("#button-report_true-text"),l=document.querySelector("#button-report_false-text");l.classList.add("hide"),n.classList.remove("hide"),n.textContent=n.getAttribute("report-button-text-default"),l.textContent=l.getAttribute("report-button-text-default"),s.classList.remove("is-reported"),r.classList.remove("is-reported"),s.classList.remove("hide"),r.classList.remove("hide")},K=n=>{D=n;let l=document.querySelector('[fs-socialshare-element="url"]'),c=`${o.isExpiredToken()?`${V}/aiornot/`:`${V}/aiornot/users/`}${n}`;l.textContent=c,document.querySelectorAll(".result-screen_share-item").forEach(Le=>{Le.setAttribute("data-url",c)})},X=()=>{E.textContent="We support jpeg, png, webp, gif, tiff, bmp. 10 Mb of maximum size.",E.classList.remove("text-color-red"),$.textContent="Something went wrong. Try again.",f.classList.add("hide")},Q=()=>{f.classList.remove("hide")},ve=()=>{f.classList.add("hide")},A=()=>{W.classList.contains("hide")?(E.textContent="File is too large (max 10 MB)",E.classList.add("text-color-red")):($.textContent="File is too large (max 10 MB)",f.classList.remove("hide"))};u==null||u.addEventListener("change",()=>{let n=u==null?void 0:u.files[0].size,l=10*1024*1024;n>l?(T=!1,A()):(T=!0,X())});let fe=()=>{document.querySelector("#processing-screen").classList.add("hide"),E.classList.add("error"),N.classList.add("red-border"),E.textContent="Something went wrong. Try again."},ee=()=>{E.classList.remove("error"),N.classList.remove("red-border"),E.textContent="We support jpeg, png, webp, gif, tiff, bmp. 10 Mb of maximum size."},B=()=>{document.querySelector("#choose-file-row").classList.add("hide"),document.querySelector("#legal-tip").classList.remove("hide"),document.querySelector("#processing-screen").classList.add("hide"),document.querySelector("#hero-home_title-description").classList.remove("hide"),document.querySelector("#hero-home_gallery").classList.remove("hide"),document.querySelector("#ai-or-not_dropzone").classList.remove("hide"),document.querySelector("#hero-home_drop-zone-divider").classList.remove("hide"),document.querySelector("#result-screen_col").classList.add("hide"),document.querySelector("#result-screen_image-wrapper").classList.add("hide"),x.classList.add("hide"),_.classList.remove("hide"),U.classList.remove("hide")},te=()=>{ye(),x.src="",ve(),$.textContent="Something went wrong. Try again.",document.querySelector("#choose-file-row").classList.remove("hide"),document.querySelector("#legal-tip").classList.add("hide"),document.querySelector(".processing-screen_triggers_5").click(),document.querySelector("#processing-screen").classList.remove("hide"),document.querySelector(".processing-screen_triggers_1").click(),document.querySelector("#hero-home_title-description").classList.add("hide"),document.querySelector("#hero-home_gallery").classList.add("hide"),document.querySelector("#ai-or-not_dropzone").classList.add("hide"),document.querySelector("#hero-home_drop-zone-divider").classList.add("hide"),document.querySelector("#result-screen_col").classList.remove("hide"),document.querySelector("#result-screen_image-wrapper").classList.remove("hide")};function se(n=!1){n?(U.classList.remove("hide"),x.classList.add("hide"),_.classList.add("hide"),J.classList.add("hide")):(U.classList.add("hide"),x.classList.remove("hide"),_.classList.add("hide"),J.classList.remove("hide")),document.querySelector(".processing-screen_triggers_3").click(),document.querySelector("#processing-screen").classList.add("hide"),document.querySelector(".processing-screen_triggers_5").click(),document.querySelector("#scroll-to-top-trigger").click(),u.value="",document.querySelector("#ai-or-not_image-url").value=""}let ne=n=>{n==="unknown"?(document.getElementById("title-human").innerHTML="Sorry, but in this case we can't really say if it's AI or Not",document.getElementById("ai-or-not_result-message-50").classList.remove("hide"),document.getElementById("ai-or-not_result-message").classList.add("hide"),document.getElementById("ai-or-not_result-message-50").innerHTML="Probly the uploaded image has most likely been modified or compressed",document.getElementById("title-human").classList.remove("hide"),document.getElementById("title-ai").classList.add("hide")):(document.getElementById("title-ai").innerHTML='This image is generated by <span class="text-color-green">AI</span>',document.getElementById("title-human").innerHTML='This image is generated by <span class="text-color-green">Human</span>',document.getElementById("ai-or-not_result-message-50").classList.add("hide"),document.getElementById("ai-or-not_result-message").classList.remove("hide"),document.querySelector("#ai-or-not_model-name").textContent=n,n==="ai"?(document.getElementById("title-human").classList.add("hide"),document.getElementById("title-ai").classList.remove("hide")):(document.getElementById("title-human").classList.remove("hide"),document.getElementById("title-ai").classList.add("hide")))},re=async()=>{if(S.isLimitExceeded()){let n=document.getElementById("sign-up");n.style.display="flex",n.style.zIndex=100,B()}else f.classList.add("hide"),te(),await y.getReportsByUrl(P,R).then(n=>{S.increment(),K(n.id),x.src=P,ne(n.verdict),se(n.nsfw_detected)}).catch(n=>{W.classList.contains("hide")?Q():(Q(),B()),console.log(n)})},g=document.body,_e=document.querySelector("#dropzone-fullscreen_message-tip"),He=document.querySelector("#dropzone-fullscreen_message-format");g==null||g.addEventListener("dragover",function(n){n.preventDefault(),document.querySelector(".dropzone-fullscreen").classList.remove("hide")}),g==null||g.addEventListener("dragleave",function(n){n.preventDefault(),document.querySelector(".dropzone-fullscreen").classList.add("hide")}),g==null||g.addEventListener("drop",async function(n){n.preventDefault(),document.querySelector(".dropzone-fullscreen").classList.add("hide");let l=n.dataTransfer.files[0],q=l.size,c=10*1024*1024;q>c?(T=!1,A()):(T=!0,X()),T==!0?await ie(l):A()}),u==null||u.addEventListener("change",async n=>{if(T==!0){let q=document.querySelector("#file-input").files[0];await ie(q)}else A()});let ie=async n=>{if(console.log(n),te(),S.isLimitExceeded()){let c=document.getElementById("sign-up");c.style.display="flex",c.style.zIndex=100,B();return}let l=document.querySelector("#ai-or-not-current-image"),q=URL.createObjectURL(n);l.setAttribute("src",q),x.classList.remove("hide"),_.classList.add("hide"),await y.getReportsByBinary(n,R).then(c=>{S.increment(),K(c.id),ee(),ne(c.verdict),se(c.nsfw_detected)}).catch(c=>{console.log(c),fe(),B()})};p==null||p.addEventListener("click",function(){ee(),B()}),(le=document.querySelector("#ai-or-not_dropzone"))==null||le.addEventListener("click",function(){G="screen_home",u.click()}),(ce=document.querySelector("#choose-file-row"))==null||ce.addEventListener("click",function(){G="screen_result",u.click()}),z==null||z.addEventListener("click",()=>{H.value!=""&&(P=H.value,re())});let F=document.querySelector("#ai-or-not_image-url");F==null||F.addEventListener("keypress",function(n){n.key==="Enter"&&H.value!=""&&(P=H.value,re())}),v.forEach(n=>{n==null||n.addEventListener("click",()=>{let l=n.getAttribute("test-image-url");document.querySelector("#ai-or-not_image-url").value=l,document.querySelector("#ai-or-not_submit").click(),document.querySelector("#ai-or-not_image-url").value=""})}),s==null||s.addEventListener("click",()=>{ge(),y.sendFeedback(D,!0,"")}),r==null||r.addEventListener("click",()=>{}),a==null||a.addEventListener("click",()=>{}),e==null||e.addEventListener("click",()=>{y.sendFeedback(D,!1,t.value),pe()}),document==null||document.addEventListener("keydown",function(n){n.code==="Escape"&&i.style.display!=="none"&&a.click()}),t==null||t.addEventListener("change",()=>{t.value!=""?e.classList.remove("is-disabled"):e.classList.add("is-disabled")}),t==null||t.addEventListener("input",()=>{t.value!=""?e.classList.remove("is-disabled"):e.classList.add("is-disabled")});let oe=document.querySelector("#ai-or-not_image-url"),ae=document.querySelector("#ai-or-not_submit");oe.addEventListener("input",function(){let n=oe.value.trim();Ee(n)?ae.classList.remove("is-disabled"):ae.classList.add("is-disabled")});let Ee=n=>{try{return new URL(n),!0}catch{return!1}},j=document.getElementById("close-sign-up");j==null||j.addEventListener("click",()=>{let n=document.getElementById("sign-up");n.style.display="none",n.style.zIndex=0})};var O=class{constructor(e,t,s){this.progressInterval=0;this.playPauseBtn=e,this.progressSlider=t,this.track=s,this.dragging=!1,this.progressInterval=0,this.initListeners()}initListeners(){this.playPauseBtn.addEventListener("click",()=>this.playPauseVideo()),this.progressSlider.addEventListener("mousedown",e=>this.mouseDown(e)),document.addEventListener("mousemove",e=>this.mouseMove(e)),document.addEventListener("mouseup",()=>this.mouseUp())}onYouTubeIframeAPIReady(e){this.player=new YT.Player("youtube-player",{height:"48",width:"48",videoId:e,events:{onReady:t=>this.onPlayerReady(t),onStateChange:t=>this.onPlayerStateChange(t)}})}onPlayerReady(e){this.player.setVolume(30);let t=new CustomEvent(O.eventName,{detail:e.target.getVideoData()});document.dispatchEvent(t)}playPauseVideo(){let e=this.player.getPlayerState();e===YT.PlayerState.ENDED&&(this.player.seekTo(0),this.player.playVideo()),e===YT.PlayerState.PAUSED||e===YT.PlayerState.CUED?(this.player.playVideo(),this.playPauseBtn.innerHTML=` <svg xmlns="http://www.w3.org/2000/svg" width="50%" height="50%" viewBox="0 0 16 16" fill="none">
                <rect x="2.5" y="1.5" width="4" height="13" rx="1.5" stroke="white"/>
                <rect x="9.5" y="1.5" width="4" height="13" rx="1.5" stroke="white"/>
            </svg>`,this.progressInterval=setInterval(()=>{if(!this.dragging){let t=this.player.getCurrentTime()/this.player.getDuration()*100;this.track.style.width=t+"%",t>=100&&this.finishVideo()}},1e3)):(this.player.pauseVideo(),this.playPauseBtn.innerHTML=`
            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32" fill="none">
                <path d="M13.3375 10.8944L21.7598 15.1056C22.4968 15.4741 22.4968 16.5259 21.7598 16.8944L13.3375 21.1056C12.3402 21.6042 11.1667 20.879 11.1667 19.7639V12.2361C11.1667 11.121 12.3402 10.3958 13.3375 10.8944Z" stroke="white"/>
            </svg>`,clearInterval(this.progressInterval))}onPlayerStateChange(e){e.data===YT.PlayerState.ENDED&&this.finishVideo()}mouseDown(e){this.dragging=!0,clearInterval(this.progressInterval),this.updateProgress(e)}mouseMove(e){this.dragging&&this.updateProgress(e)}mouseUp(){this.dragging=!1,this.progressInterval=setInterval(()=>{if(!this.dragging){let e=this.player.getCurrentTime()/this.player.getDuration()*100;this.track.style.width=e+"%",e>=100&&this.finishVideo()}},1e3)}updateProgress(e){let t=this.progressSlider.getBoundingClientRect(),s=e.clientX-t.left,r=t.right-t.left,a=Math.min(Math.max(s/r,0),1)*100;this.track.style.width=a+"%",this.player.seekTo(this.player.getDuration()*(a/100)),a>=100&&this.finishVideo()}finishVideo(){this.playPauseBtn.innerHTML=`
        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32" fill="none">
            <path d="M13.3375 10.8944L21.7598 15.1056C22.4968 15.4741 22.4968 16.5259 21.7598 16.8944L13.3375 21.1056C12.3402 21.6042 11.1667 20.879 11.1667 19.7639V12.2361C11.1667 11.121 12.3402 10.3958 13.3375 10.8944Z" stroke="white"/>
        </svg>`,clearInterval(this.progressInterval)}},Y=O;Y.eventName="onVideoDataReady";me();})();
