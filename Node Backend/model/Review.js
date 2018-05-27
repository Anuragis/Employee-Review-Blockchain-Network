var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Review = new Schema({
    generatingReviewID: String
});


module.exports = mongoose.model("Review", Review);