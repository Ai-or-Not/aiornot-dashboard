//PROD URL
// export const BASE_URL = 'https://api.aiornot.com';

//Staging URL
// export const BASE_URL = 'https://v3-atrium-prod-api.optic.xyz';
// export const BASE_URL = 'https://v3-atrium-stage-api.optic.xyz';
// export const BASE_URL = 'http://localhost:8000';
export const BASE_URL = 'https://api.ai-or-not.com';

export const BASE_URL_RESULTS = 'https://results.aiornot.com';

export class RestClient {
    apiUrl: string;
    bearerToken: string;

    constructor(apiUrl: string, bearerToken: string) {
        this.apiUrl = apiUrl;
        this.bearerToken = bearerToken;
    }

    async get(endpoint: string): Promise<any> {
        const url = `${this.apiUrl}/${endpoint}`;

        try {
            const response = await fetch(url, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${this.bearerToken}`,
                },
            });

            return await this.handleResponse(response);
        } catch (error) {
            if (error.status === 429) {
                if (error.message.msg.type === 'requests') {
                    alert(
                        `It looks like you have reached your plan limit of ${error.message.msg.current_limit} requests. To continue, please upgrade to a new plan.`
                    );
                }
            }
            console.error('Error', error);
            throw error;
        }
    }

    async post(endpoint: string, body: any): Promise<any> {
        const url = `${this.apiUrl}/${endpoint}`;

        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${this.bearerToken}`,
                },
                body: JSON.stringify(body),
            });

            return await this.handleResponse(response);
        } catch (error) {
            console.error('Request error', error);
            if (error.status === 429) {
                if (error.message.msg.type === 'requests') {
                    alert(
                        `It looks like you have reached your plan limit of ${error.message.msg.current_limit} requests. To continue, please upgrade to a new plan.`
                    );
                }
            }
            throw error;
        }
    }

    async postBinary(endpoint: string, formData: FormData): Promise<any> {
        const url = `${this.apiUrl}/${endpoint}`;
        // console.log('url', url);
        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    Authorization: `Bearer ${this.bearerToken}`,
                },
                body: formData,
            });

            const data = await this.handleResponse(response);
            return data;
        } catch (error) {
            console.error('Binary request error:', error);
            if (error.status === 429) {
                if (error.message.msg.type === 'requests') {
                    alert(
                        `It looks like you have reached your plan limit of ${error.message.msg.current_limit} requests. To continue, please upgrade to a new plan.`
                    );
                }
            }
            throw error;
        }
    }

    async delete(endpoint: string): Promise<void> {
        const url = `${this.apiUrl}/${endpoint}`;

        try {
            const response = await fetch(url, {
                method: 'DELETE',
                headers: {
                    accept: '*/*',
                    Authorization: `Bearer ${this.bearerToken}`,
                },
            });

            await this.handleResponse(response);
        } catch (error) {
            console.error('Ошибка при выполнении DELETE-запроса:', error);
            throw error;
        }
    }

    async patch(endpoint: string, body: any): Promise<any> {
        const url = `${this.apiUrl}/${endpoint}`;

        try {
            const response = await fetch(url, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${this.bearerToken}`,
                },
                body: JSON.stringify(body),
            });

            return await this.handleResponse(response);
        } catch (error) {
            console.error('Ошибка при выполнении PATCH-запроса:', error);
            throw error;
        }
    }

    private async handleResponse(response: Response): Promise<any> {
        if (!response.ok) {
            const errorData = await response.json();
            throw { status: response.status, message: errorData };
        }
        if (response.status !== 204) {
            const data = await response.json();
            return data;
        }
    }
}
