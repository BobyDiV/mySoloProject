function isAuth(req, res, next) {
  const reader = req.session?.reader?.id;
  if (reader) {
    next();
  } else {
    res.redirect('/');
  }
}

module.exports = isAuth;
