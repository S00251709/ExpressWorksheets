import swaggerJSDoc from "swagger-jsdoc";

const options: swaggerJSDoc.Options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Lost and Found API",
      version: "1.0.0",
      description: "REST API for Campus Lost and Found",
    },
    servers: [
        {
            url: "http://localhost:3000",
            description: "Local development server"
        },
    ],
    components: {
      schemas:{
        ItemInput: {
          type: "object",
          required: ["name", "description", "category", "type", "location"],
          properties: {
            name: {
              type: "string",
              minLength: 2,
              maxLength: 50,
              example: "Sony Headphones"
            },
            description: {
              type: "string",
              minLength: 10,
              maxLength: 500,
              example: "Black Sony headphones found in the library"
            },
            category: {
              type: "string",
              enum: ["electronics", "clothing", "books", "bags", "toys", "other"]
            },
            type: {
              type: "string",
              enum: ["lost", "found"]
            },
            location: {
              type: "string",
              minLength: 2,
              maxLength: 100,
              example: "ATU Sligo Library"
            },
            status: {
              type: "string",
              enum: ["open", "resolved"],
              default: "open"
            }
          }
        },
        Item: {
          allOf: [
            { $ref: "#/components/schemas/ItemInput" },
            {
              type: "object",
              properties: {
                _id: {
                  type: "string",
                  example: "507f1f77bcf86cd799439011"
                },
                createdAt: {
                  type: "string",
                  format: "date-time"
                },
                updatedAt: {
                  type: "string",
                  format: "date-time"
                }
              }
            }
          ]
        }
      }
    }
  },
  apis: ["./src/routes/*.ts"]
};

export const swaggerSpec = swaggerJSDoc(options);