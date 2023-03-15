const React = require('react');
const Layout = require('./Layout');

function EditReader(props) {
  console.log('=====EditReader Edit Reader Form ========', props);
  const { readerData } = props;
  console.log('===== reader ========', readerData);

  return (
    <Layout reader={readerData}>
      <h1>Внесите изменения в профиль читателя...</h1>

      <form href="/readers/profile/editor" name="editReader" method="post">
        <label htmlFor="title-input" className="block mar-b-0">
          Логин:
        </label>
        <input
          id="login"
          name="login"
          type="text"
          defaultValue={readerData.login}
          tabIndex="1"
          className="block w-100 no-outline no-border pad-1 mar-b-2"
        />

        <label htmlFor="title-input" className="block mar-b-0">
          Ф.И.О.:
        </label>
        <input
          id="fullName"
          name="fullName"
          type="text"
          defaultValue={readerData.fullName}
          tabIndex="2"
          className="block w-100 no-outline no-border pad-1 mar-b-2"
        />

        <label htmlFor="title-input" className="block mar-b-0">
          Адрес электронной почты:
        </label>
        <input
          id="emailAddress"
          name="emailAddress"
          type="text"
          defaultValue={readerData.emailAddress}
          tabIndex="3"
          className="block w-100 no-outline no-border pad-1 mar-b-2"
        />

        <input
          id={readerData.id}
          type="submit"
          value="Submit"
          tabIndex="4"
          className="block button w-100 mar-t-2 mar-b-2 pad-1 round-1 text-c center no-border no-outline"
        />
      </form>

      <script src="/js/editreader.js" />
    </Layout>
  );
}

module.exports = EditReader;
