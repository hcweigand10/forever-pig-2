const Pig = require("./Pig")
const Trait = require("./Trait")
const Farmer = require("./Farmer")

Pig.belongsToMany(Trait, {through: "PigTraits"}) // many-to-many
Trait.belongsToMany(Pig, {through: "PigTraits"})

Farmer.hasMany(Pig) // one-to-many
Pig.belongsTo(Farmer)


module.exports = {Pig,Trait}