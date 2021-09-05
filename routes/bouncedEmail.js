const express = require("express");
const router = express.Router();
const { query, validationResult } = require("express-validator");
const Email = require("../models/email");

// root: /bounced-email
router.post("/", query("email_address").isEmail(), async (req, res) => {
  // url param validation
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const address = req.query.email_address;

  // check if email is already blacklisted
  const emailsInDB = await Email.findOne({ email: address });
  if (emailsInDB !== null) {
    return res.status(409).json({
      message: `${address} email is already blacklisted.`,
    });
  }

  const email = new Email({ email: address });

  // save email_address to db
  try {
    const bouncedEmail = await email.save();
    res
      .status(201)
      .json({ message: `${bouncedEmail.email} has been blacklisted!` });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
