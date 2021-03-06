export const videoPlayerInit = () => {
    // video-player
    // video-button__play
    // video-button__stop
    // video-time__passed
    // video-progress
    // video-time__total


    //получили элементы с файла index.html
    const videoPlayer = document.querySelector('.video-player');
    const videoButtonPlay = document.querySelector('.video-button__play');
    const videoButtonStop = document.querySelector('.video-button__stop');
    const videoProgress = document.querySelector('.video-progress');
    const videoTimePassed = document.querySelector('.video-time__passed');
    const videoTimeTotal = document.querySelector('.video-time__total');
    const videoVolume = document.querySelector('.video-volume');
    const videoFullScreen = document.querySelector('.video-fullscreen ');

    videoFullScreen.addEventListener('click', () => {
        videoPlayer.webkitEnterFullScreen();
    });

    //смена иконки паузы и воспроизведения
    const toggleIcon = () => {
        if (videoPlayer.paused) {
            videoButtonPlay.classList.remove('fa-pause');
            videoButtonPlay.classList.add('fa-play');
        } else {
            videoButtonPlay.classList.add('fa-pause');
            videoButtonPlay.classList.remove('fa-play');
        }
    }
    //работа плеера по клику
    const togglePlay = () => {
        if (videoPlayer.paused) {
            videoPlayer.play();
        } else {
            videoPlayer.pause();
        }
    };

    const stopPlay = () => {
        videoPlayer.pause();
        //videoPlayer.currentTime = 0;
    }

    
    const addZero = n => n < 10 ? '0' + n : n;



    videoPlayer.addEventListener('click', togglePlay);
    videoButtonPlay.addEventListener('click', togglePlay);

    videoPlayer.addEventListener('play', toggleIcon);
    videoPlayer.addEventListener('pause', toggleIcon);

    videoButtonStop.addEventListener('click', stopPlay);
    

    //настройка отображения dhtvtyb
    videoPlayer.addEventListener('timeupdate', () => {
        const currentTime = videoPlayer.currentTime;
        const durationTime = videoPlayer.duration;

        videoProgress.value = (currentTime / durationTime) * 100;

        let minutePassed = Math.floor(currentTime / 60);
        let secondsPassed = Math.floor(currentTime % 60);

        let minuteTotal = Math.floor(durationTime / 60);
        let secondsTotal = Math.floor(durationTime % 60);

        videoTimePassed.textContent = `${addZero(minutePassed)}:${addZero(secondsPassed)}`;
        videoTimeTotal.textContent = `${addZero(minuteTotal)}:${addZero(secondsTotal)}`;
    });
    

    //перемотка видео ползунком
    videoProgress.addEventListener('change', () => {
        const duration = videoPlayer.duration;
        const value = videoProgress.value;

        videoPlayer.currentTime = (value * duration) / 100;

    });

    // настройка громкости видео
    videoVolume.addEventListener('input', () => {
        videoPlayer.volume = videoVolume.value / 100;
    });

    videoPlayerInit.stop = () => {
        videoPlayer.pause();
        toggleIcon();
    };

};