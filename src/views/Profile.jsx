const React = require('react');
const Layout = require('./Layout');

function Profile(props) {
  const { readerData } = props;
  // console.log('====== Profile Reader =========', reader);
  return (
    <Layout reader={readerData}>
      <h1>Информация о читателе...</h1>
      <span className="entry-date block font-3-4 c-lt-gray">Псевдоним:</span>
      <p className="info">{readerData.login}</p>
      <span className="entry-date block font-3-4 c-lt-gray">Ф.И.О.:</span>
      <p className="info">{readerData.fullName}</p>
      <span className="entry-date block font-3-4 c-lt-gray">e-mail:</span>
      <p className="info">{readerData.emailAddress}</p>
      {readerData.login === readerData?.login ? (
        <ul id="editAndDeleteUl" className="no-bullets no-padding mar-t-2">
          <li className="pipe-separate left">
            <a href={`/readers/profile/${readerData.id}`} className="c-white">
              edit
            </a>
          </li>

          <li className="pipe-separate left">
            <button
              id="deleteUserButton"
              data-reader={readerData.id}
              value="delete"
              type="button"
              className="no-border no-outline no-bg c-white hover-underline"
            >
              delete
            </button>
          </li>
        </ul>
      ) : null}
      {/* <script src="/js/editreader.js" /> */}
    </Layout>
  );
}
module.exports = Profile;
