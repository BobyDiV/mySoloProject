const React = require('react');
const Navbar = require('./Navbar');
const LogoBig = require('./LogoBig');

function Layout(props) {
  const { children, reader, withoutLogo } = props;

  return (
    <html lang="en">
      <head>
        <meta charSet="UTF-8" />

        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="icon" type="image/x-icon" href="/favicon.ico" />
        <link rel="stylesheet" href="/stylesheets/normalize.css" />
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css"
        />
        <link
          href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.2/dist/css/bootstrap.min.css"
          rel="stylesheet"
          integrity="sha384-Zenh87qX5JnK2Jl0vWa8Ck2rdkQ2Bzep5IDxbcnCeuOxjzrPF/et3URy9Bv1WTRi"
          crossOrigin="anonymous"
        />
        <link rel="stylesheet" href="/stylesheets/application.css" />
        <script
          src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.2/dist/js/bootstrap.bundle.min.js"
          integrity="sha384-OERcA2EqjJCMA+/3y+gxIOqMEjwtxJY7qPCqsdltbNJuaOe923+mo//f6V8Qbsw3"
          crossOrigin="anonymous"
        />
        {/* <script defer src="/js/application.js" /> */}
        <title>Books Review</title>
      </head>

      <body>
        <header
          role="banner"
          className="mar-t-5 pad-t-2 pad-b-4 pad-s-1 wrap-float bg-white"
        >
          <div className="min-w-290 center wrap-float">
            <h5 className="helloStr">
              {reader
                ? `Здравствуйте, уважаемый ${reader.fullName}!`
                : 'Здравствуйте, уважаемый читатель!'}
            </h5>

            <Navbar {...props} />
            {!withoutLogo ? <LogoBig /> : null}
          </div>
        </header>
        <div className="bg-dk-braun pad-t-3 pad-s-1 pad-b-8 mar-b-16 c-white">
          <div
            className={withoutLogo ? 'max-w-1700 center' : 'max-w-700 center'}
          >
            {children}
          </div>
        </div>
      </body>
    </html>
  );
}

module.exports = Layout;
