function setup() {
  // write your codes here
  new Canvas(1000,400);
  background(255);
  // --- Exercise: Area of Triangle ---
  // write your codes here
  let bais = 55;
  let high = 10;
  let areaotringol = bais * high / 2;
  textSize(20);
  text(areaotringol,500,200);
  // --- Exercise: Sum of first 10 even numbers ---
  // write your codes here
  let dih = 0;
  for(let i = 0; i<=20; i+=2) {
    dih = dih + i;
  }
  text(dih,50,50);
  // --- Exercise: Age category classification ---
  // write your codes here
  let age = 10;
if (age >0 && age <2){
  console.log("conifmed age: infant");
}
else if (age < 4){
  console.log("confirmed age group: toddler");
}
else if (age < 13){
  console.log("confirmed age group: child");
}
else if (age < 18){
  console.log("confirmed age group: teenager");
}
else if (age > 19) {
  console.log("confirmed age group: adult")
}
  // --- Exercise: Display odd numbers backward using while loop ---
  // write your codes here

  // --- Exercise: Array operations (groceries) ---
  // write your codes here
}

function draw() {

}