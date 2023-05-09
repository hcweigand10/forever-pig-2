const router = require("express").Router()
const {Pig} = require("../models")

router.get("/home", async (req,res) => {
  try {
    const pigData = await Pig.findAll()
    const pigs = pigData.map((pig) => pig.get({ plain: true }));
    console.log(pigs)
    res.render("login", {pigs: pigs, userId: req.session.userId})
  } catch (error) {
    console.log(error)
    res.status(500).json(error);
  }
})

module.exports = router