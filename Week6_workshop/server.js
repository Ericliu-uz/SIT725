var express = require("express")
var app = express()
var port = process.env.port || 3000;

app.get('/', (req, res) => {
    res.send('Calculator API is running');
});

app.get('/add', (req, res) => {
const a = parseFloat(req.query.a);
const b = parseFloat(req.query.b);
if (isNaN(a) || isNaN(b)) {
return res.status(400).send("Invalid input");
}
const sum = a + b;
res.send(`The sum of ${a} and ${b} is: ${sum}`);
});

// Start server
app.listen(port, () => {
    console.log("App listening to: " + port)
})

// module.exports = app;