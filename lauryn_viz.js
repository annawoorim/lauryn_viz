let sample_data;
let track_size;
let tab_names;
let track_names;
let genre_names;
let tab_x;
let tab_y;
let tab_space;
let all_tracks;
let switcher = 'Year';
let switcher_track = 'Ex-Factor';
let switcher_genre = 'Hip-Hop / Rap / R&B';
let description_y;
let text_padding;
let track_clicked = false;

function preload() {
  sample_data = loadTable('data/lauryn_sampled.csv', 'csv', 'header');
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  track_size = (width - 300)/24;
  //track_size = height/24;
}


function draw() {
  background('black');
  fill('white');
  
  push();
  // title
  textSize(32);
  textAlign('LEFT');
  text('Lauryn Hill: Sampled', 50, 50);
  
  // main tabs  
  tab_names = ['Year', 'Track', 'Genre', 'About']
  tab_x = 50;
  tab_y = 100;
  tab_space = 50;
  
  // track tabs
  track_names = ['Ex-Factor', 'Doo Wop (That Thing)', 'Lost Ones', 'Mystery of Iniquity', 
    'Nothing Even Matters', 'I Gotta Find Peace of Mind', 'To Zion', 'Superstar', 
    'Everything Is Everything', 'So Much Things to Say', 'The Miseducation of Lauryn Hill', 
    'Oh Jerusalem', 'I Get Out'];
  
  // genre tabs
  genre_names = ['Hip-Hop / Rap / R&B', 'Rock / Pop', 'Electronic / Dance', 'Other'];
  
  // hovering between tabs
  fill('orange');
  // main tabs
  for (let i = 0; i < tab_names.length; i++) {
    if (mouseHover(tab_x - 30, tab_x + 50, tab_y - tab_space/2 + (tab_space * i), tab_y + (tab_space * i))) {
      rect(tab_x - 20, tab_y - tab_space/2 + (tab_space * i), 80, tab_space/2 + 10);
    }
  }
  
  // selecting tabs
  if (switcher == 'Year') {
    rect(tab_x - 20, tab_y - tab_space/2, 80, tab_space/2 + 10);
  }
  else if (switcher == 'Track') {
    rect(tab_x - 20, tab_y - tab_space/2 + tab_space, 80, tab_space/2 + 10);
    
    // hover track tabs
    tab_y = 300;
    for (let i = 0; i < track_names.length; i++) {
      if (mouseHover(tab_x - 10, tab_x + 100, tab_y - 10 + (30 * i), tab_y + (30 * i))) {
        rect(tab_x - 10, tab_y - 10 + (30 * i), 220, 10);
      }
    }
    //tab_y = 100;
    
    // click track tabs
    //tab_y = 300;
    for (let i = 0; i < track_names.length; i++) {
      if (switcher_track == track_names[i]) {
        rect(tab_x - 10, tab_y - 10 + (30 * i), 220, 10);
      }
    }
    tab_y = 100;
  }
  else if (switcher == 'Genre') {
    rect(tab_x - 20, tab_y - tab_space/2 + (tab_space * 2), 80, tab_space/2 + 10);
    
    // hover genre tabs
    tab_y = 300;
    for (let i = 0; i < genre_names.length; i++) {
      if (mouseHover(tab_x - 10, tab_x + 100, tab_y - 10 + (30 * i), tab_y + (30 * i))) {
        rect(tab_x - 10, tab_y - 10 + (30 * i), 220, 10);
      }
    }
    
    // click genre tabs
    for (let i = 0; i < genre_names.length; i++) {
      if (switcher_genre == genre_names[i]) {
        rect(tab_x - 10, tab_y - 10 + (30 * i), 220, 10);
      }
    }
    tab_y = 100;
  }
  else if (switcher == 'About') {
    rect(tab_x - 20, tab_y - tab_space/2 + (tab_space * 3), 80, tab_space/2 + 10);
  }
  
  // tab names
  textSize(18);
  textAlign(LEFT);
  fill('white');
  for (let i = 0; i < tab_names.length; i++) {
    text(tab_names[i], tab_x, tab_y);
    tab_y = tab_y + tab_space;
  }
  tab_y = 100;
  
  // track and genre names
  textSize(14);
  textAlign(LEFT);
  fill('white');
  
  if (switcher == 'Track') {
    tab_y = 300;
    for (let i = 0; i < track_names.length; i++) {
      text(track_names[i], tab_x, tab_y);
      tab_y = tab_y + 30;
    }
    tab_y = 100;
  }
  else if (switcher == 'Genre') {
    tab_y = 300;
    for (let i = 0; i < genre_names.length; i++) {
      text(genre_names[i], tab_x, tab_y);
      tab_y = tab_y + 30;
    }
    tab_y = 100;
  }
  else {  
  }  
  pop();
  
  push();
  let track_padding = 0;
  let track_x;
  let track_y = [];
  for (let i = 0; i < 22; i++) {
    track_y[i] = height - 40 - track_size;
  }
  
  let track_position;
  all_tracks = [];
  for (let r = 0; r < sample_data.getRowCount(); r++) {
      track_position = float(sample_data.getColumn('sampled_year')[r]) - 1998;
      track_x = 200 + (track_size * track_position) + (track_size/2);
      
      let track = new Track(sample_data.getColumn('sampled_title')[r], sample_data.getColumn('sampled_artist')[r],
        sample_data.getColumn('sampled_genre')[r], sample_data.getColumn('sampled_year')[r], 
        sample_data.getColumn('track')[r], sample_data.getColumn('sampled_title')[r], 
        sample_data.getColumn('sampled_title')[r], track_x, track_y[track_position], 
        track_size - 10, track_padding, false); 
      
      all_tracks.push(track);
        
      track_y[track_position] = track_y[track_position] - track_size - track_padding;
        
      if (switcher == 'Year') {
        fill('white');
        yearLabels();
        track.highlightByTrack(false);
        track.show_description();
        
        if (track_clicked) {
          //track.info();
          //rect(20, 20, 200, 200);
        }
        else {
          //print('not clicked');
        }
      }
      else if (switcher == 'Track') {
        fill('white');
        yearLabels();
        if (sample_data.getColumn('track')[r] == switcher_track) {
          track.highlightByTrack(true);
          track.show_description();
        }
        else {
          track.highlightByTrack(false);
        }
      }
      else if (switcher == 'Genre') {
        fill('white');
        yearLabels();
        if (sample_data.getColumn('sampled_genre')[r] == switcher_genre) {
          track.highlightByTrack(true);
          track.show_description();
        }
        else {
          track.highlightByTrack(false);
        }
      }
      else {
        // about description
      }
  }
  pop();
  
}

function Track(track_title, track_artist, track_year, track_genre, sampled_track, track_image, 
  track_audio, x, y, size, padding, clicked) { 
  rectMode(CENTER);
  //let track = rect(x, y, size, size);

  textAlign(CENTER);
  textSize(18);

  description_y = 300;
  text_padding = 25;
  
  this.title = function() {
    return track_title;
  }
  
  this.artist = function() {
    return track_artist;
  }
  
  this.year = function() {
    return track_year;
  }
  
  this.sampled = function() {
    return sampled_track;
  }
  
  this.genre = function() {
    return track_genre;
  }
  
  this.image = function() {
    return track_image;
  }
  
  this.audio = function() {
    return track_audio;
  }
  
  this.x = function() {
    return x;
  }
  
  this.y = function() {
    return y;
  }
  
  this.size = function() {
    return size;
  }

  //this.clicked = false;
  this.clicked = 'n';
  
  this.show_description = function() {      
      if (mouseHover(x - (size/2), x + (size/2), y - (size/2), y + (size/2))) {
        fill('grey');
        rect(x, y, size, size);
        
        fill('white');
        rect(width/2, description_y - (200/2) - text_padding, 200, 200);
        text(track_title, width/2, description_y);
        text(track_artist, width/2, description_y + text_padding);
        text(track_year, width/2, description_y + (text_padding * 2));
        text("Sampled: " + sampled_track, width/2, description_y + (text_padding * 3));
      }
  }
  
  this.highlightByTrack = function(highlighted) {
    if (highlighted) {
      fill('orange');
      rect(x, y, size, size);
    }
    else {
      fill('white');
      rect(x, y, size, size);
    }
  }
  
  this.info = function() {
      fill('grey');
      rect(x, y, size, size);
      
      fill('white');
      rect(width/2, description_y - (200/2) - text_padding, 200, 200);
      text(track_title, width/2, description_y);
      text(track_artist, width/2, description_y + text_padding);
      text(track_year, width/2, description_y + (text_padding * 2));
      text("Sampled: " + sampled_track, width/2, description_y + (text_padding * 3));
  }
}

function yearLabels() {
  push();
  // year labels
  //track_size = (width - 200)/24;
  //line(200, height - 70, 200 + (track_size * 22), height - 70)
  let label_x = 200;
  let year = 1998;
  for (let i = 0; i < 22; i++) {
    textAlign(CENTER);
    textSize(12);
    text(year.toString(), label_x + (track_size/2), height - 50)
    label_x = label_x + track_size;
    year++;
  }
  pop();
}

function mouseClicked() {
  if (mouseHover(tab_x - 30, tab_x + 50, tab_y - tab_space/2, tab_y)) {
    switcher = 'Year';
  }
  else if (mouseHover(tab_x - 30, tab_x + 50, tab_y - tab_space/2 + tab_space, tab_y + tab_space)) {
    switcher = 'Track';
  }
  else if (mouseHover(tab_x - 30, tab_x + 50, tab_y - tab_space/2 + (tab_space * 2), tab_y + (tab_space * 2))) {
    switcher = 'Genre';
  }
  else if (mouseHover(tab_x - 30, tab_x + 50, tab_y - tab_space/2 + (tab_space * 3), tab_y + (tab_space * 3))) {
    switcher = 'About';
  }
  
  if (switcher == 'Track') {    
    tab_y = 300;
    for (let i = 0; i < track_names.length; i++) {
      if (mouseHover(tab_x - 10, tab_x + 100, tab_y - 10 + (30 * i), tab_y + (30 * i))) {
        switcher_track = track_names[i];
      }
    }
    tab_y = 100;
  }
  else if (switcher == 'Genre') {    
    tab_y = 300;
    for (let i = 0; i < genre_names.length; i++) {
      if (mouseHover(tab_x - 10, tab_x + 100, tab_y - 10 + (30 * i), tab_y + (30 * i))) {
        switcher_genre = genre_names[i];
      }
    }
    tab_y = 100;
  }
  
  //print(all_tracks[0].x());
  all_tracks.forEach(function(track) {
        if (mouseHover(track.x() - (track.size()/2), track.x() + (track.size()/2), track.y() - (track.size()/2), track.y() + (track.size()/2))) {
          track_clicked = true;

          //track.clicked = true;
          
          /*fill('grey');
          rect(track.x(), track.y(), track.size(), track.size());
                   
          fill('white');
          rect(width/2, description_y - (200/2) - text_padding, 200, 200);
          text(track.title, width/2, description_y);
          text(track.artist, width/2, description_y + text_padding);
          text(track.year, width/2, description_y + (text_padding * 2));
          text("Sampled: " + track.sampled, width/2, description_y + (text_padding * 3));*/          
        }
  });
  
}

function mouseHover(x1, x2, y1, y2) {
  if (mouseX >= x1 && mouseX <= x2 && mouseY >= y1 && mouseY <= y2) {
    return true;
  }
  else {
    return false;
  }
}
