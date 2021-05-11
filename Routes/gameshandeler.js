const exprees = require("express");
const { Mongoose } = require("mongoose");
const gamedb = require("../Models/game");
// const { route } = require('../app')
const router = exprees.Router();

router.use(exprees.urlencoded({ extended: false }));
router.use(exprees.json());

router.get("/", (req, res) => {
  gamedb
    .find()
    .select("Name Id Type Ratingoutof5")
    .then((document) => {
      res.send(document);
      console.log(document);
      console.log("successfull Get request to gamesroute");
    })
    .catch((err) => {
      res.send("Error found for Get request to gamesroute");
    });
});

router.post("/", (req, res, next) => {
  const gamemodel = new gamedb({
    Name: req.body.gamename,
    Id: req.body.gameid,
    Type: req.body.gametype,
    Ratingoutof5: req.body.ratingoutof5,
  });
  gamemodel.save().then(console.log("Data saved successfully by post request"));
  res.send("posted successfully");
  next();
});

router.get("/:id", (req, res) => {
  reqid = req.params.id;
  gamedb
    .findById(reqid)
    .select("Name Id")
    .then((document) => {
      console.log("Successfull get request by fetching ID");
      res.send(document);
    });
});

router.delete("/:id",(req,res)=>{
  reqid = req.params.id;
  gamedb.remove({_id:reqid}).then(result=>{
    console.log("Delete request successfull")
    res.send("Delete request successfull")
  })
})

module.exports = router;
