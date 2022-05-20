require("dotenv").config();
require("./config/mongo.connection");

const express = require("express");
const app = express();
const path = require("path");
const session = require("express-session");
const flash = require("connect-flash");

const indexRouter = require("./routes/indexRouter");
const voteRouter = require("./routes/voteRouter");

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(session({
  secret: "secret",
  resave: false,
  saveUninitialized: true,
  cookie: {
    httpOnly: true,
    secure: false,
    maxAge: 24000 * 60 * 60,
  },
}));
app.use(flash());
app.use((req, res, next) => {
  res.locals.flashMessage = req.flash();
  next();
});

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use("/public", express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/votings", voteRouter);

app.use(function(req, res, next) {
  const err = new Error("Not Found");
  err.status = 404;
  next(err);
});

app.use(function(err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  res.status(err.status || 500);
  res.render("error", {
    isLogin: false,
    err,
    userId: "",
  });
});

module.exports = app;
