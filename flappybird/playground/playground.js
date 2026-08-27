let digitvar;
let digitimagearray = [];
let score = 0;
let scoreGroup;
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
    // digitvar = new Sprite();
    // digitvar.collider = "none";
    // digitvar.y=50;
    // digitvar.width=24;
    // digitvar.height=36;
    scoreGroup = new Group();
    scoreGroup.collider = "none";
}
function draw() {
    background("skyblue");
    // digitvar.img = digitimagearray[score];
    if (kb.presses("up")) {
        score = score +1;
    }
    if (kb.presses("down")) {
        score = score -1;
    }
    if (kb.presses("2")) {
        score = round(random(10,99));
    }
    if (kb.presses("3")) {
        score = round(random(100,999));
    }
    score = constrain(score,0,999);
    textSize = 15;
    fill("blue");
    text("score: " + score,20,20);
    drawScore();
    camera.x += 3;
}
function drawScore() {
    scoreGroup.removeAll();
    let scorestr = str(score);
    let digitvararray = scorestr.split("");
    // print(digitvararray.length);
    // print(digitvararray[0]);
    // print(digitvararray[1]);
    // if (score > 10) {
    //     noLoop();
    // }
    let middle = width/2;
    let offset = 0;
    for (let one of digitvararray) {
        let num = new Sprite();
        num.img = digitimagearray[one];
        num.x = middle + offset;
        num.y = 50;
        num.w = 25;
        num.h = 36;
        offset += 25;
        scoreGroup.add(num);
    }
}
function moveGroup() {

}
