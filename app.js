const express = require("express");
const dotenv = require("dotenv");

dotenv.config();

const clientId = process.env.clientId;
const clientSecret = process.env.clientSecret;

const app = express();

const PORT = process.env.PORT || 4390;

app.listen(PORT, () => {
  console.log(`Server on http://localhost:${PORT}`);
});

app.get("/", (req, res) => {
  res.send("Hello World");
});
