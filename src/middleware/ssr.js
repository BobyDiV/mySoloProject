const renderComponent = require('../lib/renderComponent');

function ssr(req, res, next) {
  res.render = (reactComponent, props) => {
    // renderComponent(reactComponent, { ...props }, res);
    renderComponent(
      reactComponent,
      { ...props, reader: req.session?.reader },
      res,
    );
  };
  next();
}

module.exports = ssr;
