const express = require('express');
const FoodDao = require('../../src/dao/FoodDao')
const bodyParser = require('body-parser');
const request = require('supertest'); // supertest library for making HTTP requests in tests
const FoodController = require('../../src/rest-controller/FoodController.js');

describe('FoodController', () => {
    let app;

    beforeAll(() => {
        app = express();
        app.use(bodyParser.json());

        const foodDao = new FoodDao;
        const foodController = new FoodController(foodDao);

        app.get('/food/all/:location', foodController.getAllFoods.bind(foodController));
        app.get('/food/all/:location/search', foodController.handleFoodRequest.bind(foodController));
    });

    describe('GET /food/all/:location', () => {
        it('should return all foods for a location', async () => {
            const response = await request(app).get('/food/all/US-NC');

            // Assertions
            expect(response.status).toBe(200);
            expect(response.body).toBeDefined();
            expect(response.body.length).toBeGreaterThan(0);
        });

        it('should handle errors gracefully', async () => {
            // Mock the FoodDao to throw an error
            const foodDao = new FoodDao();
            spyOn(foodDao, 'getAllFoodDao').and.throwError('Test Error');

            const foodController = new FoodController(foodDao);
            const app = express();
            app.use(bodyParser.json());
            app.get('/food/all/:location', foodController.getAllFoods.bind(foodController));

            const response = await request(app).get('/food/all/Not');

            // Assertions
            expect(response.status).toBe(400);
        });
    });

    describe('GET /food/all/:location/search', () => {
        it('should filter foods based on query parameters', async () => {
            const response = await request(app)
                .get('/food/all/US-NC/search')
                .query({ minprice: '10', maxprice: '12', rating: '4', brand: 'FruitFusion' });

            // Assertions
            expect(response.status).toBe(200);
            expect(response.body).toBeDefined();
            expect(response.body.length).toBeGreaterThan(0);
        });

        it('should handle no matching items gracefully', async () => {
            const response = await request(app)
                .get('/food/all/US-NC/search')
                .query({ minprice: '100', maxprice: '200', rating: '5', brand: 'Brand C' });

            // Assertions
            expect(response.status).toBe(200);
            expect(response.body).toBeDefined();
            expect(response.body.length).toBe(0);
        });

        it('should handle invalid query parameters gracefully', async () => {
            const response = await request(app)
                .get('/food/all/US-NC/search')
                .query({ invalidparam: 'invalidvalue' });

            // Assertions
            expect(response.status).toBe(400); // Bad Request status code
        });

        it('should handle invalid query parameter gracefully', async () => {
          const response = await request(app)
              .get('/food/all/US-NC/search')
              .query({ invalidparam: 'invalidvalue',minprice:'10' });

          // Assertions
          expect(response.status).toBe(400); // Bad Request status code
      });



        it('should handle errors gracefully', async () => {
            // Mock the FoodDao to throw an error
            const foodDao = new FoodDao();
            spyOn(foodDao, 'getAllFoodDao').and.throwError('Test Error');

            const foodController = new FoodController(foodDao);
            const app = express();
            app.use(bodyParser.json());
            app.get('/food/all/:location/search', foodController.handleFoodRequest.bind(foodController));

            const response = await request(app)
                .get('/food/all/US-NC/search')
                .query({ sinprice: '10' });

            // Assertions
            expect(response.status).toBe(400);
        });
    });
});
