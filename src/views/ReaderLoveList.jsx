const React = require('react');
const Layout = require('./Layout');

function ReaderLoveList(props) {
  const { books, reader } = props;
  console.log(
    '🚀 ~ file: ReaderLoveList.jsx:6 ~ ReaderLoveList ~ books:',
    books
  );

  return (
    <Layout {...props}>
      <h1>Ваши любимые книги...</h1>
      <main name="readerlist">
        <ul id="ul" className="books-list no-bullets no-padding">
          {books.map((book, index) => (
            <li
              id={index}
              name={book.id}
              className="google-item pad-b-2 oneBook"
              key={index}
            >
              <div
                className="card mb-3"
                style={{
                  maxWidth: '685px',
                  background: '#885334',
                  padding: '3px',
                }}
              >
                <div className="row g-0">
                  <div className="col-md-2">
                    <img
                      src={`${book.bookCover}`}
                      className="img-fluid rounded-start"
                      alt="imagelink"
                      data-pictureurl={book.bookCover}
                      style={{
                        margin: '15px 5px',
                        minHeight: '128px',
                        borderRadius: '10px',
                      }}
                    />
                  </div>
                  <div className="col-md-10">
                    <div className="card-body">
                      <h5
                        data-isbn={book.isbn}
                        className="card-title"
                      >{`ISBN: ${book.isbn}`}</h5>
                      <small className="text-body-secondary">Название:</small>
                      <p data-title={book.title} className="card-text">
                        {book.title}
                      </p>
                      <small className="text-body-secondary">Автор:</small>
                      <p data-authors={book.authors} className="card-text">
                        {book.author}
                      </p>
                      <small className="text-body-secondary">
                        Доп.информация⇛
                      </small>
                      <a
                        id={book.linkInfo}
                        data-link={book.linkInfo}
                        href={book.linkInfo}
                        target="_blank"
                        value={book.linkInfo}
                        className="book-link font-1 pad-b-1-1 c-orange card-text"
                      >
                        {book.linkInfo}
                      </a>
                      <br />

                      {reader?.id ? (
                        <>
                          <button
                            id={book.id}
                            name="edit"
                            type="button"
                            className="edit font-3-4 pointer"
                          >
                            {' '}
                            Изменить
                          </button>

                          <button
                            id={book.id}
                            name="delete"
                            type="button"
                            className="delete font-3-4 pointer"
                          >
                            {' '}
                            Удалить
                          </button>
                        </>
                      ) : null}
                    </div>
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </main>
      <script src="/js/listBook.js" />
    </Layout>
  );
}

module.exports = ReaderLoveList;
