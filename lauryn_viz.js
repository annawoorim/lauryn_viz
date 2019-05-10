let sample_data;
let lauryn_tracks_data;
let lauryn_sampled_clips_data;
let track_size;
let track_names;
let tab_x;
let tab_y;
let tab_space;
let switcher = 'Track';
let switcher_track = 'All Tracks';
let description_y;
let description_x;
let text_padding;
let current_hover = null;
let current_track =  null;
let current_audio = null;
let album_art = [];
let lauryn_miseducation;
let lauryn_unplugged;
let lauryn_profile;
let sampled_track_audio = [];
let original_track_audio = [];
let header_image_size;
let last_track = null;
let sampled_track_y = [];
let ostrichSans;
let aspectTop, aspectLeft;
let aspectScale = 1;
const WIDE = 1280;
const HIGH = 739;

function preload() {
  // load data
  sample_data = loadTable('data/lauryn_sampled.csv', 'csv', 'header');
  lauryn_tracks_data = loadTable('data/lauryn_tracks.csv', 'csv', 'header');
  lauryn_sampled_clips_data = loadTable('data/lauryn_sampled_clips.csv', 'csv', 'header');
  
  
  // load header images of lauryn hill
  lauryn_profile = loadImage('images/lauryn_hill_home.jpg');
  lauryn_miseducation = loadImage('images/lauryn_miseducation.jpg');
  lauryn_unplugged = loadImage('images/lauryn_unplugged.jpg');
  
  // load font
  ostrichSans = loadFont('fonts/OstrichSans-Black.otf');
}

function setup() {
  //createCanvas(windowWidth, windowHeight);
  createCanvas(windowWidth, windowHeight);
  track_size = (WIDE - 250)/24;
  //track_size = height/24;
  
  // load sampled tracks
  for (i = 0; i < sample_data.getRowCount(); i++) {
    sampled_track_audio.push(loadSound('audio/' + sample_data.getColumn('sampled_audio')[i]));
  }
  
  // load lauryn hill samples
  for (i = 0; i < lauryn_sampled_clips_data.getRowCount(); i++) {
    original_track_audio.push(loadSound('audio/' + lauryn_sampled_clips_data.getColumn('audio')[i]));
  }
  
  // load album art
  for (i = 0; i < sample_data.getRowCount(); i++) {
    album_art.push(loadImage('images/' + sample_data.getColumn('album_art')[i]));
  }
}


function draw() {  
  applyAspect();
  clear();
  background(0);
  fill('white');
  noStroke();
  textFont(ostrichSans);
  
  if (filesLoaded()) {
    push();
    
    // create header
    tab_x = 50;
    tab_space = 50;
    header_image_size = 100;
    
    if (switcher_track == 'All Tracks') {
      image(lauryn_profile, tab_x, 20, header_image_size, header_image_size);
      
      textAlign('LEFT');
      textSize(32);
      text('The Influence of Lauryn Hill', tab_x + header_image_size + 20, 50);
      
      textSize(18);
      text('78 songs that sample the hip hop icon', tab_x + header_image_size + 20, 80);
    }
    else {
      for (i = 0; i < lauryn_tracks_data.getRowCount(); i++) {
        // switch header to details of each track
        if (switcher_track == lauryn_tracks_data.getColumn('track_title')[i]) {
          if (lauryn_tracks_data.getColumn('album')[i] == 'The Miseducation of Lauryn Hill') {
            image(lauryn_miseducation, tab_x, 20, header_image_size, header_image_size);
          }
          else {
            image(lauryn_unplugged, tab_x, 20, header_image_size, header_image_size);
          }
          
          // show track name
          textSize(32);
          text(switcher_track, tab_x + header_image_size + 20, 45);
          
          // show track fact
          textSize(16);
          text(lauryn_tracks_data.getColumn('fact')[i], tab_x + header_image_size + 20, 75);
        }
      }
      
      if (switcher == 'Track') {
        fill('#e88a1a');
        rect(tab_x + header_image_size + 20, 120, 136, 5)
        // hover explore sample button
        if (mouseHover(tab_x + header_image_size + 20, tab_x + header_image_size + 184, 110 - 20, 110 + 20)) {
          fill('#e88a1a');
          rectMode(CORNER);
          rect(tab_x + header_image_size + 20, 110 - 20, 136, 35);
        }
        
        fill('white');
        textSize(18);
        text('Explore the samples', tab_x + header_image_size + 20, 110); 
      }
      else if (switcher == 'Sampled') {
        fill('#e88a1a');
        rect(tab_x + header_image_size + 20, 120, 163, 5)
        // hover explore sample button
        if (mouseHover(tab_x + header_image_size + 20, tab_x + header_image_size + 198, 110 - 20, 110 + 20)) {
          fill('#e88a1a');
          rectMode(CORNER);
          rect(tab_x + header_image_size + 20, 110 - 20, 163, 35);
        }
        
        fill('white');
        textSize(18);
        text('Back to tracks by year', tab_x + header_image_size + 20, 110);   
      }
    }
    
    // track tabs
    track_names = ['All Tracks', 'Lost Ones', 'Doo Wop (That Thing)', 'Ex-Factor', 'Nothing Even Matters', 
    'Everything Is Everything', 'Mystery of Iniquity', 'To Zion', 'Superstar', 'The Miseducation of Lauryn Hill', 
    'Oh Jerusalem', 'I Get Out', 'I Gotta Find Peace of Mind', 'So Much Things to Say'];  
      
    // hover track tabs
    tab_y = 200;
    fill('#e88a1a');
    for (let i = 0; i < track_names.length; i++) {
      if (mouseHover(tab_x - 10, tab_x + 100, tab_y - 10 + (30 * i), tab_y + (30 * i))) {
        rect(tab_x - 10, tab_y - 10 + (30 * i), 210, 10);
      }
    }
    
    // click track tabs
    for (let i = 0; i < track_names.length; i++) {
      if (switcher_track == track_names[i]) {
        rect(tab_x - 10, tab_y - 10 + (30 * i), 210, 10);
      }
    }
    
    // track names
    textSize(16);
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
      track_y[i] = HIGH - 50 - track_size;
    }
    
    // show tracks by year
    if (switcher == 'Track') {
      let track_position;
      for (let r = 0; r < sample_data.getRowCount(); r++) {
        track_position = float(sample_data.getColumn('sampled_year')[r]) - 1998;
        track_x = 300 + (track_size * track_position) + (track_size/2);
        
        let track = new Track(sample_data.getColumn('sampled_title')[r], '', sample_data.getColumn('sampled_artist')[r],
          sample_data.getColumn('sampled_year')[r], sample_data.getColumn('track')[r], album_art[r], 
          sampled_track_audio[r], track_x, track_y[track_position], track_size - 10, track_size - 10, 0, 0, 0, 0); 
          
        track_y[track_position] = track_y[track_position] - track_size - track_padding;
           
        
          fill('white');
          yearLabels();
          
          if (switcher_track == 'All Tracks') {
            track.highlightByTrack(false);
            track.hoverTrack();
            
            if (current_track != null) {
              current_track.info();
              textSize(18);
              text("Sampled: " + current_track.sampled(), description_x, description_y + (text_padding * 2));
            }
          }
          else if (sample_data.getColumn('track')[r] == switcher_track) {
              fill('white');
              track.highlightByTrack(true);
              track.hoverTrack();
              
              if (current_track != null) {
                current_track.info();
              }
          }
          else {
            track.highlightByTrack(false);
          }
      }
    } 
    
    // show tracks by sample track and time
    else if (switcher == 'Sampled') {
        let sampled_clip_x = 300 + track_size;
        let sampled_clip_y = HIGH - 80;
        let track_timeline_width = track_size * 20;
        let track_start_label_x = 260 + track_size;
        let track_end_label_x = 300 + track_size + track_timeline_width + 40;
        let track_label_y = HIGH - 72;
        let track_x;
        
        // track timeline
        rectMode(CORNER);
        rect(sampled_clip_x, sampled_clip_y, track_timeline_width, 2);
        
        
        for (let j = 0; j < lauryn_sampled_clips_data.getRowCount(); j++) {
          // handle overlapping clips
          if (lauryn_sampled_clips_data.getColumn('track_title')[j] == 'Lost Ones') {
            if (lauryn_sampled_clips_data.getColumn('audio')[j] == 'lauryn_lost_ones_3.mp3') {
              track_x = sampled_clip_x + (track_size/2) + (lauryn_sampled_clips_data.getColumn('sample_time')[j])/
              (lauryn_sampled_clips_data.getColumn('end_time')[j]) * track_timeline_width * 1.2;
            }
            else if (lauryn_sampled_clips_data.getColumn('audio')[j] == 'lauryn_lost_ones_11.mp3') {
              track_x = sampled_clip_x + (track_size/2) + (lauryn_sampled_clips_data.getColumn('sample_time')[j])/
              (lauryn_sampled_clips_data.getColumn('end_time')[j]) * track_timeline_width * 1.2;
            }
            else {
              track_x = sampled_clip_x + (lauryn_sampled_clips_data.getColumn('sample_time')[j])/
              (lauryn_sampled_clips_data.getColumn('end_time')[j]) * track_timeline_width * 1.2;
            }
          }
          else if (lauryn_sampled_clips_data.getColumn('track_title')[j] == 'Doo Wop (That Thing)') {
            if (lauryn_sampled_clips_data.getColumn('audio')[j] == 'lauryn_doo_wop_4.mp3') {
              track_x = sampled_clip_x + ((track_size/2) + 30) +(lauryn_sampled_clips_data.getColumn('sample_time')[j])/
              (lauryn_sampled_clips_data.getColumn('end_time')[j]) * track_timeline_width * 1.2;
            }
            else if (lauryn_sampled_clips_data.getColumn('audio')[j] == 'lauryn_doo_wop_9.mp3') {
              track_x = sampled_clip_x + (track_size/2) - 15 +(lauryn_sampled_clips_data.getColumn('sample_time')[j])/
              (lauryn_sampled_clips_data.getColumn('end_time')[j]) * track_timeline_width * 1.2;
            }
            else {
              track_x = sampled_clip_x + (lauryn_sampled_clips_data.getColumn('sample_time')[j])/
            (lauryn_sampled_clips_data.getColumn('end_time')[j]) * track_timeline_width * 1.2;
            }
          }
          else {
            track_x = sampled_clip_x + (lauryn_sampled_clips_data.getColumn('sample_time')[j])/
            (lauryn_sampled_clips_data.getColumn('end_time')[j]) * track_timeline_width;
          }
          
          let lauryn_track = new Track(lauryn_sampled_clips_data.getColumn('track')[j], 
          lauryn_sampled_clips_data.getColumn('track_title')[j], 'Lauryn Hill', '1998', 'Original', 
          lauryn_miseducation, original_track_audio[j], track_x, sampled_clip_y, (track_size/3), (track_size/1.5), 
          lauryn_sampled_clips_data.getColumn('sample_time')[j], 
          lauryn_sampled_clips_data.getColumn('sample_time_formatted')[j], 
          lauryn_sampled_clips_data.getColumn('end_time')[j], 
          lauryn_sampled_clips_data.getColumn('end_time_formatted')[j]); 
          
          if (lauryn_sampled_clips_data.getColumn('track_title')[j] == switcher_track) {
            // track time labels
            fill('white'); 
            textSize(14);
            textAlign(CENTER);
            text('0:00', track_start_label_x, track_label_y);
            text(lauryn_sampled_clips_data.getColumn('end_time_formatted')[j], track_end_label_x, track_label_y);
            
            lauryn_track.displayTrack();
            lauryn_track.hoverTrack();
            
            if (current_track != null) {
              current_track.info_alt();
              fill('white');
              textSize(18);
              text(current_track.title_alt(), description_x, description_y);
              text(current_track.artist(), description_x, description_y + (text_padding));
              text(current_track.sample_time(), description_x, description_y + (text_padding * 2));
            }
          }
        }
        
        let sampled_track_position;
        for (let i = 1; i < 53; i++) {
            //sampled_track_y[i] = height - 40 - track_size;
            sampled_track_y[i] = HIGH - 125;
        }
        
        for (let r = 0; r < sample_data.getRowCount(); r++) {
          // show sampled tracks
          sampled_track_position = sample_data.getColumn('sample_id')[r];
          
          // handle overlapping clips
          if (sample_data.getColumn('track')[r] == 'Lost Ones') {
            if (sample_data.getColumn('original_audio')[r] == 'lauryn_lost_ones_3.mp3') {
              sampled_track_x = sampled_clip_x + (track_size/2) + (sample_data.getColumn('track_sample_time')[r])/
              (sample_data.getColumn('end_time')[r]) * track_timeline_width * 1.2;
            }
            else if (sample_data.getColumn('original_audio')[r] == 'lauryn_lost_ones_11.mp3') {
              sampled_track_x = sampled_clip_x + (track_size/2) + (sample_data.getColumn('track_sample_time')[r])/
              (sample_data.getColumn('end_time')[r]) * track_timeline_width * 1.2;
            }
            else {
              sampled_track_x = sampled_clip_x + (sample_data.getColumn('track_sample_time')[r])/
              (sample_data.getColumn('end_time')[r]) * track_timeline_width * 1.2;
            }
          }
          else if (sample_data.getColumn('track')[r] == 'Doo Wop (That Thing)') {
            if (sample_data.getColumn('original_audio')[r] == 'lauryn_doo_wop_4.mp3') {
              sampled_track_x = sampled_clip_x + ((track_size/2) + 30) + (sample_data.getColumn('track_sample_time')[r])/
              (sample_data.getColumn('end_time')[r]) * track_timeline_width * 1.2;
            }
            else if (sample_data.getColumn('original_audio')[r] == 'lauryn_doo_wop_9.mp3') {
              sampled_track_x = sampled_clip_x + ((track_size/2) - 15) + (sample_data.getColumn('track_sample_time')[r])/
              (sample_data.getColumn('end_time')[r]) * track_timeline_width * 1.2;
            }
            else {
              sampled_track_x = sampled_clip_x + (sample_data.getColumn('track_sample_time')[r])/
              (sample_data.getColumn('end_time')[r]) * track_timeline_width * 1.2;
            }
          }
          else {
            sampled_track_x = sampled_clip_x + (sample_data.getColumn('track_sample_time')[r])/
            (sample_data.getColumn('end_time')[r]) * track_timeline_width;
          }
          
          let sampled_track = new Track(sample_data.getColumn('sampled_title')[r], sample_data.getColumn('sampled_title')[r], 
          sample_data.getColumn('sampled_artist')[r], sample_data.getColumn('sampled_year')[r], sample_data.getColumn('track')[r], 
          album_art[r], sampled_track_audio[r], sampled_track_x, sampled_track_y[sampled_track_position], 
          track_size - 10, track_size - 10, 0, sample_data.getColumn('sampled_time')[r], 0, 0); 
            
          sampled_track_y[sampled_track_position] = sampled_track_y[sampled_track_position] - track_size - track_padding;
          
          if (sample_data.getColumn('track')[r] == switcher_track) {
              sampled_track.highlightByTrack(true);
              sampled_track.hoverTrack();
              
              if (current_track != null) {
                current_track.info_alt();
                fill('white');
                textSize(18);
                text(current_track.title_alt(), description_x, description_y);
                text(current_track.artist(), description_x, description_y + (text_padding));
                text(current_track.sample_time(), description_x, description_y + (text_padding * 2));
              }
          }
        }
      }
    pop(); 
  }
  else {
    textAlign(CENTER);
    textSize(24);
    text("Loading tracks...", WIDE/2, HIGH/2);
    textAlign(LEFT);
  }
}

function Track(track_title, track_title_alt, track_artist, track_year, sampled_track, track_image, 
  sampled_audio, x, y, track_width, track_height, sample_time, sample_time_formatted, end_time, end_time_formatted) { 
  rectMode(CENTER);
  textAlign(CENTER);
  textSize(18);

  description_y = 300;
  description_x = WIDE/2 + 50;
  text_padding = 25;
  
  this.title = function() {
    return track_title;
  }
  
  this.title_alt = function() {
    return track_title_alt;
  }
  
  this.sampled = function() {
    return sampled_track;
  }

  this.sampled_audio = function() {
    return sampled_audio;
  }

  this.x = function() {
    return x;
  }
  
  this.y = function() {
    return y;
  }
  
  this.artist = function() {
    return track_artist;
  }
  
  this.sample_time = function() {
    return sample_time_formatted;
  }
  
  this.track_width = function() {
    return track_width;
  }
  
  this.track_height = function() {
    return track_width;
  }
  
  this.displayTrack = function() {
    fill('white');
    rect(x, y, track_width, track_height);
  }
  
  this.hoverTrack = function() {      
      if (mouseHover(x - (track_width/2), x + (track_width/2), y - (track_height/2), y + (track_height/2))) {
        current_hover = this;
        
        fill('#d9d9d9');
        rect(x, y, track_width, track_height);
        //triangle(x - (track_width/4), y + (track_height/4), x - (track_width/4), y - (track_height/4), x + (track_width/4), y);
      }
  }
  
  this.highlightByTrack = function(highlighted) {
    if (highlighted) {
      fill('#e88a1a');
      rect(x, y, track_width, track_height);
    }
    else {
      fill('white');
      rect(x, y, track_width, track_height);
    }
  }
  
  this.info = function() {      
      fill('#d9d9d9');
      //rect(x, y, track_width, track_height);
      triangle(x - (track_width/4), y + (track_height/4), x - (track_width/4), y - (track_height/4), x + (track_width/4), y);
      
      // show track album cover
      imageMode(CENTER);
      image(track_image, description_x, description_y - (150/2) - text_padding, 150, 150);
      
      // show track description
      fill('white');
      textSize(18);
      text(track_title, description_x, description_y);
      text(track_artist, description_x, description_y + text_padding);
  }
  
  this.info_alt = function() {      
      fill('#d9d9d9');
      triangle(x - (track_width/4), y + (track_height/4), x - (track_width/4), y - (track_height/4), x + (track_width/4), y);
      
      // show track album cover
      imageMode(CENTER);
      image(track_image, description_x, description_y - (150/2) - text_padding, 150, 150);
  }
}

function yearLabels() {
  push();
  let label_x = 300 + track_size;
  let year = 1999;
  for (let i = 0; i < 20; i++) {
    textAlign(CENTER);
    textSize(14);
    noStroke();
    text(year.toString(), label_x + (track_size/2), HIGH - 50);
    label_x = label_x + track_size;
    year++;
  }
  pop();
}

function mouseClicked() {  
  // keep track of which track view was clicked
  if (switcher_track == 'All Tracks') {
    
  }
  else {
    if (switcher == 'Track') {
      if (mouseHover(tab_x + header_image_size + 20, tab_x + header_image_size + 184, 110 - 20, 110 + 20)) {
        switcher = 'Sampled';
      }
    }
    else {
      if (mouseHover(tab_x + header_image_size + 20, tab_x + header_image_size + 184, 110 - 20, 110 + 20)) {
        switcher = 'Track';
      }
    }
  }
  
  // keep track of which lauryn hill sample was clicked
  tab_y = 200;
  for (let i = 0; i < track_names.length; i++) {
    if (mouseHover(tab_x - 10, tab_x + 100, tab_y - 10 + (30 * i), tab_y + (30 * i))) {
      switcher_track = track_names[i];
      switcher = 'Track';
    }
  }
  
  // keep track of which track audio was clicked
  if (current_hover != null) {
    if (mouseHover(current_hover.x() - (current_hover.track_width()/2), current_hover.x() + 
      (current_hover.track_width()/2), current_hover.y() - (current_hover.track_height()/2), current_hover.y() 
      + (current_hover.track_height()/2))) {
      
      current_track = current_hover;
      
      if (current_audio != null && current_audio.isPlaying()) {
        current_audio.stop();
      }

      current_audio = current_track.sampled_audio();

      if (current_audio != null) {
        if (current_audio.isPlaying() == false) {
          if (last_track != current_track.title()) {
            current_audio.play();
            last_track = current_track.title();
          }
          else {
            last_track = null;
          }
        }
      }
    }
    else {
      if (current_audio != null) {
        current_audio.stop();
      }
      
      current_audio = null;
      current_track = null;
    }
  }
}

function mouseHover(x1, x2, y1, y2) {
  if (amouseX() >= x1 && amouseX() <= x2 && amouseY() >= y1 && amouseY() <= y2) {
    return true;
  }
  else {
    return false;
  }
}

// check if audio tracks were loaded
function filesLoaded() {  
  for (i = 0; i < sample_data.getRowCount(); i++) {
    if (sampled_track_audio[i].isLoaded() == false) {
      return false;
    }
  }
  
  for (i = 0; i < lauryn_sampled_clips_data.getRowCount(); i++) {
    if (original_track_audio[i].isLoaded() == false) {
      return false;
    }
  }  
  return true;
}

// take care of resizing window
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function applyAspect() {
  let aspectX = width / WIDE;
  let aspectY = height / HIGH;
  aspectScale = min(aspectX, aspectY);
  let h = floor(aspectScale * HIGH);
  aspectTop = (height - h) / 2;
  let w = floor(aspectScale * WIDE);
  aspectLeft = (width - w) / 2;
  translate(aspectLeft, aspectTop);
  scale(aspectScale, aspectScale);
}

function amouseX() {
  return floor((mouseX - aspectLeft) / aspectScale);
}

function amouseY() {
  return floor((mouseY - aspectTop) / aspectScale);
}
