let digitvar;
let digitimagearray = [];
let score = 0;
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
    if (kb.presses("up")) {
        score = score +1;
    }
    if (kb.presses("down")) {
        score = score -1;
    }
    score = constrain(0,9);
    textSize = 15;
    fill("blue");
    text("score: ")
}