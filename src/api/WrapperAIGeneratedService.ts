import { AIGeneratedService } from './AIGeneratedService';
import { AuthService } from './AuthService';
import { OpenAIGeneratedService } from './OpenAIGeneratedService';

export class WrapperAIGeneratedService {
    static async getReportsByBinary(file: File, visitorId: string): Promise<any> {
        if (!AuthService.isExpiredToken()) {
            return await AIGeneratedService.getReportsByBinary(file);
        } else {
            return await OpenAIGeneratedService.getReportsByBinary(file, visitorId);
        }
    }

    static async getReportsByUrl(url: string, visitorId: string): Promise<any> {
        if (!AuthService.isExpiredToken()) {
            return await AIGeneratedService.getReportsByUrl(url);
        } else {
            return await OpenAIGeneratedService.getReportsByUrl(url, visitorId);
        }
    }

    static async sendFeedback(id: string, reportPredict: boolean, reportComment: string): Promise<void> {
        return await OpenAIGeneratedService.sendFeedback(id, reportPredict, reportComment);
    }
}
