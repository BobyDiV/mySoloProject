const router = require("express").Router();
const Layout = require("../views/Layout");
const GoogleApiInfo = require("../views/GogleApiInfo");
const GoogleQuery = require("../views/GoogleQuery");

router.get("/", async (req, res, next) => {
  console.log("========= appRouter.js ========");

  res.render(Layout, {});
});

router.get("/google/query", async (req, res, next) => {
  console.log("========= google/query ========");
  res.render(GoogleQuery, { reader: req.session.reader });
});

router.get("/google/:question", async (req, res, next) => {
  console.log("========= google ========", req.params.question);
  const API_ENDPOINT = "https://www.googleapis.com/books/v1/volumes";
  const searchQuery = req.params.question;
  try {
    // отправляем запрос на Google Books API
    const resApi = await fetch(`${API_ENDPOINT}?q=${searchQuery}`);
    const resApiInfo = await resApi.json();
    const books = resApiInfo.items;
    res.render(GoogleApiInfo, { books });
  } catch (error) {
    next(error);
  }
});

router.get("/google/book", async (req, res, next) => {
  console.log("========= google books searh ========");
  const url = "https://books.google.com/?hl=ru";
  const windowParams = "height=500,width=800";

  if (typeof window !== "undefined") {
    console.log("You are on the browser,You are good to go");
    window.open(url, "", windowParams);
  } else {
    console.log("You are on the server,Cannot execute");
    res.redirect(url);
  }
});

module.exports = router;
