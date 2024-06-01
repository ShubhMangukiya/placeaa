document.addEventListener('DOMContentLoaded', function() {
    const emailForm = document.getElementById('emailForm');
    const emailInput = document.getElementById('mc-email');
    const warningLabel = document.getElementById('email-warning');
    const confirmationMessage = document.getElementById('confirmation-message');

    emailForm.addEventListener('submit', function(event) {
        event.preventDefault();

        const email = emailInput.value.trim();

        // Simple email validation regex
        const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

        if (!emailPattern.test(email)) {
            // Show warning message if email is not valid
            warningLabel.style.display = 'block';
            return;
        }

        // Hide warning message if email is valid
        warningLabel.style.display = 'none';

        // Prepare data to send to the server
        const emailData = { email: email };

        fetch('/save-email', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(emailData),
        })
        .then(response => {
            if (response.ok) {
                return response.text(); // Read the response text
            } else {
                throw new Error('Failed to submit email');
            }
        })
        .then(data => {
<<<<<<< HEAD
            const emailTable = document.getElementById('emailTable');
            emailTable.innerHTML = ''; // Clear previous table content
            data.forEach(item => {
                const row = emailTable.insertRow(); // Create a new row
                const cell = row.insertCell(); // Insert a cell in the row
                cell.textContent = item.email; // Add email to the cell
            });
=======
            // Show confirmation message after successful submission
            confirmationMessage.style.display = 'block';
            emailInput.value = ''; // Clear the email input field
            console.log(data); // Log the response
>>>>>>> d4fff9d30fb3ee015f329af6e1741bc52e8084df
        })
        .catch(error => {
            console.error('Error:', error);
        });
<<<<<<< HEAD
}

// Fetch emails when the page loads
window.onload = fetchEmails;
=======
    });
});
>>>>>>> d4fff9d30fb3ee015f329af6e1741bc52e8084df
