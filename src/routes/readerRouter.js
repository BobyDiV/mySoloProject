const router = require('express').Router();
const bcrypt = require('bcrypt');
const { Pool } = require('pg');
const { Reader, Book } = require('../../db/models');
const isAuth = require('../middleware/isAuth');
const Layout = require('../views/Layout');
const Login = require('../views/Login');
const Profile = require('../views/Profile');
const EditReader = require('../views/EditReader');
const NewReader = require('../views/NewReader');

const pool = new Pool({
  connectionString: process.env.DB_URI,
  ssl: {
    rejectUnauthorized: false,
  },
});

router.get('/', async (req, res, next) => {
  try {
    console.log('======== /routers/ ========');
    res.render(Layout, {});
  } catch (error) {
    next(error);
  }
});
router.get('/login', async (req, res, next) => {
  try {
    console.log('======== /routers/login ========');
    res.render(Login, {});
  } catch (error) {
    next(error);
  }
});
router.get('/logout', (req, res) => {
  req.session.destroy((error) => {
    if (error) console.error(error);
    else {
      res.clearCookie('booksReview');
      res.render(Layout, {});
    }
  });
});

router.get('/newreader', async (req, res, next) => {
  try {
    console.log('======== /newreader ========');
    res.render(NewReader, {});
  } catch (error) {
    next(error);
  }
});

router.post('/login', async (req, res, next) => {
  try {
    const { login, emailAddress, password } = req.body;
    const readerData = await Reader.findOne({ where: { login, emailAddress } });
    const reader = readerData.get({ plain: true });

    const passwordCheck = await bcrypt.compare(password, reader.password);
    if (passwordCheck) {
      req.session.reader = reader;
      res.json(reader);
    } else {
      res.json({ msg: 'В доступе отказано !!!' });
    }
  } catch (error) {
    error.type = 'Пользователь не найден!';
    res.json({ msg: error.message, type: error.type });
  }
});

router.post('/newreader', async (req, res, next) => {
  try {
    console.log('======== /POST/newreader ========');
    const { login, fullName, emailAddress, password } = req.body;
    const hashPassword = await bcrypt.hash(password, 10);

    const readerData = await Reader.create({
      login,
      fullName,
      emailAddress,
      password: hashPassword,
    });

    const reader = readerData.get({ plain: true });
    req.session.reader = reader;
    res.json(reader);
  } catch (error) {
    error.type = 'Ошибка добавления пользователя в БД';
    next(error);
  }
});

router.get('/profile', isAuth, async (req, res, next) => {
  try {
    console.log('======== /profile ========');

    const readerId = req.session.reader.id;

    const readerData = await Reader.findOne({ where: { id: readerId } });
    const reader = readerData.get({ plain: true });
    console.log('======= /profile /reader ========= >>>', reader);

    res.render(Profile, { readerData });
  } catch (error) {
    next(error);
  }
});

router.get('/profile/:id', isAuth, async (req, res, next) => {
  try {
    console.log('======== /profile/:id ========');
    const readerId = req.params.id;

    const readerData = await Reader.findOne({ where: { id: readerId } });
    const reader = readerData.get({ plain: true });
    console.log('======= /profile/:id ========= >>>', reader);

    res.render(EditReader, { readerData });
  } catch (error) {
    next(error);
  }
});

router.post('/profile/editor', async (req, res, next) => {
  try {
    console.log('========= Welcome to /profile/editor/ ==========');
    console.log(req.session.reader);
    const readerData = await Reader.update(
      {
        login: req.body.login,
        fullName: req.body.fullName,
        emailAddress: req.body.emailAddress,
      },
      {
        where: { id: req.session.reader.id },
      }
    );
    res.sendStatus(200);
  } catch (error) {
    error.type = 'Читатель не найден!';
    res.json({ msg: error.message, type: error.type });
  }
});

router.get('/eraser/profile/:id', isAuth, async (req, res, next) => {
  console.log('========= delete profile reader ==========', req.params.id);
  try {
    const readerId = +req.params.id;
    const response = fetch('/readers/deleteReader', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ readerId }),
    });
    if (response.ok) {
      console.log('User deleted successfully.');
    } else {
      console.error('Failed to delete Reader.');
    }
  } catch (error) {
    res.render(Error, {
      message:
        'Что-то пошло не так!!! Не удалось удалить книгу из базы данных.',
      error: {},
    });
  }
});

router.post('/deleteReader', async (req, res, next) => {
  const { readerId } = req.body;
  try {
    await pool.query('BEGIN');
    await pool.query('DELETE FROM users WHERE id = $1', [readerId]);
    await pool.query('DELETE FROM orders WHERE readerId = $1', [readerId]);
    await pool.query('COMMIT');
    res.sendStatus(200);
  } catch (error) {
    await pool.query('ROLLBACK');
    console.error(error);
    res.sendStatus(500);
  }
});

module.exports = router;
