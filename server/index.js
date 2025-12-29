//jshint esversion:6
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

//setup express
const app = express();
app.use(cors());
app.use(express.json());

//setup mongoose
const DB_URI = process.env.DB_URI;
mongoose.connect(process.env.DB_URI).then(()=>{
    console.log("DB Connected");
}).catch((err) => {
  console.log(err);
})

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  position: { type: String, required: true },
  level: { type: String, required: true },
});

const User = mongoose.model("User", userSchema);

app.get("/", async (req, res) => {
  const results = await User.find({});
  console.log("Users Found");
  res.send(results).status(200);
});

app.post("/", (req, res) => {
  const newUser = new User({
    name: req.body.name,
    position: req.body.position,
    level: req.body.level,
  });
  newUser
    .save()
    .then((result) => {
        console.log("User Created");
        res.send("New User Created").status(200);
    })
    .catch((err) => {
        res.send(err).status(500);
    });
});

app.get("/:id", async (req, res) => {
    const id = req.params.id;
    const results = await User.findById(id).then((results) => {
        console.log("User Found ", id);
        res.send(results).status(200);
    }).catch((err) => {
        res.send(err).status(500);
    })
});

app.patch("/:id", async (req, res) => {

    const id = req.params.id;
    const results = await User.findByIdAndUpdate(id, req.body).then((results) => {
        console.log("User ",id, " Updated");
        res.send(results).status(200);
    }).catch((err) => {
        res.send(err).status(500);
    });
})

app.delete("/:id", async (req, res) => {
    const id = req.params.id;
    const results = await User.findByIdAndDelete(id).then((result) => {
        console.log("User Deleted");
        res.send(result).status(200);
        }).catch((err) => {
        res.send(err).status(500);
    });
});

const PORT = process.env.PORT || 5050;
app.listen(PORT, () => {
  console.log("Server is running in http://localhost:" + PORT);
});
