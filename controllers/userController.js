
const registeredUser = [
  {
    id: 1,
    fullName: "janalam",
    email: "janalam123@gmail.com"
  },
  {
    id: 2,
    fullName: "kamran",
    email: "kamran123@gmail.com"
  }
];

exports.fetchUsers = (req, res) => {
  res.status(200).json(registeredUser);
};

exports.postUser = (req, res) => {
  const { fullName, email } = req.body;

  const user = registeredUser.find(user => user.email === email);  
  if (user) {
    return res.status(400).json({ message: "User already exists", user });
  }

  const newUser = { 
    id: (registeredUser.length + 1).toString(),
    fullName,
    email
  };
  
  registeredUser.push(newUser);
  res.status(201).json({ message: "User added successfully", user: newUser });
};

exports.findUser = (req, res) => {
  const userId = req.params.id;
  const user = registeredUser.find(user => user.id === userId);

  if (user) {
    return res.status(200).json(user);
  } else {
    return res.status(404).json({ message: "User not found" });
  }
};

exports.editUser = (req, res) => {
  const { fullName, email } = req.body;
  const userId = req.params.id;
  
  const userIndex = registeredUser.findIndex(user => user.id === Number(userId));
 if(userIndex !== -1){
  registeredUser[userIndex].fullName= fullName;
  registeredUser[userIndex].email= email;
 }
 return res.status(200).json({ msg: "User Updated", user:registeredUser[userIndex]});
}

exports.deleteUser = (req, res) => {
  const userId = req.params.id;
  const index = registeredUser.findIndex(user => user.id === Number(userId));

  if (index !== -1) {
    const deletedUser = registeredUser.splice(index, 1);
    return res.status(200).json({ message: "User deleted successfully", user: deletedUser[0] });
  } else {
    return res.status(404).json({ message: "User not found" });
  }
};
