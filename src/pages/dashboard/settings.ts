import { AuthService, DashboardService } from '../../api';

(document.getElementById('sign-out') as any).onclick = () => {
    AuthService.removeAuth();
    localStorage.removeItem('_aion_in');
};

(document.getElementById('btn-delete-account') as any).onclick = async () => {
    if (confirm('Are you sure you want to delete your account?')) {
        await AuthService.init();
        await DashboardService.delete();
        localStorage.removeItem('_aion_in');
        window.location.href = `https://${window.location.host}/`;
    }
};

// Legacy
(document.getElementById('delete-account') as any).onclick = async () => {
    await AuthService.init();
    await DashboardService.delete();
    localStorage.removeItem('_aion_in');
    window.location.href = `https://${window.location.host}/`;
};

AuthService.init();
DashboardService.subscriptionInfo().then((response) => {});
