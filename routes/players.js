import express from 'express';
import db from '../db.js';

const router = express.Router();

router.get('/', async (req, res, next) => {
  try {
    const [results] = await db.query(`SELECT * FROM baseball.players`);
    res.status(200).send([{}]);
  } catch (err) {
    res.send(err)
  }
});

router.get('/:id', async (req, res, next) => {
  try {
    const [results] = await db.query(`SELECT * FROM baseball.players WHERE id=${req.params.id}`);
    res.status(200).send({});
  } catch (err) {
    res.send(err)
  }
});

export default router;
