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
spreadEvenContainer.innerHTML = soundContainer

// add DOM
let playJsNames = document.querySelectorAll('#play');
let volumeDownJsNames = document.querySelectorAll('#volume-down');
let audioJsNames = document.querySelectorAll('#audio');
let soundBarJsNames = document.querySelectorAll('#sound-bar');
let volumeUpJsNames = document.querySelectorAll('#volume-up');

// event listener-play sound
playJsNames.forEach((item, index) => {
  item.addEventListener('click', () => {
    if (item.classList.contains('fa-play')) {
      console.log('fa-play')
      item.classList.replace('fa-play', 'fa-pause');
      item.setAttribute('title', 'Pause');
      audioJsNames[index].play();
      audioJsNames[index].loop = true;
    } else {
      item.classList.replace('fa-pause', 'fa-play');
      item.setAttribute('title', 'Play');
      audioJsNames[index].pause();
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

// Sound volume up and down
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