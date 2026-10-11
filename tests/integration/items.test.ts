import request from "supertest";
import { app } from "../../src/app";
import { Item } from "../../src/models/items";

describe("Lost and Found Item API", () => {

    const baseUrl = "/api/v1/items";

    const testItemIds: string[] = [];

    const validItem = {
        name: "Jansport Backpack",
        description: "Grey Jansport backpack with a laptop compartment found in Block B hallway",
        category: "bags",
        type: "lost",
        location: "ATU Sligo Block B hallway",
        status: "open"
    };

    // Helper function to create an item for testing
    async function createTestItem() {
        const response = await request(app)
            .post(baseUrl)
            .send(validItem);

        expect(response.status).toBe(201);

        testItemIds.push(response.body._id);

        return response.body;
    }

    // Remove only items created by these tests
    afterEach(async () => {
        if (testItemIds.length > 0) {
            await Item.deleteMany({
                _id: { $in: testItemIds }
            });

            testItemIds.length = 0;
        }
    });

    // POST with valid data
    it("should create an item successfully", async () => {
        const response = await request(app)
            .post(baseUrl)
            .send(validItem);

        expect(response.status).toBe(201);
        expect(response.body.name).toBe("Jansport Backpack");
        expect(response.body.type).toBe("lost");
        expect(response.body._id).toBeDefined();

        testItemIds.push(response.body._id);
    });

    // POST with invalid data
    it("should reject invalid item data", async () => {
        const response = await request(app)
            .post(baseUrl)
            .send({
                ...validItem,
                name: "A",
                category: "invalid-category"
            });

        expect(response.status).toBe(400);
        expect(response.body.message).toBe("Validation failed");
    });

    // GET all items
    it("should retrieve all items", async () => {
        const item = await createTestItem();

        const response = await request(app).get(baseUrl);

        expect(response.status).toBe(200);
        expect(Array.isArray(response.body)).toBe(true);

        expect(
            response.body.some(
                (result: { _id: string }) =>
                    result._id === item._id
            )
        ).toBe(true);
    });

    // GET existing item by ID
    it("should retrieve an existing item", async () => {
        const item = await createTestItem();

        const response = await request(app)
            .get(`${baseUrl}/${item._id}`);

        expect(response.status).toBe(200);
        expect(response.body._id).toBe(item._id);
        expect(response.body.name).toBe(validItem.name);
    });

    // GET nonexistent item
    it("should return 404 for a missing item", async () => {
        const response = await request(app)
            .get(`${baseUrl}/507f1f77bcf86cd799439011`);

        expect(response.status).toBe(404);
    });

    // PUT existing item
    it("should update an existing item", async () => {
        const item = await createTestItem();

        const response = await request(app)
            .put(`${baseUrl}/${item._id}`)
            .send({
                ...validItem,
                name: "Updated Jansport Backpack",
                status: "resolved"
            });

        expect(response.status).toBe(200);
        expect(response.body.name).toBe("Updated Jansport Backpack");
        expect(response.body.status).toBe("resolved");
    });

    // PUT nonexistent item
    it("should return 404 when updating a missing item", async () => {
        const response = await request(app)
            .put(`${baseUrl}/507f1f77bcf86cd799439011`)
            .send(validItem);

        expect(response.status).toBe(404);
    });

    // PUT invalid data
    it("should reject invalid update data", async () => {
        const item = await createTestItem();

        const response = await request(app)
            .put(`${baseUrl}/${item._id}`)
            .send({
                ...validItem,
                name: "X",
                status: "invalid-status"
            });

        expect(response.status).toBe(400);
        expect(response.body.message).toBe("Validation failed");
    });

    // DELETE existing item
    it("should delete an existing item", async () => {
        const item = await createTestItem();

        const response = await request(app)
            .delete(`${baseUrl}/${item._id}`);

        expect(response.status).toBe(200);
        expect(response.body.message)
            .toBe("Item deleted successfully");

        const deletedItem = await Item.findById(item._id);

        expect(deletedItem).toBeNull();
    });

    // DELETE nonexistent item
    it("should return 404 when deleting a missing item", async () => {
        const response = await request(app)
            .delete(`${baseUrl}/507f1f77bcf86cd799439011`);

        expect(response.status).toBe(404);
    });

    // Invalid MongoDB ID
    it("should return 400 for an invalid item ID", async () => {
        const response = await request(app)
            .get(`${baseUrl}/not-a-valid-id`);

        expect(response.status).toBe(400);
        expect(response.body.message).toBe("Invalid item ID");
    });

});
