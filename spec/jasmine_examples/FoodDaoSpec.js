const fs = require('fs');
const FoodDao = require('../../src/dao/FoodDao'); // Update the path accordingly


describe('FoodDao', () => {
    let foodDao;

    beforeAll(() => {
      foodDao = new FoodDao();
    });

    

  

    describe('getAllFoodDao', () => {
        it('should return all food items with updated prices for US-NC', () => {
            const location = 'US-NC';
            const result = foodDao.getAllFoodDao(location);

            // Assertions
            expect(result).toBeDefined();
            expect(result.length).toBe(19);
            expect(result[0].price).toBeCloseTo(11.07,2); // Check updated price
            expect(result[18].price).toBeCloseTo(14.76, 2); // Check updated price
        });

        it('should return all food items with updated prices for IN', () => {
            const location = 'IN';
            const result = foodDao.getAllFoodDao(location);

            // Assertions
            expect(result).toBeDefined();
            expect(result.length).toBe(19);
            expect(result[0].price).toBeCloseTo(10.62, 2); // Check updated price
            expect(result[18].price).toBeCloseTo(14.16, 2); // Check updated price
        });

        it('should return all food items with updated prices for IE', () => {
            const location = 'IE';
            const result = foodDao.getAllFoodDao(location);

            // Assertions
            expect(result).toBeDefined();
            expect(result.length).toBe(19);
            expect(result[0].price).toBeCloseTo(9.72, 2); // Check updated price
            expect(result[18].price).toBeCloseTo(12.96, 2); // Check updated price
        });

        it('should handle empty data file gracefully', () => {
            const location = 'NOT';
            const result = foodDao.getAllFoodDao(location);

            // Assertions
            expect(result).toBe(null);
        });
    })
});