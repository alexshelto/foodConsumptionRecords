const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const mealSchema = new Schema({
    username: {type: String, required: true},
    description: { type : String, required: true},
    date : {type: Date, required: true}
}, {
    timestamps: true,
});

const meal = mongoose.model('meal', mealSchema);

module.exports = meal;