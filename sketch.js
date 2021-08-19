var bg, bgImage;
var bird, birdImage;
var upperPillar, upperPillarImage, upperPillarGroup;
var lowerPillar, lowerPillarImage, lowerPillarGroup;
var PLAY = 1;
var END  = 0;
var gameState = PLAY;
var gameover, gameoverImage;
var restart, restartImage;
var score = 0;
var gameoverSound, restartSound;

function preload() {
  bgImage = loadImage("Flappy Bird Background.png");
  birdImage = loadImage("Flappybird.png");
  upperPillarImage = loadImage("pipe1.png");
  lowerPillarImage = loadImage("pipe2.png");
  gameoverImage = loadImage("neon_gameover.png");
  restartImage = loadImage("try_again.png");
  gameoverSound = loadSound("Game over.wav");
  restartSound = loadSound("restart.wav");
}

 

function setup() {
  createCanvas(1363,760);
  bg = createSprite(681,380,1363,760);
  bg.addImage(bgImage);
  bg.scale = 3;
  

  bird = createSprite(660,380,20,20);
  bird.addImage(birdImage);
  bird.scale = 0.4;
  bird.debug = false;
  bird.setCollider("circle",0,0,100);

  upperPillarGroup = new Group();
  lowerPillarGroup = new Group();

  gameover = createSprite(681,300);
  gameover.addImage(gameoverImage);
  gameover.visible = false;

  restart = createSprite(681,410);
  restart.visible = false;
  restart.addImage(restartImage);
  restart.scale = 0.4;
}

function draw() {
  background("black"); 

  if(gameState === PLAY){
    bg.velocityX = -3; 

    score = Math.round(frameCount/4);

      if(bg.x<400){
        bg.x = 681;
      }

      if(keyDown("space")){
        bird.velocityY = -10;
      }

      bird.velocityY = bird.velocityY + 0.5;
      
      spawnUpperPipe();
      spawnLowerPipe();


      if(upperPillarGroup.isTouching(bird)){
        gameState = END;
        gameoverSound.play();
      }

      if(lowerPillarGroup.isTouching(bird)){
        gameState = END;
        gameoverSound.play();
      }
    }

    if(gameState === END){
      bg.velocityX = 0;
      gameover.visible = true;
      restart.visible = true;

      lowerPillarGroup.setVelocityXEach(0);
      upperPillarGroup.setVelocityXEach(0);

      lowerPillarGroup.setLifetimeEach(-1);
      upperPillarGroup.setLifetimeEach(-1);

      if(mousePressedOver(restart)){
        reset();
        restartSound.play();
      }
    }
    drawSprites();
    textSize(35);
    fill("white");
    text("Score: " + score, 130,130);

  }

function reset(){

  gameState = PLAY;
  lowerPillarGroup.destroyEach();
  upperPillarGroup.destroyEach();

  gameover.visible = false;
  restart.visible = false;
}

//write code here to spawn the pillars
function spawnUpperPipe() {
  if (frameCount % 100 === 0) {
    upperPillar = createSprite(1363,120,40,10);
    upperPillar.y = Math.round(random(80,120));
    upperPillar.addImage(upperPillarImage);
    upperPillar.scale = 0.5;
    upperPillar.velocityX = -3;
    upperPillar.debug = false;
    
     //assign lifetime to the variable
    upperPillar.lifetime = 700;
    
    //add each cloud to the group
    upperPillarGroup.add(upperPillar);
  }
  
}


function spawnLowerPipe() {
  if (frameCount % 100 === 0) {
    lowerPillar = createSprite(1363,600,40,10);
    lowerPillar.y = Math.round(random(550,650));
    lowerPillar.addImage(lowerPillarImage);
    lowerPillar.scale = 0.5;
    lowerPillar.velocityX = -3;
    lowerPillar.debug = false;

     //assign lifetime to the variable
    lowerPillar.lifetime = 700;
    
    //add each cloud to the group
    lowerPillarGroup.add(lowerPillar);
  }
  
}