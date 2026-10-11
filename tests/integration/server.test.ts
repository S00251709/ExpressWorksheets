import request from "supertest";
import { app } from "../../src/app";

describe("GET /ping", () => {
    it("should confirm the Lost and found API is running", async () => {
        const response = await request(app).get("/ping");

        expect(response.status).toBe(200);

        expect(response.body).toEqual({
            message: "Lost and found API is running"
        });
    });
});