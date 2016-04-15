var currentText;//the text that is shown on the top of the screen
var font;
var crurrentRoom;// the type of room the player is in (see list next to map)
var playerX;//posx
var playerY;//poy
var playerHP;//current hp
var gotBanana = false;//if you have a banana
var mapMatrix;//the map
var mouseDown;//if the mouse is being held down
var textArray;//an array of text that can be displayed as currentText
var gameWin; //the winstate of the game

function preload() {
	font = loadFont("assets/playtime.ttf");//loads the font before the rest starts
}

function setup() {
	createCanvas(windowWidth, windowHeight);//makes the game take up the full width/height of the screen. All sizing is done through % so it should resize fairly well to most devices.
	mouseDown = false;
	gameWin = false;
	textSize((height + width) / 70);
	textAlign(CENTER, CENTER);
	rectMode(CENTER);
	noStroke();
	textFont(font);
	mapMatrix = [
		[0, 0, 0, 0, 0, 0, 0, 0, 0],
		[0, 0, 3, 2, 3, 0, 0, 0, 0],
		[0, 3, 3, 0, 3, 0, 3, 4, 0],
		[0, 4, 0, 0, 3, 3, 3, 0, 0],
		[0, 3, 3, 0, 0, 3, 0, 0, 0],
		[0, 0, 3, 4, 3, 3, 0, 0, 0],
		[0, 0, 3, 0, 3, 0, 0, 0, 0],
		[0, 0, 4, 0, 1, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0, 0, 0]

	];
	//stores the map of the game
	//0 = wall
	//1 = player start //there should only be one on the map
	//2 = end/exit 
	//3 = empty room
	//4 = a room with a banana in it

	//finds player start location
	for (var i = 0; i < mapMatrix.length; i++) {
		for (var j = 0; j < mapMatrix.length; j++) {
			if (mapMatrix[i][j] == 1) {
				playerX = i; //the cooridianted are reveresed and very weird, 0,0 is the top right, 
				playerY = j;
				print("player start: " + playerX + "," + playerY);
			}
		}
	}
	//sets current room to start
	currentRoom = 1;

	//make new matrix to mark off visted rooms <-- didnt have time to implement this feature.

	//sets a bunch of text that could come up as you enter new rooms
	textArray = ["Another dark room", "Another one", "You feel dizzy", "This is starting to get old", "You must be getting closer to an exit right?", "Do these walls look familiar to you?", "You wonder if you will ever see sunlight again", "You walk into a dark room", "You try to find a light switch, but there are none", "You feel around on the ground, checking if there is anything useful", "How did you even end up here?"];

	// set starttext
	currentText = "You wake up, everything is black, are you blind? \n No you're just in a dark room, you feel the walls for a way out."

	//sets player HP to full
	playerHP = 100; //<-- didnt have time to implment monsters/hp mechanics 
}

//stuff that happends every frame, should be self explanitory 
function draw() {
	drawBackground();
	drawInventory();
	drawHP();
	drawText();
}

//draws the game background every frame
function drawBackground() {
	if (gameWin) {
		background(255);
	} else {
		background(30);
		fill(70);
		quad(0, 0, width, 0, width * 0.75, height * 0.25, width * 0.25, height * 0.25);
		quad(0, height, width, height, width * 0.75, height * 0.75, width * 0.25, height * 0.75);
	}
}

//draws the text, current and buttons depending on where the player can move
function drawText() {
	fill(200, 220);
	rect(width / 2, height / 2, width * 0.8, height * 0.7);
	fill(20);
	text(currentText, width / 2, height * 0.25, width * 0.8, height * 0.2);

	if (!gameWin) {
		if (mapMatrix[playerX - 1][playerY] > 0) { //checks if space above is free to move into
			if (button("Go North", 0.4)) {
				playerX--;
				updateRoom();
				print("north");
			}
		}

		if (mapMatrix[playerX + 1][playerY] > 0) { //checks if space below is free to move into
			if (button("Go South", 0.5)) {
				playerX++;
				updateRoom();
				print("south");
			}
		}

		if (mapMatrix[playerX][playerY + 1] > 0) { //checks if space on the right is free to move into
			if (button("Go East", 0.6)) {
				playerY++;
				updateRoom();
				print("east");
			}
		}

		if (mapMatrix[playerX][playerY - 1] > 0) { //checks if space on the left is free to move intos
			if (button("Go West", 0.7)) {
				playerY--;
				updateRoom();
				print("west");
			}
		}

		if (currentRoom > 3) {
			if (currentRoom == 4) {//if the room has a banana in it
				if (button("Pick up banana", 0.8)) {
					if (gotBanana) {
						currentText = "You already have a banana."
					} else {
						gotBanana = true;
						//sets room to empty 
						mapMatrix[playerX][playerY] = 3;
						currentRoom = 3;
					}
				}
			}
		}
	}
}


//draws and checks if a button is pressed, returns a boolean
function button(txt, y) {
	if (mouseX > width * 0.1 && mouseX < width * 0.9 && mouseY > height * y - height / 30 && mouseY < height * y + height / 30) {
		fill(120, 100);
	} else {
		fill(120, 20);
	}
	rect(width / 2, height * y, width * 0.8, height / 15);
	fill(20);
	text(txt, width / 2, height * y);

	if (mouseX > width * 0.1 && mouseX < width * 0.9 && mouseY > height * y - height / 30 && mouseY < height * y + height / 30 && mouseDown) {
		mouseDown = false;
		return true;
	} else {
		return false;
	}
}

//draws the inventory at the bottom on ths screen
function drawInventory() {
	fill(200, 150);
	rect(width * 0.5, height * 0.95, width * 0.9, height * 0.1);
	fill(0);
	text("Inventory: ", width * 0.2, height * 0.95);

	if (gotBanana) {
		text("banana", width * 0.4, height * 0.95);
	}
}

//draws the HP text and box at the top of the screen
function drawHP() {
	fill(200, 150);
	rect(width * 0.1, height * 0.05, width * 0.1, height * 0.1);
	fill(0);
	text("HP: " + playerHP, width * 0.1, height * 0.05);
}

//updates the room and text whenever you move room, also checks if you are in the exit room
function updateRoom() {
	currentRoom = mapMatrix[playerX][playerY];
	currentText = textArray[int(random(textArray.length))];

	if (currentRoom == 2) {
		gameWin = true;
		currentText = "You see a door, you use all your force to push it open. \n The room fills with bright light, you are finally free of this maze";
	}
}

//need these so is the buttons can work
function mousePressed() {
	mouseDown = true;
}

function mouseReleased() {
	mouseDown = false;
}