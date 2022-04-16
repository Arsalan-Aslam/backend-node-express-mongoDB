const express = require("express");
const app = express();
const port = 5000;

app.use(express.json());
app.use(express.urlencoded({ extend: true }));

app.get("/", (req, res, next) => {
  const user = false;
  if (user) {
    next();
  } else {
    res.send("UnAuth");
  }
});

app.get("/about", (req, res) => {
  res.send("ABOUT PAGE");
});

app.get("/api/user/:id", (req, res) => {
  const username = req.params;
  console.log(username);
  res.send("HOME PAGE");
});

app.get("/api/getuser", (req, res) => {
  console.log(req.query);
  res.send("Query Selector");
});

app.post("/api/user", (req, res) => {
  console.log(req);
  res.send(req.body.city);
});

app.listen(port, console.log(`server is running on localhost:${port}`));
