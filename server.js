app.set("view engine", "ejs");

app.get("/", (req, res) => {
  res.render("index");
});

app.get("/preview", (req, res) => {
    res.render("index", {
      name: "Dinna",
      city: "Paris",
      country: "France",
      weather: {
        temperature: 18,
        feelsLike: 16
      }
    });
  });