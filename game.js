

var buttonColours=["red", "blue", "green", "yellow"]; //Array Colors

var gamePattern =[]; //GamePattern Array

userClickedPattern = []; //User choice array

var level = 0; //Used to show the level number on the h1 text

var started = true; //Used to validate the beginning of the game

//Checkgin when a Key is pressed
$(document).keydown(function(){

	if (started === true){ //if Key is pressed advance to the sequence and change the value to false in order to avoid game restarting with any other letter.
		nextSequence();
		started=false;
	}

})


//ButtonClicked
$(".btn").click(function(){
	var userChosenColour =(this.id); //Retrieving ID from square clicked and asving it into a var
	
	userClickedPattern.push(userChosenColour); //Pusshing ID into array
	
	playSound(userChosenColour); //Play corresponding sound to the colour
	
	animatePress(userChosenColour); //Adding animation to the ID select by the clicked

//Using Click Pattern length to compare the arrays. I am sustracting one(-1) as arrays memories beggin on zero but if I use just length the first position will be one whiche will screw the whole program
	 checkAnswer(userClickedPattern.length-1);
	
})


function nextSequence(){

	userClickedPattern=[];
	//Creating Random Number
	var randomNumber = Math.floor((Math.random()*4)); 
	
	//Creating a variable which will store the color using a random number from previous function "randomNumber"
	var randomChosenColour = buttonColours[randomNumber];
	
	//Pushing new color to the gamePattern array
	gamePattern.push(randomChosenColour); 


	//Finding ID from randomSelector to set animation
	$("#"+randomChosenColour).fadeOut(100).fadeIn(100);

	playSound(randomChosenColour); //Play correct sound for each box
	
	level++;
	$("h1").text("Level " + level) //Changing text according to the level
	
}

function playSound(name){

		//Setting audio to each color;
		var audio = new Audio("sounds/" + name +".mp3");
		audio.play();

}

function animatePress(currentColour){
	$("#"+currentColour).addClass("pressed"); //Adding Class when box is pressed
	
	//Removing class after 100 milliseconds
	setTimeout(function(){
		$("#"+currentColour).removeClass("pressed");
	}  ,100)
}

function checkAnswer(currentLevel){

	//Going into the array position in [currentLevel]. This will compare one by one both arrays and will be adding up while the user keep clicking boxes
	//until the next condition is reach which is both arrays having the same length. This will trigger a new sequence which will restart the user choices array(userClickedPattern)

	
	if (gamePattern[currentLevel] === userClickedPattern[currentLevel]){ 

		if(userClickedPattern.length === gamePattern.length){
			setTimeout(function () {
				nextSequence();
			  }, 1000);

		}
	}

	else{//Addig game over sound alone with the loser text

		var audio = new Audio ("sounds/wrong.mp3");
		audio.play();


		//Changing classes to game over and removing it after 200ms
		$("body").addClass("game-over");
		setTimeout(function(){
			$("body").removeClass("game-over");
		},200);

		//New h1 text
		$("h1").text("Game Over, Press Any Key to Restart");
		

		//Calling restarting function
		startOver();
	}

}

//Reseting the values to be able to restart the game.

function startOver(){
	level = 0;
	gamePattern =[];
	started = true;
}
