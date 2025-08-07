const UserProfile = require('../models/userModels');
 exports.createUser = async (req, res) => {
     try {
         const { first_name, last_name, password, email } = req.body;
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