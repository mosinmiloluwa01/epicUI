//import '@babel/polyfill';
import express from 'express';
import cors from 'cors';
import path from 'path';

const app = express();
app.use(cors());
app.use(express.static(path.join(__dirname, './src')));

app.get('/', (req, res) => res.status(200).sendFile(path.join(__dirname, './src/html/login.html')));

const port = process.env.PORT || 6000;
app.listen(port, () => console.log(`Listening on ${port}`));

export default app;