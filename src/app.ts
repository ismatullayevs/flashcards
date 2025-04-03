import express from 'express';
import path from 'path';
import router from './routes';

const app = express()
const port = process.env.PORT || 3000;

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(__dirname + '/public'));
app.use(express.urlencoded({ extended: true }));

app.use('/', router);

app.listen(port, () => {
  console.log(`Flashcards app listening on port ${port}`)
})
