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

  // src/utils/fingerprint.ts
  var visitorId;
  var fpPromise = import("https://openfpcdn.io/fingerprintjs/v3").then((FingerprintJS) => FingerprintJS.load());
  var initFingerPrint = async () => {
    visitorId = await fpPromise.then((fp) => fp.get()).then((result) => {
      return result.visitorId;
    });
  };

  // src/api/RestClient.ts
  var BASE_URL = "https://v3-atrium-stage-api.optic.xyz";
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
        console.log(jwt);
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
        console.error("Error getReportsByBinary:", error);
      }
    }
    static async getReportsByUrl(url) {
      const client = _AIGeneratedService.getInstance().client;
      try {
        const endpoint = `reports/url?url=${url}`;
        return await client.post(endpoint, {});
      } catch (error) {
        console.error("\u041E\u0448\u0438\u0431\u043A\u0430 getReportsByUrl:", error);
      }
    }
    static async getAudioVerdict(file) {
      const client = _AIGeneratedService.getInstance().client;
      try {
        const formData = new FormData();
        formData.append("binary", file);
        return await client.postBinary("reports/audio/binary", formData);
      } catch (error) {
        console.error("Error getAudioVerdict:", error);
      }
    }
    static async getYoutubeVerdict(link) {
      const client = _AIGeneratedService.getInstance().client;
      try {
        const body = {
          link
        };
        return await client.post("reports/audio/link", JSON.stringify(body));
      } catch (error) {
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
    static async getReportsByBinary(file, visitorId3) {
      const baseUrl = `${BASE_URL}/results/api/detector/reports/raw?source=web&user_id=${visitorId3}`;
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
    static async getReportsByUrl(url, visitorId3) {
      const baseUrl = `${BASE_URL}/results/api/detector/reports/json?source=web&user_id=${visitorId3}`;
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
          ContentType: "multipart/form-data"
        },
        body: JSON.stringify({
          link
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
      const count = localStorage.getItem(_RequestCounter.key);
      if (count === null) {
        return false;
      }
      return parseInt(count) > 5;
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
    static async getReportsByBinary(file, visitorId3) {
      if (AuthService.isExpiredToken()) {
        return await OpenAIGeneratedService.getReportsByBinary(file, visitorId3);
      } else {
        return await AIGeneratedService.getReportsByBinary(file);
      }
    }
    static async getReportsByUrl(url, visitorId3) {
      if (AuthService.isExpiredToken()) {
        return await OpenAIGeneratedService.getReportsByUrl(url, visitorId3);
      } else {
        return await AIGeneratedService.getReportsByUrl(url);
      }
    }
    static async getAudioVerictByFile(file) {
      if (AuthService.isExpiredToken()) {
        return await OpenAIGeneratedService.getAudioVerdict(file);
      } else {
        return await AIGeneratedService.getAudioVerdict(file);
      }
    }
    static async getYoutubeVerict(link) {
      return JSON.parse(`{
            "id": "41994fdd-0161-43a9-b873-581eccbe6d72",
            "report": {
                "version": "0.0.0",
                "verdict": false
            }
        }`);
    }
    static async sendFeedback(id, reportPredict, reportComment, isAudio = false) {
      return await OpenAIGeneratedService.sendFeedback(id, reportPredict, reportComment, isAudio);
    }
  };

  // src/dashboard/ImageElements.ts
  var init = () => {
    const reportScreen = document.getElementById("report-screen");
    const reportButton_submit = document.querySelector("#button-report-submit");
    const reportInput = document.querySelector("#input-report-comment");
    const reportButton_true = document.querySelector("#button-report_true");
    const reportButton_false = document.querySelector("#button-report_false");
    const reportButton_close = document.querySelector("#button-report_close");
    const testImages = document.querySelectorAll(".test-image");
    const uiEl_urlError = document.querySelector("#url-error-message");
    const buttonEl_processClose = document.querySelector("#processing_cancel");
    const inputEl_fileInput = document.querySelector("#file-input");
    const imageEl_currentImage = document.querySelector("#ai-or-not-current-image");
    const imageEl_currentImageEmpty = document.querySelector("#empty-preview-img");
    const imageEl_nsfwImage = document.querySelector("#nsfw-preview-img");
    const textEl_inputError = document.querySelector("#input-error-text");
    const inputEl_urlWaiter = document.querySelector("#ai-or-not_image-url");
    const buttonEl_urlCheck = document.querySelector("#ai-or-not_submit");
    const uiEl_dropZone = document.querySelector("#ai-or-not_dropzone");
    const textEl_dropZoneError = document.querySelector("#ai-or-not_dropzone-text");
    const uiEl_resultCol = document.querySelector("#result-screen_col");
    const buttonEl_sharedButtons = document.querySelector("#share-items-hide");
    const counterEl_requestCounterValue = document.querySelector("#ai-or-not-dropzone-counter");
    const counterEl_requestCounterBlock = document.querySelector("#ai-or-not-dropzone-counter-w");
    let pastedUrl;
    let fileUpload_way;
    let fileSizeAllow;
    let currentResultId;
    const updateRequestCounter = () => {
      if (!AuthService.isExpiredToken()) {
        counterEl_requestCounterBlock?.classList.add("hide");
      } else {
        const value = localStorage.getItem("requestCount") || "0";
        counterEl_requestCounterValue.textContent = Number(value) <= 5 ? value : "5";
        counterEl_requestCounterBlock.classList.remove("hide");
      }
    };
    updateRequestCounter();
    initFingerPrint();
    const uiReported_false = () => {
      let buttonText = document.querySelector("#button-report_false-text");
      buttonText.classList.remove("hide");
      buttonText.textContent = buttonText.getAttribute("report-button-text-default_reported");
      reportButton_false.classList.add("is-reported");
      reportButton_true.classList.add("hide");
    };
    const uiReported_true = () => {
      let buttonText = document.querySelector("#button-report_true-text");
      buttonText.classList.remove("hide");
      buttonText.textContent = buttonText.getAttribute("report-button-text-default_reported");
      reportButton_true.classList.add("is-reported");
      reportButton_false.classList.add("hide");
    };
    const uiReported_initialState = () => {
      reportInput.value = "";
      let buttonText_true = document.querySelector("#button-report_true-text");
      let buttonText_false = document.querySelector("#button-report_false-text");
      buttonText_false.classList.add("hide");
      buttonText_true.classList.remove("hide");
      buttonText_true.textContent = buttonText_true.getAttribute("report-button-text-default");
      buttonText_false.textContent = buttonText_false.getAttribute("report-button-text-default");
      reportButton_true.classList.remove("is-reported");
      reportButton_false.classList.remove("is-reported");
      reportButton_true.classList.remove("hide");
      reportButton_false.classList.remove("hide");
    };
    const changeShareUrl = (responseId) => {
      currentResultId = responseId;
      const element2 = document.querySelector('[fs-socialshare-element="url"]');
      let shareUrlTemplate = AuthService.isExpiredToken() ? `${BASE_URL_RESULTS}/aiornot/` : `${BASE_URL_RESULTS}/aiornot/users/`;
      const shareUrl = `${shareUrlTemplate}${responseId}`;
      element2.textContent = shareUrl;
      let allShareUrl = document.querySelectorAll(".result-screen_share-item");
      allShareUrl.forEach((el) => {
        el.setAttribute("data-url", shareUrl);
      });
    };
    const fileSizeMessage_ok = () => {
      textEl_dropZoneError.textContent = "We support jpeg, png, webp, gif, tiff, bmp. 10 Mb of maximum size.";
      textEl_dropZoneError.classList.remove("text-color-red");
      textEl_inputError.textContent = "Something went wrong. Try again.";
      uiEl_urlError.classList.add("hide");
    };
    const someThingWentWrong_error = () => {
      uiEl_urlError.classList.remove("hide");
    };
    const someThingWentWrong_ok = () => {
      uiEl_urlError.classList.add("hide");
    };
    const fileSizeMessage_error = () => {
      if (uiEl_resultCol.classList.contains("hide")) {
        textEl_dropZoneError.textContent = "File is too large (max 10 MB)";
        textEl_dropZoneError.classList.add("text-color-red");
      } else {
        textEl_inputError.textContent = "File is too large (max 10 MB)";
        uiEl_urlError.classList.remove("hide");
      }
    };
    inputEl_fileInput?.addEventListener("change", () => {
      const fileSize = inputEl_fileInput?.files[0].size;
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
      textEl_dropZoneError.classList.add("error");
      uiEl_dropZone.classList.add("red-border");
      textEl_dropZoneError.textContent = "Something went wrong. Try again.";
    };
    const initial_dropZone = () => {
      textEl_dropZoneError.classList.remove("error");
      uiEl_dropZone.classList.remove("red-border");
      textEl_dropZoneError.textContent = "We support jpeg, png, webp, gif, tiff, bmp. 10 Mb of maximum size.";
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
      imageEl_currentImage.classList.add("hide");
      imageEl_currentImageEmpty.classList.remove("hide");
      imageEl_nsfwImage.classList.remove("hide");
    };
    const loadingStart = () => {
      uiReported_initialState();
      imageEl_currentImage.src = "";
      someThingWentWrong_ok();
      textEl_inputError.textContent = "Something went wrong. Try again.";
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
    function loadingFinish(nsfw_detected = false) {
      if (nsfw_detected) {
        imageEl_nsfwImage.classList.remove("hide");
        imageEl_currentImage.classList.add("hide");
        imageEl_currentImageEmpty.classList.add("hide");
        buttonEl_sharedButtons.classList.add("hide");
      } else {
        imageEl_nsfwImage.classList.add("hide");
        imageEl_currentImage.classList.remove("hide");
        imageEl_currentImageEmpty.classList.add("hide");
        buttonEl_sharedButtons.classList.remove("hide");
      }
      document.querySelector(".processing-screen_triggers_3").click();
      document.querySelector("#processing-screen").classList.add("hide");
      document.querySelector(".processing-screen_triggers_5").click();
      document.querySelector("#scroll-to-top-trigger").click();
      inputEl_fileInput.value = "";
      document.querySelector("#ai-or-not_image-url").value = "";
    }
    const findHighestConfidence = (data) => {
      if (data === "unknown") {
        document.getElementById("title-human").innerHTML = "Sorry, but in this case we can't really say if it's AI or Not";
        document.getElementById("ai-or-not_result-message-50").classList.remove("hide");
        document.getElementById("ai-or-not_result-message").classList.add("hide");
        document.getElementById("ai-or-not_result-message-50").innerHTML = "Probly the uploaded image has most likely been modified or compressed";
        document.getElementById("title-human").classList.remove("hide");
        document.getElementById("title-ai").classList.add("hide");
      } else {
        document.getElementById("title-ai").innerHTML = 'This image is generated by <span class="text-color-green">AI</span>';
        document.getElementById("title-human").innerHTML = 'This image is generated by <span class="text-color-green">Human</span>';
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
    const postToApi_url = async () => {
      if (RequestCounter.isLimitExceeded()) {
        const signInModalElement = document.getElementById("sign-up");
        signInModalElement.style.display = "flex";
        signInModalElement.style.zIndex = 100;
        screen_homeShow();
      } else {
        uiEl_urlError.classList.add("hide");
        loadingStart();
        await WrapperAIGeneratedService.getReportsByUrl(pastedUrl, visitorId).then((response) => {
          RequestCounter.increment();
          changeShareUrl(response.id);
          imageEl_currentImage.src = pastedUrl;
          findHighestConfidence(response.verdict);
          loadingFinish(response.nsfw_detected);
        }).catch((error) => {
          if (uiEl_resultCol.classList.contains("hide")) {
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
    inputEl_fileInput?.addEventListener("change", async (event) => {
      if (fileSizeAllow == true) {
        const fileInput = document.querySelector("#file-input");
        const file = fileInput.files[0];
        await uploadBinaryFile(file);
      } else {
        fileSizeMessage_error();
      }
    });
    const uploadBinaryFile = async (file) => {
      console.log(file);
      loadingStart();
      if (RequestCounter.isLimitExceeded()) {
        const signInModalElement = document.getElementById("sign-up");
        signInModalElement.style.display = "flex";
        signInModalElement.style.zIndex = 100;
        screen_homeShow();
        return;
      }
      const currentImage = document.querySelector("#ai-or-not-current-image");
      let currentImageUrl = URL.createObjectURL(file);
      currentImage.setAttribute("src", currentImageUrl);
      imageEl_currentImage.classList.remove("hide");
      imageEl_currentImageEmpty.classList.add("hide");
      await WrapperAIGeneratedService.getReportsByBinary(file, visitorId).then((response) => {
        RequestCounter.increment();
        changeShareUrl(response.id);
        initial_dropZone();
        findHighestConfidence(response.verdict);
        loadingFinish(response.nsfw_detected);
      }).catch((error) => {
        console.log(error);
        error_dropZone();
        screen_homeShow();
      });
    };
    buttonEl_processClose?.addEventListener("click", function() {
      initial_dropZone();
      screen_homeShow();
    });
    document.querySelector("#ai-or-not_dropzone")?.addEventListener("click", function() {
      fileUpload_way = "screen_home";
      inputEl_fileInput.click();
    });
    document.querySelector("#choose-file-row")?.addEventListener("click", function() {
      fileUpload_way = "screen_result";
      inputEl_fileInput.click();
    });
    buttonEl_urlCheck?.addEventListener("click", () => {
      if (inputEl_urlWaiter.value != "") {
        pastedUrl = inputEl_urlWaiter.value;
        postToApi_url();
      }
    });
    const element = document.querySelector("#ai-or-not_image-url");
    element?.addEventListener("keypress", function(e) {
      if (e.key === "Enter") {
        if (inputEl_urlWaiter.value != "") {
          pastedUrl = inputEl_urlWaiter.value;
          postToApi_url();
        }
      }
    });
    testImages.forEach((testImage) => {
      testImage?.addEventListener("click", () => {
        const testImageUrl = testImage.getAttribute("test-image-url");
        document.querySelector("#ai-or-not_image-url").value = testImageUrl;
        document.querySelector("#ai-or-not_submit").click();
        document.querySelector("#ai-or-not_image-url").value = "";
      });
    });
    reportButton_true?.addEventListener("click", () => {
      uiReported_true();
      WrapperAIGeneratedService.sendFeedback(currentResultId, true, "");
    });
    reportButton_false?.addEventListener("click", () => {
    });
    reportButton_close?.addEventListener("click", () => {
    });
    reportButton_submit?.addEventListener("click", () => {
      WrapperAIGeneratedService.sendFeedback(currentResultId, false, reportInput.value);
      uiReported_false();
    });
    document?.addEventListener("keydown", function(event) {
      if (event.code === "Escape") {
        if (reportScreen.style.display !== "none") {
          reportButton_close.click();
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
    const imageUrlInput = document.querySelector("#ai-or-not_image-url");
    const submitButton = document.querySelector("#ai-or-not_submit");
    imageUrlInput.addEventListener("input", function() {
      const imageUrl = imageUrlInput.value.trim();
      if (isValidUrl(imageUrl)) {
        submitButton.classList.remove("is-disabled");
      } else {
        submitButton.classList.add("is-disabled");
      }
    });
    const isValidUrl = (url) => {
      try {
        new URL(url);
        return true;
      } catch (e) {
        return false;
      }
    };
    document.getElementById("close-sign-up").onclick = () => {
      const signInModalElement = document.getElementById("sign-up");
      signInModalElement.style.display = "none";
      signInModalElement.style.zIndex = 0;
    };
  };

  // src/index.ts
  init();
})();
//# sourceMappingURL=index.js.map
