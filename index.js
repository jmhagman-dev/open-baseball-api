import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import helmet from 'helmet';
import compression from 'compression';
import players from './routes/players.js';

const app = express();
const port = process.env.PORT || 3000;

app.use(cors({ origin: '*' }));
app.use(helmet());
app.use(compression());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('tiny'));

app.get('/env', (req, res, next) => {
  try {
    const env = app.get('env');
    res.status(200).send({message: `Currently running in ${env} mode`})
  } catch (error) {
  }
})

app.use('/api/players', players);

app.listen(port, () => {
  console.log(`App now listening on port ${port}`);
});
