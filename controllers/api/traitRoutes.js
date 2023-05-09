const router = require("express").Router();
const { Trait } = require("../../models");

// api/traits
router.get("/", (req, res) => {
  Trait.findAll()
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json(error);
    });
});

// req.body should have this format: {
// trait: "fluffy"
// }
router.post("/", async (req, res) => {
  try {
    const newTrait = await Trait.create(req.body);
    res.status(200).json(newTrait)
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});

router.get("/:name", async (req,res) => {
  try {
    const pigs = await Trait.findOne({where: {
      trait: req.params.name
    }}, {
      include: {all: true, nested: true}
    })
    res.status(200).json(pigs)
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
})

module.exports = router;
