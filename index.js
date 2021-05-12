var inquirer = require("inquirer");
var Word = require("./word");
var Letter = require("./letter");
var randomWord = require("random-word-by-length");
var figure = require("./figure");
var wd = require("word-definition");
const chalk = require("chalk");

var randWord = ""; // = randomWord(6)
var chances = 6;

function getRandWord() {
  randWord = randomWord(6);
  // console.log(randWord.length);
  if (randWord.length !== 6) {
    getRandWord();
  }

  return randWord;
}

var randWord = getRandWord();
var word = new Word(randWord);

function play() {
  figure.displayStickArr();
  if (chances === 0) {
    endGame();
    return;
  }
  // Ask the user to pick a letter
  inquirer
    .prompt([
      {
        type: "input",
        name: "letterChoice",
        message: "Guess a Letter: ",
      },
    ])
    .then(function (user) {
      word.guess(user.letterChoice);

      if (randWord.indexOf(user.letterChoice) === -1) {
        figure.stickFigArr[chances - 1] = " ";
        chances--;
      }

      if (word.guessedCorrectly() === false) {
        // figure.displayFig();
        play();
      }
      if (word.guessedCorrectly() === true) {
        endGame();
      }
    });

  // Check if the letter is in the word
  // Display the letters guessed so far
  // If not all the letters have been guessed, call `play()` again to re-prompt the user
}

function endGame() {
  console.log("\n" + "Game Complete: ");
  console.log(`${chances} guesses left.`);
  console.log(chalk.red(`Your word was ${randWord}`));
  wd.getDef(randWord, "en", null, function (definition) {
    console.log(definition.definition);
  });
}

play();
// endGame();

module.exports = {getRandWord, play, endGame}