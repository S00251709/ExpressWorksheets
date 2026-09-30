import express, {Application, Request, Response} from "express" ;
import carRoutes from "./routes/cars" ;
import { env } from "./config/env";
import { connectDB } from "./config/database";
//import {authenticateKey} from './middleware/auth.middleware';

const PORT = env.port;

const app: Application = express();

app.use(express.json());

app.get("/ping", async (_req : Request, res: Response) => {
    res.json({
    message: "hello from Jack "
    });
});


app.use('/api/v1/cars', carRoutes);



const startServer = async () => {
  await connectDB();

  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
};

startServer();

