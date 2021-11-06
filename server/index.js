const express = require("express");
const cors = require("cors");

const app = express();


app.use(cors());

app.use(express.json()); // When we want to be able to accept JSON.

const {
  getFortune,
  genFortunes,
  createFortune,
  deleteFortune,
  updateFortune
} = require('./controllers/fortune');

app.get("/api/compliment", (req, res) => {
  const compliments = ["Gee, you're a smart cookie!",
					 "Cool shirt!",
					 "Your Javascript skills are stellar.",
  ];

  // choose random compliment
  let randomIndex = Math.floor(Math.random() * compliments.length);
  let randomCompliment = compliments[randomIndex];

  res.status(200).send(randomCompliment);
  
});

app.get("/api/fortune", getFortune);
app.get("/api/fortune/gen", genFortunes);
app.post("/api/fortune", createFortune);
app.delete("/api/fortune/:index", deleteFortune);
app.put("/api/fortune/:index", updateFortune);

app.listen(4000, () => console.log("Server running on 4000"));
