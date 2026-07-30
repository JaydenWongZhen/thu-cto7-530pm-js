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
    bird.height = 24;
    bird.img = midairbirtflarp;
    bird.collider = "dynamic";
    bird.bounciness = 0.77;
    world.gravity.y = 1;
    floor = new Sprite();
    floor.x = 200;
    floor.y= height-height/4;
    floor.width = 400;
    floor.height = 125;
    floor.collider = "static";
    floor.img = base;

}
function draw() {
    image(backg,0,0,width,height);
    // image(base,0,height-height/4,width,height/4);
}
