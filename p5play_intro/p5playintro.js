let ball;
let squar;
function setup() {
  // Set up the canvas
  new Canvas(400, 600);
  background(250); //background color

  // Basic shape testing
  // write your codes here
 ball =new Sprite();
 ball.y = 100;
 ball.diameter = 50;
 ball.color = "magenta";
 ball.vel.y = 5;

 squar = new Sprite(150,500,50,50);
 squar.color = "blue";
 squar.vel.x = 5;
 squar.vel.y = 5;
  // End Basic shape testing
//happy birthday mom
   // Create a bouncing ball sprite
   // write your codes here

}

function draw() {
  // write your codes here
  background(250);
  textSize(25);
  text("happi birthday mom",50,50);
  text("the square is dad btw",50,100)
  if (ball.y > 600 || ball.y < 0) {
    ball.vel.y = ball.vel.y * -1;
  }
  if (ball.x > 400 || ball.x < 0) {
    ball.vel.x = ball.vel.x * -1;
  }
    if (squar.y > 600 || squar.y < 0) {
    squar.vel.y = squar.vel.y * -1;
  }
  if (squar.x > 400 || squar.x < 0) {
    squar.vel.x = squar.vel.x * -1;
  }
}