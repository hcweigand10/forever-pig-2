const router = require("express").Router()
const pigRoutes = require("./pigRoutes")
const traitRoutes = require("./traitRoutes")
const farmerRoutes = require("./farmerRoutes")
const customerRoutes = require("./customerRoutes")

router.use("/pigs", pigRoutes)
router.use("/traits", traitRoutes)
router.use("/farmers", farmerRoutes)
router.use("/customers", customerRoutes)


module.exports = router