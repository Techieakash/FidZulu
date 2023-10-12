const cors = require("cors");
const express = require('express');
const FoodDao = require('../dao/FoodDao');
const router = express.Router();
const bodyParser = require('body-parser');
const url = require('url');


class FoodController {
    constructor() {
        this.port = process.env.PORT || 3032;
        this.FoodDao = new FoodDao();
        this.app = express();
        this.app.use(bodyParser.json());
        router.get('/food/all/:location', this.handleFoodRequest.bind(this));
        router.get('/food/team', this.handleteamrequest.bind(this));
        this.app.use('/', router);
        this.app.use(cors());
    }

    start() {
        this.app.listen(this.port, () => console.log(`listening on port ${this.port}`))
    }

    handleteamrequest(req, res) {
        res.send({
            "team": "Halwai 👨‍🍳 , 👨‍🍳",
            "memberNames": ["Udupa, Akash", "Kumar, Aryan"]
        })
    }


    handleFoodRequest(req, res) {
        const { location } = req.params;
        
        const queryParams = req.query;
     
        const foods =this.FoodDao.getAllFoodDao(location);
      
        if (foods == null) {
            res.status(400).json({ error: "Bad request" });
            return;
        }
        if (Object.keys(queryParams).length === 0) {
           
            res.json(foods);
        } else {
            let check = 0;
            if(Object.keys(queryParams).length ==4)
            {
                if(queryParams.minprice||queryParams.maxprice||queryParams.brand||queryParams.rating)
                    check=1;
            }
    
            try {
              
                let result =foods;
               
                if (queryParams.minprice || check == 1) {
                    const minPrice = parseFloat(queryParams.minprice);

                    result = result.filter(food => food.price >= minPrice);
                }

                if (queryParams.maxprice || check == 1) {
                    const maxPrice = parseFloat(queryParams.maxprice);
                    result = result.filter(food => food.price <= maxPrice);
                }

                if (queryParams.rating || check == 1) {
                    const minRating = parseFloat(queryParams.rating);
                    result = result.filter(food => food.rating >= minRating);
                }

                if (queryParams.brand || check == 1) {
                    const brand = queryParams.brand;
                    result = result.filter(food => food.brand.toLowerCase() === brand.toLowerCase());
                }
                if (check||queryParams.minprice||queryParams.maxprice||queryParams.rating||queryParams.brand)
                    res.json(result);
                else{
                    res.status(400).json({error:"Bad request"})
                }
            } catch (err) {
               
                res.status(500).send('Something broke!');
            }
        }
    }
}

module.exports = FoodController;

if (require.main === module) {
    const api = new FoodController();
    api.start();
}
