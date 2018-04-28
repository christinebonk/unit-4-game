//Define variables

var fighter //fighter object
var myFighterImage //fighter image
var width //width of progress bar
var newHP //HP that changes in battle
var enemyNewHP ////Enemy HP that changes in battle
var enemyWidth //width of enemy progress bar

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
var charmander = new gameCharacter("Charmander", 40, 6, 6, "assets/images/charmander.png", false);
var bellsprout = new gameCharacter("Bellsprout", 120, 10, 10, "assets/images/bellsprout.png", false);
var bullbasaur = new gameCharacter("Bullbasaur", 180, 15, 15, "assets/images/bullbasaur.png");
var jigglypuff = new gameCharacter("Jigglypuff", 150, 10, 2, "assets/images/jigglypuff.png", false);
//Add new characters to array 
var availableCharacters = [charmander, bellsprout, bullbasaur, jigglypuff];

//Create characters in HTML
for (var i=0; i<availableCharacters.length; i++) {
	//Create new div
	var characters = $("<div>");
	//Add class to div
	characters.addClass("character-box");
	//Give div data attribute
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
	//set which character is the fighter
	fighter = ($(this).data("data-player"));
	fighter.isFighter = true;
	newHP = fighter.healthPoints;
	// set which character image is the fighter
	myFighterImage = $(this);
	myFighterImage.appendTo("#fighting-area");
	//set name of character to player name area
	 //move enemies to enemy area
	 $("#waiting-area .character-box").appendTo("#enemy-area");
	 //remove starting screen
	 $("#starting-screen").remove();
});

//Choose an enemy 
$("#enemy-area").on("click", ".character-box", function() {
	//Prevent user from selecting two enemies
	if($("#enemy-fighting-area").is(":empty")) {
		enemy = ($(this).data("data-player"));
		// set which character image is the fighter
		myEnemyImage = $(this);
		//Move enemy to fighting area
		myEnemyImage.appendTo("#enemy-fighting-area");
		$("#user-message").text("Start attacking!")
		enemyNewHP = enemy.healthPoints;
	} else {
		$("#user-message").text("You can only fight one enemy at once!")
	}
});

//Player can attack 
$("#attack").on("click", "button", function() {
	//Opponent loses points
	enemyNewHP = enemyNewHP - fighter.attackPoints;
	//Player gains attack power from attack
	fighter.attackPoints = fighter.attackPoints + fighter.attackPoints;
	//Player loses points from counter-attack
	newHP = newHP - enemy.counterAttack;
	//Calculate progress bar
	width = (((newHP)/fighter.healthPoints)*100) + "%";
	//Update progress bar
	$("#health").css("width",width);
	//Calculate enemy progress bar
	enemyWidth = (((enemyNewHP)/enemy.healthPoints)*100) + "%";
	//Update enemy progress bar
	$("#enemy-health").css("width",enemyWidth);
	//Get rid of enemy if defeated
	if(enemyNewHP <= 0) {
		$("#enemy-fighting-area").empty();
		enemy = "";
		$("#user-message").text("You defeated your enemy!");
	//If attack button is pressed with no enemy, messagse shows to user
	}  else if($("#enemy-fighting-area").is(":empty")) {
		$("#user-message").text("There is no one to attack");
	} 
	if (newHP <= 0) {
	//Player loses if health drops below zero
		$("#user-message").text("You lose");
		$("#fighting-area").empty();
	}
});





	



//Restart game
