const express = require('express');
const app = express();

const PORT = process.env.PORT || 3000;

app.use(express.json());

app.get('/home', (req, res) => {
    res.send('Hello World!');
});

app.post('/contacts', (req, res) => {{
    const { name, message} = req.body
    res.send(`Name: ${name}, Message: ${message}`);
}});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

