import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import authRoutes from './routes/auth';
import notificationRoutes from './routes/notifications';
import activityRoutes from './routes/activity';
import synthesisRoutes from './routes/synthesis';
import historyRoutes from './routes/history';
import vaultRoutes from './routes/vault';
import userRoutes from './routes/user';

const app = express();
const PORT = process.env.PORT || 8080;

app.use(cors());
app.use(morgan('dev'));
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/notifications', notificationRoutes);
app.use('/api/activity', activityRoutes);
app.use('/api/synthesis', synthesisRoutes);
app.use('/api/history', historyRoutes);
app.use('/api/vault', vaultRoutes);
app.use('/api/user', userRoutes);


app.get('/', (req, res) => {
  res.json({ message: 'ContentForge Alchemy API Running', version: '1.0.0-PRO' });
});

app.listen(PORT, () => {
  console.log(`Alchemy Engine Online: http://localhost:${PORT}`);
});
