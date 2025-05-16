// 3. Array of button colours
var buttonColours = ["red", "blue", "green", "yellow"];

// 5. Empty array to store the game pattern
var gamePattern = [];

// 1. Create the nextSequence function
function nextSequence() {
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
  var audio = new Audio("sounds/" + randomChosenColour + ".mp3");
  audio.play();
}

// Call nextSequence to test
nextSequence();