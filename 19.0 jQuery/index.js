$("h1").addClass("big-title margin-50");


/*$("button").text("Don't Click Me");
$("button").html("<em>Hey</em>");
*/

$("h1").click(function() {
    $("h1").css("color", "purple");
    $("h1").css("font-size", "5rem");
    });


/* Vanilla JS
for (var i = 0; i<5; i++) {
    document.querySelectorAll("button")[i].addEventListener("click", function() {
      document.querySelector("h1").style.color = "purple";
    });
}

$("button").click(function() {
    $("h1").css("color", "purple");
    $("h1").css("font-size", "5rem");
});

$(document).keypress(function(event) {
    $("h1").text(event.key); // Change the h1 text to the key pressed
});


$("h1").on("mouseover",  function() {
    $("h1").css("color", "purple");
    $("h1").css("font-size", "5rem");
});



$("button").on("click", function() {
    $("h1").fadeToggle();
});



$("button").on("click", function() {
    $("h1").animate({opacity: 0.5});
});

*/

$("button").on("click", function() {
    $("h1").slideUp().slideDown().animate({opacity: 0.5});
});