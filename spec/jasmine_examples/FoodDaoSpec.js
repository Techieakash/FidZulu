// const fs = require('fs');
// const FoodDao = require('../../src/dao/FoodDao'); // Update the path accordingly

// describe('FoodDao', () => {
//     let foodDao;

//     beforeAll(() => {
//         // Load the test data or mock the file contents if needed
//         const testFileContents = JSON.stringify([
//             {
//                 id: 1,
//                 name: 'Food Item 1',
//                 price: 10,
//                 rating: 4,
//                 brand: 'Brand A',
//             },
//             {
//                 id: 2,
//                 name: 'Food Item 2',
//                 price: 15,
//                 rating: 5,
//                 brand: 'Brand B',
//             },
//         ]);
        
//         // Mock the fs.readFileSync method to return the test data
//         spyOn(fs, 'readFileSync').and.returnValue(testFileContents);

//         // Create an instance of FoodDao
//         foodDao = new FoodDao();
//     });

//     describe('getAllFoodDao', () => {
//         it('should return all food items with updated prices for US-NC', () => {
//             const location = 'US-NC';
//             const result = foodDao.getAllFoodDao(location);

//             // Assertions
//             expect(result).toBeDefined();
//             expect(result.length).toBe(2);
//             expect(result[0].price).toBeCloseTo(12.3, 2); // Check updated price
//             expect(result[1].price).toBeCloseTo(18.45, 2); // Check updated price
//         });

//     //     it('should return all food items with updated prices for IN', () => {
//     //         const location = 'IN';
//     //         const result = foodDao.getAllFoodDao(location);

//     //         // Assertions
//     //         expect(result).toBeDefined();
//     //         expect(result.length).toBe(2);
//     //         expect(result[0].price).toBeCloseTo(11.8, 2); // Check updated price
//     //         expect(result[1].price).toBeCloseTo(16.2, 2); // Check updated price
//     //     });

//     //     it('should return all food items with updated prices for IE', () => {
//     //         const location = 'IE';
//     //         const result = foodDao.getAllFoodDao(location);

//     //         // Assertions
//     //         expect(result).toBeDefined();
//     //         expect(result.length).toBe(2);
//     //         expect(result[0].price).toBeCloseTo(10.8, 2); // Check updated price
//     //         expect(result[1].price).toBeCloseTo(15.3, 2); // Check updated price
//     //     });

//     //     it('should handle empty data file gracefully', () => {
//     //         // Mock the fs.readFileSync method to return an empty array
//     //         spyOn(fs, 'readFileSync').and.returnValue(JSON.stringify([]));

//     //         const location = 'US-NC';
//     //         const result = foodDao.getAllFoodDao(location);

//     //         // Assertions
//     //         expect(result).toBeDefined();
//     //         expect(result.length).toBe(0);
//     //     });

//     //     // Add more test cases for edge cases and scenarios
//     // });

//     // describe('getFilterFoodDao', () => {
//     //     it('should filter food items based on query parameters', () => {
//     //         const queryObject = {
//     //             minprice: '12',
//     //             maxprice: '20',
//     //             rating: '4',
//     //             brand: 'Brand A',
//     //         };
//     //         const result = foodDao.getFilterFoodDao(queryObject);

//     //         // Assertions
//     //         expect(result).toBeDefined();
//     //         expect(result.length).toBe(1);
//     //         expect(result[0].price).toBeCloseTo(12.3, 2); // Check updated price
//     //         expect(result[0].rating).toBe(4);
//     //         expect(result[0].brand).toBe('Brand A');
//     //     });

//     //     it('should handle no matching items gracefully', () => {
//     //         const queryObject = {
//     //             minprice: '100',
//     //             maxprice: '200',
//     //             rating: '5',
//     //             brand: 'Brand C',
//     //         };
//     //         const result = foodDao.getFilterFoodDao(queryObject);

//     //         // Assertions
//     //         expect(result).toBeDefined();
//     //         expect(result.length).toBe(0);
//     //     });

//     //     it('should handle empty queryObject', () => {
//     //         const queryObject = {};
//     //         const result = foodDao.getFilterFoodDao(queryObject);

//     //         // Assertions
//     //         expect(result).toBeDefined();
//     //         expect(result.length).toBe(2); // Should return all items
//     //     });

//     //     // Add more test cases for edge cases and scenarios
//     });
// });