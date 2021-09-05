const express = require("express");
const router = express.Router();
const { query, validationResult } = require("express-validator");
const Email = require("../models/email");
const emailSrvc = require("../emailSrvc");

// root: /send-email
router.post(
  "/",
  query("from").isEmail(),
  query("to").isEmail(),
  query("subject").exists(),
  query("body_text").exists(),
  query("body_html").exists(),
  async (req, res) => {
    // url param validation
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    // check if to-email is blacklisted
    const emailsInDB = await Email.findOne({ email: req.query.to });
    if (emailsInDB !== null) {
      return res.status(406).json({ error: "Recipient email is blacklisted." });
    }

    const emailToSend = emailSrvc.create(
      req.query.from,
      req.query.to,
      req.query.subject,
      req.query.body_text,
      req.query.body_html
    );

    if (emailToSend === null) {
      return res.status(503).json({ error: "Email service is unavailable." });
    }

    res.status(201).json({
      message: `Success! Your email has been sent using ${emailToSend.email_service}'s service!`,
    });
  }
);

module.exports = router;
