const router = require("express").Router()
const {Customer} = require("../../models")


router.get("/", async (req, res) => {
  try {
    const customers = await Customer.findAll({
      include: [{model: Pig}]
    })
    res.status(200).json(customers)
  } catch (error) {
    console.log(error)
    res.status(500).json(error)
  }

})

router.post("/", async (req, res) => {
  try {
    const newCustomer = await Customer.create(req.body);
    res.status(200).json(newCustomer)
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});

router.post("/login", async (req,res) => {
  try {
    // try to find user with inputted username
    const foundCustomer = await Customer.findOne({
      where: {username: req.body.username}
    })
    if (!foundCustomer) {
      console.log("no customer with this username!")
      res.status(403).json({msg: "No customer with this username"})
      // if found, check password
    } else {
      // if password matches, log them in!
      if (bcrypt.compareSync(req.body.password, foundCustomer.password)) {
        req.session.userId = foundCustomer.id
        req.session.username = foundCustomer.username
        req.session.isFarmer = false
        res.status(200).json(foundCustomer)
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