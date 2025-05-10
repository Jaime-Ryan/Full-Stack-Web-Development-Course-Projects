function isLeap(year) {

    if (year % 4 === 0) {
        if (year % 100 === 0) {
            if(year % 400 === 0) {
                return "Leap year.";
            } else {
                return "Not leap year.";
            }
        } else {
            return "Leap year.";
        }
    } else {
        return "Not leap year.";
    }
}

const inputYear = parseInt(prompt("Enter a year:"));
alert(isLeap(inputYear)); // or console.log(isLeap(inputYear));