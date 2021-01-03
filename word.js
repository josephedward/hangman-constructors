var Letter = require('./letter');
var randomWord = require('random-word-by-length');
const chalk = require('chalk');

function Word(word) {
    
    this.letters=[];    

        for(x of word.split(""))
        {
            this.letters.push(new Letter(x));//needs toString or charAt? 
        }
    
}

  Word.prototype.printWord=function(){
    var blnk=" ";    
    var displayWord=[];
    for (x of this.letters)
        {
            displayWord.push(x.displayed());
        }
        // console.log(displayWord);
        console.log(blnk.repeat(3)+chalk.inverse(displayWord.join("")));
    }


    Word.prototype.guess=function(character){
        for (x of this.letters)
        {
            x.guess(character);
            
        }
        this.printWord();
    }

    
    Word.prototype.guessedCorrectly=function(){
        for(x of this.letters)
        {
            if(x.isVisible===true)
            {continue;}
            else{
            return false;
        }
    }
    return true;
        
    }





module.exports = Word;
