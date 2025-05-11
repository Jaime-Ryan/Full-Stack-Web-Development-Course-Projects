var guestList = ["Angela", "Jack", "Pam", "James", "Lara", "Jason"];

var userName = prompt("What is your name?");

if (guestList.includes(userName)) {
  alert("Welcome " + userName + ", you are invited to the party!");
} else {
  alert("Sorry " + userName + ", you are not on the guest list.");
}