"use strict";
const details = [
  {
    songName: "Dippam Dappam",
    image: "image-1",
    src: "song-1",
    artist: "Anirudh Ravichander, Anthony Daasan",
  },
  {
    songName: "Kaavaalaa",
    image: "image-2",
    src: "song-2",
    artist: "Shilpa Rao, Arunraja Kamaraj",
  },
  {
    songName: "So Baby",
    image: "image-3",
    src: "song-3",
    artist: "Anirudh Ravichander, Ananthakrrishnan",
  },
  {
    songName: "Private Party",
    image: "image-4",
    src: "song-4",
    artist: "Anirudh Ravichander, Jonita Gandhi",
  },
  {
    songName: "Marakkuma Nenjam",
    image: "image-5",
    src: "song-5",
    artist: "A.R. Rahman",
  },
  {
    songName: "Mamakutty",
    image: "image-6",
    src: "song-6",
    artist: "Pradeep Ranganathan, Yuvan Shankar Raja",
  },
  {
    songName: "Machi Open The Bottle",
    image: "image-7",
    src: "song-7",
    artist: "Mano,Premgi Amaran",
  },
];

const whole = document.querySelector(".whole-content"),
  musicImage = whole.querySelector(".songimg"),
  musicSong = whole.querySelector(".mainAudio"),
  musicArtist = whole.querySelector(".singers p"),
  musicName = whole.querySelector(".songname h3"),
  playpausebtn = whole.querySelector(".icon-play"),
  nxtsong = whole.querySelector(".icon-after"),
  prevsong = whole.querySelector(".icon-before"),
  placeholderReal = whole.querySelector(".timer-line"),
  placeholder = whole.querySelector(".timer-line-inside"),
  suffle = whole.querySelector(".icon-suffle"),
  playList = whole.querySelector(".musicplay"),
  container = whole.querySelector(".library-container"),
  wrong = whole.querySelector(".wrong"),
  background = whole.querySelector(".background");

let musicIndex = 1;
let plays = false;
window.addEventListener("load", function () {
  loadMusic(musicIndex);
  currentlyPlaying();
});

const loadMusic = function (musicIndex) {
  musicName.innerHTML = details[musicIndex - 1].songName;
  musicArtist.innerHTML = details[musicIndex - 1].artist;
  musicImage.src = `images/${details[musicIndex - 1].image}.jpg`;
  musicSong.src = `songs/${details[musicIndex - 1].src}.mp3`;
};

// PLAY PAUSE button
let play = false;
playpausebtn.addEventListener("click", function () {
  play ? musicSong.pause() : musicSong.play();

  playpausebtn.innerHTML = `
  <use xlink:href="images/spritess.svg#${
    play === false ? `icon-pause2` : `icon-play3`
  }"></use>
  `;
  play = !play;

  currentlyPlaying();
  console.log(play);
});

// nxtsong function

const playnextSong = function () {
  musicIndex++;
  musicIndex > details.length ? (musicIndex = 1) : (musicIndex = musicIndex);
  loadMusic(musicIndex);
  placeholder.style.width = "0%";
  playpausebtn.innerHTML = `<use xlink:href="images/spritess.svg#icon-pause2"></use>`;
  musicSong.play();
  currentlyPlaying();
  document.querySelector(".icon-heart").style.fill = "black";
  play = !play;
  plays = !plays;
};

nxtsong.addEventListener("click", function () {
  playnextSong();
});

prevsong.addEventListener("click", function () {
  musicIndex--;
  musicIndex === 0 ? (musicIndex = 7) : (musicIndex = musicIndex);
  loadMusic(musicIndex);
  placeholder.style.width = "0%";
  playpausebtn.innerHTML = `<use xlink:href="images/spritess.svg#icon-pause2"></use>`;
  musicSong.play();
  currentlyPlaying();
  document.querySelector(".icon-heart").style.fill = "black";
  play = !play;
  plays = !plays;
});

//fav

function fav() {
  document.querySelector(".icon-heart").addEventListener("click", function () {
    document.querySelector(".icon-heart").style.fill = `${
      plays ? `black` : `red` //
    }`;
    plays = !plays;
    // document.querySelector(".icon-heart").style.fill = "red";
  });
}
fav();

musicSong.addEventListener("timeupdate", function (e) {
  console.log(e);
  const activeTime = e.target.currentTime;
  const durationTime = e.target.duration;
  let width = (activeTime / durationTime) * 100;
  placeholder.style.width = `${width}%`;

  let starting = whole.querySelector(".starting"),
    duration = whole.querySelector(".duration");
  musicSong.addEventListener("loadeddata", function () {
    let fulltime = musicSong.duration;

    let minutes = Math.floor(fulltime / 60);
    let seconds = Math.floor(fulltime % 60);
    if (seconds < 10) seconds = `0${seconds}`;
    duration.innerText = `${minutes}: ${seconds}`;
  });

  let currentMin = Math.floor(activeTime / 60);
  let currentSec = Math.floor(activeTime % 60);
  if (currentSec < 10) {
    currentSec = `0${currentSec}`;
  }
  starting.innerText = `${currentMin}:${currentSec}`;
});

placeholderReal.addEventListener("click", function (e) {
  let consider = placeholderReal.clientWidth;
  let clickoffset = e.offsetX;
  let songduration = musicSong.duration;
  musicSong.currentTime = (clickoffset / consider) * songduration;
});

//playlist

playList.addEventListener("click", function () {
  container.classList.remove("hidden");
  whole.classList.add("overlay");
});
wrong.addEventListener("click", function () {
  container.classList.add("hidden");
  whole.classList.remove("overlay");
});

// dots-btn

let wide = false;
document.querySelector(".icon-dots").addEventListener("click", function () {
  wide = !wide;
  if (wide) {
    document.querySelector(".dots-label").classList.remove("hidden");
    whole.classList.add("overlay");
  } else {
    container.classList.add("hidden");
    whole.classList.remove("overlay");
    document.querySelector(".dots-label").classList.add("hidden");
  }
});

const musiclistsongs = document.querySelector(".lists-song");

//lib

const ultag = whole.querySelector(".songs");
for (let i = 0; i < details.length; i++) {
  let litag = `
  <li class="lists-song" li-index=${i + 1}>
  <div class="listss">
    <span class="song-head"
      >${details[i].songName} - ${details[i].artist}</span
    >
    <span class="songduration" id= "${details[i].src}">1.03</span>
  </div>
  <audio src="songs/${details[i].src}.mp3" class="mainAudio ${
    details[i].src
  }"></audio>
  </li>`;

  ultag.insertAdjacentHTML("beforeend", litag);
  let liAudiodurationnn = ultag.querySelector(`#${details[i].src}`);
  let Audiot = ultag.querySelector(`.${details[i].src}`);
  Audiot.addEventListener("loadeddata", function () {
    let fulltime = Audiot.duration;

    let minutes = Math.floor(fulltime / 60);
    let seconds = Math.floor(fulltime % 60);
    if (seconds < 10) seconds = `0${seconds}`;
    liAudiodurationnn.innerText = `${minutes}: ${seconds}`;

    liAudiodurationnn.setAttribute("s-duration", `${minutes}: ${seconds}`);
  });
}

//click play

const allsongs = ultag.querySelectorAll("li");
function currentlyPlaying() {
  for (let i = 0; i < allsongs.length; i++) {
    let playingTag = allsongs[i].querySelector(".songduration");
    if (allsongs[i].classList.contains("play-color")) {
      allsongs[i].classList.remove("play-color");
      let cas = playingTag.getAttribute("s-duration");
      playingTag.innerText = cas;
    }
    if (allsongs[i].getAttribute("li-index") == musicIndex) {
      allsongs[i].classList.add("play-color");
      playingTag.innerText = "playing";
    }
    allsongs[i].setAttribute("onclick", "clicked(this)");
  }
}

function clicked(ele) {
  let index = ele.getAttribute("li-index");
  musicIndex = index;
  loadMusic(musicIndex);
  musicSong.play();
  currentlyPlaying();
  play = !play;
  playpausebtn.innerHTML = `<use xlink:href="images/spritess.svg#icon-pause2"></use>`;
}

//suffle-button
suffle.addEventListener("click", function () {
  console.log("clicked");

  let innerparts = suffle.innerText;
  switch (innerparts) {
    case "repeat":
      suffle.innerText = "repeat_one";
      suffle.setAttribute("title", "Song looped");
      break;
    case "repeat_one":
      suffle.innerText = "shuffle";
      suffle.setAttribute("title", "Playlist suffle");
      break;
    case "shuffle":
      suffle.innerText = "repeat";
      suffle.setAttribute("title", "Playlist looped");
      break;
  }
});

musicSong.addEventListener("ended", function () {
  let innerparts = suffle.innerText;

  switch (innerparts) {
    case "repeat":
      playnextSong();
      break;
    case "repeat_one":
      musicSong.currentTime = 0;
      loadMusic(musicIndex);
      musicSong.play();
      break;
    case "shuffle":
      let random = Math.floor(Math.random() * details.length + 1);
      do {
        random = Math.floor(Math.random() * details.length + 1);
      } while (musicIndex == random);
      musicIndex = random;
      loadMusic(musicIndex);
      musicSong.play();
      break;
  }
});
