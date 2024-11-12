import express from 'express'
import {connectToDatabase} from '../lib/db.js'
import verifyToken from '../middlewares/verifyToken.js'

const router = express.Router()

router.post('/addOccurrence', verifyToken, async (req, res) => {
    const { title_register, type, description, date_register, time_register, class_register, student_name } = req.body;

    try {
        const db = await connectToDatabase();

        await db.query(
            'INSERT INTO registers (user_registration, title_register, type, description, date_register, time_register, class_register, student_name) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
            [req.userId, title_register, type, description, date_register, time_register, class_register, student_name]
        );

        res.status(201).json({ message: "Occurrence registered successfully" });
    } catch (err) {
        res.status(500).json({ message: "Server error", error: err });
    }
});

export default router