let digitvar;
let digitimagearray = [];
let score = 6;
function preload() {
    let prefix = "assets/";
    let suffix = ".png";
    let filename = "";
    for (let i=0; i < 10; i++) {
        filename = prefix + i + suffix;
        digitimagearray[i] = loadImage(filename);
    }
}
function setup() {
    new Canvas(400,600);
    background("skyblue");
    digitvar = new Sprite();
    digitvar.collider = "none";

    digitvar.y=50;
    digitvar.width=24;
    digitvar.height=36;
}
function draw() {
    background("skyblue");
    digitvar.img = digitimagearray[score];
}