import { DashboardService } from '@/api';
import { PaymentsClient } from '@/api/Payments';

export const initPay = () => {
    // Elements
    const buttonPayFreePlan = document.querySelector('#bt-pay-free') as Element;
    const buttonPayBasePlan = document.querySelector('#bt-pay-basic') as Element;
    const buttonPayProPlan = document.querySelector('#bt-pay-pro') as Element;
    const buttonPayEnterpricePlan = document.querySelector('#bt-pay-enterprice') as Element;

    // Payment buttons

    const paymentClient = new PaymentsClient();

    buttonPayFreePlan?.addEventListener('click', () => {
        if (localStorage.getItem('_ms-mid')) {
            window.location.href = `https://${window.location.host}/`;
        } else {
            window.location.href = `https://${window.location.host}/signup`;
        }
    });

    buttonPayBasePlan?.addEventListener('click', () => {
        // Check if user is signed in.
        if (!localStorage.getItem('_ms-mid')) {
            window.location.href = `https://${window.location.host}/signup`;
            return;
        }

        paymentClient.createPaymentForm(paymentClient.PRODUCT_ID_BASE_PLAN.msg);
        DashboardService.fetchSubscriptionData().then((user_plan) => {
            if (user_plan.plan) {
                window.location.href = `https://${window.location.host}/`;
                alert('You already have a subscription !!!');
            } else {
                paymentClient.createPaymentIntent(paymentClient.PRODUCT_ID_BASE_PLAN);
            }
        });
    });

    buttonPayProPlan?.addEventListener('click', () => {
        if (!localStorage.getItem('_ms-mid')) {
            window.location.href = `https://${window.location.host}/signup`;
            return;
        }
        paymentClient.createPaymentForm(paymentClient.PRODUCT_ID_PRO_PLAN.msg);
        DashboardService.fetchSubscriptionData().then((user_plan) => {
            if (user_plan.plan) {
                window.location.href = `https://${window.location.host}/`;
                alert('You already have a subscription !!!');
            } else {
                paymentClient.createPaymentIntent(paymentClient.PRODUCT_ID_PRO_PLAN);
            }
        });
    });

    buttonPayEnterpricePlan?.addEventListener('click', () => {
        window.location.href = `https://${window.location.host}/contact-us`;
    });
};
