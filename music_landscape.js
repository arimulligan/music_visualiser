
function draw_one_frame(vocal, drum, bass, other) {
  // this is my code for thw second scene 
  background(100, 200, 100);
  for (let i = 0; i < 13; i++){
    for (let j = 0; j < 7; j++){
      if (drum > 50){
        make_box(0, 120, 255, 0, 159, 255, 0, 210, 255, i, j);
      }
      else {
        make_box(0, 249, 255, 0, 81, 255, 0, 210, 255, i, j);
      }
    }
  }
}

function make_box(col1, col2, col3, col4, col5, col6, col7, col8, col9, i, j){
  noStroke();
  // box top left 
  fill(col1, col2, col3);
  rect(0 + (i*200), 0 + (j*210), 100, 105);
  fill(col7, col8, col9);
  ellipse(50 + (i*200), 53 + (j*210), 100, 105);
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
  ellipse(150 + (i*200), 76 + (j*210), 60, 60);

  // box bottom left
  fill(col7, col8, col9);
  rect(0 + (i*200), 105 + (j*210), 100, 105);
  fill(col1, col2, col3);
  ellipse(50 + (i*200), 157 + (j*210), 100, 105);
  fill(col7, col8, col9);
  ellipse(50 + (i*200), 176 + (j*210), 60, 60);
}