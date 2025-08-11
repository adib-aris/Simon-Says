var gamePattern = [];
var userClickPattern = 0;
var level = 0;
var highestLevel = level;

var buttonColours = ["red", "blue", "green", "yellow"];
var randomChosenColour;

var sound;

var userChosenColour;

$(".btn").on("pointerup", firstRun);

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
  randomChosenColour = randomNumber;
  gamePattern.push(randomChosenColour);
  console.log("Game pattern: " + gamePattern);
  simonSays(0);
}

function simonSays(counter) {
  var color;
  if (counter < level) {
    color = buttonColours[gamePattern[counter]];
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
  sound = new Audio("sounds/" + name + ".mp3");
  sound.play();
}

function animatePress(currentColour) {
  $("#" + currentColour).addClass("pressed");
  setTimeout(function () {
    $("#" + currentColour).removeClass("pressed");
  }, 100);
}

function checkAnswer(currentColour) {
  if (currentColour == buttonColours[gamePattern[userClickPattern - 1]]) {
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
    playSound("wrong");
    userClickPattern = 0;
  }
}
