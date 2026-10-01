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
}
function drawStartScreen() {
FileList()
textSize(30);
textAlign(CENTER,CENTER);
}