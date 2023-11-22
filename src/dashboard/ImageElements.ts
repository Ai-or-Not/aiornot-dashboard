import { uiShowUserUsage } from '$utils/common';
import { initFingerPrint, visitorId } from '$utils/fingerprint';
import { showBadImageQualityNotification } from '$utils/notification';

import { AuthService, BASE_URL_RESULTS, RequestCounter, WrapperAIGeneratedService } from '../api';

export const init = () => {
    //elements
    const imageTab = document.getElementById('image-tab') as Element;

    const reportScreen = document.getElementById('report-screen') as any;
    const reportButton_submit = document.querySelector('#button-report-submit') as Element;
    const reportInput = document.querySelector('#input-report-comment') as any;
    const reportButton_true = document.querySelector('#button-report_true') as Element;
    const reportButton_false = document.querySelector('#button-report_false') as Element;
    const reportButton_close = document.querySelector('#button-report_close') as any;
    const uiEl_urlError = document.querySelector('#url-error-message') as Element;
    const buttonEl_processClose = document.querySelector('#processing_cancel') as Element;
    const inputEl_fileInput = document.querySelector('#image-file-input') as any;
    const imageEl_currentImage = document.querySelector('#ai-or-not-current-image') as any;
    const imageEl_currentImageEmpty = document.querySelector('#empty-preview-img') as Element;
    const imageEl_nsfwImage = document.querySelector('#nsfw-preview-img') as Element;
    const textEl_inputError = document.querySelector('#input-error-text') as Element;
    const inputEl_urlWaiter = document.querySelector('#ai-or-not_image-url') as any;
    const buttonEl_urlCheck = document.querySelector('#image-url-aion-submit') as Element;
    const uiEl_dropZone = document.querySelector('#ai-or-not_dropzone') as Element;
    const textEl_dropZoneError = document.querySelector('#ai-or-not_dropzone-text') as Element;
    const uiEl_resultCol = document.querySelector('#result-screen_col') as Element;
    const buttonEl_sharedButtons = document.querySelector('#share-items-hide') as Element;
    const counterEl_requestCounterValue = document.querySelector('#ai-or-not-dropzone-counter') as Element;
    const counterEl_requestCounterBlock = document.querySelector('#ai-or-not-dropzone-counter-w') as Element;

    // const testImages = document.querySelectorAll('.test-image');
    const testImages = document.querySelectorAll('#image-test-image');

    const btnImgTab = document.getElementById('image-tab') as Element; // Person detection tab button

    btnImgTab.addEventListener('click', () => {
        // Set init tab state.
        console.log('start loading...');
        screen_homeShow();
    });

    const notionLink = document.querySelector('#w-node-_80502d56-29f7-2965-16f1-d6c6c4ebbd86-c4ebbd86') as Element;
    notionLink.classList.add('hide');
    buttonEl_sharedButtons.classList.add('hide');

    function activeTab() {
        if (imageTab.classList.contains('w--current')) {
            return 'image';
        }
        return 'audio';
    }

    //variables
    let pastedUrl: any;
    let fileUpload_way: any;
    let fileSizeAllow: any;
    let currentResultId: any;

    // const updateRequestCounter = () => {
    //     if (!AuthService.isExpiredToken()) {
    //         // Hide element
    //         counterEl_requestCounterBlock?.classList.add('hide');
    //     } else {
    //         // Increment the count and show element
    //         const value = localStorage.getItem('requestCount') || '0';
    //         // counterEl_requestCounterValue.textContent = Number(value) <= 5 ? value : '5';
    //         counterEl_requestCounterBlock.classList.remove('hide');
    //     }
    // };
    //
    // updateRequestCounter();

    initFingerPrint();

    const uiReported_false = () => {
        const buttonText = document.querySelector('#button-report_false-text') as Element;
        buttonText.classList.remove('hide');
        buttonText.textContent = buttonText.getAttribute('report-button-text-default_reported');
        reportButton_false.classList.add('is-reported');
        reportButton_true.classList.add('hide');
    };

    const uiReported_true = () => {
        const buttonText = document.querySelector('#button-report_true-text') as Element;
        buttonText.classList.remove('hide');
        buttonText.textContent = buttonText.getAttribute('report-button-text-default_reported');
        reportButton_true.classList.add('is-reported');
        reportButton_false.classList.add('hide');
    };

    const uiReported_initialState = () => {
        reportInput.value = '';

        const buttonText_true = document.querySelector('#button-report_true-text') as Element;
        const buttonText_false = document.querySelector('#button-report_false-text') as Element;
        buttonText_false.classList.add('hide');
        buttonText_true.classList.remove('hide');

        buttonText_true.textContent = buttonText_true.getAttribute('report-button-text-default');
        buttonText_false.textContent = buttonText_false.getAttribute('report-button-text-default');

        reportButton_true.classList.remove('is-reported');
        reportButton_false.classList.remove('is-reported');
        reportButton_true.classList.remove('hide');
        reportButton_false.classList.remove('hide');
    };

    const changeShareUrl = (responseId: string) => {
        currentResultId = responseId;
        const element = document.querySelector('[fs-socialshare-element="url"]') as Element;

        const shareUrlTemplate = AuthService.isExpiredToken()
            ? `${BASE_URL_RESULTS}/aiornot/`
            : `${BASE_URL_RESULTS}/aiornot/users/`;
        const shareUrl = `${shareUrlTemplate}${responseId}`;

        element.textContent = shareUrl;
        const allShareUrl = document.querySelectorAll('.result-screen_share-item');
        allShareUrl.forEach((el) => {
            el.setAttribute('data-url', shareUrl);
        });
    };

    const fileSizeMessage_ok = () => {
        textEl_dropZoneError.textContent = 'We support jpeg, png, webp, gif, tiff, bmp. 10 Mb of maximum size.';
        textEl_dropZoneError.classList.remove('text-color-red');
        textEl_inputError.textContent = 'Something went wrong. Try again.';
        uiEl_urlError.classList.add('hide');
    };

    const someThingWentWrong_error = () => {
        uiEl_urlError.classList.remove('hide');
    };

    const someThingWentWrong_ok = () => {
        uiEl_urlError.classList.add('hide');
    };

    const fileSizeMessage_error = () => {
        if (uiEl_resultCol.classList.contains('hide')) {
            textEl_dropZoneError.textContent = 'File is too large (max 10 MB)';
            textEl_dropZoneError.classList.add('text-color-red');
        } else {
            textEl_inputError.textContent = 'File is too large (max 10 MB)';
            uiEl_urlError.classList.remove('hide');
        }
    };

    // Listeners

    // Solve file size variables.
    inputEl_fileInput?.addEventListener('change', () => {
        const fileSize = inputEl_fileInput?.files[0].size;
        const maxSize = 10 * 1024 * 1024; // 10 MB in bytes
        if (fileSize > maxSize) {
            fileSizeAllow = false;
            fileSizeMessage_error();
        } else {
            fileSizeAllow = true;
            fileSizeMessage_ok();
        }
    });

    const error_dropZone = () => {
        (document.querySelector('#processing-screen') as Element).classList.add('hide');
        textEl_dropZoneError.classList.add('error');
        uiEl_dropZone.classList.add('red-border');
        textEl_dropZoneError.textContent = 'Something went wrong. Try again.';
    };

    const initial_dropZone = () => {
        textEl_dropZoneError.classList.remove('error');
        uiEl_dropZone.classList.remove('red-border');
        textEl_dropZoneError.textContent = 'We support jpeg, png, webp, gif, tiff, bmp. 10 Mb of maximum size.';
    };

    const screen_homeShow = () => {
        (document.querySelector('#choose-file-row') as Element).classList.add('hide');
        (document.querySelector('#legal-tip') as Element).classList.remove('hide');
        (document.querySelector('#processing-screen') as Element).classList.add('hide');
        (document.querySelector('#hero-home_title-description') as Element).classList.remove('hide');
        (document.querySelector('#hero-home_gallery') as Element).classList.remove('hide');
        (document.querySelector('#ai-or-not_dropzone') as Element).classList.remove('hide');
        (document.querySelector('#hero-home_drop-zone-divider') as Element).classList.remove('hide');
        (document.querySelector('#result-screen_col') as Element).classList.add('hide');
        (document.querySelector('#result-screen_image-wrapper') as Element).classList.add('hide');
        imageEl_currentImage.classList.add('hide');
        imageEl_currentImageEmpty.classList.remove('hide');
        imageEl_nsfwImage.classList.remove('hide');
    };

    const loadingStart = () => {
        uiReported_initialState();
        imageEl_currentImage.src = '';
        someThingWentWrong_ok();
        textEl_inputError.textContent = 'Something went wrong. Try again.';
        (document.querySelector('#choose-file-row') as Element).classList.remove('hide');
        (document.querySelector('#legal-tip') as Element).classList.add('hide');
        (document.querySelector('.processing-screen_triggers_5') as any).click();
        (document.querySelector('#processing-screen') as Element).classList.remove('hide');
        (document.querySelector('.processing-screen_triggers_1') as any).click();
        (document.querySelector('#hero-home_title-description') as Element).classList.add('hide');
        (document.querySelector('#hero-home_gallery') as Element).classList.add('hide');
        (document.querySelector('#ai-or-not_dropzone') as Element).classList.add('hide');
        (document.querySelector('#hero-home_drop-zone-divider') as Element).classList.add('hide');
        (document.querySelector('#result-screen_col') as Element).classList.remove('hide');
        (document.querySelector('#result-screen_image-wrapper') as Element).classList.remove('hide');
    };

    function loadingFinish(nsfw_detected = false) {
        if (nsfw_detected) {
            imageEl_nsfwImage.classList.remove('hide');
            imageEl_currentImage.classList.add('hide');
            imageEl_currentImageEmpty.classList.add('hide');
            // Hide buttons for share the report.
            buttonEl_sharedButtons.classList.add('hide');
        } else {
            imageEl_nsfwImage.classList.add('hide');
            imageEl_currentImage.classList.remove('hide');
            imageEl_currentImageEmpty.classList.add('hide');
            // Show buttons for share the report.
            // buttonEl_sharedButtons.classList.remove('hide');
        }

        (document.querySelector('.processing-screen_triggers_3') as any).click();
        (document.querySelector('#processing-screen') as Element).classList.add('hide');
        (document.querySelector('.processing-screen_triggers_5') as any).click();

        // (document.querySelector('#scroll-to-top-trigger') as any).click();
        inputEl_fileInput.value = '';
        (document.querySelector('#ai-or-not_image-url') as any).value = '';
    }

    const findHighestConfidence = (data: any) => {
        if (data === 'unknown') {
            (document.getElementById('title-human') as Element).innerHTML =
                "Sorry, but in this case we can't really say if it's AI or Not";
            (document.getElementById('ai-or-not_result-message-50') as Element).classList.remove('hide');
            (document.getElementById('ai-or-not_result-message') as Element).classList.add('hide');
            (document.getElementById('ai-or-not_result-message-50') as Element).innerHTML =
                'Probly the uploaded image has most likely been modified or compressed';
            (document.getElementById('title-human') as Element).classList.remove('hide');
            (document.getElementById('title-ai') as Element).classList.add('hide');
        } else {
            (document.getElementById('title-ai') as Element).innerHTML =
                'This is likely <span class="text-color-green">AI</span> ' +
                '<div style="font-size: 1rem; color: #FFFFFFB3; font-family: Space Grotesk, sans-serif;">\n' +
                '<span> Free Research Preview. AI or Not may produce inaccurate results </span>\n' +
                '</div>';

            (document.getElementById('title-human') as Element).innerHTML =
                'This is likely <span class="text-color-green">Human</span>' +
                '<div style="font-size: 1rem; color: #FFFFFFB3; font-family: Space Grotesk, sans-serif;">\n' +
                '<span> Free Research Preview. AI or Not may produce inaccurate results </span>\n' +
                '</div>';
            (document.getElementById('ai-or-not_result-message-50') as Element).classList.add('hide');
            (document.getElementById('ai-or-not_result-message') as Element).classList.remove('hide');
            (document.querySelector('#ai-or-not_model-name') as Element).textContent = data;

            if (data === 'ai') {
                (document.getElementById('title-human') as Element).classList.add('hide');
                (document.getElementById('title-ai') as Element).classList.remove('hide');
            } else {
                (document.getElementById('title-human') as Element).classList.remove('hide');
                (document.getElementById('title-ai') as Element).classList.add('hide');
            }
        }
    };

    const postToApi_url = async () => {
        if (RequestCounter.isLimitExceeded()) {
            const signInModalElement = document.getElementById('sign-up') as any;
            signInModalElement.style.display = 'flex';
            signInModalElement.style.zIndex = 100;
            screen_homeShow();
        } else {
            uiEl_urlError.classList.add('hide');
            loadingStart();

            await WrapperAIGeneratedService.getReportsByUrl(pastedUrl, visitorId as string)
                .then((response) => {
                    RequestCounter.increment();
                    changeShareUrl(response.id);
                    imageEl_currentImage.src = pastedUrl;
                    findHighestConfidence(response.verdict);
                    loadingFinish(response.nsfw_detected);

                    if (response.good_quality === false) {
                        showBadImageQualityNotification();
                    }
                })
                .catch((error) => {
                    if (uiEl_resultCol.classList.contains('hide')) {
                        someThingWentWrong_error();
                    } else {
                        someThingWentWrong_error();
                        screen_homeShow();
                    }
                    // console.log(error);
                });
        }
    };

    const dropzone = document.body;
    const tipMessage = document.querySelector('#dropzone-fullscreen_message-tip');
    const formatMessage = document.querySelector('#dropzone-fullscreen_message-format');

    dropzone?.addEventListener('dragover', function (event) {
        event.preventDefault();
        (document.querySelector('.dropzone-fullscreen') as Element).classList.remove('hide');
    });
    dropzone?.addEventListener('dragleave', function (event) {
        event.preventDefault();
        (document.querySelector('.dropzone-fullscreen') as Element).classList.add('hide');
    });

    dropzone?.addEventListener('drop', async function (event: any) {
        if (activeTab() !== 'image') {
            return;
        }

        event.preventDefault();
        (document.querySelector('.dropzone-fullscreen') as Element).classList.add('hide');
        const file = event.dataTransfer.files[0];
        const fileSize = file.size;
        const maxSize = 10 * 1024 * 1024; // 10 MB in bytes
        if (fileSize > maxSize) {
            fileSizeAllow = false;
            fileSizeMessage_error();
        } else {
            fileSizeAllow = true;
            fileSizeMessage_ok();
        }
        if (fileSizeAllow === true) {
            await uploadBinaryFile(file);
        } else {
            fileSizeMessage_error();
        }
    });

    inputEl_fileInput?.addEventListener('change', async (event: any) => {
        if (fileSizeAllow === true) {
            const fileInput = inputEl_fileInput as any;
            console.log(fileInput);
            const file = fileInput.files[0];

            await uploadBinaryFile(file);
        } else {
            fileSizeMessage_error();
        }
    });

    const uploadBinaryFile = async (file: any) => {
        // console.log(file);
        loadingStart();
        if (RequestCounter.isLimitExceeded()) {
            const signInModalElement = document.getElementById('sign-up') as any;
            signInModalElement.style.display = 'flex';
            signInModalElement.style.zIndex = 100;
            screen_homeShow();
            // loadingFinish()
            return;
        }

        const currentImage = document.querySelector('#ai-or-not-current-image') as any;
        const currentImageUrl = URL.createObjectURL(file);
        currentImage.setAttribute('src', currentImageUrl);
        imageEl_currentImage.classList.remove('hide');
        imageEl_currentImageEmpty.classList.add('hide');

        await WrapperAIGeneratedService.getReportsByBinary(file, visitorId as string)
            .then((response) => {
                RequestCounter.increment();
                changeShareUrl(response.id);
                initial_dropZone();
                findHighestConfidence(response.verdict);
                loadingFinish(response.nsfw_detected);

                if (response.good_quality === false) {
                    showBadImageQualityNotification();
                }
            })

            .catch((error) => {
                // console.log(error);
                error_dropZone();
                screen_homeShow();
            });
    };

    buttonEl_processClose?.addEventListener('click', function () {
        initial_dropZone();
        screen_homeShow();
    });

    (document.querySelector('#ai-or-not_dropzone') as Element)?.addEventListener('click', function () {
        if (activeTab() !== 'image') {
            return;
        }

        if (AuthService.checkAuth(screen_homeShow)) return;

        fileUpload_way = 'screen_home';
        inputEl_fileInput.click();
    });

    (document.querySelector('#choose-file-row') as Element)?.addEventListener('click', function () {
        if (activeTab() !== 'image') {
            return;
        }

        fileUpload_way = 'screen_result';
        inputEl_fileInput.click();
    });

    buttonEl_urlCheck?.addEventListener('click', () => {
        if (inputEl_urlWaiter.value !== '') {
            pastedUrl = inputEl_urlWaiter.value;
            postToApi_url();
        }
    });

    const element = document.querySelector('#ai-or-not_image-url') as Element;

    element?.addEventListener('keypress', function (e: any) {
        if (e.key === 'Enter') {
            if (inputEl_urlWaiter.value !== '') {
                pastedUrl = inputEl_urlWaiter.value;
                postToApi_url();
            }
        }
    });

    testImages.forEach((testImage) => {
        testImage?.addEventListener('click', () => {
            const testImageUrl = testImage.getAttribute('test-image-url');
            (document.querySelector('#ai-or-not_image-url') as any).value = testImageUrl;
            (document.querySelector('#image-url-aion-submit') as any).click();
            (document.querySelector('#ai-or-not_image-url') as any).value = '';
        });
    });

    reportButton_true?.addEventListener('click', () => {
        uiReported_true();
        WrapperAIGeneratedService.sendFeedback(currentResultId, true, '');
    });

    reportButton_false?.classList.add('hide');
    reportButton_close?.classList.add('hide');

    reportButton_submit?.addEventListener('click', () => {
        WrapperAIGeneratedService.sendFeedback(currentResultId, false, reportInput.value);
        uiReported_false();
    });

    document?.addEventListener('keydown', function (event) {
        if (event.code === 'Escape') {
            if (reportScreen.style.display !== 'none') {
                reportButton_close.click();
            }
        }
    });

    reportInput?.addEventListener('change', () => {
        if (reportInput.value !== '') {
            reportButton_submit.classList.remove('is-disabled');
        } else {
            reportButton_submit.classList.add('is-disabled');
        }
    });

    reportInput?.addEventListener('input', () => {
        if (reportInput.value !== '') {
            reportButton_submit.classList.remove('is-disabled');
        } else {
            reportButton_submit.classList.add('is-disabled');
        }
    });

    const imageUrlInput = document.querySelector('#ai-or-not_image-url') as any;
    const submitButton = document.querySelector('#image-url-aion-submit') as Element;

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

    const closeSignUpButton = document.getElementById('close-sign-up') as any;
    closeSignUpButton?.addEventListener('click', () => {
        const signInModalElement = document.getElementById('sign-up') as any;
        signInModalElement.style.display = 'none';
        signInModalElement.style.zIndex = 0;
    });

    uiShowUserUsage(document.querySelector('#image-quotas') as Element);
};
