/**
 * Return a random number between 0 and 100
 * @param limit {number}
 * @return {number}
 */
const guessNumber = (limit) => {
    return Math.floor(Math.random() * limit);
};
/**
 * Check if the number is correct
 * @param number {number}
 * @return {boolean}
 */
const checkGuessNumber = (number) => {
    return !isNaN(number);
};
/**
 * Confirm to continue or not
 * @return {boolean}
 */
const continueOrNot = () => {
    return confirm('Voulez-vous continuer ?: (Ok/Non)');
};
/**
 * Check if user input number is equal to the number to guess
 * @param userNumber {number}
 * @param guessNumber {number}
 * @return {boolean}
 */
const winOrLose = (userNumber, guessNumber) => {
    return Math.floor(Number(userNumber)) === guessNumber;
};
/**
 * Return the interval in which the guess number is.
 * @param number
 * @return {string}
 */
const numberInterval = (number) => {
    let value = null;
    if (number > 0 && number < 10) {
        value = "The guess number is between 0 and 10";
    } else if (number >= 10 && number < 20) {
        value = "The guess number is between 10 and 20";
    } else if (number >= 20 && number < 30) {
        value = "The guess number is between 20 and 30";
    } else if (number >= 30 && number < 40) {
        value = "The guess number is between 30 and 40";
    } else if (number >= 40 && number < 50) {
        value = "The guess number is between 30 and 40";
    } else if (number >= 50 && number < 60) {
        value = "The guess number is between 50 and 60";
    } else if (number >= 60 && number < 70) {
        value = "The guess number is between 60 and 70";
    } else if (number >= 70 && number < 80) {
        value = "The guess number is between 70 and 80";
    } else if (number >= 80 && number < 90) {
        value = "The guess number is between 80 and 90";
    } else if (number >= 90 && number < 100) {
        value = "The guess number is between 90 and 100";
    } else {
        value = 'The guess number is out of range';
    }
    return value;
};

function main() {
    let numberToGuess = guessNumber(100);
    let score = 0;
    let playTimes = 0;
    let end = false;
    while (true) {
        let userInput = prompt('Enter a guess Number: ');

        if (userInput === null || !checkGuessNumber(Number(userInput))) {
            alert('Saisie annulée.');
            if (!continueOrNot()) {
                alert("😥😥 Mauvaise saisie.\nLe jeu s'arrête ici... 😒😒");
                end = true;
            }
        }

        playTimes++;
        if (playTimes % 9 === 0) {
            alert("Vous avez joué 10 fois.");
            if (!continueOrNot()) {
                end = true;
                alert("😒😢😒😢\nFin du jeu...");
            }
            alert("Super 😍😍\nVous continuez l'aventure avec nous.");
        }

        if (winOrLose(userInput, numberToGuess)) {
            score += 10;
            alert('You win 10 pts');
            numberToGuess = guessNumber(100);
        } else if (!winOrLose(userInput, numberToGuess)) {
            alert('You loose');
            alert(numberInterval(numberToGuess));
        }
        if (end) {
            break;
        }
    }
    alert(`
        player => No one,
        score => ${score},
        play in ${playTimes} times 
    `);
}

main();