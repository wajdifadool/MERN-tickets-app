const registatUser = (req, res) => {
  res.send('Rigistar Route'); // for sign up
};

const loginUser = (req, res) => {
  res.send('Login user Route');
};

module.exports = {
  registatUser,
  loginUser,
};
