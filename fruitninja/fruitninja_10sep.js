// write your codes here
let dojobg;
let fruitgrop;
let fruits=[];

function preload() {
    dojobg=loadImage("assets/dojobackground.png");
    let peach = {
        whole: loadImage("assets/peachwhole.png")
    };
    let melon = {
        whole: loadImage("assets/watermelonwhole.png")
    };
    fruits
}
function setup() {
    createCanvas(800,400);
    background(255);
    world.gravity.y=10;
}
function draw() {
    image(dojobg,0,0,width,height);
}