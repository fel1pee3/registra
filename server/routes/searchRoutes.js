import express from 'express'
import {connectToDatabase} from '../lib/db.js'
import verifyToken from '../middlewares/verifyToken.js'

const router = express.Router()

router.get('/searchs', verifyToken, async (req, res) => {
    const { q } = req.query; // Termo de busca
    const userId = req.userId; // Obtido do middleware verifyToken

    try {
        const db = await connectToDatabase();
        const [rows] = await db.query(
            `SELECT * FROM registers 
             WHERE user_registration = ? AND description LIKE ?`,
            [userId, `%${q}%`]
        );

        res.status(200).json(rows);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erro ao buscar registros' });
    }
});

export default router