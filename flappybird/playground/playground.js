// write your codes here
let birb,floor;
let flapmid,base;
function preload() {
    flapmid = loadImage("assets/bluebird-midflap.png");
    base = loadImage("assets/base.png");
}
function setup() {
    new Canvas(500,700);
    background(255);
    birb = new Sprite(25,25,width/2,height/2,"dynamic");
    birb.img=flapmid;
    floor = new Sprite(width,height/3,0,height-height/3,);

}
function draw() {

}