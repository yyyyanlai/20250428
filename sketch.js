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
  translate((width + capture.width) / 2, 0); // 將畫布原點移到影像右側
  scale(-1, 1); // 水平翻轉
  image(capture, 0, (height - capture.height) / 2); // 繪製影像
  pop();
  
  // 在 overlayGraphics 上繪製內容
  overlayGraphics.clear(); // 清除之前的內容
  overlayGraphics.background(0); // 設定背景為黑色
  
  // 每隔 20 單位繪製方框和圓
  for (let x = 0; x < overlayGraphics.width; x += 20) {
    for (let y = 0; y < overlayGraphics.height; y += 20) {
      let col = capture.get(x, y); // 從 capture 取得顏色
      let g = green(col); // 保留 G 值
      overlayGraphics.fill(0, g, 100); // 設定方框顏色，R 為 0，G 為原值，B 為 100
      overlayGraphics.noStroke();
      overlayGraphics.rect(x + 1, y + 1, 18, 18); // 繪製方框，稍微偏移以避免重疊
      
      overlayGraphics.fill(0); // 設定圓的顏色為黑色
      overlayGraphics.ellipse(x + 10, y + 10, 5, 5); // 在方框中心繪製圓
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
