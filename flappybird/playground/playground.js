let digitvar0, digitimagearray = [];
let score = 0;
function preload() {
    let prefix = "assets/";
    let suffix = ".png";
    let filename = ""
}
function setup() {
    new Canvas(400,600);
    background("skyblue");
    digitvar0 = new Sprite();
    digitvar0.collider = "none";
    digitvar0.img = digitimage0;
    digitvar0.y=20;
    digitvar0.width=24;
    digitvar0.height=36;
}
function draw() {

}