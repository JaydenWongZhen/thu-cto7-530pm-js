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

 squar = new Sprite(150,500,100,50);
 squar.color = "black";
  // End Basic shape testing

   // Create a bouncing ball sprite
   // write your codes here

}

function draw() {
  // write your codes here
  background(250);
  textSize(16);
  text("happi birthday mom");
  if (ball.y > 600 || ball.y < 0) {
    ball.vel.y = ball.vel.y * -1;
  }
  if (ball.x > 400 || ball.x < 0) {
    ball.vel.x = ball.vel.x * -1;
  }
}