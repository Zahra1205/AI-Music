var score_rightHand
var score_leftHand=0;
var leftHandX=0;
var leftHandY=0;
var rightHandX=0;
var rightHandY=0;
var song="";
var Harry_potter="";
var Peter_pan="";
function preload(){
Harry_potter= loadSound("music.mp3");
Peter_pan= loadSound("music2.mp3");
}
function setup(){
canvas=createCanvas(600, 500);
canvas.center();
video=createCapture(VIDEO);
video.hide();
poseNet=ml5.poseNet(video, modelLoaded);
poseNet.on("pose",gotResults);

}
function modelLoaded(){
    console.log("model is started");
}
function gotResults(results){
if(results.length>0){
    console.log(results);
    leftHandX= results[0].pose.leftWrist.x;
    leftHandY= results[0].pose.leftWrist.y;
    console.log("left hand x = "+leftHandX+" left hand y = "+leftHandY);
    rightHandX=results[0].pose.rightWrist.x;
    rightHandY= results[0].pose.rightWrist.y;
    console.log("right hand x = "+rightHandX+" right hand y = "+ rightHandY);
    score_leftHand= results[0].pose.keypoints[9].score;
    console.log("score of left hand = "+score_leftHand);
    score_rightHand= results[0].pose.keypoints[10].score;
    console.log("score right hand = "+score_rightHand);
}
}
function draw(){
image(video, 0, 0, 600, 500);

stroke("#FF0000");
fill("#FF0000");
Harry_potter.isPlaying();
song.isPlaying();
if(score_rightHand> 0.2){
    circle(rightHandX, rightHandY, 20);
    Peter_pan.stop();
    if(Harry_potter==false){
        Harry_potter.play();
        document.getElementById("song").innerHTML="Song - Harry Potter Theme Song";
    }
}
Peter_pan.isPlaying();
song.isPlaying();
if(score_leftHand>0.2){
    circle(leftHandX, leftHandY, 20);
    Harry_potter.stop();
    if(Peter_pan==false){
        Peter_pan.play();
        document.getElementById("song").innerHTML="Song - Peter Pan Song";
    }
}
}

function stop(){
    audio.stop();
}