const User = require("../models/user");
const mailGun = require("mailgun-js");
const jwt = require("jsonwebtoken");

const mg = mailGun({
  apiKey: process.env.MAILGUN_API_KEY,
  domain: process.env.DOMAIN,
});

exports.signup = async (req, res) => {
  const { name, email, password } = req.body;
  let existingUser;
  try {
    existingUser = await User.findOne({ email });
  } catch (err) {
    return res
      .status(500)
      .json({ error: "Signup failed, please try again later" });
  }
  if (existingUser) {
    return res.status(422).json({
      error: "Email is already taken",
    });
  }

  const token = jwt.sign(
    { name, email, password },
    process.env.JWT_ACCOUNT_ACTIVATION,
    { expiresIn: "10m" }
  );

  const data = {
    from: `Excited User <${process.env.EMAIL_FROM}>`,
    to: `${email}`,
    subject: "Acount Activation",
    html: `<h1>Please use the following link to activate your account</h1>
                <p>${process.env.CLIENT_URL}/auth/activate/${token}</p>
                <hr />
                <p>This email may contain sensetive information</p>
                <p>${process.env.CLIENT_URL}</p>`,
  };

  mg.messages().send(data, function (error, body) {
    if (error) {
      return res.status(400).json({ error: error });
    }
    console.log({ body });
    return res.status(200).json({ message: "email has been sent " });
  });
};

exports.accountActivation = async (req, res) => {
  const { token } = req.body;

  if (token) {
    jwt.verify(
      token,
      process.env.JWT_ACCOUNT_ACTIVATION,
      function (err, decoded) {
        if (err) {
          console.log("verification error", err);
          return res.status(401).json({
            error: "Expired Link. Signup again",
          });
        }

        const { name, email, password } = jwt.decode(token);

        const user = new User({ name, email, password });

        user.save((err, user) => {
          if (err) {
            console.log("user saving error", err);
            return res.status(401).json({
              error: "Error saving in database, try again",
            });
          }

          return res.status(201).json({
            user,
            message: "User created in db",
          });
        });
      }
    );
  } else {
    return res.status(400).json({
      error: "Something went wrong",
    });
  }
};
