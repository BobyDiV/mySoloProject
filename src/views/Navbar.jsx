const React = require('react');

function Navbar({ reader }) {
  return (
    <nav className="clearfix mar-b-1">
      <ul className="no-bullets no-margin no-padding right">
        <li className="pipe-separate t-light-braun left">
          <a className="menu" href="/books/library">
            Библиотека
          </a>
          {reader ? (
            <>
              <a className="menu" href="/books/readerList">
                Моё
              </a>

              <a className="menu" href="/readers/logout">
                Выйти
              </a>
              <a className="menu" href="/readers/profile">
                Читатель
              </a>
            </>
          ) : (
            <>
              <a className="menu" href="/readers/login">
                Войти
              </a>

              <a className="menu" href="/readers/newreader">
                Регистрация
              </a>
            </>
          )}
          <a
            className="menu"
            href="https://books.google.com/?hl=ru"
            target="_blank"
          >
            Google📚
          </a>
          <a className="menu" href="/google/query">
            🔍
          </a>
        </li>
      </ul>
    </nav>
  );
}

module.exports = Navbar;
