const router = require("express").Router()
const {Pig, Customer, Farmer, Trait} = require("../models")

router.get("/", async (req,res) => {
  try {
    const pigData = await Pig.findAll()
    const pigs = pigData.map((pig) => pig.get({ plain: true }));
    console.log(pigs)
    res.render("home", {pigs: pigs, userId: req.session.userId, isFarmer: req.session.isFarmer})
  } catch (error) {
    console.log(error)
    res.status(500).json(error);
  }
})

router.get("/login", async (req,res) => {
  try {
    if (req.session.userId) {
      res.redirect("/")
    } else {
      res.render("login")
    }
  } catch (error) {
    console.log(error)
    res.status(500).json(error);
  }
})

router.get("/signup", async (req,res) => {
  try {
    if (req.session.userId) {
      res.redirect("/dashboard")
    } else {
      res.render("signup")
    }
  } catch (error) {
    console.log(error)
    res.status(500).json(error);
  }
})

router.get("/dashboard", async (req,res) => {
  try {
    if (!req.session.userId) {
      res.redirect("/login")
    }
    if (req.session.isFarmer) {
      const farmerData = await Farmer.findByPk(req.session.userId, {
        include: {
          all: true,
          nested: true
        }
      })
      const farmer = farmerData.get({plain: true})
      console.log(farmerData)
      return res.render("dashboard", {user: farmer, isFarmer: true})
    } else {
      const customerData = await Customer.findByPk(req.session.userId, {
        include: {
          all: true,
          nested: true
        }
      })
      const customer = customerData.get({plain: true})

      return res.render("dashboard", {user: customer, isFarmer: false})
    }
  } catch (error) {
    console.log(error)
    res.status(500).json(error);
  }
})

router.get("/new-pig", (req,res) => {
  try {
    if (!req.session.userId) {
      res.redirect("/login")
    }
    res.render("newPig", {user: req.session.userId, isFarmer: req.session.isFarmer})
  } catch (error) {
    console.log(error)
    res.status(500).json(error);
    
  }
})

module.exports = router