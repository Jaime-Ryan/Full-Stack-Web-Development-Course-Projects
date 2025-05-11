function bottlesOfBeer() {
    var numberOfBottles = 99;

    while (numberOfBottles >= 1) {
        var bottleWord = numberOfBottles === 1 ? "bottle" : "bottles";
        var nextBottleWord = numberOfBottles - 1 === 1 ? "bottle" : "bottles";

        console.log(
            numberOfBottles + " " + bottleWord + " of beer on the wall, " +
            numberOfBottles + " " + bottleWord + " of beer."
        );

        if (numberOfBottles > 1) {
            console.log(
                "Take one down and pass it around, " +
                (numberOfBottles - 1) + " " +
                (numberOfBottles - 1 === 0 ? "no more bottles" : nextBottleWord) +
                " of beer on the wall."
            );
        } else {
            console.log("Take one down and pass it around, no more bottles of beer on the wall.");
        }

        console.log(""); // Empty line between verses
        numberOfBottles--;
    }

    // Final verse
    console.log(
        "No more bottles of beer on the wall, no more bottles of beer.\n" +
        "Go to the store and buy some more, 99 bottles of beer on the wall."
    );
}
bottlesOfBeer();
