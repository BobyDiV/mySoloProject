const React = require('react');
const Layout = require('./Layout');

function GoogleQuery(props) {
  return (
    <Layout {...props}>
      <h1>Задайте параметры поиска</h1>

      <form name="GoogleQuery">
        <label htmlFor="title-input" className="block mar-b-0">
          Укажите ISBN, имя автора или название книги для поиска:
        </label>
        <input
          id="query"
          name="query"
          type="text"
          tabIndex="1"
          className="block w-100 no-outline no-border pad-1 mar-b-1"
        />
        <input
          type="submit"
          value="Submit"
          tabIndex="4"
          className="block button w-100 mar-t-2 mar-b-1 pad-1 round-1 text-c center no-border no-outline"
        />
      </form>
      <script src="/js/googlequery.js" />
    </Layout>
  );
}

module.exports = GoogleQuery;
