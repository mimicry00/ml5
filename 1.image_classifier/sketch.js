let classifier;
let img;
let data;
let isdone = false;

function preload() {
  classifier = ml5.imageClassifier('MobileNet', modelReady);
  img = loadImage('images/peacock.jpeg');
}

function modelReady() {
  console.log('model ready...');
  classifier.classify(img, gotResult);
}

function setup() {
  createCanvas(img.width, img.height);
  image(img, 0, 0);
}

function draw() {
  if(isdone === true) {
    let label = data[0].label;
    let conf = nf(data[0].confidence, 1, 2);
    fill(0, 255, 120);
    noStroke();
    textSize(24);
    text(label, 40, 40);
    text(conf, 40, 70);  
  }
}

function gotResult(error, results) {
  if (error) {
    console.error(error);
  } else {
    isdone = true;
    data = results;
    console.log(results);
    // let label = results[0].label;
    // let conf = nf(results[0].confidence, 1, 2);
    // fill(0, 255, 120);
    // noStroke();
    // textSize(24);
    // text(label, 40, 40);
    // text(conf, 40, 70);
    // createDiv(`Label: ${results[0].label}`);
    // createDiv(`Confidence: ${nf(results[0].confidence, 0, 2)}`);
  }
}