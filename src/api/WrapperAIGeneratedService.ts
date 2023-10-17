import { AIGeneratedService } from './AIGeneratedService';
import { AuthService } from './AuthService';
import { OpenAIGeneratedService } from './OpenAIGeneratedService';

export class WrapperAIGeneratedService {
    static async getReportsByBinary(file: File, visitorId: string): Promise<any> {
        if (AuthService.isExpiredToken()) {
            return await OpenAIGeneratedService.getReportsByBinary(file, visitorId);
        }
        return await AIGeneratedService.getReportsByBinary(file);
    }

    static async getReportsByUrl(url: string, visitorId: string): Promise<any> {
        if (AuthService.isExpiredToken()) {
            return await OpenAIGeneratedService.getReportsByUrl(url, visitorId);
        }
        return await AIGeneratedService.getReportsByUrl(url);
    }

    static async getAudioVerictByFile(file: File): Promise<any> {
        return await AIGeneratedService.getAudioVerdict(file);
    }

    static async getAudioVerictMock(verdict: boolean): Promise<any> {
        const delay = (ms: number, value: boolean): Promise<boolean> => {
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

    static async getYoutubeVerict(link: string): Promise<any> {
        if (AuthService.isExpiredToken()) {
            return await OpenAIGeneratedService.getYoutubeVerdict(link);
        }
        return await AIGeneratedService.getYoutubeVerdict(link);
    }

    static async sendFeedback(id: string, reportPredict: boolean, reportComment: string, isAudio = false): Promise<void> {
        return await OpenAIGeneratedService.sendFeedback(id, reportPredict, reportComment, isAudio);
    }
}
