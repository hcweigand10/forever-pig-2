const router = require("express").Router()
const {Farmer, Pig} = require("../../models")
const bcrypt = require("bcrypt")


router.get("/", async (req, res) => {
  try {
    const farmers = await Farmer.findAll({
      include: [{model: Pig}]
    })
    res.status(200).json(farmers)
  } catch (error) {
    console.log(error)
    res.status(500).json(error)
  }

})

// signup
router.post("/", async (req, res) => {
  try {
    const newFarmer = await Farmer.create(req.body);
    // sign this person in
    req.session.farmerId = newFarmer.id
    req.session.username = newFarmer.username
    res.status(200).json(newFarmer)
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});

router.get("/session", async (req,res) => {
  res.json(req.session)
})


// req.body {username: "something", password: "somethingelse"}
router.post("/login", async (req,res) => {
  try {
    // try to find user with inputted username
    const foundFarmer = await Farmer.findOne({
      where: {username: req.body.username}
    })
    if (!foundFarmer) {
      console.log("no farmer with this username!")
      res.status(403).json({msg: "No farmer with this username"})
      // if found, check password
    } else {
      // if password matches, log them in!
      if (bcrypt.compareSync(req.body.password, foundFarmer.password)) {
        req.session.userId = foundFarmer.id
        req.session.username = foundFarmer.username
        req.session.isFarmer = true
        res.status(200).json(foundFarmer)
      } else {
        res.status(403).json({msg: "wrong password buddy"})
      }
    }
  } catch (error) {
    console.log(error)
    res.status(500).json(error)
  }
})

module.exports = router