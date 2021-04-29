var player; var gravity = 0.8; var jumpHeight = -15; var ground; var jumpSpace = 320; var obstacle = []; 
var spawnRate = 2; var enemySpeed = 3; var score = 0; var scoreIncrement = 1;
var start = 0, play = 1, end = 2, win = 4, begin = 5;
var gameState = start; var finishBlock; var finishDistance;
var l0 = -1; l1 = 0, l2 =1, l3 = 2, l4 = 3, Inf = 4;
var levelS = l0;
var playerAnim;

function setup()
{
  createCanvas(400, 400);
  finishDistance = 1200;
  player = createSprite(20, height/2, 20, 20);
  player.addAnimation("playerAnim", "sprite_0.png", "sprite_1.png", "sprite_2.png", "sprite_3.png");
  player.addAnimation("DEAD", "sprite_4.png");
  ground = createSprite(width/2, 390, width+2000, 10);
  ground.shapeColor ="white";
  finishBlock = createSprite(finishDistance, 370, 20, 20);
  finishBlock.addAnimation("finishAnim", "sprite_13.png", "sprite_14.png", "sprite_15.png", "sprite_16.png");
}

function draw()
{
  gameStateStart();

  if(gameState === begin)
  {
    background(0, 255, 0);
    var he = createElement('h2');
    he.html(" Choose A Level ");
    he.position(75, 50);

    level1();
    level2();
    level3();
    level4();
  
  }

 gameStatePlay();
 gameStateWin();

 if(gameState === end) {
  player.rotation = player.rotation + 50;
 }
}

function gameStateStart() {
  if(gameState === start)
  {
    background(255, 0, 0)
    var heading = createElement("h1");
    heading.html(" SPACE JUMPERS ");
    heading.position(75, 20);
    
    var startButton = createButton(" START ");
    startButton.position(165, 200);

    startButton.mousePressed(() =>
    {
      removeElements();
      frameCount = 0;
      player.destroy();
      finishBlock.destroy();
      for(var i = 0; i<obstacle.length; i++)
      {
        obstacle[i].destroy();
      }
      setup();
      gameState = begin;
    })
  }
}

function gameStateWin() {
 if(gameState === win)
  {
    player.destroy();
    for(var i = 0; i<obstacle.length; i++)
    {
      obstacle[i].destroy();
    }
    obstacle = [];
    background(0, 255, 255);
    var wiin = createElement("h3");
    wiin.html("You Win");
    wiin.position(150, 30);

  }
}



function gameStatePlay() {
  if(gameState === play)
  {
    //var rand = random(-200, 20)

    if(levelS === l1)
    {
      finishDistance = 3000;
      finishBlock.x = finishDistance;
      enemySpeed = 3;
    }

    if(levelS === l2) {
      finishDistance = 4000;
      finishBlock.x = finishDistance;
      enemySpeed = 5;
    }

    if(levelS === l3) {
      finishDistance = 5000;
      finishBlock.x = finishDistance;
      enemySpeed = 7;
    }

    if(levelS === l4) {
      finishDistance = 6000;
      finishBlock.x = finishDistance;
      enemySpeed = 9;
    }

  background(0);
  ground.x = player.x;

  player.velocityY += gravity;
  player.velocityX = enemySpeed;
  player.collide(ground);

  camera.position.x = player.x;
  camera.position.y = player.y;

  drawSprites();
  textSize(20);
  text(score, player.x, player.y-100);

    if(frameCount % 100 === 0 && player.x < finishDistance-200)
    {
    obstacle.push(createSprite(player.x+250, 375, 40, 40));
    }
    
  if(frameCount % 60 === 0)
  {
    score+=scoreIncrement;
    //obstacle.shift();
  }

  obstacles();
  
  if(player.isTouching(finishBlock) || player.x > finishDistance)
  {
    gameState = win;
  }

  }
}

function level1() {

  var ll1 = createButton(" Level 1 ");
  ll1.position(120, 200);

  ll1.mousePressed(() =>
  {
    levelS = l1;
    removeElements();
    frameCount = 0;
    player.destroy();
    finishBlock.destroy();
    for(var i = 0; i<obstacle.length; i++)
    {
      obstacle[i].destroy();
    }
    setup();
    gameState = play;
    score = 0;
  })
}

function level2() {

  var ll2 = createButton("Level 2");
  ll2.position(220, 200);

  ll2.mousePressed(() =>
  {
    levelS = l2;
    removeElements();
    frameCount = 0;
    player.destroy();
    finishBlock.destroy();
    for(var i = 0; i<obstacle.length; i++)
    {
      obstacle[i].destroy();
    }
    setup();
    gameState = play;
    score = 0;
  })
}

function level3() {

  var ll3 = createButton("Level 3");
  ll3.position(120, 300);

  ll3.mousePressed(() =>
  {
    levelS = l3;
    removeElements();
    frameCount = 0;
    player.destroy();
    finishBlock.destroy();
    for(var i = 0; i<obstacle.length; i++)
    {
      obstacle[i].destroy();
    }
    setup();
    gameState = play;
    score = 0;
  })
}

function level4() {
  
  var ll4 = createButton("Level 4");
  ll4.position(220, 300);

  ll4.mousePressed(() =>
  {
    levelS = l4;
    removeElements();
    frameCount = 0;
    player.destroy();
    finishBlock.destroy();
    for(var i = 0; i<obstacle.length; i++)
    {
      obstacle[i].destroy();
    }
    setup();
    gameState = play;
    score = 0;
  })
}

function obstacles() {
  for(var i = 0; i<obstacle.length; i++)
  {
    obstacle[i].collide(ground);
    obstacle[i].velocityY = gravity;
    obstacle[i].velocityX = -2;
    obstacle[i].addAnimation("enemyAnim", "sprite_5.png", "sprite_6.png", "sprite_7.png", "sprite_8.png");
    obstacle[i].scale = 2;
    if(obstacle[i].x < player.x-200)
    {
      obstacle[i].destroy();
      //obstacle.pop();
      //score++;
    }
    if(obstacle[i].isTouching(player))
    {
      textSize(20);
      text("YOU LOSE", player.x-50, player.y-150);
     
     
      //player.destroy();
      scoreIncrement = 0;
      enemySpeed = 0;
      obstacle[i].destroy;
      gameState = end;
      
      player.changeAnimation("DEAD");
      //remove();
    }
    if(obstacle[i].isTouching(ground))
    {
      obstacle[i].destroy();
    }
  }
}

function keyPressed()
{
  if(player.y > jumpSpace && key == ' ')
  {
    player.velocityY = jumpHeight;
  }
}