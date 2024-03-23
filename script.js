"use strict";

const prevBtn = document.getElementById("prev__btn");
const playBtn = document.getElementById("play__btn");
const nextBtn = document.getElementById("next__btn");

const songEl = document.getElementById("song");

const imageEl = document.getElementById("song__image");
const titleEl = document.getElementById("title");
const artistEl = document.getElementById("artist");

const progressContainerEl = document.getElementById("progress-container");
const progressEl = document.getElementById("progress");

const currentTimeEl = document.getElementById("current__time");
const durationEl = document.getElementById("duration");

const playlist = document.getElementById("playlist");

// Data
const songs = [
  {
    name: "glimpse-of-us",
    artist: "Joji",
    title: "Glimpse of Us",
    duration: "3:53",
  },
  {
    name: "fourth-of-july",
    artist: "Sufjan Stevens",
    title: "Fourth of July",
    duration: "4:38",
  },
  {
    name: "indigo-night",
    artist: "Tamino",
    title: "Indigo Night",
    duration: "4:14",
  },
  {
    name: "remembrance",
    artist: "Balmorhea",
    title: "Remembrance",
    duration: "5:59",
  },
  {
    name: "summertime-sadness",
    artist: "Lana del Rey",
    title: "Summertime Sadness",
    duration: "3:25",
  },
  {
    name: "i-know-i-am-not-the-only-one",
    artist: "Sam Smith",
    title: "I Know I'm Not The Only One",
    duration: "3:57",
  },
];

let isPlaying = false;
let songIndex = 0;

const playSong = () => {
  isPlaying = true;
  songEl.play();
  playBtn.innerHTML = '<i class="fa-solid fa-pause"></i>'
}

const pauseSong = () => {
  isPlaying = false;
  songEl.pause();
  playBtn.innerHTML = ' <i class="fa-solid fa-play"></i>'
}

playBtn.addEventListener('click', () => {
  isPlaying ? pauseSong() : playSong()
});

const displaySong = (index) => {
  imageEl.src = `images/${songs[index].name}.jpeg`;
  songEl.src = `audio/${songs[index].name}.mp3`;
  artistEl.textContent = songs[index].name;
  titleEl.textContent = songs[index].title;
}

nextBtn.addEventListener('click', () => {
  songIndex = songIndex === songs.length - 1 ? 0 : songIndex + 1;
  displaySong(songIndex);
  isPlaying ? playSong() : pauseSong();
})

prevBtn.addEventListener('click', () => {
  songIndex = songIndex === 0 ? songs.length - 1 : songIndex - 1;
  displaySong(songIndex);
  isPlaying ? playSong() : pauseSong();
})


songEl.addEventListener("timeupdate", (e) => {
  const { currentTime, duration } = e.target;
  progressEl.style.width = `${(currentTime / duration) * 100}%`

  if (!duration) return;
  const durationMinute = Math.floor(duration / 60);
  const durationSecond = Math.floor(duration % 60);

  const currentMinute = Math.floor(currentTime / 60);
  const currentSecond = Math.floor(currentTime % 60);


  durationEl.innerHTML = `${durationMinute}:${durationSecond}`;
  currentTimeEl.innerHTML = `${currentMinute}:${String(currentSecond).padStart(
    2, 
    "0"
  )}`;

});

