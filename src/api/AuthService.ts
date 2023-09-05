import { DashboardService } from './DashboardService';

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
        try {
            const [header, payload, signature] = token.split('.');
            const payloadDecoded = JSON.parse(atob(payload));
            const currentTime = Math.floor(Date.now() / 1000);
            if (payloadDecoded.exp < currentTime) {
                return true;
            }

            return false;
        } catch (e) {
            console.error('Ошибка при проверке токена:', e);
            return false;
        }
    }
}
