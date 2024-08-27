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
    .then(response => {
        if (response.ok) {
            // Redirect to home page
            window.location.href = '/';
        } else {
            // Handle errors
            return response.json().then(data => {
                alert(data.error || 'Incorrect email or password.');
            });
        }
    })
    .catch(error => {
        console.error('Error:', error);
        alert('An error occurred during sign-in.');
    });
});
