import express from 'express'
import {connectToDatabase} from '../lib/db.js'
import verifyToken from '../middlewares/verifyToken.js'

const router = express.Router()

router.post('/addReport', verifyToken, async (req, res) => {
    const { date_report, time_report, class_report, description} = req.body;

    try {
        const db = await connectToDatabase();

        await db.query(
            'INSERT INTO reports (reporting_user, date_report, time_report, class_report, description) VALUES (?, ?, ?, ?, ?)',
            [req.userId, date_report, time_report, class_report, description]
        );

        res.status(201).json({ message: "Report registered successfully" });
    } catch (err) {
        res.status(500).json({ message: "Server error", error: err });
    }
});

export default router