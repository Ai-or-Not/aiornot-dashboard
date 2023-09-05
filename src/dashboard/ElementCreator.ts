import { copyToClipboard } from '$utils/string';

interface Data {
    expiration_dt?: string;
    limits: {
        daily: number;
        secondly: number;
    };
    usage: {
        daily: number;
    };
    key: string;
}

interface Item {
    verdict: string;
    url: string;
    id: string;
    is_proper_predict?: boolean;
}

export class ElementCreator {
    static fillGridResults(elementId: string, array: Item[]): void {
        const results = document.getElementById(elementId);
        if (!results) return;

        results.style.display = 'grid';
        array.forEach((item) => {
            let requestItem = document.createElement('div');
            requestItem.classList.add('request-item');

            let verdict = document.createElement('div');
            verdict.classList.add('request-item-verdict');
            verdict.innerText = item.verdict;

            let image = document.createElement('img');
            image.src = item.url;
            image.alt = item.verdict;

            ElementCreator.fillCardControls(requestItem, item);

            requestItem.appendChild(image);
            requestItem.appendChild(verdict);
            results.appendChild(requestItem);
        });
    }

    static fillApiKeyCard(data: Data): void {
        const formattedDate = (dateStr: string): string => {
            const date = new Date(dateStr);
            const options: any = {
                month: 'short',
                day: 'numeric',
                year: 'numeric',
                hour: 'numeric',
                minute: 'numeric',
            };

            return date.toLocaleDateString('en-US', options);
        };

        const apiKeyCard = document.getElementById('api-item');
        const expireDate = document.getElementById('expire-date');
        const rps = document.getElementById('rps');
        const progressLine = document.getElementById('progress-line');
        const counterRequests = document.getElementById('counter-requests');
        const totalRequests = document.getElementById('total-requests');

        if (apiKeyCard && expireDate && rps && progressLine && counterRequests && totalRequests && data.expiration_dt) {
            expireDate.innerText = formattedDate(data.expiration_dt);
            rps.innerText = data.limits.secondly.toString();
            progressLine.style.width = `${(data.usage.daily / data.limits.daily) * 100}%`;
            console.log((data.usage.daily / data.limits.daily) * 100);
            counterRequests.innerText = data.usage.daily.toString();
            totalRequests.innerText = data.limits.daily.toString();

            apiKeyCard.style.display = 'flex';

            const apiCopyButton = document.getElementById('api-copy');
            if (!apiCopyButton) return;

            apiCopyButton.onclick = () => {
                copyToClipboard(data.key);
            };
        }
    }

    static fillCardControls(parentElement: HTMLElement, item: Item): void {
        let shareButton = document.createElement('button');
        shareButton.onclick = () => {
            shareButton.innerText = 'Copied!';
            copyToClipboard(`https://results.aiornot.com/aiornot/users/${item.id}`);
            setTimeout(() => {
                shareButton.innerText = 'Share';
            }, 1500);
        };
        shareButton.innerText = 'Share';
        shareButton.classList.add('request-item-share');
        shareButton.style.opacity = '0';

        if (!item.hasOwnProperty('is_proper_predict')) {
            let controlsContainer = document.createElement('div');
            controlsContainer.id = 'request-item-controls';
            controlsContainer.style.display = 'none';

            let likeButton = document.createElement('button');
            likeButton.innerHTML = `<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M14.2 6.71995C14.0127 6.49505 13.7782 6.314 13.5133 6.1896C13.2484 6.06519 12.9593 6.00045 12.6666 5.99995H9.62665L9.99998 5.04662C10.1553 4.6292 10.207 4.18035 10.1507 3.73856C10.0944 3.29677 9.93177 2.87523 9.67677 2.5101C9.42177 2.14497 9.082 1.84715 8.68661 1.64218C8.29121 1.43721 7.852 1.33121 7.40665 1.33328C7.27841 1.33355 7.15296 1.3708 7.04536 1.44056C6.93776 1.51033 6.85256 1.60965 6.79998 1.72661L4.19998 8.72661C4.13051 8.88915 4.09524 9.0739 4.09998 9.26004V14.3333C4.09998 14.7779 4.29581 15.2018 4.64561 15.4759C4.99542 15.75 5.44564 15.8466 5.86661 15.7266L11.8666 13.7266C12.2109 13.6146 12.5144 13.389 12.7066 13.0999L15.7399 8.23994C15.9828 7.8866 16.0376 7.40429 15.8799 6.99994C15.7222 6.59559 15.3866 6.34661 14.9999 6.33328C14.7333 6.33328 14.4666 6.61328 14.2 6.71995Z" fill="white"/>
                  </svg>`;
            likeButton.classList.add('request-item-like');

            let dislikeButton = document.createElement('button');
            dislikeButton.innerHTML = `<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M1.80002 9.27998C1.98733 9.50489 2.2218 9.68594 2.48668 9.81034C2.75157 9.93475 3.04068 9.99949 3.33334 9.99999H6.37334L5.99998 10.9533C5.84471 11.3707 5.79295 11.8196 5.84934 12.2614C5.90573 12.7091 6.06839 13.1306 6.32338 13.4958C6.57838 13.8609 6.91815 14.1587 7.31355 14.3637C7.70895 14.5687 8.14816 14.6747 8.59351 14.6726C8.72175 14.6724 8.8472 14.6351 8.9548 14.5654C9.0624 14.4956 9.1476 14.3963 9.20018 14.2794L11.8002 7.27935C11.8697 7.11681 11.9049 6.93206 11.9002 6.74592V1.67261C11.9002 1.22803 11.7044 0.804177 11.3546 0.530028C11.0048 0.255879 10.5546 0.159303 10.1336 0.279353L4.13359 2.27935C3.78928 2.39139 3.48582 2.61697 3.29359 2.90607L0.260252 7.76607C0.0173837 8.11941 -0.0373969 8.60172 0.120318 9.00607C0.278034 9.41043 0.613639 9.65941 1.00035 9.67274C1.26668 9.67274 1.53335 9.39274 1.80002 9.27998Z" fill="white"/>
                  </svg>`;
            dislikeButton.classList.add('request-item-dislike');

            controlsContainer.appendChild(likeButton);
            controlsContainer.appendChild(dislikeButton);
            parentElement.appendChild(controlsContainer);

            likeButton.onclick = () => {
                likeButton.classList.add('active');
                dislikeButton.classList.remove('active');
            };

            dislikeButton.onclick = () => {
                dislikeButton.classList.add('active');
                likeButton.classList.remove('active');
            };
        }

        parentElement.appendChild(shareButton);
    }
}
