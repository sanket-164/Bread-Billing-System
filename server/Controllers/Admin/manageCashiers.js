import Cashier from "../../Models/Cashier.js";
import bcrypt from "bcryptjs";
import redisClient from "../../redisClient.js";

export const fetchCashier = async (req, res) => {
    const { id } = req.params;

    try {
        const data = await Cashier.find({ _id: id });

        if (data.length > 0) {
            res.status(200).json(data[0]);
        } else {
            res.status(400).json({ message: "Cashier does not exist" });
        }
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ message: error.message });
    }
}

export const fetchCashiers = async (req, res) => {

    try {
        const cachedCashiers = await redisClient.get("cashiers");
        
        if (cachedCashiers) {
            return res.status(200).json(JSON.parse(cachedCashiers));
        }

        const cashiers = await Cashier.find().sort({ joinedAt: 'desc' });
        
        redisClient.set("cashiers", JSON.stringify(cashiers));

        res.status(200).json(cashiers);
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ message: error.message });
    }
}

export const hireCashier = async (req, res) => {
    const { cashier } = req.body;

    const hashedPassword = await bcrypt.hash(cashier.password, 9);

    try {
        const newCashier = Cashier.create({ ...cashier, password: hashedPassword });

        await redisClient.del("cashiers");
        
        res.status(201).json(newCashier);
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ message: error.message });
    }
}


export const updateCashier = async (req, res) => {
    const { id } = req.params;
    const { cashier } = req.body;

    try {
        const updatedCashier = await Cashier.findByIdAndUpdate(id, {
            name: cashier.name,
            email: cashier.email,
            phone: cashier.phone,
            image: cashier.image,
            gender: cashier.gender,
            birthday: cashier.birthday
        });
        
        if (updatedCashier != null) {
            await redisClient.del("cashiers");
            
            res.status(200).json(updatedCashier);
        } else {
            res.status(400).json({ message: "Cashier does not exist" });
        }
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ message: error.message });
    }
}

export const deleteCashier = async (req, res) => {
    const { id } = req.params;

    try {
        const deletedCashier = await Cashier.findByIdAndDelete(id);

        if (deletedCashier != null) {
            await redisClient.del("cashiers");
            
            res.status(200).json(deletedCashier);
        } else {
            res.status(400).json({ message: "Cashier does not exist" });
        }

    } catch (error) {
        console.log(error.message);
        res.status(500).json({ message: error.message });
    }
}