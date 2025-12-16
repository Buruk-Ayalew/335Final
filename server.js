const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const path = require("path");

dotenv.config();

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

app.set("view engine", "ejs");
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.error(err));


const tripsRouter = require("./routes/trips");
app.use("/trips", tripsRouter);

app.get("/", (req, res) => {
  res.render("index", {
    name: null,
    city: null,
    country: null,
    weather: null
  });
});


const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Web server started and running at http://localhost:${PORT}`);
});
