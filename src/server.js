import express from 'express';
import morgan from 'morgan';
import store from 'session-file-store'; // не забудь установить! для хранения сессий в файле
import session from 'express-session'; // не забудь установить!
import apiRouter from './routes/api/apiRouter';
import regLoginRouter from './routes/api/regLoginRouter';
import renderMainRouter from './routes/render/renderMain';

const PORT = 3000;
const app = express();

const FileStore = store(session);

const sessionConfig = {
  name: 'user_sid', // Имя куки для хранения id сессии. По умолчанию - connect.sid
  secret: process.env.SESSION_SECRET ?? 'test',	// Секретное слово для шифрования, может быть любым
  resave: false, // Пересохранять ли куку при каждом запросе
  saveUninitialized: false, // Создавать ли сессию без инициализации ключей в req.session
  store: new FileStore(),
  cookie: {
    maxAge: 1000 * 60 * 60 * 12, // Срок истечения годности куки в миллисекундах
    httpOnly: true, // Серверная установка и удаление куки, по умолчанию true
  },
};

app.use(express.static('public'));
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(session(sessionConfig));

app.use('/api', apiRouter);
app.use('/api/auth', regLoginRouter);
app.use('/', renderMainRouter);

app.listen(PORT, () => {
  console.log('server start on port ', PORT);
});
