let capture;

function setup() {
  createCanvas(windowWidth, windowHeight);
  background('#f7d6e0');
  capture = createCapture(VIDEO);
  capture.size(windowWidth * 0.8, windowHeight * 0.8);
  capture.hide();
}

function draw() {
  background('#f7d6e0');
  image(capture, (width - capture.width) / 2, (height - capture.height) / 2);
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  capture.size(windowWidth * 0.8, windowHeight * 0.8);
}
