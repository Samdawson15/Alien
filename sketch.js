//let bubbleSize = 100
//let bubbleWidth = 200
//let bubbleHeight = 200
//let bubbleImage

//let timer = 0
//let increment = 2

//let s

//function preload (){
  //bubbleImage = loadImage ("bubble.png")
//}

//this function runs once on page load
//function setup() {
  //createCanvas(windowWidth, windowHeight);
  //background(0)
//}

//this function runs repeatedly 60 times a second
//function draw() {
  //timer = timer + increment
  //background(17, 208, 237)
  //imageMode(CENTER)
  //image(bubbleImage, windowWidth/2, timer, bubbleWidth, bubbleHeight)
  //s = second()
  //textSize (50)
  //text(s, 100, 100)

  //noFill()
  //circle(windowWidth/2, windowHeight/2, bubbleSize)
  //bubbleHeight = bubbleHeight + 1
  //bubbleWidth = bubbleWidth + 1
  
  //fill(255,0,0,10)
  //stroke(0,255,255, 50)
  //rectMode(CENTER)

  //fill(0,255,0,100)
  //rect(mouseX, mouseY, 4, 50)

  //fill(255,0,0,100)
  //rect(mouseX, mouseY, 50, 4)

  //fill(0,0,255,100)
  //circle(mouseX, mouseY, 7)
  // Halfing the dimensions to start the line in the centre
  //line(windowWidth/2, windowHeight/2, mouseX, mouseY)
  //triangle (1x, 1y, 2x, 2y, 3x, 3y)
  //triangle(100, 100, mouseX, mouseY, 400, 900)
//}

//function mousePressed() {
  //timer = 0
//}

//function mousePressed() {

//function mousePressed() {
  //bubbleSize = bubbleSize + 30
//}

let gif;
let gifX, gifY, gifW = 800, gifH = 440;

let buttonX, buttonY, buttonW = 100, buttonH = 40;

let assetY = -100;
let falling = false;
let showAbductedText = false;
let stopTime = null;

let newAsset;

let clockHour = 23;
let clockMinute = 0;
let lastMinuteUpdate = 0;

function preload() {
  newAsset = loadImage('UFO.png'); // Your UFO image path
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  background(0);

  gif = createImg('FULLANIMATION.gif');
  gif.size(gifW, gifH);
  gifX = windowWidth / 2 - gifW / 2;
  gifY = windowHeight / 2 - gifH / 2;
  gif.position(gifX, gifY);
  gif.style('border', '4px solid white');
  gif.style('pointer-events', 'none');

  buttonX = windowWidth / 2 - buttonW / 2;
  buttonY = gifY + gifH + 20;

}

function drawPixelBorder(x, y, w, h, thickness = 2, colorFill = 255) {
  fill(colorFill);
  for (let i = x; i < x + w; i += thickness * 2) rect(i, y, thickness, thickness); // Top
  for (let i = x; i < x + w; i += thickness * 2) rect(i, y + h - thickness, thickness, thickness); // Bottom
  for (let i = y; i < y + h; i += thickness * 2) rect(x, i, thickness, thickness); // Left
  for (let i = y; i < y + h; i += thickness * 2) rect(x + w - thickness, i, thickness, thickness); // Right
}

function draw() {
  background(0);

  if (showAbductedText) {
    // Final screen
    fill(255);
    textAlign(CENTER, CENTER);
    textSize(48);
    text("Oops you got abducted", width / 2, height / 2);
    return;
  }

  // Update clock every 60 seconds
  if (millis() - lastMinuteUpdate >= 60000) {
    lastMinuteUpdate = millis();
    clockMinute++;
    if (clockMinute >= 60) {
      clockMinute = 0;
      clockHour++;
      if (clockHour >= 24) clockHour = 0;
    }
  }

  // Draw clock at top-left of gif
  fill(255);
  textAlign(CENTER, CENTER);
  textSize(32);
  let minuteStr = clockMinute < 10 ? '0' + clockMinute : clockMinute;
  let hourStr = clockHour < 10 ? '0' + clockHour : clockHour;
  text(`${hourStr}:${minuteStr}`, gifX + 70, gifY - 30);

  // Draw button
  fill(255);
  rect(buttonX, buttonY, buttonW, buttonH);
  drawPixelBorder(buttonX, buttonY, buttonW, buttonH, 3);
  fill(0);
  textSize(16);
  text("BUTTON", buttonX + buttonW / 2, buttonY + buttonH / 2);

  // UFO position: move 10px right
  let ufoX = windowWidth / 2 - newAsset.width / 2 + 10;
  let targetY = gifY - newAsset.height - 10;

  if (falling) {
    image(newAsset, ufoX, assetY);
    assetY += 2;

    if (assetY >= targetY) {
      assetY = targetY;
      falling = false;
      stopTime = millis(); // record time when UFO stops
    }
  } else if (stopTime !== null) {
    image(newAsset, ufoX, assetY);
    if (millis() - stopTime > 3000) {
      showAbductedText = true;
      gif.hide();  // hide gif to black out screen fully
    }
  }
}

function mousePressed() {
  if (
    mouseX > buttonX &&
    mouseX < buttonX + buttonW &&
    mouseY > buttonY &&
    mouseY < buttonY + buttonH
  ) {
    if (!falling && !showAbductedText && stopTime === null) {
      let elapsedSeconds = floor(millis() / 1000);
      let timeInCycle = elapsedSeconds % 12;

      // Only allow falling if pressed during last 5 seconds of 12-second cycle
      if (timeInCycle >= 7) {  // 7 to 11 inclusive = last 5 seconds of 0-11
        falling = true;
        assetY = -newAsset.height;
      } else {
        // Optional: console.log("Button pressed outside allowed window!");
      }
    }
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  gifX = windowWidth / 2 - gifW / 2;
  gifY = windowHeight / 2 - gifH / 2;
  gif.position(gifX, gifY);
  buttonX = windowWidth / 2 - buttonW / 2;
  buttonY = gifY + gifH + 20;
}













