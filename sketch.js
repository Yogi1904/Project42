var backImage,backgr;
var player, player_running;
var ground,ground_img;
var bananaImg, stoneImg;
var foodGroup, obstacleGroup, banana, stone;

var END =0;
var PLAY =1;
var gameState = PLAY;
var score = 0;

function preload(){
  backImage=loadImage("jungle.jpg");
  player_running = loadAnimation("Monkey_01.png","Monkey_02.png","Monkey_03.png","Monkey_04.png","Monkey_05.png","Monkey_06.png","Monkey_07.png","Monkey_08.png","Monkey_09.png","Monkey_10.png");
  bananaImg = loadImage("banana.png");
  stoneImg = loadImage("stone.png");

  foodGroup = new Group();
  obstacleGroup = new Group();
}

function setup() {
  createCanvas(800,400);
  
  backgr=createSprite(0,0,800,400);
  backgr.addImage(backImage);
  backgr.scale=1.5;
  backgr.x=backgr.width/2;
  backgr.velocityX=-4;
  
  player = createSprite(100,340,20,50);
  player.addAnimation("Running",player_running);
  player.scale = 0.1;
  
  ground = createSprite(400,350,800,10);
  ground.x=ground.width/2;
  ground.visible=false;
}

function draw() { 
  background(0);

  if(gameState === PLAY) {
  
  if(backgr.x<100){
    backgr.x=backgr.width/2;
  }
  
  if(keyDown("space") && player.y >= 300) {
    player.velocityY = -12;
  }

  player.velocityY = player.velocityY + 0.8;
  player.collide(ground);
  
  spawnFood();
  spawnObstacles();
  
  text("SCORE: "+score, 7000, 50);

  if (player.isTouching(foodGroup)){
    score = score + 1;
    foodGroup.destroyEach();
    player.scale = player.scale + 0.005;
  }

  drawSprites();

  if (player.isTouching(obstacleGroup)){

    gameState === END;

    backgr.velocity = 0;
    player.visibility = false;

    foodGroup.destroyEach();
    obstacleGroup.destroyEach();

    obstacleGroup.setVelocityXEach(0);
    foodGroup.setVelocityXEach(0);

    foodGroup.setLifetimeEach(-1);
    obstacleGroup.setLifetimeEach(-1);

    fill(255);
    textSize(30);

    text("GAME OVER!", 300, 220);
  }
}  

function spawnFood(){
  if (frameCount%80 === 0){
  banana = createSprite(600, 120, 10, 10);
  banana.addImage("banana", bananaImg);
  banana.y = Math.round(random(200, 230));
  banana.scale = 0.05;
  banana.velocityX = -4;
  banana.lifetime = 300;
    
  foodGroup.add(banana);
    
  }
}

function spawnObstacles(){
  if (frameCount%300 === 0){
  stone = createSprite(600, 320, 10, 10);
  stone.addImage("stone", stoneImg);

  stone.scale = 0.15;
  stone.velocityX = -4;
  stone.lifetime = 400;
    
  obstacleGroup.add(stone);
  }
 }
}