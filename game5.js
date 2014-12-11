//
//Setting global variables.
//

//currLoc is a global variable that determines the initial location.
var currLoc=0;
//countzero is a global variable created to determine whether the player has never been in room zero.
var countzero  = false;
//countone is a global variable created to determine whether the player has never been in room one.
var countone  = false;
//counttwo is a global variable created to determine whether the player has never been in room two.
var counttwo  = false;
//countthree is a global variable created to determine whether the player has never been in room three.
var countthree  = false;
//countfour is a global variable created to determine whether the player has never been in room four.
var countfour = false;
//countfive is a global variable created to determine whether the player has never been in room five.
var countfive = false;
//countsix is a global variable created to determine whether the player has never been in room six.
var countsix = false;
//countseven is a global variable created to determine whether the player has never been in room seven.
var countseven = false;
//counteight is a global variable created to determine whether the player has never been in room eight.
var counteight = false;
//countnine is a global variable created to determine whether the player has never been in room nine.
var countnine = false;
//countten is a global variable created to determine whether the player has never been in room ten.
var countten = false;
//score is a global variable representing the score of the player.
var score=0;
//navigationErrorCount is a global variable created to keep track of the amount of "mistakes" that the player commits.
var navigationErrorCount = 0;
//sarcasmThreshold is a global variable created to establish a total amount of "mistakes". When the amount of mistakes is reached, the game will "get sassy".
var sarcasmThreshold = 5;
//itemCount is a global variable created to keep track of the amount of items gathered by the player.
var itemCount=0;
//dogLoc is a global variable created to keep track of the dog's Location.
var dogLoc=3;
//ghost is a global variable created to keep track of the status ghost.
var ghost=false;
//north is a global variable created to assign a number to North.
var north = 0;
//south is a global variable created to assign a number to South.
var south = 1;
//west is a global variable created to assign a number to West.
var west = 2;
//east is a global variable created to assign a number to East.
var east = 3;
//gameOver is a global variable created to keep track of the error of the player
var gameOver = 0;
//completeStage is a global variable created to keep track of the stages in the CompLab.
var completeStage=-1;
//bag is a global variable (array) created to store the items in the player's inventory.
var bag= [];
//scrollSpawned is a global variable created to keep track of the fact that scroll haven't been spawned yet.
var scrollSpawned = 0;
//finished is a global variable created to keep track of the fact that the player finished the game.
var finished = 0;
//locArray is a global array that stores the locations.
var locArray = [];
//nav is a global array that stores the directions (with IDs) of the rooms
var nav = [//N  S   E  W
			[7,1,-1,6], // 0
			[0,-1,2,8], // 1
			[5,3,4,1], // 2
			[2,-1,-1,-1], //3
			[-1,-1,-1,2], //4
			[-1,2,-1,-1], //5
			[-1,-1,0,-1], //6
			[-1,0,10,-1], //7
			[-1,9,1,-1], //8
			[8,-1,-1,-1], //9
			[-1,-1,-1,7], //10
			];
//understandScroll is a global variable that keeps track of the different stages of the Scroll.
var understandScroll=-1;
			
function Victory () { //Victory() takes no parameter. It displays when, in the location 2, going South, the player is able to win. The player wins when he/she satisfies all the requirements.
	if(itemCount<6) {
		dispMsg ("You haven't collected all the items. \n\n\n");
	} else {
		if(dogLoc===3) {	
			dispMsg ("A dog is barking outside. You cannot leave or people will find you. \n\n\n");
		} else {
			if(ghost!=true) {
				dispMsg ("There is a sort of magic, it doesn't let you open the door.");
			}
		}
	}
	if(ghost===true && itemCount>=6 && dogLoc!=3) {
		return 'end';
	}	
}

function tutorial() { //Function tutorial() displays the message that explains the gameplay, to the second text area.
	scrollUp();
	dispMsgSecond("--Tutorial--\n To move through the Map you can:\n   -Use the buttons below.\n   -Type 'n', 's', 'w', or 'e'\n    in the Command Box and click\n    the 'Go' button.\n   -Use the WASD Box to use WASD.\n Go find all the items in order\n  to escape! \n R: To take | SpaceBar: To search\n X: To show the Inventory\n--/Tutorial-- \n \n \n");
}

function locat (newid) { //function locat(newid) takes a parameter, and it is the class for the rooms. It tells the basic attributes of every room.
	this.id = newid;
	this.name = "Room";
	this.description = "It is a room.";
	this.item = "No items.";
	this.toString = function() {
                                 return this.description +
										this.item;
                   }

}

function item () { //function item() takes no parameter, and it is the class for the items. It tells the basic attributes of every item.
	this.name = "Item";
	this.description = " ";
	this.toString = function() {
								return this.name;
								}
}

// These items are outside because they have to be global, they spawn into the room only in a certain case.
var scroll = new item();
scroll.name = " Scroll";

var rune = new item();
rune.name = " Rune";
rune.description = "The Rune says:\n Live the green again, move the\n animal and obtain the spirit.\n Spiderman will then be evil,\n remember!";

var flashdrive = new item();
flashdrive.name = " Flashdrive";

function init(){ //init() function takes no parameter. It is the initial function that starts to work as soon as the page is opened, thanks to onload in the body tag in the HTML part of the program. It creates the instances of the rooms and the items.
	
	var knife = new item ();
	knife.name = " Knife";
	
	var hammer = new item();
	hammer.name = " Hammer";
	
	var mirror = new item();
	mirror.name = " Pieces of Mirror";
	
	var remote = new item();
	remote.name = " Remote Controller";
	
	var points = new item();
	points.name = " Bonus Points";
	
	var note = new item();
	note.name = " Note";
	note.description = "The Note says:\nGet four and live the green again.";
	
	var theKitchen = new locat(0);
	theKitchen.description = "You find yourself in a dark kitchen. Soft light is coming through the window, it is the moonlight. You are still tired and it is hard to see around you. There is a table with what seems to be a knife on it. \n\n"
	theKitchen.name="Kitchen";
	theKitchen.item = knife;
	locArray.push(theKitchen);
	dispMsg("Your name is John. You wake up in the middle of the night and you don't remember anything about your past. You are in a dark house and you have to find a way out of there. Let's go!\n[Starting from: Kitchen]");
	
	var theBathroom = new locat(1);
	theBathroom.description = "You enter a dark bathroom. The pavement is extremely wet and slippery. There is a broken mirror on the side. Shards of glass are spread throughout the ground. \n \n \n \n";
	theBathroom.name="Bathroom";
	theBathroom.item = mirror;
	locArray.push(theBathroom);
	
	var theLvngRoom = new locat(2);
	theLvngRoom.description = "You enter a dark room. It is the living room. A door is on your right... It's strange, it shines a sort of weird blue/dark light. There is a dusty couch and a broken remote controller on the ground. \n \n \n";
	theLvngRoom.name="Living Room";
	theLvngRoom.item = remote;
	locArray.push(theLvngRoom);
	
	var theOutside = new locat(3);
	theOutside.description = "You find yourself in the garden. You are outside! Fresh air fills your lungs, freedom is finally reality. Now run!\n\nGAME OVER. \n \n \n \n";
	theOutside.name="Outside";
	theOutside.item = points;
	locArray.push(theOutside);

	var theBedroom = new locat(4);
	theBedroom.description = "You enter the bedroom. There are a few pillows on the bed. A long curtain makes this room so dark... \n \n \n \n \n";
	theBedroom.name="Bedroom";
	theBedroom.item= note;
	locArray.push(theBedroom);
	
	var theCloset = new locat(5);
	theCloset.description = "You enter an extremely dark closet. There is a broom and a lot of dust. Spider webs surround the room, you better get out of here before you find the creepy six-legged owner. \n \n \n";
	theCloset.name="Closet";
	locArray.push(theCloset);
	
	var theBalcony = new locat(6);
	theBalcony.description = "As soon as you close the door, you find yourself on a balcony. Fresh air and many trees surround you. There is a creepy little statue on your left, do you want to interact with it? Click Yes or No. \n \n \n";
	theBalcony.name="Balcony";
	locArray.push(theBalcony);
		
	var theGarage = new locat(7);
	theGarage.description = "You enter an extremely dark garage. As you scan the room you look down and see a pool of oil and car tracks coming out of it. There is a hammer resting on the wall on the side. \n \n \n";
	theGarage.name="Garage";
	theGarage.item = hammer;
	locArray.push(theGarage);
	
	var theWorkshop = new locat(8);
	theWorkshop.description = "You enter a dark workshop, the switch for the light is on your right. Do you want to switch the lights on? It may attract attention from outside. Click Yes or No \n \n \n \n";
	theWorkshop.name="Workshop";
	locArray.push(theWorkshop);

	var theGarden = new locat(9);
	theGarden.description = "You close the door behind you and you find yourself in a garden. Fence completely surrounds you. There is a weird painting made with blood on the ground, between the grass. It says ''Collect all the artifacts and live the green again'' \n \n \n";
	theGarden.name="Garden";
	locArray.push(theGarden);
	
	var CompLab = new locat(10);
	CompLab.description = "The door behind you shuts by itself. Dirty water is dripping from the ceiling, crashing into the ground. The echo of this sound makes you shiver. A voice in the background starts talking to you.\n GlaDIOS: Welcome to the Computer\n Laboratory. Do you wanna play a little\n game with me?\n \n \n";
	CompLab.name = "Computer Laboratory";
	locArray.push(CompLab);
	
	currLoc = locArray[0].id; //The game starts in the Kitchen.
	
	document.getElementById("Rune").style.visibility="hidden";
	document.getElementById("Scroll").style.visibility="hidden";
	
}

function disable(id) {//disable(id) takes a parameter. It disables a button/txtArea.
	document.getElementById(id).disabled = true;
}

function enable(id) {//enable(id) takes a parameter. It enables a button/txtArea.
	document.getElementById(id).disabled = false;
}

function Over() { //Over() takes not parameter. It is used to disable everything in the game when the player loses. It empties the inventory and the location becomes 0.
	if (gameOver === 5 || currLoc === 5) {
		dispMsg("GAME OVER\n\n\n\n");
		bag=[];
		currLoc=0;
		disable("North");
		disable("South");
		disable("West");
		disable("East");
		disable("txtCommand");
		disable("txtCommandTwo");
		disable("go");
		disable("Tutorial");
		disable("inventory");
		disable("yes");
		disable("no");
		disable("search");
		disable("take");
		disable("Rune");
		disable("Scroll");
	}
}

function goNorth (){ //goNorth() takes no parameter. It is used to go North from the current Location.
	nextLoc('n');
}

function goSouth (){ //goNorth() takes no parameter. It is used to go North from the current Location.
	if (locArray[currLoc].id != 2 ) {
		nextLoc('s');
	} else {
		if (Victory() === 'end') {
			nextLoc('s');
		}
	}
}

function goEast (){ //goNorth() takes no parameter. It is used to go North from the current Location.
	nextLoc('e');
}

function goWest (){ //goNorth() takes no parameter. It is used to go North from the current Location.
	nextLoc('w');
}


function nextLoc (dir) {//nextLoc(dir) takes a parameter. It is used to navigate around the Map.
	scrollUp();
	enable("txtCommandTwo");
	enable("North");
	enable("South");
	enable("East");
	enable("West");
	disable("yes");
	disable("no");
	var d = -1;
	switch (dir) {
		case 'n': d=0; break;
		case 's': d=1; break;
		case 'e': d=2; break;
		case 'w': d=3; break;
		default: alert ('This should never happen');
	}
	var newLoc = nav[currLoc][d];
	save = newLoc;
	if (newLoc >=0) {
		currLoc = newLoc;
		dispMsg (locArray[currLoc].description);
		document.getElementById("map").src="map" + locArray[currLoc].id + ".png"; 
		if (nav[currLoc][0] === -1 ) {
			disable("North");
		}
		if (nav[currLoc][1] === -1 ) {
			disable("South");
		}
		if (nav[currLoc][2] === -1 ) {
			disable("East");
		}
		if (nav[currLoc][3] === -1 ) {
			disable("West");
		}
		if (locArray[currLoc].id === 8) {
			enable("yes");
			enable("no");
		}
		if (locArray[currLoc].id === 9 && itemCount >= 4 && scrollSpawned === 0){
			locArray[currLoc].item = scroll;
			scrollSpawned+=1;
		}
		if (locArray[currLoc].id === 10) {
			enable("yes");
			enable("no");
			disable("txtCommandTwo");
			disable("West");		
		}
		if (locArray[currLoc].id === 8) {
			currLoc = newLoc;
			dispMsg (locArray[currLoc].description);
			document.getElementById("map").src="map" + locArray[currLoc].id + ".png";
			disable("North");
		}
	} else { //if you cannot go that way, navigationError() triggers.
		navigationError();
	}
	checkScore();
	var desc ="Score: " + score + "\n";
	dispMsg(desc);
}

function dispMsg(message) { //Function dispMsg(message) displays the message given as input plus the Score in the Main text area. The assignment says that the name should be updateDisplay but I already had the code from Project two full of dispMsg. This comment is done just to notice the reader of the code that dispMsg() is actually updateDisplay().
	var target = document.getElementById("taMain");
	target.value = message + "\n\n" + target.value;
}

function dispMsgSecond(message) { //Function dispMsgSecond(message) takes in a parameter and it displays the message given as input plus the Score in the Second text area.
	var target = document.getElementById("taSecond");
	target.value = message + "\n\n" + target.value;
}

function navigationError() { //function navigationError() takes no parameter. If the value of navigation errors variable is higher than the value of the variable sarcasmThreshold, the 'game' gets "sassy".
	navigationErrorCount = navigationErrorCount + 1; //Every time the player does a mistake, the amount of navigation errors increases by 1.
	if (navigationErrorCount < sarcasmThreshold) {
		dispMsg("You cannot go that way.\nYou are still in the " + locArray[currLoc].name + ".\n\n");
	} else {
		dispMsg("Are you even trying, noob?\nYou are still in the " + locArray[currLoc].name +".\n\n");
	}            
}

			
function stageOne () { //stageOne() takes no parameter. It is the first stage in the CompLab. The correct answer is 007.
	var playerinput = document.getElementById("txtCommand").value;
	if (playerinput === "" || playerinput === "e" || playerinput === "E") {
		dispMsg("First Question:\n\nWhat is James Bond's favorite number?\n[Type your answer in the Command Box \nand click on 'Go']\n\n");
	}else {
		if (playerinput === "007") {
			dispMsg("You got the first question correct.\n\nNow type the sequence shown:\nY - Y - N - N - Y -\n Y - N - Y - N \n- Y - N - Y - Y - Y - N\n[Type the sequence in the Command Box, deleting the '-'. Then click on 'Go'.\n\n\n");
			completeStage=1;
		} else {
			gameOver+=1;
			dispMsg("Wrong try again.\nWhat is James Bond's favorite number?\n\n\n\n\n\n");
			Over();
		}
	}
}

function stageTwo () { //stageTwo() takes no parameter. It is the second stage in the CompLab. The correct answer is YYNNYYNYNYNYYYN.
	var playerinput = document.getElementById("txtCommand").value;
	if (playerinput === "" || playerinput === "e" || playerinput === "E" || playerinput === "007") {
		disable("no");
		dispMsg("Type the sequence shown:\nY - Y - N - N - Y - Y - N - Y - N - Y - N - Y - Y - Y - N\n\n\n");
	}
	if (playerinput === "YYNNYYNYNYNYYYN") {
		enable("no");
		dispMsg("That's correct.\n\nI saw that you are an interesting player. I want you to be free and be able to get out of here. You can either leave now or stay and complete the final stage to achieve the ultimate knowledge. If you decide to continue you won't be able to leave until you get the correct answer. Do you want to keep going?\n\n\n");
		document.getElementById("txtCommandTwo").disabled = false;
		bag = bag + flashdrive + "\n";
		itemCount+=1;
		dispMsgSecond("You obtained a flash drive.");
		completeStage=2;
	} else {
		gameOver+=1;
		dispMsg("Wrong try again. The sequence is \nY - Y - N - N - Y -\n Y - N - Y - N \n- Y - N - Y - Y - Y - N\n\n\n\n");
		Over();
	}
}

function stageThree () { //stageThree() takes no parameter. It is the third stage in the CompLab. If the player says yes, it goes to stageFour().
	var playerinput = document.getElementById("txtCommand").value;
	if (playerinput === "" || playerinput === "e" || playerinput === "E" || playerinput === "YYNNYYNYN") {
		dispMsg("I saw that you are an interesting player. I want you to be free and be able to get out of here. You can either go out now or stay and do the final stage to achieve the ultimate knowledge. Do you want to keep going?");
	}
	if (completeStage===2) {
		completeStage=3;
		dispMsg("Here is the final challenge.\nThere is a castle with a guard in front of the main gate. You want to get in, but you don't know the password and you hide behind a bush.\n A guy comes and the guard says '12', the guy replies '6' and he gets in. Another guy comes and the guard says '6', the guy replies '3' and he gets in. You go to the guard, he says '4', you say '2' and he shoots you. What should you have said? ");
	}
}

function stageFour () { //stageFour() takes no parameter. It is the four stage in the CompLab. The correct answer is 4, or four, or Four.
	var playerinput = document.getElementById("txtCommand").value;
	if (playerinput === "" || playerinput === "e" || playerinput === "E" || playerinput === "YYNNYYNYNYNYYYN") {
		disable("no");
		dispMsg("Here is the final challenge.\nThere is a castle with a guard in front of the main gate. You want to get in, but you don't know the password and you hide behind a bush.\n A guy comes and the guard says '12', the guy replies '6' and he gets in. Another guy comes and the guard says '6', the guy replies '3' and he gets in. You go to the guard, he says '4', you say '2' and he shoots you. What should you have said? ");
		completeStage=3;
	} else {
		if (playerinput === "4" || playerinput === "four" || playerinput === "Four") {
			dispMsg("That's correct.\n\n\n");
			document.getElementById("Rune").style.visibility="visible";
			bag = bag + rune + "\n";
			itemCount+=1;
			dispMsgSecond("You obtained the Rune. Click on\n the button 'Rune' to read it.");
			completeStage=4;
			nextLoc('w');
		} else {
			gameOver+=1;
			dispMsg("Wrong try again.\nThe numbers are:\n Guard:12 Person:6\n Guard:6 Person:3 \n Guard:4 You:2\nWhat should you have said?\n\n\n");
			Over();
		}
	}
}

function enter_KeyPress(keyboardEvent){//enter_KeyPress(keyboardEvent) takes a parameter. Done for the command Box.
	if(keyboardEvent.which === 13) {//ENTER Key	
		btnGo_click();
	}
}

function btnGo_click() { //function btnGo_click() takes no parameter. It is used to input in the program what the player is typing in the command box.
	var playerinput = document.getElementById("txtCommand").value;
	if (locArray[currLoc].id === 10) {
		if (completeStage===0) {
			stageOne();
			disable("North");
			disable("South");
			disable("West");
			disable("East");
			disable("txtCommandTwo");
		} else {
				if (completeStage===1) {
					stageTwo();
				} else {
					if (completeStage===2) {
						stageThree();
					} else {
						if (completeStage===3) {
							stageFour();
						}
					}
				}
		}
	} else {
		if ( (playerinput === "n") || (playerinput ==="N") ) {
			goNorth();
		} else {
			if ( (playerinput === "s") || (playerinput ==="S") ) {
			goSouth();
			} else {
				if ( (playerinput === "w") || (playerinput ==="W") ) {
					goWest();
				} else {
					if ( (playerinput === "e") || (playerinput ==="E") ) {
						goEast();
					} else {
						dispMsg("Invalid input. Try n - s - w - e");
					}
			  }
			}	
		}		 
}
}

function txtCommand_keyPress(keyboardEvent){ //function txtCommand_keyPress(keyboardEvent) takes a parameter as input. Depending on the number associated to the key pressed it will refer it to a function. It is a sort of KeyBinding present in many games. It takes in consideration both capital and lower case letters.
	if(currLoc != 3 && keyboardEvent.which === 119 || keyboardEvent.which === 87) {//(W) North key	
		goNorth();
	}
	if(currLoc != 3 && keyboardEvent.which === 115 || keyboardEvent.which === 83) {//(S) South key
		goSouth();
	}
	if(currLoc != 3 && keyboardEvent.which === 97 || keyboardEvent.which === 65) {//(A) West key
		goWest();
	}
	if(currLoc != 3 && keyboardEvent.which === 100 || keyboardEvent.which === 68) {//(D) East key
		goEast();
	}
	if(keyboardEvent.which === 32) {//Space key
		search();
	}
	if(keyboardEvent.which === 114 || keyboardEvent.which === 82) {//Take key
		take();
	}
	if(keyboardEvent.which === 120 || keyboardEvent.which === 88) {//Inventory key
		inventory();
	}
	if(keyboardEvent.which === 99 || keyboardEvent.which === 67) {//Scroll key	
		Scroll();
	}
	if(keyboardEvent.which === 121 || keyboardEvent.which === 89) {//Yes key	
		Yes();
	}
	if(keyboardEvent.which === 110 || keyboardEvent.which === 78) {//No key	
		No();
	}


}

function Rune () { //Rune() takes no parameter. It displays in the second Text Area the description of the item Rune.
	dispMsgSecond(rune.description);
}

function Scroll () { //Scroll() takes no parameter. It displays in the Text Area the description of the Scroll.
	scrollUp();
	if (understandScroll===3) {
		dispMsg("The scroll says: ''Guided by the light. Air is sacred, five is freedom.''");
	}
	if (understandScroll===2) {
		dispMsg("One more time. It has to make sense.\nThe scroll says: ''Guided by the light. Air is sacred, five is freedom.''");
		understandScroll+=1;
	}
	if (understandScroll===1) {
		dispMsg("I have to concentrate.\nThe scroll says: ''Arbij by the nozim. Rarmi is sacred, five laj jey.''\nMhm...");	
		understandScroll+=1;
	}
	if (understandScroll===0) {
		dispMsg("The scroll says: ''Arbij narim the nozim. Rarmi laj nozau, 5 laj jey.''\nI don't really get it, lemme try again.");
		understandScroll+=1;
	}
}

var decision="";
function Yes() { //Yes() takes no parameter. It is linked to the button Yes. It has different utility depending on where the player currently is.
	scrollUp();
	decision="yes";
	if (locArray[currLoc].id === 10) {
		if (completeStage===-1) {
			completeStage=0;
			disable("no");
			dispMsg("First Question:\n\nWhat is James Bond's favorite number?\n[Type your answer in the Command Box \nand click on 'Go']\n\n");
		} else {
			if (completeStage===2) {
				stageFour();
			} else {
				if(completeStage===4) {
					dispMsg("You already finished the game.\n\n\n");
					enable("West");
					enable("txtCommandTwo");
				}
			}
		}
	}
	if ((locArray[currLoc].id === 6 || locArray[currLoc].id === 8) && (understandScroll===-1)) {
		dispMsg("woosh...");
	} else {
		if (currLoc===8) {
			dispMsg("A dog starts barking, it is against the window on the wall to the right.");
			dogLoc=8;
		}
		if (currLoc===6) {
			dispMsg("You feel lighter... Almost as if you are a ghost. Random emotions pop into your head. The strongest one is arachnophobia. ");
			ghost=true;
		}
	}
}

function No() { //No() takes no parameter. It is linked to the button No. It has different utility depending on where the player currently is.
	scrollUp();
	decision="no";
	if (locArray[currLoc].id === 10) {
		nextLoc('w');
	}
	if ((locArray[currLoc].id === 6 || locArray[currLoc].id === 8) && (understandScroll===-1)) {
		dispMsg("woosh...");
	} else {
		if (currLoc===8) {
			dispMsg("Ok, keep your stealthy research and be quiet.");
			dogLoc=3;
		}
		if (currLoc===6) {
			dispMsg("Ok, keep your stealthy research and be quiet.");
			ghost=false;
		}
	}
}

function GhostDeath() { //GhostDeath() takes no parameter. It calls the function Over(), when the game is over.
	Over();
}

function scrollUp () { //ScrollUp() takes no parameter. It scrolls up both Text Areas when something is displayed.
	var textarea = document.getElementById("taMain");
	var textareaScnd = document.getElementById("taSecond");
	textarea.scrollTop = 0;
	textareaScnd.scrollTop = 0;
}

function checkScore() { //Function checkScore() takes no parameter. It checks if the player has ever been in a room before. If he/she has not, the function adds 5 points to the score.
	 if ( (! countzero) && (currLoc === 0) ) {            
		  score = score + 5;
		  countzero = true;
	} else if ( (! countone) && (currLoc === 1) ) {            
		  score = score + 5;
		  countone = true;
	} else if ( (! counttwo) && (currLoc === 2) ) {            
		  score = score + 5;
		  counttwo = true;
	} else if ( (! countthree) && (currLoc === 3) ) {            
		  score = score + 5;
		  countthree = true;
	} else if ( (! countfour) && (currLoc === 4) ) {            
		  score = score + 5;
		  countfour = true;
	} else if ( (! countfive) && (currLoc === 5) ) {            
		  score = score + 5;
		  countfive = true;
	} else if ( (! countsix) && (currLoc === 6) ) {            
		  score = score + 5;
		  countsix = true;
	} else if ( (! countseven) && (currLoc === 7) ) {            
		  score = score + 5;
		  countseven = true;
	} else if ( (! counteight) && (currLoc === 8) ) {            
		  score = score + 5;
		  counteight = true;
	} else if ( (! countnine) && (currLoc === 9) ) {            
		  score = score + 5;
		  countnine = true;
	} else if ( (! countten) && (currLoc === 10) ) {            
		  score = score + 5;
		  countten = true;
	}
}         

function search(){ //search() takes no parameter. It searches the item in the current room.
	scrollUp();
	if (locArray[currLoc].item != undefined) {
		dispMsg("Searched: " + locArray[currLoc].item);
	} else {
		dispMsg("There is nothing to search.");
	}
	if (locArray[currLoc].id===4) {
		dispMsgSecond(locArray[currLoc].item.description);
	}
}

function take() {// take() function takes no parameter. It is used to pick up the item in the room the player is in. It adds the item to the bag (inventory).
	scrollUp();
	if (locArray[currLoc].item != "No items." && locArray[currLoc].item != undefined){
		if (locArray[currLoc].id!=4) {
			if (locArray[currLoc].id===3) {
				score+=5;
			}
			itemCount+=1;
			bag = bag + locArray[currLoc].item + "\n"; //The Project5 asks me to change the way the Items are added to the Inventory by using the .push, but I do not like how it is shown in the textarea when I display the Inventory. So I just used the + to add the item. If I wanted to use the array I should have used ' bag.push(locArray[currLoc].item); '
			dispMsg("Taken: " + locArray[currLoc].item);
			if (locArray[currLoc].item.name === " Scroll") {
				dispMsg("You obtained the Scroll. Click on the button 'Scroll' to read it.");
				document.getElementById("Scroll").style.visibility="visible";
				understandScroll=0;
			}
			delete locArray[currLoc].item;
		} else {
			dispMsg("There is nothing to take.");
		}
	} else {
		dispMsg("There is nothing to take.");
	}
	if (currLoc===3){
		score += 5;
	}
}

function inventory(){ //inventory() takes no parameter. It displays bag (the actual inventory) in the second textarea.
	scrollUp();
	if (bag.length === 0){
		dispMsgSecond("There are no items in your Inventory.");
	} else{
	dispMsgSecond("Inventory: \n" + bag);
	}
}