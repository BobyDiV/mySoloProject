const React = require('react');

function Layout(props) {
  const { children, reader } = props;

  return (
    <html lang="en">
      <head>
        <meta charSet="UTF-8" />

        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="icon" type="image/x-icon" href="/favicon.ico" />
        <link rel="stylesheet" href="/stylesheets/normalize.css" />
        <link rel="stylesheet" href="/stylesheets/application.css" />
        {/* <script defer src="/js/application.js" /> */}
        <title>Books Review</title>
      </head>

      <body>
        <header
          role="banner"
          className="mar-t-5 pad-t-2 pad-b-4 pad-s-1 wrap-float bg-white"
        >
          <div className="min-w-290 center wrap-float">
            <nav className="clearfix mar-b-1">
              <ul className="no-bullets no-margin no-padding right">
                <li className="pipe-separate t-light-braun left">
                  {reader ? (
                    <>
                      <a className="menu" href="/books/readerList">
                        Книги
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

                      <a className="menu" href="/readers/newreaders">
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

            <div className="logo-container">
              <img
                className="logo center block"
                src="/images/reader-logo.png"
                alt="logo"
              />
              <h1 className="logoText">Любимые книги</h1>
            </div>
          </div>
        </header>
        <div className="bg-dk-braun pad-t-2 pad-s-1 pad-b-8 mar-b-16 c-white">
          <div className="max-w-700 center">{children}</div>
        </div>
      </body>
    </html>
  );
}

module.exports = Layout;
