const express = require("express");
require("dotenv").config();
const PORT = process.env.PORT || 3333;

const app = express();

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});