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
    changeView();

    refreshApiTokenButton.onclick = async () => {
        const { token } = await DashboardService.refreshApiToken();
        copyToClipboardWrap(token);
    };

    getApiTokenButton.onclick = async () => {
        const { token } = await DashboardService.fetchApiToken();
        await changeView();
        copyToClipboardWrap(token);
    };

    async function changeView() {
        const usage: any = await DashboardService.fetchUsageApi();

        if (usage.access) {
            // console.log('usage', usage);
            dashAPIEmptyBlock.style.display = 'none';
            dashAPIContentBlock.style.display = 'block';
            //	refreshApiTokenButton.style.display = 'flex'
            //	getApiTokenButton.style.display = 'none'
            ElementCreator.fillApiKeyCard(usage);
        } else {
            // console.log('usage else', usage);
            dashAPIEmptyBlock.style.display = 'flex';
            dashAPIContentBlock.style.display = 'none';
            //	refreshApiTokenButton.style.display = 'none'
            //	getApiTokenButton.style.display = 'flex'
        }
    }

    function copyToClipboardWrap(token: string) {
        console.log('copyToClipboard', token);
        if (token) apiCopyButton.classList.remove('hide');
        if (!apiCopyButton) return;
        apiCopyButton.onclick = () => {
            copyToClipboard(token);
            apiCopyButton.classList.add('hide');
        };
    }
}

(document.getElementById('sign-out') as any).onclick = () => {
    localStorage.removeItem('_aion_in');
    AuthService.removeAuth();
};

initUsagePage();
