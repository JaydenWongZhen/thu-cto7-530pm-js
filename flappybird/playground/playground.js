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
    score = constrain(score,0,9.9999e+5);
    textSize = 15;
    fill("blue");
    text("score: " + score,20,20);
    drawScore()
}
function drawScore() {
    let scorestr = str(score);
    let digitvararray = scorestr.split(" ");
    print(digitvararray.length);
    print(digitvararray[0]);
    prin
    if (score > 10) {
        noLoop();
    }
}
function moveGroup() {

}
