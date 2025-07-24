const sounds = {
  w: "./sounds/tom-1.mp3",
  a: "./sounds/tom-2.mp3",
  s: "./sounds/tom-3.mp3",
  d: "./sounds/tom-4.mp3",
  j: "./sounds/snare.mp3",
  k: "./sounds/crash.mp3",
  l: "./sounds/kick-bass.mp3"
}

const names = {
  w: "Tom 1",
  a: "Tom 2",
  s: "Tom 3",
  d: "Tom 4",
  j: "Snare",
  k: "Crash",
  l: "Kick Bass"
};

let timer;
let volume = 0.5;
const volSlider = document.getElementById("volume");

volSlider.value = volume;

volSlider.addEventListener("input",e=>{
  volume = parseFloat(e.target.value)
})

function play(key){
  key = key.toLowerCase();
  const src = sounds[key];
  if(!src) return;
  const audio = new Audio(src);
  audio.volume = volume;
  audio.play();
}

function updateNowPlaying(key){
  const pl = document.getElementById("playing");
  const name = names[key.toLowerCase()];
  if(!name) return;
  pl.textContent = `Now playing: ${name}`;
  pl.style.opacity = 1;
  clearTimeout(timer);
  setTimeout(() => pl.style.opacity = .4 ,400);
  timer=setTimeout(()=> {
    pl.textContent ="";
  },2000)
}

//Detect button

document.querySelectorAll(".drum").forEach((btn) => {
  btn.addEventListener("click", function(){
    const key = this.querySelector(".key").textContent.toLowerCase();
    play(key);
    updateNowPlaying(key);
    buttonAnimation(key);
  });
});
//Detect keyboard

document.addEventListener("keydown", (e) => {
  play(e.key);
  updateNowPlaying(e.key);
  buttonAnimation(e.key);
});



function buttonAnimation(currentKey){
    var activeButton = document.querySelector("." + currentKey);
    if(!activeButton) return;
    activeButton.classList.add("pressed");
    setTimeout (function(){
        activeButton.classList.remove("pressed");
    },100);
}

