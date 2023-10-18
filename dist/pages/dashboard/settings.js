"use strict";
(() => {
  var __defProp = Object.defineProperty;
  var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
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
  var BASE_URL = "https://api.ai-or-not.com";
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

  // src/pages/dashboard/settings.ts
  document.getElementById("delete-account").onclick = async () => {
    await AuthService.init();
    await DashboardService.delete();
    window.location.href = "https://aiornot.com";
  };
  document.getElementById("sign-out").onclick = () => {
    AuthService.removeAuth();
  };
})();
//# sourceMappingURL=settings.js.map
