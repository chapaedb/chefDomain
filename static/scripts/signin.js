// signin.js

document.addEventListener('DOMContentLoaded', function() {
    const signinForm = document.getElementById('signin-form');

    if (signinForm) {
        signinForm.addEventListener('submit', function(event) {
            event.preventDefault(); // Prevent the default form submission

            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;

            // Perform the fetch request to sign in
            fetch('/api/auth/signin', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            })
            .then(response => response.json())
            .then(data => {
                if (data.token) {
                    // Store the token in localStorage
                    localStorage.setItem('authToken', data.token);
                    // Redirect to a protected route or dashboard
                    window.location.href = '/dashboard'; // Change to your actual protected route
                } else {
                    // Handle errors (e.g., display an error message)
                    console.error(data.error);
                    alert(data.error); // Display the error message
                }
            })
            .catch(error => {
                console.error('Error:', error);
                alert('An error occurred while signing in.'); // Display a generic error message
            });
        });
    }
});
