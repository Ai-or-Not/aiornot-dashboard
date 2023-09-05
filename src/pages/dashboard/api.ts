import { AuthService, DashboardService } from '../../api';
import { ElementCreator } from '../../dashboard';

async function initUsagePage() {
    const usage: any = await DashboardService.fetchUsageApi();
    const refreshApiTokenButton = document.getElementById('refresh-api-key') as any;
    const getApiTokenButton = document.getElementById('request-api-key') as any;
    const dashAPIEmptyBlock = document.getElementById('dash-api-empty') as any;
    const dashAPIContentBlock = document.getElementById('dash-api-content') as any;

    if (usage.access) {
        dashAPIEmptyBlock.style.display = 'none';
        dashAPIContentBlock.style.display = 'block';
        //	refreshApiTokenButton.style.display = 'flex'
        //	getApiTokenButton.style.display = 'none'
        ElementCreator.fillApiKeyCard(usage);
        refreshApiTokenButton.onclick = async () => {
            await DashboardService.refreshApiToken();
            initUsagePage();
        };
    } else {
        dashAPIEmptyBlock.style.display = 'flex';
        dashAPIContentBlock.style.display = 'none';
        //	refreshApiTokenButton.style.display = 'none'
        //	getApiTokenButton.style.display = 'flex'
        getApiTokenButton.onclick = async () => {
            await DashboardService.fetchApiToken();
            initUsagePage();
        };
    }
}

(document.getElementById('sign-out') as any).onclick = () => {
    AuthService.removeAuth();
};

initUsagePage();
