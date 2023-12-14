import { PaymentsClient } from '@/api/Payments';

import { AuthService } from './AuthService';
import { BASE_URL, RestClient } from './RestClient';

const paymentClient = new PaymentsClient();

export class DashboardService {
    private static instance: DashboardService | null = null;
    private client: RestClient;

    private constructor(domain: string) {
        const bearerToken = AuthService.getToken();
        const baseUrl = `${BASE_URL}/aion/${domain}`;
        this.client = new RestClient(baseUrl, bearerToken);
    }

    public static sendVerificationEmail() {
        const { client } = DashboardService.getInstance();
        return client.get('email_verification', {});
    }

    public static getInstance(domain = 'users'): DashboardService {
        if (!DashboardService.instance) {
            DashboardService.instance = new DashboardService(domain);
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
                    throw error;
                });
        } catch (error) {
            console.error('signUp:', error);
            // return false;
            throw error;
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

    public static async delete(): Promise<boolean> {
        try {
            const { client } = DashboardService.getInstance();
            AuthService.removeAuth();
            await client.delete('');
            return true;
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

    public static async subscriptionInfo() {
        const planInfo = document.querySelector('#plan-info') as Element;
        const usageInfo = document.querySelector('#usage-info') as Element;
        const btnCancel = document.querySelector('#btn-cancel-plan') as Element;

        planInfo.classList.add('hide');
        usageInfo.classList.add('hide');
        btnCancel.classList.add('hide');

        // Get subscription info. Check them in localstorage
        const promises = [DashboardService.fetchSubscriptionData(), paymentClient.getSubscriptionInfo()];
        const [data, subscription] = await Promise.all(promises);

        // console.log(data);
        // console.log(subscription);

        if (data?.plan.name === 'Free') {
            // Free plan
            planInfo.innerHTML = `<p>You\'re on the <span class="text-color-green">Free</span> plan. You have limits of 20 & 100 image and 5 audio checks per month via web & API, respectively.</p> 
                                  <p>If you need more, check out our <a class="text-color-green" href='https://${window.location.host}/#plans' >plans</a>.</p>`;
            usageInfo.innerHTML = `<p> You have used:</p> 
                                    <p style="margin-left: 1rem"> ${
                                        data?.usage?.web.image || 0
                                    } of 20 checks of image via web;</p> 
                                    <p style="margin-left: 1rem"> ${
                                        data?.usage?.api.image || 0
                                    } of 100 checks of image via API;</p> 
                                    <p style="margin-left: 1rem"> ${
                                        data?.usage?.web.audio + data?.usage?.api.audio
                                    } of 5 checks of audio for both web & API;</p>`;

            planInfo.classList.remove('hide');
            usageInfo.classList.remove('hide');
        } else {
            let text = `You\'re on the <span class="text-color-green">${data?.plan.name}</span> plan.`;

            let i = 0;
            let img_limit = 0;
            let aud_limit = 0;
            text = text + `<p>  You have quotas:</p>`;
            data.plan.quotas.forEach((quota: any) => {
                i += 1;
                if (quota.resource === 'image') img_limit = quota.limit;
                if (quota.resource === 'audio') aud_limit = quota.limit;
                text =
                    text +
                    `<p style="margin-left: 1rem"> <span>${i}.</span> <span style="margin-left: 0.4rem"> ${quota.limit} requests to check ${quota.resource} for both web & API.</span></p>`;
            });
            planInfo.innerHTML = text;

            usageInfo.innerHTML = `<p> You have used:</p> 
                                    <p style="margin-left: 1rem"> ${
                                        data?.usage?.web.image + data?.usage?.api.image
                                    } of ${img_limit} checks of image via both web & API;</p> 
                                    <p style="margin-left: 1rem"> ${
                                        data?.usage?.web.audio + data?.usage?.api.audio
                                    } of ${aud_limit} checks of audio for both web & API;</p>`;

            if (subscription?.subscription.meta?.was_canceled) {
                btnCancel.classList.add('hide');
                usageInfo.innerHTML =
                    usageInfo.innerHTML +
                    ` Your subscription has been canceled, expires on ${new Date(
                        subscription?.subscription.expiration_dt
                    ).toLocaleDateString()}.`;
            } else {
                btnCancel.classList.remove('hide');
            }

            planInfo.classList.remove('hide');
            usageInfo.classList.remove('hide');
        }

        btnCancel.addEventListener('click', async () => {
            // For Custom plan change to contact us form
            if (data?.plan.name !== 'Base' && data?.plan.name !== 'Pro') {
                window.location.href = `https://${window.location.host}/contact-us`;
            } else {
                if (confirm('Are you sure you want to cancel your subscription?')) {
                    alert('Your subscription has been canceled.');
                    paymentClient.cancelSubscription().then((response) => {
                        console.log(response);
                    });
                    // redirect to home page
                    window.location.href = `https://${window.location.host}/#plans`;
                } else {
                    alert('Your subscription has not been canceled.');
                }
            }
        });
    }

    public static async getUserInfo() {
        const { client } = DashboardService.getInstance();
        try {
            return await client.get('');
        } catch (error) {
            console.error('getUserInfo:', error);
        }
    }

    public static async getTransactions() {
        const { client } = new DashboardService('payments');
        try {
            return await client.get('invoices');
        } catch (error) {
            console.error('getTransactions:', error);
        }
    }
}
