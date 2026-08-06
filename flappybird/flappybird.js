// the final game
let bird, floor;
let midairbirdflap, backg, base;
let upbirdflap,downbirdflap;
let pipegroup;
let pipeimg;
let bottompipe, toppipe;
function preload() {
    midairbirdflap = loadImage("assets/bluebird-midflap.png");
    backg = loadImage("assets/background-day.png");
    base = loadImage("assets/base.png");
    downbirdflap = loadImage("assets/bluebird-downflap.png");
    upbirdflap = loadImage("assets/bluebird-upflap.png");
    pipeimg = loadImage("assets/pipe-green.png");
}
function setup() {
    new Canvas(400,600);
    background(255);
    bird = new Sprite();
    bird.x = width/2;
    bird.y = 200;
    bird.width = 30;
    bird.height = 30;
    bird.img = midairbirdflap;
    bird.collider = "dynamic";
    bird.bounciness = 0.5;
    world.gravity.y = 10;
    floor = new Sprite();
    floor.x = 200;
    floor.y= height-20;
    floor.width = 400;
    floor.height = 125;
    floor.collider = "static";
    floor.img = base;
    // bird.vel.x = 1;
    pipegroup = new Group();
}
function draw() {
    image(backg,0,0,width,height);
    fill("red");
    textSize(15);
    text("bird_sleep: " + bird.sleeping , 20, 40);
    text("velocity: " + round(bird.vel.y) , 20, 60);
    text("frameCount: " + frameCount , 20, 80);

    if (kb.presses("space") || mouse.presses()) {
        bird.sleeping = false;
        bird.vel.y=-5;
    }
    // if (mouse.presses()) {
    //     let b = new Sprite(mouseX,mouseY,10);
    //     b.collider = "dynamic";
    // }
    if (bird.vel.y > 2) {
        bird.img = downbirdflap;
        bird.rotation = 45;
    }
    else if (bird.vel.y < -2) {
        bird.img = upbirdflap;
        bird.rotation = -45;
    }
    else {
        bird.img = midairbirdflap;
        bird.rotation = 0;
    }
    if (frameCount%90 === 0) {
        spawnPipePair()
    }    
    for (let p of pipegroup) {
        if(p.x < (bird.x - 200)){
            p.remove();
        }
    }
    //ca,era scroll
    bird.x += 3;
    camera.x = bird.x;
    floor.x = bird.x;
}

function spawnPipePair() {
    let gap = 50;
    let midY=height/2;
    let randY = midY + gap/2 +200;
    bottompipe = new Sprite(bird.x+200,randY,52,320,"static");
    bottompipe.img = pipeimg;
    pipegroup.add(bottompipe);
    
    randY = midY - gap/2 - 200;
    toppipe = new Sprite(400,randY,52,320,"static");
    toppipe.img = pipeimg;
    toppipe.rotation=180;
    pipegroup.add(toppipe);

    pipegroup.layer = 0;

}