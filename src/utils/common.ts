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
