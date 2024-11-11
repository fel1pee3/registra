import express from 'express'
import jwt from 'jsonwebtoken'
import {connectToDatabase} from '../lib/db.js'

const router = express.Router()

const verifyToken = async (req, res, next) => {
    try{
        const token = req.headers['authorization'].split(' ')[1];
        if(!token){
            return res.status(403).json({message: "No Token Provided"})
        }
        const decoded = jwt.verify(token, process.env.JWT_KEY)
        req.userId = decoded.id
        next()
    } catch (err){
        return res.status(500).json({message: "server error"})
    }
}

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

router.get('/occurrences', verifyToken, async (req, res) => {
    try {
        const db = await connectToDatabase();

        const [rows] = await db.query('SELECT * FROM registers');
        
        if (rows.length === 0) {
            return res.status(404).json({ message: "No occurrences found" });
        }

        return res.status(200).json({ occurrences: rows });

    } catch (err) {
        console.error(err); // Log do erro no servidor para análise
        return res.status(500).json({ message: "Server error", error: err.message });
    }
});

export default router