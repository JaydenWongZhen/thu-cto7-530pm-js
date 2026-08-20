// write your codes here
let birb,floor;
let flapmid,base;
let day,night;
let day = true;
function preload() {
    flapmid = loadImage("assets/bluebird-midflap.png");
    base = loadImage("assets/base.png");
    day= loadImage("assets/background-day.png");
    night = loadImage("assets/background-night.png");
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
    if (mouse.presses()) {
        let shitfart = new Sprite(mouseX,mouseY,10);
        shitfart.collider = "dynamic";
    }
    if (day) {
        image();
    }
     textSize=16;
     fill("red");
     text("birb.sleep: " + birb.sleep , 20,40);
     text('birb.vel.y: ' + birb.vel.y , 20,60);
    text('from countr: ' + frameCount, 20,80);
    text("c_height: " + height , 20,100);
    text("c_width: " + width, 20, 120);
}