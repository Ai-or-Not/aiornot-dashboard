import { AuthService, WrapperAIGeneratedService } from '@/api';
import { goSignIn, loadingEnd, loadingStart, uiShowUserUsage } from '$utils/common';
import { showBadImageQualityNotification } from '$utils/notification';
import { activeTab } from '$utils/tabs';

export const personaDetectionInit = () => {
    //elements
    if (window.location.host.includes('webflow')) {
        document.querySelector('#pdet-tab')?.classList.remove('hide');
    }

    const testImages = document.querySelectorAll('#pdet-test-image');
    const inputEl_fileInput = document.querySelector('#pdet-file-input') as any;
    const imageEl_currentImage = document.querySelector('#aion-pdet-current-image') as any;
    const imageEl_currentImageEmpty = document.querySelector('#pdet-empty-preview-img') as Element;
    const imageEl_nsfwImage = document.querySelector('#pdet-nsfw-preview-img') as Element;
    const imageUrlInput = document.querySelector('#aion-pdet-image-url') as any;
    const submitButton = document.querySelector('#aion-pdet-url-submit') as Element;
    const uiEl_dropZone = document.querySelector('#aion-pdet-dropzone') as Element;
    const textEl_dropZoneError = document.querySelector('#aion-pdet-dropzone-text') as Element;
    const btnAmlTab = document.getElementById('pdet-tab') as Element; // Person detection tab button

    //variables
    let pastedUrl: any;
    let fileSizeAllow: any;

    btnAmlTab.addEventListener('click', () => {
        // Set init tab state.
        uiTabInitialState();
    });

    const uiTabInitialState = () => {
        // Show pictures and text
        document.querySelector('#pdet-hero-home-title-description')?.classList.remove('hide');
        document.querySelector('#pdet-hero-home-gallery')?.classList.remove('hide');
        document.querySelector('#aion-pdet-dropzone')?.classList.remove('hide');
        // Show buttons
        document.querySelector('#pdet-button-report-true')?.classList.remove('hide');
        document.querySelector('#pdet-button-report-false')?.classList.remove('hide');
        // Show devider
        document.querySelector('#pdet-hero-home_drop-zone-divider')?.classList.remove('hide');

        // Hide report elements
        imageEl_currentImage.classList.add('hide');
        document.querySelector('#result-screen-pdet-wrapper')?.classList.add('hide');
        imageEl_currentImage.classList.add('hide');
        document.querySelector('#pdet-result-screen-col')?.classList.add('hide');
        (document.getElementById('pdet-title-human') as Element).classList.add('hide');
        imageUrlInput.value = '';
    };

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
    const someThingWentWrong_error = () => {
        uiEl_dropZone.classList.add('red-border');
        textEl_dropZoneError.textContent = 'Something went wrong. Try again.';
        textEl_dropZoneError.classList.add('error');
    };
    // Listeners

    inputEl_fileInput?.addEventListener('change', () => {
        const fileSize = inputEl_fileInput?.files[0].size;
        const maxSize = 10 * 1024 * 1024; // 10 MB in bytes
        if (fileSize > maxSize) {
            fileSizeAllow = false;
        } else {
            fileSizeAllow = true;
        }
    });

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
        await WrapperAIGeneratedService.getPdetReportByUrl(pastedUrl)
            .then((response) => {
                pdetLoadingFinish(response.nsfw_detected, response?.verdict ? 'AI' : 'Human', response.url);
                if (response.good_quality === false) {
                    showBadImageQualityNotification();
                }
            })
            .catch((error) => {
                loadingEnd();
                someThingWentWrong_error();
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
                if (response.good_quality === false) {
                    showBadImageQualityNotification();
                }
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
        if (fileSizeAllow === true) {
            imageEl_currentImage.src = '';
            await pdetPostToApiBinaryFile(file);
        } else {
            someThingWentWrong_error();
        }
    });

    inputEl_fileInput?.addEventListener('change', async (event: any) => {
        if (fileSizeAllow == true) {
            const fileInput = inputEl_fileInput as any;
            const file = fileInput.files[0];

            imageEl_currentImage.src = '';
            await pdetPostToApiBinaryFile(file);
        } else {
            console.log('fileSizeAllow');
            someThingWentWrong_error();
        }
    });

    (uiEl_dropZone as Element)?.addEventListener('click', function () {
        if (AuthService.checkAuth(goSignIn)) return;
        // fileUpload_way = 'screen_home';
        inputEl_fileInput.click();
    });

    (document.querySelector('#choose-file-row') as Element)?.addEventListener('click', function () {
        // fileUpload_way = 'screen_result';
        inputEl_fileInput.click();
    });
    //

    submitButton?.addEventListener('click', () => {
        loadingStart();
        if (imageUrlInput.value !== '') {
            pastedUrl = imageUrlInput.value;
            imageEl_currentImage.src = imageUrlInput.value;
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

    // const element = document.querySelector('aion-pdet-image-url') as Element;
    // element?.addEventListener('keypress', function (e: any) {
    //     if (e.key === 'Enter') {
    //         if ((element as any).value !== '') {
    //             pdetPostToApiUrl((element as any).value);
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

    uiShowUserUsage(document.querySelector('#pdet-quotas') as Element);
};
