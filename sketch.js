var dog,sadDog,happyDog;
var feed,createFood,foodObj;
var database,fedTime,lastFed;
var foodS;


function preload(){
  sadDog=loadImage("Dog.png");
  happyDog=loadImage("happy dog.png");
}

function setup() {
  createCanvas(1000,400);
  database = firebase.database()  
  dog=createSprite(800,200,150,150);
  dog.addImage(sadDog);
  dog.scale=0.15;

  feed = createButton("Feed The Dog")
  feed.position(700,95)
  feed.mousePressed(feedDog)

  createFood = createButton("Add Food")
  createFood.position(800,95)
  createFood.mousePressed(addFood)

  foodObj = new food()
  foodStock = database.ref('foodStock')
  foodStock.on("value",readStock)
}

function draw() {
  background(46,139,87);
  drawSprites();
  foodObj.display()
  fedTime = database.ref('feedTime')
  fedTime.on("value",function(data){
  lastFed = data.val()})
  fill("white")
  textSize(15)
  if (lastFed >= 12) {
    text("Last Fed :"+ lastFed % 12 + "PM",350,30)    
  }else if(lastFed === 0){
    text("lastFed :12AM",350,30)
  }else{
    text("lastFed :"+ lastFed + "AM",350,30)
  }
}

//function to read food Stock
function readStock(data){
  foodS = data.val()
  foodObj.updateFoodStock(foodS)
}

//function to update food stock and last fed time
function feedDog(){
  dog.addImage(happyDog)
if (foodObj.getFoodStock()<=0) {
  foodObj.updateFoodStock(foodObj.getFoodStock()*0) 
}else{
  foodObj.updateFoodStock(foodObj.getFoodStock()-1)
}

  database.ref('/').update({
    Food:foodObj.getFoodStock(),
    feedTime:hour()
  })

}

//function to add food in stock
function addFood() {
  foodS++
  database.ref('/').update({
    foodStock:foodS
  })
}