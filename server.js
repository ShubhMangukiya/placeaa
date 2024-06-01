const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');

const app = express();
const port = 3000;

// Middleware to parse JSON bodies
app.use(bodyParser.json());

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

// Endpoint to handle email submission and save JSON
app.post('/save-email', (req, res) => {
    const newEmail = req.body.email; // Assuming the email is sent as { "email": "user@example.com" }
    const filePath = path.join(__dirname, 'emails.json');

    // Read existing data from the JSON file
    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err && err.code !== 'ENOENT') {
            console.error(err);
            return res.status(500).send('Internal Server Error');
        }

        // Parse existing data or start with an empty array
        let emails = [];
        if (data) {
            emails = JSON.parse(data);
        }

        // Add new email to the array
        emails.push(newEmail);

        // Write updated data back to the JSON file
        fs.writeFile(filePath, JSON.stringify(emails, null, 2), (err) => {
            if (err) {
                console.error(err);
                return res.status(500).send('Internal Server Error');
            }
            res.status(200).send('Email data saved successfully.');
        });
    });
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});