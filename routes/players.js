import express from 'express';
import db from '../db.js';

const router = express.Router();

router.get('/', async (req, res, next) => {
  try {
    const [results] = await db.query(`SELECT * FROM icqyziic3s8brpuj.players`);
    res.status(200).send(results);
  } catch (err) {
    res.send(err)
  }
});

router.get('/:id', async (req, res, next) => {
  try {
    const [results] = await db.query(`SELECT * FROM icqyziic3s8brpuj.players WHERE player_id=${req.params.player_id}`);
    res.status(200).send(results[0]);
  } catch (err) {
    res.send(err)
  }
});

export default router;
