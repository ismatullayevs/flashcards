import express from 'express';
import path from 'path';
import router from './routes';
import https from 'https';
import fs from 'fs';
import dotenv from 'dotenv';

dotenv.config()

const app = express()
const port = process.env.PORT || 3000;
const options = {
  key: fs.readFileSync(process.env.PRIVATE_KEY_PATH || ''),
  cert: fs.readFileSync(process.env.FULLCHAIN_KEY_PATH || ''),
}

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(__dirname + '/public'));
app.use(express.urlencoded({ extended: true }));

app.use('/', router);

https.createServer(options, app).listen(port, () => {
  console.log(`Flashcards app listening on port ${port}`)
})
