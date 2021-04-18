
var dog_image,hd_image;
var dog;
var database,FoodStock,food;
var Food;
var feedButton;
var addButton;
var foodObj;
var fedTime, lastFed;

function preload()
{
  dog_image=loadImage("dogImg.png");
  happy_img=loadImage("dogImg1.png")
}

function setup() {
  createCanvas(700, 700);
  database=firebase.database();

  foodObj=new Form; 

  FoodStock=database.ref('food');
  FoodStock.on("value",read);
  
  dog=createSprite(350,500,30,30);
  dog.addImage(dog_image);
  dog.scale=0.3;

  feedButton=createButton("Feed the Dog");
  feedButton.position(700,95);
  feedButton.mousePressed(feedDog);

  addButton=createButton("Add Food");
  addButton.position(800,95);
  addButton.mousePressed(addFood);


}

function draw() {  

  background(46,139,87);
  textSize(30);
  fill("white");

 
  fedTime=database.ref('FeedTime');
  fedTime.on("value",function(data){
    lastFed=data.val();
  });

  if(lastFed>=12){
    text("LAST FED:"+lastFed +"PM", 120, 95);
  }
  else{
    text("LAST FED:"+lastFed +"AM", 120, 95);
  }
  console.log(lastFed)
 
  

  foodObj.display();

   
 

  drawSprites();
}

function read(data){
   Food=data.val();
   foodObj.updateFoodStock(Food);
}

function write(){
    if(Food<=0){
      Food=0;
    }
   database.ref('/').set({
      'food':Food-1,
   })
}

function feedDog(){
  dog.addImage(happy_img);

  if(foodObj.getFoodStock()<= 0){
    foodObj.updateFoodStock(foodObj.getFoodStock()*0);
  }else{
    foodObj.updateFoodStock(foodObj.getFoodStock()-1);
  }  
  database.ref('/').update({
    'food':foodObj.getFoodStock(),
    'FeedTime':hour()
  })
}

function addFood(){
  Food++;
  database.ref('/').update({
    'food':Food
  })

}


