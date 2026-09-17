import express, {Application, Request, Response} from "express" ;
import carRoutes from "./routes/cars" ;

const PORT = process.env.PORT || 3001;

const app: Application = express();

app.get("/ping", async (_req : Request, res: Response) => {
    res.json({
    message: "hello from Jack "
    });
});

app.listen(PORT, () => {
    console.log("Server is running on port", PORT);
    });

app.use('/api/v1/cars', carRoutes);

app.use(express.json());