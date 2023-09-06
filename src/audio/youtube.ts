export class YouTubePlayer {
    player: any;
    playPauseBtn: HTMLElement;
    progressSlider: HTMLElement;
    track: HTMLElement;
    dragging: boolean;
    progressInterval: number = 0;

    constructor(playPauseBtn: HTMLElement, progressSlider: HTMLElement, track: HTMLElement) {
        this.playPauseBtn = playPauseBtn;
        this.progressSlider = progressSlider;
        this.track = track;
        this.dragging = false;
        this.progressInterval = 0;
        this.initListeners();
    }

    initListeners(): void {
        this.playPauseBtn.addEventListener('click', () => this.playPauseVideo());
        this.progressSlider.addEventListener('mousedown', (e: MouseEvent) => this.mouseDown(e));
        document.addEventListener('mousemove', (e: MouseEvent) => this.mouseMove(e));
        document.addEventListener('mouseup', () => this.mouseUp());
    }

    onYouTubeIframeAPIReady(videoID: string): void {
        // @ts-ignore
        this.player = new YT.Player('youtube-player', {
            height: '48',
            width: '48',
            videoId: videoID,
            events: {
                onReady: () => this.onPlayerReady(),
                onStateChange: (event: any) => this.onPlayerStateChange(event),
            },
        });
    }

    onPlayerReady(): void {
        this.player.setVolume(30);
    }

    playPauseVideo(): void {
        const state = this.player.getPlayerState();

        // @ts-ignore
        if (state === YT.PlayerState.ENDED) {
            this.player.seekTo(0);
            this.player.playVideo();
        }

        // @ts-ignore
        if (state === YT.PlayerState.PAUSED || state === YT.PlayerState.CUED) {
            this.player.playVideo();
            this.playPauseBtn.innerHTML = ` <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                <rect x="2.5" y="1.5" width="4" height="13" rx="1.5" stroke="white"/>
                <rect x="9.5" y="1.5" width="4" height="13" rx="1.5" stroke="white"/>
            </svg>`;
            this.progressInterval = setInterval(() => {
                if (!this.dragging) {
                    const progress = (this.player.getCurrentTime() / this.player.getDuration()) * 100;
                    this.track.style.width = progress + '%';
                    if (progress >= 100) {
                        this.finishVideo();
                    }
                }
            }, 1000);
        } else {
            this.player.pauseVideo();
            this.playPauseBtn.innerHTML = `
            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32" fill="none">
                <path d="M13.3375 10.8944L21.7598 15.1056C22.4968 15.4741 22.4968 16.5259 21.7598 16.8944L13.3375 21.1056C12.3402 21.6042 11.1667 20.879 11.1667 19.7639V12.2361C11.1667 11.121 12.3402 10.3958 13.3375 10.8944Z" stroke="white"/>
            </svg>`;
            clearInterval(this.progressInterval);
        }
    }

    onPlayerStateChange(event: any): void {
        // @ts-ignore
        if (event.data === YT.PlayerState.ENDED) {
            this.finishVideo();
        }
    }

    mouseDown(e: MouseEvent): void {
        this.dragging = true;
        clearInterval(this.progressInterval);
        this.updateProgress(e);
    }

    mouseMove(e: MouseEvent): void {
        if (this.dragging) {
            this.updateProgress(e);
        }
    }

    mouseUp(): void {
        this.dragging = false;
        this.progressInterval = setInterval(() => {
            if (!this.dragging) {
                const progress = (this.player.getCurrentTime() / this.player.getDuration()) * 100;
                this.track.style.width = progress + '%';
                if (progress >= 100) {
                    this.finishVideo();
                }
            }
        }, 1000);
    }

    updateProgress(e: MouseEvent): void {
        const rect = this.progressSlider.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const width = rect.right - rect.left;
        const progress = Math.min(Math.max(x / width, 0), 1) * 100;
        this.track.style.width = progress + '%';
        this.player.seekTo(this.player.getDuration() * (progress / 100));
        if (progress >= 100) {
            this.finishVideo();
        }
    }

    finishVideo(): void {
        this.playPauseBtn.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32" fill="none">
            <path d="M13.3375 10.8944L21.7598 15.1056C22.4968 15.4741 22.4968 16.5259 21.7598 16.8944L13.3375 21.1056C12.3402 21.6042 11.1667 20.879 11.1667 19.7639V12.2361C11.1667 11.121 12.3402 10.3958 13.3375 10.8944Z" stroke="white"/>
        </svg>`;
        clearInterval(this.progressInterval);
    }
}

export class YoutubePlayerContainer {
    containerId: string = '';
    container: HTMLElement | null;
    videoId: string = '';
    youtubePlayer: YouTubePlayer | null = null;
    name: string = '';

    constructor(containerId: string, videoId: string, name: string) {
        this.containerId = containerId;
        this.container = document.getElementById(containerId);
        this.videoId = videoId;
        this.name = name;
        this.initializePlayer();
    }

    async loadYouTubeIframeAPI() {
        return new Promise((resolve: any, reject) => {
            // @ts-ignore
            window.onYouTubeIframeAPIReady = () => {
                resolve();
            };
            const tag = document.createElement('script') as HTMLScriptElement;
            tag.src = 'https://www.youtube.com/iframe_api';
            tag.onerror = reject;
            const firstScriptTag = document.getElementsByTagName('script')[0] as HTMLScriptElement;
            firstScriptTag.parentNode?.insertBefore(tag, firstScriptTag);
        });
    }

    async initializePlayer(): Promise<void> {
        if (!this.container) return;

        this.container.classList.add('aiornot-player-square');
        this.container.innerHTML = `
            <div id="youtube-player"></div>
            <div class="aiornot-player-controls-square">
                <div class="aiornot-player-button-sqaure" id="${this.container.id}-playPauseBtn">
                    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32" fill="none">
                        <path d="M13.3375 10.8944L21.7598 15.1056C22.4968 15.4741 22.4968 16.5259 21.7598 16.8944L13.3375 21.1056C12.3402 21.6042 11.1667 20.879 11.1667 19.7639V12.2361C11.1667 11.121 12.3402 10.3958 13.3375 10.8944Z" stroke="white"/>
                    </svg>
                </div>
                <div class="aiornot-player-hover-bg"></div>
                <div class="aiornot-player-title-sqaure">${this.name}</div>
            </div>
            <div id="${this.container.id}-slider" class="aiornot-player-slider">
                <div id="${this.container.id}-progress" class="aiornot-player-progress"></div>
            </div>
        `;

        const playPauseBtn = document.getElementById(`${this.container.id}-playPauseBtn`) as HTMLElement;
        const progressSlider = document.getElementById(`${this.container.id}-slider`) as HTMLElement;
        const track = document.getElementById(`${this.container.id}-progress`) as HTMLElement;
        await this.loadYouTubeIframeAPI();
        this.youtubePlayer = new YouTubePlayer(playPauseBtn, progressSlider, track);
        this.youtubePlayer.onYouTubeIframeAPIReady(this.videoId);
    }
}

export const createYoutubePlayer = (elementId: string, url: string): void => {
    const getYoutubeVideoID = (url: string): string => {
        try {
            let urlObject = new URL(url);
            let params = new URLSearchParams(urlObject.search);
            return params.get('v') ?? '';
        } catch (e) {
            console.error('Неверный URL', e);
            return '';
        }
    };

    const videoID: string = getYoutubeVideoID(url);

    new YoutubePlayerContainer(elementId, videoID, '');
};

// export class YouTubeAPI {
//     linkIsReady: boolean;
//     player: any;

//     constructor() {
//         this.linkIsReady = false;
//         this.player = null;

//         this.onYouTubeIframeAPIReady = this.onYouTubeIframeAPIReady.bind(this);
//     }

//     onYouTubeIframeAPIReady(): void {
//         this.linkIsReady = true;
//     }

//     static getYoutubeVideoID(url: string): string | null {
//         try {
//             let urlObject = new URL(url);
//             let params = new URLSearchParams(urlObject.search);
//             return params.get('v');
//         } catch (e) {
//             console.error('Неверный URL', e);
//             return null;
//         }
//     }
// }

// export class YouTubePlayer {
//     elementId: string;
//     player: any;

//     constructor(elementId: string) {
//         this.elementId = elementId;
//         this.player = null;
//     }

//     init(videoId: string): void {
//         // @ts-ignore
//         this.player = new YT.Player(this.elementId, {
//             height: '480',
//             width: '480',
//             videoId: videoId,
//             playerVars: {
//                 controls: 0,
//                 disablekb: 1,
//                 modestbranding: 1,
//                 rel: 0,
//                 showinfo: 0,
//                 autoplay: 0,
//                 fs: 0,
//             },
//             events: {
//                 onReady: (event: any) => {
//                     event.target.playVideo();
//                 },
//                 onStateChange: (event: any) => {
//                     console.log('Состояние плеера: ' + event.data);
//                     //@ts-ignore
//                     if (event.data == YT.PlayerState.ENDED) {
//                         alert('Видео закончилось');
//                     }
//                 },
//             },
//         });
//     }
// }
