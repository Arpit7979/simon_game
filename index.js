var buttonColors = ["red", "blue", "green", "yellow"];

var userClickedPattern = [];
var gamePattern = [];

var started = false;
var level = 0;

$(document).keydown(function(){
    if(!started){
        $("h1").text("Level "+level);
        nextSequence();
        started = true;
    }
})


$(".btn").click(function(event){
    var userChosenColour = event.target.id;
    userClickedPattern.push(userChosenColour);
    
    playSound(userChosenColour);
 
   animatePressed(userChosenColour);
 
   checkAnswer(userClickedPattern.length-1);
 
 });


function checkAnswer (currentLevel){
    if(userClickedPattern[currentLevel]===gamePattern[currentLevel]){
        console.log("Success");
        
        if(userClickedPattern.length===gamePattern.length){
            setTimeout(function(){
                nextSequence();
            }, 1000);
        }
    }else{
        console.log("Failure");
        playSound("wrong");
        $("body").addClass("game-over");
        setTimeout(function() {
            $("body").removeClass("game-over"); 
        }, 200);
        $("h1").text("Game Over, Press Any Key to Restart");
        startOver();
    }
}

function startOver (){
  level = 0;
  started = false;
  gamePattern = [];
}

 


function nextSequence(){
    userClickedPattern = [];
    level++;
    $("h1").text("Level "+level);


    var randomNumber = Math.floor(Math.random()*4);
    var randomChoosenColor = buttonColors[randomNumber];
    gamePattern.push(randomChoosenColor);
    $("#"+randomChoosenColor).fadeOut(100).fadeIn(100);
    playSound(randomChoosenColor);

   
}




function playSound (name){
    var audio = new Audio('sounds/'+ name+'.mp3');
    audio.play();
   }


   function animatePressed(currentColor){
    $("."+currentColor).addClass("pressed");

    setTimeout(function() {
        $("."+currentColor).removeClass("pressed");   
    }, 100);

  }   