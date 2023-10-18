"use strict";
(() => {
  var __create = Object.create;
  var __defProp = Object.defineProperty;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __getProtoOf = Object.getPrototypeOf;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
  var __require = /* @__PURE__ */ ((x) => typeof require !== "undefined" ? require : typeof Proxy !== "undefined" ? new Proxy(x, {
    get: (a, b) => (typeof require !== "undefined" ? require : a)[b]
  }) : x)(function(x) {
    if (typeof require !== "undefined")
      return require.apply(this, arguments);
    throw new Error('Dynamic require of "' + x + '" is not supported');
  });
  var __copyProps = (to, from, except, desc) => {
    if (from && typeof from === "object" || typeof from === "function") {
      for (let key of __getOwnPropNames(from))
        if (!__hasOwnProp.call(to, key) && key !== except)
          __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
    }
    return to;
  };
  var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
    // If the importer is in node compatibility mode or this is not an ESM
    // file that has been converted to a CommonJS file using a Babel-
    // compatible transform (i.e. "__esModule" has not been set), then set
    // "default" to the CommonJS "module.exports" for node compatibility.
    isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
    mod
  ));
  var __publicField = (obj, key, value) => {
    __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
    return value;
  };

  // bin/live-reload.js
  new EventSource(`${"http://localhost:3000"}/esbuild`).addEventListener("change", () => location.reload());

  // src/audio/player.ts
  var AudioPlayer = class {
    audio;
    playPauseBtn;
    progressSlider;
    track;
    dragging;
    progressInterval = 0;
    constructor(audio, playPauseBtn, progressSlider, track) {
      this.audio = audio;
      this.playPauseBtn = playPauseBtn;
      this.progressSlider = progressSlider;
      this.track = track;
      this.dragging = false;
      this.progressInterval = 0;
      this.audio.volume = 0.3;
      this.playPauseBtn.addEventListener("click", (e) => this.playPauseAudio(e));
      this.progressSlider.addEventListener("mousedown", (e) => this.mouseDown(e));
      document.addEventListener("mousemove", (e) => this.mouseMove(e));
      document.addEventListener("mouseup", () => this.mouseUp());
    }
    playPauseAudio(e) {
      e.stopPropagation();
      if (this.audio.paused) {
        this.audio.play();
        this.playPauseBtn.innerHTML = `
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                <rect x="2.5" y="1.5" width="4" height="13" rx="1.5" stroke="white"/>
                <rect x="9.5" y="1.5" width="4" height="13" rx="1.5" stroke="white"/>
            </svg>
            `;
        this.progressInterval = setInterval(() => {
          if (!this.dragging) {
            const progress = this.audio.currentTime / this.audio.duration * 100;
            this.track.style.width = progress + "%";
            if (progress >= 100) {
              this.finishAudio();
            }
          }
        }, 1e3);
      } else {
        this.audio.pause();
        this.playPauseBtn.innerHTML = `
            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32" fill="none">
                <path d="M13.3375 10.8944L21.7598 15.1056C22.4968 15.4741 22.4968 16.5259 21.7598 16.8944L13.3375 21.1056C12.3402 21.6042 11.1667 20.879 11.1667 19.7639V12.2361C11.1667 11.121 12.3402 10.3958 13.3375 10.8944Z" stroke="white"/>
            </svg>`;
        clearInterval(this.progressInterval);
      }
    }
    pauseAudio() {
      this.audio.pause();
      this.playPauseBtn.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32" fill="none">
            <path d="M13.3375 10.8944L21.7598 15.1056C22.4968 15.4741 22.4968 16.5259 21.7598 16.8944L13.3375 21.1056C12.3402 21.6042 11.1667 20.879 11.1667 19.7639V12.2361C11.1667 11.121 12.3402 10.3958 13.3375 10.8944Z" stroke="white"/>
        </svg>`;
      clearInterval(this.progressInterval);
    }
    mouseDown(e) {
      this.dragging = true;
      clearInterval(this.progressInterval);
      this.updateProgress(e);
    }
    mouseMove(e) {
      if (this.dragging) {
        this.updateProgress(e);
      }
    }
    mouseUp() {
      this.dragging = false;
      this.progressInterval = setInterval(() => {
        if (!this.dragging) {
          const progress = this.audio.currentTime / this.audio.duration * 100;
          this.track.style.width = progress + "%";
          if (progress >= 100) {
            this.finishAudio();
          }
        }
      }, 1e3);
    }
    updateProgress(e) {
      const rect = this.progressSlider.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const width = rect.right - rect.left;
      const progress = Math.min(Math.max(x / width, 0), 1) * 100;
      this.track.style.width = progress + "%";
      this.audio.currentTime = this.audio.duration * (progress / 100);
      if (progress >= 100) {
        this.finishAudio();
      }
    }
    finishAudio() {
      this.playPauseBtn.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32" fill="none">
            <path d="M13.3375 10.8944L21.7598 15.1056C22.4968 15.4741 22.4968 16.5259 21.7598 16.8944L13.3375 21.1056C12.3402 21.6042 11.1667 20.879 11.1667 19.7639V12.2361C11.1667 11.121 12.3402 10.3958 13.3375 10.8944Z" stroke="white"/>
        </svg>`;
    }
  };
  var AudioPlayerContainer = class {
    containerId = "";
    container;
    audioSrc;
    audioPlayer = null;
    name = "";
    constructor(containerId, audioSrc, name2, isSquare = false) {
      this.containerId = containerId;
      this.container = document.getElementById(containerId);
      this.audioSrc = audioSrc;
      this.name = name2;
      if (isSquare) {
        this.initializeSquarePlayer();
      } else {
        this.initializePlayer();
      }
    }
    initializePlayer() {
      if (!this.container)
        return;
      this.container.classList.add("aiornot-player");
      this.container.innerHTML = `
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
        `;
      const audio = document.getElementById(`${this.container.id}-audio`);
      const playPauseBtn = document.getElementById(`${this.container.id}-playPauseBtn`);
      const progressSlider = document.getElementById(`${this.container.id}-slider`);
      const track = document.getElementById(`${this.container.id}-progress`);
      this.audioPlayer = new AudioPlayer(audio, playPauseBtn, progressSlider, track);
    }
    initializeSquarePlayer() {
      if (!this.container)
        return;
      this.container.classList.add("aiornot-player-square");
      this.container.innerHTML = `
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
        `;
      const audio = document.getElementById(`${this.container.id}-audio`);
      const playPauseBtn = document.getElementById(`${this.container.id}-playPauseBtn`);
      const progressSlider = document.getElementById(`${this.container.id}-slider`);
      const track = document.getElementById(`${this.container.id}-progress`);
      this.audioPlayer = new AudioPlayer(audio, playPauseBtn, progressSlider, track);
    }
  };
  var PlayerManager = class {
    players;
    constructor(players = []) {
      this.players = [];
      players.forEach((player) => {
        this.addPlayer(player);
      });
    }
    addPlayer(player) {
      this.players.push(player);
      player.audioPlayer?.audio.addEventListener("play", () => this.pauseOtherPlayers(player));
    }
    pauseOtherPlayers(currentPlayer) {
      for (let player of this.players) {
        if (player !== currentPlayer) {
          player.audioPlayer?.pauseAudio();
        }
      }
    }
  };

  // src/audio/youtube.ts
  var YouTubePlayer = class {
    player;
    playPauseBtn;
    progressSlider;
    track;
    dragging;
    progressInterval = 0;
    constructor(playPauseBtn, progressSlider, track) {
      this.playPauseBtn = playPauseBtn;
      this.progressSlider = progressSlider;
      this.track = track;
      this.dragging = false;
      this.progressInterval = 0;
      this.initListeners();
    }
    initListeners() {
      this.playPauseBtn.addEventListener("click", () => this.playPauseVideo());
      this.progressSlider.addEventListener("mousedown", (e) => this.mouseDown(e));
      document.addEventListener("mousemove", (e) => this.mouseMove(e));
      document.addEventListener("mouseup", () => this.mouseUp());
    }
    onYouTubeIframeAPIReady(videoID) {
      this.player = new YT.Player("youtube-player", {
        height: "48",
        width: "48",
        videoId: videoID,
        events: {
          onReady: () => this.onPlayerReady(),
          onStateChange: (event) => this.onPlayerStateChange(event)
        }
      });
    }
    onPlayerReady() {
      this.player.setVolume(30);
    }
    playPauseVideo() {
      const state = this.player.getPlayerState();
      if (state === YT.PlayerState.ENDED) {
        this.player.seekTo(0);
        this.player.playVideo();
      }
      if (state === YT.PlayerState.PAUSED || state === YT.PlayerState.CUED) {
        this.player.playVideo();
        this.playPauseBtn.innerHTML = ` <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                <rect x="2.5" y="1.5" width="4" height="13" rx="1.5" stroke="white"/>
                <rect x="9.5" y="1.5" width="4" height="13" rx="1.5" stroke="white"/>
            </svg>`;
        this.progressInterval = setInterval(() => {
          if (!this.dragging) {
            const progress = this.player.getCurrentTime() / this.player.getDuration() * 100;
            this.track.style.width = progress + "%";
            if (progress >= 100) {
              this.finishVideo();
            }
          }
        }, 1e3);
      } else {
        this.player.pauseVideo();
        this.playPauseBtn.innerHTML = `
            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32" fill="none">
                <path d="M13.3375 10.8944L21.7598 15.1056C22.4968 15.4741 22.4968 16.5259 21.7598 16.8944L13.3375 21.1056C12.3402 21.6042 11.1667 20.879 11.1667 19.7639V12.2361C11.1667 11.121 12.3402 10.3958 13.3375 10.8944Z" stroke="white"/>
            </svg>`;
        clearInterval(this.progressInterval);
      }
    }
    onPlayerStateChange(event) {
      if (event.data === YT.PlayerState.ENDED) {
        this.finishVideo();
      }
    }
    mouseDown(e) {
      this.dragging = true;
      clearInterval(this.progressInterval);
      this.updateProgress(e);
    }
    mouseMove(e) {
      if (this.dragging) {
        this.updateProgress(e);
      }
    }
    mouseUp() {
      this.dragging = false;
      this.progressInterval = setInterval(() => {
        if (!this.dragging) {
          const progress = this.player.getCurrentTime() / this.player.getDuration() * 100;
          this.track.style.width = progress + "%";
          if (progress >= 100) {
            this.finishVideo();
          }
        }
      }, 1e3);
    }
    updateProgress(e) {
      const rect = this.progressSlider.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const width = rect.right - rect.left;
      const progress = Math.min(Math.max(x / width, 0), 1) * 100;
      this.track.style.width = progress + "%";
      this.player.seekTo(this.player.getDuration() * (progress / 100));
      if (progress >= 100) {
        this.finishVideo();
      }
    }
    finishVideo() {
      this.playPauseBtn.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32" fill="none">
            <path d="M13.3375 10.8944L21.7598 15.1056C22.4968 15.4741 22.4968 16.5259 21.7598 16.8944L13.3375 21.1056C12.3402 21.6042 11.1667 20.879 11.1667 19.7639V12.2361C11.1667 11.121 12.3402 10.3958 13.3375 10.8944Z" stroke="white"/>
        </svg>`;
      clearInterval(this.progressInterval);
    }
  };
  var YoutubePlayerContainer = class {
    containerId = "";
    container;
    videoId = "";
    youtubePlayer = null;
    name = "";
    constructor(containerId, videoId, name2) {
      this.containerId = containerId;
      this.container = document.getElementById(containerId);
      this.videoId = videoId;
      this.name = name2;
      this.initializePlayer();
    }
    async loadYouTubeIframeAPI() {
      return new Promise((resolve, reject) => {
        window.onYouTubeIframeAPIReady = () => {
          resolve();
        };
        const tag = document.createElement("script");
        tag.src = "https://www.youtube.com/iframe_api";
        tag.onerror = reject;
        const firstScriptTag = document.getElementsByTagName("script")[0];
        firstScriptTag.parentNode?.insertBefore(tag, firstScriptTag);
      });
    }
    async initializePlayer() {
      if (!this.container)
        return;
      this.container.classList.add("aiornot-player-square");
      this.container.innerHTML = `
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
        `;
      const playPauseBtn = document.getElementById(`${this.container.id}-playPauseBtn`);
      const progressSlider = document.getElementById(`${this.container.id}-slider`);
      const track = document.getElementById(`${this.container.id}-progress`);
      await this.loadYouTubeIframeAPI();
      this.youtubePlayer = new YouTubePlayer(playPauseBtn, progressSlider, track);
      this.youtubePlayer.onYouTubeIframeAPIReady(this.videoId);
    }
  };
  var createYoutubePlayer = (elementId, url) => {
    const getYoutubeVideoID = (url2) => {
      try {
        let urlObject = new URL(url2);
        let id = new URLSearchParams(urlObject.search).get("v");
        let regExp = /^(?:https?:\/\/)?(?:www\.)?youtu(?:be)?\.(?:com|be)\/(?:shorts\/)?([^\/?]+)/;
        let result = regExp.exec(url2);
        return id ?? result?.[0] ?? "";
      } catch (e) {
        console.error("\u041D\u0435\u0432\u0435\u0440\u043D\u044B\u0439 URL", e);
        return "";
      }
    };
    const videoID = getYoutubeVideoID(url);
    new YoutubePlayerContainer(elementId, videoID, "");
  };

  // src/utils/fingerprint.ts
  var visitorId;
  var fpPromise = import("https://openfpcdn.io/fingerprintjs/v3").then((FingerprintJS) => FingerprintJS.load());
  var initFingerPrint = async () => {
    visitorId = await fpPromise.then((fp) => fp.get()).then((result) => {
      return result.visitorId;
    });
  };

  // src/utils/string.ts
  function parseJwt(token) {
    var base64Url = token.split(".")[1];
    var base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    var jsonPayload = decodeURIComponent(
      atob(base64).split("").map(function(c) {
        return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
      }).join("")
    );
    return JSON.parse(jsonPayload);
  }

  // src/api/RestClient.ts
  var BASE_URL = "https://api.ai-or-not.com";
  var BASE_URL_RESULTS = "https://results.aiornot.com";
  var RestClient = class {
    apiUrl;
    bearerToken;
    constructor(apiUrl, bearerToken) {
      this.apiUrl = apiUrl;
      this.bearerToken = bearerToken;
    }
    async get(endpoint) {
      const url = `${this.apiUrl}/${endpoint}`;
      try {
        const response = await fetch(url, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${this.bearerToken}`
          }
        });
        return await this.handleResponse(response);
      } catch (error) {
        if (error.status === 429) {
          if (error.message.msg.type === "requests") {
            alert(
              `It looks like you have reached your plan limit of ${error.message.msg.current_limit} requests. To continue, please upgrade to a new plan.`
            );
          }
        }
        console.error("Error", error);
        throw error;
      }
    }
    async post(endpoint, body) {
      const url = `${this.apiUrl}/${endpoint}`;
      try {
        const response = await fetch(url, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${this.bearerToken}`
          },
          body: JSON.stringify(body)
        });
        return await this.handleResponse(response);
      } catch (error) {
        console.error("Request error", error);
        if (error.status === 429) {
          if (error.message.msg.type === "requests") {
            alert(
              `It looks like you have reached your plan limit of ${error.message.msg.current_limit} requests. To continue, please upgrade to a new plan.`
            );
          }
        }
        throw error;
      }
    }
    async postBinary(endpoint, formData) {
      const url = `${this.apiUrl}/${endpoint}`;
      console.log("url", url);
      try {
        const response = await fetch(url, {
          method: "POST",
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${this.bearerToken}`
          },
          body: formData
        });
        const data = await this.handleResponse(response);
        return data;
      } catch (error) {
        console.error("Binary request error:", error);
        if (error.status === 429) {
          if (error.message.msg.type === "requests") {
            alert(
              `It looks like you have reached your plan limit of ${error.message.msg.current_limit} requests. To continue, please upgrade to a new plan.`
            );
          }
        }
        throw error;
      }
    }
    async delete(endpoint) {
      const url = `${this.apiUrl}/${endpoint}`;
      try {
        const response = await fetch(url, {
          method: "DELETE",
          headers: {
            accept: "*/*",
            Authorization: `Bearer ${this.bearerToken}`
          }
        });
        await this.handleResponse(response);
      } catch (error) {
        console.error("\u041E\u0448\u0438\u0431\u043A\u0430 \u043F\u0440\u0438 \u0432\u044B\u043F\u043E\u043B\u043D\u0435\u043D\u0438\u0438 DELETE-\u0437\u0430\u043F\u0440\u043E\u0441\u0430:", error);
        throw error;
      }
    }
    async patch(endpoint, body) {
      const url = `${this.apiUrl}/${endpoint}`;
      try {
        const response = await fetch(url, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${this.bearerToken}`
          },
          body: JSON.stringify(body)
        });
        return await this.handleResponse(response);
      } catch (error) {
        console.error("\u041E\u0448\u0438\u0431\u043A\u0430 \u043F\u0440\u0438 \u0432\u044B\u043F\u043E\u043B\u043D\u0435\u043D\u0438\u0438 PATCH-\u0437\u0430\u043F\u0440\u043E\u0441\u0430:", error);
        throw error;
      }
    }
    async handleResponse(response) {
      if (!response.ok) {
        const errorData = await response.json();
        throw { status: response.status, message: errorData };
      }
      if (response.status !== 204) {
        const data = await response.json();
        return data;
      }
    }
  };

  // src/api/DashboardService.ts
  var _DashboardService = class {
    client;
    constructor() {
      const bearerToken = AuthService.getToken();
      const baseUrl = `${BASE_URL}/aion/users`;
      this.client = new RestClient(baseUrl, bearerToken);
    }
    static getInstance() {
      if (!_DashboardService.instance) {
        _DashboardService.instance = new _DashboardService();
      }
      return _DashboardService.instance;
    }
    static async fetchRequests(offset = 0, limit = 10) {
      try {
        const { client } = _DashboardService.getInstance();
        const endpoint = `data?filters=requests&offset=${offset}&limit=${limit}`;
        return await client.get(endpoint).then((data) => data.requests.array);
      } catch (error) {
        console.error("getRequests:", error);
        return [];
      }
    }
    static async fetchUsageApi() {
      try {
        const { client } = _DashboardService.getInstance();
        const endpoint = `data?filters=all&offset=0&limit=1`;
        return await client.get(endpoint).then((data) => data.api);
      } catch (error) {
        console.error("fetchUsageApi:", error);
        return [];
      }
    }
    static async signUp() {
      try {
        const { client } = _DashboardService.getInstance();
        return await client.post("sign_up", {}).then(() => false).catch((error) => {
          if (error.status === 400) {
            return true;
          }
          throw error;
        });
      } catch (error) {
        console.error("signUp:", error);
        return false;
      }
    }
    static async login() {
      try {
        const { client } = _DashboardService.getInstance();
        return await client.get("login");
      } catch (error) {
        console.error("login:", error);
      }
    }
    static async delete() {
      try {
        const { client } = _DashboardService.getInstance();
        return await client.delete("");
      } catch (error) {
        console.error("delete:", error);
      }
    }
    static async fetchApiToken() {
      try {
        const { client } = _DashboardService.getInstance();
        return await client.post("api_token", {});
      } catch (error) {
        console.error("fetchApiToken:", error);
        console.error("fetchApiToken:", error);
      }
    }
    static async refreshApiToken() {
      try {
        const { client } = _DashboardService.getInstance();
        return await client.patch("api_token", {});
      } catch (error) {
        console.error("refreshApiToken:", error);
      }
    }
    static async fetchSubscriptionData() {
      const { client } = _DashboardService.getInstance();
      try {
        const endpoint = `data?filters=all&offset=0&limit=1`;
        return await client.get(endpoint).then((data) => data);
      } catch (error) {
        console.error("fetchSubscriptionData:", error);
      }
    }
  };
  var DashboardService = _DashboardService;
  __publicField(DashboardService, "instance", null);

  // src/api/AuthService.ts
  var _AuthService = class {
    constructor() {
    }
    static isAuth() {
      if (localStorage.getItem(_AuthService.token_key) !== null) {
        return true;
      }
      return false;
    }
    static setAuth() {
      localStorage.setItem(_AuthService.key, "true");
    }
    static removeAuth() {
      localStorage.removeItem(_AuthService.key);
    }
    static async init() {
      if (_AuthService.isAuth()) {
        await DashboardService.signUp();
        _AuthService.setAuth();
        await DashboardService.login();
      } else {
        await DashboardService.signUp();
        _AuthService.setAuth();
        await DashboardService.login();
      }
    }
    static getToken() {
      return localStorage.getItem("_ms-mid") ?? "";
    }
    static isExpiredToken() {
      const token = _AuthService.getToken();
      if (token?.length > 0) {
        const jwt = parseJwt(token);
        const current_time = Date.now() / 1e3;
        return jwt.exp < current_time;
      }
      return true;
    }
    static checkAuth(redirect_function) {
      if (!_AuthService.isAuth()) {
        const signInModalElement = document.getElementById("sign-up");
        signInModalElement.style.display = "flex";
        signInModalElement.style.zIndex = 100;
        redirect_function();
        return true;
      }
      return false;
    }
  };
  var AuthService = _AuthService;
  __publicField(AuthService, "key", "isSignUp");
  __publicField(AuthService, "token_key", "_ms-mid");

  // src/api/AIGeneratedService.ts
  var _AIGeneratedService = class {
    client;
    constructor() {
      const bearerToken = AuthService.getToken();
      const baseUrl = `${BASE_URL}/aion/ai-generated`;
      this.client = new RestClient(baseUrl, bearerToken);
    }
    static getInstance() {
      if (!_AIGeneratedService.instance) {
        _AIGeneratedService.instance = new _AIGeneratedService();
      }
      return _AIGeneratedService.instance;
    }
    static async getReportsByBinary(file) {
      const { client } = _AIGeneratedService.getInstance();
      try {
        const formData = new FormData();
        formData.append("binary", file, "uploaded-file.png");
        return await client.postBinary("reports/binary", formData);
      } catch (error) {
        if (error.status === 402) {
          alert("Please verify your email to continue using the service");
        }
        if (error.status === 429) {
          alert(`You have reached the limit of requests per day. Alert: ${JSON.stringify(error.message)}`);
          window.location.href = `https://${window.location.host}/#plans`;
        }
        console.error("Error getReportsByBinary:", error);
      }
    }
    static async getReportsByUrl(url) {
      const { client } = _AIGeneratedService.getInstance();
      try {
        const endpoint = `reports/url?url=${url}`;
        return await client.post(endpoint, {});
      } catch (error) {
        if (error.status === 402) {
          alert("Please verify your email to continue using the service");
        }
        console.error("getReportsByUrl:", error);
      }
    }
    static async getAudioVerdict(file) {
      console.log("getAudioVerdict");
      const { client } = _AIGeneratedService.getInstance();
      try {
        const formData = new FormData();
        formData.append("file", file);
        return await client.postBinary("reports/audio/binary", formData);
      } catch (error) {
        if (error.status === 402) {
          alert("Please verify your email to continue using the service");
        }
        console.error("Error getAudioVerdict:", error);
      }
    }
    static async getYoutubeVerdict(link) {
      const { client } = _AIGeneratedService.getInstance();
      try {
        const body = {
          url: link
        };
        return await client.post("reports/audio/link", body);
      } catch (error) {
        if (error.status === 402) {
          alert("Please verify your email to continue using the service");
        }
        console.error("Error getYoutubeVerdict:", error);
      }
    }
  };
  var AIGeneratedService = _AIGeneratedService;
  __publicField(AIGeneratedService, "instance", null);

  // src/api/OpenAIGeneratedService.ts
  var OpenAIGeneratedService = class {
    constructor() {
    }
    static async getReportsByBinary(file, visitorId2) {
      const baseUrl = `${BASE_URL}/results/api/detector/reports/raw?source=web&user_id=${visitorId2}`;
      const formData = new FormData();
      formData.append("binary", file, "file_name.png");
      const options = {
        method: "POST",
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${AuthService.getToken()}`
        },
        body: formData
      };
      return await fetch(baseUrl, options).then((response) => response.json());
    }
    static async getReportsByUrl(url, visitorId2) {
      const baseUrl = `${BASE_URL}/results/api/detector/reports/json?source=web&user_id=${visitorId2}`;
      const options = {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${AuthService.getToken()}`
        },
        body: JSON.stringify({
          object: url
        })
      };
      return await fetch(baseUrl, options).then((response) => response.json());
    }
    static async sendFeedback(id, reportPredict, reportComment, isAudio = false) {
      const body = {
        is_proper_predict: reportPredict,
        comment: reportComment
      };
      let url = `${BASE_URL}/results/api/detector/reports/result/${id}`;
      let options = {
        method: "PUT",
        body: JSON.stringify(body),
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        }
      };
      if (isAudio || !AuthService.isExpiredToken()) {
        url = `${BASE_URL}/aion/ai-generated/reports/${id}`;
        options = {
          method: "PATCH",
          body: JSON.stringify(body),
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
          }
        };
      }
      await fetch(url, options).then((response) => response.json()).then((data) => console.log(data)).catch((error) => console.error(error));
    }
    static async getAudioVerdict(file) {
      const baseUrl = `${BASE_URL}/aion/ai-generated/reports/audio/binary`;
      const formData = new FormData();
      formData.append("file", file);
      const options = {
        method: "POST",
        headers: {
          Accept: "application/json",
          ContentType: "multipart/form-data"
        },
        body: formData
      };
      return await fetch(baseUrl, options).then((response) => response.json());
    }
    static async getYoutubeVerdict(link) {
      const baseUrl = `${BASE_URL}/aion/ai-generated/reports/audio/link`;
      const options = {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          url: link
        })
      };
      return await fetch(baseUrl, options).then((response) => response.json());
    }
  };

  // src/api/RequestCounter.ts
  var _RequestCounter = class {
    constructor() {
    }
    static isLimitExceeded() {
      if (!AuthService.isExpiredToken()) {
        return false;
      }
      return true;
    }
    static increment() {
      const count = localStorage.getItem(_RequestCounter.key);
      const newCount = count === null ? 1 : Number(count) + 1;
      localStorage.setItem(_RequestCounter.key, newCount.toString());
    }
  };
  var RequestCounter = _RequestCounter;
  __publicField(RequestCounter, "key", "requestCount");

  // src/api/WrapperAIGeneratedService.ts
  var WrapperAIGeneratedService = class {
    static async getReportsByBinary(file, visitorId2) {
      if (AuthService.isExpiredToken()) {
        return await OpenAIGeneratedService.getReportsByBinary(file, visitorId2);
      }
      return await AIGeneratedService.getReportsByBinary(file);
    }
    static async getReportsByUrl(url, visitorId2) {
      if (AuthService.isExpiredToken()) {
        return await OpenAIGeneratedService.getReportsByUrl(url, visitorId2);
      }
      return await AIGeneratedService.getReportsByUrl(url);
    }
    static async getAudioVerictByFile(file) {
      return await AIGeneratedService.getAudioVerdict(file);
    }
    static async getAudioVerictMock(verdict) {
      const delay = (ms, value) => {
        return new Promise((resolve) => {
          setTimeout(() => {
            resolve(value);
          }, ms);
        });
      };
      const result = await delay(1500, verdict);
      return JSON.parse(`{
            "id": "41994fdd-0161-43a9-b873-581eccbe6d72",
            "report": {
                "version": "0.0.0",
                "verdict": ${result}
            }
        }`);
    }
    static async getYoutubeVerict(link) {
      if (AuthService.isExpiredToken()) {
        return await OpenAIGeneratedService.getYoutubeVerdict(link);
      }
      return await AIGeneratedService.getYoutubeVerdict(link);
    }
    static async sendFeedback(id, reportPredict, reportComment, isAudio = false) {
      return await OpenAIGeneratedService.sendFeedback(id, reportPredict, reportComment, isAudio);
    }
  };

  // src/dashboard/AudioElements.ts
  var initAudio = () => {
    const imageTab = document.getElementById("image-tab");
    const audioTab = document.getElementById("audio-tab");
    const reportScreen = document.getElementById("report-screen");
    const reportButton_submit = document.querySelector("#button-report-submit");
    const reportInput = document.querySelector("#input-report-comment");
    const reportButtonLike = document.querySelector("#button-report_true");
    const reportButtonDislike = document.querySelector("#button-report_false");
    const reportScreenCloseButton = document.querySelector("#button-report_close");
    const errorMessage = document.querySelector("#url-error-message");
    const cancelProcessingButton = document.querySelector("#processing_cancel");
    const fileInput = document.querySelector("#audio-file-input");
    const fileInputErrorMessage = document.querySelector("#input-error-text");
    const youtubeLinkInput = document.getElementById("ai-or-not_audio-url");
    const checkYoutubeLinkButton = document.getElementById("audio-aion-submit");
    const dropZone = document.querySelector("#ai-or-not-audio_dropzone");
    const dropZoneErrorMessage = document.querySelector("#ai-or-not_dropzone-text");
    const resultContainer = document.querySelector("#audio-result-screen_col");
    const shareButtonsContainer = document.querySelector("#share-items-hide");
    const shareComponentContainer = document.querySelector("#result-screen_share-component");
    const dropZoneRequestCounter = document.querySelector("#ai-or-not-dropzone-counter");
    const dropZoneRequestCounterContainer = document.querySelector("#ai-or-not-dropzone-counter-w");
    let fileSizeAllow;
    let currentResultId;
    shareButtonsContainer.classList.add("hide");
    function activeTab() {
      if (imageTab.classList.contains("w--current")) {
        return "image";
      }
      return "audio";
    }
    initFingerPrint();
    const uiReported_initialState = () => {
      reportInput.value = "";
      const buttonText_true = document.querySelector("#button-report_true-text");
      const buttonText_false = document.querySelector("#button-report_false-text");
      buttonText_false.classList.add("hide");
      buttonText_true.classList.remove("hide");
      buttonText_true.textContent = buttonText_true.getAttribute("report-button-text-default");
      buttonText_false.textContent = buttonText_false.getAttribute("report-button-text-default");
      reportButtonLike.classList.remove("is-reported");
      reportButtonDislike.classList.remove("is-reported");
      reportButtonLike.classList.remove("hide");
      reportButtonDislike.classList.remove("hide");
    };
    const changeShareUrl = (responseId) => {
      currentResultId = responseId;
      const element = document.querySelector('[fs-socialshare-element="url"]');
      const shareUrlTemplate = AuthService.isExpiredToken() ? `${BASE_URL_RESULTS}/aiornot/` : `${BASE_URL_RESULTS}/aiornot/users/`;
      const shareUrl = `${shareUrlTemplate}${responseId}`;
      element.textContent = shareUrl;
      const allShareUrl = document.querySelectorAll(".audio-result-screen_share-item");
      allShareUrl.forEach((el) => {
        el.setAttribute("data-url", shareUrl);
      });
    };
    const fileSizeMessage_ok = () => {
      dropZoneErrorMessage.textContent = "We support 10 Mb of maximum size.";
      dropZoneErrorMessage.classList.remove("text-color-red");
      fileInputErrorMessage.textContent = "Something went wrong. Try again.";
      errorMessage.classList.add("hide");
    };
    const someThingWentWrong_error = () => {
      errorMessage.classList.remove("hide");
    };
    const someThingWentWrong_ok = () => {
      errorMessage.classList.add("hide");
    };
    const fileSizeMessage_error = () => {
      if (resultContainer.classList.contains("hide")) {
        dropZoneErrorMessage.textContent = "File is too large (max 10 MB)";
        dropZoneErrorMessage.classList.add("text-color-red");
      } else {
        fileInputErrorMessage.textContent = "File is too large (max 10 MB)";
        errorMessage.classList.remove("hide");
      }
    };
    const fillPlayerCardByFile = (file) => {
      const fileURL = URL.createObjectURL(file);
      new AudioPlayerContainer("result-screen_audio-wrapper", fileURL, file.name, true);
    };
    const fillYoutubePlayerCard = (link) => {
      createYoutubePlayer("result-screen_audio-wrapper", link);
    };
    fileInput?.addEventListener("change", () => {
      console.log("audio change");
      if (AuthService.checkAuth(screen_homeShow))
        return;
      const fileSize = fileInput?.files[0].size;
      const maxSize = 10 * 1024 * 1024;
      if (fileSize > maxSize) {
        fileSizeAllow = false;
        fileSizeMessage_error();
      } else {
        fileSizeAllow = true;
        fileSizeMessage_ok();
      }
    });
    const error_dropZone = () => {
      document.querySelector("#processing-screen").classList.add("hide");
      dropZoneErrorMessage.classList.add("error");
      dropZone.classList.add("red-border");
      dropZoneErrorMessage.textContent = "Something went wrong. Try again.";
    };
    const initial_dropZone = () => {
      dropZoneErrorMessage.classList.remove("error");
      dropZone.classList.remove("red-border");
      dropZoneErrorMessage.textContent = "We support jpeg, png, webp, gif, tiff, bmp. 10 Mb of maximum size.";
    };
    const screen_homeShow = () => {
      document.querySelector("#choose-file-row").classList.add("hide");
      document.querySelector("#legal-tip").classList.remove("hide");
      document.querySelector("#processing-screen").classList.add("hide");
      document.querySelector("#hero-home_title-description").classList.remove("hide");
      document.querySelector("#hero-home_gallery").classList.remove("hide");
      document.querySelector("#ai-or-not-audio_dropzone").classList.remove("hide");
      document.querySelector("#hero-home_drop-zone-divider").classList.remove("hide");
      document.querySelector("#audio-result-screen_col").classList.add("hide");
      document.querySelector("#result-screen_audio-wrapper").classList.add("hide");
    };
    const loadingStart = () => {
      uiReported_initialState();
      fileInputErrorMessage.textContent = "Something went wrong. Try again.";
      document.querySelector("#choose-file-row").classList.remove("hide");
      document.querySelector("#legal-tip").classList.add("hide");
      document.querySelector(".processing-screen_triggers_5").click();
      document.querySelector("#processing-screen").classList.remove("hide");
      document.querySelector(".processing-screen_triggers_1").click();
      document.querySelector("#hero-home_title-description").classList.add("hide");
      document.querySelector("#hero-home_gallery").classList.add("hide");
      document.querySelector("#ai-or-not-audio_dropzone").classList.add("hide");
      document.querySelector("#hero-home_drop-zone-divider").classList.add("hide");
      document.querySelector("#audio-result-screen_col").classList.remove("hide");
      document.querySelector("#result-screen_audio-wrapper").classList.remove("hide");
    };
    function loadingFinish() {
      document.querySelector(".processing-screen_triggers_3")?.click();
      document.querySelector("#processing-screen").classList.add("hide");
      document.querySelector(".processing-screen_triggers_5")?.click();
      document.querySelector("#audio-report-buttons-screen").classList.add("hide");
      document.querySelector("#audio-share-items-hide").classList.add("hide");
      document.querySelector("#audio-hero-home_drop-zone-divider").classList.add("hide");
      document.querySelector("#audio-hero-home_title-description").classList.add("hide");
      document.querySelector("#audio-hero-home_gallery").classList.add("hide");
      fileInput.value = "";
      youtubeLinkInput.value = "";
    }
    const findHighestConfidence = (data) => {
      if (data === "unknown") {
        document.getElementById("audio-title-human").innerHTML = "Sorry, but in this case we can't really say if it's AI or Not";
        document.getElementById("audio-ai-or-not_result-message-50").classList.remove("hide");
        document.getElementById("audio-ai-or-not_result-message").classList.add("hide");
        document.getElementById("audio-ai-or-not_result-message-50").innerHTML = "Probly the uploaded audio has most likely been modified or compressed";
        document.getElementById("audio-title-human").classList.remove("hide");
        document.getElementById("audio-title-ai").classList.add("hide");
      } else {
        document.getElementById("audio-title-ai").innerHTML = 'This is likely <span class="text-color-green">AI</span>';
        document.getElementById("audio-title-human").innerHTML = 'This is likely <span class="text-color-green">Human</span>';
        document.getElementById("audio-ai-or-not_result-message-50").classList.add("hide");
        document.getElementById("audio-ai-or-not_result-message").classList.remove("hide");
        document.querySelector("#audio-ai-or-not_model-name").textContent = data;
        if (data === "ai") {
          document.getElementById("audio-title-human").classList.add("hide");
          document.getElementById("audio-title-ai").classList.remove("hide");
        } else {
          document.getElementById("audio-title-human").classList.remove("hide");
          document.getElementById("audio-title-ai").classList.add("hide");
        }
      }
    };
    const submitYoutubeLink = async (link) => {
      if (RequestCounter.isLimitExceeded()) {
        const signInModalElement = document.getElementById("sign-up");
        signInModalElement.style.display = "flex";
        signInModalElement.style.zIndex = 100;
        screen_homeShow();
      } else {
        errorMessage.classList.add("hide");
        loadingStart();
        await WrapperAIGeneratedService.getYoutubeVerict(link).then((response) => {
          changeShareUrl(response.id);
          findHighestConfidence(response.report.verdict === true ? "ai" : "human");
          loadingFinish();
          fillYoutubePlayerCard(link);
        }).catch((error) => {
          if (resultContainer.classList.contains("hide")) {
            someThingWentWrong_error();
          } else {
            someThingWentWrong_error();
            screen_homeShow();
          }
          console.log(error);
        });
      }
    };
    const dropzone = document.body;
    const tipMessage = document.querySelector("#dropzone-fullscreen_message-tip");
    const formatMessage = document.querySelector("#dropzone-fullscreen_message-format");
    dropzone?.addEventListener("dragover", function(event) {
      event.preventDefault();
      document.querySelector(".dropzone-fullscreen").classList.remove("hide");
    });
    dropzone?.addEventListener("dragleave", function(event) {
      event.preventDefault();
      document.querySelector(".dropzone-fullscreen").classList.add("hide");
    });
    dropzone?.addEventListener("drop", async function(event) {
      if (AuthService.checkAuth(screen_homeShow)) {
        document.querySelector(".dropzone-fullscreen").classList.add("hide");
        return;
      }
      if (activeTab() !== "audio") {
        return;
      }
      event.preventDefault();
      document.querySelector(".dropzone-fullscreen").classList.add("hide");
      const file = event.dataTransfer.files[0];
      const fileSize = file.size;
      const maxSize = 10 * 1024 * 1024;
      if (fileSize > maxSize) {
        fileSizeAllow = false;
        fileSizeMessage_error();
      } else {
        fileSizeAllow = true;
        fileSizeMessage_ok();
      }
      if (fileSizeAllow == true) {
        await uploadBinaryFileAudio(file);
      } else {
        fileSizeMessage_error();
      }
    });
    fileInput?.addEventListener("change", async (event) => {
      if (fileSizeAllow == true) {
        const file = fileInput.files[0];
        await uploadBinaryFileAudio(file);
      } else {
        fileSizeMessage_error();
      }
    });
    const uploadBinaryFileAudio = async (file) => {
      console.log(file.type);
      if (file.type === "audio/mpeg" || file.type === "audio/mp3") {
        loadingStart();
        await WrapperAIGeneratedService.getAudioVerictByFile(file).then((response) => {
          console.log(response);
          initial_dropZone();
          findHighestConfidence(response.report.verdict === true ? "ai" : "human");
          loadingFinish();
          fillPlayerCardByFile(file);
        }).catch((error) => {
          console.log(error);
          error_dropZone();
          screen_homeShow();
        });
      }
    };
    const tappedSampleAudio = async (url, name2) => {
      if (AuthService.checkAuth(screen_homeShow))
        return;
      loadingStart();
      await WrapperAIGeneratedService.getAudioVerictMock(true).then((response) => {
        changeShareUrl(response.id);
        initial_dropZone();
        findHighestConfidence(response.report.verdict === true ? "ai" : "human");
        loadingFinish();
        new AudioPlayerContainer("result-screen_audio-wrapper", url, name2, true);
      });
    };
    cancelProcessingButton?.addEventListener("click", function() {
      initial_dropZone();
      screen_homeShow();
    });
    document.querySelector("#ai-or-not-audio_dropzone")?.addEventListener("click", function() {
      if (activeTab() !== "audio") {
        return;
      }
      if (AuthService.checkAuth(screen_homeShow))
        return;
      fileInput.click();
    });
    document.querySelector("#choose-file-row")?.addEventListener("click", function() {
      fileInput.click();
    });
    checkYoutubeLinkButton?.addEventListener("click", () => {
      if (youtubeLinkInput.value != "") {
        console.log("youtubeLinkInput.value");
        submitYoutubeLink(youtubeLinkInput.value);
      }
    });
    youtubeLinkInput?.addEventListener("keypress", (e) => {
      if (e.key === "Enter") {
        if (youtubeLinkInput.value != "") {
          submitYoutubeLink(youtubeLinkInput.value);
        }
      }
    });
    youtubeLinkInput.addEventListener("input", (e) => {
      const youtubeLink = e.target.value;
      const isYouTubeLink = (url) => {
        const regExp = /^(?:https?:\/\/)?(?:www\.)?(?:music\.)?youtu(?:be)?\.(?:com|be)\/(?:shorts\/)?([^\/?]+)/;
        return regExp.test(url);
      };
      if (isYouTubeLink(youtubeLink)) {
        checkYoutubeLinkButton.classList.remove("is-disabled");
      } else {
        checkYoutubeLinkButton.classList.add("is-disabled");
      }
    });
    const uiReported_false = () => {
      const buttonText = document.querySelector("#button-report_false-text");
      buttonText.classList.remove("hide");
      buttonText.textContent = buttonText.getAttribute("report-button-text-default_reported");
      reportButtonDislike.classList.add("is-reported");
      reportButtonLike.classList.add("hide");
      reportScreen.style.display = "none";
    };
    const uiReported_true = () => {
      const buttonText = document.querySelector("#button-report_true-text");
      buttonText.classList.remove("hide");
      buttonText.textContent = buttonText.getAttribute("report-button-text-default_reported");
      reportButtonLike.classList.add("is-reported");
      reportButtonDislike.classList.add("hide");
    };
    reportButtonLike?.addEventListener("click", () => {
      uiReported_true();
      WrapperAIGeneratedService.sendFeedback(currentResultId, true, "", true);
    });
    reportButtonDislike?.addEventListener("click", () => {
      reportScreen.style.display = "flex";
    });
    reportScreenCloseButton?.addEventListener("click", () => {
      reportScreen.style.display = "none";
    });
    reportButton_submit?.addEventListener("click", () => {
      uiReported_false();
      WrapperAIGeneratedService.sendFeedback(currentResultId, false, reportInput.value, true);
    });
    document?.addEventListener("keydown", (event) => {
      if (event.code === "Escape") {
        if (reportScreen.style.display !== "none") {
          reportScreenCloseButton.click();
        }
      }
    });
    reportInput?.addEventListener("change", () => {
      if (reportInput.value != "") {
        reportButton_submit.classList.remove("is-disabled");
      } else {
        reportButton_submit.classList.add("is-disabled");
      }
    });
    reportInput?.addEventListener("input", () => {
      if (reportInput.value != "") {
        reportButton_submit.classList.remove("is-disabled");
      } else {
        reportButton_submit.classList.add("is-disabled");
      }
    });
    const manager = new PlayerManager([
      new AudioPlayerContainer("audio-sample-1", "https://atrium-junk.s3.amazonaws.com/ai-or-not-audio-samples/Adel", "Adel"),
      new AudioPlayerContainer(
        "audio-sample-2",
        "https://atrium-junk.s3.amazonaws.com/ai-or-not-audio-samples/Bull+Greek.mp3",
        "Bull Greek"
      ),
      new AudioPlayerContainer(
        "audio-sample-3",
        "https://atrium-junk.s3.amazonaws.com/ai-or-not-audio-samples/Sample+1.mp3",
        "Sample 1"
      ),
      new AudioPlayerContainer(
        "audio-sample-4",
        "https://atrium-junk.s3.amazonaws.com/ai-or-not-audio-samples/Sample+2.mp3",
        "Sample 2"
      ),
      new AudioPlayerContainer(
        "audio-sample-5",
        "https://atrium-junk.s3.amazonaws.com/ai-or-not-audio-samples/Sample+3.mp3",
        "Sample 3"
      ),
      new AudioPlayerContainer(
        "audio-sample-6",
        "https://atrium-junk.s3.amazonaws.com/ai-or-not-audio-samples/Trump+speech.mp3",
        "Trump speech"
      )
    ]);
    manager.players.forEach((player) => {
      player.container?.addEventListener("click", async () => {
        if (player.audioPlayer?.audio.paused) {
          tappedSampleAudio(player.audioSrc, player.name);
        }
      });
    });
    const closeSignUpButton = document.getElementById("close-sign-up");
    closeSignUpButton?.addEventListener("click", () => {
      const signInModalElement = document.getElementById("sign-up");
      signInModalElement.style.display = "none";
      signInModalElement.style.zIndex = 0;
    });
    const usage = document.querySelector("#audio-quotas");
    if (AuthService.isAuth()) {
      DashboardService.fetchSubscriptionData().then((user_plan) => {
        if (user_plan) {
          const { quantity } = user_plan.plan?.requests_limits || { quantity: 20 };
          const { total } = user_plan.requests;
          usage.innerHTML = `
            <div style="margin-top: 20px; font-size: 1rem; color: white">
            <span">
                Available ${quantity - total} from ${quantity} requests 
            </span>
            </div>`;
        } else {
          usage.textContent = ``;
        }
      });
    } else {
      usage.textContent = "Please Sign in to see your usage";
      usage.style.color = "white";
      usage.style.marginTop = "20px";
    }
  };

  // src/dashboard/ContactUs.ts
  var submitButton = document.querySelector("#contact-us-submit-button");
  var name = document.querySelector("#name");
  var email = document.querySelector("#E-Mail");
  var note = document.querySelector("#Note");
  var company = document.querySelector("#Company");
  if (submitButton) {
    submitButton.classList.remove("is-disabled");
    submitButton.addEventListener("click", async (event) => {
      event.preventDefault();
      const response = {
        name: name.value,
        email: email.value,
        note: note.value,
        company: company.value
      };
      for (const key in response) {
        if (key === "company")
          continue;
        if (response[key] === "") {
          alert(`Please fill in all required fields ${key}`);
          return;
        }
      }
      console.log(response);
      fetch(`${BASE_URL}/aion/system/post_message`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(response)
      }).then((response2) => {
        if (response2.ok) {
          alert("Thank you for your application! We will contact you shortly.");
          window.location.href = "https://aiornot.webflow.io/";
        } else {
          alert("Something went wrong. Please try again.");
        }
      });
    });
  }

  // node_modules/@stripe/stripe-js/dist/stripe.esm.js
  var V3_URL = "https://js.stripe.com/v3";
  var V3_URL_REGEX = /^https:\/\/js\.stripe\.com\/v3\/?(\?.*)?$/;
  var EXISTING_SCRIPT_MESSAGE = "loadStripe.setLoadParameters was called but an existing Stripe.js script already exists in the document; existing script parameters will be used";
  var findScript = function findScript2() {
    var scripts = document.querySelectorAll('script[src^="'.concat(V3_URL, '"]'));
    for (var i = 0; i < scripts.length; i++) {
      var script = scripts[i];
      if (!V3_URL_REGEX.test(script.src)) {
        continue;
      }
      return script;
    }
    return null;
  };
  var injectScript = function injectScript2(params) {
    var queryString = params && !params.advancedFraudSignals ? "?advancedFraudSignals=false" : "";
    var script = document.createElement("script");
    script.src = "".concat(V3_URL).concat(queryString);
    var headOrBody = document.head || document.body;
    if (!headOrBody) {
      throw new Error("Expected document.body not to be null. Stripe.js requires a <body> element.");
    }
    headOrBody.appendChild(script);
    return script;
  };
  var registerWrapper = function registerWrapper2(stripe, startTime) {
    if (!stripe || !stripe._registerWrapper) {
      return;
    }
    stripe._registerWrapper({
      name: "stripe-js",
      version: "2.1.7",
      startTime
    });
  };
  var stripePromise = null;
  var loadScript = function loadScript2(params) {
    if (stripePromise !== null) {
      return stripePromise;
    }
    stripePromise = new Promise(function(resolve, reject) {
      if (typeof window === "undefined" || typeof document === "undefined") {
        resolve(null);
        return;
      }
      if (window.Stripe && params) {
        console.warn(EXISTING_SCRIPT_MESSAGE);
      }
      if (window.Stripe) {
        resolve(window.Stripe);
        return;
      }
      try {
        var script = findScript();
        if (script && params) {
          console.warn(EXISTING_SCRIPT_MESSAGE);
        } else if (!script) {
          script = injectScript(params);
        }
        script.addEventListener("load", function() {
          if (window.Stripe) {
            resolve(window.Stripe);
          } else {
            reject(new Error("Stripe.js not available"));
          }
        });
        script.addEventListener("error", function() {
          reject(new Error("Failed to load Stripe.js"));
        });
      } catch (error) {
        reject(error);
        return;
      }
    });
    return stripePromise;
  };
  var initStripe = function initStripe2(maybeStripe, args, startTime) {
    if (maybeStripe === null) {
      return null;
    }
    var stripe = maybeStripe.apply(void 0, args);
    registerWrapper(stripe, startTime);
    return stripe;
  };
  var stripePromise$1 = Promise.resolve().then(function() {
    return loadScript(null);
  });
  var loadCalled = false;
  stripePromise$1["catch"](function(err) {
    if (!loadCalled) {
      console.warn(err);
    }
  });
  var loadStripe = function loadStripe2() {
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    loadCalled = true;
    var startTime = Date.now();
    return stripePromise$1.then(function(maybeStripe) {
      return initStripe(maybeStripe, args, startTime);
    });
  };

  // src/api/Payments.ts
  var PaymentsClient = class {
    elements = null;
    stripe = null;
    home_element = document.querySelector("#home");
    PRODUCT_ID_BASE_PLAN = { id: "price_1O2Ba4Ba9yG4sk8k4y3ZnEVT", msg: "Base plan: $30/month" };
    PRODUCT_ID_PRO_PLAN = { id: "price_1O2Ku4Ba9yG4sk8kIQBdzpPj", msg: "Pro plan: $250/month" };
    createPaymentForm(text) {
      this.home_element.innerHTML = `
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
                <h2 style="color: black; font-size: 2.5rem; justify-content: center">${text}</h2>
                <br>
                <form id="payment-form" style="min-width: 380px">
                    <div id="payment-element"></div>
                    <br>
                    // Add callback function
                    <button class="button" style="width: 100%" id="submit">
                        <div class="spinner hidden" id="spinner"></div>
                        <span style="width: 100 %;" id="button-text">Pay</span>
                    </button>
                </form>
            </div>
        </div>
        </div>
        </div>
    `;
      const btn = document.querySelector("#submit");
      btn.addEventListener("click", () => {
        console.log("test");
        this.completePayment();
      });
    }
    async createPaymentIntent(product) {
      fetch(`${BASE_URL}/aion/payments/config`).then((result) => {
        return result.json();
      }).then((data) => {
        loadStripe(data.stripe_public_key).then((stripe) => {
          this.stripe = stripe;
          fetch(`${BASE_URL}/aion/payments/create_intent`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${this.checkUserToken()}`
            },
            body: JSON.stringify({
              product_id: product.id
            })
          }).then((result) => {
            return result.json();
          }).then((data2) => {
            if (data2.code === 10) {
              console.warn(data2.message);
              alert(data2.message);
              window.location.href = `https://${window.location.host}/`;
              throw new Error(data2.message);
            }
            this.createPaymentForm(product.msg);
            this.elements = this.stripe.elements({ clientSecret: data2.client_secret });
            const paymentElement = this.elements.create("payment");
            paymentElement.mount("#payment-element");
          }).catch((error) => {
            console.error("Something wrong when create a payment intent", error);
            alert("Something wrong when create a payment. Please try again.");
          });
        });
      });
    }
    paymentCheckoutSession(product_id) {
      fetch(`${BASE_URL}/aion/payments/checkout_session`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${this.checkUserToken()}`
        },
        body: JSON.stringify({
          product_id,
          quantity: 1,
          success_redirect_url: "https://aiornot.webflow.io/dashboard/history",
          cancel_redirect_url: "https://aiornot.webflow.io/new-home#pricing"
        })
      }).then((result) => {
        return result.json();
      }).then((data) => {
        console.log(data);
        if (data.code === 10) {
          console.warn(data.message);
          alert(data.message);
          throw new Error(data.message);
        }
        loadStripe(data.checkout_public_key).then((stripe) => {
          if (!stripe) {
            console.error("Something wrong when create a Stripe object");
            return;
          }
          stripe.redirectToCheckout({
            sessionId: data.checkout_session_id
          });
        });
      }).catch((error) => {
        console.error("Something wrong when create a checkout session", error);
      });
    }
    checkUserToken() {
      const userAccessToken = localStorage.getItem("_ms-mid");
      if (!userAccessToken) {
        throw new Error("User token not found");
      }
      return userAccessToken;
    }
    completePayment() {
      console.log("completePayment");
      console.log(this.elements);
      this.stripe.confirmPayment({
        elements: this.elements,
        confirmParams: {
          return_url: `https://${window.location.host}/dashboard/history`
        }
      }).then((result) => {
        if (result.error) {
          console.error(result.error.message);
          alert(result.error.message);
        } else {
          console.log(result);
        }
      });
    }
  };

  // src/dashboard/Payments.ts
  var buttonPayFreePlan = document.querySelector("#bt-pay-free");
  var buttonPayBasePlan = document.querySelector("#bt-pay-basic");
  var buttonPayProPlan = document.querySelector("#bt-pay-pro");
  var buttonPayEnterpricePlan = document.querySelector("#bt-pay-enterprice");
  var paymentClient = new PaymentsClient();
  buttonPayFreePlan?.addEventListener("click", () => {
    if (localStorage.getItem("_ms-mid")) {
      window.location.href = `https://${window.location.host}/`;
    } else {
      window.location.href = `https://${window.location.host}/signup`;
    }
  });
  buttonPayBasePlan?.addEventListener("click", () => {
    DashboardService.fetchSubscriptionData().then((user_plan) => {
      if (user_plan.plan) {
        alert("You already have a subscription !!!");
      } else {
        paymentClient.createPaymentForm("Basic plan: $30/month");
        paymentClient.createPaymentIntent(paymentClient.PRODUCT_ID_BASE_PLAN);
      }
    });
  });
  buttonPayProPlan?.addEventListener("click", () => {
    DashboardService.fetchSubscriptionData().then((user_plan) => {
      if (user_plan.plan) {
        alert("You already have a subscription !!!");
      } else {
        paymentClient.createPaymentIntent(paymentClient.PRODUCT_ID_PRO_PLAN);
      }
    });
  });
  buttonPayEnterpricePlan?.addEventListener("click", () => {
    window.location.href = `https://${window.location.host}/contact-us`;
  });

  // src/player.ts
  initAudio();
})();
//# sourceMappingURL=player.js.map
