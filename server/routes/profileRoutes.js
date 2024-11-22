import express from 'express'
import {connectToDatabase} from '../lib/db.js'
import verifyToken from '../middlewares/verifyToken.js'
import generateRandomCode from '../middlewares/randomCode.js'

const router = express.Router()

router.put('/update-username', verifyToken, async (req, res) => {
    const { newUsername } = req.body;
  
    if (!newUsername) {
      return res.status(400).json({ message: 'O nome de usuário não pode estar vazio.' });
    }
  
    try {
      const db = await connectToDatabase();
      const query = 'UPDATE users SET username = ? WHERE id = ?';
      const [result] = await db.execute(query, [newUsername, req.userId]);
  
      if (result.affectedRows === 0) {
        return res.status(404).json({ message: 'Usuário não encontrado.' });
      }
  
      res.status(200).json({ message: 'Nome de usuário atualizado com sucesso!' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Erro ao atualizar o nome de usuário.' });
    }
});

router.put('/update-position', verifyToken, async (req, res) => {
    const { position } = req.body;
  
    try {
      const db = await connectToDatabase();
      const query = 'UPDATE users SET position = ? WHERE id = ?';
      const [result] = await db.execute(query, [position, req.userId]);
  
      if (result.affectedRows === 0) {
        return res.status(404).json({ message: 'Usuário não encontrado.' });
      }
  
      res.status(200).json({ message: 'Cargo atualizado com sucesso!' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Erro ao atualizar o cargo.' });
    }
});

router.post('/become-leader', verifyToken, async (req, res) => {
  try {
    const db = await connectToDatabase();
    const leaderCode = generateRandomCode();

    const query = 'UPDATE users SET leader_code = ? WHERE id = ?';
    const [result] = await db.execute(query, [leaderCode, req.userId]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Usuário não encontrado.' });
    }

    res.status(200).json({ message: 'Agora você é um líder!', leaderCode });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erro ao se tornar líder.' });
  }
});

router.post('/associate-leader', verifyToken, async (req, res) => {
  const { leaderCode } = req.body;

  if (!leaderCode) {
    return res.status(400).json({ message: 'Código de líder é obrigatório.' });
  }

  try {
    const db = await connectToDatabase();
    const query = 'SELECT id FROM users WHERE leader_code = ?';
    const [rows] = await db.execute(query, [leaderCode]);

    if (rows.length === 0) {
      return res.status(404).json({ message: 'Código de líder inválido.' });
    }

    const leaderId = rows[0].id;

    const updateQuery = 'UPDATE users SET leader_id = ? WHERE id = ?';
    await db.execute(updateQuery, [leaderId, req.userId]);

    res.status(200).json({ message: 'Você foi associado a um líder!' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erro ao associar o líder.' });
  }
});

router.get('/leader-occurrences', verifyToken, async (req, res) => {
  try {
    const db = await connectToDatabase();
    const occurrencesQuery = `
      SELECT r.id_register, r.title_register, r.description, r.date_register, r.time_register, r.type, r.class_register, r.student_name
      FROM registers r
      JOIN users u ON r.user_registration = u.id
      WHERE u.leader_id = ?;
    `;
    const [occurrences] = await db.execute(occurrencesQuery, [req.userId]); 
    if (occurrences.length === 0) {
      return res.status(404).json({ message: 'Nenhuma ocorrência encontrada para seus associados.' });
    }

    res.status(200).json({ occurrences });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erro ao buscar ocorrências.' });
  }
});

export default router