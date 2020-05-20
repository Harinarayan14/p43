// DEFINING VARIABLES 
var gameState = "start";
var player;
var laser =[];
var shoot;
var col;
var E =[];
var E1 = [];
var score = 0;



function setup() {
  canvas = createCanvas(1200,600);
  player = createSprite(600,575,100,30);
  player.shapeColor= "white";
}

function draw() {
  background(0); 
  // when starting the game
  if(gameState=== "start"){
    fill("white");
    textSize(50);
    text("Press Space to Start",400,300);
  }
  // creating enemies
  if(gameState=== "play"){
    rand = Math.round(random(1,8));
    switch(rand) {
      case 1: col = rgb(255,0,0);
              break;
      case 2: col = rgb(0,128,0);
              break;
      case 3: col = rgb(0,0,255);
              break;
      case 4: col = rgb(255,255,0);
              break;
      case 5: col = rgb(0,255,0);
              break;
      case 6: col = rgb(255,192,203);
              break;
      case 7: col = rgb(210,105,30);
              break;
      case 8: col = rgb(255,165,0);
             break;
      default: break;
    }
    
    if(frameCount% 50===0){
      enemy = createSprite(random(50,1150),25,100,30);
      enemy.shapeColor = col;
      enemy.velocityX = random(-5,5);
      E.push(enemy);
    }
    
    for(var i =0;i<E.length;i++){
      if(frameCount%40===0){
        e1= createSprite(E[i].x,E[i].y,5,30);
        e1.shapeColor= E[i].shapeColor;
        e1.velocityY= 5;
        E1.push(e1);
      }
      for(var k =0;k<laser.length;k++){
       if(collide(laser[k],E[i])){
        E[i].destroy();
        score+=1;
       }
      }
    }
    for(var j =0;j<E1.length;j++){
     if(collide(E1[j],player)){
      player.destroy();
      gameState="end";
     }
    }
    fill("white");
    text("Score:"+ score,5,590);
    if(player.x<0){
      player.x = 1150;
    }
    if(player.x>1150){
      player.x = 50;
    }
    drawSprites();
  } 
  
  if(gameState==="end" && score<500 ){
    textSize(50);
    fill("white");
    text("GAMEOVER!!!",500,200);
    textSize(50);
    fill("white");
    text("Your Score is "+ score,400,400);
  }
  if(gameState==="end" && score>500){
    
    textSize(50);
    fill("white");
    text("YOUWIN!!!",500,200);
  }
}

function keyPressed(){
  if(keyCode === 32 && gameState === "start")
{
     gameState= "play";
}
if(keyCode === 32 && gameState === "play"){

    shoot = createSprite(player.x,player.y,10,30);
    shoot.velocityY = -5;
    shoot.shapeColor = "white";
    laser.push(shoot);
}
if(keyCode === 37 && gameState === "play"){

    player.velocityX =-5;
}
if(keyCode === 38 && gameState === "play"){

    player.velocityX =0;
}
if(keyCode === 39 && gameState === "play"){

    player.velocityX=5;
}
}
function collide(a,b){
  
  if ((b.x - a.x <= b.width/2 + a.width/2 )
  &&(a.x - b.x <= b.width/2 + a.width/2 )
  &&(b.y - a.y <= b.height/2 + a.height/2 )
  &&(a.y - b.y <= b.height/2 + a.height/2 )){
    return true

  }
}