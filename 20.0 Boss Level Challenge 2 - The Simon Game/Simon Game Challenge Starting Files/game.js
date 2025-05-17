// 3. Array of button colours
var buttonColours = ["red", "blue", "green", "yellow"];

// 5. Empty array to store the game pattern
var gamePattern = [];

// 3. Create an empty array to store the user's pattern
var userClickedPattern = [];

// 2. Create a new variable called level and start at level 0
var level = 0;
// Variable to track if the game has started
var started = false;

// 1. Detect keypress to start the game
$(document).keydown(function() {
  if (!started) {
    $("#level-title").text("Level " + level); // 3. Update h1 to say Level 0
    nextSequence();
    started = true;
  }
});

// 1. Create the nextSequence function
function nextSequence() {
  // 4. Increase the level by 1 every time nextSequence() is called
  level++;
  // 5. Update the h1 with the new level
  $("#level-title").text("Level " + level);

  // 2. Generate a random number between 0 and 3
  var randomNumber = Math.floor(Math.random() * 4);
  // 4. Select a random colour from buttonColours
  var randomChosenColour = buttonColours[randomNumber];
  // 6. Add the randomChosenColour to the end of gamePattern
  gamePattern.push(randomChosenColour);

  // 1. Use jQuery to select the button with the same id as randomChosenColour
  $("#" + randomChosenColour)
    // 2. Animate a flash to the button
    .fadeOut(100).fadeIn(100);

  // 3. Play the sound for the button colour
  playSound(randomChosenColour);
}

function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

function animatePress(currentColour) {
  // 3. Add the 'pressed' class to the button
  $("#" + currentColour).addClass("pressed");
  // 4. Remove the 'pressed' class after 100 milliseconds
  setTimeout(function() {
    $("#" + currentColour).removeClass("pressed");
  }, 100);
}

// 1. Create a new function called checkAnswer()
function checkAnswer(currentLevel) {
  if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
    if (userClickedPattern.length === gamePattern.length) {
      setTimeout(function() {
        nextSequence();
      }, 1000);
      userClickedPattern = [];
    }
  } else {
    // Play the wrong sound
    playSound("wrong");
    // Add the 'game-over' class to the body
    $("body").addClass("game-over");
    // Remove the 'game-over' class after 200ms
    setTimeout(function() {
      $("body").removeClass("game-over");
    }, 200);
    // Change the h1 title
    $("#level-title").text("Game Over, Press Any Key to Restart");
    // Reset game state
    startOver();
  }
}

function startOver() {
  level = 0;
  gamePattern = [];
  started = false;
  userClickedPattern = [];
}

// jQuery to detect when any button is clicked
$(".btn").click(function() {
  // 2. Store the id of the button that got clicked
  var userChosenColour = $(this).attr("id");
  // 4. Add the user's chosen colour to the userClickedPattern array
  userClickedPattern.push(userChosenColour);
  playSound(userChosenColour); // Play sound on button click
  animatePress(userChosenColour); // Animate button press
  // 2. Call checkAnswer with the index of the last answer
  checkAnswer(userClickedPattern.length - 1);
  // Log to verify
  // console.log(userClickedPattern);
});