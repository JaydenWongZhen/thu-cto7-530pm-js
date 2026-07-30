// the final game
let bird, floor;
let midairbirtflarp, backg, base;
function preload() {
    midairbirtflarp = loadImage("assets/bluebird-midflap.png");
    backg = loadImage("assets/background-day.png");
    base = loadImage("assets/base.png")
}
function setup() {
    new Canvas(400,600);
    background(255);
    bird = new Sprite();
    bird.x = width/2;
    bird.y = 200;
    bird.width = 34;
    bird.height = 30;
    bird.img = midairbirtflarp;
    bird.collider = "dynamic";
    bird.bounciness = 0.77;
    world.gravity.y = 5;
    floor = new Sprite();
    floor.x = 200;
    floor.y= height-20;
    floor.width = 400;
    floor.height = 125;
    floor.collider = "static";
    floor.img = base;

}
function draw() {
    image(backg,0,0,width,height);
    fill("red");
    textSize(15);
    text("bird_sleep: " + bird.sleeping , 20, 40);
    text("velocity: " + round(bird.vel.y) , 20, 60);

    if (kb.presses('space')) {
        bird.sleeping = false;
        bird.vel.y=-5;
    }
    if (mouse.presses()) {
        let b = new Sprite(mouseX,mouseY,10);
        b.collider = "dynamic";
    }
}

