#!/usr/bin/env node
import inquirer from "inquirer";
import chalk from "chalk";
import chalkAnimation from "chalk-animation";
function animationTimer() {
    return new Promise((resolve) => {
        setTimeout(resolve, 2000);
    });
}
async function guessGame() {
    const rainbow = chalkAnimation.rainbow('_______Welcome to Guess 🧐 Game_______');
    await animationTimer();
    rainbow.stop();
    console.log(chalk.bgGreenBright.red.bold.italic(`                            Autor:"M.B"\n`));
    console.log(chalk.bgGray("Note:Max Score:3---------Max Attempts:3"));
    await checkGuess();
}
guessGame();
async function userInputGuess() {
    const input = await inquirer.prompt([{
            type: "Number",
            name: "userGuess",
            message: "Enter a no to Guess ",
            validate: inputValidator
        }]);
    let userInput = input.userGuess;
    return userInput;
}
function inputValidator(input) {
    if (isNaN(input) || input > 9 || input < 0) {
        return chalk.red.bgCyanBright("please Enter a Number between 0 to 9");
    }
    return true;
}
async function checkGuess() {
    let score = 0;
    let userAttempts = 0;
    let remainingAttempts = 3;
    for (let i = 0; i < 3; i++) {
        let randomNum = Math.floor(Math.random() * 10);
        // console.log(randomNum);    
        const cou = await userInputGuess();
        console.log("\n");
        let count = [randomNum, cou];
        let userValue = count[1];
        let convertUserInputGuessValue = parseInt(`${userValue}`);
        count[1] = convertUserInputGuessValue;
        userAttempts = i;
        if (count[0] === count[1] && userAttempts <= 3) {
            remainingAttempts = remainingAttempts - 1;
            console.log(chalk.bgCyan(`________ you guess it right________`));
            console.log(chalk.green(`^_____^ Your current score :${score += 1}________`));
            if (remainingAttempts === 0) {
                console.log(chalk.bgRed(`_______🤡  Game over  😜________ `));
            }
        }
        else if (userAttempts <= 3 && count[0] !== count[1]) {
            remainingAttempts = remainingAttempts - 1;
            console.log(chalk.bgRed(`________you guess it wrong________`));
            console.log(chalk.green(`^_____^ Your current score :${score}________`));
            if (remainingAttempts === 0) {
                console.log(chalk.bgRed(`_______🤡  Game over  😜________`));
            }
        }
    }
}
