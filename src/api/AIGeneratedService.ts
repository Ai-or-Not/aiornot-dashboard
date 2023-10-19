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
        const { client } = AIGeneratedService.getInstance();

        try {
            const formData = new FormData();
            formData.append('binary', file, 'uploaded-file.png');
            return await client.postBinary('reports/binary', formData);
        } catch (error) {
            if (error.status === 402) {
                alert('Please verify your email to continue using the service');
            }
            if (error.status === 429) {
                alert(
                    `It looks like you have reached your plan limit of ${error.message.msg.current_limit} requests. To continue, please upgrade to a new plan.`
                );
                window.location.href = `https://${window.location.host}/#plans`;
            }
            console.error('Error getReportsByBinary:', error);
        }
    }

    public static async getReportsByUrl(url: string): Promise<any> {
        const { client } = AIGeneratedService.getInstance();

        try {
            const endpoint = `reports/url?url=${url}`;
            return await client.post(endpoint, {});
        } catch (error) {
            if (error.status === 402) {
                alert('Please verify your email to continue using the service');
            }
            if (error.status === 429) {
                alert(
                    `It looks like you have reached your plan limit of ${error.message.msg.current_limit} requests. To continue, please upgrade to a new plan.`
                );
                window.location.href = `https://${window.location.host}/#plans`;
            }
            console.error('getReportsByUrl:', error);
        }
    }

    static async getAudioVerdict(file: File): Promise<any> {
        // console.log('getAudioVerdict');
        const { client } = AIGeneratedService.getInstance();
        try {
            const formData = new FormData();
            formData.append('file', file);
            return await client.postBinary('reports/audio/binary', formData);
        } catch (error) {
            if (error.status === 402) {
                alert('Please verify your email to continue using the service');
            }
            if (error.status === 429) {
                alert(
                    `It looks like you have reached your plan limit of ${error.message.msg.current_limit} requests. To continue, please upgrade to a new plan.`
                );
                window.location.href = `https://${window.location.host}/#plans`;
            }
            console.error('Error getAudioVerdict:', error);
        }
    }

    static async getYoutubeVerdict(link: string): Promise<any> {
        const { client } = AIGeneratedService.getInstance();

        try {
            const body = {
                url: link,
            };

            return await client.post('reports/audio/link', body);
        } catch (error) {
            if (error.status === 402) {
                alert('Please verify your email to continue using the service');
            }
            if (error.status === 429) {
                alert(
                    `It looks like you have reached your plan limit of ${error.message.msg.current_limit} requests. To continue, please upgrade to a new plan.`
                );
                window.location.href = `https://${window.location.host}/#plans`;
            }
            console.error('Error getYoutubeVerdict:', error);
        }
    }
}
