//Define variables

var fighter 
var myFighterImage
var width

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
var charmander = new gameCharacter("Charmander", 100, 6, 6, "assets/images/charmander.png", false);
var bellsprout = new gameCharacter("Bellsprout", 120, 10, 10, "assets/images/bellsprout.png", false);
var bullbasaur = new gameCharacter("Bullbasaur", 180, 15, 15, "assets/images/bullbasaur.png");
var jigglypuff = new gameCharacter("Jigglypuff", 150, 10, 2, "assets/images/jigglypuff.png", false);
//Add new characters to array 
var availableCharacters = [charmander, bellsprout, bullbasaur, jigglypuff];

//Create characters in HTML
for (var i=0; i<availableCharacters.length; i++) {
	var fighterImage = $("<img>");
	fighterImage.addClass("character");
	fighterImage.attr("src", availableCharacters[i].gameImage);
	fighterImage.attr("alt", "game character" + [i]);
	fighterImage.data("data-player", availableCharacters[i]);
	$("#waiting-area").append(fighterImage);
}

//Select a fighter
$("#waiting-area").on("click", ".character", function() {
	//set which character is the fighter
	fighter = ($(this).data("data-player"));
	fighter.isFighter = true;
	// set which character image is the fighter
	myFighterImage = $(this);
	myFighterImage.appendTo("#fighting-area");
	 //move enemies to enemy area
	 $("#waiting-area .character").appendTo("#enemy-area");
	 //remove starting screen
	 $("#starting-screen").remove();
});

//Choose an enemy 
$("#enemy-area").on("click", ".character", function() {
	enemy = ($(this).data("data-player"));
	// set which character image is the fighter
	myEnemyImage = $(this);
	//Move enemy to fighting area
	myEnemyImage.appendTo("#enemy-fighting-area");
});

//Player can attack
$("#attack").on("click", "button", function() {
	var originalHP = "";
	//Opponent loses points
	enemy.healthPoints = enemy.healthPoints - fighter.attackPoints;
	console.log("HP" + enemy.healthPoints);
	//Player gains attack power from attack
	fighter.attackPoints = fighter.attackPoints + fighter.attackPoints;
	console.log("AP" + fighter.attackPoints);
	//Player loses points from counter-attack
	fighter.healthPoints = fighter.healthPoints - enemy.counterAttack;
	console.log("My HP" + fighter.healthPoints);
	//Calculate progress bar
	width = (((fighter.healthPoints)/originalHP)*100) + "%";
	console.log("OG" + originalHP)
	$("#health").css("width",width);
	console.log("width " + width)
	// $("#health").

	//Get rid of enemy if defeated
	if(enemy.healthPoints < 0) {
		$("#other-area").empty();
	//If attack button is pressed with no enemy, messagse shows to user
	}if($("#other-area").is(":empty")) {
		console.log("hi");
	}
	

	});





	
	
//If attack button is pressed with no enemy, messagse shows to user

//Player can choose new enemy

//Player loses if health drops below zero

//Restart game
