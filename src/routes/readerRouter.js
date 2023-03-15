const router = require('express').Router();
const { Reader } = require('../../db/models');
const isAuth = require('../middleware/isAuth');
const Layout = require('../views/Layout');
const Login = require('../views/Login');
const Profile = require('../views/Profile');
const EditReader = require('../views/EditReader');
const NewReader = require('../views/NewReader');
const bcrypt = require('bcrypt');

// const Home = require('../view/Home');

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

router.get('/newreaders', async (req, res, next) => {
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

router.post('/newreaders', async (req, res, next) => {
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
        // returning: true,
        // plain: true,
      }
    );
    // const reader = readerData.get({ plain: true });
    console.log('======= reader ========= >>>', readerData[1]);
    // res.json(readerData[1]);
    res.sendStatus(200);
  } catch (error) {
    error.type = 'Читатель не найден!';
    res.json({ msg: error.message, type: error.type });
  }
});

module.exports = router;
