const express = require("express");
const router = express.Router();
const { query, validationResult } = require("express-validator");
const email = require("../email");

// root: /send-email
router.post(
  "/",
  query("from").isEmail(),
  query("to").isEmail(),
  query("subject").exists(),
  query("body_text").exists(),
  query("body_html").exists(),
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const emailToSend = email.create(
      req.query.from,
      req.query.to,
      req.query.subject,
      req.query.body_text,
      req.query.body_html
    );

    if (emailToSend === null) {
      return res.status(503).json({ error: "Email service unavailable!" });
    }

    return res.status(201).json({
      message: `Success! Your email has been sent using the ${emailToSend.email_service}'s service!`,
      email: emailToSend,
    });
  }
);

module.exports = router;
