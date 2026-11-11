import request from "supertest";
import { app } from "../../src/app";

let createdCarId: string;

describe("Cars API integration tests", () => {

    it("returns all cars", async () => {

        const response = await request(app)
            .get("/api/v1/cars");

        expect(response.status).toBe(200);
        expect(Array.isArray(response.body)).toBe(true);
    });

    it("rejects POST without an api key", async () => {

        const response = await request(app)
            .post("/api/v1/cars")
            .send({
                make: "TestMake",
                model: "TestModel",
                year: 2020
            });

        expect(response.status).toBe(401);
    });

    it("rejects invalid car data", async () => {

        const response = await request(app)
            .post("/api/v1/cars")
            .set("x-api-key", "blahblah")
            .send({
                make: "",
                model: "TestModel",
                year: 1940
            });

        expect(response.status).toBe(400);
    });

    it("creates a new car", async () => {

        const response = await request(app)
            .post("/api/v1/cars")
            .set("x-api-key", "blahblah")
            .send({
                make: "TestMake",
                model: "TestModel",
                year: 2020
            });

        expect(response.status).toBe(201);

        expect(response.body).toMatchObject({
            make: "TestMake",
            model: "TestModel",
            year: 2020
        });

        expect(response.body._id).toBeDefined();

        createdCarId = response.body._id;
    });

    it("returns the created car", async () => {

        const response = await request(app)
            .get(`/api/v1/cars/${createdCarId}`);

        expect(response.status).toBe(200);

        expect(response.body).toMatchObject({
            _id: createdCarId,
            make: "TestMake",
            model: "TestModel",
            year: 2020
        });
    });

    it("updates the created car", async () => {

        const response = await request(app)
            .put(`/api/v1/cars/${createdCarId}`)
            .send({
                make: "UpdatedMake",
                model: "UpdatedModel",
                year: 2021
            });

        expect(response.status).toBe(200);

        expect(response.body).toMatchObject({
            _id: createdCarId,
            make: "UpdatedMake",
            model: "UpdatedModel",
            year: 2021
        });
    });

    it("rejects invalid update data", async () => {

        const response = await request(app)
            .put(`/api/v1/cars/${createdCarId}`)
            .send({
                make: "",
                model: "UpdatedModel",
                year: 1940
            });

        expect(response.status).toBe(400);
    });

    it("deletes the created car", async () => {

        const response = await request(app)
            .delete(`/api/v1/cars/${createdCarId}`);

        expect(response.status).toBe(200);
        expect(response.body._id).toBe(createdCarId);
    });

    it("returns 404 after the car has been deleted", async () => {

        const response = await request(app)
            .get(`/api/v1/cars/${createdCarId}`);

        expect(response.status).toBe(404);
    });

});