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
 ball.diameter = 80;
 ball.color = "magenta";
 ball.vel.y = 2;

 squar = new Sprite(150,500,50,50);
 squar.color = "blue";
  // End Basic shape testing

   // Create a bouncing ball sprite
   // write your codes here

}

function draw() {
  // write your codes here
  background(250);
  textSize(25);
  text("happi birthday mom also the rectangle is dad",150,50);
  if (ball.y > 600 || ball.y < 0) {
    ball.vel.y = ball.vel.y * -1;
  }
  if (ball.x > 400 || ball.x < 0) {
    ball.vel.x = ball.vel.x * -1;
  }
    if (squar.y > 600 || squar.y < 0) {
    ball.vel.y = ball.vel.y * -1;
  }
  if (ball.x > 400 || ball.x < 0) {
    ball.vel.x = ball.vel.x * -1;
  }
}