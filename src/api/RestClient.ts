//PROD URL
// export const BASE_URL = 'https://api.aiornot.com';

//Staging URL
export const BASE_URL = 'https://v3-atrium-prod-api.optic.xyz';

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
            console.error('Ошибка при выполнении GET-запроса:', error);
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
            console.error('Ошибка при выполнении POST-запроса:', error);
            throw error;
        }
    }

    async postBinary(endpoint: string, formData: FormData): Promise<any> {
        const url = `${this.apiUrl}/${endpoint}`;

        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    Authorization: `Bearer ${this.bearerToken}`,
                },
                body: formData,
            });

            return await this.handleResponse(response);
        } catch (error) {
            console.error('Ошибка при выполнении POST-запроса:', error);
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
            return await response.json();
        }
    }
}
