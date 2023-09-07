import { parseJwt } from '$utils/string';
import { DashboardService } from './DashboardService';
// import * as jwt from 'jsonwebtoken';
// import * as NodeRSA from 'node-rsa';
// import NodeRSA from 'node-rsa';
// import jwt from 'jsonwebtoken';

interface KeyData {
    kty: string;
    n: string;
    e: string;
    alg: string;
    use: string;
    kid: string;
}

export class AuthService {
    static key: string = 'isSignUp';

    constructor() {}

    static isAuth(): boolean {
        if (localStorage.getItem(AuthService.key) !== null) {
            return true;
        }

        return false;
    }

    static setAuth(): void {
        localStorage.setItem(AuthService.key, 'true');
    }

    static removeAuth(): void {
        localStorage.removeItem(AuthService.key);
    }

    static async init(): Promise<void> {
        if (AuthService.isAuth()) {
            await DashboardService.login();
        } else {
            await DashboardService.signUp();
            AuthService.setAuth();
            await DashboardService.login();
        }
    }

    static getToken(): string {
        return localStorage.getItem('_ms-mid') ?? '';
    }

    static isExpiredToken(): boolean {
        const token = AuthService.getToken();

        if (token?.length > 0) {
            const jwt = parseJwt(token);
            const current_time = Date.now() / 1000;
            return jwt.exp < current_time;
        }

        return true;
    }
}
