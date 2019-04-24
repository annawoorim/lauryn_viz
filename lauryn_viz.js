let sample_data;
let track_size;

function preload() {
  sample_data = loadTable('data/lauryn_sampled.csv', 'csv', 'header');
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  //text('hi', windowWidth/2, 100);
  //background('white');
  //print(sample_data.getColumn('track'));
}


function draw() {
  background('white');
  
  track_size = (windowWidth - 200)/24;
  line(200, windowHeight - 70, 200 + (track_size * 22), windowHeight - 70)
  
  // year labels
  let label_x = 200;
  let year = 1998;
  for (let i = 0; i < 22; i++) {
    textAlign(CENTER);
    textSize(12);
    text(year.toString(), label_x + (track_size/2), windowHeight - 50)
    label_x = label_x + track_size;
    year++;
  }
  
  let track_padding = 0;
  let track_x;
  let track_y = [];
  for (let i = 0; i < 22; i++) {
    track_y[i] = windowHeight - 30 - track_size;
  }
  
  let track_position;
  for (let r = 0; r < sample_data.getRowCount(); r++) {
      track_position = float(sample_data.getColumn('sampled_year')[r]) - 1998;
      track_x = 200 + (track_size * track_position) + (track_size/2);
      
      addTrack(sample_data.getColumn('sampled_title')[r], sample_data.getColumn('sampled_artist')[r], 
        sample_data.getColumn('sampled_year')[r], sample_data.getColumn('sampled_title')[r], 
        sample_data.getColumn('sampled_title')[r], track_x, track_y[track_position], 
        track_size - 40, track_padding); 
        
      track_y[track_position] = track_y[track_position] - track_size + 35 - track_padding;
  }
  //resizeCanvas(windowWidth, windowHeight);
}

function addTrack(track_title, track_artist, track_year, track_image, track_audio, x, y, size, padding) { 
  rectMode(CENTER); 
  let track = rect(x, y, size, size);

  textAlign(CENTER);
  textSize(18);

  let description_y = 300;
  let text_padding = 25;
  
  if (mouseX >= x - (size/2) && mouseX <= x + (size/2) && 
      mouseY >= y - (size/2) && mouseY <= y + (size/2)) {
    //fill('black');
    rect(windowWidth/2, description_y - (200/2) - text_padding, 200, 200);
    text(track_title, windowWidth/2, description_y);
    text(track_artist, windowWidth/2, description_y + text_padding);
    text(track_year, windowWidth/2, description_y + (text_padding * 2));
  }
  else {
  }
  
  y = y - size - padding;
  
  track;
}
