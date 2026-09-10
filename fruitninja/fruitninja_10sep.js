// write your codes here
let dojobg;

function preload() {
    dojobg=loadImage("assets/dojobackground.png");
}
function setup() {
    createCanvas(600,400);
    background(255);
    world.gravity.y=10;
}
function draw() {
    image(dojobg,0,0,Width,height);
}