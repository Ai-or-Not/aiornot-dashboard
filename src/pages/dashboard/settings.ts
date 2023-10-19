import { AuthService, DashboardService } from '../../api';

(document.getElementById('delete-account') as any).onclick = async () => {
    await AuthService.init();
    await DashboardService.delete();
    window.location.href = `https://${window.location.host}/`;
};

(document.getElementById('sign-out') as any).onclick = () => {
    AuthService.removeAuth();
};

DashboardService.subscriptionInfo().then((response) => {});
