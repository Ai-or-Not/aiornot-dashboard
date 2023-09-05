import { AuthService, DashboardService } from '../../api';
import { ElementCreator } from '../../dashboard';

async function initHystory() {
    const loadingBlock = document.getElementById('dash-cards-loading') as any;
    const dashCardsEmptyBlock = document.getElementById('dash-cards-empty') as any;
    loadingBlock.style.display = 'flex';
    try {
        await AuthService.init();
        const array = await DashboardService.fetchRequests();
        if (array.length === 0) {
            dashCardsEmptyBlock.style.display = 'flex';
            (document.getElementById('results') as any).style.display = 'none';
        } else {
            dashCardsEmptyBlock.style.display = 'none';
            ElementCreator.fillGridResults('results', array);
        }
    } catch (error) {
        dashCardsEmptyBlock.style.display = 'flex';
        console.log(error);
    } finally {
        loadingBlock.style.display = 'none';
    }
}

(document.getElementById('sign-out') as any).onclick = () => {
    AuthService.removeAuth();
};

initHystory();
