//Define variables

var fighter 

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
var darthVader = new gameCharacter("Darth Vader", 150, 2, 2, "https://wallpaperbrowse.com/media/images/soap-bubble-1958650_960_720.jpg", false);
//Add new characters to array 
var availableCharacters = [lukeSkywalker, obiWan, darthVader, darthMaul];

//Create characters in HTML
for (var i=0; i<availableCharacters.length; i++) {
	var fighterImage = $("<img>");
	fighterImage.addClass("character");
	fighterImage.attr("src", availableCharacters[i].gameImage);
	fighterImage.data("player", availableCharacters[i]);
	$("#waiting-area").append(fighterImage);
}

//Select a fighter
$("#waiting-area").on("click", ".character", function() {
	fighter = ($(this).data("player"));
	fighter.isFighter = true;
	fighterImage.appendTo("#fighting-area");
	console.log(availableCharacters);
	 //move enemies to enemy area
	 $("#waiting-area").appendTo("#enemy-area");

});


// var selectCharacter = function() {
// 		$("#waiting-area").on("click", ".character", function() {
// 		fighter = lukeSkywalker;
// 		fighterImage = $("#character1");
// 		console.log(fighter);
// 	}).on("click", "#character2", function() {
// 		fighter = obiWan;
// 		fighterImage = $("#character2");
// 		console.log(fighter);
// 	}).on("click", "#character3", function() {
// 		fighter = darthVader;
// 		fighterImage = $("#character3");
// 		console.log(fighter);
// 	}).on("click", "#character4", function() {
// 		fighter = darthMaul;
// 		console.log(fighter);
// 		fighterImage = $("#character4");
// 	}).on("click",".character",function() {
// 		fighterImage.prependTo("#fighting-area");
// 	});
// }

// selectCharacter();






//Move fighter to fighting area

//Rest of the characters become enemies

//Choose an enemy 

//Move enemy to fighting area

//Player can attack


	
	//Player gains attack power from attack

//Opponent loses points

//Player loses points from counter-attack

//When enemy's health is below zero, they are defeated

//If attack button is pressed with no enemy, messagse shows to user

//Player can choose new enemy

//Player loses if health drops below zero

//Restart game
