//var name = "Angela";
//name = name.toUpperCase();
//name = name.toLowerCase();

var name = prompt("What is your name?");
var capitalizedName = name.slice(0,1).toUpperCase() + name.slice(1).toLowerCase();
alert("Hello " + capitalizedName);
