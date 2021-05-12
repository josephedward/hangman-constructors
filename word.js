var Letter = require("./letter");
var randomWord = require("random-word-by-length");
const chalk = require("chalk");

function Word(word) {
  this.letters = [];
  this.letters = word.split("").map((char) => new Letter(char));
//   console.log(this.letters);
}

Word.prototype.printWord = function () {
  var blnk = " ";
  var displayWord = this.letters.map((char) => char.displayed());
  console.log(displayWord);
  console.log(blnk.repeat(3) + chalk.inverse(displayWord.join("")));
};

Word.prototype.guess = function (character) {
  this.letters.forEach((element) => {
    element.guess(character);
  });
  this.printWord();
};

Word.prototype.guessedCorrectly = function () {
  for (x of this.letters) {
    if (x.isVisible === true) {
      continue;
    } else {
      return false;
    }
  }
  return true;
};

module.exports = Word;
