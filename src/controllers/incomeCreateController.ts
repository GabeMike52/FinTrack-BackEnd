import { Request, Response } from "express";
import { Income } from "../schemas/incomeSchema";
import { AuthRequest } from "../middleawares/token";

async function createIncome(req: AuthRequest, res: Response) {
    try {
        const { title, value, isRecurrent } = req.body;
        const userId = req.userId;
        const incomeExists = await Income.findOne({ title });
        if (incomeExists) {
            res.status(400).send({
                error: "An income with this title was already created!",
            });
            return;
        }
        // const userId = req.userId;
        const income = new Income({ title, value, isRecurrent, userId });
        console.log(income);
        await income.save();
        res.status(201).send(income);
    } catch (error) {
        console.error("Error creating income:", error);
        res.status(400).send({ error: "Income creation failed!" });
    }
}

export { createIncome };