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
        app.get('/food/all/:location', foodController.handleFoodRequest.bind(foodController));
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
            const response = await request(app).get('/food/all/Not');



            // Assertions
            expect(response.status).toBe(400);
        });
    });

    describe('GET /food/all/:location', () => {
        it('should filter foods based on query parameters', async () => {
            const response = await request(app)
                .get('/food/all/US-NC')
                .query({ minprice: '10', maxprice: '12', rating: '3', brand: 'FruitFusion' });



            // Assertions
            expect(response.status).toBe(200);
            expect(response.body).toBeDefined();
            expect(response.body.length).toBeGreaterThan(0);
        });



        it('should handle no matching items gracefully', async () => {
            const response = await request(app)
                .get('/food/all/US-NC')
                .query({ brand: 'Brand C' });

            // Assertions
            expect(response.status).toBe(200);
            expect(response.body).toBeDefined();
            expect(response.body.length).toBe(0);
        });



        it('should handle invalid query parameters gracefully', async () => {
            const response = await request(app)
                .get('/food/all/US-NC')
                .query({ invalidparam: 'invalidvalue' });



            // Assertions
            expect(response.status).toBe(400); // Bad Request status code
        });

        it('should handle invalid  and valid query parameter gracefully', async () => {
            const response = await request(app)
                .get('/food/all/US-NC')
                .query({ invalidparam: 'invalidvalue', minprice: '10' });
            // Assertions
            expect(response.status).toBe(200); // Bad Request status code
        });





        it('should handle errors gracefully for wrong location', async () => {
            const foodDao = new FoodDao();
            const foodController = new FoodController(foodDao);
            const response = await request(app)
                .get('/food/all/NOT')
                .query({ maxprice: '10' });

            // Assertions
            expect(response.status).toBe(400);
        });

        it('should handle errors gracefully for wrong location and wrong para,', async () => {
            const foodDao = new FoodDao();
            const foodController = new FoodController(foodDao);
            const response = await request(app)
                .get('/food/all/NOT')
                .query({ invalid: '10' });


        });
    });
});