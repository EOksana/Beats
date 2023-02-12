let player;
const playBtn = $(".player__start");
const playerContainer = $(".player");

let eventsInit = () => {
    $(playBtn).click(e => {
        e.preventDefault();


        if (playerContainer.hasClass("active")) {
            player.pauseVideo();
        }
        else {
            player.playVideo();
        }
    })
}

$(".player__splash").click(e => {
    player.playVideo();
})

$(".player__duration").click(e => {
    const bar = $(e.currentTarget);
    const clickedPosition = e.originalEvent.layerX;
    const newbuttonPositionPercent = (clickedPosition / bar.width()) * 100;
    const newPlaybackPositionSec = (player.getDuration() / 100) * newbuttonPositionPercent;

    $(".player__playback-button").css({
        left: `${newbuttonPositionPercent}%`
    })

    player.seekTo(newPlaybackPositionSec);
})

const formatTime = timeSec => {
    const roundTime = Math.round(timeSec);

    const minutes = addZero(Math.floor(roundTime / 60));

    const seconds = addZero(roundTime - minutes * 60);

    function addZero(num) {
        return num < 10 ? `0${num}` : num;
    }

    return `${minutes} : ${seconds}`;
}

const onPlayerReady = () => {
    let interval;
    const durationSec = player.getDuration();

    $(".player__time-estimate").text(formatTime(durationSec));

    if (typeof interval !== "undefined") {
        clearInterval(interval);
    }

    interval = setInterval(() => {
        const completedSec = player.getCurrentTime();
        const completedPercent = (completedSec / durationSec) * 100;

        $(".player__playback-button").css({
            left: `${completedPercent}%`
        })
        $(".player__time-completed").text(formatTime(completedSec))
    }, 1000);
}

const onPlayerStateChange = event => {
    /*
   -1 (воспроизведение видео не начато)
   0 (воспроизведение видео завершено)
   1 (воспроизведение)
   2 (пауза)
   3 (буферизация)
   5 (видео подают реплики).
 */
    switch (event.data) {
        case 1:
            playerContainer.addClass("active");
            playerContainer.removeClass("paused");
            break;

        case 2:
            playerContainer.removeClass("active");
            playerContainer.addClass("paused");
            break;
    }
};

setTimeout(() => {
    const volBtn = $(".player__volume-button");
    const posVolBtnPx = volBtn.css("left");
    const posVolBtn = parseInt(posVolBtnPx);
    const volBar = $(".player__volume-line");
    const volBarStyle = getComputedStyle(volBar[0]);
    const volBarWidth = parseInt(volBarStyle.width);

    const posVolumePercent = (posVolBtn / volBarWidth) * 100;
    // console.log(posVolumePercent);
    player.setVolume(posVolumePercent);

    if (!posVolumePercent) {
        $(".player__volume-pic").addClass("muted");
    }

    volBar.on("click", e => {
        e.preventDefault();
        const barVol = $(e.currentTarget);
        const newButtonVolPosition = e.pageX - barVol.offset().left;
        const clickedVolPercent = (newButtonVolPosition / barVol.width()) * 100;

        if (clickedVolPercent < 100) {
            volBtn.css({
                left: `${clickedVolPercent}%`
            });
        } else {
            volBtn.css({
                left: `100%`
            });
        }

        if (!clickedVolPercent) {
            $(".player__volume-pic").addClass("muted");
        } else {
            $(".player__volume-pic").removeClass("muted");
        }

        player.unMute();
        player.setVolume(clickedVolPercent);
    });

    $(".player__volume-pic").on("click", () => {
        if (player.isMuted()) {
            $(".player__volume-pic").removeClass("muted");
            player.unMute();
            volBtn.css({
                left: `${posVolumePercent}%`
            });
            player.setVolume(posVolumePercent);
        } else {
            $(".player__volume-pic").addClass("muted");
            player.mute();
            volBtn.css({
                left: 0
            });
        }
    });
}, 2000);


function onYouTubeIframeAPIReady() {
    player = new YT.Player('yt-player', {
        height: '356',
        width: '100%',
        videoId: 'ho3p5IylqiA',
        events: {
            onReady: onPlayerReady,
            onStateChange: onPlayerStateChange
        },
        playerVars: {
            controls: 0,
            disablekb: 1,
            showinfo: 0,
            rel: 0,
            autoplay: 0,
            modestbranding: 0,
        }
    });
}


eventsInit();