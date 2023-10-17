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

    public static async fetchRequests(offset = 0, limit = 10): Promise<any[]> {
        try {
            const { client } = DashboardService.getInstance();
            const endpoint = `data?filters=requests&offset=${offset}&limit=${limit}`;
            return await client.get(endpoint).then((data) => data.requests.array);
        } catch (error) {
            console.error('getRequests:', error);
            return [];
        }
    }

    public static async fetchUsageApi(): Promise<any[]> {
        try {
            const { client } = DashboardService.getInstance();
            const endpoint = `data?filters=all&offset=0&limit=1`;
            return await client.get(endpoint).then((data) => data.api);
        } catch (error) {
            console.error('fetchUsageApi:', error);
            return [];
        }
    }

    public static async signUp(): Promise<boolean> {
        try {
            const { client } = DashboardService.getInstance();
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
            console.error('signUp:', error);
            return false;
        }
    }

    public static async login(): Promise<any> {
        try {
            const { client } = DashboardService.getInstance();
            return await client.get('login');
        } catch (error) {
            console.error('login:', error);
        }
    }

    public static async delete(): Promise<void> {
        try {
            const { client } = DashboardService.getInstance();
            // AuthService.removeAuth(); // Раскомментируйте эту строку после импорта AuthService
            return await client.delete('');
        } catch (error) {
            console.error('delete:', error);
        }
    }

    public static async fetchApiToken(): Promise<any> {
        try {
            const { client } = DashboardService.getInstance();
            return await client.post('api_token', {});
        } catch (error) {
            console.error('fetchApiToken:', error);
            console.error('fetchApiToken:', error);
        }
    }

    public static async refreshApiToken(): Promise<any> {
        try {
            const { client } = DashboardService.getInstance();
            return await client.patch('api_token', {});
        } catch (error) {
            console.error('refreshApiToken:', error);
        }
    }

    public static async fetchSubscriptionData(): Promise<any> {
        const { client } = DashboardService.getInstance();

        try {
            const endpoint = `data?filters=all&offset=0&limit=1`;
            return await client.get(endpoint).then((data) => data);
        } catch (error) {
            console.error('fetchSubscriptionData:', error);
        }
    }
}
