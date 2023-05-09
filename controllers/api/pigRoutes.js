const router = require("express").Router()
const {Pig, Customer, Farmer, Trait} = require("../../models")

router.get("/", async (req, res) => {
  try {
    const pigs = await Pig.findAll({
      include: {all: true, nested: true}
    })
    res.status(200).json(pigs)
  } catch (error) {
    console.log(error)
    res.status(500).json(error)
  }

})

router.get("/:id", async (req, res) => {
  try {
    const pig = await Pig.findByPk(req.params.id, {
      include: {all: true, nested: true}
    })
    res.status(200).json(pig)
  } catch (error) {
    console.log(error)
    res.status(500).json(error)
  }

})

router.post("/", async (req, res) => {
  try {
    const newPig = await Pig.create(req.body);
    // check if the user added any initial traits
    // if they did, add those trait(s) to this specific pig
    if (req.body.traitIds) {
      newPig.addTraits(req.body.traitIds)
    }
    res.status(200).json(newPig)
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});

// only for updating traits
router.put("/changetraits/:id", async (req, res) => {
  try {
    const foundPig = await Pig.findByPk(req.params.id)
    console.log(foundPig)
    // check if the user added any initial traits
    // if they did, add those trait(s) to this specific pig
    if (req.body.traitIds) {
      foundPig.setTraits(req.body.traitIds)
    }
    res.status(200).json(foundPig)
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});




module.exports = router