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
 ball.vel.y = 5;

 squar = new Sprite(200,100,100,500);
 squar.color = "blue";
  // End Basic shape testing

   // Create a bouncing ball sprite
   // write your codes here

}

function draw() {
  // write your codes here
  background(250);
}