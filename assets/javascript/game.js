//Define variables

var fighter 
var myFighterImage

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
var lukeSkywalker = new gameCharacter("Luke Skywalker", 100, 6, 6, "https://images.pexels.com/photos/33044/sunflower-sun-summer-yellow.jpg?auto=compress&cs=tinysrgb&h=350", false);
var obiWan = new gameCharacter("Obi Wan", 120, 10, 10, "https://www.gettyimages.ca/gi-resources/images/Homepage/Hero/UK/CMS_Creative_164657191_Kingfisher.jpg", false);
var darthMaul = new gameCharacter("Darth Maul", 180, 15, 15, "https://media.istockphoto.com/photos/plant-growing-picture-id510222832?k=6&m=510222832&s=612x612&w=0&h=Pzjkj2hf9IZiLAiXcgVE1FbCNFVmKzhdcT98dcHSdSk=");
var darthVader = new gameCharacter("Darth Vader", 150, 10, 2, "https://wallpaperbrowse.com/media/images/soap-bubble-1958650_960_720.jpg", false);
//Add new characters to array 
var availableCharacters = [lukeSkywalker, obiWan, darthVader, darthMaul];

//Create characters in HTML
for (var i=0; i<availableCharacters.length; i++) {
	var fighterImage = $("<img>");
	fighterImage.addClass("character");
	fighterImage.attr("src", availableCharacters[i].gameImage);
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
});

//Choose an enemy 
$("#enemy-area").on("click", ".character", function() {
	enemy = ($(this).data("data-player"));
	console.log(enemy);
	// set which character image is the fighter
	myEnemyImage = $(this);
	//Move enemy to fighting area
	myEnemyImage.appendTo("#other-area");
});

//Player can attack
$("#attack").on("click", "button", function() {
	//Opponent loses points
	enemy.healthPoints = enemy.healthPoints - fighter.attackPoints;
	console.log("HP" + enemy.healthPoints);
	//Player gains attack power from attack
	fighter.attackPoints = fighter.attackPoints + fighter.attackPoints;
	console.log("AP" + fighter.attackPoints);
	//Player loses points from counter-attack
	fighter.healthPoints = fighter.healthPoints - enemy.counterAttack;
	console.log("CA" + fighter.healthPoints);
	
	if(enemy.healthPoints < 0) {
		$("#other-area").empty();
	}

	});





	
	





//When enemy's health is below zero, they are defeated

//If attack button is pressed with no enemy, messagse shows to user

//Player can choose new enemy

//Player loses if health drops below zero

//Restart game
