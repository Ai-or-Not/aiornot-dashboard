import { AuthService } from './AuthService';
import { BASE_URL, RestClient } from './RestClient';

export class AIGeneratedService {
    private static instance: AIGeneratedService | null = null;
    private client: RestClient;

    private constructor() {
        const bearerToken = AuthService.getToken();
        const baseUrl = `${BASE_URL}/aion/ai-generated`;
        this.client = new RestClient(baseUrl, bearerToken);
    }

    public static getInstance(): AIGeneratedService {
        if (!AIGeneratedService.instance) {
            AIGeneratedService.instance = new AIGeneratedService();
        }
        return AIGeneratedService.instance;
    }

    public static async getReportsByBinary(file: File): Promise<any> {
        const client = AIGeneratedService.getInstance().client;

        try {
            const formData = new FormData();
            formData.append('binary', file, 'uploaded-file.png');
            return await client.postBinary('reports/binary', formData);
        } catch (error) {
            console.error('Error getReportsByBinary:', error);
        }
    }

    public static async getReportsByUrl(url: string): Promise<any> {
        const client = AIGeneratedService.getInstance().client;

        try {
            const endpoint = `reports/url?url=${url}`;
            return await client.post(endpoint, {});
        } catch (error) {
            console.error('Ошибка getReportsByUrl:', error);
        }
    }
}
