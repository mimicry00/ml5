let video;
let handpose;
let predictions;

function setup() {
  createCanvas(640, 480);

  // load up your video
  video = createCapture(VIDEO);
  video.size(width, height);
  video.hide(); 

  handpose = ml5.handpose(video, modelLoaded);
}

function modelLoaded() {
  handpose.on('hand', results => {
    predictions = results;
    console.log(predictions);
  });
}

function draw() {
  // background(220);
  image(video, 0, 0);

  if(predictions) {
    for(let i=0; i<predictions.length; i++) {
      let box = predictions[i].boundingBox;
      let topLeft = box.topLeft;
      let bottomRight = box.bottomRight;
      let x = topLeft[0];
      let y = topLeft[1];
      let w = bottomRight[0] - topLeft[0];
      let h = bottomRight[1] - topLeft[1];
      noFill();
      stroke(255, 0, 0);
      strokeWeight(4);
      rect(x, y, w, h);

      let landmarks = predictions[i].landmarks;
      for(let j=0; j<landmarks.length; j++) {
        let xx = landmarks[j][0];
        let yy = landmarks[j][1];
        noStroke();
        fill(0, 255, 0);
        ellipse(xx, yy, 8);
      }

      let indexfinger = predictions[i].annotations.indexFinger;
      for(let k=0; k<indexfinger.length; k++) {
        let xx = indexfinger[k][0];
        let yy = indexfinger[k][1];
        noStroke();
        fill(0, 0, 255);
        ellipse(xx, yy, 8);
      }
    }
  }
}
