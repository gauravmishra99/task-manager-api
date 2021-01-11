const sgmail = require("@sendgrid/mail");

sgmail.setApiKey(process.env.SENDGRID_API_KEY);

const sendWelcomeEmail = (email, name) => {
  sgmail.send({
    to: email,
    from: "gauravmishra.190699@gmail.com",
    subject: "Thanks For Joining In",
    text: `Welcome to the app ${name}. Let me know how you get along with the app.`,
  });
};

const sendLastEmail = (email, name) => {
  sgmail.send({
    to: email,
    from: "gauravmishra.190699@gmail.com",
    subject: "Adios!",
    text: `Hey ${name} It has been a nice Journey together. We understand you don't want to avail our services anymore. We would like to know what we could do to make the user experience better.`,
  });
};

module.exports = {
  sendWelcomeEmail,
  sendLastEmail,
};
