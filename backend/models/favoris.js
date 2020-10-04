var mongoose = require("mongoose");

var favorisSchema = mongoose.Schema ({
    image : String,
    titre : String
});

var favorisModel = mongoose.model("movies", favorisSchema);

module.exports = favorisModel;