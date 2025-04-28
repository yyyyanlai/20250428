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
  overlayGraphics.background(0); // 設定背景為黑色
  
  // 每隔 20 單位繪製圓
  for (let x = 0; x < overlayGraphics.width; x += 20) {
    for (let y = 0; y < overlayGraphics.height; y += 20) {
      let col = capture.get(x, y); // 從 capture 取得顏色
      let gray = (red(col) + green(col) + blue(col)) / 3; // 計算灰階值
      overlayGraphics.fill(gray); // 設定圓的顏色為灰階值
      overlayGraphics.noStroke();
      overlayGraphics.ellipse(x + 10, y + 10, 15, 15); // 繪製圓，中心點偏移 10
    }
  }
  
  // 將 overlayGraphics 顯示在視訊上方
  image(overlayGraphics, (width - capture.width) / 2, (height - capture.height) / 2);
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  capture.size(windowWidth * 0.8, windowHeight * 0.8);
  overlayGraphics = createGraphics(capture.width, capture.height); // 重新調整 overlayGraphics
  overlayGraphics.clear();
}
