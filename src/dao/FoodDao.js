
const fs = require('fs');

const FoodFilePath = `assets/data/Food.json`;
const fileContents = fs.readFileSync(FoodFilePath, 'utf-8');
class FoodDao {
    constructor() {
     
    }

    getAllFoodDao(location) {
      
           this.foods = JSON.parse(fileContents);
            const FoodData = this.foods;
          let check=0;
            const convertedFood = FoodData.map((food) => {
                let rate = 1.0;
            
                if (location == "US-NC") {
                    rate = 0.23;
                }
                else if (location == "IN") {
                    rate = 0.18;
                }
                else if (location == "IE") {
                    rate = 0.08;
                }
                else{
                    check=1;
                }
               
                food.price = food.price+food.price * rate;
                return {
                    ...food
                };
            })
            if(check==1)
            {
                return null;
            }
            return convertedFood;
    }

    getFilterFoodDao(queryObject){
        const foods = this.FoodDao.getAllFoodDao(location);
        const filteredFoods = foods.filter(food => {
            if (
                (queryObject.minprice && food.price < parseInt(queryObject.minprice)) ||
                (queryObject.maxprice && food.price > parseInt(queryObject.maxprice)) ||
                (queryObject.rating && food.rating < parseInt(queryObject.rating)) ||
                (queryObject.brand && food.brand !== queryObject.brand)
            ) {
                return false; 
            }
            return true; // Include this food item
        });
        return filteredFoods;
    }
}

module.exports = FoodDao;

