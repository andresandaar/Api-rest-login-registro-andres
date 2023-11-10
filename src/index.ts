import * as express from "express"
import { AppDataSource } from "./data-source"
import * as cors from 'cors';
import helmet from "helmet";
import routes from "./routes/index";
import 'dotenv/config';
const PORT= process.env.PORT ||  3000



AppDataSource.initialize().then(async () => {
    // create express app
    const app = express();
    // Middlewares
    app.use(cors());
    app.use(helmet());
    app.use(express.json());
    //Routes
    app.use('/',routes);
    // start express server
    app.listen(PORT,()=>console.log(`Server has started on port ${PORT}. Open http://localhost:${PORT} to see results`))

}).catch(error => console.log(error))
