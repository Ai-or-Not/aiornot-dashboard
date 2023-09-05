import { AuthService, DashboardService } from '../../api';

(document.getElementById('delete-account') as any).onclick = async () => {
    await AuthService.init();
    await DashboardService.delete();
    window.location.href = 'https://aiornot.com';
};

(document.getElementById('sign-out') as any).onclick = () => {
    AuthService.removeAuth();
};
