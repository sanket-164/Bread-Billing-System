import Admin from "../../Models/Admin.js";
import Cashier from "../../Models/Cashier.js";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

export const login = async (req, res) => {
    const { email, password, role } = req.body;

    try {

        if (role === "Admin") {
            const admin = await Admin.findOne({ email: email });

            if (!admin) return res.json({ success: false, message: "Email Not Found" });

            const checkPass = await bcrypt.compare(password, admin.password);

            if (checkPass) {
                const token = jwt.sign({ email: admin.email, id: admin._id }, process.env.SECRET_KEY);
                res.json({ success: true, token: token });
            } else {
                return res.json({ success: false, message: "Wrong Creadentials" })
            }

        } else if (role === "Cashier") {
            const cashier = await Cashier.findOne({ email: email });

            if (!cashier) return res.json({ success: false, message: "Email Not Found" });

            const checkPass = await bcrypt.compare(password, cashier.password);

            if (checkPass) {
                const token = jwt.sign({ email: cashier.email, id: cashier._id }, process.env.SECRET_KEY);
                res.json({ success: true, token: token });
            } else {
                return res.json({ success: false, message: "Wrong Creadentials" })
            }

        } else {
            res.json({ success: false, message: "Wrong Creadentials" });
        }

    } catch (error) {
        console.log(error.message);
        res.status(500);
    }
}