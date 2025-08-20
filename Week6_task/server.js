var express = require("express")
var app = express()
var port = process.env.port || 3000;

// Middleware
app.use(express.static(__dirname + '/public'))
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/UserInfo', {
useNewUrlParser: true,
useUnifiedTopology: true,
});

mongoose.connection.on('connected', () => {
console.log('Connected to MongoDB!');
});

const userRoutes = require('./routes/userRoutes');
app.use(userRoutes);

// Start server
app.listen(port, () => {
    console.log("App listening to: " + port)
})
