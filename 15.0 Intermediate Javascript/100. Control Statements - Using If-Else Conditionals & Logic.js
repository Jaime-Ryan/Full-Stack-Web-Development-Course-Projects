var yourName = prompt("What is your name?");
var crushName = prompt("What is the name of your crush?")

var loveChance = Math.random() * 100;
loveChance = Math.floor(loveChance) +1;

alert("The chance of love between " + yourName + " and " + crushName + " is " + loveChance + "%");

if (loveChance > 70) {
    alert("Your love chance is " + loveChance + "%" + "You love each other like Kanye loves Kanye.");
} else {
    alert("Your love chance is " + loveChance + "%");
}