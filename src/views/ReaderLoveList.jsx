const React = require('react');
const Layout = require('./Layout');

function ReaderLoveList(props) {
  const { books, reader } = props;

  console.log(books);
  return (
    <Layout {...props}>
      <h1>Ваши любимые книги...</h1>
      <main name="readerlist">
        <ul id="ul" className="books-list no-bullets no-padding">
          {books.map((book, index) => (
            <li id={index} className="google-item pad-b-2" key={index}>
              <span
                id={book.isbn}
                value={book.isbn}
                className="book-isbn block font-3-4 c-lt-gray"
              >
                ISBN:
                <p className="book-isbn font-1 pad-b-1-1 c-white">
                  {book.isbn}
                </p>
              </span>
              <span
                id={book.title}
                value={book.title}
                className="book-title block font-3-4 c-lt-gray"
              >
                Название:
                <p className="book-title font-1 pad-b-1-1 c-white">
                  {book.title}
                </p>
              </span>
              <span
                id={book.author}
                className="book-author block font-3-4 c-lt-gray"
              >
                Автор:
                <p className="book-author font-1 pad-b-1-1 c-white">
                  {book.author}
                </p>
              </span>

              <span
                id={book.linkInfo}
                className="book-link block font-3-4 c-lt-gray"
              >
                Дополнительная информация ▶▶▶
                <a
                  id="link"
                  href={book.linkInfo}
                  target="_blank"
                  value={book.linkInfo}
                  className="book-link font-1 pad-b-1-1 c-orange"
                >
                  {book.linkInfo}
                </a>
              </span>
              {reader?.id ? (
                <>
                  <button
                    name="edit"
                    type="button"
                    className="edit font-3-4 pointer"
                  >
                    {' '}
                    Изменить
                  </button>

                  <button
                    name="delete"
                    type="button"
                    className="delete font-3-4 pointer"
                  >
                    {' '}
                    Удалить
                  </button>
                </>
              ) : null}
            </li>
          ))}
        </ul>
      </main>
      {/* <script src="/js/addLoveBook.js" /> */}
    </Layout>
  );
}

module.exports = ReaderLoveList;
