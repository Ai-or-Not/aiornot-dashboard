import { AuthService, DashboardService } from '../../api';

(document.getElementById('delete-account') as any).onclick = async () => {
    await AuthService.init();
    await DashboardService.delete();
    localStorage.removeItem('_aion_in');
    window.location.href = `https://${window.location.host}/`;
};

(document.getElementById('sign-out') as any).onclick = () => {
    AuthService.removeAuth();
    localStorage.removeItem('_aion_in');
};

AuthService.init();
DashboardService.subscriptionInfo().then((response) => {});
