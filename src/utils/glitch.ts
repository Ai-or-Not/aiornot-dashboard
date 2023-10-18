// List of words to rotate between
const wordList1 = [
    'Work',
    'Productivity',
    'Efficiency',
    'Innovation',
    'Growth',
    'Identity',
    'Music',
    'Entertainment',
    'Research',
];
const wordList2 = [
    'Fraud',
    'Crime',
    'Deepfakes',
    'Money Laundering',
    'Smear Campaigns',
    'Identity Theft',
    'Disinformation',
    'Fake News',
    'Impersonation',
];

// Function to rotate words between two lists
function rotateWords() {
    const glitchWord = document.querySelector('.glitch-word');
    const currentWord = glitchWord.textContent;

    if (wordList1.includes(currentWord)) {
        // If the current word is in the first list, switch to a word from the second list
        const randomIndex = Math.floor(Math.random() * wordList2.length);
        glitchWord.textContent = wordList2[randomIndex];
        glitchWord.style.color = '#FA1313';
    } else {
        // If the current word is in the second list, switch to a word from the first list
        const randomIndex = Math.floor(Math.random() * wordList1.length);
        glitchWord.textContent = wordList1[randomIndex];
        glitchWord.style.color = '#ADFF00';
    }
}

// Set an interval to rotate words every 3 seconds
setInterval(rotateWords, 3000);

Webflow.push(function () {
    $('#wf-form-ai-or-not_image-url').submit(function () {
        return false;
    });
});

// Pricing table - mobile only slider
let init = false;
let pricingCardSwiper;
let pricingLoanSwiper;

function swiperCard() {
    if (window.innerWidth <= 767) {
        if (!init) {
            init = true;
            pricingCardSwiper = new Swiper('#pricing-card-slider', {
                slidesPerView: 1,
                spaceBetween: 0,
                grabCursor: true,
                keyboard: true,
                autoHeight: false,
                navigation: {
                    nextEl: '#pricing-card-right',
                    prevEl: '#pricing-card-left',
                },
            });
        }
    } else if (init) {
        pricingCardSwiper.destroy();
        init = false;
    }
}

swiperCard();
window.addEventListener('resize', swiperCard);
