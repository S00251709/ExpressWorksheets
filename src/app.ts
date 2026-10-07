import express, {Application, Request, Response} from "express" ;
import carRoutes from "./routes/cars" ;
//import {authenticateKey} from './middleware/auth.middleware';
import { logger } from './middleware/logging.middleware';
import swaggerUi from "swagger-ui-express";
import { swaggerSpec } from "./config/swagger";


export const app: Application = express();

app.use(express.json());

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec))

//app.use(authenticateKey);
app.use(logger);


app.get("/ping", async (_req : Request, res: Response) => {
    res.json({
    message: "hello from Jack "
    });
});


app.use('/api/v1/cars', carRoutes);




