const authLogin = [
  { 
    email: "janalam123@gmail.com",
    password: "12345"
  },
  {
    email: "kamran123@gmail.com",
    password: "123"
  }
];

exports.getIndex = (req, res) => {
  res.send(`
    <h1>Welcome to Home</h1>
  `);
};

exports.postLogin = (req, res, next) => {
  const { email, password } = req.body;

  const validUser = authLogin.find(user => user.email === email && user.password === password);

  if (validUser) {
    return res.status(200).json({
      message: "Login Successful",
      token: "mysecrettoken"
    });
  } else {
    return res.status(401).json({ message: "Invalid Credentials" });
  }
};
