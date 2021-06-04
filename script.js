const spreadEvenContainer = document.querySelector('.spread-even-container')

// Music
const sounds = [
  {
    name: 'BARMAN_WORKING',
    displayName: 'BARMAN WORKING',
    JsName: 'BarmanWorking',
  },
  {
    name: 'SERVING_DRINKS',
    displayName: 'SERVING DRINKS',
    JsName: 'ServingDrinks',
  },
  {
    name: 'FULL_ROOM',
    displayName: 'FULL ROOM',
    JsName: 'FullRoom',
  },
  {
    name: 'PEOPLE_TALKING',
    displayName: 'PEOPLE TALKING',
    JsName: 'PeopleTalking',
  },
  {
    name: 'STREET_AMBIENCE',
    displayName: 'STREET AMBIENCE',
    JsName: 'StreetAmbience',
  },
  {
    name: 'NIGHT_AMBIENCE',
    displayName: 'NIGHT AMBIENCE',
    JsName: 'NightAmbience',
  },
  {
    name: 'RAIN_ON_WINDOW',
    displayName: 'Rain on Window',
    JsName: 'RainOnWindow',
  },
];

// load song list 
let soundContainer = `<h1>BAR SOUND LIST</h1>`;

sounds.forEach((sound) => {
  soundContainer += `
    <div class="sound-container">
      <div class="sound-name">
        ${sound.displayName}
      </div>
      <div class="sound-bar-container">
        <i class="fas fa-play main-button" id="play" title="Play"></i>
        <i class="fas fa-volume-down" id="volume-down" title="Volume Down"></i>
        <audio id="audio" src="music/${sound.name}.mp3"></audio>
        <input id="sound-bar" class="sound-bar" type="range" min="0" max="100" value="50">
        <i class="fas fa-volume-up" id="volume-up" title="Volume Up"></i>
      </div>
    </div>
  `
})
soundContainer += `
                    <i id="pause-all" class="far fa-pause-circle"></i>
                    <i id="pause-all-disabled" class="far fa-pause-circle disabled"></i>
                  `
spreadEvenContainer.innerHTML = soundContainer

// add DOM
let playJsNames = document.querySelectorAll('#play');
let volumeDownJsNames = document.querySelectorAll('#volume-down');
let audioJsNames = document.querySelectorAll('#audio');
let soundBarJsNames = document.querySelectorAll('#sound-bar');
let volumeUpJsNames = document.querySelectorAll('#volume-up');
let pauseAll = document.getElementById('pause-all');
let pauseAllDisabled = document.getElementById('pause-all-disabled');

// playing song list
let playingList = [];
let playingListAll = [];
let activeSound = 0;
let activeSoundAll = 0;

// event listener-play sound
playJsNames.forEach((item, index) => {
  item.addEventListener('click', () => {
    playingListAll = [];
    activeSoundAll = 0;
    if (item.classList.contains('fa-play')) {
      item.classList.replace('fa-play', 'fa-pause');
      item.setAttribute('title', 'Pause');
      audioJsNames[index].play();
      audioJsNames[index].loop = true;
      // reset last one for all play btn use
      if (activeSound === 0) {
        playingList = []
      };
      playingList.push(index);
      activeSound += 1;
      // delete double index 
      playingList = playingList.filter((element, index, arr) => {
        return arr.indexOf(element) === index;
      });
      pauseAll.classList.replace('fa-play-circle', 'fa-pause-circle');
      pauseOrPlayAllSelected();
    } else if (item.classList.contains('fa-pause')) {
      item.classList.replace('fa-pause', 'fa-play');
      item.setAttribute('title', 'Play');
      audioJsNames[index].pause();
      activeSound -= 1;
      // remove pause sounds only remain the last one for all play btn use
      if (playingList.length > 1) {
        playingList = playingList.filter(item => item !== index);
      } else {
        pauseAll.classList.replace('fa-pause-circle', 'fa-play-circle');
        playingListAll = [...playingList];
      }
      pauseOrPlayAllSelected()
    };
  })
})

// event listener-sound bar
soundBarJsNames.forEach((item, index) => {
  audioJsNames[index].volume = 0.5;
  item.addEventListener('input', () => {
    const soundBarValue = item.value;
    const color = `linear-gradient(90deg, #242323  ${soundBarValue}%, #fff ${soundBarValue}%)`;
    item.style.background = color;
    audioJsNames[index].volume = soundBarValue / 100;
  })
})

// event listener-sound volume up and down
volumeUpJsNames.forEach((item, index) => {
  item.addEventListener('click', () => {
    soundBarJsNames[index].value++;
    const soundBarValue = soundBarJsNames[index].value;
    const color = `linear-gradient(90deg, #242323  ${soundBarValue}%, #fff ${soundBarValue}%)`;
    soundBarJsNames[index].style.background = color;
    audioJsNames[index].volume = soundBarValue / 100;
    console.log(audioJsNames[index].volume)
  })
})

volumeDownJsNames.forEach((item, index) => {
  item.addEventListener('click', () => {
    soundBarJsNames[index].value--;
    const soundBarValue = soundBarJsNames[index].value;
    const color = `linear-gradient(90deg, #242323  ${soundBarValue}%, #fff ${soundBarValue}%)`;
    soundBarJsNames[index].style.background = color;
    audioJsNames[index].volume = soundBarValue / 100;
    console.log(audioJsNames[index].volume)
  })
})

// event listener-Pause all sounds
pauseAll.addEventListener('click', () => {
  if (pauseAll.classList.contains('fa-pause-circle')) {
    playingListAll = [...playingList];
    activeSoundAll = activeSound;
    playingList = [];
    activeSound = 0;
    audioJsNames.forEach((item, index) => {
      audioJsNames[index].pause();
      playJsNames[index].classList.replace('fa-pause', 'fa-play');
      pauseAll.classList.replace('fa-pause-circle', 'fa-play-circle');
    })
  } else if (pauseAll.classList.contains('fa-play-circle')) {
    playingListAll.forEach((item, index) => {
      playingList = [...playingListAll];
      activeSound = activeSoundAll;
      audioJsNames[item].play()
      playJsNames[item].classList.replace('fa-play', 'fa-pause');
      pauseAll.classList.replace('fa-play-circle', 'fa-pause-circle');
    })
  }

})

// Check pause or play all available or not
function pauseOrPlayAllSelected() {
  if (playingList.length === 0) {
    pauseAll.style.display = 'none';
    pauseAllDisabled.style.display = 'block';
  } else {
    pauseAll.style.display = 'block';
    pauseAllDisabled.style.display = 'none';
  }
};
pauseOrPlayAllSelected()

// neon-light
neonLight = document.getElementById('neon-light');
neonText = document.getElementById('neon-text');

setTimeout(function () {
  // neonLight.style.display = 'none';
  // neonLight.style.visibility = 'hidden';
  neonLight.classList.add("hidden");
  neonText.classList.add("text-up");
}, 3000)
