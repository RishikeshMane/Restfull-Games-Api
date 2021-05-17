const exprees = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");
const gamepage = require("./Routes/gameshandeler");
const app = exprees();

const url = "mongodb://127.0.0.1:27017/games_db";
mongoose.connect(url, {
  useCreateIndex: true,
  useFindAndModify: true,
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
// mongoose.Promise = global.Promise;
const con = mongoose.connection;
con.on("open", () => {
  console.log("Database connected");
});

app.use(morgan("dev"));
app.use(exprees.urlencoded({ extended: true }));
app.use(exprees.json());
app.use("/games", gamepage);

app.get("/", (req, res) => {
  res.send("Responding to get request");
});

module.exports = app;
