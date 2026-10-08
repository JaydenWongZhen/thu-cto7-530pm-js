let dojobg;
function preload() {
    dojobg = loadImage("assets/dojobackground.png");
}

function setup() {
    new Canvas(800,600);
    background(255);
}

function draw() {

    clear();
    image(dojobg,0,0,width,height);

    // drawStartScreen();
}
// function drawStartScreen() {
// fill(0,50);
// rect(0,0,width,height);
// fill("white");
// textSize(60);
// textAlign(CENTER,CENTER);
// text("Fruit Ninja",width/2,height/2);
// textSize(20);
// text("press [SPACE] or [CLICK] to start",width/2,height/2+50);
// }
function drawGameOver() {
    fill(0,50);
    rect(0,0,width,height);
    fill("dark red");
    textSize(75);
    textAlign()
}