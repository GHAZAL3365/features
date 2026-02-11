const monogoose = require("mongoose")
const itemSchema = new monogoose.Schema({
    name: String,
    price: Number,
    status: String
}, {
    timestamps: true
})


const Item = monogoose.model("item", itemSchema);

module.exports = Item