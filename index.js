import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import helmet from 'helmet';
import compression from 'compression';
import mysql from 'mysql2/promise';

const app = express();
const port = process.env.PORT || 3001;

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
  const [results, fields] = await connection.query(
    'SELECT * FROM people.employees',
  );

  console.log({fields, results});

} catch (err) {
  console.log(err);
}

app.listen((port), () => {
  console.log(`App now listening on port ${port}`)
});
