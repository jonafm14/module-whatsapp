import "dotenv/config";
import express from "express";
import cors from "cors";
import { router } from "./infrastructure/router/whatsapp.router";

const port = process.env.PORT || 3002;
const app = express();
app.use(cors());
app.use(express.json());
app.use("/", router);

app.listen(port, () => console.log(`Ready on port: ${port}`));
