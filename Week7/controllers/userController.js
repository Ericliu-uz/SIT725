const UserProfile = require('../models/userModels');

const isValidEmail = (email) => {
  const emailRegex = /\S+@\S+\.\S+/;
  return emailRegex.test(email);
};

exports.createUser = async (req, res) => {
  try {
    const { first_name, last_name, password, email } = req.body;
    
    if (!first_name || !last_name || !email) {
      return res.status(400).json({ 
        statusCode: 400, 
        message: "First name, last name and email are required" 
      });
    }
    
    if (!isValidEmail(email)) {
      return res.status(400).json({ 
        statusCode: 400, 
        message: "Invalid email format" 
      });
    }
    
    const newUser = new UserProfile({
      first_name,
      last_name,
      password,
      email
    });
    
    await newUser.save();
    res.json({ statusCode: 200, message: "User saved successfully", data: newUser });
  } catch (error) {
    res.status(500).json({ statusCode: 500, message: error.message });
  }
};