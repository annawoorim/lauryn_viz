let sample_data;
let lauryn_tracks_data;
let lauryn_sampled_clips_data;
let track_size;
let track_names;
let tab_x;
let tab_y;
let tab_space;
let all_tracks;
let switcher = 'Track';
let switcher_track = 'All Tracks';
let description_y;
let text_padding;
let track_clicked = false;
let current_hover = null;
let current_track =  null;
let current_audio = null;
let album_art = [];
let lauryn_miseducation;
let lauryn_unplugged;
let lauryn_profile;
let sampled_track_audio = [];
let original_track_audio = [];
let double_clicked = false;

function preload() {
  sample_data = loadTable('data/lauryn_sampled.csv', 'csv', 'header');
  lauryn_tracks_data = loadTable('data/lauryn_tracks.csv', 'csv', 'header');
  
  lauryn_profile = loadImage('images/lauryn_hill_home.jpg');
  lauryn_miseducation = loadImage('images/lauryn_miseducation.jpg');
  lauryn_unplugged = loadImage('images/lauryn_unplugged.jpg');
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  track_size = (width - 300)/24;
  //track_size = height/24;
  
  for (i = 0; i < sample_data.getRowCount(); i++) {
    sampled_track_audio.push(loadSound('audio/' + sample_data.getColumn('sampled_audio')[i]));
    print(sampled_track_audio[i]);
  }
  
  for (i = 0; i < sample_data.getRowCount(); i++) {
    album_art.push(loadImage('images/' + sample_data.getColumn('album_art')[i]));
  }
}


function draw() {
  background('black');
  fill('white');
  
  push();
  
  // header
  tab_x = 50;
  tab_space = 50;
  let header_image_size = 100;
  
  if (switcher_track == 'All Tracks') {
    image(lauryn_profile, tab_x, 20, header_image_size, header_image_size);
    
    textAlign('LEFT');
    textSize(32);
    text('The Influence of Lauryn Hill', tab_x + header_image_size + 20, 50);
    
    textSize(18);
    text('Exploring 78 songs that sample from the hip hop icon', tab_x + header_image_size + 20, 80);
  }
  else {
    for (i = 0; i < lauryn_tracks_data.getRowCount(); i++) {
      if (switcher_track == lauryn_tracks_data.getColumn('track_title')[i]) {
        if (lauryn_tracks_data.getColumn('album')[i] == 'The Miseducation of Lauryn Hill') {
          image(lauryn_miseducation, tab_x, 20, header_image_size, header_image_size);
        }
        else {
          image(lauryn_unplugged, tab_x, 20, header_image_size, header_image_size);
        }
        
        textSize(24);
        text(switcher_track, tab_x + header_image_size + 20, 50);
        
        textSize(18);
        text(lauryn_tracks_data.getColumn('fact')[i], tab_x + header_image_size + 20, 80);
        /*
        if (lauryn_tracks_data.getColumn('sample_count')[i] == '1') {
          text('Sampled ' + lauryn_tracks_data.getColumn('sample_count')[i] + ' time', tab_x + header_image_size + 20, 80);
        }
        else {
          text('Sampled ' + lauryn_tracks_data.getColumn('sample_count')[i] + ' times', tab_x + header_image_size + 20, 80);
        }
        */
      }
    }
  }
  
  /*else if (switcher_track == 'Mystery of Iniquity') {
    image(lauryn_unplugged, tab_x, 20, header_image_size, header_image_size);
    
    textAlign('LEFT');
    textSize(24);
    text('Mystery of Iniquity was sampled ', tab_x + header_image_size + 20, 50);
    
    //textSize(18);
    //text('Fact fact fact', tab_x + header_image_size + 20, 80);
  }
  */
  
  // track tabs
  track_names = ['All Tracks', 'Lost Ones', 'Doo Wop (That Thing)', 'Ex-Factor', 'Nothing Even Matters', 
  'Everything Is Everything', 'Mystery of Iniquity', 'To Zion', 'Superstar', 'The Miseducation of Lauryn Hill', 
  'Oh Jerusalem', 'I Get Out', 'I Gotta Find Peace of Mind', 'So Much Things to Say'];  
    
  // hover track tabs
  tab_y = 200;
  fill('orange');
  for (let i = 0; i < track_names.length; i++) {
    if (mouseHover(tab_x - 10, tab_x + 100, tab_y - 10 + (30 * i), tab_y + (30 * i))) {
      rect(tab_x - 10, tab_y - 10 + (30 * i), 220, 10);
    }
  }
  
  // click track tabs
  for (let i = 0; i < track_names.length; i++) {
    if (switcher_track == track_names[i]) {
      rect(tab_x - 10, tab_y - 10 + (30 * i), 220, 10);
    }
  }
  
  // track names
  textSize(14);
  textAlign(LEFT);
  fill('white');
  
  tab_y = 200;
  for (let i = 0; i < track_names.length; i++) {
    text(track_names[i], tab_x, tab_y);
    tab_y = tab_y + 30;
  }
  tab_y = 200;
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
    track_x = 300 + (track_size * track_position) + (track_size/2);
    
    let track = new Track(sample_data.getColumn('sampled_title')[r], sample_data.getColumn('sampled_artist')[r],
      sample_data.getColumn('sampled_genre')[r], sample_data.getColumn('sampled_year')[r], 
      sample_data.getColumn('track')[r], album_art[r], 
      sampled_track_audio[r], original_track_audio[r], track_x, track_y[track_position], 
      track_size - 10, track_padding, false); 
    
    all_tracks.push(track);
      
    track_y[track_position] = track_y[track_position] - track_size - track_padding;
       
    fill('white');
    yearLabels();
    
    if (switcher_track == 'All Tracks') {
      track.highlightByTrack(false);
      track.hoverTrack();
      
      if (current_track != null) {
        current_track.info();
        text("Sampled: " + current_track.sampled(), width/2, description_y + (text_padding * 2));
      }
    }
    else if (sample_data.getColumn('track')[r] == switcher_track) {
      if (switcher == 'Track') {
        fill('white');
        track.highlightByTrack(true);
        track.hoverTrack();
        
        if (current_track != null) {
          current_track.info();
        }
      }
    }
    else {
      track.highlightByTrack(false);
    }
  }
  pop();
  
}

function Track(track_title, track_artist, track_genre, track_year, sampled_track, track_image, 
  sampled_audio, original_audio, x, y, size, padding, clicked) { 
  rectMode(CENTER);
  textAlign(CENTER);
  textSize(18);

  description_y = 350;
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
  
  this.sampled_audio = function() {
    return sampled_audio;
  }
  
  this.original_audio = function() {
    return original_audio;
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
  
  this.hoverTrack = function() {      
      if (mouseHover(x - (size/2), x + (size/2), y - (size/2), y + (size/2))) {
        current_hover = this;
        
        fill('grey');
        rect(x, y, size, size);
        
        //imageMode(CENTER);
        //image(track_image, x, y, size, size);
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
      
      // show track album cover
      imageMode(CENTER);
      image(track_image, width/2, description_y - (200/2) - text_padding, 200, 200);
      
      // show track description
      fill('white');
      text(track_title, width/2, description_y);
      text(track_artist, width/2, description_y + text_padding);
      //text("Sampled: " + sampled_track, width/2, description_y + (text_padding * 2));
      
      //sample_audio.play();
      /*
      // play audio
      if (track_audio.isPlaying()) {
      }
      else {
        track_audio.play();
      }
      */
  }
}

function yearLabels() {
  push();
  let label_x = 300 + track_size;
  let year = 1999;
  for (let i = 0; i < 20; i++) {
    textAlign(CENTER);
    textSize(12);
    text(year.toString(), label_x + (track_size/2), height - 50)
    label_x = label_x + track_size;
    year++;
  }
  pop();
}

function mouseClicked() {  
  /*if (mouseHover(tab_x - 30, tab_x + 50, tab_y - tab_space/2 + tab_space, tab_y + tab_space)) {
    switcher = 'Track';
  }*/
  
  if (switcher == 'Track') {    
    tab_y = 200;
    for (let i = 0; i < track_names.length; i++) {
      if (mouseHover(tab_x - 10, tab_x + 100, tab_y - 10 + (30 * i), tab_y + (30 * i))) {
        switcher_track = track_names[i];
      }
    }
  }
  
  if (mouseHover(current_hover.x() - (current_hover.size()/2), current_hover.x() + 
    (current_hover.size()/2), current_hover.y() - (current_hover.size()/2), current_hover.y() + (current_hover.size()/2))) {
    
    //track_clicked = true;
    current_track = current_hover;
    
    if (current_audio != null) {
      if (current_audio.isPlaying()) {
        current_audio.stop();
      }
    }
    
    current_audio = current_track.sampled_audio();
    
    //if (current_audio != null && double_clicked == false) {
    if (current_audio != null) {
      if (current_audio.isPlaying() == false) {
        current_audio.play();
      }
    }
    
    /*
    if (current_audio != null) {
      if (current_audio.isPlaying()) {
        current_audio.stop();
      }
      else {
        current_audio.play();
      }
    }
    */
  }
  else {
    //track_clicked = false;
    
    if (current_audio != null) {
      current_audio.stop();
    }
    
    current_audio = null;
    current_track = null;
  }
  
  if (current_track != null) {
    if (mouseHover(current_track.x() - (current_track.size()/2), current_track.x() + 
    (current_track.size()/2), current_track.y() - (current_track.size()/2), current_track.y() + 
    (current_track.size()/2))) {
      double_clicked = true;
    }
    else {
      double_clicked = false;
    }
  }
  else {
    double_clicked = false;
  }
}

function mouseHover(x1, x2, y1, y2) {
  if (mouseX >= x1 && mouseX <= x2 && mouseY >= y1 && mouseY <= y2) {
    return true;
  }
  else {
    return false;
  }
}
