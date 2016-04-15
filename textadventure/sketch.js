var currentText;
var font;
var crurrentRoom;
var playerX;
var playerY;
var playerHP;
var mapMatrix;
var mouseDown;
var textArray;
var gameWin; //the winstate of the game

function preload() {
	font = loadFont("assets/playtime.ttf");
}

function setup() {
	createCanvas(windowWidth, windowHeight);
	mouseDown = false;
	gameWin = false;
	textSize((height+width) / 70);
	textAlign(CENTER, CENTER);
	rectMode(CENTER);
	noStroke();
	textFont(font);
	mapMatrix = [
		[0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 2, 0, 0, 0],
		[0, 0, 0, 3, 3, 0, 0],
		[0, 0, 0, 0, 3, 0, 0],
		[0, 0, 3, 3, 3, 0, 0],
		[0, 0, 0, 1, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0]
	];
	//stores the map of the game
	//0 = wall
	//1 = player start //there should only be one on the map
	//2 = end/exit 
	//3 = empty room

	//create player

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
	currentRoom = 1;

	//make new matrix to mark off visted rooms

	//sets a bunch of text that could come up as you enter new rooms
	textArray = ["Another dark room", "Another one", "You feel dizzy", "This is starting to get old", "You must be getting closer to an exit right?", "Do these walls look familiar to you?", "You wonder if you will ever see sunlight again"];

	// set starttext
	currentText = "You wake up, everything is black, are you blind? \n No you're just in a dark room, you feel the walls for a way out."

	//sets player HP to full
	playerHP = 100;
}

function draw() {
	drawBackground();
	drawInventory();
	drawHP();
	//drawInventory();
	drawText();

	//print(mapMatrix[0][0]);
	//print(mapMatrix.length);
}

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

function drawText() {
	fill(200, 220);
	rect(width / 2, height / 2, width * 0.8, height * 0.7);
	fill(20);
	text(currentText, width / 2, height * 0.25, width*0.8,height*0.2);

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
			if (button("Pick up Item", 0.8)) {

			}
		}
	}
}

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

function drawInventory() {
	fill(200, 150);
	rect(width * 0.5, height * 0.95, width * 0.9, height * 0.1);
	fill(0);
	text("Inventory: ", width * 0.2, height * 0.95);
}

//player clas
function Player() {

}

function drawHP() {
	fill(200, 150);
	rect(width * 0.1, height * 0.05, width * 0.1, height * 0.1);
	fill(0);
	text("HP: " + playerHP, width * 0.1, height * 0.05);
}


function updateRoom() {
	currentRoom = mapMatrix[playerX][playerY];
	currentText = textArray[int(random(textArray.length))];

	if (currentRoom == 2) {
		gameWin = true;
		currentText = "You see a door, you use all your force to push it open. You are free";
	}
}

//need these so is the buttons can work
function mousePressed() {
	mouseDown = true;
}

function mouseReleased() {
	mouseDown = false;
}