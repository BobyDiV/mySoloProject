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
                    {book.volumeInfo?.imageLinks?.thumbnail ? (
                      <img
                        src={book.volumeInfo.imageLinks.thumbnail}
                        className="img-fluid rounded-start"
                        alt="imagelink"
                        data-pictureurl={book.volumeInfo.imageLinks.thumbnail}
                        style={{
                          margin: '15px 5px',
                          minHeight: '128px',
                          borderRadius: '10px',
                        }}
                      />
                    ) : (
                      <img
                        src={`/images/Picture_${
                          6 - Math.floor(Math.random() * 5)
                        }.jpg`}
                        className="img-fluid rounded-start"
                        alt="imagelink"
                        data-pictureurl={`/images/Picture_${
                          6 - Math.floor(Math.random() * 5)
                        }.jpg`}
                        style={{
                          margin: '15px 5px',
                          maxHeight: '128px',
                          borderRadius: '10px',
                        }}
                      />
                    )}
                  </div>
                  <div className="col-md-10">
                    <div className="card-body">
                      <h5
                        data-isbn={book.id}
                        className="card-title"
                      >{`ISBN: ${book.id}`}</h5>
                      <small className="text-body-secondary">Название:</small>
                      <p
                        data-title={book.volumeInfo.title}
                        className="card-text"
                      >
                        {book.volumeInfo.title}
                      </p>
                      <small className="text-body-secondary">Автор:</small>
                      <p
                        data-authors={book.volumeInfo.authors}
                        className="card-text"
                      >
                        {book.volumeInfo.authors}
                      </p>
                      <small className="text-body-secondary">
                        Доп.информация⇛
                      </small>
                      <a
                        id="link"
                        data-link={book.volumeInfo.infoLink}
                        href={book.volumeInfo.infoLink}
                        target="_blank"
                        value={book.volumeInfo.infoLink}
                        className="book-link font-1 pad-b-1-1 c-orange card-text"
                      >
                        {book.volumeInfo.infoLink}
                      </a>
                      <br />
                      {reader?.id ? (
                        <button
                          id={reader.id}
                          name="addBook"
                          type="button"
                          // href="/books/newbook"
                          className="addBook font-3-4 pointer"
                        >
                          Добавить в список любимых книг
                        </button>
                      ) : null}
                    </div>
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </main>
      <script src="/js/addLoveBook.js" />
    </Layout>
  );
}

module.exports = GoogleApiInfo;
