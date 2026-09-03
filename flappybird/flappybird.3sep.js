// the final game
let bird, floor;
let midairbirdflap, backg, base;
let upbirdflap,downbirdflap;
let pipegroup;
let pipeimg;
let bottompipe, toppipe;
let gameoverimg, startmessageimg;
let startgam = false;
let digitvar;
let digitimagearray = [];
let score = 0;
let scoreGroup;
let diesfx,pointsfx,flapsfx;
function preload() {
    midairbirdflap = loadImage("assets/bluebird-midflap.png");
    backg = loadImage("assets/background-day.png");
    base = loadImage("assets/base.png");
    downbirdflap = loadImage("assets/bluebird-downflap.png");
    upbirdflap = loadImage("assets/bluebird-upflap.png");
    pipeimg = loadImage("assets/pipe-green.png");
    gameoverimg = loadImage("assets/gameover.png");
    startmessageimg = loadImage("assets/message.png");
    let prefix = "assets/";
    let suffix = ".png";
    let filename = "";
    for (let i=0; i < 10; i++) {
        filename = prefix + i + suffix;
        digitimagearray[i] = loadImage(filename);
    }
    diesfx = createAudio("assets")
}
function setup() {
    new Canvas(400,600);
    background(255);
    bird = new Sprite();
    bird.x = width/2;
    bird.y = 200;
    bird.width = 25;
    bird.height = 25;
    bird.img = midairbirdflap;
    bird.collider = "dynamic";
    bird.bounciness = 0.5;
    world.gravity.y = 10;
    floor = new Sprite();
    floor.x = 200;
    floor.y= height-20;
    floor.width = 400;
    floor.height = 125;
    floor.collider = "static";
    floor.img = base;
    // bird.vel.x = 1;
    pipegroup = new Group();

    startmessage = new Sprite(width/2,height/2,50,50,"none");
    startmessage.img = startmessageimg;
    bird.collider = "static";
    bird.visible = false;
    scoreGroup = new Group();
    scoreGroup.collider = "none";
}
function draw() {
    image(backg,0,0,width,height);
    fill("red");
    textSize(15);
    text("bird_sleep: " + bird.sleeping , 20, 40);
    text("velocity: " + round(bird.vel.y) , 20, 60);
    text("frameCount: " + frameCount , 20, 80);
    text("pipenumber: " + pipegroup.length, 20, 100);

    if (kb.presses("space") || mouse.presses()) {
        startgam = true;
        bird.visible = true;
        startmessage.visible=false;

        bird.visible = true;
        bird.collider = 'dynamic';
    }

    if (!startgam) {
        return;
    }
    
    if (kb.presses("space") || mouse.presses()) {
        bird.sleeping = false;
        bird.vel.y=-5;
    }
    // if (mouse.presses()) {
    //     let b = new Sprite(mouseX,mouseY,10);
    //     b.collider = "dynamic";
    // }
    if (bird.vel.y > 2) {
        bird.img = downbirdflap;
        bird.rotation = 45;
    }
    else if (bird.vel.y < -2) {
        bird.img = upbirdflap;
        bird.rotation = -45;
    }
    else {
        bird.img = midairbirdflap;
        bird.rotation = 0;
    }
    if (frameCount%90 === 0) {
        spawnPipePair()
    }    
    for (let p of pipegroup) {
        if(p.x < (bird.x - 200)){
            p.remove();
        }
    }
    //ca,era scroll
    bird.x += 3;
    camera.x = bird.x;
    floor.x = bird.x;
    //colison
    if (bird.collides(floor) || bird.collides(pipegroup) || bird.y < 0) {
        gameover = new Sprite(bird.x,250,300,50,"none");
        gameover.img=gameoverimg;
        gameover.layer = 100;
        noLoop();
    }
    for (let p of pipegroup) {
        let pipeRightEdge = p.x + p.w/2;
        let birdLeftEdge = bird.x - bird.w/2;

        if (p.passed === false) {
            if (pipeRightEdge < birdLeftEdge) {
                p.passed = true;
                score++;
            }
        }
    }
    drawScore();
}

function spawnPipePair() {
    let gap = 75;
    let midY=random(150,350);
    let randY = midY + gap/2 +200;
    bottompipe = new Sprite(bird.x+400,randY,52,320,"static");
    bottompipe.img = pipeimg;
    pipegroup.add(bottompipe);
    
    randY = midY - gap/2 - 200;
    toppipe = new Sprite(bird.x+400,randY,52,320,"static");
    toppipe.img = pipeimg;
    toppipe.rotation=180;
    toppipe.passed = false;

    pipegroup.add(toppipe);

    pipegroup.layer = 0;

}
function drawScore() {
    scoreGroup.removeAll();
    let scorestr = str(score);
    let digitvararray = scorestr.split("");
    let middle = camera.x;
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
        scoreGroup.layer = 1000;
        scoreGroup.collider = "none";
    }
    moveGroup();
}
function moveGroup() {
    let count = scoreGroup.length;
    let fullwidth = count * 25;
    let centerScoreGroup = fullwidth/2;
    let centerSingle = 25/2;
    let difference = centerScoreGroup - centerSingle;
    for (let one of scoreGroup) {
        one.x = one.x - difference;
    }
} 
