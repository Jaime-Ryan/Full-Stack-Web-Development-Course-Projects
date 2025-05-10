var yourName = prompt("What is your name?");
var crushName = prompt("What is the name of your crush?");

var loveChance = Math.random() * 100;
loveChance = Math.floor(loveChance) + 1;

alert("The chance of love between " + yourName + " and " + crushName + " is: ");

if (loveChance > 70) {
  alert("Your love chance is " + loveChance + "% ❤️ You love each other like Kanye loves Kanye.");
}

if (loveChance > 30 && loveChance <= 70) {
  alert("Your love chance is " + loveChance + "% 🙂 You go together like oil and water.");
}

if (loveChance > 20 && loveChance <= 30) {
  alert("Your love chance is " + loveChance + "% 😐 You love each other somewhat.");
}

if (loveChance <= 20) {
  alert("Your love chance is " + loveChance + "% 💔 You don't love each other, give up.");
}
