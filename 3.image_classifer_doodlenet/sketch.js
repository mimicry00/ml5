let classifier;
let canvas;

let label;
let confidence;

function preload() {
  classifier = ml5.imageClassifier('DoodleNet', modelReady);
}

function modelReady() {
  console.log('model loaded');
}

function setup() {
  canvas = createCanvas(300, 300);
  background(255);

  canvas.mouseReleased(classifyCanvas);

  const button = createButton('Clear Canvas');
  // button.position(7, 44);
  button.mousePressed(clearCanvas);

  label = createDiv('Label: ...');
  confidence = createDiv('Confidence: ...');
}

function clearCanvas() {
  background(255);
}

function draw() {
  strokeWeight(15);
  stroke(0);
  if (mouseIsPressed) {
    line(pmouseX, pmouseY, mouseX, mouseY);
  }
}

function classifyCanvas() {
  classifier.classify(canvas, gotResult);
}

function gotResult(error, results) {
  if (error) {
    console.error(error);
  }

  console.log(results);
  label.html('Label:' + results[0].label);
  confidence.html('Confidence:' + nf(results[0].confidence, 0, 2)); // Round the confidence to 0.01
}