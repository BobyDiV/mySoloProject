const React = require('react');
const Layout = require('./Layout');

function GoogleApiInfo(props) {
  const { books, reader } = props;
  return (
    <Layout {...props}>
      <h1>Информация по Вашему запросу ...</h1>
      <main role="main">
        <ul className="entries-list no-bullets no-padding">
          {books.map((book) => (
            <li className="entry-item pad-b-2" key={book.id}>
              <span className="entry-author block font-3-4 c-lt-gray">
                ISBN:
                <p className="entry-title font-1 pad-b-1-1 c-white">
                  {book.id}
                </p>
              </span>
              <span className="entry-author block font-3-4 c-lt-gray">
                Название:
                <p className="entry-title font-1 pad-b-1-1 c-white">
                  {book.volumeInfo.title}
                </p>
              </span>
              <span className="entry-author block font-3-4 c-lt-gray">
                Автор:
                <p className="entry-title font-1 pad-b-1-1 c-white">
                  {book.volumeInfo.authors}
                </p>
              </span>

              <span className="entry-author block font-3-4 c-lt-gray">
                Дополнительная информация ▶
                <a
                  href={book.volumeInfo.previewLink}
                  target="_blank"
                  className="entry-title font-1 pad-b-1-1 c-white"
                >
                  {book.volumeInfo.previewLink}
                </a>
              </span>
            </li>
          ))}
        </ul>
      </main>
    </Layout>
  );
}

module.exports = GoogleApiInfo;
