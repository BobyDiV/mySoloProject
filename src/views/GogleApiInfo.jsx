const React = require('react');
const Layout = require('./Layout');

function GoogleApiInfo(props) {
  const { books, reader } = props;
  return (
    <Layout {...props}>
      <h1>Информация по Вашему запросу ...</h1>
      <main name="googlelist">
        <ul id="ul" className="books-list no-bullets no-padding">
          {books.map((book, index) => (
            <li id={index} className="google-item pad-b-2" key={index}>
              <span
                id={book.id}
                value={book.id}
                className="book-isbn block font-3-4 c-lt-gray"
              >
                ISBN:
                <p className="book-isbn font-1 pad-b-1-1 c-white">{book.id}</p>
              </span>
              <span
                id={book.volumeInfo.title}
                value={book.volumeInfo.title}
                className="book-title block font-3-4 c-lt-gray"
              >
                Название:
                <p className="book-title font-1 pad-b-1-1 c-white">
                  {book.volumeInfo.title}
                </p>
              </span>
              <span
                id={book.volumeInfo.authors}
                className="book-author block font-3-4 c-lt-gray"
              >
                Автор:
                <p className="book-author font-1 pad-b-1-1 c-white">
                  {book.volumeInfo.authors}
                </p>
              </span>

              <span
                id={book.volumeInfo.infoLink}
                className="book-link block font-3-4 c-lt-gray"
              >
                Дополнительная информация ▶▶▶
                <a
                  id="link"
                  href={book.volumeInfo.infoLink}
                  target="_blank"
                  value={book.volumeInfo.infoLink}
                  className="book-link font-1 pad-b-1-1 c-orange"
                >
                  {book.volumeInfo.infoLink}
                </a>
              </span>
              {reader?.id ? (
                <button
                  id={reader.id}
                  name="addBook"
                  type="button"
                  // href="/books/newbook"
                  className="addBook font-3-4 pointer"
                >
                  {' '}
                  ▶▶▶ Добавить в список любимых книг
                </button>
              ) : null}
            </li>
          ))}
        </ul>
      </main>
      <script src="/js/addLoveBook.js" />
    </Layout>
  );
}

module.exports = GoogleApiInfo;