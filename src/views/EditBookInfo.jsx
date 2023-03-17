const React = require('react');
const Layout = require('./Layout');

function EditBookInfo(props) {
  console.log('=====  !!!!  Edit Book Info  !!!!  ========', props);
  const { bookInfo, reader } = props;

  return (
    <Layout reader={reader}>
      <h1>Внесите изменения в информацию о книге...</h1>

      <form href={`/books/editor/${bookInfo.id}`} name="editBook" method="post">
        <label htmlFor="title-input" className="block mar-b-0">
          ISBN:
        </label>
        <input
          id="ISBN"
          name="isbn"
          type="text"
          defaultValue={bookInfo.isbn}
          tabIndex="1"
          className="block w-100 no-outline no-border pad-1 mar-b-2"
        />

        <label htmlFor="title-input" className="block mar-b-0">
          Название книги:
        </label>
        <input
          id="title"
          name="title"
          type="text"
          defaultValue={bookInfo.title}
          tabIndex="2"
          className="block w-100 no-outline no-border pad-1 mar-b-2"
        />

        <label htmlFor="title-input" className="block mar-b-0">
          Автор:
        </label>
        <input
          id="author"
          name="author"
          type="text"
          defaultValue={bookInfo.author}
          tabIndex="3"
          className="block w-100 no-outline no-border pad-1 mar-b-2"
        />

        <label htmlFor="title-input" className="block mar-b-0">
          Дополнительная информация:
        </label>
        <input
          id="linkInfo"
          name="linkInfo"
          type="text"
          defaultValue={bookInfo.linkInfo}
          tabIndex="4"
          className="block w-100 no-outline no-border pad-1 mar-b-2"
        />

        <input
          id={bookInfo.id}
          name={bookInfo.id}
          type="submit"
          value="Submit"
          tabIndex="5"
          className="block button w-100 mar-t-2 mar-b-2 pad-1 round-1 text-c center no-border no-outline"
        />
      </form>

      <script src="/js/editbook.js" />
    </Layout>
  );
}

module.exports = EditBookInfo;
