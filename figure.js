const chalk = require('chalk');


var stickFigure= ['      0      '+"\n"+
                  '     /|\\     '+"\n"+
                  '     / \\     '];

var stickFigArr=["0","/","|","\\","/","\\"];

function displayStickArr(){

var blnk=" ";
// replaceWithBlank(stickFigArr);
console.log(chalk.green(blnk.repeat(6)+stickFigArr[0]));
console.log(chalk.green(blnk.repeat(5)+stickFigArr[1]+stickFigArr[2]+stickFigArr[3]));
console.log(chalk.green(blnk.repeat(5)+stickFigArr[4]+blnk+stickFigArr[5]));

}

// function replaceWithBlank(arr){

//     for (x in arr)
//     {
//     if (arr[x]===undefined)
//     {
//         arr[x]= " ";
//     }
//     }
    
//     // return arr;
// }





function displayFig(){
    console.log(stickFigure.toString());                  
}

                  
//make it into a string when printed 


module.exports={stickFigArr, displayFig, displayStickArr};