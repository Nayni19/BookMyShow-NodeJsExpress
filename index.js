require('dotenv').config()
const MoviesModel = require("./database/movies");
const UserModel = require("./database/users");

const express = require("express");
const app = express();
var cors = require('cors')

app.use(cors())
app.use(express.json());

var mongoose = require('mongoose');
var mongoDB = process.env.MONGODB_URI;
mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true }).then(() => console.log("Connection Established"));

// ROOT API
app.get("/", (req, res) => {
    return res.json({ "Welcome": `to my BookMyShow Application` });
});

// Get all movies
// http://localhost:5000/movies
app.get("/movies", async (req, res) => {
    const getAllMovies = await MoviesModel.find();
    return res.json(getAllMovies);
});

// http://localhost:5000/movie/:id
app.get("/:id", async (req, res) => {
    const {id} = req.params;
    const getMovie = await MoviesModel.findOne({_id: id});
    return res.json(getMovie);
});

// http://localhost:5000/user-register
app.post("/user-register", async (req, res) => {
    const addNewUser = await UserModel.create(req.body);
    return res.json({ userAdded: addNewUser, message: "User was added !!!" });
});

app.listen(process.env.PORT || 5000, () => {
    console.log("Server is running...")
});