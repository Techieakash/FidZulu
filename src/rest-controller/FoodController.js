
const express = require('express');
const FoodDao = require('../dao/FoodDao');
const router  = express.Router();
const bodyParser = require('body-parser'); 
const url = require('url');


class FoodController {
    constructor() { 
        this.port = process.env.PORT || 3032;
        this.FoodDao = new FoodDao();
        this.app = express();
        this.app.use(bodyParser.json());
        router.get('/food/all/:location', this.getAllFoods.bind(this));
        router.get('/food/all/:location/search', this.handleFoodRequest.bind(this));
        this.app.use('/', router);
    }

    start() {
        this.app.listen(this.port, () => console.log(`listening on port ${this.port}`))
    }

    getAllFoods(req, res) {
        const location = req.params.location;
        try {
            const foods = this.FoodDao.getAllFoodDao(location);
            console.log("Size of the foods",foods.length);
            res.json(foods);
        }
        catch (err) {
            console.error(`error on GET foods: ${err}`);
            res.status(500).json({ error: err });
        }
    }

    handleFoodRequest(req, res) {
        const { location } = req.params;
        console.log("Location",location)
        const queryParams = req.query;
        console.log(queryParams);
        console.log('got into foods');
        const foods = this.FoodDao.getAllFoodDao(location);

        if (Object.keys(queryParams).length === 0) {
            console.log("No query parameters provided");
            res.json(foods);
        } else {
            try {
                let result = foods;

                if (queryParams.minprice) {
                    const minPrice = parseFloat(queryParams.minprice);
                    result = result.filter(food => food.price >= minPrice);
                }

                if (queryParams.maxprice) {
                    const maxPrice = parseFloat(queryParams.maxprice);
                    result = result.filter(food => food.price <= maxPrice);
                }

                if (queryParams.rating) {
                    const minRating = parseFloat(queryParams.rating);
                    result = result.filter(food => food.rating >= minRating);
                }

                if (queryParams.brand) {
                    const brand = queryParams.brand;
                    result = result.filter(food => food.brand.toLowerCase() === brand.toLowerCase());
                }

                res.json(result);
            } catch (err) {
                console.log("Caught exception.");
                res.status(500).send('Something broke!');
            }
        }
    }
}

module.exports = FoodController;

// When a file is run directly from Node.js, require.main is set to its module. 
// So if require.main === module, this file is being executed as a standalone program.
// Otherwise it is being "required" by another module; e.g., a spec module
if (require.main === module) {
    const api = new FoodController();
    api.start();
}
