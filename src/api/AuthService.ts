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

interface UserEntity {
    user_id: string;
    is_verified: boolean;
}

export class AuthService {
    static key = 'isSignUp';
    static token_key = '_ms-mid';

    constructor() {}

    static getUserInfo() {
        return DashboardService.getUserInfo();
    }

    static isAuth(): boolean {
        if (localStorage.getItem(AuthService.token_key) !== null) {
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
        if (localStorage.getItem('_aion_in') === null) {
            try {
                await DashboardService.signUp();
                AuthService.setAuth();
                await DashboardService.login();

                localStorage.setItem('_aion_in', 'true');
            } catch (e) {
                console.log(e);
            }
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

    static checkAuth(redirect_function) {
        if (!AuthService.isAuth()) {
            const signInModalElement = document.getElementById('sign-up') as any;
            signInModalElement.style.display = 'flex';
            signInModalElement.style.zIndex = 100;
            redirect_function();
            return true;
        }
        return false;
    }

    static async sendVerifiedEmail() {
        console.log('sendVerifiedEmail');
        await DashboardService.sendVerificationEmail();
    }
}
