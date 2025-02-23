const validateUserData = (req, res, next) => {
  const { aboutMe, address, birthdate } = req.body;

  // Validate "About Me" text
  if (!aboutMe || aboutMe.length < 10) {
    return res.status(400).json({ message: 'About Me section must have at least 10 characters.' });
  }

  // Validate Address
  if (!address || !address.street || !address.city || !address.state || !address.zip) {
    return res.status(400).json({ message: 'All address fields are required.' });
  }

  // Validate Birthdate
  if (!birthdate || isNaN(new Date(birthdate))) {
    return res.status(400).json({ message: 'Invalid birthdate format.' });
  }

  next();
};

module.exports = { validateUserData };
