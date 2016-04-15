function setup() {
  createCanvas(windowWidth,windowHeight);
  
  var mapMatrix = 
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
}

function draw() {
  drawBackground();
  //drawInventory();
  //drawHP();
  //drawInventory();
  //drawText();
}

function drawBackground()
{
	background(20,70,140);
}