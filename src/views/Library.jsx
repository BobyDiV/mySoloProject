const React = require('react');
const Layout = require('./Layout');

function Library(props) {
  const { books, reader } = props;
  const windowname = '2'; // для выбора ручки '/library'
  return (
    <Layout {...props}>
      <h3>{`Все любимые книги наших читателей (${books.length} шт)...`}</h3>
      <br />
      <main name="readerlist">
        <ul id="ul" className="row row-cols-1 row-cols-md-4 g-4 no-padding">
          {books.map((book, index) => (
            <div
              key={book.id}
              className="col"
              style={{
                maxWidth: '210px',
                padding: '3px',
                borderLeft: '2px solid #6c757d',
                borderTop: '2px solid #6c757d',
                borderRight: '2px solid #582401',
                borderBottom: '2px solid #582401',
              }}
            >
              <div className="card h-100">
                <img
                  src={`${book.bookCover}`}
                  className="card-img-top"
                  alt="bookCover"
                  // style={{
                  //   maxHeight: '55%',
                  // }}
                />
                <div className="card-body bg-col">
                  <h6 className="card-title">{book.title}</h6>
                  <small className="card-text">
                    {book.author}
                    <br />
                  </small>
                  <small className="card-text">
                    {`ISBN: ${book.isbn}`}
                    <br />
                  </small>
                  <small className="card-text reader-color-text">{`Читатель: ${book['reader.fullName']}`}</small>
                </div>
                <div className="card-footer">
                  {reader?.id === book.readerId ? (
                    <>
                      <button
                        id={book.id}
                        data-windowname={windowname}
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
          ))}
        </ul>
      </main>
      <script src="/js/library.js" />
      <script src="/js/listBook.js" />
    </Layout>
  );
}

module.exports = Library;
