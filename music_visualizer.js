// variables
let firstRun = true;
let dancingImg = [];
let dancer;
let randX = []; 
let randY = [];
let randSize = [];
let randMusicX = [];
let randMusicY = [];

// vocal, drum, bass, and other are volumes ranging from 0 to 100
function draw_one_frame(vocal, drum, bass, other, counter) {
  // setting the scene
  randomSeed(9); // for the dancers
  rectMode(CENTER);
  noStroke();
  noFill();
  let seconds = counter/60; 
  // array of thematic colours 
  let backgroundColors = [color('#593522'), color('#894E29'), color('#C05D2A'), color('#EB6416'), color('#EE8A1C'), 
  color('#EFA63E'), color('#F2C759'), color('#F3DFAB')];
  
  // setting random variables into the arrays 
  for (let i = 0; i < 50; i++){
    randX[i] = random(0, width);
    randY[i] = random(0, height);
    randSize[i] = random(0, 50);
    randMusicX[i] = random(0, 1250);
    randMusicY[i] = random(500, 550);
  }

  // loading images for dancing couple 
  if(firstRun){
    for (let i  = 0; i < 11; i++){
      dancingImg[10-i] = loadImage('dancing_couple' + i + '.png'); // i did 10-i so she didn't dance the wrong way 
    }
    firstRun = false;
  }

  // background design 70s theme yay
  let backgroundHeight = 2000;
  let backgroundWidth = width+550;
  let colourPickVar = 0;
  let lineSize = 50;
  for (let i = 0; i < 36; i++){ // making heaps of arcs 
    if(colourPickVar == 8){
      colourPickVar = 0;
    }
    fill(backgroundColors[colourPickVar]); // filling it with a series of 8 thematic colours 
    arc(width/2, 0, backgroundWidth - i*lineSize, backgroundHeight-i*lineSize, 0, 180, OPEN); 

    colourPickVar++;
  }

  // dancing tile floor
  fill(97, 65, 36, 100); // brown themed colour
  rect(0, 670, 2600, 400);
 if (drum < 50){
  fill(242, 199, 89, 100) // light yellow colour
  quad(0, height, 380, height, 500, height-150, 200, height-150); // bottom left
  quad(500, height-150, 880, height-150, 800, height-250, 600, height-250); // center
  quad(880, height-150, 1200, height-150,  width+100, height, 1000, height); // bottom right
  quad(1200, height-150, 1600, height-150, width+100, height-250, 1070, height-250); // top right
  quad(-100, height-150, 200, height-150, 330, height-250, 50, height-250); // top left 
 }

  // disco ball 
  fill(242, 199, 89, 200);
  var discoSize = map(drum, 0, 100, 100, 200, true);
  ellipse(640, 0+discoSize/4, discoSize, 200);

  // lights 
  if (seconds > 10 && seconds < 168){
    fill(243, 223, 171, 100);
    triangle(width/2, 0, 10, height, 150, height);
    triangle(width/2, 0, 300, height-150, 450, height-150);
    arc(375, height-150, 150, 90, 0, 180, OPEN); // arcs making them look realistic 
    triangle(width/2, 0, 750, height-150, 900, height-150);
    arc(825, height-150, 150, 90, 0, 180, OPEN);
    triangle(width/2, 0, 1000, height, width-50, height);
  }

 // heart sparkles
  let pulse = map(bass, 0, 100, 50, 255, true)
  fill(243, 223, 171, pulse);
  for (let i = 0; i < 50; i++){
    if (seconds > 134 && seconds < 168){ // if its at the end of the song, make it pulse the text together
      textSize(randSize[i]+pulse/10);
      text('together', randX[i], randY[i])
    }
    else{
      heart(randX[i], randY[i], randSize[i]); // otherwise hearts 
    }
  }

 // music notes and different drawings following the dancers at different times 
  let boppingMusic = map(other, 0, 100, 0, 100, true);
  let vibingMusic = map(other, 0, 100, 0, 20, true);
  fill('black');
  for (let i = 0; i < 30; i++){
    if (seconds > 24 && seconds < 26){
      phone(randMusicX[i], randMusicY[i]-boppingMusic); // when lyrics talk about calling her
    }
    else if (seconds > 26 && seconds < 28){
      a_dime(randMusicX[i], randMusicY[i]-boppingMusic); // 'invest a dime'
      noStroke();
    }
    else if (seconds > 92 && seconds < 94 || seconds > 126 && seconds < 128 || seconds > 60 && seconds < 62){
      dice(randMusicX[i], randMusicY[i]-boppingMusic); // when lyrics talk about tossing the dice 
    }
    else if (seconds > 100 && seconds < 104){
      textSize(30);
      textFont('Georgia');
      text('together', randMusicX[i], randMusicY[i]-boppingMusic);
    }
    else if (seconds > 134 && seconds < 168){
      // do nothing 
    }
    else{
      music_note(randMusicX[i], randMusicY[i]-boppingMusic, 15+vibingMusic); // music note cause its the vibe
    }
    
  }

  // transition into new scene with a heart beating to the drum
  let growHeart1 = map(seconds, 38, 40, 0, 2000);
  let growHeart2 = map(seconds, 70, 72, 0, 2000);
  let beatHeart = map(drum, 50, 100, -100, 400); 
  fill(89, 53, 34); // dark brown 
  if (seconds > 38 && seconds < 40){
    for (let i = 1; i < 6; i++){ // making several different coloured hearts 
      fill(backgroundColors[i]);
      heart(width/2, (height/2-growHeart1/5)*i, (growHeart1+beatHeart)/i);
    }
  }
  if (seconds > 70 && seconds < 72){
    for (let i = 1; i < 6; i++){
      fill(backgroundColors[i]);
      heart(width/2, (height/2-growHeart2/5)*i, (growHeart2+beatHeart)/i);
    }
  }

  // new retro scene at 42-56 and 72-88 seconds
  if (seconds > 40 && seconds < 56 || seconds > 72 && seconds < 88){
    for (let i = 0; i < 13; i++){
      for (let j = 0; j < 7; j++){
        if (drum > 65){
          // goes bold if the words sung are emphasised 
          if (seconds > 44 && seconds < 45 || seconds > 48 && seconds < 49 || seconds > 76 && seconds < 77 || seconds > 80 && seconds < 81 || seconds > 84 && seconds < 85 || seconds > 52 && seconds < 53){
            strokeWeight(5);
            stroke(89, 53, 34);
          }
          else{
            noStroke();
          }
          make_box(192, 93, 42, 238, 138, 28, 242, 199, 89, i, j);
        }
        else {
          // goes bold if the words sung are emphasised
          if (seconds > 44 && seconds < 45 || seconds > 48 && seconds < 49 || seconds > 76 && seconds < 77 || seconds > 80 && seconds < 81 || seconds > 84 && seconds < 85 || seconds > 52 && seconds < 53){
            strokeWeight(5);
            stroke(89, 53, 34);
          }
          else{
            noStroke();
          }
          make_box(137, 78, 41, 239, 166, 62, 242, 199, 89, i, j);
        }
      }
    }
  }
  rectMode(CENTER); // change back to other rectmode

 // drawing the dancers 
  push();
  scale(0.4);
  let danceSpeed = counter / 9;
  dancer = int(danceSpeed % 11);
  let jumping = int(map(vocal, 0, 100, 60, -330)); // dancing to the vocals, like they're singing the song 
  let dancingPlacement = map(seconds, 0, 175, -800, width+100);
  image(dancingImg[dancer], dancingPlacement, jumping);
  // if its in second scene put a spotlight on them 
   if (seconds > 40 && seconds < 56 || seconds > 72 && seconds < 88){
    fill(243, 223, 171, 100);
    stroke(243, 223, 171, 100);
    strokeWeight(50);
    circle(dancingPlacement+1250, jumping+1000, 1500);
    noStroke();
  }
  pop();
 
  // at very start and end, dim scene into darkness/lightness - fade in fade out
  let lighten = map(seconds, 0, 3, 10, 0, true);
  let darken = map(seconds, 173, 175, 0, 10, true);
  if (seconds < 3){
    fill(0, 0, 0, lighten*40);
    rect(0, 0, width*4, height*4);
  }
  if (seconds > 173){
    fill(0, 0, 0, darken*40);
    rect(0, 0, width*4, height*4);
  }
}

// got this code from https://editor.p5js.org/Mithru/sketches/Hk1N1mMQg by Mithru
function heart(x, y, size) {
  beginShape();
  vertex(x, y);
  bezierVertex(x - size / 2, y - size / 2, x - size, y + size / 3, x, y + size);
  bezierVertex(x + size, y + size / 3, x + size / 2, y - size / 2, x, y);
  endShape(CLOSE);
}

// my own written code for music notes 
function music_note(x, y, size){
  beginShape();
  ellipse(x-(size/7)/2, y+size/2, size/3, size/4);
  ellipse(x+size-(size/7)/2, y+size/2, size/3, size/4);
  rect(x, y, size/5, size);
  rect(x+size/2, y-size/2+(size/5)/2, size, size/5);
  rect(x+size, y, size/5, size);
  endShape(CLOSE);
}

// making the second scene with the right colours and amount 
// basically just some rectangles and ellipses 
function make_box(col1, col2, col3, col4, col5, col6, col7, col8, col9, i, j){
  rectMode(CORNER);
  // box top left 
  fill(col1, col2, col3);
  rect(0 + (i*200), 0 + (j*210), 100, 105);
  fill(col7, col8, col9);
  ellipse(50 + (i*200), 50 + (j*210), 100, 105);
  fill(col1, col2, col3);
  ellipse(50 + (i*200), 70 + (j*210), 60, 60);

  // box bottom right
  fill(col4, col5, col6);
  rect(100 + (i*200), 105 + (j*210), 100, 105);
  fill(col7, col8, col9);
  ellipse(150 + (i*200), 157 + (j*210), 100, 105);
  fill(col4, col5, col6);
  ellipse(150 + (i*200), 176 + (j*210), 60, 60);

  // box top right
  fill(col7, col8, col9);
  rect(100 + (i*200), 0 + (j*210), 100, 105);
  fill(col4, col5, col6);
  ellipse(150 + (i*200), 53 + (j*210), 100, 105);
  fill(col7, col8, col9);
  ellipse(150 + (i*200), 70 + (j*210), 60, 60);

  // box bottom left
  fill(col7, col8, col9);
  rect(0 + (i*200), 105 + (j*210), 100, 105);
  fill(col1, col2, col3);
  ellipse(50 + (i*200), 157 + (j*210), 100, 105);
  fill(col7, col8, col9);
  ellipse(50 + (i*200), 176 + (j*210), 60, 60);
  
}

// drawing a phone shape 
function phone(x, y){
  ellipse(x+40, y, 15, 30);
  ellipse(x+40, y+60, 15, 30);
  circle(x+30, y, 30);
  circle(x+30, y+60, 30);
  ellipse(x+20, y+30, 20, 60);
}

// drawing a coin shape 
function a_dime(x, y){
  noFill();
  stroke('black');
  strokeWeight(3);
  circle(x, y, 30);
  textSize(30);
  text('$', x-8, y+10);
}

// drawing a dice shape 
function dice(x, y){
  noFill();
  stroke('black')
  strokeWeight(4)
  rect(x, y, 40, 40);
  fill('black')
  circle(x-10, y-10, 10);
  circle(x-10, y+10, 10);
  circle(x+10, y-10, 10);
  circle(x+10, y+10, 10);
}