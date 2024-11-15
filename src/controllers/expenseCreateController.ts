import { Response } from "express";
import { Expense } from "../schemas/expenseSchema";
import { AuthRequest } from "../middleawares/token";

async function createExpense(req: AuthRequest, res: Response) {
    try {
        const { title, value, isMonthly } = req.body;
        const userId = req.userId;
        const expenseExists = await Expense.findOne({ title });
        if (expenseExists) {
            res.status(400).send({ error: "An expense with this title already exists!" });
            return;
        }
        const expense = new Expense({ title, value, isMonthly, userId });
        await expense.save();
        res.status(201).send({ message: "Expense was successfully created!", expense });
    } catch (error) {
        console.error("Error creating expense:", error);
        res.status(400).send({ error: "Expense creation failed" });
    }
}

export { createExpense };
