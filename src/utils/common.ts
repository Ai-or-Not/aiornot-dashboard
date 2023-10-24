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
//
// export const functionUserUsage = (): string => {
//     if (AuthService.isAuth()) {
//         DashboardService.fetchSubscriptionData().then((user_plan) => {
//             if (user_plan) {
//                 const { quantity } = user_plan.plan?.requests_limits || { quantity: 20 };
//                 let { total } = user_plan.requests;
//                 if (!user_plan.plan) {
//                     try {
//                         total -= user_plan.api.usage?.daily || 0;
//                     } catch (error) {
//                         console.log(error);
//                     }
//                 }
//
//                 console.log(user_plan);
//                 return `
//                 <div style="margin-top: 20px; font-size: 1rem; color: white">
//                 <span">
//                     Available ${quantity - total} from ${quantity} requests
//                 </span>
//                 </div>`;
//                 // Base or Pro
//             }
//             // Free plan
//             return ``;
//         });
//     }
//     return 'not auth';
// };

export const goSignIn = () => {
    window.location.href = '/sign-in';
};
