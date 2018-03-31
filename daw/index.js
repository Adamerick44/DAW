let kick,snare,hat,boom808,bpm;
let channels = [];

const loadSound = src => {
  let sound = new Audio();
  sound.src = src;
  return sound;
}

class Channel {
  get checkBoxElms() {
    return Array.from(this.elm.getElementsByTagName('input'));
  }
  constructor(sound,name) {
    this.sound = sound;
    this.name = name;
    this.spot = 1;
    this.elm;
  }
  initElm() {
    let div = document.createElement('div');
    let nameText = document.createElement('strong');
    nameText.innerHTML = this.name;
    div.appendChild(nameText);
    for(let i = 0;i < 32;i++) {
      let boxElm = document.createElement('input');
      boxElm.type = 'checkbox';
      if((i + 1) % 4 === 0) {
        boxElm.style.color = '#FF0000';
      }
      div.appendChild(boxElm);
    }
    this.elm = div;
    document.body.appendChild(div);
  }
  play() {
    let sound = this.sound;
    sound.currentTime = 0;
    if(sound.paused) {
      sound.play();
      return;
    }
    sound.play();
  }
  update() {
    if(this.spot === 32) this.spot = 1;
    else this.spot += 1;
    if(this.checkBoxElms[this.spot - 1].checked){
       this.play();
     }

  }
}

function preload() {
  kick = loadSound('./comps/sounds/kick.wav');
  snare = loadSound('./comps/sounds/snare.wav');
  hat = loadSound('./comps/sounds/hat.wav');
  boom808 = loadSound('./comps/sounds/808.wav');
}

const main = () => {
  init();
  window.setInterval(e => {
    logic();
    render();
  },bpm);
}

const init = () => {
  bpm = 140;
  channels.push(new Channel(kick,'kick'));
  channels.push(new Channel(snare,'snare'));
  channels.push(new Channel(hat,'hat'));
  channels.push(new Channel(boom808,'808'));
  channels.forEach(c => {
    c.initElm();
  });
}

const logic = () => {
  channels.forEach(c => c.update());
}

const render = () => {

}

window.onload = e => {
  preload();
  main();
}
