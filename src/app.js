require('@babel/register');
require('dotenv').config();

const path = require('path');
const express = require('express');

const logger = require('morgan');
const session = require('express-session');
const FileStore = require('session-file-store')(session);
const createError = require('http-errors');

const ssr = require('./middleware/ssr');

const { sequelize } = require('../db/models');

// const renderComponent = require('./lib/renderComponent');

const app = express();

app.locals.title = 'BooksReviewer';

// Выносим порт в .env и на всякий случай подставляем дефолтный через ||
const PORT = process.env.PORT || 3001;

// данные для сессии и cookie
const sessionConfig = {
  name: 'booksReview', // * Название куки
  store: new FileStore(), // * подключение стора (БД для куки) для хранения
  secret: process.env.COOKIE_SEKRET, // * ключ для шифрования куки прописан в.env
  resave: true, // * если true, пересохраняет сессию, даже если она не поменялась
  saveUninitialized: false, // * Если false, куки появляются только при установке req.session
  cookie: {
    secure: false, // http/https
    maxAge: 1000 * 60 * 60 * 24 * 1, // * время жизни в ms (1 день)
    httpOnly: true, // * куки только по http
  },
};

// Импортируем созданныe в отдельныx файлах рутеры.
const appRouter = require('./routes/appRouter');
const readerRouter = require('./routes/readerRouter');
const bookRouter = require('./routes/bookRouter');
// const entriesRouter = require('./routes/entries');
// const usersRouter = require('./routes/user.router');
const Error = require('./views/Error');

app.use(session(sessionConfig));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// Чтобы наши статические файлы были видны браузеру, мы должны их подключить
app.use(express.static(path.join(__dirname, '../public/')));
app.use(ssr);
app.use(logger('dev'));

app.use('/', appRouter);
app.use('/readers', readerRouter);
app.use('/books', bookRouter);

// Если HTTP-запрос дошёл до этой строчки, значит ни один из ранее встречаемых рутов не ответил
// на запрос.Это значит, что искомого раздела просто нет на сайте.Для таких ситуаций используется
// код ошибки 404. Создаём небольшое middleware, которое генерирует соответствующую ошибку.
app.use((req, res, next) => {
  const error = createError(
    404,
    'Запрашиваемой страницы не существует на сервере.'
  );
  next(error);
});

// Отлавливаем HTTP-запрос с ошибкой и отправляем на него ответ.
app.use((err, req, res) => {
  // Получаем текущий ражим работы приложения.
  const appMode = req.app.get('env');
  // Создаём объект, в котором будет храниться ошибка.
  let error;

  // Если мы находимся в режиме разработки, то отправим в ответе настоящую ошибку.
  // В противном случае отправим пустой объект.
  if (appMode === 'development') {
    error = err;
  } else {
    error = {};
  }

  // Записываем информацию об ошибке и сам объект ошибки в специальные переменные,
  // доступные на сервере глобально, но только в рамках одного HTTP - запроса.
  res.locals.message = err.message;
  res.locals.error = error;

  // Задаём в будущем ответе статус ошибки. Берём его из объекта ошибки, если он там есть.
  // В противно случае записываем универсальный статуc ошибки на сервере - 500.
  res.status(err.status || 500);
  // Ренедрим React-компонент Error и отправляем его на клиент в качестве ответа.
  res.render(Error, res.locals);
});

app.listen(PORT, async () => {
  try {
    await sequelize.authenticate();
    console.log('Соединение с базой установлено!');
  } catch (err) {
    console.log(err, 'Error!');
  }
  console.log(`Сервер поднят на ${PORT} порту!`);
});
