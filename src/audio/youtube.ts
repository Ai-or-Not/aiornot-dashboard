export class YouTubeAPI {
    linkIsReady: boolean;
    player: any; // Уточните тип, если известно, что это будет

    constructor() {
        this.linkIsReady = false;
        this.player = null;

        this.onYouTubeIframeAPIReady = this.onYouTubeIframeAPIReady.bind(this);
    }

    onYouTubeIframeAPIReady(): void {
        this.linkIsReady = true;
    }

    static getYoutubeVideoID(url: string): string | null {
        try {
            let urlObject = new URL(url);
            let params = new URLSearchParams(urlObject.search);
            return params.get('v');
        } catch (e) {
            console.error('Неверный URL', e);
            return null;
        }
    }
}

// export class YouTubePlayer {
//     elementId: string;
//     player: any; // Уточните тип, если известно, что это будет

//     constructor(elementId: string) {
//         this.elementId = elementId;
//         this.player = null;
//     }

//     init(videoId: string): void {
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
//                     if (event.data == YT.PlayerState.ENDED) {
//                         alert('Видео закончилось');
//                     }
//                 },
//             },
//         });
//     }
// }

// export const onOpenYoutube = (): void => {
//     const youTubeAPI = new YouTubeAPI();
//     const youTubePlayer = new YouTubePlayer('youtube-player');

//     const url: string = (document.getElementById('audio-url-input') as HTMLInputElement).value;
//     let videoID: string | null = YouTubeAPI.getYoutubeVideoID(url);
//     if (videoID) {
//         console.log('ID видео: ' + videoID);
//         youTubePlayer.init(videoID);
//     } else {
//         console.log('Не удалось получить ID видео');
//     }
// };