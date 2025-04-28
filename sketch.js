let capture;
let overlayGraphics;

function setup() {
  createCanvas(windowWidth, windowHeight);
  background('#f7d6e0');
  
  // 初始化攝影機
  capture = createCapture(VIDEO);
  capture.size(windowWidth * 0.8, windowHeight * 0.8);
  capture.hide();
  
  // 建立與攝影機畫面相同大小的圖形緩衝區
  overlayGraphics = createGraphics(capture.width, capture.height);
  overlayGraphics.clear(); // 確保背景透明
}

function draw() {
  background('#f7d6e0');
  
  // 翻轉影像
  push();
  translate(width, 0); // 將畫布原點移到右上角
  scale(-1, 1); // 水平翻轉
  image(capture, (width - capture.width) / 2, (height - capture.height) / 2);
  pop();
  
  // 在 overlayGraphics 上繪製內容
  overlayGraphics.clear(); // 清除之前的內容
  overlayGraphics.fill(255, 0, 0, 150); // 半透明紅色
  overlayGraphics.noStroke();
  overlayGraphics.rect(0, 0, overlayGraphics.width, overlayGraphics.height); // 畫一個與影像大小相同的矩形
  
  // 顯示文字
  overlayGraphics.textAlign(CENTER, CENTER);
  overlayGraphics.textSize(32);
  overlayGraphics.fill(0); // 黑色文字
  overlayGraphics.text("這是我的影像", overlayGraphics.width / 2, overlayGraphics.height / 2);
  
  // 將 overlayGraphics 顯示在視訊上方
  image(overlayGraphics, (width - capture.width) / 2, (height - capture.height) / 2);
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  capture.size(windowWidth * 0.8, windowHeight * 0.8);
  overlayGraphics = createGraphics(capture.width, capture.height); // 重新調整 overlayGraphics
  overlayGraphics.clear();
}
