const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');

const app = express();
const port = 3000;

// Middleware to parse JSON bodies
app.use(bodyParser.json());

// Serve static files from the root directory
app.use(express.static(path.join(__dirname)));

// Serve the HTML form
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Endpoint to handle email submission and save JSON
app.post('/save-email', (req, res) => {
    const newEmailData = req.body;
    const filePath = path.join(__dirname, 'emails.json');

    // Read existing data from the JSON file
    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err && err.code !== 'ENOENT') {
            console.error(err);
            return res.status(500).send('Internal Server Error');
        }

        // Parse existing data or start with an empty array
        let emailDataArray = [];
        if (data) {
            emailDataArray = JSON.parse(data);
        }

        // Add new email data to the array
        emailDataArray.push(newEmailData);

        // Write updated data back to the JSON file
        fs.writeFile(filePath, JSON.stringify(emailDataArray, null, 2), (err) => {
            if (err) {
                console.error(err);
                return res.status(500).send('Internal Server Error');
            }
            res.send('Email saved successfully');
        });
    });
});

// Serve the emails.html page
app.get('/emails', (req, res) => {
    res.sendFile(path.join(__dirname, 'emails.html'));
});

// Endpoint to serve emails.json
app.get('/emails.json', (req, res) => {
    const filePath = path.join(__dirname, 'emails.json');
    res.sendFile(filePath);
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
