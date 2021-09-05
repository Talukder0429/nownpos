require("dotenv").config();

const EMAIL = process.env.EMAIL || "option1";

const create = (from, to, subject, body_text, body_html) => {
  if (EMAIL === "option1") {
    return {
      from,
      to,
      subject,
      body_text,
      body_html,
      email_service: "AWS",
    };
  } else if (EMAIL === "option2") {
    return {
      from,
      to,
      subject,
      body_text,
      body_html,
      email_service: "Sendgrid",
    };
  } else {
    return null;
  }
};

exports.create = create;
