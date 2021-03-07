var database;
var dog,dogImage,dogImage1,food,foodImage,foodStock,foodRef;
var feed;
var fedTime,lastFed,foodRem;
var foodObj;
var namebox;
var value;
var milkimg,milkbottle;
function preload()
{
  dogimage = loadImage("Dog.png");
  dogimage2 = loadImage("happydog.png");
  milkimg = loadImage("Milk.png");
}

function setup() {
  createCanvas(500, 500);
  foodObj=new Food();
 

  dog = createSprite(450,300);
  dog.addImage(dogimage);
  dog.scale = 0.2;

  database = firebase.database();
  

  feed = createButton("Feed your dog");
  feed.position(550,150);
  feed.mousePressed(feedDog);

  addFood=createButton("Add Food");
  addFood.position(450,150);
  addFood.mousePressed(addFoods);
  
  namebox = createInput('').attribute('placeholder','Your pet name');
  namebox.position(250,150)

  milkbottle = createSprite(370,320)
  milkbottle.addImage(milkimg)
  milkbottle.visible = 0
  milkbottle.scale = 0.1
}


function draw() {  
  background(46, 139, 87);
  drawSprites();
  value = namebox.value();
  console.log(value)
  foodObj.display();
  fedTime=database.ref('FeedTime');
  fedTime.on("value",function(data){
    lastFed=data.val();
  })
  fill("white");
  textSize(15);
  if(lastFed>=12){
    text("Last Fed : "+ lastFed%12 + " PM", 200,30);
   }else if(lastFed==0){
     text("Last Fed : 12 AM",200,30);
   }else{
     text("Last Fed : "+ lastFed + " AM", 200,30);
   }
   fill(4,23,117)
   textSize(20)
   text(value,400,dog.y-80)
}
function feedDog()
{
  foodObj.getFoodStock();
  if(foodObj.foodStock<=0)
  {
    foodObj.foodStock=0;
    milkbottle.visible=0;
    dog.addImage(dogimage);
  }
  else{
    dog.addImage(dogimage2);
    if(foodObj.foodStock===1)
    {
        milkbottle.visible=0;
        dog.addImage(dogimage);
    }
    else
    milkbottle.visible = 1
    foodObj.updateFoodStock(foodObj.foodStock-1);
    database.ref('/').update({
    Food:foodObj.foodStock,
    FeedTime:hour()
    });
  }
}
function addFoods()
{
  
  foodObj.updateFoodStock(foodObj.foodStock+1);
  database.ref('/').update({
    Food:foodObj.foodStock
  });
}