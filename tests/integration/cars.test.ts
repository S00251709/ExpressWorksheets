import request from "supertest";
import { app } from "../../src/app";

let createdCarId: string;

describe("Get /cars", () => {
    it("returns all cars", async () => {
        const response = await request(app).get("/api/v1/cars");
        expect(response.status).toBe(200);
        expect(Array.isArray(response.body)).toBe(true);
    });
});

describe("POST /cars", () => {
    it("creates a new car", async () => {
        const response = await request(app)
            .post("/api/v1/cars")
            .set("x-api-key", "blahblah")
            .send({
                make: "Testmake",
                model: "Testmodel",
                year: 2022,
            });
        expect(response.status).toBe(201);

        expect(response.body).toMatchObject({
            make: "Testmake",
            model: "Testmodel",
            year: 2022,
        });
        createdCarId = response.body._id;
    });

    it(("rejects invalid car data"))
});
