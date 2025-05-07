exports.getLogin = (req, res, next) => {
res.status(200).json({message: "Login page"});
}

exports.postLogin = (req, res, next) => {
  res.status(201).json({message: "login Successfully"});
}