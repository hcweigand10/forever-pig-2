const Pig = require("./Pig")
const Trait = require("./Trait")
const Farmer = require("./Farmer")
const Customer = require("./Customer")

Pig.belongsToMany(Trait, {through: "PigTraits"}) // many-to-many
Trait.belongsToMany(Pig, {through: "PigTraits"})

Farmer.hasMany(Pig) // one-to-many
Pig.belongsTo(Farmer)


Customer.hasMany(Pig) // one-to-many
Pig.belongsTo(Customer)


module.exports = {Pig,Trait, Customer, Farmer}