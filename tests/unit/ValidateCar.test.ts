import {createCarZSchema} from "../../src/models/cars";

const validCar = {
    "make": "Toyota",
    "model": "Camry",
    "year": 2020,
}

describe("Test Car Validation", () => {
    it("should pass for the following valid data", () => {
        
        expect(() => createCarZSchema.parse(validCar)).not.toThrow();
    });


    it('should fail for the too early year ', () => {

        expect(() => createCarZSchema.parse(
            { ...validCar, "year": 1949 })).toThrow();
});

    it('should fail for the unparsaable year ', () => {

        expect(() => createCarZSchema.parse(
            { ...validCar, "year": 'wrong year' })).toThrow();
    });

    it('should fail when make is missing ', () => {

        expect(() => createCarZSchema.parse(
            { ...validCar, "make": undefined })).toThrow();
    });

    it('should fail when the model is empty', () => {

        expect(() => createCarZSchema.parse(
            { ...validCar, "model": '' })).toThrow();
    });
});
