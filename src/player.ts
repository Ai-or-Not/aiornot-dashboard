import { AudioPlayerContainer, PlayerManager } from './audio';
import { initAudio } from './dashboard';

initAudio();

const manager = new PlayerManager([
    new AudioPlayerContainer(
        'audio-sample-1',
        'https://vgmsite.com/soundtracks/the-witcher-3-wild-hunt-extended-edition/wanswoqf/01.%20The%20Trail.mp3'
    ),
    new AudioPlayerContainer(
        'audio-sample-2',
        'https://vgmsite.com/soundtracks/the-witcher-3-wild-hunt-extended-edition/wanswoqf/01.%20The%20Trail.mp3'
    ),
    new AudioPlayerContainer(
        'audio-sample-3',
        'https://vgmsite.com/soundtracks/the-witcher-3-wild-hunt-extended-edition/wanswoqf/01.%20The%20Trail.mp3'
    ),
    new AudioPlayerContainer(
        'audio-sample-4',
        'https://vgmsite.com/soundtracks/the-witcher-3-wild-hunt-extended-edition/wanswoqf/01.%20The%20Trail.mp3'
    ),
    new AudioPlayerContainer(
        'audio-sample-5',
        'https://vgmsite.com/soundtracks/the-witcher-3-wild-hunt-extended-edition/wanswoqf/01.%20The%20Trail.mp3'
    ),
    new AudioPlayerContainer(
        'audio-sample-6',
        'https://vgmsite.com/soundtracks/the-witcher-3-wild-hunt-extended-edition/wanswoqf/01.%20The%20Trail.mp3'
    ),
]);
