
class AudioPlayer {
    constructor(audio, playPauseBtn, progressSlider, track) {
        this.audio = audio;
        this.playPauseBtn = playPauseBtn;
        this.progressSlider = progressSlider;
        this.track = track;
        this.dragging = false;
        this.progressInterval = null;
        this.audio.volume = 0.1;

        this.playPauseBtn.addEventListener('click', () => this.playPauseAudio());
        this.progressSlider.addEventListener('mousedown', (e) => this.mouseDown(e));
        document.addEventListener('mousemove', (e) => this.mouseMove(e));
        document.addEventListener('mouseup', () => this.mouseUp());
    }

	playPauseAudio() {
        if (this.audio.paused) {
            this.audio.play();
            this.playPauseBtn.innerHTML = `
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                <rect x="2.5" y="1.5" width="4" height="13" rx="1.5" stroke="white"/>
                <rect x="9.5" y="1.5" width="4" height="13" rx="1.5" stroke="white"/>
            </svg>
            `;
            this.progressInterval = setInterval(() => {
                if (!this.dragging) {
                    const progress = (this.audio.currentTime / this.audio.duration) * 100;
                    this.track.style.width = progress + '%';
                }
            }, 1000);
        } else {
            this.audio.pause();
            this.playPauseBtn.innerHTML = `
            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32" fill="none">
                <path d="M13.3375 10.8944L21.7598 15.1056C22.4968 15.4741 22.4968 16.5259 21.7598 16.8944L13.3375 21.1056C12.3402 21.6042 11.1667 20.879 11.1667 19.7639V12.2361C11.1667 11.121 12.3402 10.3958 13.3375 10.8944Z" stroke="white"/>
            </svg>`;
            clearInterval(this.progressInterval);
        }
    }

    mouseDown(e) {
        this.dragging = true;
        clearInterval(this.progressInterval);
        this.updateProgress(e);
    }

    mouseMove(e) {
        if (this.dragging) {
            this.updateProgress(e);
        }
    }

    mouseUp() {
        this.dragging = false;
        this.progressInterval = setInterval(() => {
            if (!this.dragging) {
                const progress = (this.audio.currentTime / this.audio.duration) * 100;
                this.track.style.width = progress + '%';
            }
        }, 1000);
    }

    updateProgress(e) {
        const rect = this.progressSlider.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const width = rect.right - rect.left;
        const progress = Math.min(Math.max(x / width, 0), 1) * 100;
        this.track.style.width = progress + '%';
        this.audio.currentTime = this.audio.duration * (progress / 100);
    }
}

class AudioPlayerContainer {
    constructor(containerId, audioSrc) {
        this.container = document.getElementById(containerId);
        this.audioSrc = audioSrc;
        this.initializePlayer();
    }

	initializePlayer() {
		this.container.classList.add('aiornot-player');
        this.container.innerHTML = `
            <audio id="${this.container.id}-audio" src="${this.audioSrc}"></audio>
            <div class="aiornot-player-controls">
                <div class="aiornot-player-button" id="${this.container.id}-playPauseBtn">
                    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32" fill="none">
                        <path d="M13.3375 10.8944L21.7598 15.1056C22.4968 15.4741 22.4968 16.5259 21.7598 16.8944L13.3375 21.1056C12.3402 21.6042 11.1667 20.879 11.1667 19.7639V12.2361C11.1667 11.121 12.3402 10.3958 13.3375 10.8944Z" stroke="white"/>
                    </svg>
                </div>
                <div class="aiornot-player-hover-bg"></div>
                <div class="aiornot-player-title">Sample 1</div>
            </div>
            <div id="${this.container.id}-slider" class="aiornot-player-slider">
                <div id="${this.container.id}-progress" class="aiornot-player-progress"></div>
            </div>
        `;

        const audio = document.getElementById(`${this.container.id}-audio`);
        const playPauseBtn = document.getElementById(`${this.container.id}-playPauseBtn`);
        const progressSlider = document.getElementById(`${this.container.id}-slider`);
        const track = document.getElementById(`${this.container.id}-progress`);

        this.audioPlayer = new AudioPlayer(audio, playPauseBtn, progressSlider, track);
    }
}

const player1 = new AudioPlayerContainer('witcher-player', 'https://vgmsite.com/soundtracks/the-witcher-3-wild-hunt-extended-edition/wanswoqf/01.%20The%20Trail.mp3');