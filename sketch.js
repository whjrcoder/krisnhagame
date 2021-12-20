var score=0;

function preload(){
  krishnaimg=loadAnimation("images/run1.png","images/run2.png");
  bgImg=loadImage("images/bg3.jpg");
  //newbg=loadImage("images/newbg.jpg")
  potImg=loadImage("images/butter.png");
  bakasuraImg=loadImage("images/bakasura.png");
  //asura2Img=loadImage("images/");
  asura4Img=loadImage("images/asura4 copy.jpg");
  asura3Img=loadImage("images/asura3.png");
  krishna3Img=loadAnimation("images/krishna3.png");
  krishstand=loadImage("images/run1.png")
  bgsound=loadSound("images/Bgm.mp3")

}


function setup() {
  createCanvas(windowWidth,windowHeight);

bgSprite=createSprite(windowWidth/2,windowHeight/2,windowWidth,windowHeight);
bgSprite.scale=0.5;

krishsprite=createSprite(200,380,40,40);
//krishsprite.debug=true
krishsprite.addAnimation("run",  krishnaimg)
krishsprite.addAnimation("jump",  krishna3Img)
invisibleg=createSprite(200,400,50*windowWidth,10);
invisibleg.visible=false
 butterpotGroup=new Group()

krishsprite.velocityX=8;
//console.log(windowHeight);
  asuragroup=new Group();
bgsound.loop()
}

function draw() {
  console.log(frameCount)
  background("white");
  bgSprite.addImage(bgImg);
  krishsprite.addImage("stand",krishstand)
  //krishsprite.addAnimation("run",  krishnaimg)
  //krishsprite.changeAnimation("run",  krishnnaimg)
if(frameCount>300){
  bgSprite.addImage(bgImg);
}
if(frameCount>700){
  bgSprite.addImage(bgImg);
}


  camera.position.x=krishsprite.x+350;
  buttorpos=camera.position.x 
  bakasurapos=camera.position.x 

  camera.position.y=400;
  if(keyDown("space")){
    krishsprite.changeAnimation("jump",  krishna3Img)
    krishsprite.velocityY=-20;
    console.log(krishsprite.y);
  }
  krishsprite.velocityY=krishsprite.velocityY+2;
  if(krishsprite.isTouching(invisibleg)){
    krishsprite.changeAnimation("run",krishnaimg);

  }
  krishsprite.collide(invisibleg);
  spawnObstacles();
  spawnButterpot();
  if(krishsprite.isTouching(butterpotGroup)){
    butterpotGroup.destroyEach();
    score=score+10
  }
  if(krishsprite.isTouching(asuragroup)){
    //console.log("touching")
    asuragroup.destroyEach();
   
  }
  drawSprites();
  fill("red")
  textSize(40)
  text("SCORE :"+score,buttorpos,windowHeight/2-100)
  if(frameCount>800){
    krishsprite.velocityX=0;
    krishsprite.changeImage("stand",krishstand)
    asuragroup.destroyEach();
    butterpotGroup.destroyEach()
    fill("red")
    textSize(40)
    text("LEVEL UP,CONGRATS",buttorpos,windowHeight/2)
  }
}

function spawnButterpot(){
  if(frameCount % 120 === 0){
    var Butterpot = createSprite(buttorpos+300,350,30,30);
    Butterpot.addImage(potImg);
    Butterpot.velocityX=-5;
    Butterpot.scale=0.7;
    butterpotGroup.add(Butterpot)
  }
}

function spawnObstacles(){
  if(frameCount % 280 === 0){
    var asura = createSprite(bakasurapos+280,330,30,30);
   
    var rand=Math.round(random(1,3));
    switch(rand){
      case 1: asura.addImage(bakasuraImg);
     // asura.debug=true
     // asura.setCollider("rectangle",0,0,100,50)
    
  
      break;
      case 2: asura.addImage(asura4Img);
      asura.y=370;
      asura.scale=2;
      //asura.debug=true
      asura.setCollider("rectangle",0,0,40,50)
     
      
      break;
      case 3: asura.addImage(asura3Img);
      asura.velocityY=2;
     // asura.debug=true
      asura.scale=1
      //asura.setCollider("rectangle",0,0,100,50)
     
      
      break;
    }
    asuragroup.add(asura)
    for(j=0;j<asuragroup.length;j++){
    
    krishsprite.depth= asuragroup[j].depth;
krishsprite.depth=krishsprite.depth+1
  }
  
    asura.velocityX=-5;
    //asura.scale=2.0;
  }
}