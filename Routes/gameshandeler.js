const exprees = require("express");
const { Mongoose } = require("mongoose");
const gamedb = require("../Models/game");
// const { route } = require('../app')
const router = exprees.Router();
const fs = require("fs");
const { error } = require("console");

router.use(exprees.urlencoded({ extended: false }));
router.use(exprees.json());

router.get("/", (req, res) => {
  gamedb
    .find()
    .select("Name Id Type Ratingoutof5")
    .then((document) => {
      const response = {
        Requestmade: "GET",
        Documentdata: document,
      };
      res.send(response);
      console.log("successfull Get request to gamesroute");
    })
    .catch((err) => {
      res.send("Error found in GET request");
    });
});

// router.get("/name", (req, res) => {
//   gamedb.findOne({}).then(res.send("found by Name in db"))
// });


router.post("/", (req, res, next) => {
  const gamemodel = new gamedb({
    Name: req.body.gamename,
    Id: req.body.gameid,
    Type: req.body.gametype,
    Ratingoutof5: req.body.ratingoutof5,
  });
  gamemodel
    .save()
    .then(console.log("Data saved successfully by post request"))
    .catch((error) => {
      res.send("Error found in POST request");
    });
  res.send("posted successfully");
  next();
});

router.get("/:id", (req, res) => {
  reqid = req.params.id;
  gamedb
    .findById(reqid)
    .select("Name Id Type Ratingoutof5")
    .then((document) => {
      const resp = {
        Requestmade: "GET",
        Documentid: document._id,
        Documentbody: document,
        Nextdocument: "http://localhost:5000/games/",
      };
      console.log("Successfull GET request by fetching ID");
      res.send(resp).status(200);
    })
    .catch((error) => {
      res.send("Error found in GET request for fetching id");
    });
});

router.delete("/:id", (req, res) => {
  reqid = req.params.id;
  gamedb.remove({ _id: reqid }).then((result) => {
    console.log("Delete request successfull");
    res.send("Delete request successfull");
  });
});

module.exports = router;
