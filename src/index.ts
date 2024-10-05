import dotenv from "dotenv";
import express from "express";
import routes from "./routes/main.router";

dotenv.config({path: ".env"});

const app = express();

app.use(express.json())

app.use('/api', routes);
app.listen(process.env.PORT, () => {
    console.log(`Server running on port ${process.env.PORT}`);
})

