var express = require("express")
var app = express()
var port = process.env.port || 3000;
const mongoose = require('mongoose');

// Middleware
app.use(express.static(__dirname + '/public'))
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

mongoose.connect('mongodb://localhost:27017/UserInfo', {
useNewUrlParser: true,
useUnifiedTopology: true,
});

mongoose.connection.on('connected', () => {
console.log('Connected to MongoDB!');
});

// Define schema and model
const UserSchema = new mongoose.Schema({
first_name: String,
last_name: String,
password: String,
email: String,
});
const UserProfile = mongoose.model('UserProfile', UserSchema);

// REST API route
app.post('/api/users', async (req, res) => {
    try {
        const { first_name, last_name, password, email } = req.body;
        const newUser = new UserProfile({
            first_name,
            last_name,
            password,
            email
        });
        // save to database
        await newUser.save();
        res.json({ statusCode: 200, message: "User saved successfully", data: newUser });
    } catch (error) {
        res.status(500).json({ statusCode: 500, message: error.message });
    }
});

// Start server
app.listen(port, () => {
    console.log("App listening to: " + port)
})
