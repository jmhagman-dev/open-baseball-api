import express from 'express';
import db from '../db.js';

const router = express.Router();

router.get('/', async (req, res, next) => {
  try {
    const [results] = await db.query(`SELECT * FROM icqyziic3s8brpuj.players`);
    res.status(200).send(results);
  } catch (err) {
    res.send(err);
  }
});

router.get('/:id', async (req, res, next) => {
  try {
    const [results] = await db.query(
      `SELECT * FROM icqyziic3s8brpuj.players WHERE player_id=${req.params.player_id}`,
    );
    res.status(200).send(results[0]);
  } catch (err) {
    res.send(err);
  }
});

router.post('/', async (req, res, next) => {
  try {
    const {
      first_name,
      last_name,
      uniform_number,
      bats,
      throws,
      team,
      positions,
    } = req.body;

    const sql =
      'INSERT INTO players (first_name, last_name, uniform_number, bats, throws, team, positions) VALUES (?, ?, ?, ?, ?, ?, ?)';
    const values = [
      first_name,
      last_name,
      uniform_number,
      bats,
      throws,
      team,
      positions,
    ];

    const [result, error] = await db.query(sql, values);
    res.send(result, error);
  } catch (error) {
    res.send(error);
  }
});

export default router;
