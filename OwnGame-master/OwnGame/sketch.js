


var gameState;
var score = 0;
var hero,ground;
var obstacle1,obstacle2,obstacle3,obstacle4;
var enemy1,enemy2,enemyHead;
var hero1_img,hero2_img,enemy1_img,enemy2_img,enemyHead_img;
var obstaclesGroup,enemyGroup;
var bullets,bulletsGroup,gamerOver_img;
var ground_img;

var bg;
function preload(){

    obstacle1=loadImage("images/ob1.png");
    obstacle2=loadImage("images/ob2.png");
    obstacle3=loadImage("images/ob3.png");
    obstacle4=loadImage("images/ob4.png");

    enemy1_img=loadImage("images/enemy1.png");
    enemy2_img=loadImage("images/enemy2.png");
    enemyHead_img=loadImage("images/enemyHead.png");

    hero1_img=loadImage("images/hero1.png");
    hero2_img=loadImage("images/hero2.png");

    gameOver_img=loadImage("images/gameover.jpg");

    bg=loadImage("images/bg.png");



}

function setup(){

    createCanvas(displayWidth,displayHeight);
   
  
    
    ground = createSprite(displayWidth/2,displayHeight/2-5,displayWidth,10);
  //  ground.visible = false;
  
    

    hero = createSprite(100,ground.y-50,40,80);
    hero.addImage("hero",hero1_img);
    hero.scale=0.4

    gameState="STORY";

    
   // bullets=createSprite(hero.x,hero.y,10,10);


    obstaclesGroup=new Group();
    enemyGroup=new Group();

    //score=0;

}

function draw(){
    background(180);
   
 
    if(gameState==="STORY"){

        textSize(30)
        text("YOU ARE THE HERO OF YOUR CITY",200,20);
        text("BUT YOUR CITY IS IN DANGER" ,200,50);
        text("ALIENS HAVE INVADED YOUR CITY ",200,80);
        text("YOUR ARE THE LAST HOPE OF YOUR CITY",200,110);
        text("SAVE YOUR CITY BY KILLING ALL ALIENS" ,200,140);
        text("YOUR ABILITY INCREASES AS YOU KILL YOUR ENEMIES",200,170);

        text("GOOD LUCK",displayWidth/2,displayHeight-70); 
        text("PRESS SPACE TO START THE GAME",displayWidth-540,displayHeight-20);

        //ground.visible=false;
        //hero.visible=false;
        if(keyDown("a")){
            gameState="PLAY";
        }
    }

     if(gameState==="PLAY"){

      image(bg,0,0,displayWidth,displayHeight)

        if(keyDown("space") && hero.y>=344.5) {
            hero.velocityY = -14;
          }
          
          hero.velocityY = hero.velocityY + 0.5

          hero.collide(ground);
        
        

          if(obstaclesGroup.isTouching(hero)||enemyGroup.isTouching(enemyGroup)){
              gameState="END";
         }

         spawnObstacles();
       spawnEnemy();
       
     }
    
     if(gameState==="END"){

        /*hero.velocityX=0;
        hero.velocityY=0;

        var gameOver=createSprite(displayWidth/2,displayHeight/2)
      gameOver.addImage("gameOver_img");*/
      clear();
     // image(gamerOver_img,400,400,400,400)

     }

     


    drawSprites();
}


function spawnObstacles() {
    if(frameCount % 100 === 0) {
      //note obstacle.x
      var obstacle = createSprite(displayWidth,ground.y-40,10,40);
      obstacle.velocityX = -4;
      //generate random obstacles
      var rand = Math.round(random(1,4));
      switch(rand) {
        case 1: obstacle.addImage(obstacle1);
                break;
        case 2: obstacle.addImage(obstacle2);
                break;
        case 3: obstacle.addImage(obstacle3);
                break;
        case 4: obstacle.addImage(obstacle4);
                break;
        default: break;
      }
      
      //assign scale and lifetime to the obstacle           
      obstacle.scale = 0.5;
      //note obstacle.lifetime
      obstacle.lifetime = displayWidth/hero.velocityX+30;
      //add each obstacle to the group
      obstaclesGroup.add(obstacle);
    }
  }

  function spawnEnemy() {
    if(frameCount % 160 === 0) {
      //note obstacle.x
      var enemy = createSprite(displayWidth,random(ground.y-150,ground.y-250),10,40);
      enemy.velocityX = -4;
      //generate random obstacles
      var rand = Math.round(random(1,3));
      switch(rand) {
        case 1: enemy.addImage(enemy1_img);
                break;
        case 2: enemy.addImage(enemy2_img);
                break;
        case 3:enemy.addImage(enemyHead_img);
        console.log("error")
        break;
        default: break;
      }
           
      enemy.scale = 0.5;
     // enemy.velocityX=-5;
      enemy.lifetime = displayWidth/4+30;
      enemyGroup.add(enemy);
    }
     /* if(frameCount % 500 === 0){
          var enemyHead =createSprite(displayWidth,165,10,40);
          enemyHead.addImage(enemyHead_img);
          enemyHead.scale=0.5
          enemyHead.velocityx=-10;
          enemyHead.lifetime = displayWidth/ground2.velocityX+30;
          enemyGroup.add(enemyHead);  

      
    }*/
  }

