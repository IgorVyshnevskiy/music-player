const image = document.querySelector('img');
const title = document.getElementById('title');
const artist = document.getElementById('artist');
const music = document.querySelector('audio');
const progressContainer = document.getElementById('progress-container');
const progress = document.getElementById('progress');
const currentTimeEl = document.getElementById('current-time');
const durationEl = document.getElementById('duration');
const prevBtn = document.getElementById('prev');
const playBtn = document.getElementById('play');
const nextBtn = document.getElementById('next');
let isPlaying = false;
let songIndex = 0;

const songs = [
  {
    name: 'Jacinto-1',
    displayName: 'Electric Chill Machine',
    artist: 'Jacinto Design',
  },
  {
    name: 'Jacinto-2',
    displayName: 'Seven Nation Army (Remix)',
    artist: 'Jacinto Design',
  },
  {
    name: 'Jacinto-3',
    displayName: 'Goodnight, Disco Queen',
    artist: 'Jacinto Design',
  },
  {
    name: 'Metric-1',
    displayName: 'Front Row (Remix)',
    artist: 'Metric / Jacinto Design',
  },
];

function playSong() {
  isPlaying = true;
  playBtn.classList.replace('fa-play', 'fa-pause');
  playBtn.setAttribute('title', 'Pause');
  music.play();
}

function pauseSong() {
  isPlaying = false;
  playBtn.classList.replace('fa-pause', 'fa-play');
  playBtn.setAttribute('title', 'Play ');
  music.pause();
}

playBtn.addEventListener('click', () => {
  isPlaying ? pauseSong() : playSong();
});

function loadSong(song) {
  title.textContent = song.displayName;
  artist.textContent = song.artist;
  music.src = `./music/${song.name}.mp3`;
  image.src = `./img/${song.name}.jpg`;
}

function prevSong() {
  songIndex -= 1;
  if (songIndex < 0) {
    songIndex = songs.length - 1;
  }
  loadSong(songs[songIndex]);
  playSong();
}

function nextSong() {
  songIndex += 1;
  if (songIndex > songs.length - 1) {
    songIndex = 0;
  }
  loadSong(songs[songIndex]);
  playSong();
}

loadSong(songs[songIndex]);

function updateProgressBar(e) {
  if (isPlaying) {
    const { duration, currentTime } = e.srcElement;
    const progressPercent = (currentTime / duration) * 100;
    progress.style.width = `${progressPercent}%`;

    const durationMinutes = Math.floor(duration / 60) 
    let durationSeconds = Math.floor(duration % 60)
    if(durationSeconds < 10) {
      durationSeconds = `0${durationSeconds}` 
    }

    if(durationSeconds) {
      durationEl.textContent = `${durationMinutes}:${durationSeconds}`
    }

    const currentMinutes = Math.floor(currentTime / 60) 
    let currentSeconds = Math.floor(currentTime % 60)
    if(currentSeconds < 10) {
      currentSeconds = `0${currentSeconds}` 
    }
    if(currentSeconds) {
      currentTimeEl.textContent = `${currentMinutes}:${currentSeconds}`
    }
  }
}

prevBtn.addEventListener('click', prevSong);
nextBtn.addEventListener('click', nextSong);
music.addEventListener('timeupdate', updateProgressBar);
