let canvas = "";
let context = "";
let score = 0;
let width = 300;
let height = 600; 


function init(){
    canvas = document.getElementById("game-canvas");
    if(canvas.getContext){
        context = canvas.getContext("2d");
        context.strokeRect(0,0,300,600);
    }
}

init();
