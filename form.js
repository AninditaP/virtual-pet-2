class Form{
  constructor(){
     this.lastFed;
     this.stock=0;
     this.image=loadImage("Milk.png")
  }

  updateFoodStock(foodStock){
    this.foodStock=foodStock;
  }
  deductFood(){
    if(this.foodStock>0){
      this.foodStock=this.foodStock-1
    }
  }
  getFoodStock(){
    return this.foodStock;
  }
  getFedTime(lastFed){
    this.lastFed=lastFed;
  }


  display(){
    var x=80;
    var y=100;

      imageMode(CENTER);
      image(this.image,220,500,70,70);

      if(this.foodStock!=0){
        for (var i=0; i<this.foodStock;i++){
          if (i%10==0){
            x=80;
            y=y+50
          }
          image (this.image,x,y,50,50);
          x=x+30
        }

      }

  }




}

























