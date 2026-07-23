// the final game
let birt, floor;
let midairbirtflarp, background, base;
function preload() {
    midairbirtflarp = loadImage("assets/bluebird-midflap.png");
    background = loadImage("assets/background-day.png");
    base = loadImage("assets/base.png")
}
function setup() {
    new Canvas(400,600);
    background(255);
}
function draw() {
    image(background,0,0,width,height);
    image(base,0,height*3)
}
