import {createCarZSchema} from "../../src/models/cars";

const validCar = {
    "make": "Toyota",
    "model": "Camry",
    "year": 2020,
}

describe("Test Car Validation", () => {
    it("should pass for the following valid data", () => {
        
        expect(() => createCarZSchema.parse({
            body: validCar
        })
        ).not.toThrow();
    });


    it('should fail for the too early year ', () => {

        expect(() => createCarZSchema.parse({
            body: { 
                ...validCar,
                year: 1949
            }
        })
    ).toThrow();
    });

    it('should fail for the unparsaable year ', () => {

        expect(() => createCarZSchema.parse(
            { body: { 
                ...validCar,
                year: 'wrong year' 
            } 
        })
    ).toThrow();
    });

    it('should fail when make is missing ', () => {

        expect(() => createCarZSchema.parse(
            { body: { 
                ...validCar, 
                make : undefined } 
            })
        ).toThrow();
    });

    it('should fail when the model is empty', () => {

        expect(() => createCarZSchema.parse(
            { body: { 
                ...validCar, 
                model: '' } 
            })
        ).toThrow();
    });

    it("should pass with no year", () => {
        expect(() => createCarZSchema.parse({ 
            body: { 
                make: "Toyota",
                model: "Camry" 
                } 
            })
        ).not.toThrow();
    });
});
