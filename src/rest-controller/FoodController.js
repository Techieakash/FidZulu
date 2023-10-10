
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
        //const { url }  = require('url');
        // router.get('/food/all/:location', this.getAllFoods.bind(this));
        router.get('/food/all/:location', this.filterFood.bind(this));
        this.app.use('/', router);
    }

    start() {
        this.app.listen(this.port, 
            () => console.log(`listening on port ${this.port}`))
    }

    
    getAllFoods(req, res) {
        const location = req.params.location;
        try {
            const foods = this.FoodDao.getAllFoodDao(location);
            console.log(foods);
            res.json(foods);
        }
        catch (err) {
            console.error(`error on GET foods: ${err}`);
            res.status(500).json({error: err});
        }
    }

    // filterFood(req,res){
    //     const location = req.params.location;
    //     const queryObject = new URL(req.url, `http://${req.headers.host}`).searchParams;
    //    const queryObject = req.query; 
    //     console.log(queryObject)
    //     try {
    //         const foods = this.FoodDao.getAllFoodDao(location);
    //         if ( 
    //         queryObject.has('rating') ) {
    //             console.log("I shouldnt be here")
    //             res.json(foods);
    //         } else {
              
    //             filterFood = this.FoodDao.getFilterFoodDao(queryObject);
    //         }
    //         res.json(this.filterFood);
    //     }catch (err) {
    //         console.error(`error on GET filtered foods: ${err}`);
    //         res.status(500).json({ error: err });
    //     }
    // }

    // stop(req, res) {
    //     try {
    //         this.productDao.shutdown();
    //         if (res) {
    //             res.status(200);
    //         }
    //     }
    //     catch (err) {
    //         console.error(`error shutting down: ${err}`);
    //         res.status(500).json({error: err});
    //     }
    // }
    filterFood(req,res){
        let get_params = url.parse(req.url, true).query;
        console.log(get_params);
        let location = req.params.location;
        console.log('got into foods');
        const foods = this.FoodDao.getAllFoodDao(location);
        if (Object.keys(get_params).length == 0) {
            console.log("I shouldnt be here")
            res.json(foods); 
         } 
         else {
            let key = Object.keys(get_params)[0]; // get first parameter only
            console.log("First key is: " + key);
            if (key != 'search') {
                response.status(404).send('Illegal parameter!');
             }
            else {
                let err = null;
                let value = request.query[key];
                console.log('param: ' + value);
                try {
                    if (!value) {
                    result = foods;
                    } 
                else {
                    result = this.FoodDao.getFilterFoodDao(value);
                }
            } catch (err) {
                console.log("Caught exception.");
                //createError(500);
                response.status(500).send('Something broke!');
             }
                if (result && !err) {
                response.setHeader('content-type', 'application/json');
                response.status(200).end(JSON.stringify(result));
             }
                else if (!err) {
                    response.status(404);
                    response.render('error',{ 
                    message: 'Not Found: 404',
                    detail: 'Illegal filter value!'});
                }
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
