// write your codes here
let dojobg;
let fruitgrop;
let fruits=[];
let mydebug = true;
let score = 0;
let fruit_half;
let miss;
function preload() {
    dojobg=loadImage("assets/dojobackground.png");
    let peach = {
        whole: loadImage("assets/peachwhole.png"),
        Lhalf: loadImage("assets/peachhalf.png"),
        Rhalf: loadImage("assets/peachhalf2.png"),
        sploing: loadImage("assets/peachsplash.png")
    };
    let melon = {
        whole: loadImage("assets/watermelonwhole.png"),
        Lhalf: loadImage("assets/watermelonhalf.png"),
        Rhalf: loadImage("assets/watermelonhalf.png"),
        sploing: loadImage("assets/watermelonsplash.png")
    };
    fruits=[peach,melon];
}
function setup() {
    createCanvas(800,400);
    background(255);
    world.gravity.y=10;
    fruitgrop = new Group();
    fruit_half = new Group();
}
function draw() {
    image(dojobg,0,0,width,height);
    if (frameCount%120 === 0) {
    spawnFruit();
    }
    if (kb.presses("1")) {
    
        mydebug=!mydebug;
        
    }
    if (mouse.pressing()) {
        noStroke();
        let swoontrail = new Sprite(mouseX,mouseY,10);
        swoontrail.color="#FFFFFF";
        swoontrail.stroke="#FFFFFF"
        swoontrail.collider="none";
        swoontrail.life=20;
    }
        sliceFruit();
    }
    textSize(10);
    textAlign(CENTER,CENTER);
    text("score: " + score,10,5);


// function with parameters
function splitFruit(xpos, ypos, fruits) {
    // spawn left half
    let leftslice = new Sprite(xpos-10, ypos, 35);
    leftslice.img = fruits.Lhalf;
    leftslice.vel.x = -3; // veer left
    leftslice.vel.y = random(-5, -2);
    leftslice.rotationSpeed = -5;
    leftslice.life = 60; // 30 frames so half a second

    fruit_half.add(leftslice); // add to group

    // you do spawn right half
    let rightslice = new Sprite(xpos+10, ypos, 35);
    rightslice.img = fruits.Rhalf;
    rightslice.vel.x = 3; // veer left
    rightslice.vel.y = random(-5, -2);
    rightslice.rotationSpeed = 5;
    rightslice.life = 60; // 30 frames so half a second

    fruit_half.add(rightslice); // add to group
}

// cut the fruit using the mouse pressed (or dragged across the canvas)
function sliceFruit() {
    for (let fruit of fruitgrop) {
        // fruit.sliced is a custom property
        if (fruit.sliced) {
            continue; // skip this one, continue next member in the loop
        }

        // dist(): calculate distance
        let distofmouse = dist(mouse.x, mouse.y, fruit.x, fruit.y); // is this fruit near the mouse pointer?
        let hitboxradius = fruit.diameter/2 + 5;

        if (distofmouse < hitboxradius) {
            fruit.sliced = true; // i am slicing this one

            const fx = fruit.x; // remember
            const fy = fruit.y; // remember

            fruit.remove(); // whole fruit is gone

            // call our new function using 3 parameters
            splitFruit( fx, fy, fruit.type );

            score++;

            break; // cut one fruit a time per function call
        } // condition
    } // loop to close
}

function spawnFruit() {
    fruit = new Sprite(random(200,600),400);
    let fruitvariation=random(fruits);
    fruit.diameter=35;
    fruit.vel.y=-10;
    fruit.vel.x=random(-5,5);
    fruit.img=fruitvariation.whole;
    fruitgrop.add(fruit);
    fruit.type=fruitvariation;
    fruit.friction=2;
    fruit.debug = mydebug;
}