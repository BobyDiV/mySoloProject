const React = require('react');

function LogoBig() {
  return (
    <div className="logo-container logo-big logo-ring">
      <img
        className="logo center block"
        src="/images/reader-logo.png"
        alt="logo"
      />
      <h1 className="logoText">Любимые книги</h1>
    </div>
  );
}

module.exports = LogoBig;
