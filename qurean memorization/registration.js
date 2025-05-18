document.getElementById('register-form').addEventListener('submit', function(event) {
  event.preventDefault();
  
  // Clear previous error messages
  document.getElementById('username-error').textContent = '';
  document.getElementById('email-error').textContent = '';
  document.getElementById('password-error').textContent = '';

  // Get input values
  const username = document.getElementById('username').value;
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  // Validate inputs
  let isValid = true;

  if (username.length < 3) {
      isValid = false;
      document.getElementById('username-error').textContent = 'Username must be at least 3 characters long.';
  }

  if (!/\S+@\S+\.\S+/.test(email)) {
      isValid = false;
      document.getElementById('email-error').textContent = 'Please enter a valid email address.';
  }

  if (password.length < 6) {
      isValid = false;
      document.getElementById('password-error').textContent = 'Password must be at least 6 characters long.';
  }

  // If valid, submit the form
  if (isValid) {
      alert('Registration successful!');
      // Here you can add code to send the data to the server
  }
});