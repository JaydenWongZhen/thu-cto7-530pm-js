// the final game
let birt, floor;
let midairbirtflarp, backg, base;
function preload() {
    midairbirtflarp = loadImage("assets/bluebird-midflap.png");
    backg = loadImage("assets/background-day.png");
    base = loadImage("assets/base.png")
}
function setup() {
    new Canvas(400,600);
    background(255);
    birt = new Sprite();
    bird.x = width/2;
    
}
function draw() {
    image(backg,0,0,width,height);
    image(base,0,height-height/4,width,height/4);
}
