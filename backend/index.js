import express from 'express';

const app = express();
const PORT = process.env.PORT || 8080;

app.use(express.json());

app.get('/', (req, res) => {
  res.json({ message: 'Backend running' });
});

app.listen(PORT, () => {
  console.log(`Server on http://localhost:${PORT}`);
});