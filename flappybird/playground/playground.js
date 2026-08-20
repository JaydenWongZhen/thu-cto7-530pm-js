let digitvar0, digitimage0;
let score = 0;
function preload() {
 digitimage0 = ("assets/0.png");
}
function setup() {
    new Canvas(400,600);
    background("skyblue");
    digitvar0 = new Sprite();
    digitvar0.collider = "none";
    digitvar0.img = digitimage0;
    digitvar0.y=10;
}
function draw() {

}