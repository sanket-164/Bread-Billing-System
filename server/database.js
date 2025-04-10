import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const connectToDatabase = () => {
    mongoose.connect(process.env.CONNECTION_STRING || 'mongodb://0.0.0.0:27017/billingsystem');

    const db = mongoose.connection;

    db.on('error',(err) => {
        console.log(err);
    });

    db.once('open', () => {
        console.log("Connected to MonogDB");
    });
}

export default connectToDatabase;