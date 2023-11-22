import { copyToClipboard } from '@/utils';

import { AuthService, DashboardService } from '../../api';
import { ElementCreator } from '../../dashboard';

async function initUsagePage() {
    const refreshApiTokenButton = document.getElementById('refresh-api-key') as any;
    const getApiTokenButton = document.getElementById('request-api-key') as any;
    const dashAPIEmptyBlock = document.getElementById('dash-api-empty') as any;
    const dashAPIContentBlock = document.getElementById('dash-api-content') as any;
    const apiCopyButton = document.getElementById('api-copy') as any;

    apiCopyButton.classList.add('hide');
    await changeView();

    refreshApiTokenButton.onclick = async () => {
        const { token } = await DashboardService.refreshApiToken();
        copyToClipboardWrap(token);
    };

    getApiTokenButton.onclick = async () => {
        const { token } = await DashboardService.fetchApiToken();
        await changeView(token);
    };

    async function changeView(token: string | null = null) {
        const usage: any = await DashboardService.fetchUsageApi();

        if (usage.access) {
            dashAPIEmptyBlock.style.display = 'none';
            dashAPIContentBlock.style.display = 'block';
            ElementCreator.fillApiKeyCard(usage);
        } else {
            dashAPIEmptyBlock.style.display = 'flex';
            dashAPIContentBlock.style.display = 'none';
        }

        copyToClipboardWrap(token);
    }

    function copyToClipboardWrap(token: string | null = null) {
        if (token) {
            apiCopyButton.classList.remove('hide');
            if (!apiCopyButton) return;
            apiCopyButton.onclick = () => {
                copyToClipboard(token);
                apiCopyButton.classList.add('hide');
            };
        }
    }
}

(document.getElementById('sign-out') as any).onclick = () => {
    localStorage.removeItem('_aion_in');
    AuthService.removeAuth();
};

initUsagePage();
