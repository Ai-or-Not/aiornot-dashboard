import { initFingerPrint } from '$utils/fingerprint';
import { AudioPlayerContainer, PlayerManager, YoutubePlayerContainer, createYoutubePlayer } from '@/audio';
import { AuthService, BASE_URL_RESULTS, RequestCounter, WrapperAIGeneratedService } from '../api';

export const initAudio = () => {
    //elements
    const reportScreen = document.getElementById('report-screen') as any;
    const reportButton_submit = document.querySelector('#button-report-submit') as Element;
    const reportInput = document.querySelector('#input-report-comment') as any;
    const reportButtonLike = document.querySelector('#button-report_true') as Element;
    const reportButtonDislike = document.querySelector('#button-report_false') as Element;
    const reportScreenCloseButton = document.querySelector('#button-report_close') as any;
    const errorMessage = document.querySelector('#url-error-message') as Element;
    const cancelProcessingButton = document.querySelector('#processing_cancel') as Element;
    const fileInput = document.querySelector('#file-input') as any;
    const fileInputErrorMessage = document.querySelector('#input-error-text') as Element;
    const youtubeLinkInput = document.getElementById('ai-or-not_image-url') as any;
    const checkYoutubeLinkButton = document.getElementById('ai-or-not_submit') as Element;
    const dropZone = document.querySelector('#ai-or-not_dropzone') as Element;
    const dropZoneErrorMessage = document.querySelector('#ai-or-not_dropzone-text') as Element;
    const resultContainer = document.querySelector('#result-screen_col') as Element;
    const shareButtonsContainer = document.querySelector('#share-items-hide') as Element;
    const dropZoneRequestCounter = document.querySelector('#ai-or-not-dropzone-counter') as Element;
    const dropZoneRequestCounterContainer = document.querySelector('#ai-or-not-dropzone-counter-w') as Element;
    var audioPlayerContainer: AudioPlayerContainer | null = null;
    var youtubePlayerContainer: YoutubePlayerContainer | null = null;

    let fileSizeAllow: any;
    let currentResultId: any;

    const updateRequestCounter = () => {
        if (!AuthService.isExpiredToken()) {
            // Hide element
            dropZoneRequestCounterContainer?.classList.add('hide');
        } else {
            // Increment the count and show element
            const value = localStorage.getItem('requestCount') || '0';
            dropZoneRequestCounter.textContent = Number(value) <= 5 ? value : '5';
            dropZoneRequestCounterContainer.classList.remove('hide');
        }
    };

    updateRequestCounter();

    initFingerPrint();

    const uiReported_initialState = () => {
        reportInput.value = '';

        let buttonText_true = document.querySelector('#button-report_true-text') as Element;
        let buttonText_false = document.querySelector('#button-report_false-text') as Element;
        buttonText_false.classList.add('hide');
        buttonText_true.classList.remove('hide');

        buttonText_true.textContent = buttonText_true.getAttribute('report-button-text-default');
        buttonText_false.textContent = buttonText_false.getAttribute('report-button-text-default');

        reportButtonLike.classList.remove('is-reported');
        reportButtonDislike.classList.remove('is-reported');
        reportButtonLike.classList.remove('hide');
        reportButtonDislike.classList.remove('hide');
    };

    const changeShareUrl = (responseId: string) => {
        currentResultId = responseId;
        const element = document.querySelector('[fs-socialshare-element="url"]') as Element;

        let shareUrlTemplate = AuthService.isExpiredToken()
            ? `${BASE_URL_RESULTS}/aiornot/`
            : `${BASE_URL_RESULTS}/aiornot/users/`;
        const shareUrl = `${shareUrlTemplate}${responseId}`;

        element.textContent = shareUrl;
        let allShareUrl = document.querySelectorAll('.result-screen_share-item');
        allShareUrl.forEach((el) => {
            el.setAttribute('data-url', shareUrl);
        });
    };

    const fileSizeMessage_ok = () => {
        dropZoneErrorMessage.textContent = 'We support jpeg, png, webp, gif, tiff, bmp. 10 Mb of maximum size.';
        dropZoneErrorMessage.classList.remove('text-color-red');
        fileInputErrorMessage.textContent = 'Something went wrong. Try again.';
        errorMessage.classList.add('hide');
    };

    const someThingWentWrong_error = () => {
        errorMessage.classList.remove('hide');
    };

    const someThingWentWrong_ok = () => {
        errorMessage.classList.add('hide');
    };

    const fileSizeMessage_error = () => {
        if (resultContainer.classList.contains('hide')) {
            dropZoneErrorMessage.textContent = 'File is too large (max 10 MB)';
            dropZoneErrorMessage.classList.add('text-color-red');
        } else {
            fileInputErrorMessage.textContent = 'File is too large (max 10 MB)';
            errorMessage.classList.remove('hide');
        }
    };

    const fillPlayerCardByFile = (file: File) => {
        const fileURL = URL.createObjectURL(file);
        audioPlayerContainer = new AudioPlayerContainer('result-screen_image-wrapper', fileURL, file.name, true);
    };

    const fillYoutubePlayerCard = (link: string) => {
        youtubePlayerContainer = createYoutubePlayer('result-screen_image-wrapper', link);
    };

    // Listeners

    fileInput?.addEventListener('change', () => {
        const fileSize = fileInput?.files[0].size;
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
        dropZoneErrorMessage.classList.add('error');
        dropZone.classList.add('red-border');
        dropZoneErrorMessage.textContent = 'Something went wrong. Try again.';
    };

    const initial_dropZone = () => {
        dropZoneErrorMessage.classList.remove('error');
        dropZone.classList.remove('red-border');
        dropZoneErrorMessage.textContent = 'We support jpeg, png, webp, gif, tiff, bmp. 10 Mb of maximum size.';
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
    };

    const loadingStart = () => {
        uiReported_initialState();
        someThingWentWrong_ok();
        fileInputErrorMessage.textContent = 'Something went wrong. Try again.';
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

    function loadingFinish() {
        // Show buttons for share the report.
        shareButtonsContainer.classList.remove('hide');

        (document.querySelector('.processing-screen_triggers_3') as any)?.click();
        (document.querySelector('#processing-screen') as Element).classList.add('hide');
        (document.querySelector('.processing-screen_triggers_5') as any)?.click();
        (document.querySelector('#scroll-to-top-trigger') as any)?.click();
        fileInput.value = '';
        youtubeLinkInput.value = '';
    }

    const findHighestConfidence = (data: any) => {
        if (data === 'unknown') {
            (document.getElementById('title-human') as Element).innerHTML =
                "Sorry, but in this case we can't really say if it's AI or Not";
            (document.getElementById('ai-or-not_result-message-50') as Element).classList.remove('hide');
            (document.getElementById('ai-or-not_result-message') as Element).classList.add('hide');
            (document.getElementById('ai-or-not_result-message-50') as Element).innerHTML =
                'Probly the uploaded audio has most likely been modified or compressed';
            (document.getElementById('title-human') as Element).classList.remove('hide');
            (document.getElementById('title-ai') as Element).classList.add('hide');
        } else {
            (document.getElementById('title-ai') as Element).innerHTML =
                'This audio is generated by <span class="text-color-green">AI</span>';
            (document.getElementById('title-human') as Element).innerHTML =
                'This audio is generated by <span class="text-color-green">Human</span>';
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

    const submitYoutubeLink = async (link: string) => {
        errorMessage.classList.add('hide');
        loadingStart();
        youtubePlayerContainer?.destroy();

        await WrapperAIGeneratedService.getYoutubeVerict(link)
            .then((response) => {
                // RequestCounter.increment();
                changeShareUrl(response.id);
                findHighestConfidence(response.report.verdict === true ? 'ai' : 'human');
                loadingFinish();
                fillYoutubePlayerCard(link);
            })
            .catch((error) => {
                if (resultContainer.classList.contains('hide')) {
                    someThingWentWrong_error();
                } else {
                    someThingWentWrong_error();
                    screen_homeShow();
                }
                console.log(error);
            });
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
        if (fileSizeAllow == true) {
            await uploadBinaryFile(file);
        } else {
            fileSizeMessage_error();
        }
    });

    fileInput?.addEventListener('change', async (event: any) => {
        if (fileSizeAllow == true) {
            const file = fileInput.files[0];
            await uploadBinaryFile(file);
        } else {
            fileSizeMessage_error();
        }
    });

    const uploadBinaryFile = async (file: any) => {
        audioPlayerContainer?.destroy();
        loadingStart();
        await WrapperAIGeneratedService.getAudioVerictByFile(file)
            .then((response) => {
                // RequestCounter.increment();
                changeShareUrl(response.id);
                initial_dropZone();
                findHighestConfidence(response.report.verdict === true ? 'ai' : 'human');
                loadingFinish();
                fillPlayerCardByFile(file);
            })
            .catch((error) => {
                console.log(error);
                error_dropZone();
                screen_homeShow();
            });
    };

    const tappedSampleAudio = async (url: string, name: string) => {
        loadingStart();

        await WrapperAIGeneratedService.getAudioVerictMock(true).then((response) => {
            changeShareUrl(response.id);
            initial_dropZone();
            findHighestConfidence(response.report.verdict === true ? 'ai' : 'human');
            loadingFinish();
            new AudioPlayerContainer('result-screen_image-wrapper', url, name, true);
        });
    };

    cancelProcessingButton?.addEventListener('click', function () {
        initial_dropZone();
        screen_homeShow();
    });

    (document.querySelector('#ai-or-not_dropzone') as Element)?.addEventListener('click', function () {
        fileInput.click();
    });

    (document.querySelector('#choose-file-row') as Element)?.addEventListener('click', function () {
        fileInput.click();
    });

    checkYoutubeLinkButton?.addEventListener('click', () => {
        if (youtubeLinkInput.value != '') {
            submitYoutubeLink(youtubeLinkInput.value);
        }
    });

    youtubeLinkInput?.addEventListener('keypress', (e: any) => {
        if (e.key === 'Enter') {
            if (youtubeLinkInput.value != '') {
                submitYoutubeLink(youtubeLinkInput.value);
            }
        }
    });

    youtubeLinkInput.addEventListener('input', (e: any) => {
        const youtubeLink = e.target.value;
        const isYouTubeLink = (url: string) => {
            let regExp = /^\s*(?:https?:\/\/)?(?:www\.)?(?:music\.)?youtu(?:be)?\.(?:com|be)\/(?:shorts\/)?([^\/?#]+)/;
            return regExp.test(url);
        };

        if (isYouTubeLink(youtubeLink)) {
            checkYoutubeLinkButton.classList.remove('is-disabled');
        } else {
            checkYoutubeLinkButton.classList.add('is-disabled');
        }
    });

    const uiReported_false = () => {
        let buttonText = document.querySelector('#button-report_false-text') as Element;
        buttonText.classList.remove('hide');
        buttonText.textContent = buttonText.getAttribute('report-button-text-default_reported');
        reportButtonDislike.classList.add('is-reported');
        reportButtonLike.classList.add('hide');
        reportScreen.style.display = 'none';
    };

    const uiReported_true = () => {
        let buttonText = document.querySelector('#button-report_true-text') as Element;
        buttonText.classList.remove('hide');
        buttonText.textContent = buttonText.getAttribute('report-button-text-default_reported');
        reportButtonLike.classList.add('is-reported');
        reportButtonDislike.classList.add('hide');
    };

    reportButtonLike?.addEventListener('click', () => {
        uiReported_true();
        WrapperAIGeneratedService.sendFeedback(currentResultId, true, '', true);
    });

    reportButtonDislike?.addEventListener('click', () => {
        reportScreen.style.display = 'flex';
    });

    reportScreenCloseButton?.addEventListener('click', () => {
        reportScreen.style.display = 'none';
    });

    reportButton_submit?.addEventListener('click', () => {
        uiReported_false();
        WrapperAIGeneratedService.sendFeedback(currentResultId, false, reportInput.value, true);
    });

    document?.addEventListener('keydown', (event) => {
        if (event.code === 'Escape') {
            if (reportScreen.style.display !== 'none') {
                reportScreenCloseButton.click();
            }
        }
    });

    reportInput?.addEventListener('change', () => {
        if (reportInput.value != '') {
            reportButton_submit.classList.remove('is-disabled');
        } else {
            reportButton_submit.classList.add('is-disabled');
        }
    });

    reportInput?.addEventListener('input', () => {
        if (reportInput.value != '') {
            reportButton_submit.classList.remove('is-disabled');
        } else {
            reportButton_submit.classList.add('is-disabled');
        }
    });

    const manager = new PlayerManager([
        new AudioPlayerContainer('audio-sample-1', 'https://atrium-junk.s3.amazonaws.com/ai-or-not-audio-samples/Adel', 'Adel'),
        new AudioPlayerContainer(
            'audio-sample-2',
            'https://atrium-junk.s3.amazonaws.com/ai-or-not-audio-samples/Bull+Greek.mp3',
            'Bull Greek'
        ),
        new AudioPlayerContainer(
            'audio-sample-3',
            'https://atrium-junk.s3.amazonaws.com/ai-or-not-audio-samples/Sample+1.mp3',
            'Sample 1'
        ),
        new AudioPlayerContainer(
            'audio-sample-4',
            'https://atrium-junk.s3.amazonaws.com/ai-or-not-audio-samples/Sample+2.mp3',
            'Sample 2'
        ),
        new AudioPlayerContainer(
            'audio-sample-5',
            'https://atrium-junk.s3.amazonaws.com/ai-or-not-audio-samples/Sample+3.mp3',
            'Sample 3'
        ),
        new AudioPlayerContainer(
            'audio-sample-6',
            'https://atrium-junk.s3.amazonaws.com/ai-or-not-audio-samples/Leonardo+DiCaprio.wav',
            'Sample 4'
        ),
        // new AudioPlayerContainer(
        //     'audio-sample-6',
        //     'https://atrium-junk.s3.amazonaws.com/ai-or-not-audio-samples/Trump+speech.mp3',
        //     'Trump speech'
        // ),
    ]);
    manager.players.forEach((player) => {
        player.container?.addEventListener('click', async () => {
            if (player.audioPlayer?.audio.paused) {
                tappedSampleAudio(player.audioSrc, player.name);
            }
        });
    });

    const closeSignUpButton = document.getElementById('close-sign-up') as any;
    closeSignUpButton?.addEventListener('click', () => {
        const signInModalElement = document.getElementById('sign-up') as any;
        signInModalElement.style.display = 'none';
        signInModalElement.style.zIndex = 0;
    });
};
