let video;
let poseNet;
let poses;

function setup() {
  createCanvas(windowWidth, windowHeight);
  video = createCapture(VIDEO);
  video.hide();

  poseNet = ml5.poseNet(video, modelLoaded);
}

function modelLoaded() {
  poseNet.on('pose', (results) => {
    poses = results;
    console.log(poses);
  });
}


function draw() {
  background(255);
  // image(video, 0, 0);

  if(poses) {
    for(let i=0; i<poses.length; i++) {
      // let keypoints = poses[i].pose.keypoints;
      // for(let j=0; j<keypoints.length; j++) {
      //   let x = keypoints[j].position.x;
      //   let y = keypoints[j].position.y;
      //   fill(0,255, 0);
      //   noStroke();
      //   ellipse(x, y, 8);
      // }

      // let leftShoulder = poses[i].pose.leftShoulder;
      // let leftElbow = poses[i].pose.leftElbow;
      // let leftWrist = poses[i].pose.leftWrist;
      // stroke(0, 0, 255);
      // strokeWeight(24);
      // noFill();
      // line(leftShoulder.x, leftShoulder.y, leftElbow.x, leftElbow.y);
      // stroke(0, 120, 255);
      // line(leftElbow.x, leftElbow.y, leftWrist.x, leftWrist.y);

      let sk = poses[i].skeleton;
      for(let j=0; j<sk.length; j++) {
        let a = sk[j][0];
        let b = sk[j][1];
        let ax = map(a.position.x, 0, video.width, 0, width);
        let ay = map(a.position.y, 0, video.height, 0, height);
        let bx = map(b.position.x, 0, video.width, 0, width);
        let by = map(b.position.y, 0, video.height, 0, height);
        stroke(255, 0, 0);
        strokeWeight(12);
        noFill();
        line(ax, ay, bx, by);
      }
    }

  }
}
