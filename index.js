import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import helmet from 'helmet';
import compression from 'compression';
import mysql from 'mysql2/promise';

const app = express();


app.use(cors({ origin: '*' }));
app.use(helmet)
app.use(compression())
app.use(morgan('tiny'));


const connection = await mysql.createConnection({
  host: process.env.SQL_HOST,
  user: process.env.SQL_USER,
  port: process.env.SQL_PORT,
  password: process.env.SQL_PASS,
});

try {
  const results = await connection.query(
    'SELECT * FROM baseball.players',
  );

  console.log(results)

} catch (err) {
  console.log(err);
}

app.listen((3001), () => {
  console.log(`App now listening on port ${3001}`)
});
