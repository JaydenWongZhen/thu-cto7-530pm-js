// write your codes here
let birb,floor;
let flapmid,base;
function preload() {
    flapmid = loadImage("assets/bluebird-midflap.png");
    base = loadImage("assets/base.png");
}
function setup() {
    new Canvas(400,600);
    background("lightblue");
    birb = new Sprite(width/2,height/2,25,25,"dynamic");
    birb.img=flapmid;
    floor = new Sprite(width/2,height-25,width,125,"static");
    floor.img = base;
    world.gravity.y=5;
    birb.bounciness = 10;
}
function draw() {

}