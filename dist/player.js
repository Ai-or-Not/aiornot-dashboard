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
  var BASE_URL = "https://v3-atrium-prod-api.optic.xyz";
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
        console.error("\u041E\u0448\u0438\u0431\u043A\u0430 \u043F\u0440\u0438 \u0432\u044B\u043F\u043E\u043B\u043D\u0435\u043D\u0438\u0438 GET-\u0437\u0430\u043F\u0440\u043E\u0441\u0430:", error);
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
        console.error("\u041E\u0448\u0438\u0431\u043A\u0430 \u043F\u0440\u0438 \u0432\u044B\u043F\u043E\u043B\u043D\u0435\u043D\u0438\u0438 POST-\u0437\u0430\u043F\u0440\u043E\u0441\u0430:", error);
        throw error;
      }
    }
    async postBinary(endpoint, formData) {
      const url = `${this.apiUrl}/${endpoint}`;
      try {
        const response = await fetch(url, {
          method: "POST",
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${this.bearerToken}`
          },
          body: formData
        });
        return await this.handleResponse(response);
      } catch (error) {
        console.error("\u041E\u0448\u0438\u0431\u043A\u0430 \u043F\u0440\u0438 \u0432\u044B\u043F\u043E\u043B\u043D\u0435\u043D\u0438\u0438 POST-\u0437\u0430\u043F\u0440\u043E\u0441\u0430:", error);
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
        return await response.json();
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
        const client = _DashboardService.getInstance().client;
        const endpoint = `data?filters=requests&offset=${offset}&limit=${limit}`;
        return await client.get(endpoint).then((data) => data.requests.array);
      } catch (error) {
        console.error("\u041E\u0448\u0438\u0431\u043A\u0430 getRequests:", error);
        return [];
      }
    }
    static async fetchUsageApi() {
      try {
        const client = _DashboardService.getInstance().client;
        const endpoint = `data?filters=api&offset=0&limit=10`;
        return await client.get(endpoint).then((data) => data.api);
      } catch (error) {
        console.error("\u041E\u0448\u0438\u0431\u043A\u0430 fetchUsageApi:", error);
        return [];
      }
    }
    static async signUp() {
      try {
        const client = _DashboardService.getInstance().client;
        return await client.post("sign_up", {}).then(() => false).catch((error) => {
          if (error.status === 400) {
            return true;
          }
          throw error;
        });
      } catch (error) {
        console.error("\u041E\u0448\u0438\u0431\u043A\u0430 signUp:", error);
        return false;
      }
    }
    static async login() {
      try {
        const client = _DashboardService.getInstance().client;
        return await client.get("login");
      } catch (error) {
        console.error("\u041E\u0448\u0438\u0431\u043A\u0430 login:", error);
      }
    }
    static async delete() {
      try {
        const client = _DashboardService.getInstance().client;
        return await client.delete("");
      } catch (error) {
        console.error("\u041E\u0448\u0438\u0431\u043A\u0430 delete:", error);
      }
    }
    static async fetchApiToken() {
      try {
        const client = _DashboardService.getInstance().client;
        return await client.post("api_token", {});
      } catch (error) {
        console.error("\u041E\u0448\u0438\u0431\u043A\u0430 fetchApiToken:", error);
      }
    }
    static async refreshApiToken() {
      try {
        const client = _DashboardService.getInstance().client;
        return await client.patch("api_token", {});
      } catch (error) {
        console.error("\u041E\u0448\u0438\u0431\u043A\u0430 refreshApiToken:", error);
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
      if (localStorage.getItem(_AuthService.key) !== null) {
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
  };
  var AuthService = _AuthService;
  __publicField(AuthService, "key", "isSignUp");

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
      const client = _AIGeneratedService.getInstance().client;
      try {
        const formData = new FormData();
        formData.append("binary", file, "uploaded-file.png");
        return await client.postBinary("reports/binary", formData);
      } catch (error) {
        if (error.status === 402) {
          alert("Please verify your email to continue using the service");
        }
        console.error("Error getReportsByBinary:", error);
      }
    }
    static async getReportsByUrl(url) {
      const client = _AIGeneratedService.getInstance().client;
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
      const client = _AIGeneratedService.getInstance().client;
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
      const client = _AIGeneratedService.getInstance().client;
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
      } else {
        return await AIGeneratedService.getReportsByBinary(file);
      }
    }
    static async getReportsByUrl(url, visitorId2) {
      if (AuthService.isExpiredToken()) {
        return await OpenAIGeneratedService.getReportsByUrl(url, visitorId2);
      } else {
        return await AIGeneratedService.getReportsByUrl(url);
      }
      alert("Message");
    }
    static async getAudioVerictByFile(file) {
      if (AuthService.isExpiredToken()) {
        return await OpenAIGeneratedService.getAudioVerdict(file);
      } else {
        return await AIGeneratedService.getAudioVerdict(file);
      }
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
      } else {
        return await AIGeneratedService.getYoutubeVerdict(link);
      }
    }
    static async sendFeedback(id, reportPredict, reportComment, isAudio = false) {
      return await OpenAIGeneratedService.sendFeedback(id, reportPredict, reportComment, isAudio);
    }
  };

  // src/utils/fingerprint.ts
  var visitorId;
  var fpPromise = import("https://openfpcdn.io/fingerprintjs/v3").then((FingerprintJS) => FingerprintJS.load());
  var initFingerPrint = async () => {
    visitorId = await fpPromise.then((fp) => fp.get()).then((result) => {
      return result.visitorId;
    });
  };

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
    constructor(containerId, audioSrc, name, isSquare = false) {
      this.containerId = containerId;
      this.container = document.getElementById(containerId);
      this.audioSrc = audioSrc;
      this.name = name;
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
    constructor(containerId, videoId, name) {
      this.containerId = containerId;
      this.container = document.getElementById(containerId);
      this.videoId = videoId;
      this.name = name;
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

  // src/dashboard/AudioElements.ts
  var initAudio = () => {
    const reportScreen = document.getElementById("report-screen");
    const reportButton_submit = document.querySelector("#button-report-submit");
    const reportInput = document.querySelector("#input-report-comment");
    const reportButtonLike = document.querySelector("#button-report_true");
    const reportButtonDislike = document.querySelector("#button-report_false");
    const reportScreenCloseButton = document.querySelector("#button-report_close");
    const errorMessage = document.querySelector("#url-error-message");
    const cancelProcessingButton = document.querySelector("#processing_cancel");
    const fileInput = document.querySelector("#file-input");
    const fileInputErrorMessage = document.querySelector("#input-error-text");
    const youtubeLinkInput = document.getElementById("ai-or-not_image-url");
    const checkYoutubeLinkButton = document.getElementById("ai-or-not_submit");
    const dropZone = document.querySelector("#ai-or-not_dropzone");
    const dropZoneErrorMessage = document.querySelector("#ai-or-not_dropzone-text");
    const resultContainer = document.querySelector("#result-screen_col");
    const shareButtonsContainer = document.querySelector("#share-items-hide");
    const dropZoneRequestCounter = document.querySelector("#ai-or-not-dropzone-counter");
    const dropZoneRequestCounterContainer = document.querySelector("#ai-or-not-dropzone-counter-w");
    let fileSizeAllow;
    let currentResultId;
    const updateRequestCounter = () => {
      if (!AuthService.isExpiredToken()) {
        dropZoneRequestCounterContainer?.classList.add("hide");
      } else {
        const value = localStorage.getItem("requestCount") || "0";
        dropZoneRequestCounter.textContent = Number(value) <= 5 ? value : "5";
        dropZoneRequestCounterContainer.classList.remove("hide");
      }
    };
    updateRequestCounter();
    initFingerPrint();
    const uiReported_initialState = () => {
      reportInput.value = "";
      let buttonText_true = document.querySelector("#button-report_true-text");
      let buttonText_false = document.querySelector("#button-report_false-text");
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
      let shareUrlTemplate = AuthService.isExpiredToken() ? `${BASE_URL_RESULTS}/aiornot/` : `${BASE_URL_RESULTS}/aiornot/users/`;
      const shareUrl = `${shareUrlTemplate}${responseId}`;
      element.textContent = shareUrl;
      let allShareUrl = document.querySelectorAll(".result-screen_share-item");
      allShareUrl.forEach((el) => {
        el.setAttribute("data-url", shareUrl);
      });
    };
    const fileSizeMessage_ok = () => {
      dropZoneErrorMessage.textContent = "We support jpeg, png, webp, gif, tiff, bmp. 10 Mb of maximum size.";
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
      new AudioPlayerContainer("result-screen_image-wrapper", fileURL, file.name, true);
    };
    const fillYoutubePlayerCard = (link) => {
      createYoutubePlayer("result-screen_image-wrapper", link);
    };
    fileInput?.addEventListener("change", () => {
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
      document.querySelector("#ai-or-not_dropzone").classList.remove("hide");
      document.querySelector("#hero-home_drop-zone-divider").classList.remove("hide");
      document.querySelector("#result-screen_col").classList.add("hide");
      document.querySelector("#result-screen_image-wrapper").classList.add("hide");
    };
    const loadingStart = () => {
      uiReported_initialState();
      someThingWentWrong_ok();
      fileInputErrorMessage.textContent = "Something went wrong. Try again.";
      document.querySelector("#choose-file-row").classList.remove("hide");
      document.querySelector("#legal-tip").classList.add("hide");
      document.querySelector(".processing-screen_triggers_5").click();
      document.querySelector("#processing-screen").classList.remove("hide");
      document.querySelector(".processing-screen_triggers_1").click();
      document.querySelector("#hero-home_title-description").classList.add("hide");
      document.querySelector("#hero-home_gallery").classList.add("hide");
      document.querySelector("#ai-or-not_dropzone").classList.add("hide");
      document.querySelector("#hero-home_drop-zone-divider").classList.add("hide");
      document.querySelector("#result-screen_col").classList.remove("hide");
      document.querySelector("#result-screen_image-wrapper").classList.remove("hide");
    };
    function loadingFinish() {
      shareButtonsContainer.classList.remove("hide");
      document.querySelector(".processing-screen_triggers_3")?.click();
      document.querySelector("#processing-screen").classList.add("hide");
      document.querySelector(".processing-screen_triggers_5")?.click();
      document.querySelector("#scroll-to-top-trigger")?.click();
      fileInput.value = "";
      youtubeLinkInput.value = "";
    }
    const findHighestConfidence = (data) => {
      if (data === "unknown") {
        document.getElementById("title-human").innerHTML = "Sorry, but in this case we can't really say if it's AI or Not";
        document.getElementById("ai-or-not_result-message-50").classList.remove("hide");
        document.getElementById("ai-or-not_result-message").classList.add("hide");
        document.getElementById("ai-or-not_result-message-50").innerHTML = "Probly the uploaded audio has most likely been modified or compressed";
        document.getElementById("title-human").classList.remove("hide");
        document.getElementById("title-ai").classList.add("hide");
      } else {
        document.getElementById("title-ai").innerHTML = 'This audio is generated by <span class="text-color-green">AI</span>';
        document.getElementById("title-human").innerHTML = 'This audio is generated by <span class="text-color-green">Human</span>';
        document.getElementById("ai-or-not_result-message-50").classList.add("hide");
        document.getElementById("ai-or-not_result-message").classList.remove("hide");
        document.querySelector("#ai-or-not_model-name").textContent = data;
        if (data === "ai") {
          document.getElementById("title-human").classList.add("hide");
          document.getElementById("title-ai").classList.remove("hide");
        } else {
          document.getElementById("title-human").classList.remove("hide");
          document.getElementById("title-ai").classList.add("hide");
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
        await uploadBinaryFile(file);
      } else {
        fileSizeMessage_error();
      }
    });
    fileInput?.addEventListener("change", async (event) => {
      if (fileSizeAllow == true) {
        const file = fileInput.files[0];
        await uploadBinaryFile(file);
      } else {
        fileSizeMessage_error();
      }
    });
    const uploadBinaryFile = async (file) => {
      if (file.type === "audio/mpeg" || file.type === "audio/mp3") {
        loadingStart();
        if (RequestCounter.isLimitExceeded()) {
          const signInModalElement = document.getElementById("sign-up");
          signInModalElement.style.display = "flex";
          signInModalElement.style.zIndex = 100;
          screen_homeShow();
          return;
        }
        await WrapperAIGeneratedService.getAudioVerictByFile(file).then((response) => {
          changeShareUrl(response.id);
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
    const tappedSampleAudio = async (url, name) => {
      loadingStart();
      await WrapperAIGeneratedService.getAudioVerictMock(true).then((response) => {
        changeShareUrl(response.id);
        initial_dropZone();
        findHighestConfidence(response.report.verdict === true ? "ai" : "human");
        loadingFinish();
        new AudioPlayerContainer("result-screen_image-wrapper", url, name, true);
      });
    };
    cancelProcessingButton?.addEventListener("click", function() {
      initial_dropZone();
      screen_homeShow();
    });
    document.querySelector("#ai-or-not_dropzone")?.addEventListener("click", function() {
      fileInput.click();
    });
    document.querySelector("#choose-file-row")?.addEventListener("click", function() {
      fileInput.click();
    });
    checkYoutubeLinkButton?.addEventListener("click", () => {
      if (youtubeLinkInput.value != "") {
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
        let regExp = /^(?:https?:\/\/)?(?:www\.)?(?:music\.)?youtu(?:be)?\.(?:com|be)\/(?:shorts\/)?([^\/?]+)/;
        return regExp.test(url);
      };
      if (isYouTubeLink(youtubeLink)) {
        checkYoutubeLinkButton.classList.remove("is-disabled");
      } else {
        checkYoutubeLinkButton.classList.add("is-disabled");
      }
    });
    const uiReported_false = () => {
      let buttonText = document.querySelector("#button-report_false-text");
      buttonText.classList.remove("hide");
      buttonText.textContent = buttonText.getAttribute("report-button-text-default_reported");
      reportButtonDislike.classList.add("is-reported");
      reportButtonLike.classList.add("hide");
      reportScreen.style.display = "none";
    };
    const uiReported_true = () => {
      let buttonText = document.querySelector("#button-report_true-text");
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
  };

  // src/player.ts
  initAudio();
})();
//# sourceMappingURL=player.js.map
