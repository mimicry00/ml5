
// const classifier = ml5.imageClassifier('MobileNet', ()=> {
//   console.log("model is ready!!!");
// });


let img;
let video;
let classifier;
let label = '';
let confidence = 0;

// function preload() {
//   img = loadImage('images/peacock.jpeg');
// }


function setup() {
  createCanvas(640, 480);
  // image(img, 0, 0);
  video = createCapture(VIDEO);
  video.hide();

  classifier = ml5.imageClassifier('MobileNet', modelReady);

  // classifier.classify(img, (error, results) => {
  //   console.log(results);
  //   textSize(24);
  //   fill(0);
  //   text(results[0].label, 10, 40);
  //   text(results[0].confidence, 10, 70);
  // })
}

function modelReady() {
  console.log("model is ready!!!");
  classifier.classify(video, gotResults);
}

function gotResults(error, results) {
  if (error) {
    console.log(error);
    return;
  }
  console.log(results);
  label = results[0].label;
  confidence = results[0].confidence;

  classifier.classify(video, gotResults);
  // textSize(24);
  // fill(0);
  // text(results[0].label, 10, 40);
  // text(results[0].confidence, 10, 70);  
}

function draw() {
  image(video, 0, 0);

  textSize(24);
  fill(0);
  text(label, 10, 40);
  // text(confidence, 10, 70);  
}
