import express, {Application, Request, Response} from "express" ;
import itemRoutes from "./routes/items" ;
import { logger } from './middleware/logging.middleware';
import swaggerUi from "swagger-ui-express";
import { swaggerSpec } from "./config/swagger";


export const app: Application = express();

// Middleware to parse JSON bodies
app.use(express.json());

// Swagger documentation route
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec))

// Use the logging middleware
app.use(logger);

// Test endpoint to check if the server is running
app.get("/ping", async (_req : Request, res: Response) => {
    res.json({
    message: "Lost and found API is running",
    });
});

// Use the item routes for handling item-related requests
app.use('/api/v1/items', itemRoutes);




