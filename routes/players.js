import express from 'express';
import db from '../db.js';

const router = express.Router();

router.get('/', async (req, res, next) => {
  try {
    const queryData = req.query;
    const whereClause = Object.keys(queryData)
      .map((key) => `${key} = ?`)
      .join(' AND ');
    const sql = `SELECT * FROM players WHERE ${whereClause}`;
    const values = Object.values(queryData);
    const [result] = await db.execute(sql, values);
    res.status(200).send(result);
  } catch (err) {
    res.status(500).send(err.message);
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

    await db.query(sql, values);
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
  } catch (err) {
    res.status(500).send(err.message);
  }
});

router.put('/:player_id', async (req, res, next) => {
  const playerId = req.params.player_id;
  const updateData = req.body;
  try {
    const setClause = Object.keys(updateData)
      .map((key) => `${key} = ?`)
      .join(', ');
    const values = Object.values(updateData);
    const sql = `UPDATE players SET ${setClause} WHERE player_id = ?`;

    const [rows, fields] = await db.query(sql, [...values, playerId]);

    if (rows.affectedRows === 0) {
      return res
        .status(404)
        .send({ message: `Player with  ${playerId} not found` });
    }

    res.status(201).send({
      status: 201,
      message: `Player with player_id:${playerId} has been updated`,
    });
  } catch (err) {
    res.status(500).send(err.message);
  }
});

router.delete('/:player_id', async (req, res, next) => {
  try {
    const sql = `DELETE FROM players WHERE player_id=${req.params.player_id}`;
    const result = await db.query(sql);

    if (rows.affectedRows === 0) {
      return res
        .status(404)
        .send({ message: `Player with  ${playerId} not found` });
    }

    res.status(200).send({
      status: 204,
      message: `Player with player_id:${player_id} has been deleted`,
      result,
    });
  } catch (err) {
    res.status(500).send(err.message);
  }
});

export default router;
