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

router.get('/registers', verifyToken, async (req, res) => {
    try {
        const db = await connectToDatabase();
        const query = 'SELECT * FROM registers WHERE user_registration = ?';
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