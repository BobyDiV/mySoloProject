const router = require('express').Router();
const Layout = require('../views/Layout');
const GoogleApiInfo = require('../views/GogleApiInfo');
const GoogleQuery = require('../views/GoogleQuery');
const ReaderLoveList = require('../views/ReaderLoveList');

const { Book } = require('../../db/models');

router.get('/readerList', async (req, res, next) => {
  console.log('========= bookRouter.js reader List========');

  const books = await Book.findAll({
    where: { readerId: +req.session.reader.id },
  });

  res.render(ReaderLoveList, { books });
});

router.post('/isBook', async (req, res, next) => {
  console.log('========= bookRouter.js  / isBook ========');

  const { isbn, title, author, readerId, linkInfo } = req.body;
  try {
    const response = await Book.findOrCreate({
      where: { isbn, title, author, readerId, linkInfo },
    });
    res.status(200).json(response);
  } catch (error) {
    res.render(Error, {
      message: 'Не удалось добавить книгу в базy данных.',
      error: {},
    });
  }
});

module.exports = router;
