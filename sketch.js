// Skyler Haataja
// 03/05/2023
// Creative Coding 
// Grammars and Text Art
// University of California Santa Cruz
// Descr:  White page that simulates typing on a typewriter with some added quirks.
//
// Input: keyboard
// 
// This work is licensed under a Creative Commons Attribution 3.0 Unported License.
// https://creativecommons.org/licenses/by/3.0/

let fulltext;
let starterText;
let allowed_chars
let pos;
let myText;
let margin;
let getInput;
let userInput;
let back_count;
let activated;
let spam_count;
let Started;
let finale;
let minSize;
let getWord;
let cursedWords;
let allowed_chars2;

function setup() {
  setText();
  minSize = 1;
  starterText = "Type Here";
  finale = false;
  getWord = true;
  allowed_chars = 15;
  pos = 0;
  myText = "";
  getInput = false;
  userInput = "";
  back_count = 0;
  activated = false;
  spam_count = 30;
  Started = false;
  cursedWords = [];
  allowed_chars2 = 50;
  
  key_sfx = loadSound("typewriter-key-1.mp3");
  break_sfx = loadSound("typewriter-line-break-1.mp3");
  myFont = loadFont('JMH Typewriter.otf');
  textFont(myFont);
  createCanvas(400, 550);
  margin = width/10;
  textSize(12);
  
}

function draw() {
  background(220);
  
  if(!Started){
    StartHere();
  }
  else if(finale){
    finaleFunction();
  }
  else{
    text(myText, margin, margin, width - 2*margin , height - 2*margin);
    if(pos == 152){
      getInput = true;
    }
    if(back_count > 4){
      NoBacksies();
    }
  }
  
}

function draw_key(){
  if(pos < fulltext.length - 1){
    key_sfx.rate(random(0.9, 1));
    key_sfx.setVolume(random(0.05,0.1));
    key_sfx.play();
    if(getInput == false){
      myText = myText + fulltext[pos];
      pos++;
    }
    else{
      myText = myText + user_input;
      allowed_chars--;
      if(allowed_chars == 0){
        getInput = false;
        pos++;
      }
    }
  }
  else{
    finale = true;
  }
  
}

function NoBacksies(){
  
  let ms = millis();
  if(back_count < spam_count-5){
    if(activated == false && (ms % 300)>150){
      break_sfx.setVolume(0.6);
      break_sfx.play();
      activated = true;
      back_count++;
      myText = myText + "~~NO BACKSIES~~";
      if(back_count>=spam_count){
        setup();
      }
    }
    else if ((ms % 300)<150){
      activated = false;
    }
  }
  else if(back_count < spam_count){
    if(activated == false && (ms % 1000) > 500){
     switch(back_count){
        case spam_count - 5:
           break_sfx.setVolume(0.4);
          break_sfx.play();
          myText = myText + "\n\nRestarting in:";
          back_count++;
          break;
        case spam_count - 4:
          key_sfx.rate(random(0.9, 1));
          key_sfx.setVolume(random(0.05,0.1));
          key_sfx.play();
          myText = myText + " 3 ";
          back_count++;
          break;
        case spam_count - 3:
          key_sfx.rate(random(0.9, 1));
          key_sfx.setVolume(random(0.05,0.1));
          key_sfx.play();
          myText = myText + " 2 ";
          back_count++;
          break;
        case spam_count - 2:
          key_sfx.rate(random(0.9, 1));
          key_sfx.setVolume(random(0.05,0.1));
          key_sfx.play();
          myText = myText + " 1 ";
          back_count++;
          break;
        default:
          back_count++;
          break;
      }
      activated = true;
    }
    if ((ms % 1000)<500){
      activated = false;
    }
  }
  else {
    setup();
  }
}

function finaleFunction(){
  textSize(12);
  fill(0);
  text(myText, margin, margin, width - 2*margin , height - 2*margin);
  if(getWord){
    if(allowed_chars2 < 0){
      cursedWords.push({ c: user_input , x: random(-margin, width), y: random(0,  height+margin), 
                                                                                      s: random(minSize, minSize+5)});
      minSize++;
    }
    else{
      myText = myText + user_input;
      allowed_chars2--;
    }
    getWord = false;
  }
  
  drawCursedWords();
}

function StartHere(){
    let ms =  millis();
    if(ms % 2000 < 500){
        text(starterText, margin, margin);
    }
    else if (ms % 2000 < 1000){
      text(starterText + " .", margin, margin);
    }
    else if (ms % 2000 < 1500){
      text(starterText + " . .", margin, margin);
    }
    else if (ms % 2000 < 2000){
      text(starterText + " . . .", margin, margin);
    }
}
function keyPressed() {
  if(back_count <= 4){
    if (keyCode === BACKSPACE) {
      break_sfx.setVolume(0.4);
      break_sfx.play();
      myText = myText + "~~NO BACKSIES~~";
      back_count++;
    }
  }
}

function drawCursedWords(){
  for(let i = 0; i< cursedWords.length - 1; i++){
    fill(255,0,0);
    textSize(cursedWords[i].s);
    text(cursedWords[i].c, cursedWords[i].x, cursedWords[i].y);
  }
}
function keyTyped() {
  if(!Started){
    Started = true;
  }
  else if(finale){
    getWord = true;
  }
  if(back_count <= 4){
    user_input = key;
    draw_key();
  }
  
}

function setText(){
  fulltext = "This is a typewriter. This is a typewriter. This is a typewriter. This is a typewriter. NO, this is aaaaaaa script, why can't you write? Let's fix that.  That's it, no more freedom. Just kidding, you were probably writing random keys weren't you. Let's make it more obvious. \n\nType Here: I am a dumb idiot \n\n Wow, I couldn't agree more. \n\n Okay, okay, \n\tTHIS TIME I swear that I will let you type whatever you want: ";
}
