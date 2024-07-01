import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import bookRoutes from './routes/bookRoutes';
import userRoutes from './routes/userRoutes';

const app = express();

app.use(cors());
app.use(bodyParser.json());

app.use('/api', bookRoutes);
app.use('/api', userRoutes);

app.get('/', (req, res) => {
  res.send('API is running...');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
