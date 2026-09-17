// write your codes here
let dojobg;
let fruitgrop;
let fruits=[];

function preload() {
    dojobg=loadImage("assets/dojobackground.png");
    let peach = {
        whole: loadImage("assets/peachwhole.png"),
        Lhalf: loadImage("assets/peachhalf.png"),
        Rhalf: loadImage("assets/peachhalf2.png"),
        half: loadImage("assets/peachsplash.png")
    };
    let melon = {
        whole: loadImage("assets/watermelonwhole.png"),
        Lhalf: loadImage("assets/watermelonhalf.png"),
        Rhalf: loadImage("assets/watermelonhalf.png"),
        half: loadImage("assets/watermelonsplash.png")
    };
    fruits=[peach,melon];
}
function setup() {
    createCanvas(800,400);
    background(255);
    world.gravity.y=10;
    fruitgrop = new Group();
}
function draw() {
    image(dojobg,0,0,width,height);
    if (frameCount%120 === 0) {
    spawnFruit();
}
}
function spawnFruit() {
    fruit = new Sprite(width/2,400);
    let fruitvariation=random(fruits);
    fruit.diameter=35;
    fruit.vel.y=-10;
    fruit.vel.x=random(-5,5);
    fruit.img=fruitvariation.whole;
    fruitgrop.add(fruit);
}