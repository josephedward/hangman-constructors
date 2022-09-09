const inquirer = require("inquirer");
const randomWord = require("random-word-by-length");
const wd = require("word-definition");
const chalk = require("chalk");
const readline = require("readline");
const axios = require("axios").default;

play();

function play() {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  //use readline to ask the user how long they want the word to be
  rl.question(`Welcome to Hangman! Press Enter to Play:`, () => {
    let randWord = getRandomWord().then((res) => {
      let word = res.data[0];
      let user = new User(word);
      hangMan(user);
    });
  });
}

function getRandomWord() {
  return axios.get("https://random-word-api.herokuapp.com/word?length=6");
}

class User {
  constructor(randomWord) {
    this.randomWord = new Word(randomWord);
    this.letterArray = Array.from(
      Object.values(this.randomWord.letters),
      (letter) => letter.char
    );
    this.chances = this.randomWord.letters.length;
    this.guessedLetters = [];
    this.stickFigArr = ["0", "/", "|", "\\", "/", "\\"];
    this.word = this.letterArray.join("");
  }
}

function hangMan(user) {
  //   console.log("user hangMan: ", user);
  console.log(chalk.red(`${user.chances} guesses left.`));
  displayStickArr(user);
  if (user.chances == 0) {
    endGame(user);
    return;
  }
  inquirer
    .prompt([
      {
        type: "input",
        name: "letterChoice",
        message: "Guess a Letter: ",
      },
    ])
    .then(function (hangingMan) {
      user.randomWord.guess(hangingMan.letterChoice);

      const letterArray = Array.from(
        Object.values(user.randomWord.letters),
        (letter) => letter.char
      );
      //   console.log("letterArray : ",letterArray);
      if (letterArray.indexOf(hangingMan.letterChoice) == -1) {
        console.log("Incorrect");
        //test if already in guessed letters
        if (user.guessedLetters.indexOf(hangingMan.letterChoice) == -1) {
          user.guessedLetters.push(hangingMan.letterChoice);
        } else {
          console.log("You already guessed that letter");
          hangMan(user);
        }
        user.stickFigArr[user.chances - 1] = " ";
        user.chances--;
      }

      if (user.randomWord.guessedCorrectly() == false) {
        // figure.displayFig();
        hangMan(user);
      }
      if (user.randomWord.guessedCorrectly() == true) {
        endGame(user);
      }
    });
}

function displayStickArr(user) {
  let stickFigArr = user.stickFigArr;
  var blnk = " ";
  console.log(chalk.green(blnk.repeat(6) + stickFigArr[0]));
  console.log(
    chalk.green(
      blnk.repeat(5) + stickFigArr[1] + stickFigArr[2] + stickFigArr[3]
    )
  );
  console.log(
    chalk.green(blnk.repeat(5) + stickFigArr[4] + blnk + stickFigArr[5])
  );
  user.randomWord.printWord(user);
  console.log("Guessed Letters : ", user.guessedLetters);
}

class Word {
  constructor(word) {
    this.letters = word.split("").map((char) => new Letter(char));
  }
  // endGame();
  guess(character) {
    // console.log("character : ", character);
    // console.log("this.letters : ", this.letters);
    this.letters.forEach((x) => {
      x.guess(character);
    });
    this.printWord();
  }
  printWord(user) {
    // console.log("user in printWord: ", user);
    const blnk = " ";
    let displayWord = [];
    displayWord = this.letters.map((x) => {
      return x.displayed();
    });
    console.log(blnk.repeat(3) + chalk.inverse(displayWord.join("")));
  }
  guessedCorrectly() {
    // console.log("this.letters : ", this.letters);
    for (let x of this.letters) {
      if (x.isVisible == true) {
        continue;
      } else {
        return false;
      }
    }
    return true;
  }
}

class Letter {
  constructor(char) {
    this.char = char; //should this be the default?
    this.isVisible = false;
  }
  displayed() {
    if (this.isVisible == false) {
      return "*";
    } else {
      return this.char;
    }
  }
  guess(character) {
    if (character == this.char) {
      this.isVisible = true;
    }
  }
}

function endGame(user) {
  console.log("\n" + "Game Complete: ");
  console.log("Your word was ", chalk.bgMagenta.bold(user.word));
  wd.getDef(user.word, "en", null, function (definition) {
    // test if definition is undefined
    if (definition.definition == undefined) {
      console.log("No definition found! ");
    } else {
      console.log(chalk.yellow.underline.bold(definition.definition));
    }
  });
}
