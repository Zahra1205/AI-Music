var leftHandX=0;
var leftHandY=0;
var rightHandX=0;
var rightHandY=0;

var audio="";
function preload(){
audio= loadSound("music.mp3");
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
}
}
function draw(){
image(video, 0, 0, 600, 500);

}
function play(){
    audio.play();
    audio.setVolume(1);
    audio.rate(1);
}
function stop(){
    audio.stop();
}