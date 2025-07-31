import express from 'express';
import db from '../db.js';

const router = express.Router();

router.get('/', async (req, res, next) => {
  try {
    const [result] = await db.query(`SELECT * FROM players`);
    res.status(200).send(result);
  } catch (err) {
    res.status(500).send(err);
  }
});

router.get('/:player_id', async (req, res, next) => {
  try {
    const sql = `SELECT * FROM players WHERE player_id=${req.params.player_id}`;
    const [result] = await db.query(sql);
    res.status(200).send(result[0]);
  } catch (err) {
    res.status(500).send(err.message);
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

    const [result] = await db.query(sql, values);
    res.status(201).send({
      status: 201,
      messsage: 'Successfully added new player to database',
      player: {
        first_name,
        last_name,
        uniform_number,
        bats,
        throws,
        team,
        positions,
      },
    });
  } catch (error) {
    res.status(500).send();
  }
});

export default router;
