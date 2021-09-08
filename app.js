//CAROUSEL

const carousel = [...document.querySelectorAll('.carousel img')];

let carouselImgIndex = 0;

const changeCarousel = () => {
    carousel[carouselImgIndex].classList.toggle('active');
    
    if(carouselImgIndex >= carousel.length -1){
        carouselImgIndex = 0;
    }else{
        carouselImgIndex++;
    }
    
    carousel[carouselImgIndex].classList.toggle('active');
}

setInterval(() => {
    changeCarousel();
}, 3000);

/*
From the code above, you can see we first selected all the carousel element, and toggling the 'active'class after
every 3 seconds
*/


/*=========================================
            NAVIGATION -
    toggling the music player
===========================================*/
const musicPlayerSection = document.querySelector('.music-player-section');

let clickCount = 1;

musicPlayerSection.addEventListener('click', () => {
    // checking for double click manually idk why default double click event is not working with this project.
    //If you know what could be the problem, Kindly let me know please
    
    if(clickCount >= 2) {
        musicPlayerSection.classList.add('active');
        clickCount = 1;
        return;
    }
    clickCount++;
    setTimeout(() => {
        clickCount = 1;
    }, 250);
    
})

//Back Button to Home Screen
const backToHomeBtn = document.querySelector('.music-player-section .back-btn');
backToHomeBtn.addEventListener('click', () => {
    musicPlayerSection.classList.remove('active');
})



//Access Playlist
const playlistSection = document.querySelector('.playlist');
const navBtn = document.querySelector('.music-player-section .nav-btn');

navBtn.addEventListener('click', () => {
    playlistSection.classList.add('active');
})

//Back to music player from playlist
const backToMusicPlayer = document.querySelector('.playlist .back-btn');

backToMusicPlayer.addEventListener('click', () => {
    playlistSection.classList.remove('active')
})


/*============================================================
                        MUSIC
First, let' select all the element that we need, to manipulate this.
=============================================================*/


let currentMusic = 0;

const music = document.querySelector('#audio-source');

const seekBar = document.querySelector('.music-seek-bar');
const songName = document.querySelector('.current-song-name');
const artistName = document.querySelector('.artist-name');
const coverImage = document.querySelector('.cover');
const currentMusicTime = document.querySelector('.current-time');
const musicDuration = document.querySelector('.duration');

const queue = [...document.querySelectorAll('.queue')];


//Now let's select all the buttons
const forwardButton = document.querySelector('i.fa-forward');
const backwardButton = document.querySelector('i.fa-backward');
const playButton = document.querySelector('i.fa-play');
const pauseButton = document.querySelector('i.fa-pause');
const repeatButton = document.querySelector('span.fa-redo');
const volumeButton = document.querySelector('span.fa-volume-up');
const volumeSlider = document.querySelector('.volume-slider');


//Now let's setup the music function
const setMusic = (i) => {
    seekBar.value = 0;
    let song = songs[i];
    currentMusic = i;
    
    music.src = song.path;
    
    songName.innerHTML = song.name;
    artistName.innerHTML = song.aritist;
    coverImage.src = song.cover;
    
    setTimeout(() => {
        seekBar.max = music.duration;
        musicDuration.innerHTML = formatTime(music.duration);
    }, 300);
    currentMusicTime.innerHTML = '00 : 00';
    queue.forEach(item => item.classList.remove('active'));
    queue[currentMusic].classList.add('active');
}

setMusic(0);

//Let's create the 'formatTime()' function we used above in setting the duration
const formatTime = (time) => {
    let min = Math.floor(time / 60);
    if(min < 10){
        min = `0` + min;
    }
    
    let sec = Math.floor(time % 60);
    if(sec < 10){
        sec = `0` + sec;
    }
    
    return `${min} : ${sec}`;
}

//Now, Let's add Play/Pause events

playButton.addEventListener('click', () => {
    music.play();
    playButton.classList.remove('active');
    pauseButton.classList.add('active');
})


pauseButton.addEventListener('click', () => {
    music.pause();
    pauseButton.classList.remove('active');
    playButton.classList.add('active');
})


//Let's code forward and backward even
forwardButton.addEventListener('click', () => {
    if(currentMusic >= songs.length - 1){
        currentMusic = 0;
    }else{
        currentMusic++;
    }
    setMusic(currentMusic);
    playButton.click();
})


backwardButton.addEventListener('click', () => {
    if(currentMusic <= 0){
        currentMusic = songs.length - 1;
    }else{
        currentMusic--;
    }
    setMusic(currentMusic);
    playButton.click();
})


//Let's make 'seek bar' function too
setInterval(() => {
    seekBar.value = music.currentTime;
    currentMusicTime.innerHTML = formatTime(music.currentTime);
    if(Math.floor(music.currentTime) == Math.floor(seekBar.max)){
        if(repeatButton.className.includes('active')){
            setMusic(currentMusic);
            playButton();
        }else{
            forwardButton.click();
        }
    }
}, 500)

seekBar.addEventListener('change', () => {
    music.currentTime = seekBar.value;
})


//Let's create 'repeat' function
repeatButton.addEventListener('click', () => {
    repeatButton.classList.toggle('active');
})

//Let's make volume function too
volumeButton.addEventListener('click', () => {
    volumeButton.classList.toggle('active');
    volumeSlider.classList.toggle('active');
})

volumeSlider.addEventListener('input', () => {
    music.volume = volumeSlider.value;
})

//Let's make our 'playlist' functional too
queue.forEach((item, i) => {
    item.addEventListener('click', () => {
        setMusic(i);
        playButton.click();
    })
})

















