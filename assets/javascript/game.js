//Define variables

var fighter //fighter object
var myFighterImage //fighter image
var width //width of progress bar
var newHP //HP that changes in battle
var enemyNewHP ////Enemy HP that changes in battle
var enemyWidth //width of enemy progress bar
var newAP //AP that changes in battle

//Game character object 
function gameCharacter(name, hP, aP, cA, gImg) {
	this.name = name;
	this.healthPoints = hP;
	this.attackPoints = aP;
	this.counterAttack = cA;
	this.gameImage = gImg; 
	this.isFighter = false;
}

//Create new characters 
var charmander = new gameCharacter("Charmander", 100, 15, 10, "assets/images/charmander.png", false);
var bellsprout = new gameCharacter("Bellsprout", 120, 13, 15, "assets/images/bellsprout.png", false);
var bullbasaur = new gameCharacter("Bullbasaur", 200, 5, 30, "assets/images/bullbasaur.png");
var jigglypuff = new gameCharacter("Jigglypuff", 150, 10, 25, "assets/images/jigglypuff.png", false);
//Add new characters to array 
var availableCharacters = [charmander, bellsprout, bullbasaur, jigglypuff];

//Create characters in HTML
for (var i=0; i<availableCharacters.length; i++) {
	//Create new div
	var characters = $("<div>");
	//Add class to div
	characters.addClass("character-box");
	//Give div data attribute of character
	characters.data("data-player", availableCharacters[i]);
	//Create new image
	var fighterImage = $("<img>");
	//Give image class
	fighterImage.addClass("character");
	//Give image src attribute
	fighterImage.attr("src", availableCharacters[i].gameImage);
	//Give image alt text
	fighterImage.attr("alt", "game character" + [i]);
	//Append fighter image to div
	characters.prepend(fighterImage);
	//Generated character health
	var characterHealth = $("<p>");
	characterHealth.text(availableCharacters[i].healthPoints + " HP");
	//Generate character name
	var characterName = $("<h3>");
	characterName.text(availableCharacters[i].name);
	//Add name and health to div
	characters.append(characterName);
	characters.append(characterHealth);
	//Put the divs in the waiting area
	$("#waiting-area").prepend(characters);
}

//Select a fighter
$("#waiting-area").on("click", ".character-box", function() {
	//set the fighter object from the selected element
	fighter = ($(this).data("data-player"));
	//Give the object a value of "isFighter" true
	fighter.isFighter = true;
	//Set new HP & AP to change in battle
	newHP = fighter.healthPoints;
	newAP = fighter.attackPoints;
	// Set which character element is the fighter
	myFighter = $(this);
	// Move the character element to the fighting area
	myFighter.appendTo("#fighting-area");
	//set name of character to player name area
	 //move enemies to enemy area
	 $("#waiting-area .character-box").appendTo("#enemy-area");
	 //remove starting screen
	 $("#starting-screen").remove();
	 //remove health points from character
	 $("#fighting-area p").remove(":contains('HP')" );
	 //add health points to progress bar
	 $("#health").append(fighter.healthPoints + " HP");
	 //pause starting music
	 $(".starting-screen").trigger("pause");
	 //start battle music
	 $(".battle-screen").trigger("play");
});

//Choose an enemy 
$("#enemy-area").on("click", ".character-box", function() {
	//Prevent user from selecting two enemies
	if($("#enemy-fighting-area").is(":empty")) {
		enemy = ($(this).data("data-player"));
		// set which character image is the fighter
		myEnemy = $(this);
		//Move enemy to fighting area
		myEnemy.appendTo("#enemy-fighting-area");
		$("#user-message").text("Start attacking!")
		enemyNewHP = enemy.healthPoints;
		//Reset health bar to 100%
		$("#enemy-health").css("width", "100%");
		//remove health points from character
	 	$("#enemy-fighting-area p").remove(":contains('HP')" );
	 	//add health points to progress bar
	 	$("#enemy-health").append(enemy.healthPoints + " HP");
	} else {
		$("#user-message").text("You can only fight one enemy at once!")
	}
});

//Player attacks
$("#attack").on("click", "button", function() {
	//If attack button is pressed with no enemy, messagse shows to user
	if($("#enemy-fighting-area").is(":empty")) {
		$("#user-message").text("There is no one to attack");
	} else {
		//Opponent loses points
		enemyNewHP = enemyNewHP - newAP;
		//Player loses points from counter-attack
		newHP = newHP - enemy.counterAttack;
		//Display attack
		$("#user-message").text(fighter.name + " hit " + enemy.name + " for " + newAP + " damage and " + enemy.name + " hit back with " + enemy.counterAttack + " damage")
		//Calculate progress bar
		width = (((newHP)/fighter.healthPoints)*100) + "%";
		//Update progress bar
		$("#health").css("width",width);
		//Updated HP
		$("#health").text(newHP + " HP");
		//Calculate enemy progress bar
		enemyWidth = (((enemyNewHP)/enemy.healthPoints)*100) + "%";
		//Update enemy progress bar
		$("#enemy-health").css("width",enemyWidth);
		//Updated HP
		$("#enemy-health").text(enemyNewHP + " HP");
		//Player gains attack power from attack
		newAP = newAP + fighter.attackPoints;
	}
	//Get rid of enemy if defeated
	if(enemyNewHP <= 0) {
		//empty fighting area
		$("#enemy-fighting-area").empty();
		//reset enemy
		enemy = "";
		//reset health
		$("#enemy-health").text("");
		//update onscreen message
		$("#user-message").text("You defeated your enemy!");
		//check if anymore enemies left
		if($("#enemy-area").is(":empty")) {
			console.log("hi")
			$("#user-message").text("You Win!");
			//pause starting music
			 $(".victory-screen").trigger("play");
			 //start battle music
			 $(".battle-screen").trigger("pause");
		} 
	} 
	if (newHP <= 0) {
	//Player loses if health drops below zero
		$("#user-message").text("You lose");
		$("#fighting-area").empty();
		$("#health").text("");
		fighter = "";
		newAP = "";
	}
});

//Restart game
