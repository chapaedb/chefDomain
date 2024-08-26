// signup.js

document.addEventListener('DOMContentLoaded', function() {
    const signupForm = document.getElementById('signup-form');

    if (signupForm) {
        signupForm.addEventListener('submit', function(event) {
            event.preventDefault(); // Prevent the default form submission

            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;
            const phone = document.getElementById('phone').value;
            const address = document.getElementById('address').value;

            // Perform the fetch request to sign up
            fetch('/api/auth/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ name, email, password, phone, address }),
            })
            .then(response => response.json())
            .then(data => {
                if (data.user) {
                    // Display success message and redirect
                    alert('Registration successful!');
                    window.location.href = '/'; // Redirect to home
                } else {
                    // Handle errors (e.g., display an error message)
                    console.error(data.error);
                    alert(data.error); // Display the error message
                }
            })
            .catch(error => {
                console.error('Error:', error);
                alert('An error occurred during registration.'); // Display a generic error message
            });
        });
    }
});
