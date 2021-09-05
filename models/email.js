require("dotenv").config();
const DB_URL = process.env.DB_URL || "mongodb://localhost:27017/nownpos";

const mongoose = require("mongoose");
mongoose.connect(DB_URL);
const db = mongoose.connection;
db.on("error", (error) => console.log(error));
db.once("open", () => console.log("DB Connected!"));

const emailSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Email", emailSchema);
