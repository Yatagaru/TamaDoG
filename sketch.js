//crie uma base de dados com o horário da última refeição e a quantidade de comida disponível ('Food')
//adicione as configurações do banco de dados ao index.html
var dog,sadDog,happyDog, database;
var foodS,foodStock;
var addFood;
var foodObj;

//criar variáveis da última refeição e do botão de alimentar
var lastFed, feedButton;

function preload(){
sadDog=loadImage("Dog.png");
happyDog=loadImage("happy dog.png");
}

function setup() {
  database= firebase.database();
  createCanvas(1000,400);

  foodObj = new Food();

  foodStock=database.ref('Food');
  foodStock.on("value",readStock);
  
  dog=createSprite(800,200,150,150);
  dog.addImage(sadDog);
  dog.scale=0.15;

  //crie um botão de alimente o cachorro aqui. Chame a função feedDog(alimente o cachorro) quando o botão for pressionado
  feedButton = createButton("Alimentar o Cão")
  feedButton.position(900,400)
  feedButton.mousePressed(feedDog)
  

  addFood=createButton("Adicionar comida ao estoque");
  addFood.position(800,95);
  addFood.mousePressed(addFoods);

  
  

}

function draw() {
  background(46,139,87);
  foodObj.display();
  database.ref("FeedHour").on("value",function(data){
   lastFed = data.val();
  })


  fill("white")
  stroke("black")
  textSize(20)
  text("Ultima refeição: "+ lastFed,350,30)
drawSprites();
  }
 


//função de ler o estoque de comida
function readStock(data){
  foodS=data.val();
  foodObj.updateFoodStock(foodS);
}

//função de alimentar o cachorro
function feedDog(){
  dog.addImage(happyDog);
  
  lastFed = hour();
  //diminuia a quantidade de comida no estoque e atualizar a hora da última refeição
  
  // use a função hora() para obter a hora atual do seu computador
  var food_stock_val = foodObj.getFoodStock();
  if(food_stock_val <= 0){
    foodObj.updateFoodStock(food_stock_val *0)
  }else{
    foodObj.updateFoodStock(food_stock_val -1)
  }
 database.ref("/").update({
   FeedHour: lastFed,
   Food: foodObj.foodStock
   
 }) 
}

//aumentando o número de comida do estoque
function addFoods(){
  foodS++; 
  database.ref('/').update({
    Food:foodS
  });
}
