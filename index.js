import express, { Router } from "express";
import { router } from "./routes/app.js";

export const app = express();
const port = process.env.PORT || 3000;

// parse JSON
app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.use('/movie', router)

// set the server to listen at port
app.listen(port, ()=> console.log(`server is listening at port ${port}`))