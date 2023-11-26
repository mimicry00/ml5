let video;
let poseNet;
let pose;
let skeleton; 

// function preload() {
//   poseNet = ml5.poseNet(video, modelLoaded);
// }

function modelLoaded() {
  console.log('posenet ready...');
}

function gotResults(poses) {
  console.log(poses);
  if(poses.length > 0) {
    pose = poses[0].pose;
    skeleton = poses[0].skeleton;
  }
}

function setup() {
  createCanvas(640, 480);
  video = createCapture(VIDEO);
  video.hide();
  poseNet = ml5.poseNet(video, modelLoaded);
  poseNet.on('pose', gotResults);
}

function draw() {
  image(video, 0, 0);

  if(pose) {
    let eyeR = pose.rightEye;
    let eyeL = pose.leftEye;
    let d = dist(eyeR.x, eyeR.y, eyeL.x, eyeL.y);

    fill(255, 0, 0);
    ellipse(pose.nose.x, pose.nose.y, d);
    fill(0, 0, 255);
    ellipse(pose.leftWrist.x, pose.leftWrist.y, 24);
    ellipse(pose.rightWrist.x, pose.rightWrist.y, 24);

    for(let i=0; i<pose.keypoints.length; i++) {
      fill(0,255,0);
      ellipse(pose.keypoints[i].position.x, pose.keypoints[i].position.y, 16);
    }

    for(let j=0; j<skeleton.length; j++) {
      let a = skeleton[j][0];
      let b = skeleton[j][1];
      strokeWeight(2);
      stroke(255);
      line(a.position.x, a.position.y, b.position.x, b.position.y);
    }
  }


}
