import { AuthService, DashboardService } from '@/api';

export const loadingStart = () => {
    // uiReported_initialState();
    // imageEl_currentImage.src = '';
    // someThingWentWrong_ok();
    // textEl_inputError.textContent = 'Something went wrong. Try again.';
    // (document.querySelector('#choose-file-row') as Element).classList.remove('hide');

    (document.querySelector('#processing-screen') as Element).classList.remove('hide');

    // (document.querySelector('#result-screen_col') as Element).classList.remove('hide');
    // (document.querySelector('#result-screen_image-wrapper') as Element).classList.remove('hide');

    (document.querySelector('.processing-screen_triggers_5') as any).click();
    (document.querySelector('.processing-screen_triggers_1') as any).click();

    // (document.querySelector('#hero-home_title-description') as Element).classList.add('hide');
    // (document.querySelector('#hero-home_gallery') as Element).classList.add('hide');
    // (document.querySelector('#ai-or-not_dropzone') as Element).classList.add('hide');
    // (document.querySelector('#hero-home_drop-zone-divider') as Element).classList.add('hide');
    // (document.querySelector('#legal-tip') as Element).classList.add('hide');
};

export const loadingEnd = () => {
    // (document.querySelector('.processing-screen_triggers_5') as any).click();
    // (document.querySelector('.processing-screen_triggers_1') as any).click();
    (document.querySelector('#processing-screen') as Element).classList.add('hide');
};

export const fetchUserUsage = (): void => {
    if (AuthService.isAuth()) {
        DashboardService.fetchSubscriptionData().then((user_plan) => {
            if (user_plan) {
                const { quantity } = user_plan.plan?.requests_limits || { quantity: 20 };
                const { total } = user_plan.requests;
                const usage = {
                    total: total,
                    quantity: quantity,
                };
                // save to local storage
                localStorage.setItem('usage', JSON.stringify(usage));
            }
        });
    }
};

export const uiShowUserUsage = (usage_element: Element): void => {
    if (AuthService.isAuth()) {
        // Gte usage from local storage
        const { total, quantity } = JSON.parse(localStorage.getItem('usage')) || {};

        if (total && quantity) {
            usage_element.innerHTML = `
            <div style="margin-top: 20px; font-size: 1rem; color: white">
            <span">
                Available ${quantity - total} from ${quantity} requests
            </span>
            </div>`;
        }
    }
};

export const goSignIn = () => {
    window.location.href = '/sign-in';
};
