
const fs = require('fs');

const FoodFilePath = `assets/data/Food.json`;
const fileContents = fs.readFileSync(FoodFilePath, 'utf-8');
class FoodDao {
    constructor() {
     
    }

    getAllFoodDao(location) {
      
           this.foods = JSON.parse(fileContents);
            const FoodData = this.foods;
            const convertedFood = FoodData.map((food) => {
                let rate = 1.0;
                if (location == "US-NC") {
                    rate = 0.23;
                }
                if (location == "IN") {
                    rate = 0.18;
                }
                if (location == "IE") {
                    rate = 0.08;
                }
                food.price = food.price+food.price * rate;
                return {
                    ...food
                };
            })
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

