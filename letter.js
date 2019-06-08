var inquirer = require('inquirer'); //will need to use here? 
const chalk = require('chalk');
var figure=require("./figure");


function Letter(char) {

     this.char=char;//should this be the default? 
   this.isVisible=false;
   
}
    Letter.prototype.displayed=function(){
        if(this.isVisible===false)
        {
            return "*";
        }
        else{
            return this.char;
        }
    }
 



Letter.prototype.guess=function(character){

if(character===this.char)
{
    this.isVisible=true;
}

}





module.exports = Letter;
