"use strict";(()=>{var Ee=Object.create;var se=Object.defineProperty;var Le=Object.getOwnPropertyDescriptor;var we=Object.getOwnPropertyNames;var Ce=Object.getPrototypeOf,Se=Object.prototype.hasOwnProperty;var be=(o=>typeof require!="undefined"?require:typeof Proxy!="undefined"?new Proxy(o,{get:(e,t)=>(typeof require!="undefined"?require:e)[t]}):o)(function(o){if(typeof require!="undefined")return require.apply(this,arguments);throw new Error('Dynamic require of "'+o+'" is not supported')});var xe=(o,e,t,s)=>{if(e&&typeof e=="object"||typeof e=="function")for(let n of we(e))!Se.call(o,n)&&n!==t&&se(o,n,{get:()=>e[n],enumerable:!(s=Le(e,n))||s.enumerable});return o};var Te=(o,e,t)=>(t=o!=null?Ee(Ce(o)):{},xe(e||!o||!o.__esModule?se(t,"default",{value:o,enumerable:!0}):t,o));function ne(o){var e=o.split(".")[1],t=e.replace(/-/g,"+").replace(/_/g,"/"),s=decodeURIComponent(atob(t).split("").map(function(n){return"%"+("00"+n.charCodeAt(0).toString(16)).slice(-2)}).join(""));return JSON.parse(s)}var p="https://v3-atrium-prod-api.optic.xyz",H="https://results.aiornot.com",B=class{constructor(e,t){this.apiUrl=e,this.bearerToken=t}async get(e){let t=`${this.apiUrl}/${e}`;try{let s=await fetch(t,{method:"GET",headers:{"Content-Type":"application/json",Authorization:`Bearer ${this.bearerToken}`}});return await this.handleResponse(s)}catch(s){throw console.error("\u041E\u0448\u0438\u0431\u043A\u0430 \u043F\u0440\u0438 \u0432\u044B\u043F\u043E\u043B\u043D\u0435\u043D\u0438\u0438 GET-\u0437\u0430\u043F\u0440\u043E\u0441\u0430:",s),s}}async post(e,t){let s=`${this.apiUrl}/${e}`;try{let n=await fetch(s,{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${this.bearerToken}`},body:JSON.stringify(t)});return await this.handleResponse(n)}catch(n){throw console.error("\u041E\u0448\u0438\u0431\u043A\u0430 \u043F\u0440\u0438 \u0432\u044B\u043F\u043E\u043B\u043D\u0435\u043D\u0438\u0438 POST-\u0437\u0430\u043F\u0440\u043E\u0441\u0430:",n),n}}async postBinary(e,t){let s=`${this.apiUrl}/${e}`;try{let n=await fetch(s,{method:"POST",headers:{Accept:"application/json",Authorization:`Bearer ${this.bearerToken}`},body:t});return await this.handleResponse(n)}catch(n){throw console.error("\u041E\u0448\u0438\u0431\u043A\u0430 \u043F\u0440\u0438 \u0432\u044B\u043F\u043E\u043B\u043D\u0435\u043D\u0438\u0438 POST-\u0437\u0430\u043F\u0440\u043E\u0441\u0430:",n),n}}async delete(e){let t=`${this.apiUrl}/${e}`;try{let s=await fetch(t,{method:"DELETE",headers:{accept:"*/*",Authorization:`Bearer ${this.bearerToken}`}});await this.handleResponse(s)}catch(s){throw console.error("\u041E\u0448\u0438\u0431\u043A\u0430 \u043F\u0440\u0438 \u0432\u044B\u043F\u043E\u043B\u043D\u0435\u043D\u0438\u0438 DELETE-\u0437\u0430\u043F\u0440\u043E\u0441\u0430:",s),s}}async patch(e,t){let s=`${this.apiUrl}/${e}`;try{let n=await fetch(s,{method:"PATCH",headers:{"Content-Type":"application/json",Authorization:`Bearer ${this.bearerToken}`},body:JSON.stringify(t)});return await this.handleResponse(n)}catch(n){throw console.error("\u041E\u0448\u0438\u0431\u043A\u0430 \u043F\u0440\u0438 \u0432\u044B\u043F\u043E\u043B\u043D\u0435\u043D\u0438\u0438 PATCH-\u0437\u0430\u043F\u0440\u043E\u0441\u0430:",n),n}}async handleResponse(e){if(!e.ok){let t=await e.json();throw{status:e.status,message:t}}if(e.status!==204)return await e.json()}};var u=class{constructor(){let e=l.getToken(),t=`${p}/aion/users`;this.client=new B(t,e)}static getInstance(){return u.instance||(u.instance=new u),u.instance}static async fetchRequests(e=0,t=10){try{let s=u.getInstance().client,n=`data?filters=requests&offset=${e}&limit=${t}`;return await s.get(n).then(a=>a.requests.array)}catch(s){return console.error("\u041E\u0448\u0438\u0431\u043A\u0430 getRequests:",s),[]}}static async fetchUsageApi(){try{let e=u.getInstance().client,t="data?filters=api&offset=0&limit=10";return await e.get(t).then(s=>s.api)}catch(e){return console.error("\u041E\u0448\u0438\u0431\u043A\u0430 fetchUsageApi:",e),[]}}static async signUp(){try{return await u.getInstance().client.post("sign_up",{}).then(()=>!1).catch(t=>{if(t.status===400)return!0;throw t})}catch(e){return console.error("\u041E\u0448\u0438\u0431\u043A\u0430 signUp:",e),!1}}static async login(){try{return await u.getInstance().client.get("login")}catch(e){console.error("\u041E\u0448\u0438\u0431\u043A\u0430 login:",e)}}static async delete(){try{return await u.getInstance().client.delete("")}catch(e){console.error("\u041E\u0448\u0438\u0431\u043A\u0430 delete:",e)}}static async fetchApiToken(){try{return await u.getInstance().client.post("api_token",{})}catch(e){console.error("\u041E\u0448\u0438\u0431\u043A\u0430 fetchApiToken:",e)}}static async refreshApiToken(){try{return await u.getInstance().client.patch("api_token",{})}catch(e){console.error("\u041E\u0448\u0438\u0431\u043A\u0430 refreshApiToken:",e)}}},x=u;x.instance=null;var w=class{constructor(){}static isAuth(){return localStorage.getItem(w.key)!==null}static setAuth(){localStorage.setItem(w.key,"true")}static removeAuth(){localStorage.removeItem(w.key)}static async init(){w.isAuth()?await x.login():(await x.signUp(),w.setAuth(),await x.login())}static getToken(){var e;return(e=localStorage.getItem("_ms-mid"))!=null?e:""}static isExpiredToken(){let e=w.getToken();if((e==null?void 0:e.length)>0){let t=ne(e),s=Date.now()/1e3;return t.exp<s}return!0}},l=w;l.key="isSignUp";var y=class{constructor(){let e=l.getToken(),t=`${p}/aion/ai-generated`;this.client=new B(t,e)}static getInstance(){return y.instance||(y.instance=new y),y.instance}static async getReportsByBinary(e){let t=y.getInstance().client;try{let s=new FormData;return s.append("binary",e,"uploaded-file.png"),await t.postBinary("reports/binary",s)}catch(s){s.status===402&&alert("Please verify your email to continue using the service"),console.error("Error getReportsByBinary:",s)}}static async getReportsByUrl(e){let t=y.getInstance().client;try{let s=`reports/url?url=${e}`;return await t.post(s,{})}catch(s){s.status===402&&alert("Please verify your email to continue using the service"),console.error("getReportsByUrl:",s)}}static async getAudioVerdict(e){let t=y.getInstance().client;try{let s=new FormData;return s.append("file",e),await t.postBinary("reports/audio/binary",s)}catch(s){s.status===402&&alert("Please verify your email to continue using the service"),console.error("Error getAudioVerdict:",s)}}static async getYoutubeVerdict(e){let t=y.getInstance().client;try{let s={url:e};return await t.post("reports/audio/link",s)}catch(s){s.status===402&&alert("Please verify your email to continue using the service"),console.error("Error getYoutubeVerdict:",s)}}},C=y;C.instance=null;var S=class{constructor(){}static async getReportsByBinary(e,t){let s=`${p}/results/api/detector/reports/raw?source=web&user_id=${t}`,n=new FormData;n.append("binary",e,"file_name.png");let a={method:"POST",headers:{Accept:"application/json",Authorization:`Bearer ${l.getToken()}`},body:n};return await fetch(s,a).then(d=>d.json())}static async getReportsByUrl(e,t){let s=`${p}/results/api/detector/reports/json?source=web&user_id=${t}`,n={method:"POST",headers:{Accept:"application/json","Content-Type":"application/json",Authorization:`Bearer ${l.getToken()}`},body:JSON.stringify({object:e})};return await fetch(s,n).then(a=>a.json())}static async sendFeedback(e,t,s,n=!1){let a={is_proper_predict:t,comment:s},d=`${p}/results/api/detector/reports/result/${e}`,g={method:"PUT",body:JSON.stringify(a),headers:{Accept:"application/json","Content-Type":"application/json"}};(n||!l.isExpiredToken())&&(d=`${p}/aion/ai-generated/reports/${e}`,g={method:"PATCH",body:JSON.stringify(a),headers:{Accept:"application/json","Content-Type":"application/json"}}),await fetch(d,g).then(c=>c.json()).then(c=>console.log(c)).catch(c=>console.error(c))}static async getAudioVerdict(e){let t=`${p}/aion/ai-generated/reports/audio/binary`,s=new FormData;return s.append("file",e),await fetch(t,{method:"POST",headers:{Accept:"application/json",ContentType:"multipart/form-data"},body:s}).then(a=>a.json())}static async getYoutubeVerdict(e){let t=`${p}/aion/ai-generated/reports/audio/link`,s={method:"POST",headers:{Accept:"application/json","Content-Type":"application/json"},body:JSON.stringify({url:e})};return await fetch(t,s).then(n=>n.json())}};var A=class{constructor(){}static isLimitExceeded(){return!!l.isExpiredToken()}static increment(){let e=localStorage.getItem(A.key),t=e===null?1:Number(e)+1;localStorage.setItem(A.key,t.toString())}},T=A;T.key="requestCount";var v=class{static async getReportsByBinary(e,t){return l.isExpiredToken()?await S.getReportsByBinary(e,t):await C.getReportsByBinary(e)}static async getReportsByUrl(e,t){return l.isExpiredToken()?await S.getReportsByUrl(e,t):await C.getReportsByUrl(e)}static async getAudioVerictByFile(e){return l.isExpiredToken()?await S.getAudioVerdict(e):await C.getAudioVerdict(e)}static async getAudioVerictMock(e){let s=await((n,a)=>new Promise(d=>{setTimeout(()=>{d(a)},n)}))(1500,e);return JSON.parse(`{
            "id": "41994fdd-0161-43a9-b873-581eccbe6d72",
            "report": {
                "version": "0.0.0",
                "verdict": ${s}
            }
        }`)}static async getYoutubeVerict(e){return l.isExpiredToken()?await S.getYoutubeVerdict(e):await C.getYoutubeVerdict(e)}static async sendFeedback(e,t,s,n=!1){return await S.sendFeedback(e,t,s,n)}};var re,qe=import("https://openfpcdn.io/fingerprintjs/v3").then(o=>o.load()),Y=async()=>{re=await qe.then(o=>o.get()).then(o=>o.visitorId)};var V=class{constructor(e,t,s,n){this.progressInterval=0;this.audio=e,this.playPauseBtn=t,this.progressSlider=s,this.track=n,this.dragging=!1,this.progressInterval=0,this.audio.volume=.3,this.playPauseBtn.addEventListener("click",a=>this.playPauseAudio(a)),this.progressSlider.addEventListener("mousedown",a=>this.mouseDown(a)),document.addEventListener("mousemove",a=>this.mouseMove(a)),document.addEventListener("mouseup",()=>this.mouseUp())}playPauseAudio(e){e.stopPropagation(),this.audio.paused?(this.audio.play(),this.playPauseBtn.innerHTML=`
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                <rect x="2.5" y="1.5" width="4" height="13" rx="1.5" stroke="white"/>
                <rect x="9.5" y="1.5" width="4" height="13" rx="1.5" stroke="white"/>
            </svg>
            `,this.progressInterval=setInterval(()=>{if(!this.dragging){let t=this.audio.currentTime/this.audio.duration*100;this.track.style.width=t+"%",t>=100&&this.finishAudio()}},1e3)):(this.audio.pause(),this.playPauseBtn.innerHTML=`
            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32" fill="none">
                <path d="M13.3375 10.8944L21.7598 15.1056C22.4968 15.4741 22.4968 16.5259 21.7598 16.8944L13.3375 21.1056C12.3402 21.6042 11.1667 20.879 11.1667 19.7639V12.2361C11.1667 11.121 12.3402 10.3958 13.3375 10.8944Z" stroke="white"/>
            </svg>`,clearInterval(this.progressInterval))}pauseAudio(){this.audio.pause(),this.playPauseBtn.innerHTML=`
        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32" fill="none">
            <path d="M13.3375 10.8944L21.7598 15.1056C22.4968 15.4741 22.4968 16.5259 21.7598 16.8944L13.3375 21.1056C12.3402 21.6042 11.1667 20.879 11.1667 19.7639V12.2361C11.1667 11.121 12.3402 10.3958 13.3375 10.8944Z" stroke="white"/>
        </svg>`,clearInterval(this.progressInterval)}mouseDown(e){this.dragging=!0,clearInterval(this.progressInterval),this.updateProgress(e)}mouseMove(e){this.dragging&&this.updateProgress(e)}mouseUp(){this.dragging=!1,this.progressInterval=setInterval(()=>{if(!this.dragging){let e=this.audio.currentTime/this.audio.duration*100;this.track.style.width=e+"%",e>=100&&this.finishAudio()}},1e3)}updateProgress(e){let t=this.progressSlider.getBoundingClientRect(),s=e.clientX-t.left,n=t.right-t.left,a=Math.min(Math.max(s/n,0),1)*100;this.track.style.width=a+"%",this.audio.currentTime=this.audio.duration*(a/100),a>=100&&this.finishAudio()}finishAudio(){this.playPauseBtn.innerHTML=`
        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32" fill="none">
            <path d="M13.3375 10.8944L21.7598 15.1056C22.4968 15.4741 22.4968 16.5259 21.7598 16.8944L13.3375 21.1056C12.3402 21.6042 11.1667 20.879 11.1667 19.7639V12.2361C11.1667 11.121 12.3402 10.3958 13.3375 10.8944Z" stroke="white"/>
        </svg>`}},h=class{constructor(e,t,s,n=!1){this.containerId="";this.audioPlayer=null;this.name="";this.containerId=e,this.container=document.getElementById(e),this.audioSrc=t,this.name=s,n?this.initializeSquarePlayer():this.initializePlayer()}initializePlayer(){if(!this.container)return;this.container.classList.add("aiornot-player"),this.container.innerHTML=`
            <audio id="${this.container.id}-audio" src="${this.audioSrc}"></audio>
            <div class="aiornot-player-controls">
                <div class="aiornot-player-button" id="${this.container.id}-playPauseBtn">
                    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32" fill="none">
                        <path d="M13.3375 10.8944L21.7598 15.1056C22.4968 15.4741 22.4968 16.5259 21.7598 16.8944L13.3375 21.1056C12.3402 21.6042 11.1667 20.879 11.1667 19.7639V12.2361C11.1667 11.121 12.3402 10.3958 13.3375 10.8944Z" stroke="white"/>
                    </svg>
                </div>
                <div class="aiornot-player-hover-bg"></div>
                <div class="aiornot-player-title">${this.name}</div>
            </div>
            <div id="${this.container.id}-slider" class="aiornot-player-slider">
                <div id="${this.container.id}-progress" class="aiornot-player-progress"></div>
            </div>
        `;let e=document.getElementById(`${this.container.id}-audio`),t=document.getElementById(`${this.container.id}-playPauseBtn`),s=document.getElementById(`${this.container.id}-slider`),n=document.getElementById(`${this.container.id}-progress`);this.audioPlayer=new V(e,t,s,n)}initializeSquarePlayer(){if(!this.container)return;this.container.classList.add("aiornot-player-square"),this.container.innerHTML=`
            <audio id="${this.container.id}-audio" src="${this.audioSrc}"></audio>
            <div class="aiornot-player-controls-square">
                <div class="aiornot-player-button-sqaure" id="${this.container.id}-playPauseBtn">
                    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32" fill="none">
                        <path d="M13.3375 10.8944L21.7598 15.1056C22.4968 15.4741 22.4968 16.5259 21.7598 16.8944L13.3375 21.1056C12.3402 21.6042 11.1667 20.879 11.1667 19.7639V12.2361C11.1667 11.121 12.3402 10.3958 13.3375 10.8944Z" stroke="white"/>
                    </svg>
                </div>
                <div class="aiornot-player-hover-bg"></div>
                <div class="aiornot-player-title-sqaure">${this.name}</div>
            </div>
            <div id="${this.container.id}-slider" class="aiornot-player-slider">
                <div id="${this.container.id}-progress" class="aiornot-player-progress"></div>
            </div>
        `;let e=document.getElementById(`${this.container.id}-audio`),t=document.getElementById(`${this.container.id}-playPauseBtn`),s=document.getElementById(`${this.container.id}-slider`),n=document.getElementById(`${this.container.id}-progress`);this.audioPlayer=new V(e,t,s,n)}},R=class{constructor(e=[]){this.players=[],e.forEach(t=>{this.addPlayer(t)})}addPlayer(e){var t;this.players.push(e),(t=e.audioPlayer)==null||t.audio.addEventListener("play",()=>this.pauseOtherPlayers(e))}pauseOtherPlayers(e){var t;for(let s of this.players)s!==e&&((t=s.audioPlayer)==null||t.pauseAudio())}};var O=class{constructor(e,t,s){this.progressInterval=0;this.playPauseBtn=e,this.progressSlider=t,this.track=s,this.dragging=!1,this.progressInterval=0,this.initListeners()}initListeners(){this.playPauseBtn.addEventListener("click",()=>this.playPauseVideo()),this.progressSlider.addEventListener("mousedown",e=>this.mouseDown(e)),document.addEventListener("mousemove",e=>this.mouseMove(e)),document.addEventListener("mouseup",()=>this.mouseUp())}onYouTubeIframeAPIReady(e){this.player=new YT.Player("youtube-player",{height:"48",width:"48",videoId:e,events:{onReady:()=>this.onPlayerReady(),onStateChange:t=>this.onPlayerStateChange(t)}})}onPlayerReady(){this.player.setVolume(30)}playPauseVideo(){let e=this.player.getPlayerState();e===YT.PlayerState.ENDED&&(this.player.seekTo(0),this.player.playVideo()),e===YT.PlayerState.PAUSED||e===YT.PlayerState.CUED?(this.player.playVideo(),this.playPauseBtn.innerHTML=` <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                <rect x="2.5" y="1.5" width="4" height="13" rx="1.5" stroke="white"/>
                <rect x="9.5" y="1.5" width="4" height="13" rx="1.5" stroke="white"/>
            </svg>`,this.progressInterval=setInterval(()=>{if(!this.dragging){let t=this.player.getCurrentTime()/this.player.getDuration()*100;this.track.style.width=t+"%",t>=100&&this.finishVideo()}},1e3)):(this.player.pauseVideo(),this.playPauseBtn.innerHTML=`
            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32" fill="none">
                <path d="M13.3375 10.8944L21.7598 15.1056C22.4968 15.4741 22.4968 16.5259 21.7598 16.8944L13.3375 21.1056C12.3402 21.6042 11.1667 20.879 11.1667 19.7639V12.2361C11.1667 11.121 12.3402 10.3958 13.3375 10.8944Z" stroke="white"/>
            </svg>`,clearInterval(this.progressInterval))}onPlayerStateChange(e){e.data===YT.PlayerState.ENDED&&this.finishVideo()}mouseDown(e){this.dragging=!0,clearInterval(this.progressInterval),this.updateProgress(e)}mouseMove(e){this.dragging&&this.updateProgress(e)}mouseUp(){this.dragging=!1,this.progressInterval=setInterval(()=>{if(!this.dragging){let e=this.player.getCurrentTime()/this.player.getDuration()*100;this.track.style.width=e+"%",e>=100&&this.finishVideo()}},1e3)}updateProgress(e){let t=this.progressSlider.getBoundingClientRect(),s=e.clientX-t.left,n=t.right-t.left,a=Math.min(Math.max(s/n,0),1)*100;this.track.style.width=a+"%",this.player.seekTo(this.player.getDuration()*(a/100)),a>=100&&this.finishVideo()}finishVideo(){this.playPauseBtn.innerHTML=`
        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32" fill="none">
            <path d="M13.3375 10.8944L21.7598 15.1056C22.4968 15.4741 22.4968 16.5259 21.7598 16.8944L13.3375 21.1056C12.3402 21.6042 11.1667 20.879 11.1667 19.7639V12.2361C11.1667 11.121 12.3402 10.3958 13.3375 10.8944Z" stroke="white"/>
        </svg>`,clearInterval(this.progressInterval)}},N=class{constructor(e,t,s){this.containerId="";this.videoId="";this.youtubePlayer=null;this.name="";this.containerId=e,this.container=document.getElementById(e),this.videoId=t,this.name=s,this.initializePlayer()}async loadYouTubeIframeAPI(){return new Promise((e,t)=>{var a;window.onYouTubeIframeAPIReady=()=>{e()};let s=document.createElement("script");s.src="https://www.youtube.com/iframe_api",s.onerror=t;let n=document.getElementsByTagName("script")[0];(a=n.parentNode)==null||a.insertBefore(s,n)})}async initializePlayer(){if(!this.container)return;this.container.classList.add("aiornot-player-square"),this.container.innerHTML=`
            <div id="youtube-player"></div>
            <div class="aiornot-player-controls-square">
                <div class="aiornot-player-button-sqaure" id="${this.container.id}-playPauseBtn">
                    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32" fill="none">
                        <path d="M13.3375 10.8944L21.7598 15.1056C22.4968 15.4741 22.4968 16.5259 21.7598 16.8944L13.3375 21.1056C12.3402 21.6042 11.1667 20.879 11.1667 19.7639V12.2361C11.1667 11.121 12.3402 10.3958 13.3375 10.8944Z" stroke="white"/>
                    </svg>
                </div>
                <div class="aiornot-player-hover-bg"></div>
                <div class="aiornot-player-title-sqaure">${this.name}</div>
            </div>
            <div id="${this.container.id}-slider" class="aiornot-player-slider">
                <div id="${this.container.id}-progress" class="aiornot-player-progress"></div>
            </div>
        `;let e=document.getElementById(`${this.container.id}-playPauseBtn`),t=document.getElementById(`${this.container.id}-slider`),s=document.getElementById(`${this.container.id}-progress`);await this.loadYouTubeIframeAPI(),this.youtubePlayer=new O(e,t,s),this.youtubePlayer.onYouTubeIframeAPIReady(this.videoId)}},ie=(o,e)=>{let s=(n=>{var a;try{let d=new URL(n),g=new URLSearchParams(d.search).get("v"),b=/^(?:https?:\/\/)?(?:www\.)?youtu(?:be)?\.(?:com|be)\/(?:shorts\/)?([^\/?]+)/.exec(n);return(a=g!=null?g:b==null?void 0:b[0])!=null?a:""}catch(d){return console.error("\u041D\u0435\u0432\u0435\u0440\u043D\u044B\u0439 URL",d),""}})(e);new N(o,s,"")};var oe=()=>{var ee,te;let o=document.getElementById("report-screen"),e=document.querySelector("#button-report-submit"),t=document.querySelector("#input-report-comment"),s=document.querySelector("#button-report_true"),n=document.querySelector("#button-report_false"),a=document.querySelector("#button-report_close"),d=document.querySelector("#url-error-message"),g=document.querySelector("#processing_cancel"),c=document.querySelector("#file-input"),b=document.querySelector("#input-error-text"),f=document.getElementById("ai-or-not_image-url"),I=document.getElementById("ai-or-not_submit"),W=document.querySelector("#ai-or-not_dropzone"),L=document.querySelector("#ai-or-not_dropzone-text"),J=document.querySelector("#result-screen_col"),ae=document.querySelector("#share-items-hide"),le=document.querySelector("#ai-or-not-dropzone-counter"),_=document.querySelector("#ai-or-not-dropzone-counter-w"),q,U;(()=>{if(!l.isExpiredToken())_==null||_.classList.add("hide");else{let r=localStorage.getItem("requestCount")||"0";le.textContent=Number(r)<=5?r:"5",_.classList.remove("hide")}})(),Y();let ce=()=>{t.value="";let r=document.querySelector("#button-report_true-text"),i=document.querySelector("#button-report_false-text");i.classList.add("hide"),r.classList.remove("hide"),r.textContent=r.getAttribute("report-button-text-default"),i.textContent=i.getAttribute("report-button-text-default"),s.classList.remove("is-reported"),n.classList.remove("is-reported"),s.classList.remove("hide"),n.classList.remove("hide")},$=r=>{U=r;let i=document.querySelector('[fs-socialshare-element="url"]'),k=`${l.isExpiredToken()?`${H}/aiornot/`:`${H}/aiornot/users/`}${r}`;i.textContent=k,document.querySelectorAll(".result-screen_share-item").forEach(fe=>{fe.setAttribute("data-url",k)})},G=()=>{L.textContent="We support jpeg, png, webp, gif, tiff, bmp. 10 Mb of maximum size.",L.classList.remove("text-color-red"),b.textContent="Something went wrong. Try again.",d.classList.add("hide")},K=()=>{d.classList.remove("hide")},de=()=>{d.classList.add("hide")},M=()=>{J.classList.contains("hide")?(L.textContent="File is too large (max 10 MB)",L.classList.add("text-color-red")):(b.textContent="File is too large (max 10 MB)",d.classList.remove("hide"))},ue=r=>{let i=URL.createObjectURL(r);new h("result-screen_image-wrapper",i,r.name,!0)},me=r=>{ie("result-screen_image-wrapper",r)};c==null||c.addEventListener("change",()=>{let r=c==null?void 0:c.files[0].size,i=10*1024*1024;r>i?(q=!1,M()):(q=!0,G())});let pe=()=>{document.querySelector("#processing-screen").classList.add("hide"),L.classList.add("error"),W.classList.add("red-border"),L.textContent="Something went wrong. Try again."},z=()=>{L.classList.remove("error"),W.classList.remove("red-border"),L.textContent="We support jpeg, png, webp, gif, tiff, bmp. 10 Mb of maximum size."},P=()=>{document.querySelector("#choose-file-row").classList.add("hide"),document.querySelector("#legal-tip").classList.remove("hide"),document.querySelector("#processing-screen").classList.add("hide"),document.querySelector("#hero-home_title-description").classList.remove("hide"),document.querySelector("#hero-home_gallery").classList.remove("hide"),document.querySelector("#ai-or-not_dropzone").classList.remove("hide"),document.querySelector("#hero-home_drop-zone-divider").classList.remove("hide"),document.querySelector("#result-screen_col").classList.add("hide"),document.querySelector("#result-screen_image-wrapper").classList.add("hide")},D=()=>{ce(),de(),b.textContent="Something went wrong. Try again.",document.querySelector("#choose-file-row").classList.remove("hide"),document.querySelector("#legal-tip").classList.add("hide"),document.querySelector(".processing-screen_triggers_5").click(),document.querySelector("#processing-screen").classList.remove("hide"),document.querySelector(".processing-screen_triggers_1").click(),document.querySelector("#hero-home_title-description").classList.add("hide"),document.querySelector("#hero-home_gallery").classList.add("hide"),document.querySelector("#ai-or-not_dropzone").classList.add("hide"),document.querySelector("#hero-home_drop-zone-divider").classList.add("hide"),document.querySelector("#result-screen_col").classList.remove("hide"),document.querySelector("#result-screen_image-wrapper").classList.remove("hide")};function F(){var r,i,m;ae.classList.remove("hide"),(r=document.querySelector(".processing-screen_triggers_3"))==null||r.click(),document.querySelector("#processing-screen").classList.add("hide"),(i=document.querySelector(".processing-screen_triggers_5"))==null||i.click(),(m=document.querySelector("#scroll-to-top-trigger"))==null||m.click(),c.value="",f.value=""}let j=r=>{r==="unknown"?(document.getElementById("title-human").innerHTML="Sorry, but in this case we can't really say if it's AI or Not",document.getElementById("ai-or-not_result-message-50").classList.remove("hide"),document.getElementById("ai-or-not_result-message").classList.add("hide"),document.getElementById("ai-or-not_result-message-50").innerHTML="Probly the uploaded audio has most likely been modified or compressed",document.getElementById("title-human").classList.remove("hide"),document.getElementById("title-ai").classList.add("hide")):(document.getElementById("title-ai").innerHTML='This audio is generated by <span class="text-color-green">AI</span>',document.getElementById("title-human").innerHTML='This audio is generated by <span class="text-color-green">Human</span>',document.getElementById("ai-or-not_result-message-50").classList.add("hide"),document.getElementById("ai-or-not_result-message").classList.remove("hide"),document.querySelector("#ai-or-not_model-name").textContent=r,r==="ai"?(document.getElementById("title-human").classList.add("hide"),document.getElementById("title-ai").classList.remove("hide")):(document.getElementById("title-human").classList.remove("hide"),document.getElementById("title-ai").classList.add("hide")))},X=async r=>{if(T.isLimitExceeded()){let i=document.getElementById("sign-up");i.style.display="flex",i.style.zIndex=100,P()}else d.classList.add("hide"),D(),await v.getYoutubeVerict(r).then(i=>{$(i.id),j(i.report.verdict===!0?"ai":"human"),F(),me(r)}).catch(i=>{J.classList.contains("hide")?K():(K(),P()),console.log(i)})},E=document.body,Be=document.querySelector("#dropzone-fullscreen_message-tip"),Ie=document.querySelector("#dropzone-fullscreen_message-format");E==null||E.addEventListener("dragover",function(r){r.preventDefault(),document.querySelector(".dropzone-fullscreen").classList.remove("hide")}),E==null||E.addEventListener("dragleave",function(r){r.preventDefault(),document.querySelector(".dropzone-fullscreen").classList.add("hide")}),E==null||E.addEventListener("drop",async function(r){r.preventDefault(),document.querySelector(".dropzone-fullscreen").classList.add("hide");let i=r.dataTransfer.files[0],m=i.size,k=10*1024*1024;m>k?(q=!1,M()):(q=!0,G()),q==!0?await Q(i):M()}),c==null||c.addEventListener("change",async r=>{if(q==!0){let i=c.files[0];await Q(i)}else M()});let Q=async r=>{if(r.type==="audio/mpeg"||r.type==="audio/mp3"){if(D(),T.isLimitExceeded()){let i=document.getElementById("sign-up");i.style.display="flex",i.style.zIndex=100,P();return}await v.getAudioVerictByFile(r).then(i=>{$(i.id),z(),j(i.report.verdict===!0?"ai":"human"),F(),ue(r)}).catch(i=>{console.log(i),pe(),P()})}},he=async(r,i)=>{D(),await v.getAudioVerictMock(!0).then(m=>{$(m.id),z(),j(m.report.verdict===!0?"ai":"human"),F(),new h("result-screen_image-wrapper",r,i,!0)})};g==null||g.addEventListener("click",function(){z(),P()}),(ee=document.querySelector("#ai-or-not_dropzone"))==null||ee.addEventListener("click",function(){c.click()}),(te=document.querySelector("#choose-file-row"))==null||te.addEventListener("click",function(){c.click()}),I==null||I.addEventListener("click",()=>{f.value!=""&&X(f.value)}),f==null||f.addEventListener("keypress",r=>{r.key==="Enter"&&f.value!=""&&X(f.value)}),f.addEventListener("input",r=>{let i=r.target.value;(k=>/^(?:https?:\/\/)?(?:www\.)?(?:music\.)?youtu(?:be)?\.(?:com|be)\/(?:shorts\/)?([^\/?]+)/.test(k))(i)?I.classList.remove("is-disabled"):I.classList.add("is-disabled")});let ge=()=>{let r=document.querySelector("#button-report_false-text");r.classList.remove("hide"),r.textContent=r.getAttribute("report-button-text-default_reported"),n.classList.add("is-reported"),s.classList.add("hide"),o.style.display="none"},ye=()=>{let r=document.querySelector("#button-report_true-text");r.classList.remove("hide"),r.textContent=r.getAttribute("report-button-text-default_reported"),s.classList.add("is-reported"),n.classList.add("hide")};s==null||s.addEventListener("click",()=>{ye(),v.sendFeedback(U,!0,"",!0)}),n==null||n.addEventListener("click",()=>{o.style.display="flex"}),a==null||a.addEventListener("click",()=>{o.style.display="none"}),e==null||e.addEventListener("click",()=>{ge(),v.sendFeedback(U,!1,t.value,!0)}),document==null||document.addEventListener("keydown",r=>{r.code==="Escape"&&o.style.display!=="none"&&a.click()}),t==null||t.addEventListener("change",()=>{t.value!=""?e.classList.remove("is-disabled"):e.classList.add("is-disabled")}),t==null||t.addEventListener("input",()=>{t.value!=""?e.classList.remove("is-disabled"):e.classList.add("is-disabled")}),new R([new h("audio-sample-1","https://atrium-junk.s3.amazonaws.com/ai-or-not-audio-samples/Adel","Adel"),new h("audio-sample-2","https://atrium-junk.s3.amazonaws.com/ai-or-not-audio-samples/Bull+Greek.mp3","Bull Greek"),new h("audio-sample-3","https://atrium-junk.s3.amazonaws.com/ai-or-not-audio-samples/Sample+1.mp3","Sample 1"),new h("audio-sample-4","https://atrium-junk.s3.amazonaws.com/ai-or-not-audio-samples/Sample+2.mp3","Sample 2"),new h("audio-sample-5","https://atrium-junk.s3.amazonaws.com/ai-or-not-audio-samples/Sample+3.mp3","Sample 3"),new h("audio-sample-6","https://atrium-junk.s3.amazonaws.com/ai-or-not-audio-samples/Trump+speech.mp3","Trump speech")]).players.forEach(r=>{var i;(i=r.container)==null||i.addEventListener("click",async()=>{var m;(m=r.audioPlayer)!=null&&m.audio.paused&&he(r.audioSrc,r.name)})});let Z=document.getElementById("close-sign-up");Z==null||Z.addEventListener("click",()=>{let r=document.getElementById("sign-up");r.style.display="none",r.style.zIndex=0})};oe();})();
