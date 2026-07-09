let ball;
let squar;
function setup() {
  // Set up the canvas
  new Canvas(400, 600);
  background(250); //background color

  // Basic shape testing
  // write your codes here
 ball =new Sprite();
 ball.y = 50;
 ball.diameter = 80;
 ball.color = "magenta";
 ball.vel.y = 2;

 squar = new Sprite(100,500,100,50);
 squar.color = "blue";
  // End Basic shape testing

   // Create a bouncing ball sprite
   // write your codes here

}

function draw() {
  // write your codes here
  background(250);
  textSize(16);
  text('ball:'+ round(ball.x) + "," + round(ball.y),20,50);
  if (ball.y > 575 || ball.y < 25 || ball.x < 375 || ball.x > 25) {
    ball.vel.y = ball.vel.y * -1
  }
}