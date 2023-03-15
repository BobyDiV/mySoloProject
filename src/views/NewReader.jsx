const React = require('react');
const Layout = require('./Layout');

function NewReader(props) {
  return (
    <Layout {...props}>
      <h1>Укажите ваши данные</h1>

      <form href="/readers/newreader" name="NewReader" method="post">
        <label htmlFor="title-input" className="block mar-b-0">
          Логин:
        </label>
        <input
          id="login"
          name="login"
          type="text"
          tabIndex="1"
          className="block w-100 no-outline no-border pad-1 mar-b-1"
        />

        <label htmlFor="title-input" className="block mar-b-0">
          Полное имя:
        </label>
        <input
          id="fullName"
          name="fullName"
          type="text"
          tabIndex="2"
          className="block w-100 no-outline no-border pad-1 mar-b-1"
        />
        <label htmlFor="title-input" className="block mar-b-0">
          Адрес электронной почты:
        </label>
        <input
          id="emailAddress"
          name="emailAddress"
          type="text"
          tabIndex="3"
          className="block w-100 no-outline no-border pad-1 mar-b-1"
        />
        <label htmlFor="title-input" className="block mar-b-0">
          Пароль:
        </label>
        <input
          id="password"
          name="password"
          type="text"
          tabIndex="4"
          className="block w-100 no-outline no-border pad-1 mar-b-2"
        />

        <input
          type="submit"
          value="Submit"
          tabIndex="5"
          className="block button w-100 mar-t-2 mar-b-2 pad-1 round-1 text-c center no-border no-outline"
        />
      </form>
      <script src="/js/addreader.js" />
    </Layout>
  );
}

module.exports = NewReader;
