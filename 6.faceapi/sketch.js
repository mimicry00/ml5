let faceapi;
let video;
let detections;

// by default all options are set to true
const detectionOptions = {
  withLandmarks: true,
  withDescriptors: false,
};

function setup() {
  createCanvas(640, 480);

  // load up your video
  video = createCapture(VIDEO);
  video.size(width, height);
  video.hide(); 
  
  faceapi = ml5.faceApi(video, detectionOptions, modelReady);
  textAlign(RIGHT);
}

function modelReady() {
  console.log("ready!");
  // console.log(faceapi);
  faceapi.detect(gotResults);
}

function gotResults(err, result) {
  if (err) {
    console.log(err);
    return;
  }
  // console.log(result);
  detections = result;

  faceapi.detect(gotResults);
}

function draw() {
  background(255);
  image(video, 0, 0, width, height);
  if (detections) {
    drawjustBox(detections);
    console.log(detections[0]);
      // drawMosaic(detections);
      // drawLandmarks(detections);
  }  
}

function drawjustBox(detections) {
  for(let i=0; i<detections.length; i++) {
    let alignedRect = detections[i].alignedRect;
    let x = alignedRect._box._x;
    let y = alignedRect._box._y;
    let w = alignedRect._box._width;
    let h = alignedRect._box._height;

    noFill();
    stroke(255, 0, 200);
    strokeWeight(4);
    rect(x, y, w, h);

    let landmarks = detections[i].landmarks.positions;
    for(let j=0; j<landmarks.length; j++) {
      let xx = landmarks[j]._x;
      let yy = landmarks[j]._y;
      fill(0, 255, 0);
      noStroke();
      ellipse(xx, yy, 4, 4);
    }
  }
}


function drawMosaic(detections) {
  for (let i = 0; i < detections.length; i += 1) {
    const alignedRect = detections[i].alignedRect;
    const x = alignedRect._box._x;
    const y = alignedRect._box._y;
    const boxWidth = alignedRect._box._width;
    const boxHeight = alignedRect._box._height;

    let faceimg = video.get(x, y, boxWidth, boxHeight);
    let pg = createGraphics(faceimg.width, faceimg.height);

    faceimg.loadPixels();
    for(let xx=0; xx<faceimg.width; xx+=20) {
      for(let yy=0; yy<faceimg.height; yy+=20) {
        let index = (xx + yy*int(faceimg.width))*4;
        let r = faceimg.pixels[index];
        let g = faceimg.pixels[index+1];
        let b = faceimg.pixels[index+2];
        pg.fill(r, g, b);
        pg.noStroke();
        pg.rect(xx, yy, 20, 20);
      }
    }
    image(pg, x, y);

    noFill();
    stroke(161, 95, 251);
    strokeWeight(2);
    rect(x, y, boxWidth, boxHeight);
  }
}

function drawLandmarks(detections) {
  noFill();
  stroke(161, 95, 251);
  strokeWeight(2);

  let leftear, rightear;

  for (let i = 0; i < detections.length; i += 1) {
    const mouth = detections[i].parts.mouth;
    const nose = detections[i].parts.nose;
    const leftEye = detections[i].parts.leftEye;
    const rightEye = detections[i].parts.rightEye;
    const rightEyeBrow = detections[i].parts.rightEyeBrow;
    const leftEyeBrow = detections[i].parts.leftEyeBrow;

    drawPart(mouth, true);
    drawPart(nose, false);
    drawPart(leftEye, true);
    drawPart(leftEyeBrow, false);
    drawPart(rightEye, true);
    drawPart(rightEyeBrow, false);

    leftear = processEAR(leftEye);
    rightear = processEAR(rightEye);

  }

  noStroke();
  fill(0);
  textSize(20);
  textAlign(LEFT);
  text('LEFT: ', 40, 40)
  text(leftear, 90, 40);

  if(leftear > 0.28) {
    fill(255, 0, 0);
    noStroke();
    ellipse(width, 0, 100);
  }
}

function processEAR(feature) {
  let ear = (dist(feature[1]._x, feature[1]._y, feature[5]._x, feature[5].y) 
          + dist(feature[2]._x, feature[2]._y, feature[4]._x, feature[4].y)) 
          / (dist(feature[0]._x, feature[0]._y, feature[3]._x, feature[3].y)*2);
  

  return ear;
}

function drawPart(feature, closed) {
  beginShape();
  for (let i = 0; i < feature.length; i += 1) {
    const x = feature[i]._x;
    const y = feature[i]._y;
    vertex(x, y);
    noStroke();
    fill(255, 120, 0);
    textSize(12);
    text(i, x, y);
  }


  if (closed === true) {
    endShape(CLOSE);
  } else {
    endShape();
  }
}
