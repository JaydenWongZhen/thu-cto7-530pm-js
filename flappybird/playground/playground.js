let digitvar, digitimagearray = [];
let score = 0;
function preload() {
    let prefix = "assets/";
    let suffix = ".png";
    let filename = "";
    for (let i=0; i <= 10; i++) {
        filename = prefix + i + suffix;
        digit
    }
}
function setup() {
    new Canvas(400,600);
    background("skyblue");
    digitvar = new Sprite();
    digitvar.collider = "none";
    digitvar.img = digitimage0;
    digitvar.y=20;
    digitvar.width=24;
    digitvar.height=36;
}
function draw() {

}