import { PaymentsClient } from '@/api/Payments';

export const initPay = () => {
    console.log('Checkout...');
    const paymentClient = new PaymentsClient();

    // Get product from url
    const urlParams = new URLSearchParams(window.location.search);
    const product_id = urlParams.get('product_id');
    if (product_id === null) {
        console.log('No product id');
        return;
    }

    const product = paymentClient.getProduct(product_id);

    // Create payment form
    paymentClient.createPaymentForm2(product);
    paymentClient.initPaymentForm(product);
};

export const plansInit = () => {
    const paymentClient = new PaymentsClient();

    // Elements
    const buttonPayFreePlan = document.querySelector('#bt-pay-free') as Element;
    const buttonPayBasePlan = document.querySelector('#bt-pay-basic') as Element;
    const buttonPayProPlan = document.querySelector('#bt-pay-pro') as Element;
    const buttonPayEnterpricePlan = document.querySelector('#bt-pay-enterprice') as Element;

    // Payment buttons
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
        paymentClient.checkout(paymentClient.PRODUCT_ID_BASE_9USD_PLAN);
    });

    buttonPayProPlan?.addEventListener('click', () => {
        if (!localStorage.getItem('_ms-mid')) {
            window.location.href = `https://${window.location.host}/signup`;
            return;
        }
        paymentClient.checkout(paymentClient.PRODUCT_ID_PRO_PLAN);

        // paymentClient.createPaymentForm(paymentClient.PRODUCT_ID_PRO_PLAN.msg);
        // DashboardService.fetchSubscriptionData().then((user_plan) => {
        //     if (user_plan?.plan) {
        //         window.location.href = `https://${window.location.host}/`;
        //         alert('You already have a subscription !!!');
        //     } else {
        //         paymentClient.createPaymentIntent(paymentClient.PRODUCT_ID_PRO_PLAN);
        //     }
        // });
    });

    buttonPayEnterpricePlan?.addEventListener('click', () => {
        window.location.href = `https://${window.location.host}/contact-us`;
    });
};
