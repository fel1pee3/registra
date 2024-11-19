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
        const query = 'SELECT * FROM registers WHERE user_registration = ? ORDER BY date_register DESC';
        const [rows] = await db.query(query, [req.userId]);

        if (rows.length === 0) {
            return res.status(404).json({ message: "No records found for this user" });
        }

        return res.status(200).json({ registros: rows });
    } catch (err) {
        console.error('Error fetching records:', err);
        return res.status(500).json({ message: "Server error" });
    }
});

router.get('/count', verifyToken, async (req, res) => {
    try {
        const db = await connectToDatabase();
        const query = 'SELECT COUNT(*) AS total FROM registers WHERE user_registration = ?';
        const [rows] = await db.query(query, [req.userId]);
        const totalRecords = rows[0].total;

        return res.status(200).json({ totalRecords });
    } catch (err) {
        console.error('Error counting records:', err);
        return res.status(500).json({ message: "Server error" });
    }
});

router.get('/registers/:id', verifyToken, async (req, res) => {
    try {
        const db = await connectToDatabase();
        const query = 'SELECT * FROM registers WHERE id_register = ? AND user_registration = ?';
        const [rows] = await db.query(query, [req.params.id, req.userId]);

        if (rows.length === 0) {
            return res.status(404).json({ message: "Record not found or does not belong to this user" });
        }

        return res.status(200).json({ registro: rows[0] });
    } catch (err) {
        console.error('Error fetching record:', err);
        return res.status(500).json({ message: "Server error" });
    }
});

router.delete('/removeRegisters/:id', verifyToken, async (req, res) => {
    try {
      const db = await connectToDatabase();
      const { id } = req.params;
  
      const checkQuery = 'SELECT * FROM registers WHERE id_register = ? AND user_registration = ?';
      const [rows] = await db.query(checkQuery, [id, req.userId]);
  
      if (rows.length === 0) {
        return res.status(404).json({ message: "Record not found or does not belong to this user" });
      }
  
      const deleteQuery = 'DELETE FROM registers WHERE id_register = ? AND user_registration = ?';
      const [deleteResult] = await db.query(deleteQuery, [id, req.userId]);
  
      if (deleteResult.affectedRows === 0) {
        return res.status(404).json({ message: "Failed to delete the record" });
      }
  
      return res.status(200).json({ message: "Record deleted successfully" });
    } catch (err) {
      console.error('Error deleting record:', err);
      return res.status(500).json({ message: "Server error" });
    }
});

export default router