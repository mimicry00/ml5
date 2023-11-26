let img;
let video;
let detector;
let detections = [];
let options = { filterBoxesThreshold: 0.01, IOUThreshold: 0.4, classProbThreshold: 0.4 };

function preload() {
  img = loadImage('images/street.jpg');
}

function setup() {
  createCanvas(img.width, img.height);
  // console.log(detector)
  // video = createCapture(VIDEO);
  // video.size(640, 480);
  // video.hide();

  detector = ml5.objectDetector('cocossd', modelReady);
  // detector = ml5.objectDetector('yolo', options, modelReady);
  image(img, 0, 0);
}

function modelReady() {
  console.log("Model is ready!!!");
  detector.detect(img, gotDetections);
}

function gotDetections(error, results) {
  if(error) {
    console.error(error);
    return;
  }
  console.log(results);
  detections = results;
  // detector.detect(img, gotDetections);
}



function draw() {
  image(img, 0, 0);

  for(let i=0; i<detections.length; i++) {
    let object = detections[i];
    stroke(0, 255, 0);
    strokeWeight(4);
    noFill();
    rect(object.x, object.y, object.width, object.height);
    fill(255);
    noStroke();
    textSize(24);
    text(object.label, object.x+10, object.y+20);
    text(nf(object.confidence*100, 2,1)+'%', object.x+10, object.y+50);

  }
}
