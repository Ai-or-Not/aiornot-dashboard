import { AuthService } from './AuthService';

export class OpenAIGeneratedService {
    constructor() {}

    static async getReportsByBinary(file: File, visitorId: string): Promise<any> {
        const baseUrl = `https://atrium-prod-api.optic.xyz/results/api/detector/reports/raw?source=web&user_id=${visitorId}`;
        const formData = new FormData();
        formData.append('binary', file, 'file_name.png');

        const options = {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                Authorization: `Bearer ${AuthService.getToken()}`,
            },
            body: formData,
        };

        return await fetch(baseUrl, options).then((response) => response.json());
    }

    static async getReportsByUrl(url: string, visitorId: string): Promise<any> {
        const baseUrl = `https://atrium-prod-api.optic.xyz/results/api/detector/reports/json?source=web&user_id=${visitorId}`;

        const options = {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                Authorization: `Bearer ${AuthService.getToken()}`,
            },
            body: JSON.stringify({
                object: url,
            }),
        };

        return await fetch(baseUrl, options).then((response) => response.json());
    }

    static async sendFeedback(id: string, reportPredict: boolean, reportComment: string): Promise<void> {
        const body = {
            is_proper_predict: reportPredict,
            comment: reportComment,
        };

        let url = `https://atrium-prod-api.optic.xyz/results/api/detector/reports/result/${id}`;
        let options = {
            method: 'PUT',
            body: JSON.stringify(body),
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
        };

        if (!AuthService.isExpiredToken()) {
            url = `https://atrium-prod-api.optic.xyz/aion/ai-generated/reports/${id}`;
            options = {
                method: 'PATCH',
                body: JSON.stringify(body),
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
            };
        }

        await fetch(url, options)
            .then((response) => response.json())
            .then((data) => console.log(data))
            .catch((error) => console.error(error));
    }

    static async getAudioVerdict(file: File): Promise<any> {
        const baseUrl = `https://v3-atrium-stage-api.optic.xyz/aion/ai-generated/reports/audio/binary`;
        const formData = new FormData();
        formData.append('binary', file);

        const options = {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                Authorization: `Bearer ${AuthService.getToken()}`,
            },
            body: formData,
        };

        return await fetch(baseUrl, options).then((response) => response.json());
    }
}
