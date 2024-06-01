function saveEmailAsJson(event) {
    event.preventDefault();  // Prevent the default form submission

    const emailInput = document.getElementById('mc-email');
    const email = emailInput.value.trim(); // Trim the email to remove leading/trailing spaces
    const warningLabel = document.getElementById('email-warning');

    // Simple email validation regex
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if (!emailPattern.test(email)) {
        // Show warning message if email is not valid
        warningLabel.style.display = 'block';
        return false;
    } else {
        // Hide warning message if email is valid
        warningLabel.style.display = 'none';
    }

    const emailObject = {
        email: email
    };

    fetch('/save-email', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(emailObject),
    })
    .then(response => {
        if (response.ok) {
            return response.text(); // Read the response text
        } else {
            throw new Error('Failed to submit email');
        }
    })
    .then(data => {
        // Show alert after successful submission
        alert('Your email has been submitted. We will regularly update you.');
        console.log(data); // Log the response
    })
    .catch((error) => {
        console.error('Error:', error);
    });

    return false;
}

function fetchEmails() {
    fetch('/emails')
        .then(response => response.json())
        .then(data => {
            const emailList = document.getElementById('emailList');
            emailList.innerHTML = '';
            data.forEach(item => {
                const li = document.createElement('li');
                li.textContent = item.email;
                emailList.appendChild(li);
            });
        })
        .catch(error => {
            console.error('Error fetching emails:', error);
        });
}

// Fetch emails when the page loads
window.onload = fetchEmails;