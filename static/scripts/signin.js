document.getElementById('signin-form').addEventListener('submit', function(event) {
    event.preventDefault();

    // Get form data
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    // Send login request
    fetch('/api/auth/signin', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
    })
    .then(response => response.json())
    .then(data => {
        if (data.message === "Login successful!") {
            // Check the user role
            if (data.user.role === true) {
                // Redirect to admin dashboard if the user is an admin
                window.location.href = '/admin/dashboard';
            } else {
                // Redirect to home page if the user is not an admin
                window.location.href = '/';
            }
        } else {
            // Handle errors
            alert(data.error || 'Incorrect email or password.');
        }
    })
    .catch(error => {
        console.error('Error:', error);
        alert('An error occurred during sign-in.');
    });
});
