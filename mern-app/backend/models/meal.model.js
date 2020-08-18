const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const mealSchema = new Schema({
    username: {type: String, required: true},
    mealType: {type: String, required: true},
    foodEaten: [{type: String, required: true}],
    bodyAffect: {type: String, required: false},
    date : {type: Date, required: true}
}, {
    timestamps: true,
});

const meal = mongoose.model('meal', mealSchema);

module.exports = meal;