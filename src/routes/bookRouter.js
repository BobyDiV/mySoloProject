const router = require('express').Router();
const ReaderLoveList = require('../views/ReaderLoveList');
const EditBookInfo = require('../views/EditBookInfo');
const Library = require('../views/Library');
const isAuth = require('../middleware/isAuth');

const { Book, Reader } = require('../../db/models');

router.get('/readerList', isAuth, async (req, res, next) => {
  console.log('========= bookRouter.js reader List========');

  const books = await Book.findAll({
    where: { readerId: +req.session.reader.id },
    order: [['id', 'ASC']],
    raw: true,
  });

  res.render(ReaderLoveList, { books });
});

router.get('/info/:id/:windowname', isAuth, async (req, res, next) => {
  try {
    console.log('======== /book/:id :windowname ========');

    const { windowname } = req.params;
    const bookData = await Book.findOne({ where: { id: +req.params.id } });
    const bookInfo = bookData.get({ plain: true });
    // console.log('======= /book/:id ========= >>>', bookInfo);

    res.render(EditBookInfo, { bookInfo, windowname });
  } catch (error) {
    next(error);
  }
});

router.get('/library', async (req, res) => {
  const withoutLogo = true; // изменяет LAYOUT (меняет логотип)

  const books = await Book.findAll({
    order: [
      ['isbn', 'ASC'],
      ['author', 'ASC'],
      ['readerId', 'ASC'],
    ],
    include: [{ model: Reader, attributes: ['fullName'], as: 'reader' }],
    limit: 1000,
    raw: true,
  });

  res.render(Library, { books, withoutLogo });
});

router.post('/editor/:id', isAuth, async (req, res, next) => {
  // console.log('========= bookRouter.js  / post ========', req.params.id);
  // console.log('=== Welcome to edit info of the book =====', req.body);

  try {
    const result = await Book.update(
      {
        isbn: req.body.isbn,
        title: req.body.title,
        author: req.body.author,
        linkInfo: req.body.linkInfo,
      },
      {
        where: { id: req.params.id },
      }
    );
    // console.log('==== RESULT UPDATE =======', result);

    res.status(200).json(result);
  } catch (error) {
    res.render(Error, {
      message: 'А вот и нет!! Не удалось изменить информацию о книге',
      error: {},
    });
  }
});

router.post('/isBook', isAuth, async (req, res, next) => {
  console.log('========= bookRouter.js  / isBook ========');

  const { isbn, title, author, readerId, linkInfo, bookCover } = req.body;
  console.log({ isbn }, { title }, { author }, { bookCover }, { readerId });
  try {
    const response = await Book.findOrCreate({
      where: { isbn, title, author, readerId, linkInfo },
      defaults: { bookCover },
    });
    res.status(200).json(response);
  } catch (error) {
    res.render(Error, {
      message: 'Не удалось добавить книгу в базy данных.',
      error: {},
    });
  }
});

router.delete('/:id', isAuth, async (req, res, next) => {
  console.log('========= bookRouter.js  / delete ========');
  try {
    const result = await Book.destroy({ where: { id: +req.params.id } });
    res.json(result);
  } catch (error) {
    res.render(Error, {
      message:
        'Что-то пошло не так!!! Не удалось удалить книгу из базы данных.',
      error: {},
    });
  }
});

module.exports = router;
