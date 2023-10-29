import { AuthService, DashboardService, WrapperAIGeneratedService } from '@/api';
import { goSignIn, loadingEnd, loadingStart } from '$utils/common';
import { activeTab } from '$utils/tabs';

export const personaDetectionInit = () => {
    //elements
    if (window.location.host.includes('webflow')) {
        document.querySelector('#pdet-tab')?.classList.remove('swiper-button-disabled');
    }

    const testImages = document.querySelectorAll('#pdet-test-image');
    // const reportScreen = document.getElementById('report-screen') as any;
    // const reportButton_submit = document.querySelector('#button-report-submit') as Element;
    // const reportInput = document.querySelector('#input-report-comment') as any;
    // const reportButton_true = document.querySelector('#button-report_true') as Element;
    // const reportButton_false = document.querySelector('#button-report_false') as Element;
    // const reportButton_close = document.querySelector('#button-report_close') as any;
    // const uiEl_urlError = document.querySelector('#pdet-url-error-message') as Element;
    // const buttonEl_processClose = document.querySelector('#processing_cancel') as Element;
    const inputEl_fileInput = document.querySelector('#pdet-file-input') as any;
    const imageEl_currentImage = document.querySelector('#aion-pdet-current-image') as any;
    const imageEl_currentImageEmpty = document.querySelector('#pdet-empty-preview-img') as Element;
    const imageEl_nsfwImage = document.querySelector('#pdet-nsfw-preview-img') as Element;
    // const textEl_inputError = document.querySelector('#input-error-text') as Element;
    // const inputEl_urlWaiter = document.querySelector('#ai-or-not_image-url') as any;

    const imageUrlInput = document.querySelector('#aion-pdet-image-url') as any;
    const submitButton = document.querySelector('#aion-pdet-url-submit') as Element;

    const uiEl_dropZone = document.querySelector('#aion-pdet-dropzone') as Element;
    const textEl_dropZoneError = document.querySelector('#aion-pdet-dropzone-text') as Element;
    // const uiEl_resultCol = document.querySelector('#result-screen_col') as Element;

    //variables
    let pastedUrl: any;
    let fileUpload_way: any;
    let fileSizeAllow: any;
    let currentResultId: any;

    // const uiReported_false = () => {
    //     const buttonText = document.querySelector('#button-report_false-text') as Element;
    //     buttonText.classList.remove('hide');
    //     buttonText.textContent = buttonText.getAttribute('report-button-text-default_reported');
    //     reportButton_false.classList.add('is-reported');
    //     reportButton_true.classList.add('hide');
    // };
    //
    // const uiReported_true = () => {
    //     const buttonText = document.querySelector('#button-report_true-text') as Element;
    //     buttonText.classList.remove('hide');
    //     buttonText.textContent = buttonText.getAttribute('report-button-text-default_reported');
    //     reportButton_true.classList.add('is-reported');
    //     reportButton_false.classList.add('hide');
    // };

    const uiReported_initialState = () => {
        // Hide
        document.querySelector('#pdet-hero-home-title-description')?.classList.add('hide');
        document.querySelector('#pdet-hero-home-gallery')?.classList.add('hide');
        document.querySelector('#aion-pdet-dropzone')?.classList.add('hide');

        // Hide buttons
        document.querySelector('#pdet-button-report-true')?.classList.add('hide');
        document.querySelector('#pdet-button-report-false')?.classList.add('hide');

        // Hide devider
        document.querySelector('#pdet-hero-home_drop-zone-divider')?.classList.add('hide');
    };

    // const fileSizeMessage_ok = () => {
    //     textEl_dropZoneError.textContent = 'We support jpeg, png, webp, gif, tiff, bmp. 10 Mb of maximum size.';
    //     textEl_dropZoneError.classList.remove('text-color-red');
    //     textEl_inputError.textContent = 'Something went wrong. Try again.';
    //     uiEl_urlError.classList.add('hide');
    // };
    //
    const someThingWentWrong_error = () => {
        uiEl_dropZone.classList.add('red-border');
        textEl_dropZoneError.textContent = 'Something went wrong. Try again.';
        textEl_dropZoneError.classList.add('error');
        // uiEl_urlError.classList.remove('hide');
    };
    //
    // const someThingWentWrong_ok = () => {
    //     uiEl_urlError.classList.add('hide');
    // };
    //
    // const fileSizeMessage_error = () => {
    //     if (uiEl_resultCol.classList.contains('hide')) {
    //         textEl_dropZoneError.textContent = 'File is too large (max 10 MB)';
    //         textEl_dropZoneError.classList.add('text-color-red');
    //     } else {
    //         textEl_inputError.textContent = 'File is too large (max 10 MB)';
    //         uiEl_urlError.classList.remove('hide');
    //     }
    // };

    // Listeners

    inputEl_fileInput?.addEventListener('change', () => {
        const fileSize = inputEl_fileInput?.files[0].size;
        const maxSize = 10 * 1024 * 1024; // 10 MB in bytes
        if (fileSize > maxSize) {
            fileSizeAllow = false;
            // fileSizeMessage_error();
        } else {
            fileSizeAllow = true;
            // fileSizeMessage_ok();
        }
    });

    // const error_dropZone = () => {
    //     (document.querySelector('#processing-screen') as Element).classList.add('hide');
    //     textEl_dropZoneError.classList.add('error');
    //     uiEl_dropZone.classList.add('red-border');
    //     textEl_dropZoneError.textContent = 'Something went wrong. Try again.';
    // };
    //
    // const initial_dropZone = () => {
    //     textEl_dropZoneError.classList.remove('error');
    //     uiEl_dropZone.classList.remove('red-border');
    //     textEl_dropZoneError.textContent = 'We support jpeg, png, webp, gif, tiff, bmp. 10 Mb of maximum size.';
    // };
    //
    // const screen_homeShow = () => {
    //     (document.querySelector('#choose-file-row') as Element).classList.add('hide');
    //     (document.querySelector('#legal-tip') as Element).classList.remove('hide');
    //     (document.querySelector('#processing-screen') as Element).classList.add('hide');
    //     (document.querySelector('#hero-home_title-description') as Element).classList.remove('hide');
    //     (document.querySelector('#hero-home_gallery') as Element).classList.remove('hide');
    //     (document.querySelector('#ai-or-not_dropzone') as Element).classList.remove('hide');
    //     (document.querySelector('#hero-home_drop-zone-divider') as Element).classList.remove('hide');
    //     (document.querySelector('#result-screen_col') as Element).classList.add('hide');
    //     (document.querySelector('#result-screen_image-wrapper') as Element).classList.add('hide');
    //     imageEl_currentImage.classList.add('hide');
    //     imageEl_currentImageEmpty.classList.remove('hide');
    //     imageEl_nsfwImage.classList.remove('hide');
    // };
    //
    // const loadingStart = () => {
    //     uiReported_initialState();
    //     imageEl_currentImage.src = '';
    //     someThingWentWrong_ok();
    //     textEl_inputError.textContent = 'Something went wrong. Try again.';
    //     (document.querySelector('#choose-file-row') as Element).classList.remove('hide');
    //     (document.querySelector('#legal-tip') as Element).classList.add('hide');
    //     (document.querySelector('.processing-screen_triggers_5') as any).click();
    //     (document.querySelector('#processing-screen') as Element).classList.remove('hide');
    //     (document.querySelector('.processing-screen_triggers_1') as any).click();
    //     (document.querySelector('#hero-home_title-description') as Element).classList.add('hide');
    //     (document.querySelector('#hero-home_gallery') as Element).classList.add('hide');
    //     (document.querySelector('#ai-or-not_dropzone') as Element).classList.add('hide');
    //     (document.querySelector('#hero-home_drop-zone-divider') as Element).classList.add('hide');
    //     (document.querySelector('#result-screen_col') as Element).classList.remove('hide');
    //     (document.querySelector('#result-screen_image-wrapper') as Element).classList.remove('hide');
    // };
    //

    function pdetLoadingFinish(nsfw_detected = false, verdict: string, url: string) {
        uiReported_initialState();
        loadingEnd();

        if (nsfw_detected) {
            // imageEl_nsfwImage.classList.remove('hide');
            // imageEl_currentImage.classList.add('hide');
            // imageEl_currentImageEmpty.classList.add('hide');
            // // Hide buttons for share the report.
            // buttonEl_sharedButtons.classList.add('hide');
        } else {
            imageEl_nsfwImage.classList.add('hide');
            imageEl_currentImage.classList.remove('hide');
            imageEl_currentImageEmpty.classList.add('hide');

            // Result
            document.querySelector('#result-screen-pdet-wrapper')?.classList.remove('hide');
            imageEl_currentImage.classList.remove('hide');
            imageEl_currentImage.src = url;

            document.querySelector('#pdet-result-screen-col')?.classList.remove('hide');
            (document.getElementById('pdet-title-human') as Element).classList.remove('hide'); // Show text result.
            (document.getElementById('pdet-title-human') as Element).innerHTML =
                `This is likely <span class="text-color-green">${verdict}</span>` +
                `<div style="font-size: 1rem; color: #FFFFFFB3; font-family: Space Grotesk, sans-serif;">\n` +
                `<span> Free Research Preview. AI or Not may produce inaccurate results </span>\n` +
                `</div>`;
        }

        imageUrlInput.value = '';
    }

    const pdetPostToApiUrl = async () => {
        // loadingStart();
        console.log('pastedUrl', pastedUrl);
        // uiEl_urlError.classList.add('hide');

        await WrapperAIGeneratedService.getPdetReportByUrl(pastedUrl)
            .then((response) => {
                pdetLoadingFinish(response.nsfw_detected, response?.verdict ? 'AI' : 'Human', response.url);
            })
            .catch((error) => {
                loadingEnd();
                someThingWentWrong_error();
                // Show error message.
                //         if (uiEl_resultCol.classList.contains('hide')) {
                //             someThingWentWrong_error();
                //         } else {
                //             someThingWentWrong_error();
                //             screen_homeShow();
                //         }
            });
    };

    const pdetPostToApiBinaryFile = async (file: any) => {
        // console.log(file);
        loadingStart();

        const currentImage = document.querySelector('#ai-or-not-current-image') as any;
        const currentImageUrl = URL.createObjectURL(file);
        currentImage.setAttribute('src', currentImageUrl);
        imageEl_currentImage.classList.remove('hide');
        imageEl_currentImageEmpty.classList.add('hide');

        await WrapperAIGeneratedService.getPdetReportByBinary(file)
            .then((response) => {
                pdetLoadingFinish(response.nsfw_detected, response?.verdict ? 'AI' : 'Human', response.url);
            })
            .catch((error) => {
                loadingEnd();
                someThingWentWrong_error();
            });
    };

    const dropzone = document.body;

    dropzone?.addEventListener('dragover', function (event) {
        event.preventDefault();
        (document.querySelector('.dropzone-fullscreen') as Element).classList.remove('hide');
    });
    dropzone?.addEventListener('dragleave', function (event) {
        event.preventDefault();
        (document.querySelector('.dropzone-fullscreen') as Element).classList.add('hide');
    });

    dropzone?.addEventListener('drop', async function (event: any) {
        if (activeTab() !== 'pdet') {
            return;
        }

        event.preventDefault();
        (document.querySelector('.dropzone-fullscreen') as Element).classList.add('hide');
        const file = event.dataTransfer.files[0];
        const fileSize = file.size;
        const maxSize = 10 * 1024 * 1024; // 10 MB in bytes
        if (fileSize > maxSize) {
            fileSizeAllow = false;
            // fileSizeMessage_error();
        } else {
            fileSizeAllow = true;
            // fileSizeMessage_ok();
        }
        if (fileSizeAllow == true) {
            await pdetPostToApiBinaryFile(file);
        } else {
            someThingWentWrong_error();
        }
    });

    inputEl_fileInput?.addEventListener('change', async (event: any) => {
        if (fileSizeAllow == true) {
            const fileInput = inputEl_fileInput as any;
            const file = fileInput.files[0];

            await pdetPostToApiBinaryFile(file);
        } else {
            console.log('fileSizeAllow');
            someThingWentWrong_error();
        }
    });

    // buttonEl_processClose?.addEventListener('click', function () {
    //     initial_dropZone();
    //     screen_homeShow();
    // });
    //
    (uiEl_dropZone as Element)?.addEventListener('click', function () {
        if (AuthService.checkAuth(goSignIn)) return;

        fileUpload_way = 'screen_home';
        inputEl_fileInput.click();
    });

    (document.querySelector('#choose-file-row') as Element)?.addEventListener('click', function () {
        fileUpload_way = 'screen_result';
        inputEl_fileInput.click();
    });
    //

    submitButton?.addEventListener('click', () => {
        loadingStart();
        if (imageUrlInput.value !== '') {
            pastedUrl = imageUrlInput.value;
            pdetPostToApiUrl();
        }
    });

    imageUrlInput.addEventListener('input', function () {
        const imageUrl = imageUrlInput.value.trim();
        if (isValidUrl(imageUrl)) {
            submitButton.classList.remove('is-disabled');
        } else {
            submitButton.classList.add('is-disabled');
        }
    });

    const isValidUrl = (url: string) => {
        try {
            new URL(url);
            return true;
        } catch (e) {
            return false;
        }
    };

    // const element = document.querySelector('#ai-or-not_image-url') as Element;
    //
    // element?.addEventListener('keypress', function (e: any) {
    //     if (e.key === 'Enter') {
    //         if (inputEl_urlWaiter.value != '') {
    //             pastedUrl = inputEl_urlWaiter.value;
    //             postToApi_url();
    //         }
    //     }
    // });

    // Test images
    testImages.forEach((testImage) => {
        // Get from the child element test-image-url
        testImage.addEventListener('click', () => {
            const testImageUrl = testImage.getAttribute('test-image-url');
            imageUrlInput.value = testImageUrl;
            (submitButton as any).click();
            imageUrlInput.value = '';
        });
    });

    // reportButton_true?.addEventListener('click', () => {
    //     uiReported_true();
    //     WrapperAIGeneratedService.sendFeedback(currentResultId, true, '');
    // });
    //
    // reportButton_false?.addEventListener('click', () => {});
    //
    // reportButton_close?.addEventListener('click', () => {});
    //
    // reportButton_submit?.addEventListener('click', () => {
    //     WrapperAIGeneratedService.sendFeedback(currentResultId, false, reportInput.value);
    //     uiReported_false();
    // });
    //
    // document?.addEventListener('keydown', function (event) {
    //     if (event.code === 'Escape') {
    //         if (reportScreen.style.display !== 'none') {
    //             reportButton_close.click();
    //         }
    //     }
    // });
    //
    // reportInput?.addEventListener('change', () => {
    //     if (reportInput.value != '') {
    //         reportButton_submit.classList.remove('is-disabled');
    //     } else {
    //         reportButton_submit.classList.add('is-disabled');
    //     }
    // });
    //
    // reportInput?.addEventListener('input', () => {
    //     if (reportInput.value != '') {
    //         reportButton_submit.classList.remove('is-disabled');
    //     } else {
    //         reportButton_submit.classList.add('is-disabled');
    //     }
    // });
    //

    // const closeSignUpButton = document.getElementById('close-sign-up') as any;
    // closeSignUpButton?.addEventListener('click', () => {
    //     const signInModalElement = document.getElementById('sign-up') as any;
    //     signInModalElement.style.display = 'none';
    //     signInModalElement.style.zIndex = 0;
    // });
    //
    const usage = document.querySelector('#image-quotas') as Element;
    if (AuthService.isAuth()) {
        DashboardService.fetchSubscriptionData().then((user_plan) => {
            if (user_plan) {
                const { quantity } = user_plan.plan?.requests_limits || { quantity: 20 };
                let { total } = user_plan.requests;
                if (!user_plan.plan) {
                    try {
                        total -= user_plan.api.usage?.daily || 0;
                    } catch (error) {
                        console.log(error);
                    }
                }

                console.log(user_plan);
                usage.innerHTML = `
            <div style="margin-top: 20px; font-size: 1rem; color: white">
            <span">
                Available ${quantity - total} from ${quantity} requests
            </span>
            </div>`;
                // Base or Pro
            } else {
                // Free plan
                usage.textContent = ``;
            }
        });
    }
};
