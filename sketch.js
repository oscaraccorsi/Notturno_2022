let baseURLSound = 'https://oscaraccorsi.github.io/mp3_files/';
let baseURLImage = 'https://oscaraccorsi.github.io/pictures/';
const vol = new Tone.Volume(0).toDestination();
const pingPong = new Tone.PingPongDelay("2n", 0.2).connect(vol);
let value;
let img;
let pointillizeX, pointillizeY ;
let frames;

let hei = [1, 2, 3, 5, 8, 13, 21, 34, 55, 89];

function preload() {
  multiPlayer = new Tone.Players({ 
    acuti: baseURLSound + "acuti.mp3"
  }).chain(pingPong, vol);
  img = loadImage(baseURLImage + 'me.png');
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  background(0);
  setInterval(reStart, 1000*300);
  frames = round(random(1, 60));
  frameRate(frames);
  
  imageMode(CORNER);
  noStroke();
  img.resize(windowWidth, windowHeight);
  img.loadPixels();
  pointillizeX = random(hei);
  pointillizeY = random(hei);
  console.log(frames);
  
  acuti = multiPlayer.player("acuti");
  acuti.autostart = true;
  acuti.loop = true;
}

function draw() {
  
  let x = floor(random(img.width));
  let y = floor(random(img.height));
  let pix = img.get(x, y);
  fill(pix, 50 );
  rect(x, y, pointillizeX, pointillizeY, 2);
  
}
function reStart() {
  background(0);
  pointillizeX = random(hei);
  pointillizeY = random(hei);
  frames = round(random(1, 60));
  frameRate(frames);
}

function keyPressed() {
  if (keyCode === ESCAPE ) {
    background(0); 
  }
  if (keyCode === 32 ) {
    background(0);
    pointillizeX = random(hei);
    pointillizeY = random(hei);
    frames = round(random(1, 60));
    frameRate(frames);
  }
  if (keyCode === RIGHT_ARROW) {
    frames++; 
    frameRate(frames);
  }
  if (keyCode === LEFT_ARROW) {
    frames--;
    frameRate(frames);
  }
}
//-----------------------------------mouseClick
function mouseClicked() {
  if (value === 0) {
    vol.mute = true;
    value = 1;
  } 
  else {
    vol.mute = false;
    value = 0;
  }  
}
