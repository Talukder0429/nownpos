const express = require("express");
require("dotenv").config();
const PORT = process.env.PORT || 3333;

const app = express();

const sendEmailRouter = require("./routes/sendEmail");
app.use("/send-email", sendEmailRouter);

const bouncedEmailRouter = require("./routes/bouncedEmail");
app.use("/bounced-email", bouncedEmailRouter);

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
