var randomNumber1 = Math.floor(Math.random() * 6) + 1;
var randomDiceImage = "dice" + randomNumber1 + ".png";
var randomImageSource = "./images/" + randomDiceImage; // Full path to image

var image1 = document.querySelector(".img1"); // Select the left dice image element
image1.setAttribute("src", randomImageSource);

var randomNumber2 = Math.floor(Math.random() * 6) + 1;
var randomDiceImage2 = "dice" + randomNumber2 + ".png";
var randomImageSource2 = "./images/" + randomDiceImage2;

var image2 = document.querySelector(".img2"); // Select the right dice image element
image2.setAttribute("src", randomImageSource2);

// Select the h1 element
var heading = document.querySelector("h1");

// Update the heading based on which player wins or if it's a draw
if (randomNumber1 > randomNumber2) {
  heading.textContent = "🚩 Player 1 Wins!";
} else if (randomNumber2 > randomNumber1) {
  heading.textContent = "Player 2 Wins! 🚩";
} else {
  heading.textContent = "Draw!";
}

console.log(randomNumber1, randomNumber2);