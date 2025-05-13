const { loginSchema } = require('../validators/auth-validator');

const authLogin = [
  { 
    email: "janalam123@gmail.com",
    password: "12345"
  },
  {
    email: "kamran123@gmail.com",
    password: "123456789"
  }
];

exports.postLogin = (req, res, next) => {
  const result = loginSchema.safeParse(req.body);

  if (!result.success) {
    return res.status(400).json({
      message: "Validation failed",
      errors: result.error.errors
    });
  }

  const { email, password } = result.data;

  const validUser = authLogin.find(
    user => user.email === email && user.password === password
  );

  if (validUser) {
    return res.status(200).json({
      message: "Login Successful",
      token: "mysecrettoken"
    });
  } else {
    return res.status(401).json({ message: "Invalid Credentials" });
  }
};
