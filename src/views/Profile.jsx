const React = require("react");
const Layout = require("./Layout");

function Profile(props) {
  const { readerData } = props;
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
            <a href={`/readers/killer/${readerData.id}`} className="c-white">
              delete
            </a>
          </li>
        </ul>
      ) : null}
    </Layout>
  );
}
module.exports = Profile;
