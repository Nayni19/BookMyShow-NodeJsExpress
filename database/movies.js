const mongoose = require("mongoose");

const MoviesSchema= mongoose.Schema({
    image: String,
    title: String,
    desc: String,
    date: String,
    about: String,
    bimage: String,
});

const MoviesModel= mongoose.model("movies", MoviesSchema);

module.exports = MoviesModel;