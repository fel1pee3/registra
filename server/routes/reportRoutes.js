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

router.get('/reports', verifyToken, async (req, res) => {
    try {
        const db = await connectToDatabase();
        const query = 'SELECT * FROM reports WHERE reporting_user = ?';
        const [rows] = await db.query(query, [req.userId]);

        if (rows.length === 0) {
            return res.status(404).json({ message: "Nenhum registro encontrado para este usuário" });
        }

        return res.status(200).json({ registros: rows });
    } catch (err) {
        console.error('Erro ao buscar registros:', err);
        return res.status(500).json({ message: "Erro no servidor" });
    }
});

export default router