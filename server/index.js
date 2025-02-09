import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import bodyParser from "body-parser";
import connectToDatabase from "./database.js";
import adminRoutes from "./Routes/adminRoutes.js"
import authenticationRoutes from "./Routes/authenticationRoutes.js"
import cashierRoutes from "./Routes/cashierRoutes.js"
import morgan from "morgan";

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());
app.use(bodyParser.json({ limit: "50mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));
app.use(morgan("dev"));

connectToDatabase();

app.use('/authentication', authenticationRoutes);
app.use('/cashier', cashierRoutes);
app.use('/admin', adminRoutes);


app.listen(process.env.PORT, () => {
    console.log("Server listening on port http://localhost:" + process.env.PORT);
});

app.get('/', (req, res) => {
    return res.json({ "message": "Hello From Bread Billing Server" });
})