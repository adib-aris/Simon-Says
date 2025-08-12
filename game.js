var gamePattern = [];
var userClickPattern = 0;
var level = 0;
var highestLevel = level;

var buttonColours = ["red", "blue", "green", "yellow"];
var randomChosenColour;


// 0 = Red, 1 = Blue, 2 = Green, 3 = Yellow


var sounds = [new Audio("sounds/red.mp3"), new Audio("sounds/blue.mp3"), new Audio("sounds/green.mp3"), new Audio("sounds/yellow.mp3"), new Audio("sounds/wrong.mp3")];

var userChosenColour;

$(".btn").on("pointerup", firstRun);
$(".container").on('touchstart', preventZoom);

function firstRun() {
    if (level < 1) {
      level++;
      $("#level-title").html("Level " + level);
      setTimeout(nextSequence, 1000);
    }
    $(".btn").off("pointerup", firstRun);
}

function nextSequence() {
  $("#level-title").html("Level " + level);
  var randomNumber = Math.floor(Math.random() * 4);
//  randomChosenColour = randomNumber;
  gamePattern.push(randomNumber);
  console.log("Game pattern: " + gamePattern);
  simonSays(0);
}

function simonSays(counter) {
  var color;
  if (counter < level) {
    //color = buttonColours[gamePattern[counter]];
    color = gamePattern[counter];
    animatePress(color);
    playSound(color);
    counter++;
    setTimeout(simonSays, 500, counter);
  } else {
    $(".btn").on("pointerup", userInput);
  }
}

function userInput() {
  userChosenColour = $(this).attr("id");
  animatePress(userChosenColour);
  userClickPattern++;
  checkAnswer(userChosenColour);
}

function playSound(name) {
  if (!sounds[parseInt(name)].paused) {
    let sound = new Audio("sounds/" +buttonColours[name] +".mp3");
    sound.play();
  }
  sounds[parseInt(name)].play();
}

function animatePress(currentColour) {
  $("#" + currentColour).addClass("pressed");
  setTimeout(function () {
    $("#" + currentColour).removeClass("pressed");
  }, 100);
}

function checkAnswer(currentColour) {
  if (currentColour == gamePattern[userClickPattern - 1]) {
    console.log("Current color: " + currentColour);
    console.log("Line 63: " + buttonColours[gamePattern[userClickPattern - 1]]);

    console.log("Userclick pattern: " + userClickPattern);
    console.log("Array length: " + gamePattern.length);

    playSound(userChosenColour);
    if (userClickPattern == gamePattern.length) {
      $("#level-title").html("Correct!");
      level++;
      userClickPattern = 0;
      $(".btn").off("pointerup", userInput);
      setTimeout(nextSequence, 1500);
    }
  } else {
    if (highestLevel < level) highestLevel = level;
    $("#level-title").html(
      "Game Over! Your level: " +
        level +
        "<br>Highest level: " +
        highestLevel +
        "<br>Press any key to play again."
    );
    $(".btn").off("pointerup", userInput);
    $(".btn").on("pointerup", firstRun);
    level = 0;
    gamePattern = [];
    playSound("4");
    userClickPattern = 0;
  }
}




function preventZoom(e) {
  var t2 = e.timeStamp;
  var t1 = e.currentTarget.dataset.lastTouch || t2;
  var dt = t2 - t1;
  var fingers = e.touches.length;
  e.currentTarget.dataset.lastTouch = t2;

  if (!dt || dt > 500 || fingers > 1) return; // not double-tap

  e.preventDefault();
  e.target.click();
}
