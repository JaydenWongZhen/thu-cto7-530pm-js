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
    birb.bounciness = .1;
    birb.sleep = true;
}
function draw() {
    background("lightblue");
    if (kb.presses("space")) {
        birb.vel.y=-5;
        birb.sleep = false;
    }
     textSize=16;
     fill("red");
     text("birb.sleep: " + birb.sleep , 20,40);
     text('birb.vel.y: ' + birb.vel.y , 20,60);
    text('fr')
}