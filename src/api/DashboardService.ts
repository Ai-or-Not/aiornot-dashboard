import { AuthService } from './AuthService';
import { BASE_URL, RestClient } from './RestClient';

export class DashboardService {
    private static instance: DashboardService | null = null;
    private client: RestClient;

    private constructor() {
        const bearerToken = AuthService.getToken();
        const baseUrl = `${BASE_URL}/aion/users`;
        this.client = new RestClient(baseUrl, bearerToken);
    }

    public static getInstance(): DashboardService {
        if (!DashboardService.instance) {
            DashboardService.instance = new DashboardService();
        }
        return DashboardService.instance;
    }

    public static async fetchRequests(offset: number = 0, limit: number = 10): Promise<any[]> {
        try {
            const client = DashboardService.getInstance().client;
            const endpoint = `data?filters=requests&offset=${offset}&limit=${limit}`;
            return await client.get(endpoint).then((data) => data.requests.array);
        } catch (error) {
            console.error('Ошибка getRequests:', error);
            return [];
        }
    }

    public static async fetchUsageApi(): Promise<any[]> {
        try {
            const client = DashboardService.getInstance().client;
            const endpoint = `data?filters=api&offset=0&limit=10`;
            return await client.get(endpoint).then((data) => data.api);
        } catch (error) {
            console.error('Ошибка fetchUsageApi:', error);
            return [];
        }
    }

    public static async signUp(): Promise<boolean> {
        try {
            const client = DashboardService.getInstance().client;
            return await client
                .post('sign_up', {})
                .then(() => false)
                .catch((error) => {
                    if (error.status === 400) {
                        return true;
                    }
                    throw error;
                });
        } catch (error) {
            console.error('Ошибка signUp:', error);
            return false;
        }
    }

    public static async login(): Promise<any> {
        try {
            const client = DashboardService.getInstance().client;
            return await client.get('login');
        } catch (error) {
            console.error('Ошибка login:', error);
        }
    }

    public static async delete(): Promise<void> {
        try {
            const client = DashboardService.getInstance().client;
            // AuthService.removeAuth(); // Раскомментируйте эту строку после импорта AuthService
            return await client.delete('');
        } catch (error) {
            console.error('Ошибка delete:', error);
        }
    }

    public static async fetchApiToken(): Promise<any> {
        try {
            const client = DashboardService.getInstance().client;
            return await client.post('api_token', {});
        } catch (error) {
            console.error('Ошибка fetchApiToken:', error);
        }
    }

    public static async refreshApiToken(): Promise<any> {
        try {
            const client = DashboardService.getInstance().client;
            return await client.patch('api_token', {});
        } catch (error) {
            console.error('Ошибка refreshApiToken:', error);
        }
    }
}
