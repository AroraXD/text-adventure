var currentText;
var font;
var crurrentRoom;

var playerX;
var playerY;
var bool;

var mapMatrix;

function preload() {

	font = loadFont("assets/playtime.ttf");
	
}

function setup() {
  createCanvas(windowWidth,windowHeight);
  textSize(height/30);
 	textAlign(CENTER, CENTER);
 	rectMode(CENTER);
		noStroke();
  textFont(font);
  mapMatrix = 
  (
  	(0,0,2,0,0),
  	(0,0,3,3,0),
  	(0,0,0,3,0),
  	(0,0,3,3,0),
  	(0,0,1,0,0)
  );
  //stores the map of the game
  //0 = wall
  //1 = player start
  //2 = end
  //3 = empty room
  
  //create player
  
  //find player
  
  //make new matrix to mark off visted rooms
  
  // set starttext
  currentText = "You wake up, everything is black, are you blind? No you're just in a dark room."
}

function draw() {
  drawBackground();
  drawInventory();
  //drawHP();
  //drawInventory();
 drawText();
 print(mapMatrix[1]);
}

function drawBackground()
{
	background(30);
	fill(70);
 quad(0,0,width,0,width*0.75,height*0.25,width*0.25,height*0.25);
 quad(0,height, width,height,width*0.75,height*0.75,width*0.25,height*0.75);
}

function drawText()
{
	fill(200, 220);
	rect(width/2,height/2,width*0.8,height*0.7);
	fill(20);
	text(currentText, width/2,height*0.25);
	
	button("Go North",0.4);
	button("Go South",0.5);
	button("Go East",0.6);
	button("Go West",0.7);
	button("Pick up Item",0.8);

}

function button(txt, y)
{
	if (mouseX>width*0.1 && mouseX <width*0.9 && mouseY > height*y - height/30 && mouseY < height*y+height/30)
	{
		fill(120,100);
	}
	else
	{
		fill(120,20);
	}
	rect(width/2,height*y,width*0.8,height/15);
	fill(20);
	text(txt, width/2, height*y);
}

function drawInventory()
{
	fill(200,150);
	rect(width*0.5,height*0.95,width,height*0.1);
	fill(0);
	text("Inventory: ",width*0.2,height*0.95);
}

//player clas
function Player()
{
	
	
}